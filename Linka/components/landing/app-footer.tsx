import Link from "next/link"
import { ShoppingBag } from "lucide-react" // Changed Leaf to ShoppingBag

const footerNavs = [
  {
    label: "Platform",
    items: [
      { href: "#how-it-works", name: "How it Works" },
      { href: "/shop", name: "Shop Products" },
      { href: "#for-retailers", name: "For Retailers" },
      { href: "/delivery-signup", name: "For Delivery Partners" },
    ],
  },
  {
    label: "Company",
    items: [
      { href: "/about", name: "About Us" },
      { href: "/contact", name: "Contact" },
      { href: "/careers", name: "Careers" },
      { href: "/terms", name: "Terms of Service" },
      { href: "/privacy", name: "Privacy Policy" },
    ],
  },
  {
    label: "Support",
    items: [
      { href: "/faq", name: "FAQ" },
      { href: "/help-center", name: "Help Center" },
      { href: "mailto:support@linka.com", name: "support@linka.com" },
      { href: "tel:+2609XXXXXXXX", name: "+260 9XX XXX XXX" },
    ],
  },
]

export function AppFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-primary" /> {/* Changed icon */}
              <span className="text-2xl font-bold">Linka</span>
            </Link>
            <p className="text-sm text-muted-foreground">Connecting Zambia's commerce.</p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Linka Inc. All rights reserved.
            </p>
          </div>
          {footerNavs.map((nav) => (
            <div key={nav.label}>
              <h3 className="mb-3 font-semibold text-foreground">{nav.label}</h3>
              <ul className="space-y-2">
                {nav.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
