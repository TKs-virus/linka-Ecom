"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { X, Trash2, Archive, Mail, Download, Package, Truck, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface BulkActionsToolbarProps {
  selectedCount: number
  onClearSelection: () => void
  type: "products" | "orders" | "customers"
  selectedIds: string[]
  onBulkAction: (action: string, value?: string) => Promise<void>
}

export function BulkActionsToolbar({
  selectedCount,
  onClearSelection,
  type,
  selectedIds,
  onBulkAction,
}: BulkActionsToolbarProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleBulkAction = async (action: string, value?: string) => {
    setIsLoading(true)
    try {
      await onBulkAction(action, value)
      toast.success(`Bulk ${action} completed successfully`)
      onClearSelection()
    } catch (error) {
      toast.error(`Failed to perform bulk ${action}`)
    } finally {
      setIsLoading(false)
    }
  }

  const renderProductActions = () => (
    <>
      <Select onValueChange={(value) => handleBulkAction("updateStatus", value)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Update Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Set Active</SelectItem>
          <SelectItem value="inactive">Set Inactive</SelectItem>
          <SelectItem value="draft">Set Draft</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleBulkAction("updateCategory", value)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Change Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="clothing">Clothing</SelectItem>
          <SelectItem value="home">Home & Garden</SelectItem>
          <SelectItem value="sports">Sports</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="sm" onClick={() => handleBulkAction("export")} disabled={isLoading}>
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive Products</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to archive {selectedCount} products? This will hide them from your store but keep
              them in your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleBulkAction("archive")}>Archive Products</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )

  const renderOrderActions = () => (
    <>
      <Select onValueChange={(value) => handleBulkAction("updateStatus", value)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Update Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="processing">
            <div className="flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Processing
            </div>
          </SelectItem>
          <SelectItem value="shipped">
            <div className="flex items-center">
              <Truck className="h-4 w-4 mr-2" />
              Shipped
            </div>
          </SelectItem>
          <SelectItem value="delivered">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Delivered
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="sm" onClick={() => handleBulkAction("sendNotification")} disabled={isLoading}>
        <Mail className="h-4 w-4 mr-2" />
        Notify Customers
      </Button>

      <Button variant="outline" size="sm" onClick={() => handleBulkAction("export")} disabled={isLoading}>
        <Download className="h-4 w-4 mr-2" />
        Export Orders
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Cancel Orders
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Orders</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel {selectedCount} orders? This action cannot be undone and customers will be
              notified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleBulkAction("cancel")}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Cancel Orders
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )

  const renderCustomerActions = () => (
    <>
      <Select onValueChange={(value) => handleBulkAction("updateStatus", value)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Update Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Set Active</SelectItem>
          <SelectItem value="inactive">Set Inactive</SelectItem>
          <SelectItem value="vip">Mark as VIP</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="sm" onClick={() => handleBulkAction("sendEmail")} disabled={isLoading}>
        <Mail className="h-4 w-4 mr-2" />
        Send Email
      </Button>

      <Button variant="outline" size="sm" onClick={() => handleBulkAction("export")} disabled={isLoading}>
        <Download className="h-4 w-4 mr-2" />
        Export Data
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive Customers</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to archive {selectedCount} customers? This will hide them from your active customer
              list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleBulkAction("archive")}>Archive Customers</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )

  if (selectedCount === 0) return null

  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 border rounded-lg mb-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{selectedCount} selected</Badge>
          <Button variant="ghost" size="sm" onClick={onClearSelection} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {type === "products" && renderProductActions()}
        {type === "orders" && renderOrderActions()}
        {type === "customers" && renderCustomerActions()}
      </div>
    </div>
  )
}
