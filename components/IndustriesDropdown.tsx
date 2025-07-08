"use client"

import React from "react"
import Link from "next/link"

const industries = [
  { name: "E-com", url: "http://localhost:3001" },
  { name: "E-Learning", url: "http://localhost:3002" },
  { name: "Entertainment & Streaming", url: "http://localhost:3003" },
  { name: "Healthcare", url: "http://localhost:3004" },
  { name: "Food Delivery", url: "http://localhost:3005" },
  { name: "Logistics & Delivery", url: "http://localhost:3006" },
  { name: "Wholesale", url: "http://localhost:3007" },
]

export default function IndustriesDropdown() {
  return (
    <div className="relative group">
      <button className="text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors duration-200 relative group">
        Industries
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-bg-linka transition-all duration-200 group-hover:w-full"></span>
      </button>
      <div className="absolute left-0 mt-2 w-56 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <ul className="py-2">
          {industries.map((industry) => (
            <li key={industry.name}>
              <Link
                href={industry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {industry.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
