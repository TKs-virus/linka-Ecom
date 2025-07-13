export async function getProducts(searchTerm?: string, category?: string) {
  try {
    const supabase = createClient()

    let query = supabase.from("products").select("*").eq("status", "active")

    if (searchTerm) {
      query = query.or(`name.ilike.*${searchTerm}*,description.ilike.*${searchTerm}*`)
    }

    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.log("[getProducts] Supabase error → using mock data:", error.message)
      return getMockProducts(searchTerm, category)
    }

    return data || getMockProducts(searchTerm, category)
  } catch (err) {
    console.log("[getProducts] Exception → using mock data:", err)
    return getMockProducts(searchTerm, category)
  }
}
