import Link from "next/link"
import { Star, Clock, Users } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CourseCardProps {
  id: string
  title: string
  instructor: string
  rating: number
  students: number
  duration: string
  price: number
  originalPrice?: number
  image: string
  level: string
  category: string
}

export function CourseCard({
  id,
  title,
  instructor,
  rating,
  students,
  duration,
  price,
  originalPrice,
  image,
  level,
  category,
}: CourseCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
      <Link href={`/course/${id}`}>
        <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {level}
            </Badge>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600">{title}</h3>
          <p className="text-gray-600 text-sm mb-3">{instructor}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{price === 0 ? "Free" : `$${price}`}</span>
              {originalPrice && <span className="text-gray-500 line-through">${originalPrice}</span>}
            </div>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
