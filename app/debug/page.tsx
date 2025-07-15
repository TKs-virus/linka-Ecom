"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, AlertTriangle, RefreshCw } from "lucide-react"

interface DebugInfo {
  timestamp: string
  environment: {
    NEXT_PUBLIC_SUPABASE_URL: boolean
    NEXT_PUBLIC_SUPABASE_ANON_KEY: boolean
    SUPABASE_SERVICE_ROLE_KEY: boolean
    NODE_ENV: string
  }
  tests: {
    client: {
      success: boolean
      error?: string
      details?: any
    }
    server: {
      success: boolean
      error?: string
    }
    auth: {
      success: boolean
      error?: string
      session?: any
    }
  }
  supabaseUrl: string
  anonKeyPrefix: string
}

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runDiagnostics = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/debug")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Debug API failed")
      }

      setDebugInfo(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  const getStatusIcon = (success: boolean) => {
    return success ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />
  }

  const getStatusBadge = (success: boolean) => {
    return <Badge variant={success ? "default" : "destructive"}>{success ? "Pass" : "Fail"}</Badge>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Database Debug Console</h1>
          <p className="text-muted-foreground">Diagnose database connection and authentication issues</p>
        </div>
        <Button onClick={runDiagnostics} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Run Diagnostics
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {debugInfo && (
        <div className="grid gap-6">
          {/* Environment Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Environment Configuration
                {getStatusIcon(
                  debugInfo.environment.NEXT_PUBLIC_SUPABASE_URL && debugInfo.environment.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                )}
              </CardTitle>
              <CardDescription>Check if required environment variables are configured</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>NEXT_PUBLIC_SUPABASE_URL</span>
                {getStatusBadge(debugInfo.environment.NEXT_PUBLIC_SUPABASE_URL)}
              </div>
              <div className="flex items-center justify-between">
                <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                {getStatusBadge(debugInfo.environment.NEXT_PUBLIC_SUPABASE_ANON_KEY)}
              </div>
              <div className="flex items-center justify-between">
                <span>SUPABASE_SERVICE_ROLE_KEY</span>
                {getStatusBadge(debugInfo.environment.SUPABASE_SERVICE_ROLE_KEY)}
              </div>
              <div className="flex items-center justify-between">
                <span>NODE_ENV</span>
                <Badge variant="outline">{debugInfo.environment.NODE_ENV}</Badge>
              </div>
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">Supabase URL:</p>
                <p className="text-sm text-muted-foreground break-all">{debugInfo.supabaseUrl}</p>
              </div>
            </CardContent>
          </Card>

          {/* Connection Tests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Connection Tests
                {getStatusIcon(debugInfo.tests.client.success && debugInfo.tests.server.success)}
              </CardTitle>
              <CardDescription>Test database connectivity from client and server</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Client Connection</span>
                  {getStatusBadge(debugInfo.tests.client.success)}
                </div>
                {!debugInfo.tests.client.success && debugInfo.tests.client.error && (
                  <Alert variant="destructive">
                    <AlertDescription className="text-sm">
                      {debugInfo.tests.client.error}
                      {debugInfo.tests.client.details && (
                        <pre className="mt-2 text-xs overflow-auto">
                          {JSON.stringify(debugInfo.tests.client.details, null, 2)}
                        </pre>
                      )}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Server Connection</span>
                  {getStatusBadge(debugInfo.tests.server.success)}
                </div>
                {!debugInfo.tests.server.success && debugInfo.tests.server.error && (
                  <Alert variant="destructive">
                    <AlertDescription className="text-sm">{debugInfo.tests.server.error}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Authentication</span>
                  {getStatusBadge(debugInfo.tests.auth.success)}
                </div>
                {!debugInfo.tests.auth.success && debugInfo.tests.auth.error && (
                  <Alert variant="destructive">
                    <AlertDescription className="text-sm">{debugInfo.tests.auth.error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Troubleshooting Guide</CardTitle>
              <CardDescription>Common solutions for database connection issues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">If environment variables are missing:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Check your .env.local file in the project root</li>
                  <li>• Ensure NEXT_PUBLIC_SUPABASE_URL is set to your Supabase project URL</li>
                  <li>• Ensure NEXT_PUBLIC_SUPABASE_ANON_KEY is set to your Supabase anon key</li>
                  <li>• Restart your development server after adding environment variables</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">If connection tests fail:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Verify your Supabase project is active and not paused</li>
                  <li>• Check if your database has the required tables (users, retailers, etc.)</li>
                  <li>• Ensure Row Level Security (RLS) policies allow access</li>
                  <li>• Verify your API keys are correct and not expired</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">If authentication fails:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Check if email confirmation is required in Supabase Auth settings</li>
                  <li>• Verify user exists in both auth.users and public.users tables</li>
                  <li>• Ensure password meets minimum requirements</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Debug Info */}
          <Card>
            <CardHeader>
              <CardTitle>Raw Debug Data</CardTitle>
              <CardDescription>Complete diagnostic information for technical analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto max-h-96">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
