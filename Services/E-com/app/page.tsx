import HeroBanner from "@/components/hero-banner"
import SearchBar from "@/components/search-bar"
import FeaturedProducts from "@/components/featured-products"
import CategoryCarousel from "@/components/category-carousel"
import NewsletterSignup from "@/components/newsletter-signup"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Search */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-50 to-indigo-100 border-b border-blue-200 shadow-lg backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 md:space-x-8">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Linka
              </h1>
              <nav className="hidden lg:flex space-x-6">
                <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
                  Categories
                </Link>
                <Link href="/deals" className="text-sm font-medium hover:text-primary transition-colors">
                  Deals
                </Link>
                <Link href="/products?filter=new" className="text-sm font-medium hover:text-primary transition-colors">
                  New Arrivals
                </Link>
                <Link
                  href="/products?filter=bestsellers"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Best Sellers
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="hidden sm:block">
                <SearchBar />
              </div>
              <div className="flex items-center space-x-3 md:space-x-4">
                <Link href="/account" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </Link>
                <Link href="/wishlist" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </Link>
                <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m6-5V6a2 2 0 00-2 2H9a2 2 0 00-2 2v2"
                    />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[10px] md:text-xs">
                    3
                  </span>
                </Link>
              </div>
            </div>
          </div>
          {/* Mobile Search Bar */}
          <div className="sm:hidden mt-3">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Banner */}
        <HeroBanner />

        {/* Category Carousel */}
        <section className="py-8 md:py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Shop by Category</h2>
            <CategoryCarousel />
          </div>
        </section>

        {/* Featured Products Sections */}
        <FeaturedProducts title="Best Sellers" subtitle="Our most popular products this month" type="bestsellers" />

        <FeaturedProducts
          title="New Arrivals"
          subtitle="Fresh products just added to our collection"
          type="new-arrivals"
          className="bg-gray-50"
        />

        <FeaturedProducts title="On Sale" subtitle="Limited time offers you don't want to miss" type="on-sale" />

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Linka
              </h3>
              <p className="text-gray-400 text-sm">
                Your one-stop destination for quality products at unbeatable prices.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white transition-colors">
                    Shipping Info
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/categories/electronics" className="hover:text-white transition-colors">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/categories/fashion" className="hover:text-white transition-colors">
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link href="/categories/home" className="hover:text-white transition-colors">
                    Home & Garden
                  </Link>
                </li>
                <li>
                  <Link href="/categories/sports" className="hover:text-white transition-colors">
                    Sports
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/account" className="hover:text-white transition-colors">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="hover:text-white transition-colors">
                    Order Tracking
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Linka. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
