"use client"

import Image from "next/image"
import type { Product } from "@/app/actions/product-actions"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  products: Product[]
  viewMode?: "grid" | "list"
}
export function ProductGrid({ products, viewMode = "grid" }: Props) {
  if (!products.length) return <p className="text-center text-muted-foreground">No items found.</p>

  const isGrid = viewMode === "grid"
  return (
    <div className={cn("gap-6", isGrid ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col divide-y")}>
      {products.map((p) => (
        <Card key={p.id} className={cn("transition-all hover:shadow-lg", !isGrid && "flex flex-col sm:flex-row")}>
          <CardHeader className={cn(!isGrid && "sm:w-56")}>
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={p.images?.[0] ?? "/placeholder.svg?height=400&width=400"}
                alt={p.name}
                fill
                className="object-cover"
              />
            </div>
          </CardHeader>

          <CardContent className="flex flex-col justify-between gap-3 p-4">
            <div>
              <h3 className="font-semibold line-clamp-2">{p.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-primary">K{p.price}</span>
                {p.compare_at_price && (
                  <span className="ml-2 text-sm line-through text-muted-foreground">K{p.compare_at_price}</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                {p.rating?.toFixed(1) ?? "4.5"}
              </div>
            </div>

            {p.type === "service" && (
              <Badge variant="outline" className="self-start">
                Service • {p.duration ?? "Flexible"}
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
