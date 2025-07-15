import { NextResponse } from "next/server"
import { testDatabaseConnection, testAuth } from "@/lib/supabase/client"
import { testServerConnection } from "@/lib/supabase/server"

export async function GET() {
  try {
    console.log("=== Debug API Route Called ===")

    // Check environment variables
    const envCheck = {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      NODE_ENV: process.env.NODE_ENV,
    }

    console.log("Environment variables check:", envCheck)

    // Test client-side connection
    const clientTest = await testDatabaseConnection()
    console.log("Client test result:", clientTest)

    // Test server-side connection
    const serverTest = await testServerConnection()
    console.log("Server test result:", serverTest)

    // Test auth
    const authTest = await testAuth()
    console.log("Auth test result:", authTest)

    const debugInfo = {
      timestamp: new Date().toISOString(),
      environment: envCheck,
      tests: {
        client: clientTest,
        server: serverTest,
        auth: authTest,
      },
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKeyPrefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + "...",
    }

    return NextResponse.json(debugInfo)
  } catch (error) {
    console.error("Debug API error:", error)
    return NextResponse.json(
      {
        error: "Debug API failed",
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
