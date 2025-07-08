"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface HealthStatus {
  status: string
  database?: string
  message?: string
  error?: string
  timestamp: string
  environment?: string
}

interface DebugInfo {
  status: string
  environment: {
    NODE_ENV: string
    SUPABASE_URL: string
    SUPABASE_ANON_KEY: string
    SERVICE_ROLE_KEY: string
  }
  database_tests: {
    users: { count?: number; error?: string }
    products: { count?: number; error?: string }
    orders: { count?: number; error?: string }
    retailers: { count?: number; error?: string }
  }
  timestamp: string
}

export function DatabaseStatus() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null)
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null)
  const [loading, setLoading] = useState(false)

  const checkHealth = async () => {
    setLoading(true)
    try {
      const [healthRes, debugRes] = await Promise.all([fetch("/api/health"), fetch("/api/debug")])

      const health = await healthRes.json()
      const debug = await debugRes.json()

      setHealthStatus(health)
      setDebugInfo(debug)
    } catch (error) {
      console.error("Failed to check status:", error)
      setHealthStatus({
        status: "error",
        message: "Failed to connect to API",
        timestamp: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkHealth()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return (
          <Badge variant="default" className="bg-green-500">
            Healthy
          </Badge>
        )
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Database Connection Status</CardTitle>
          <Button variant="outline" size="sm" onClick={checkHealth} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {healthStatus ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {getStatusIcon(healthStatus.status)}
                {getStatusBadge(healthStatus.status)}
                <span className="text-sm text-muted-foreground">{healthStatus.timestamp}</span>
              </div>

              {healthStatus.message && <p className="text-sm text-muted-foreground">{healthStatus.message}</p>}

              {healthStatus.error && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-sm text-red-700 font-medium">Error Details:</p>
                  <p className="text-sm text-red-600">{healthStatus.error}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span className="text-sm">Checking status...</span>
            </div>
          )}
        </CardContent>
      </Card>

      {debugInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Environment & Database Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Environment Variables</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    NODE_ENV: <Badge variant="outline">{debugInfo.environment.NODE_ENV}</Badge>
                  </div>
                  <div>
                    SUPABASE_URL:{" "}
                    <Badge variant={debugInfo.environment.SUPABASE_URL === "Set" ? "default" : "destructive"}>
                      {debugInfo.environment.SUPABASE_URL}
                    </Badge>
                  </div>
                  <div>
                    SUPABASE_ANON_KEY:{" "}
                    <Badge variant={debugInfo.environment.SUPABASE_ANON_KEY === "Set" ? "default" : "destructive"}>
                      {debugInfo.environment.SUPABASE_ANON_KEY}
                    </Badge>
                  </div>
                  <div>
                    SERVICE_ROLE_KEY:{" "}
                    <Badge variant={debugInfo.environment.SERVICE_ROLE_KEY === "Set" ? "default" : "destructive"}>
                      {debugInfo.environment.SERVICE_ROLE_KEY}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Database Table Tests</h4>
                <div className="space-y-2">
                  {Object.entries(debugInfo.database_tests).map(([table, result]) => (
                    <div key={table} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium capitalize">{table}</span>
                      {result.error ? (
                        <Badge variant="destructive">Error: {result.error}</Badge>
                      ) : (
                        <Badge variant="default">{result.count} records</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
