import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const featuredProducts = [
  {
    id: "1",
    name: "Handcrafted Chitenge Bag",
    price: "ZMW 250",
    image: "/placeholder.svg?width=300&height=200&text=Chitenge+Bag",
    category: "Fashion",
  },
  {
    id: "2",
    name: "Organic Zambian Honey",
    price: "ZMW 120",
    image: "/placeholder.svg?width=300&height=200&text=Organic+Honey",
    category: "Groceries",
  },
  {
    id: "3",
    name: "Wooden Maasai Figurine",
    price: "ZMW 180",
    image: "/placeholder.svg?width=300&height=200&text=Wooden+Figurine",
    category: "Art & Crafts",
  },
  {
    id: "4",
    name: "Local Spices Set",
    price: "ZMW 90",
    image: "/placeholder.svg?width=300&height=200&text=Spices+Set",
    category: "Pantry",
  },
]

export function FeaturedProductsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Products</h2>
          <p className="mt-4 text-lg text-muted-foreground">Discover unique items from talented local sellers.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-xs text-primary font-medium uppercase tracking-wider">{product.category}</p>
                <CardTitle className="mt-1 text-lg font-semibold">{product.name}</CardTitle>
                <p className="mt-2 text-xl font-bold text-foreground">{product.price}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/shop/product/${product.id}`}>View Product</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/shop">Explore All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
