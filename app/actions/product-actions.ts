import { createClient } from "supabase-js" // Assuming createClient is imported from supabase-js

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

function getMockProducts(searchTerm?: string, category?: string) {
  const mockProducts = [
    {
      id: "1",
      name: "Mock Product 1",
      description: "This is a mock product",
      price: 20,
      category: "mock",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      name: "Mock Product 2",
      description: "This is another mock product",
      price: 30,
      category: "mock",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
  ]

  let filteredProducts = mockProducts

  if (searchTerm) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.category === category)
  }

  return filteredProducts
}
