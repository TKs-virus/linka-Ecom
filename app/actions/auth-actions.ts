"use server"

import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export type AuthState = {
  message: string
  success: boolean
  redirectTo?: string
  error?: {
    field?: "email" | "password" | "general"
    message: string
  }
}

export async function loginUser(prevState: AuthState | undefined, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || typeof email !== "string") {
    return { success: false, message: "Invalid email.", error: { field: "email", message: "Email is required." } }
  }
  if (!password || typeof password !== "string") {
    return {
      success: false,
      message: "Invalid password.",
      error: { field: "password", message: "Password is required." },
    }
  }

  const supabase = createServerClient()

  // Sign in with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError) {
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
    return {
      success: false,
      message: "User profile not found.",
      error: { field: "general", message: "User profile not found." },
    }
  }

  // Set session cookie
  cookies().set(
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

  return { success: true, message: "Login successful!", redirectTo }
}

export async function signUpUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const phone = formData.get("phone") as string
  const userType = formData.get("userType") as string

  if (!email || !password || !firstName || !lastName || !userType) {
    return {
      success: false,
      message: "All required fields must be filled.",
      error: { field: "general", message: "Please fill in all required fields." },
    }
  }

  const supabase = createServerClient()

  // Sign up with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
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
}

export async function logoutUser() {
  const supabase = createServerClient()

  await supabase.auth.signOut()
  cookies().delete("session")
  redirect("/login")
}

export async function getCurrentUser() {
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
}
