"use server"

import { createServerClient } from "@/lib/supabase/server"
import { containerManager } from "@/lib/services/container-management"
import { executeQuery, executeTransaction } from "@/lib/database/connections"

export interface BusinessRegistrationData {
  // User data
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string

  // Business data
  businessName: string
  businessType: string
  industryCategory: string
  businessDescription?: string
  businessEmail: string
  businessPhone?: string
  website?: string

  // Location data
  streetAddress: string
  city: string
  stateProvince?: string
  postalCode?: string
  country: string

  // Preferences
  preferredRegion: string
  subscriptionPlan: string
}

export async function registerBusiness(data: BusinessRegistrationData) {
  try {
    return await executeTransaction("sme", async (smeClient) => {
      const supabase = createServerClient()

      // 1. Create user account in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      if (authError || !authData.user) {
        throw new Error(`Authentication failed: ${authError?.message}`)
      }

      const userId = authData.user.id

      // 2. Create client profile
      await executeQuery(
        "clients",
        `
        INSERT INTO client_profiles (
          user_id, email, first_name, last_name, phone, 
          preferred_language, timezone, is_active, email_verified
        ) VALUES ($1, $2, $3, $4, $5, 'en', 'UTC', true, false)
      `,
        [userId, data.email, data.firstName, data.lastName, data.phone],
      )

      // 3. Create SME profile
      const [smeProfile] = await smeClient.query(
        `
        INSERT INTO sme_profiles (
          user_id, business_name, business_type, industry_category,
          business_description, business_email, business_phone, website_url,
          verification_status, subscription_plan, subscription_status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending', $9, 'active')
        RETURNING id
      `,
        [
          userId,
          data.businessName,
          data.businessType,
          data.industryCategory,
          data.businessDescription,
          data.businessEmail,
          data.businessPhone,
          data.website,
          data.subscriptionPlan,
        ],
      )

      const smeId = smeProfile.id

      // 4. Create business location
      await smeClient.query(
        `
        INSERT INTO sme_locations (
          sme_id, location_name, is_headquarters, street_address,
          city, state_province, postal_code, country, is_active
        ) VALUES ($1, $2, true, $3, $4, $5, $6, $7, true)
      `,
        [
          smeId,
          `${data.businessName} Headquarters`,
          data.streetAddress,
          data.city,
          data.stateProvince,
          data.postalCode,
          data.country,
        ],
      )

      // 5. Create containers for the business
      const containers = await Promise.all([
        // SME Dashboard Container
        containerManager.createContainer({
          businessId: smeId,
          containerName: `sme-dashboard-${data.businessName.toLowerCase().replace(/\s+/g, "-")}`,
          containerType: "sme_dashboard",
          locationRegion: data.preferredRegion,
          resourceLimits: {
            cpu: data.subscriptionPlan === "premium" ? "2" : "1",
            memory: data.subscriptionPlan === "premium" ? "1Gi" : "512Mi",
            storage: data.subscriptionPlan === "premium" ? "20Gi" : "10Gi",
          },
          environmentVariables: {
            BUSINESS_ID: smeId,
            BUSINESS_NAME: data.businessName,
            SUBSCRIPTION_PLAN: data.subscriptionPlan,
            INDUSTRY_CATEGORY: data.industryCategory,
          },
        }),

        // Store Front Container
        containerManager.createContainer({
          businessId: smeId,
          containerName: `store-${data.businessName.toLowerCase().replace(/\s+/g, "-")}`,
          containerType: "store_front",
          locationRegion: data.preferredRegion,
          resourceLimits: {
            cpu: data.subscriptionPlan === "premium" ? "2" : "1",
            memory: data.subscriptionPlan === "premium" ? "1Gi" : "512Mi",
            storage: data.subscriptionPlan === "premium" ? "20Gi" : "10Gi",
          },
          environmentVariables: {
            BUSINESS_ID: smeId,
            STORE_NAME: data.businessName,
            SUBSCRIPTION_PLAN: data.subscriptionPlan,
          },
        }),
      ])

      // 6. Create storefront record
      const storeSlug = data.businessName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 50)

      await executeQuery(
        "shop",
        `
        INSERT INTO storefronts (
          business_id, container_id, store_name, store_slug,
          store_description, is_active, contact_info
        ) VALUES ($1, $2, $3, $4, $5, true, $6)
      `,
        [
          smeId,
          containers[1].id, // Store front container
          data.businessName,
          storeSlug,
          data.businessDescription,
          JSON.stringify({
            email: data.businessEmail,
            phone: data.businessPhone,
            address: {
              street: data.streetAddress,
              city: data.city,
              state: data.stateProvince,
              postal_code: data.postalCode,
              country: data.country,
            },
          }),
        ],
      )

      // 7. Initialize analytics records
      await executeQuery(
        "analytics",
        `
        INSERT INTO business_analytics (
          business_id, metric_date, total_revenue, total_orders,
          new_customers, returning_customers, average_order_value,
          conversion_rate, page_views, unique_visitors
        ) VALUES ($1, CURRENT_DATE, 0, 0, 0, 0, 0, 0, 0, 0)
      `,
        [smeId],
      )

      // 8. Create default product categories
      const defaultCategories = [
        "Electronics",
        "Fashion",
        "Home & Garden",
        "Sports & Fitness",
        "Books & Education",
        "Health & Beauty",
        "Automotive",
        "Services",
      ]

      for (const category of defaultCategories) {
        await executeQuery(
          "inventory",
          `
          INSERT INTO product_categories (business_id, name, description, is_active)
          VALUES ($1, $2, $3, true)
        `,
          [smeId, category, `${category} products and services`],
        )
      }

      // 9. Create default warehouse
      await executeQuery(
        "inventory",
        `
        INSERT INTO warehouses (
          business_id, name, code, address, is_active
        ) VALUES ($1, $2, $3, $4, true)
      `,
        [
          smeId,
          `${data.businessName} Main Warehouse`,
          "MAIN",
          JSON.stringify({
            street: data.streetAddress,
            city: data.city,
            state: data.stateProvince,
            postal_code: data.postalCode,
            country: data.country,
          }),
        ],
      )

      return {
        success: true,
        message: "Business registered successfully!",
        data: {
          userId,
          smeId,
          containers: containers.map((c) => ({
            id: c.id,
            name: c.containerName,
            type: c.containerType,
            port: c.portNumber,
          })),
          dashboardUrl: `http://localhost:${containers[0].portNumber}`,
          storeUrl: `http://localhost:${containers[1].portNumber}`,
        },
      }
    })
  } catch (error) {
    console.error("Business registration error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Registration failed",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function getBusinessContainers(businessId: string) {
  try {
    const containers = await containerManager.getContainersByBusinessId(businessId)

    return {
      success: true,
      data: containers,
    }
  } catch (error) {
    console.error("Error fetching business containers:", error)
    return {
      success: false,
      message: "Failed to fetch containers",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function performContainerHealthCheck(containerId: string) {
  try {
    const isHealthy = await containerManager.performHealthCheck(containerId)

    return {
      success: true,
      data: { healthy: isHealthy },
    }
  } catch (error) {
    console.error("Health check error:", error)
    return {
      success: false,
      message: "Health check failed",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
