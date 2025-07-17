import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"

  if (code) {
    try {
      const supabase = createServerClient()

      const { data: authData, error: authError } = await supabase.auth.exchangeCodeForSession(code)

      if (authError) {
        console.error("Auth callback error:", authError)
        return NextResponse.redirect(`${origin}/login?error=auth_error`)
      }

      if (authData.user) {
        // Get or create user profile
        let userData
        const { data: existingUser, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", authData.user.id)
          .single()

        if (userError && userError.code === "PGRST116") {
          // User doesn't exist, create profile
          const { data: newUser, error: createError } = await supabase
            .from("users")
            .insert({
              id: authData.user.id,
              email: authData.user.email!,
              first_name:
                authData.user.user_metadata?.first_name ||
                authData.user.user_metadata?.full_name?.split(" ")[0] ||
                "User",
              last_name:
                authData.user.user_metadata?.last_name ||
                authData.user.user_metadata?.full_name?.split(" ").slice(1).join(" ") ||
                "",
              role: "CUSTOMER",
              avatar_url: authData.user.user_metadata?.avatar_url || null,
              provider: authData.user.app_metadata?.provider || "google",
            })
            .select()
            .single()

          if (createError) {
            console.error("Failed to create user profile:", createError)
            return NextResponse.redirect(`${origin}/login?error=profile_creation_failed`)
          }

          userData = newUser
        } else if (userError) {
          console.error("User profile error:", userError)
          return NextResponse.redirect(`${origin}/login?error=profile_error`)
        } else {
          userData = existingUser
        }

        // Set session cookie
        const cookieStore = cookies()
        const sessionData = {
          userId: userData.id,
          role: userData.role,
          email: userData.email,
          firstName: userData.first_name,
          lastName: userData.last_name,
        }

        cookieStore.set("session", JSON.stringify(sessionData), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: "/",
          sameSite: "lax",
        })

        // Redirect based on user role
        const redirectTo = userData.role === "RETAILER" ? "/dashboard" : "/shop"
        return NextResponse.redirect(`${origin}${redirectTo}`)
      }
    } catch (error) {
      console.error("Callback processing error:", error)
      return NextResponse.redirect(`${origin}/login?error=callback_error`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=no_code`)
}
