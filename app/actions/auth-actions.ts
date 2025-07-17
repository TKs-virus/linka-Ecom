"use server"

import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export type AuthState = {
  message: string
  success: boolean
  redirectTo?: string
  error?: string
  fieldErrors?: {
    email?: string
    password?: string
    firstName?: string
    lastName?: string
    confirmPassword?: string
  }
}

export async function loginUser(prevState: AuthState | undefined, formData: FormData): Promise<AuthState> {
  console.log("=== Login User Action Called ===")

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log("Login attempt for email:", email)

  // Validation
  if (!email || typeof email !== "string") {
    return {
      success: false,
      message: "Email is required.",
      fieldErrors: { email: "Email is required." },
    }
  }

  if (!password || typeof password !== "string") {
    return {
      success: false,
      message: "Password is required.",
      fieldErrors: { password: "Password is required." },
    }
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
      fieldErrors: { email: "Please enter a valid email address." },
    }
  }

  try {
    const supabase = createServerClient()

    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      console.error("Auth error:", authError)

      // Handle specific auth errors
      if (authError.message.includes("Invalid login credentials")) {
        return {
          success: false,
          message: "Invalid email or password.",
          error: "Invalid email or password.",
        }
      }

      if (authError.message.includes("Email not confirmed")) {
        return {
          success: false,
          message: "Please check your email and click the confirmation link before signing in.",
          error: "Please check your email and click the confirmation link before signing in.",
        }
      }

      return {
        success: false,
        message: authError.message,
        error: authError.message,
      }
    }

    if (!authData.user) {
      return {
        success: false,
        message: "Authentication failed. Please try again.",
        error: "Authentication failed. Please try again.",
      }
    }

    console.log("Authentication successful for user:", authData.user.id)

    // Get or create user profile
    let userData
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single()

    if (userError && userError.code === "PGRST116") {
      // User doesn't exist in our users table, create it
      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert({
          id: authData.user.id,
          email: authData.user.email!,
          first_name:
            authData.user.user_metadata?.first_name || authData.user.user_metadata?.full_name?.split(" ")[0] || "User",
          last_name:
            authData.user.user_metadata?.last_name ||
            authData.user.user_metadata?.full_name?.split(" ").slice(1).join(" ") ||
            "",
          role: "CUSTOMER",
          avatar_url: authData.user.user_metadata?.avatar_url || null,
          provider: authData.user.app_metadata?.provider || "email",
        })
        .select()
        .single()

      if (createError) {
        console.error("Failed to create user profile:", createError)
        return {
          success: false,
          message: "Failed to create user profile.",
          error: "Failed to create user profile.",
        }
      }

      userData = newUser
    } else if (userError) {
      console.error("User profile error:", userError)
      return {
        success: false,
        message: "Failed to retrieve user profile.",
        error: "Failed to retrieve user profile.",
      }
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

    // Determine redirect path based on role
    const redirectTo = userData.role === "RETAILER" ? "/dashboard" : "/shop"

    revalidatePath("/")
    redirect(redirectTo)
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function signUpUser(prevState: AuthState | undefined, formData: FormData): Promise<AuthState> {
  console.log("=== Sign Up User Action Called ===")

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string

  // Validation
  const fieldErrors: AuthState["fieldErrors"] = {}

  if (!firstName || typeof firstName !== "string" || firstName.trim().length < 2) {
    fieldErrors.firstName = "First name must be at least 2 characters."
  }

  if (!lastName || typeof lastName !== "string" || lastName.trim().length < 2) {
    fieldErrors.lastName = "Last name must be at least 2 characters."
  }

  if (!email || typeof email !== "string") {
    fieldErrors.email = "Email is required."
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      fieldErrors.email = "Please enter a valid email address."
    }
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    fieldErrors.password = "Password must be at least 8 characters long."
  }

  if (password !== confirmPassword) {
    fieldErrors.confirmPassword = "Passwords do not match."
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors,
    }
  }

  try {
    const supabase = createServerClient()

    // Check if user already exists
    const { data: existingUser } = await supabase.from("users").select("email").eq("email", email).single()

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
        fieldErrors: { email: "An account with this email already exists." },
      }
    }

    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
        },
      },
    })

    if (authError) {
      console.error("Auth signup error:", authError)

      if (authError.message.includes("User already registered")) {
        return {
          success: false,
          message: "An account with this email already exists.",
          fieldErrors: { email: "An account with this email already exists." },
        }
      }

      return {
        success: false,
        message: authError.message,
        error: authError.message,
      }
    }

    if (!authData.user) {
      return {
        success: false,
        message: "Failed to create account. Please try again.",
        error: "Failed to create account. Please try again.",
      }
    }

    // Create user profile in our users table
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      email,
      first_name: firstName,
      last_name: lastName,
      role: "CUSTOMER",
      provider: "email",
    })

    if (profileError) {
      console.error("Profile creation error:", profileError)
      return {
        success: false,
        message: "Failed to create user profile.",
        error: "Failed to create user profile.",
      }
    }

    return {
      success: true,
      message: "Account created successfully! Please check your email to verify your account before signing in.",
    }
  } catch (error) {
    console.error("Signup error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function signInWithGoogle() {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })

    if (error) {
      console.error("Google OAuth error:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    if (data.url) {
      redirect(data.url)
    }

    return {
      success: true,
      message: "Redirecting to Google...",
    }
  } catch (error) {
    console.error("Google sign-in error:", error)
    return {
      success: false,
      error: "Failed to initiate Google sign-in. Please try again.",
    }
  }
}

export async function logoutUser() {
  try {
    const supabase = createServerClient()
    await supabase.auth.signOut()

    const cookieStore = cookies()
    cookieStore.delete("session")

    revalidatePath("/")
    redirect("/")
  } catch (error) {
    console.error("Logout error:", error)
    redirect("/")
  }
}

export async function getCurrentUser() {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    const { data: userData } = await supabase.from("users").select("*").eq("id", user.id).single()

    return userData
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

// Aliases for backward compatibility
export const loginAction = loginUser
export const signupAction = signUpUser
