"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plane, Users, Check, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Mock seat data for different aircraft types
const seatMaps: { [key: string]: any } = {
  "1": {
    // Emirates A380
    aircraft: "Airbus A380-800",
    airline: "Emirates",
    flightNumber: "EK 201",
    layout: {
      firstClass: {
        rows: [1, 2],
        seatsPerRow: 4,
        configuration: "1-2-1",
        price: 0, // included in first class ticket
      },
      business: {
        rows: [6, 7, 8, 9, 10, 11, 12, 13, 14],
        seatsPerRow: 6,
        configuration: "1-2-2-1",
        price: 200,
      },
      economy: {
        rows: Array.from({ length: 50 }, (_, i) => i + 20),
        seatsPerRow: 10,
        configuration: "3-4-3",
        price: 0, // included in economy ticket
      },
    },
    unavailableSeats: ["20A", "20B", "21F", "21G", "25C", "30A", "35F", "40J"],
    premiumSeats: ["20C", "20H", "21A", "21J", "22C", "22H"], // Exit rows, extra legroom
    selectedSeats: [],
  },
  "2": {
    // Qatar Airways 777
    aircraft: "Boeing 777-300ER",
    airline: "Qatar Airways",
    flightNumber: "QR 701",
    layout: {
      business: {
        rows: [1, 2, 3, 4, 5, 6],
        seatsPerRow: 6,
        configuration: "1-2-2-1",
        price: 150,
      },
      economy: {
        rows: Array.from({ length: 35 }, (_, i) => i + 10),
        seatsPerRow: 9,
        configuration: "3-3-3",
        price: 0,
      },
    },
    unavailableSeats: ["10A", "10B", "15F", "20C", "25A", "30F"],
    premiumSeats: ["10C", "10G", "15A", "15I", "20A", "20I"],
    selectedSeats: [],
  },
  "3": {
    // Turkish Airlines 787
    aircraft: "Boeing 787-9",
    airline: "Turkish Airlines",
    flightNumber: "TK 003",
    layout: {
      business: {
        rows: [1, 2, 3, 4],
        seatsPerRow: 6,
        configuration: "1-2-2-1",
        price: 120,
      },
      economy: {
        rows: Array.from({ length: 28 }, (_, i) => i + 8),
        seatsPerRow: 9,
        configuration: "3-3-3",
        price: 0,
      },
    },
    unavailableSeats: ["8A", "8B", "12F", "18C", "22A", "28F"],
    premiumSeats: ["8C", "8G", "12A", "12I", "18A", "18I"],
    selectedSeats: [],
  },
  "4": {
    // Lufthansa A340 (Business Class flight)
    aircraft: "Airbus A340-600",
    airline: "Lufthansa",
    flightNumber: "LH 441",
    layout: {
      business: {
        rows: Array.from({ length: 8 }, (_, i) => i + 1),
        seatsPerRow: 6,
        configuration: "1-2-2-1",
        price: 0, // included in business ticket
      },
      economy: {
        rows: Array.from({ length: 30 }, (_, i) => i + 15),
        seatsPerRow: 8,
        configuration: "2-4-2",
        price: 50, // upgrade fee from business
      },
    },
    unavailableSeats: ["1A", "2F", "15A", "15B", "20E", "25H"],
    premiumSeats: ["15C", "15F", "20A", "20H", "25A", "25H"],
    selectedSeats: [],
  },
}

export default function SeatMapPage() {
  const params = useParams()
  const flightId = params.id as string
  const seatMap = seatMaps[flightId]

  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [currentClass, setCurrentClass] = useState<string>("economy")

  if (!seatMap) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Seat map not available</h1>
          <Link href={`/flights/${flightId}`}>
            <Button>Back to Flight Details</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSeatClick = (seatId: string) => {
    if (seatMap.unavailableSeats.includes(seatId)) return

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId))
    } else {
      // For demo, allow only one seat selection
      setSelectedSeats([seatId])
    }
  }

  const getSeatStatus = (seatId: string) => {
    if (selectedSeats.includes(seatId)) return "selected"
    if (seatMap.unavailableSeats.includes(seatId)) return "unavailable"
    if (seatMap.premiumSeats.includes(seatId)) return "premium"
    return "available"
  }

  const getSeatPrice = (seatId: string, classType: string) => {
    const classConfig = seatMap.layout[classType]
    if (!classConfig) return 0

    if (seatMap.premiumSeats.includes(seatId)) {
      return classConfig.price + 25 // Premium seat surcharge
    }
    return classConfig.price
  }

  const renderSeat = (row: number, seatLetter: string, classType: string) => {
    const seatId = `${row}${seatLetter}`
    const status = getSeatStatus(seatId)
    const price = getSeatPrice(seatId, classType)

    return (
      <button
        key={seatId}
        onClick={() => handleSeatClick(seatId)}
        disabled={status === "unavailable"}
        className={cn("w-8 h-8 rounded-t-lg border-2 text-xs font-medium transition-all relative", {
          "bg-blue-600 text-white border-blue-600": status === "selected",
          "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed": status === "unavailable",
          "bg-yellow-100 text-yellow-800 border-yellow-400 hover:bg-yellow-200": status === "premium",
          "bg-white text-gray-700 border-gray-300 hover:bg-gray-50": status === "available",
        })}
        title={`Seat ${seatId} ${price > 0 ? `(+$${price})` : ""}`}
      >
        {seatLetter}
        {status === "unavailable" && <X className="h-3 w-3 absolute inset-0 m-auto" />}
        {status === "selected" && <Check className="h-3 w-3 absolute inset-0 m-auto" />}
      </button>
    )
  }

  const renderClassSection = (classType: string, classConfig: any) => {
    const seatLetters =
      classType === "firstClass" || classType === "business"
        ? ["A", "C", "D", "F"]
        : classConfig.seatsPerRow === 10
          ? ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"]
          : classConfig.seatsPerRow === 9
            ? ["A", "B", "C", "D", "E", "F", "G", "H", "J"]
            : ["A", "B", "C", "D", "E", "F", "G", "H"]

    return (
      <div className="space-y-2">
        <div className="text-center">
          <Badge variant="outline" className="mb-4 capitalize">
            {classType.replace(/([A-Z])/g, " $1").trim()} Class
          </Badge>
        </div>

        {classConfig.rows.map((row: number) => (
          <div key={row} className="flex items-center justify-center gap-1">
            <div className="w-6 text-xs text-gray-500 text-right mr-2">{row}</div>

            {/* Left side seats */}
            <div className="flex gap-1">
              {seatLetters
                .slice(0, Math.ceil(seatLetters.length / 2))
                .map((letter) => renderSeat(row, letter, classType))}
            </div>

            {/* Aisle */}
            <div className="w-6"></div>

            {/* Right side seats */}
            <div className="flex gap-1">
              {seatLetters.slice(Math.ceil(seatLetters.length / 2)).map((letter) => renderSeat(row, letter, classType))}
            </div>

            <div className="w-6 text-xs text-gray-500 text-left ml-2">{row}</div>
          </div>
        ))}

        {classType !== "economy" && <div className="h-4 border-b border-gray-200 my-4"></div>}
      </div>
    )
  }

  const totalPrice = selectedSeats.reduce((total, seatId) => {
    const row = Number.parseInt(seatId)
    let classType = "economy"

    // Determine class based on row number
    Object.entries(seatMap.layout).forEach(([type, config]: [string, any]) => {
      if (config.rows.includes(row)) {
        classType = type
      }
    })

    return total + getSeatPrice(seatId, classType)
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/flights/${flightId}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Flight Details
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Plane className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">Linka</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  {seatMap.airline} {seatMap.flightNumber} - {seatMap.aircraft}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Legend */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-t"></div>
                    <span className="text-sm">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-400 rounded-t"></div>
                    <span className="text-sm">Premium (+$25)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 border-2 border-blue-600 rounded-t"></div>
                    <span className="text-sm">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 border-2 border-gray-300 rounded-t"></div>
                    <span className="text-sm">Unavailable</span>
                  </div>
                </div>

                {/* Aircraft Outline */}
                <div className="max-w-md mx-auto bg-white border-2 border-gray-300 rounded-t-full rounded-b-lg p-6">
                  {/* Cockpit */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-8 bg-gray-200 rounded-t-full mx-auto mb-2"></div>
                    <div className="text-xs text-gray-500">Cockpit</div>
                  </div>

                  {/* Seat Sections */}
                  <div className="space-y-6">
                    {Object.entries(seatMap.layout).map(([classType, classConfig]) => (
                      <div key={classType}>{renderClassSection(classType, classConfig)}</div>
                    ))}
                  </div>

                  {/* Tail */}
                  <div className="text-center mt-6">
                    <div className="text-xs text-gray-500 mb-2">Rear</div>
                    <div className="w-12 h-4 bg-gray-200 rounded-b mx-auto"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selection Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Seat Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedSeats.length > 0 ? (
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Selected Seats:</div>
                    {selectedSeats.map((seatId) => {
                      const row = Number.parseInt(seatId)
                      let classType = "economy"
                      let className = "Economy"

                      Object.entries(seatMap.layout).forEach(([type, config]: [string, any]) => {
                        if (config.rows.includes(row)) {
                          classType = type
                          className = type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, " $1")
                        }
                      })

                      const price = getSeatPrice(seatId, classType)
                      const isPremium = seatMap.premiumSeats.includes(seatId)

                      return (
                        <div key={seatId} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div>
                            <div className="font-medium">Seat {seatId}</div>
                            <div className="text-sm text-gray-600">
                              {className} {isPremium && "• Premium"}
                            </div>
                          </div>
                          <div className="text-right">
                            {price > 0 ? (
                              <div className="font-medium text-blue-600">+${price}</div>
                            ) : (
                              <div className="text-sm text-green-600">Included</div>
                            )}
                          </div>
                        </div>
                      )
                    })}

                    <Separator />

                    <div className="flex items-center justify-between font-medium">
                      <span>Total Seat Fees:</span>
                      <span className="text-lg text-blue-600">{totalPrice > 0 ? `$${totalPrice}` : "Free"}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <div className="text-sm">Select a seat to continue</div>
                  </div>
                )}

                <div className="space-y-2">
                  <Link href="/booking">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={selectedSeats.length === 0}>
                      Continue to Booking
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full bg-transparent">
                    Skip Seat Selection
                  </Button>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="text-sm">
                    <div className="font-medium text-yellow-800 mb-1">Note</div>
                    <div className="text-yellow-700">
                      Seat selection is optional. You can choose seats during check-in if you prefer.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
