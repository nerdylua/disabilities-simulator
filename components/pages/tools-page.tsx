"use client"

import { useState, useEffect } from "react"
import { Palette, Type, Zap, CheckCircle, XCircle, Copy, RotateCcw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Color contrast calculation functions
function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0
  
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  return (brightest + 0.05) / (darkest + 0.05)
}

interface ContrastResult {
  ratio: number
  aaNormal: boolean
  aaLarge: boolean
  aaaNormal: boolean
  aaaLarge: boolean
}

function ContrastChecker() {
  const [foregroundColor, setForegroundColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [result, setResult] = useState<ContrastResult | null>(null)

  useEffect(() => {
    const ratio = getContrastRatio(foregroundColor, backgroundColor)
    setResult({
      ratio,
      aaNormal: ratio >= 4.5,
      aaLarge: ratio >= 3,
      aaaNormal: ratio >= 7,
      aaaLarge: ratio >= 4.5
    })
  }, [foregroundColor, backgroundColor])

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`Contrast ratio: ${result.ratio.toFixed(2)}:1`)
    }
  }

  const swapColors = () => {
    const temp = foregroundColor
    setForegroundColor(backgroundColor)
    setBackgroundColor(temp)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Color Contrast Checker
            </CardTitle>
            <CardDescription>
              Test color combinations for WCAG compliance
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={swapColors}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={copyResult}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Foreground Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={foregroundColor}
                onChange={(e) => setForegroundColor(e.target.value)}
                className="h-10 w-16 border border-border rounded"
              />
              <input
                type="text"
                value={foregroundColor}
                onChange={(e) => setForegroundColor(e.target.value)}
                className="flex-1 px-3 py-2 border border-border rounded text-sm"
                placeholder="#000000"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Background Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="h-10 w-16 border border-border rounded"
              />
              <input
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="flex-1 px-3 py-2 border border-border rounded text-sm"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div 
          className="p-6 rounded-lg border"
          style={{ backgroundColor, color: foregroundColor }}
        >
          <h3 className="text-xl font-semibold mb-2">Sample Text Preview</h3>
          <p className="text-base mb-2">
            This is how normal text appears with your color combination.
          </p>
          <p className="text-lg font-semibold">
            This is how large text appears with your color combination.
          </p>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">
                {result.ratio.toFixed(2)}:1
              </div>
              <div className="text-sm text-muted-foreground">Contrast Ratio</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">WCAG AA</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {result.aaNormal ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <XCircle className="h-4 w-4 text-red-500" />
                    }
                    <span className="text-sm">Normal text (4.5:1)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {result.aaLarge ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <XCircle className="h-4 w-4 text-red-500" />
                    }
                    <span className="text-sm">Large text (3:1)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">WCAG AAA</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {result.aaaNormal ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <XCircle className="h-4 w-4 text-red-500" />
                    }
                    <span className="text-sm">Normal text (7:1)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {result.aaaLarge ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <XCircle className="h-4 w-4 text-red-500" />
                    }
                    <span className="text-sm">Large text (4.5:1)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function TextSizeTester() {
  const [fontSize, setFontSize] = useState([16])
  const [sampleText, setSampleText] = useState("The quick brown fox jumps over the lazy dog. This sample text helps you test readability at different sizes.")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="h-5 w-5" />
          Text Size Tester
        </CardTitle>
        <CardDescription>
          Test text readability at different sizes (WCAG requires 200% zoom support)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Font Size: {fontSize[0]}px ({Math.round((fontSize[0] / 16) * 100)}%)
          </label>
          <Slider
            value={fontSize}
            onValueChange={setFontSize}
            max={32}
            min={12}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sample Text</label>
          <textarea
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            className="w-full p-3 border border-border rounded text-sm h-24 resize-none"
            placeholder="Enter your text to test..."
          />
        </div>

        <div className="border rounded-lg p-6 bg-muted/20">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Preview:</h3>
          <p style={{ fontSize: `${fontSize[0]}px`, lineHeight: 1.5 }}>
            {sampleText}
          </p>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>• Normal browser default is 16px (100%)</p>
          <p>• WCAG requires content to work at 200% zoom (32px)</p>
          <p>• Large text is considered 18px+ (or 14px+ bold)</p>
        </div>
      </CardContent>
    </Card>
  )
}

const quickActions = [
  {
    title: "Check Website",
    description: "Run automated accessibility checks on any URL",
    icon: Zap,
    action: "https://wave.webaim.org/",
    external: true
  },
  {
    title: "Screen Reader Test",
    description: "Test with NVDA (Windows) or VoiceOver (Mac)",
    icon: Type,
    action: "/guidelines",
    external: false
  },
  {
    title: "Keyboard Navigation",
    description: "Navigate this page using only Tab, Enter and arrow keys",
    icon: CheckCircle,
    action: "/motor",
    external: false
  }
]

export function ToolsPage() {
  return (
    <div className="min-h-screen bg-background grid-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="outline" className="mb-6 text-primary border-primary/20">
          ✨ Accessibility Tools
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Test and Improve <span className="text-primary">Accessibility</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Use these interactive tools to check color contrast, test text readability, 
            and validate accessibility compliance.
          </p>
        </div>

        {/* Main Tools */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <ContrastChecker />
          <TextSizeTester />
        </div>

        {/* Quick Actions */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Quick Accessibility Checks</h2>
            <p className="text-muted-foreground">
              Try these immediate actions to test accessibility
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <action.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {action.external ? (
                    <a 
                      href={action.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors dark:text-black"
                    >
                      Try Tool →
                    </a>
                  ) : (
                    <Button className="w-full" variant="outline" asChild>
                      <Link href={action.action}>
                        Test Now
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <section>
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary mb-4">More Accessibility Resources</CardTitle>
            </CardHeader>
            <CardContent className="max-w-4xl mx-auto">
              <Tabs defaultValue="browser" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="browser">Browser Extensions</TabsTrigger>
                  <TabsTrigger value="testing">Testing Tools</TabsTrigger>
                  <TabsTrigger value="validators">Validators</TabsTrigger>
                </TabsList>
                
                <TabsContent value="browser" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Chrome Extensions</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• axe DevTools - Free accessibility testing</li>
                        <li>• WAVE Evaluation Tool - Visual feedback</li>
                        <li>• Lighthouse - Built-in accessibility audit</li>
                        <li>• Colour Contrast Analyser - Quick contrast check</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Firefox Add-ons</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Web Developer Toolbar - Comprehensive testing</li>
                        <li>• NVDA Screen Reader - Test with assistive tech</li>
                        <li>• Accessibility Insights - Microsoft&apos;s tool</li>
                        <li>• Headings Map - Document structure analysis</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="testing" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Automated Testing</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Pa11y - Command line testing</li>
                        <li>• axe-core - JavaScript accessibility engine</li>
                        <li>• Playwright - End-to-end testing with a11y</li>
                        <li>• Jest-axe - Unit test accessibility</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Manual Testing</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Keyboard navigation testing</li>
                        <li>• Screen reader testing (NVDA, JAWS, VoiceOver)</li>
                        <li>• Color blindness simulation</li>
                        <li>• Zoom testing (up to 200%)</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="validators" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Online Validators</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• W3C Markup Validator - HTML validation</li>
                        <li>• WAVE Web Accessibility Evaluator</li>
                        <li>• AChecker - Comprehensive accessibility review</li>
                        <li>• Colour Contrast Analyser (online)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Compliance Checkers</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• WCAG 2.1 compliance checklist</li>
                        <li>• Section 508 validator</li>
                        <li>• EN 301 549 compliance check</li>
                        <li>• ADA compliance audit</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
} 