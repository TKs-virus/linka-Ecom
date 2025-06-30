import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function AppFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Image src="/linka-logo.png" alt="Linka Logo" width={32} height={32} className="object-contain" />
              <span className="text-xl font-bold gradient-text-linka">Linka</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Connecting local businesses with customers. Support your community while discovering amazing products and
              services.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-brand-orange transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-brand-orange transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-orange">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* For Retailers */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-blue">For Retailers</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/retailers" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Become a Retailer
                </Link>
              </li>
              <li>
                <Link href="/retailers/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Retailer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/retailers/resources" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/retailers/support" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Retailer Support
                </Link>
              </li>
              <li>
                <Link href="/retailers/fees" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Pricing & Fees
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-orange">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-brand-orange" />
                <span className="text-gray-400 text-sm">support@linka.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-brand-blue" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-brand-orange mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123 Commerce Street
                  <br />
                  Business District
                  <br />
                  City, State 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 Linka. All rights reserved.</div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
