"use server"

import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import crypto from "crypto"

export type AuthState = {
  message: string
  success: boolean
  redirectTo?: string
  error?: {
    field?:
      | "email"
      | "password"
      | "firstName"
      | "lastName"
      | "companyName"
      | "industryType"
      | "storeLocation"
      | "confirmPassword"
      | "general"
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

  // Check if email is verified
  if (!userData.email_verified) {
    return {
      success: false,
      message: "Email not verified.",
      error: { field: "general", message: "Please verify your email before logging in." },
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
  const confirmPassword = formData.get("confirmPassword") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const phone = formData.get("phone") as string
  const userType = formData.get("userType") as string

  // Retailer-specific fields
  const companyName = formData.get("companyName") as string
  const industryType = formData.get("industryType") as string
  const storeLocation = formData.get("storeLocation") as string
  const inventoryFile = formData.get("inventoryFile") as File

  // Basic validation
  if (!email || !password || !firstName || !lastName || !userType) {
    return {
      success: false,
      message: "All required fields must be filled.",
      error: { field: "general", message: "Please fill in all required fields." },
    }
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match.",
      error: { field: "confirmPassword", message: "Passwords do not match." },
    }
  }

  if (password.length < 8) {
    return {
      success: false,
      message: "Password must be at least 8 characters long.",
      error: { field: "password", message: "Password must be at least 8 characters long." },
    }
  }

  // Retailer-specific validation
  if (userType.toUpperCase() === "RETAILER") {
    if (!companyName) {
      return {
        success: false,
        message: "Company name is required for retailers.",
        error: { field: "companyName", message: "Company name is required." },
      }
    }
    if (!industryType) {
      return {
        success: false,
        message: "Industry type is required for retailers.",
        error: { field: "industryType", message: "Industry type is required." },
      }
    }
    if (!storeLocation) {
      return {
        success: false,
        message: "Store location is required for retailers.",
        error: { field: "storeLocation", message: "Store location is required." },
      }
    }
  }

  const supabase = createServerClient()

  // Generate verification token
  const verificationToken = crypto.randomBytes(32).toString("hex")

  // Sign up with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${verificationToken}`,
    },
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

  // Handle file upload if provided
  let inventoryFileUrl = null
  if (inventoryFile && inventoryFile.size > 0) {
    try {
      const fileExt = inventoryFile.name.split(".").pop()
      const fileName = `${authData.user.id}/inventory.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("retailer-files")
        .upload(fileName, inventoryFile)

      if (uploadError) {
        console.error("File upload error:", uploadError)
      } else {
        inventoryFileUrl = uploadData.path
      }
    } catch (error) {
      console.error("File upload error:", error)
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
    email_verified: false,
    verification_token: verificationToken,
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
      business_name: companyName,
      company_name: companyName,
      industry_type: industryType,
      store_location: storeLocation,
      business_email: email,
      inventory_file_url: inventoryFileUrl,
    })

    if (retailerError) {
      console.error("Failed to create retailer profile:", retailerError)
    }
  }

  // Send verification email
  try {
    await sendVerificationEmail(email, firstName, verificationToken)
  } catch (error) {
    console.error("Failed to send verification email:", error)
  }

  return {
    success: true,
    message: "Account created successfully! Please check your email to verify your account.",
  }
}

async function sendVerificationEmail(email: string, firstName: string, token: string) {
  // In a real application, you would use a service like SendGrid, Mailgun, or AWS SES
  // For now, we'll simulate sending an email
  console.log(`Verification email would be sent to ${email} with token ${token}`)

  // You can implement actual email sending here
  // Example with a hypothetical email service:
  /*
  const emailService = new EmailService()
  await emailService.send({
    to: email,
    from: 'quickfixzed@gmail.com',
    subject: 'Verify your Linka account',
    html: `
      <h1>Welcome to Linka, ${firstName}!</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${token}">Verify Email</a>
    `
  })
  */
}

export async function verifyEmail(token: string) {
  const supabase = createServerClient()

  // Find user with this verification token
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("verification_token", token)
    .single()

  if (userError || !userData) {
    return {
      success: false,
      message: "Invalid verification token.",
    }
  }

  if (userData.email_verified) {
    return {
      success: true,
      message: "Email already verified.",
    }
  }

  // Update user as verified
  const { error: updateError } = await supabase
    .from("users")
    .update({
      email_verified: true,
      verification_token: null,
    })
    .eq("id", userData.id)

  if (updateError) {
    return {
      success: false,
      message: "Failed to verify email.",
    }
  }

  return {
    success: true,
    message: "Email verified successfully! You can now log in.",
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
