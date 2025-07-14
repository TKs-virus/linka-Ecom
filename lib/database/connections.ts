import { Pool } from "pg"

// Database connection configurations
const dbConfigs = {
  containers: {
    host: process.env.CONTAINERS_DB_HOST || "localhost",
    port: Number.parseInt(process.env.CONTAINERS_DB_PORT || "5432"),
    database: process.env.CONTAINERS_DB_NAME || "linka_containers",
    user: process.env.CONTAINERS_DB_USER || "linka_user",
    password: process.env.CONTAINERS_DB_PASSWORD || "linka_password",
  },
  clients: {
    host: process.env.CLIENTS_DB_HOST || "localhost",
    port: Number.parseInt(process.env.CLIENTS_DB_PORT || "5433"),
    database: process.env.CLIENTS_DB_NAME || "linka_clients",
    user: process.env.CLIENTS_DB_USER || "linka_user",
    password: process.env.CLIENTS_DB_PASSWORD || "linka_password",
  },
  sme: {
    host: process.env.SME_DB_HOST || "localhost",
    port: Number.parseInt(process.env.SME_DB_PORT || "5434"),
    database: process.env.SME_DB_NAME || "linka_sme",
    user: process.env.SME_DB_USER || "linka_user",
    password: process.env.SME_DB_PASSWORD || "linka_password",
  },
  analytics: {
    host: process.env.ANALYTICS_DB_HOST || "localhost",
    port: Number.parseInt(process.env.ANALYTICS_DB_PORT || "5435"),
    database: process.env.ANALYTICS_DB_NAME || "linka_analytics",
    user: process.env.ANALYTICS_DB_USER || "linka_user",
    password: process.env.ANALYTICS_DB_PASSWORD || "linka_password",
  },
  inventory: {
    host: process.env.INVENTORY_DB_HOST || "localhost",
    port: Number.parseInt(process.env.INVENTORY_DB_PORT || "5436"),
    database: process.env.INVENTORY_DB_NAME || "linka_inventory",
    user: process.env.INVENTORY_DB_USER || "linka_user",
    password: process.env.INVENTORY_DB_PASSWORD || "linka_password",
  },
  shop: {
    host: process.env.SHOP_DB_HOST || "localhost",
    port: Number.parseInt(process.env.SHOP_DB_PORT || "5437"),
    database: process.env.SHOP_DB_NAME || "linka_shop",
    user: process.env.SHOP_DB_USER || "linka_user",
    password: process.env.SHOP_DB_PASSWORD || "linka_password",
  },
}

// Connection pools for each database
const pools: Record<string, Pool> = {}

// Initialize connection pools
export function initializeDatabasePools() {
  Object.entries(dbConfigs).forEach(([key, config]) => {
    pools[key] = new Pool({
      ...config,
      max: 20, // Maximum number of connections
      idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
      connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection could not be established
      maxUses: 7500, // Close connection after 7500 uses
    })

    // Handle pool errors
    pools[key].on("error", (err) => {
      console.error(`Database pool error for ${key}:`, err)
    })
  })
}

// Get database connection pool
export function getDbPool(database: keyof typeof dbConfigs): Pool {
  if (!pools[database]) {
    throw new Error(`Database pool not initialized for: ${database}`)
  }
  return pools[database]
}

// Close all database connections
export async function closeDatabasePools() {
  const closePromises = Object.entries(pools).map(async ([key, pool]) => {
    try {
      await pool.end()
      console.log(`Closed database pool for ${key}`)
    } catch (error) {
      console.error(`Error closing database pool for ${key}:`, error)
    }
  })

  await Promise.all(closePromises)
}

// Database health check
export async function checkDatabaseHealth() {
  const healthChecks = Object.entries(pools).map(async ([key, pool]) => {
    try {
      const client = await pool.connect()
      await client.query("SELECT 1")
      client.release()
      return { database: key, status: "healthy" }
    } catch (error) {
      console.error(`Health check failed for ${key}:`, error)
      return { database: key, status: "unhealthy", error: error instanceof Error ? error.message : "Unknown error" }
    }
  })

  return Promise.all(healthChecks)
}

// Execute query with automatic connection management
export async function executeQuery<T = any>(
  database: keyof typeof dbConfigs,
  query: string,
  params: any[] = [],
): Promise<T[]> {
  const pool = getDbPool(database)
  const client = await pool.connect()

  try {
    const result = await client.query(query, params)
    return result.rows
  } finally {
    client.release()
  }
}

// Transaction wrapper
export async function executeTransaction<T>(
  database: keyof typeof dbConfigs,
  callback: (client: any) => Promise<T>,
): Promise<T> {
  const pool = getDbPool(database)
  const client = await pool.connect()

  try {
    await client.query("BEGIN")
    const result = await callback(client)
    await client.query("COMMIT")
    return result
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}
