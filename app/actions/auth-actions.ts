"use server"

import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export type AuthState = {
  message: string
  success: boolean
  redirectTo?: string
  error?: {
    field?: "email" | "password" | "firstName" | "lastName" | "userType" | "confirmPassword" | "general"
    message: string
  }
}

export async function loginUser(prevState: AuthState | undefined, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validation
  if (!email || typeof email !== "string") {
    return {
      success: false,
      message: "Invalid email.",
      error: { field: "email", message: "Email is required." },
    }
  }

  if (!password || typeof password !== "string") {
    return {
      success: false,
      message: "Invalid password.",
      error: { field: "password", message: "Password is required." },
    }
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Invalid email format.",
      error: { field: "email", message: "Please enter a valid email address." },
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
      return {
        success: false,
        message: "Invalid credentials.",
        error: { field: "general", message: "Incorrect email or password." },
      }
    }

    if (!authData.user) {
      return {
        success: false,
        message: "Authentication failed.",
        error: { field: "general", message: "Unable to authenticate user." },
      }
    }

    // Get user profile from our users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single()

    if (userError || !userData) {
      console.error("User profile error:", userError)
      return {
        success: false,
        message: "User profile not found.",
        error: { field: "general", message: "User profile not found." },
      }
    }

    // Set session cookie
    const cookieStore = cookies()
    cookieStore.set(
      "session",
      JSON.stringify({
        userId: userData.id,
        role: userData.role,
        email: userData.email,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      },
    )

    // Determine redirect path based on role
    const redirectTo = userData.role === "RETAILER" ? "/dashboard" : "/shop"

    return {
      success: true,
      message: "Login successful!",
      redirectTo,
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "An unexpected error occurred.",
      error: { field: "general", message: "Please try again later." },
    }
  }
}

export async function signUpUser(prevState: AuthState | undefined, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const phone = formData.get("phone") as string
  const userType = formData.get("userType") as string
  const terms = formData.get("terms") as string

  // Validation
  if (!firstName || typeof firstName !== "string" || firstName.trim().length < 2) {
    return {
      success: false,
      message: "First name is required and must be at least 2 characters.",
      error: { field: "firstName", message: "First name must be at least 2 characters." },
    }
  }

  if (!lastName || typeof lastName !== "string" || lastName.trim().length < 2) {
    return {
      success: false,
      message: "Last name is required and must be at least 2 characters.",
      error: { field: "lastName", message: "Last name must be at least 2 characters." },
    }
  }

  if (!email || typeof email !== "string") {
    return {
      success: false,
      message: "Email is required.",
      error: { field: "email", message: "Email is required." },
    }
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Invalid email format.",
      error: { field: "email", message: "Please enter a valid email address." },
    }
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    return {
      success: false,
      message: "Password must be at least 8 characters long.",
      error: { field: "password", message: "Password must be at least 8 characters long." },
    }
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match.",
      error: { field: "confirmPassword", message: "Passwords do not match." },
    }
  }

  if (!userType || !["customer", "retailer", "delivery"].includes(userType)) {
    return {
      success: false,
      message: "Please select a valid user type.",
      error: { field: "userType", message: "Please select a user type." },
    }
  }

  if (!terms) {
    return {
      success: false,
      message: "You must agree to the terms and conditions.",
      error: { field: "general", message: "You must agree to the terms and conditions." },
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
        error: { field: "email", message: "An account with this email already exists." },
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
          phone: phone || null,
          role: userType.toUpperCase(),
        },
      },
    })

    if (authError) {
      console.error("Auth signup error:", authError)
      return {
        success: false,
        message: "Sign up failed.",
        error: { field: "general", message: authError.message },
      }
    }

    if (!authData.user) {
      return {
        success: false,
        message: "Sign up failed.",
        error: { field: "general", message: "Unable to create user account." },
      }
    }

    // Create user profile in our users table
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      email,
      first_name: firstName,
      last_name: lastName,
      phone: phone || null,
      role: userType.toUpperCase() as "CUSTOMER" | "RETAILER" | "DELIVERY",
    })

    if (profileError) {
      console.error("Profile creation error:", profileError)
      return {
        success: false,
        message: "Failed to create user profile.",
        error: { field: "general", message: "Failed to create user profile." },
      }
    }

    // If user is a retailer, create retailer profile
    if (userType.toUpperCase() === "RETAILER") {
      const { error: retailerError } = await supabase.from("retailers").insert({
        user_id: authData.user.id,
        business_name: `${firstName} ${lastName}'s Store`,
        business_email: email,
      })

      if (retailerError) {
        console.error("Failed to create retailer profile:", retailerError)
      }
    }

    return {
      success: true,
      message: "Account created successfully! Please check your email to verify your account.",
    }
  } catch (error) {
    console.error("Signup error:", error)
    return {
      success: false,
      message: "An unexpected error occurred.",
      error: { field: "general", message: "Please try again later." },
    }
  }
}

export async function logoutUser() {
  try {
    const supabase = createServerClient()
    await supabase.auth.signOut()

    const cookieStore = cookies()
    cookieStore.delete("session")

    redirect("/login")
  } catch (error) {
    console.error("Logout error:", error)
    redirect("/login")
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
