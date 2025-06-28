// This page will now redirect to the main dashboard
import { redirect } from "next/navigation"

export default function RetailerBasePage() {
  redirect("/dashboard")
  // return null; // Or some loading state if preferred, but redirect is usually fast
}
