"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
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
    // Technology (12 options)
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "Software Engineering",
    "Game Development",
    "Blockchain",
    "Internet of Things (IoT)",

    // Business (12 options)
    "Digital Marketing",
    "Project Management",
    "Entrepreneurship",
    "Finance & Accounting",
    "Sales & Customer Relations",
    "Leadership & Management",
    "Human Resources",
    "Supply Chain Management",
    "Business Analytics",
    "E-commerce",
    "Real Estate",
    "Investment & Trading",

    // Arts & Design (8 options)
    "Graphic Design",
    "UI/UX Design",
    "Photography",
    "Video Editing",
    "Music Production",
    "Drawing & Painting",
    "3D Modeling & Animation",
    "Interior Design",

    // Science & Engineering (8 options)
    "Biology & Life Sciences",
    "Chemistry",
    "Physics",
    "Mathematics",
    "Environmental Science",
    "Psychology",
    "Medicine & Health",
    "Engineering",

    // Languages (8 options)
    "English Language",
    "Spanish",
    "French",
    "German",
    "Chinese (Mandarin)",
    "Japanese",
    "Italian",
    "Portuguese",

    // Personal Development (6 options)
    "Communication Skills",
    "Time Management",
    "Productivity & Organization",
    "Mindfulness & Meditation",
    "Career Development",
    "Public Speaking",
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
          <h3 className="font-semibold mb-3">Subjects/Disciplines</h3>
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

        {/* Learning Format */}
        <div>
          <h3 className="font-semibold mb-3">Learning Format</h3>
          <div className="space-y-2">
            {["Self-Paced", "Instructor-Led", "Bootcamp", "Certification", "Live Classes"].map((format) => (
              <div key={format} className="flex items-center space-x-2">
                <Checkbox
                  id={format}
                  checked={formats.includes(format)}
                  onCheckedChange={(checked) => handleFormatChange(format, checked as boolean)}
                />
                <Label htmlFor={format} className="text-sm">
                  {format}
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

        <Separator />

        {/* Language */}
        <div>
          <h3 className="font-semibold mb-3">Language</h3>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Instructor */}
        <div>
          <h3 className="font-semibold mb-3">Instructor</h3>
          <Input
            placeholder="Search instructor..."
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
