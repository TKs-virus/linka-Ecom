"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Users, UserPlus, Mail, Phone, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BulkActionsToolbar } from "@/components/retailer/bulk-actions-toolbar"
import { bulkUpdateCustomers, exportData } from "@/app/actions/bulk-actions"
import { toast } from "sonner"

/* -------------------------------------------------------------------------- */
/*                              Mock data (demo)                              */
/* -------------------------------------------------------------------------- */

export type CustomerStatus = "active" | "inactive" | "vip"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  orders: number
  totalSpent: number
  lastOrder: string
  status: CustomerStatus
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+260 97 123 4567",
    orders: 12,
    totalSpent: 2450.0,
    lastOrder: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+260 96 987 6543",
    orders: 8,
    totalSpent: 1890.5,
    lastOrder: "2024-01-10",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+260 95 555 1234",
    orders: 3,
    totalSpent: 567.25,
    lastOrder: "2024-01-05",
    status: "inactive",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+260 94 777 8888",
    orders: 15,
    totalSpent: 3200.0,
    lastOrder: "2024-01-18",
    status: "vip",
  },
  {
    id: "5",
    name: "Tom Brown",
    email: "tom@example.com",
    phone: "+260 93 444 5555",
    orders: 1,
    totalSpent: 149.99,
    lastOrder: "2024-01-01",
    status: "inactive",
  },
]

/* -------------------------------------------------------------------------- */

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  /* ---------------------------- Filter & Search --------------------------- */
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  /* ---------------------------- Selection logic --------------------------- */
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(filteredCustomers.map((c) => c.id))
    } else {
      setSelectedCustomers([])
    }
  }

  const handleSelectCustomer = (id: string, checked: boolean) => {
    setSelectedCustomers((prev) => (checked ? [...prev, id] : prev.filter((cid) => cid !== id)))
  }

  const isAllSelected = filteredCustomers.length > 0 && selectedCustomers.length === filteredCustomers.length
  const isIndeterminate = selectedCustomers.length > 0 && selectedCustomers.length < filteredCustomers.length

  /* ----------------------------- Bulk actions ----------------------------- */
  const handleBulkAction = async (action: string, value?: string) => {
    try {
      if (action === "export") {
        const result = await exportData("customers", selectedCustomers)
        toast.success(result.message)
        return
      }

      const result = await bulkUpdateCustomers(selectedCustomers, action, value)
      toast.success(result.message)

      // update UI
      if (action === "updateStatus") {
        setCustomers((prev) =>
          prev.map((c) => (selectedCustomers.includes(c.id) ? { ...c, status: value as CustomerStatus } : c)),
        )
      } else if (action === "archive") {
        setCustomers((prev) => prev.filter((c) => !selectedCustomers.includes(c.id)))
      }

      setSelectedCustomers([])
    } catch {
      toast.error("Failed to perform bulk action")
    }
  }

  /* ------------------------------ Render page ----------------------------- */
  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* heading */}
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground">Manage your customer relationships</p>
      </div>

      {/* stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Customers"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          value={customers.length}
          hint="Registered customers"
        />
        <StatCard
          title="Active Customers"
          icon={<UserPlus className="h-4 w-4 text-green-600" />}
          value={customers.filter((c) => c.status === "active").length}
          hint="Active this month"
        />
        <StatCard
          title="VIP Customers"
          icon={<Badge className="h-4 w-4 text-muted-foreground" />}
          value={customers.filter((c) => c.status === "vip").length}
          hint="High-value customers"
        />
        <StatCard
          title="Repeat Customers"
          icon={<Users className="h-4 w-4 text-blue-600" />}
          value={customers.filter((c) => c.orders > 1).length}
          hint="Multiple orders"
        />
      </div>

      {/* search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* bulk actions */}
      <BulkActionsToolbar
        selectedCount={selectedCustomers.length}
        selectedIds={selectedCustomers}
        onClearSelection={() => setSelectedCustomers([])}
        type="customers"
        onBulkAction={handleBulkAction}
      />

      {/* table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>{filteredCustomers.length} customers in your database</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all customers"
                    {...(isIndeterminate && { "data-state": "indeterminate" })}
                  />
                </TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCustomers.includes(customer.id)}
                      onCheckedChange={(checked) => handleSelectCustomer(customer.id, checked as boolean)}
                      aria-label={`Select ${customer.name}`}
                    />
                  </TableCell>

                  {/* Customer */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" alt={customer.name} />
                        <AvatarFallback>
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {customer.id}</p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Contact */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{customer.orders} orders</TableCell>
                  <TableCell>ZMW {customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>{new Date(customer.lastOrder).toLocaleDateString()}</TableCell>

                  {/* status */}
                  <TableCell>
                    <Badge
                      variant={
                        customer.status === "active" ? "secondary" : customer.status === "vip" ? "default" : "outline"
                      }
                    >
                      {customer.status.toUpperCase()}
                    </Badge>
                  </TableCell>

                  {/* actions */}
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" aria-label="More actions">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {filteredCustomers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-12 text-center">
                    No customers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                          Reusable stat-card component                      */
/* -------------------------------------------------------------------------- */

interface StatCardProps {
  title: string
  icon: React.ReactNode
  value: number
  hint: string
}

function StatCard({ title, icon, value, hint }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  )
}
