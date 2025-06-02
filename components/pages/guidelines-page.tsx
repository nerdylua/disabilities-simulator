"use client"

import { CheckCircle, AlertCircle, Eye, Keyboard, Volume2, MousePointer, Lightbulb, Code, Palette, Type } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const wcagPrinciples = [
  {
    title: "Perceivable",
    icon: Eye,
    color: "text-blue-500",
    description: "Information must be presentable in ways users can perceive",
    guidelines: [
      "Provide text alternatives for images",
      "Offer captions and transcripts for videos",
      "Ensure sufficient color contrast (4.5:1 for normal text)",
      "Make content adaptable to different presentations"
    ]
  },
  {
    title: "Operable", 
    icon: MousePointer,
    color: "text-green-500",
    description: "Interface components must be operable by all users",
    guidelines: [
      "Make all functionality keyboard accessible",
      "Give users enough time to read content",
      "Don't use content that causes seizures",
      "Help users navigate and find content"
    ]
  },
  {
    title: "Understandable",
    icon: Lightbulb,
    color: "text-orange-500", 
    description: "Information and UI operation must be understandable",
    guidelines: [
      "Make text readable and understandable",
      "Make content appear and operate predictably",
      "Help users avoid and correct mistakes",
      "Use clear and simple language"
    ]
  },
  {
    title: "Robust",
    icon: Code,
    color: "text-purple-500",
    description: "Content must be robust enough for various assistive technologies",
    guidelines: [
      "Use valid, semantic HTML",
      "Ensure compatibility with assistive technologies",
      "Follow web standards and best practices",
      "Test with real assistive technology users"
    ]
  }
]

const quickTips = [
  {
    category: "Visual",
    icon: Palette,
    tips: [
      "Use color contrast ratio of at least 4.5:1 for normal text",
      "Don't rely on color alone to convey information",
      "Provide alt text for all meaningful images",
      "Ensure text can be resized up to 200% without losing functionality"
    ]
  },
  {
    category: "Keyboard",
    icon: Keyboard,
    tips: [
      "Ensure all interactive elements are keyboard accessible",
      "Provide visible focus indicators",
      "Implement logical tab order",
      "Avoid keyboard traps"
    ]
  },
  {
    category: "Audio",
    icon: Volume2,
    tips: [
      "Provide captions for all videos",
      "Offer transcripts for audio content",
      "Don't auto-play audio",
      "Provide audio descriptions for visual content"
    ]
  },
  {
    category: "Content",
    icon: Type,
    tips: [
      "Use clear, simple language",
      "Provide consistent navigation",
      "Use descriptive headings and labels",
      "Give clear error messages and instructions"
    ]
  }
]

const commonMistakes = [
  {
    mistake: "Missing alt text on images",
    impact: "Screen readers can't describe images to blind users",
    solution: "Add descriptive alt attributes to all meaningful images"
  },
  {
    mistake: "Poor color contrast",
    impact: "Text becomes unreadable for users with visual impairments",
    solution: "Use tools to check contrast ratios and aim for 4.5:1 minimum"
  },
  {
    mistake: "No keyboard navigation",
    impact: "Users who can't use a mouse are locked out",
    solution: "Ensure all interactive elements work with Tab, Enter, and arrow keys"
  },
  {
    mistake: "Auto-playing media",
    impact: "Causes confusion and accessibility issues",
    solution: "Let users choose when to play audio or video content"
  },
  {
    mistake: "Unclear error messages", 
    impact: "Users don't understand what went wrong or how to fix it",
    solution: "Provide specific, actionable error messages"
  }
]

export function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-background grid-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="outline" className="mb-6 text-primary border-primary/20">
            Accessibility Guidelines
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Building <span className="text-primary">Accessible</span> Digital Experiences
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Learn the essential principles and practical techniques for creating inclusive websites 
            and applications that work for everyone.
          </p>
        </div>

        {/* WCAG Principles */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">WCAG 2.1 Principles</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The Web Content Accessibility Guidelines provide the foundation for digital accessibility.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {wcagPrinciples.map((principle, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <principle.icon className={`h-8 w-8 ${principle.color}`} />
                    <CardTitle className="text-xl">{principle.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {principle.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {principle.guidelines.map((guideline, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{guideline}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Tips by Category */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Quick Implementation Tips</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Practical advice you can implement immediately to improve accessibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickTips.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <category.icon className="h-6 w-6 text-primary mb-2" />
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        • {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Common Mistakes to Avoid</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn from these frequent accessibility issues and how to fix them.
            </p>
          </div>

          <div className="space-y-6">
            {commonMistakes.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <h3 className="font-semibold text-foreground">The Mistake</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.mistake}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Impact</h3>
                      <p className="text-sm text-muted-foreground">{item.impact}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <h3 className="font-semibold text-foreground">Solution</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testing Section */}
        <section className="mb-20">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary mb-4">Testing Your Accessibility</CardTitle>
            </CardHeader>
            <CardContent className="max-w-4xl mx-auto">
              <Tabs defaultValue="automated" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="automated">Automated Testing</TabsTrigger>
                  <TabsTrigger value="manual">Manual Testing</TabsTrigger>
                  <TabsTrigger value="user">User Testing</TabsTrigger>
                </TabsList>
                
                <TabsContent value="automated" className="space-y-4">
                  <h3 className="font-semibold text-foreground">Automated Testing Tools</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>axe DevTools:</strong> Browser extension for accessibility testing</li>
                    <li>• <strong>WAVE:</strong> Web accessibility evaluation tool</li>
                    <li>• <strong>Lighthouse:</strong> Built into Chrome DevTools</li>
                    <li>• <strong>Pa11y:</strong> Command line accessibility testing</li>
                  </ul>
                </TabsContent>

                <TabsContent value="manual" className="space-y-4">
                  <h3 className="font-semibold text-foreground">Manual Testing Checklist</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Navigate using only your keyboard</li>
                    <li>• Test with screen reader (NVDA, JAWS, VoiceOver)</li>
                    <li>• Check color contrast with online tools</li>
                    <li>• Resize text to 200% and test usability</li>
                    <li>• Disable images and check alt text</li>
                  </ul>
                </TabsContent>

                <TabsContent value="user" className="space-y-4">
                  <h3 className="font-semibold text-foreground">User Testing Best Practices</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Include users with disabilities in your testing process</li>
                    <li>• Test with real assistive technology users</li>
                    <li>• Observe how people actually use your site</li>
                    <li>• Ask for feedback on pain points</li>
                    <li>• Test early and iterate often</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start implementing these guidelines today and help create a more inclusive web for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/tools" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Try Our Accessibility Tools
              </a>
              <a 
                href="/visual" 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-foreground bg-background hover:bg-muted transition-colors"
              >
                Experience the Simulations
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 