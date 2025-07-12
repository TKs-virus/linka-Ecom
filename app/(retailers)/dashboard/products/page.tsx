"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, Edit, Trash2, Eye, Package } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BulkActionsToolbar } from "@/components/retailer/bulk-actions-toolbar"
import { bulkUpdateProducts, exportData } from "@/app/actions/bulk-actions"
import { toast } from "sonner"

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    sku: "WBH-001",
    category: "Electronics",
    price: 299.99,
    stock_quantity: 45,
    status: "active",
    description: "High-quality wireless headphones with noise cancellation",
    brand: "TechSound",
  },
  {
    id: "2",
    name: "Cotton T-Shirt",
    sku: "CTS-002",
    category: "Clothing",
    price: 29.99,
    stock_quantity: 120,
    status: "active",
    description: "Comfortable 100% cotton t-shirt",
    brand: "ComfortWear",
  },
  {
    id: "3",
    name: "Smart Watch",
    sku: "SW-003",
    category: "Electronics",
    price: 199.99,
    stock_quantity: 8,
    status: "active",
    description: "Feature-rich smartwatch with health tracking",
    brand: "SmartTech",
  },
  {
    id: "4",
    name: "Running Shoes",
    sku: "RS-004",
    category: "Sports",
    price: 89.99,
    stock_quantity: 25,
    status: "inactive",
    description: "Comfortable running shoes for daily exercise",
    brand: "SportFit",
  },
  {
    id: "5",
    name: "Coffee Maker",
    sku: "CM-005",
    category: "Home",
    price: 149.99,
    stock_quantity: 15,
    status: "active",
    description: "Automatic drip coffee maker with timer",
    brand: "BrewMaster",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts((prev) => [...prev, productId])
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId))
    }
  }

  const handleBulkAction = async (action: string, value?: string) => {
    setIsLoading(true)
    try {
      if (action === "export") {
        const result = await exportData("products", selectedProducts)
        toast.success(result.message)
      } else {
        const result = await bulkUpdateProducts(selectedProducts, action, value)
        toast.success(result.message)

        // Update local state to reflect changes
        if (action === "updateStatus") {
          setProducts((prev) =>
            prev.map((product) =>
              selectedProducts.includes(product.id)
                ? { ...product, status: value === "active" ? "active" : "inactive" }
                : product,
            ),
          )
        } else if (action === "updateCategory") {
          setProducts((prev) =>
            prev.map((product) =>
              selectedProducts.includes(product.id) ? { ...product, category: value || product.category } : product,
            ),
          )
        } else if (action === "archive") {
          setProducts((prev) => prev.filter((product) => !selectedProducts.includes(product.id)))
        }
      }
    } catch (error) {
      toast.error("Failed to perform bulk action")
    } finally {
      setIsLoading(false)
    }
  }

  const isAllSelected = filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length
  const isIndeterminate = selectedProducts.length > 0 && selectedProducts.length < filteredProducts.length

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions Toolbar */}
      <BulkActionsToolbar
        selectedCount={selectedProducts.length}
        onClearSelection={() => setSelectedProducts([])}
        type="products"
        selectedIds={selectedProducts}
        onBulkAction={handleBulkAction}
      />

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>{filteredProducts.length} products in your inventory</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No products found</p>
              <Button asChild>
                <Link href="/dashboard/products/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Product
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all products"
                      {...(isIndeterminate && { "data-state": "indeterminate" })}
                    />
                  </TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                        aria-label={`Select ${product.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                          <Package className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>ZMW {product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={product.stock_quantity > 10 ? "default" : "destructive"}>
                        {product.stock_quantity} units
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.status === "active" ? "default" : "secondary"}>{product.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/dashboard/products/${product.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/dashboard/products/${product.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
