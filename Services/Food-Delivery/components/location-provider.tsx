"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

interface LocationContextType {
  location: string
  setLocation: (location: string) => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState("")

  return <LocationContext.Provider value={{ location, setLocation }}>{children}</LocationContext.Provider>
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider")
  }
  return context
}
