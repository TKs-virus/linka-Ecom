"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// In a real application, this would come from your database
const MOCK_USERS = [
  { id: "0", email: "demo@example.com", password: "demo", role: "RETAILER" }, // Demo User is now a RETAILER
  { id: "1", email: "customer@example.com", password: "password123", role: "CUSTOMER" },
  { id: "2", email: "retailer@example.com", password: "password123", role: "RETAILER" },
]

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

  // Simulate database lookup
  const user = MOCK_USERS.find((u) => u.email === email)

  if (!user) {
    return {
      success: false,
      message: "Invalid credentials.",
      error: { field: "general", message: "Incorrect email or password." },
    }
  }

  // Simulate password check (in a real app, use bcrypt.compare)
  if (user.password !== password) {
    return {
      success: false,
      message: "Invalid credentials.",
      error: { field: "general", message: "Incorrect email or password." },
    }
  }

  // Simulate session creation by setting a cookie
  cookies().set("session", JSON.stringify({ userId: user.id, role: user.role }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  // Determine redirect path based on role
  const redirectTo = user.role === "RETAILER" ? "/dashboard" : "/shop"

  return { success: true, message: "Login successful!", redirectTo }
}

export async function logoutUser() {
  cookies().delete("session")
  redirect("/login") // Ensure redirect to login page after logout
}
