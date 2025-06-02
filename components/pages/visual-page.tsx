"use client"

import { useState } from "react"
import { Eye, Palette, Sun, Moon, Zap, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

const colorBlindnessFilters = {
  none: "none",
  protanopia: "url(#protanopia)",
  deuteranopia: "url(#deuteranopia)", 
  tritanopia: "url(#tritanopia)",
}

const sampleImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"

export function VisualPage() {
  const [colorBlindType, setColorBlindType] = useState<keyof typeof colorBlindnessFilters>("none")
  const [blurLevel, setBlurLevel] = useState([0])
  const [brightness, setBrightness] = useState([100])
  const [contrast, setContrast] = useState([100])
  const [simulationActive, setSimulationActive] = useState(false)

  const getFilterStyle = () => {
    if (!simulationActive) return {}
    
    return {
      filter: `
        ${colorBlindType !== "none" ? colorBlindnessFilters[colorBlindType] : ""}
        blur(${blurLevel[0]}px)
        brightness(${brightness[0]}%)
        contrast(${contrast[0]}%)
      `.trim(),
    }
  }

  return (
    <div className="min-h-screen bg-background grid-background">
      {/* SVG Filters for Color Blindness */}
      <svg className="hidden">
        <defs>
          {/* Protanopia (Red-blind) */}
          <filter id="protanopia">
            <feColorMatrix values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0"/>
          </filter>
          {/* Deuteranopia (Green-blind) */}
          <filter id="deuteranopia">
            <feColorMatrix values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0"/>
          </filter>
          {/* Tritanopia (Blue-blind) */}
          <filter id="tritanopia">
            <feColorMatrix values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0"/>
          </filter>
        </defs>
      </svg>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Eye className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Visual Impairment Simulator</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Experience how visual impairments affect the way people see and interact with digital content.
            285 million people worldwide live with visual impairments.
          </p>
        </div>

        {/* Main Simulation Controls */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-primary" />
                  Simulation Controls
                </CardTitle>
                <CardDescription>
                  Adjust settings to experience different visual impairments
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Simulation</span>
                <Switch 
                  checked={simulationActive}
                  onCheckedChange={setSimulationActive}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="colorblind" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="colorblind">Color Blindness</TabsTrigger>
                <TabsTrigger value="lowvision">Low Vision</TabsTrigger>
                <TabsTrigger value="brightness">Light Sensitivity</TabsTrigger>
                <TabsTrigger value="contrast">Contrast Issues</TabsTrigger>
              </TabsList>
              
              <TabsContent value="colorblind" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.keys(colorBlindnessFilters).map((type) => (
                    <Button
                      key={type}
                      variant={colorBlindType === type ? "default" : "outline"}
                      onClick={() => setColorBlindType(type as keyof typeof colorBlindnessFilters)}
                      className="capitalize"
                    >
                      {type === "none" ? "Normal Vision" : type}
                    </Button>
                  ))}
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Info className="h-4 w-4 inline mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Color blindness affects 1 in 12 men and 1 in 200 women worldwide.
                  </span>
                </div>
              </TabsContent>
              
              <TabsContent value="lowvision" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Blur Level: {blurLevel[0]}px
                  </label>
                  <Slider
                    value={blurLevel}
                    onValueChange={setBlurLevel}
                    max={20}
                    step={0.5}
                    className="w-full"
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Info className="h-4 w-4 inline mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Low vision affects millions globally and can make text and images appear blurry or unclear.
                  </span>
                </div>
              </TabsContent>
              
              <TabsContent value="brightness" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Brightness: {brightness[0]}%
                  </label>
                  <Slider
                    value={brightness}
                    onValueChange={setBrightness}
                    max={200}
                    min={20}
                    step={5}
                    className="w-full"
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Info className="h-4 w-4 inline mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Light sensitivity can make bright screens painful and difficult to use.
                  </span>
                </div>
              </TabsContent>
              
              <TabsContent value="contrast" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Contrast: {contrast[0]}%
                  </label>
                  <Slider
                    value={contrast}
                    onValueChange={setContrast}
                    max={200}
                    min={20}
                    step={5}
                    className="w-full"
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Info className="h-4 w-4 inline mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Poor contrast makes it difficult to distinguish between elements on a page.
                  </span>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Demo Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sample Image */}
          <Card>
            <CardHeader>
              <CardTitle>Image Perception</CardTitle>
              <CardDescription>
                See how visual impairments affect image viewing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <img
                  src={sampleImage}
                  alt="Sample landscape"
                  className="w-full h-48 object-cover rounded-lg transition-all duration-300"
                  style={getFilterStyle()}
                />
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-8 bg-red-500 rounded" style={getFilterStyle()}></div>
                  <div className="h-8 bg-green-500 rounded" style={getFilterStyle()}></div>
                  <div className="h-8 bg-blue-500 rounded" style={getFilterStyle()}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Text Readability */}
          <Card>
            <CardHeader>
              <CardTitle>Text Readability</CardTitle>
              <CardDescription>
                Experience how visual impairments affect reading
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4" style={getFilterStyle()}>
                <div className="p-4 bg-background border rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Sample Article Title</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    This is a sample paragraph that demonstrates how text appears 
                    with different visual impairments. Notice how harder it becomes 
                    to read with various filters applied.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge>Accessibility</Badge>
                    <Badge variant="outline">Web Design</Badge>
                    <Badge variant="secondary">UX</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full" size="sm">Primary Action</Button>
                  <Button variant="outline" className="w-full" size="sm">Secondary Action</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardHeader>
              <Palette className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle className="text-lg">Color Blindness</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Affects the ability to distinguish certain colors. Red-green color blindness 
                is the most common form.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Sun className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle className="text-lg">Low Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Partial sight that cannot be fully corrected with glasses, contacts, 
                or surgery.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Moon className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle className="text-lg">Light Sensitivity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Difficulty tolerating bright lights, which can cause discomfort 
                or pain.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 