import { DatabaseStatus } from "@/components/debug/database-status"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Application Debug Dashboard</h1>
        <p className="text-muted-foreground">Diagnose database connectivity and application health issues</p>
      </div>

      <div className="grid gap-6">
        <DatabaseStatus />

        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">1. Check Environment Variables</h4>
                <p className="text-sm text-muted-foreground">
                  Ensure all required Supabase environment variables are set correctly in your .env.local file.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">2. Verify Database Connection</h4>
                <p className="text-sm text-muted-foreground">
                  Check if your Supabase project is active and the database URL is accessible.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">3. Test API Routes</h4>
                <p className="text-sm text-muted-foreground">
                  Visit /api/health and /api/debug directly to see raw API responses.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">4. Check Browser Console</h4>
                <p className="text-sm text-muted-foreground">
                  Open browser developer tools to see any JavaScript errors or network issues.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
