import { executeQuery } from "../database/connections"

export interface AnalyticsData {
  businessId: string
  date: string
  revenue?: number
  orders?: number
  customers?: number
  pageViews?: number
  conversions?: number
}

export interface ProductAnalytics {
  productId: string
  businessId: string
  views: number
  clicks: number
  purchases: number
  revenue: number
  conversionRate: number
}

export class AnalyticsService {
  // Record business analytics
  async recordBusinessAnalytics(data: AnalyticsData): Promise<void> {
    await executeQuery('analytics', `
      INSERT INTO business_analytics (
        business_id, metric_date, total_revenue, total_orders,
        new_customers, page_views, unique_visitors
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (business_id, metric_date)
      DO UPDATE SET
        total_revenue = business_analytics.total_revenue + EXCLUDED.total_revenue,
        total_orders = business_analytics.total_orders + EXCLUDED.total_orders,
        new_customers = business_analytics.new_customers + EXCLUDED.new_customers,
        page_views = business_analytics.page_views + EXCLUDED.page_views,
        unique_visitors = business_analytics.unique_visitors + EXCLUDED.unique_visitors,
        updated_at = NOW()
    `, [
      data.businessId,
      data.date,
      data.revenue || 0,
      data.orders || 0,
      data.customers || 0,
      data.pageViews || 0,
      data.pageViews || 0 // Using pageViews as unique visitors for simplicity
    ])
  }

  // Record analytics event
  async recordEvent(
    businessId: string,
    eventType: string,
    eventName: string,
    eventData: any,
    userId?: string,
    sessionId?: string
  ): Promise<void> {
    await executeQuery('analytics', `
      INSERT INTO analytics_events (
        business_id, event_type, event_name, event_data,
        user_id, session_id, timestamp
      ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
    `, [businessId, eventType, eventName, JSON.stringify(eventData), userId, sessionId])
  }

  // Get business analytics summary
  async getBusinessAnalytics(businessId: string, days = 30): Promise<any[]> {
    return executeQuery('analytics', `
      SELECT 
        metric_date,
        total_revenue,
        total_orders,
        new_customers,
        returning_customers,
        average_order_value,
        conversion_rate,
        page_views,
        unique_visitors
      FROM business_analytics
      WHERE business_id = $1 
        AND metric_date >= CURRENT_DATE - INTERVAL '${days} days'
      ORDER BY metric_date DESC
    `, [businessId])
  }

  // Get product performance analytics
  async getProductAnalytics(businessId: string, productId?: string, days = 30): Promise<any[]> {
    const query = productId 
      ? `SELECT * FROM product_analytics 
         WHERE business_id = $1 AND product_id = $2 
           AND metric_date >= CURRENT_DATE - INTERVAL '${days} days'
         ORDER BY metric_date DESC`
      : `SELECT * FROM product_analytics 
         WHERE business_id = $1 
           AND metric_date >= CURRENT_DATE - INTERVAL '${days} days'
         ORDER BY metric_date DESC, revenue DESC`

    const params = productId ? [businessId, productId] : [businessId]
    return executeQuery('analytics', query, params)
  }

  // Get customer behavior analytics
  async getCustomerBehaviorAnalytics(businessId: string, customerId?: string, days = 30): Promise<any[]> {
    const query = customerId
      ? `SELECT * FROM customer_behavior_analytics 
         WHERE business_id = $1 AND customer_id = $2 
           AND metric_date >= CURRENT_DATE - INTERVAL '${days} days'
         ORDER BY metric_date DESC`
      : `SELECT 
           customer_id,
           SUM(session_count) as total_sessions,
           SUM(page_views) as total_page_views,
           SUM(time_spent) as total_time_spent,
           SUM(purchases_made) as total_purchases,
           SUM(total_spent) as total_spent,
           AVG(time_spent::float / NULLIF(session_count, 0)) as avg_session_duration
         FROM customer_behavior_analytics 
         WHERE business_id = $1 
           AND metric_date >= CURRENT_DATE - INTERVAL '${days} days'
         GROUP BY customer_id
         ORDER BY total_spent DESC`

    const params = customerId ? [businessId, customerId] : [businessId]
    return executeQuery
