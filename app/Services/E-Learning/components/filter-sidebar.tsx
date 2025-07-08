"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void
}

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [subjects, setSubjects] = useState<string[]>([])
  const [levels, setLevels] = useState<string[]>([])
  const [formats, setFormats] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState("all")
  const [language, setLanguage] = useState("all")
  const [instructor, setInstructor] = useState("")

  const handleSubjectChange = (subject: string, checked: boolean) => {
    const newSubjects = checked ? [...subjects, subject] : subjects.filter((s) => s !== subject)
    setSubjects(newSubjects)
    applyFilters({ subjects: newSubjects, levels, formats, priceRange, language, instructor })
  }

  const handleLevelChange = (level: string, checked: boolean) => {
    const newLevels = checked ? [...levels, level] : levels.filter((l) => l !== level)
    setLevels(newLevels)
    applyFilters({ subjects, levels: newLevels, formats, priceRange, language, instructor })
  }

  const handleFormatChange = (format: string, checked: boolean) => {
    const newFormats = checked ? [...formats, format] : formats.filter((f) => f !== format)
    setFormats(newFormats)
    applyFilters({ subjects, levels, formats: newFormats, priceRange, language, instructor })
  }

  const handlePriceChange = (value: string) => {
    setPriceRange(value)
    applyFilters({ subjects, levels, formats, priceRange: value, language, instructor })
  }

  const applyFilters = (filters: any) => {
    onFilterChange(filters)
  }

  const clearFilters = () => {
    setSubjects([])
    setLevels([])
    setFormats([])
    setPriceRange("all")
    setLanguage("all")
    setInstructor("")
    onFilterChange({ subjects: [], levels: [], formats: [], priceRange: "all", language: "all", instructor: "" })
  }

  const subjectsList = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Digital Marketing",
    "Graphic Design",
  ]

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Subjects */}
        <div>
          <h3 className="font-semibold mb-3">Subjects</h3>
          <div className="space-y-2">
            {subjectsList.map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox
                  id={subject}
                  checked={subjects.includes(subject)}
                  onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                />
                <Label htmlFor={subject} className="text-sm">
                  {subject}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Course Level */}
        <div>
          <h3 className="font-semibold mb-3">Course Level</h3>
          <div className="space-y-2">
            {["Beginner", "Intermediate", "Advanced", "All Levels"].map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={level}
                  checked={levels.includes(level)}
                  onCheckedChange={(checked) => handleLevelChange(level, checked as boolean)}
                />
                <Label htmlFor={level} className="text-sm">
                  {level}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price */}
        <div>
          <h3 className="font-semibold mb-3">Price</h3>
          <RadioGroup value={priceRange} onValueChange={handlePriceChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="text-sm">
                All
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="free" />
              <Label htmlFor="free" className="text-sm">
                Free
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paid" id="paid" />
              <Label htmlFor="paid" className="text-sm">
                Paid
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}

export default FilterSidebar
