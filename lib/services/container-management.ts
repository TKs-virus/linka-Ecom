import { executeQuery, executeTransaction } from "../database/connections"
import Docker from "dockerode"

const docker = new Docker()

export interface ContainerConfig {
  businessId: string
  containerName: string
  containerType: "sme_dashboard" | "store_front" | "service_portal"
  locationRegion: string
  locationZone?: string
  resourceLimits?: {
    cpu: string
    memory: string
    storage: string
  }
  environmentVariables?: Record<string, string>
}

export interface Container {
  id: string
  businessId: string
  containerName: string
  containerType: string
  status: string
  dockerContainerId?: string
  portNumber?: number
  domainName?: string
  sslEnabled: boolean
  locationRegion: string
  locationZone?: string
  serverIp?: string
  resourceLimits: any
  environmentVariables: any
  createdAt: Date
  updatedAt: Date
  lastHealthCheck?: Date
  healthStatus: string
}

export class ContainerManagementService {
  // Create a new container
  async createContainer(config: ContainerConfig): Promise<Container> {
    return executeTransaction("containers", async (client) => {
      // Generate unique container name if not provided
      const containerName =
        config.containerName || `${config.containerType}-${config.businessId.slice(0, 8)}-${Date.now()}`

      // Find available port
      const portNumber = await this.findAvailablePort()

      // Create database record
      const [container] = await client.query(
        `
        INSERT INTO containers (
          business_id, container_name, container_type, location_region, 
          location_zone, port_number, resource_limits, environment_variables
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `,
        [
          config.businessId,
          containerName,
          config.containerType,
          config.locationRegion,
          config.locationZone,
          portNumber,
          JSON.stringify(config.resourceLimits || { cpu: "1", memory: "512Mi", storage: "10Gi" }),
          JSON.stringify(config.environmentVariables || {}),
        ],
      )

      // Create Docker container
      const dockerContainer = await this.createDockerContainer({
        ...config,
        containerName,
        portNumber,
        containerId: container.id,
      })

      // Update database with Docker container ID
      await client.query(
        `
        UPDATE containers 
        SET docker_container_id = $1, status = 'active'
        WHERE id = $2
      `,
        [dockerContainer.id, container.id],
      )

      return {
        ...container,
        dockerContainerId: dockerContainer.id,
        status: "active",
      }
    })
  }

  // Create Docker container
  private async createDockerContainer(
    config: ContainerConfig & {
      containerName: string
      portNumber: number
      containerId: string
    },
  ): Promise<Docker.Container> {
    const imageMap = {
      sme_dashboard: "linka/sme-dashboard:latest",
      store_front: "linka/storefront:latest",
      service_portal: "linka/service-portal:latest",
    }

    const container = await docker.createContainer({
      Image: imageMap[config.containerType],
      name: config.containerName,
      Env: [
        `BUSINESS_ID=${config.businessId}`,
        `CONTAINER_ID=${config.containerId}`,
        `PORT=${config.portNumber}`,
        `NODE_ENV=production`,
        ...Object.entries(config.environmentVariables || {}).map(([key, value]) => `${key}=${value}`),
      ],
      ExposedPorts: {
        [`${config.portNumber}/tcp`]: {},
      },
      HostConfig: {
        PortBindings: {
          [`${config.portNumber}/tcp`]: [{ HostPort: config.portNumber.toString() }],
        },
        Memory: this.parseMemoryLimit(config.resourceLimits?.memory || "512Mi"),
        CpuShares: this.parseCpuLimit(config.resourceLimits?.cpu || "1"),
        RestartPolicy: {
          Name: "unless-stopped",
        },
      },
      Labels: {
        "linka.business_id": config.businessId,
        "linka.container_type": config.containerType,
        "linka.region": config.locationRegion,
      },
    })

    await container.start()
    return container
  }

  // Find available port
  private async findAvailablePort(): Promise<number> {
    const usedPorts = await executeQuery(
      "containers",
      `
      SELECT port_number FROM containers 
      WHERE port_number IS NOT NULL AND status = 'active'
    `,
    )

    const usedPortNumbers = new Set(usedPorts.map((row) => row.port_number))

    // Start from port 8000 and find first available
    for (let port = 8000; port < 9000; port++) {
      if (!usedPortNumbers.has(port)) {
        return port
      }
    }

    throw new Error("No available ports in range 8000-8999")
  }

  // Parse memory limit
  private parseMemoryLimit(memory: string): number {
    const match = memory.match(/^(\d+)(Mi|Gi)$/)
    if (!match) return 512 * 1024 * 1024 // Default 512Mi

    const value = Number.parseInt(match[1])
    const unit = match[2]

    return unit === "Gi" ? value * 1024 * 1024 * 1024 : value * 1024 * 1024
  }

  // Parse CPU limit
  private parseCpuLimit(cpu: string): number {
    return Math.floor(Number.parseFloat(cpu) * 1024)
  }

  // Get container by business ID
  async getContainersByBusinessId(businessId: string): Promise<Container[]> {
    return executeQuery(
      "containers",
      `
      SELECT * FROM containers 
      WHERE business_id = $1 
      ORDER BY created_at DESC
    `,
      [businessId],
    )
  }

  // Update container status
  async updateContainerStatus(containerId: string, status: string): Promise<void> {
    await executeQuery(
      "containers",
      `
      UPDATE containers 
      SET status = $1, updated_at = NOW()
      WHERE id = $2
    `,
      [status, containerId],
    )
  }

  // Health check for container
  async performHealthCheck(containerId: string): Promise<boolean> {
    try {
      const [container] = await executeQuery(
        "containers",
        `
        SELECT docker_container_id, port_number FROM containers WHERE id = $1
      `,
        [containerId],
      )

      if (!container.docker_container_id) return false

      const dockerContainer = docker.getContainer(container.docker_container_id)
      const info = await dockerContainer.inspect()

      const isHealthy = info.State.Running && info.State.Health?.Status === "healthy"

      // Update health status in database
      await executeQuery(
        "containers",
        `
        UPDATE containers 
        SET health_status = $1, last_health_check = NOW()
        WHERE id = $2
      `,
        [isHealthy ? "healthy" : "unhealthy", containerId],
      )

      return isHealthy
    } catch (error) {
      console.error(`Health check failed for container ${containerId}:`, error)

      await executeQuery(
        "containers",
        `
        UPDATE containers 
        SET health_status = 'unhealthy', last_health_check = NOW()
        WHERE id = $1
      `,
        [containerId],
      )

      return false
    }
  }

  // Stop and remove container
  async removeContainer(containerId: string): Promise<void> {
    return executeTransaction("containers", async (client) => {
      const [container] = await client.query(
        `
        SELECT docker_container_id FROM containers WHERE id = $1
      `,
        [containerId],
      )

      if (container.docker_container_id) {
        try {
          const dockerContainer = docker.getContainer(container.docker_container_id)
          await dockerContainer.stop()
          await dockerContainer.remove()
        } catch (error) {
          console.error(`Error removing Docker container:`, error)
        }
      }

      await client.query(
        `
        UPDATE containers 
        SET status = 'inactive', docker_container_id = NULL, updated_at = NOW()
        WHERE id = $1
      `,
        [containerId],
      )
    })
  }

  // Get container metrics
  async getContainerMetrics(containerId: string, hours = 24): Promise<any[]> {
    return executeQuery(
      "containers",
      `
      SELECT * FROM container_metrics 
      WHERE container_id = $1 
        AND recorded_at >= NOW() - INTERVAL '${hours} hours'
      ORDER BY recorded_at DESC
    `,
      [containerId],
    )
  }

  // Record container metrics
  async recordMetrics(
    containerId: string,
    metrics: Array<{
      type: string
      value: number
      unit?: string
    }>,
  ): Promise<void> {
    const values = metrics
      .map((metric, index) => `($1, $${index * 3 + 2}, $${index * 3 + 3}, $${index * 3 + 4})`)
      .join(", ")

    const params = [containerId]
    metrics.forEach((metric) => {
      params.push(metric.type, metric.value.toString(), metric.unit || "")
    })

    await executeQuery(
      "containers",
      `
      INSERT INTO container_metrics (container_id, metric_type, metric_value, unit)
      VALUES ${values}
    `,
      params,
    )
  }
}

export const containerManager = new ContainerManagementService()
