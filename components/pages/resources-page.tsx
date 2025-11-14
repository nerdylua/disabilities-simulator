"use client"

import { BookOpen, ExternalLink, Users, Code, Lightbulb, FileText, Sun, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const externalResources = [
  {
    category: "Organizations",
    icon: Users,
    items: [
      {
        title: "Web Accessibility Initiative (WAI)",
        description: "W3C's initiative for web accessibility",
        url: "https://www.w3.org/WAI/",
        type: "Website"
      },
      {
        title: "Accessibility in Focus",
        description: "Deque University's accessibility training",
        url: "https://accessibility.deque.com/",
        type: "Training"
      },
      {
        title: "WebAIM",
        description: "Web accessibility in mind - training and resources",
        url: "https://webaim.org/",
        type: "Training"
      },
      {
        title: "A11Y Project",
        description: "Community-driven effort to make accessibility easier",
        url: "https://www.a11yproject.com/",
        type: "Community"
      }
    ]
  },
  {
    category: "Guidelines & Standards",
    icon: FileText,
    items: [
      {
        title: "WCAG 2.1 Guidelines",
        description: "Official Web Content Accessibility Guidelines",
        url: "https://www.w3.org/WAI/WCAG21/quickref/",
        type: "Standard"
      },
      {
        title: "Section 508 Standards",
        description: "US Federal accessibility requirements",
        url: "https://www.section508.gov/",
        type: "Legal"
      },
      {
        title: "EN 301 549",
        description: "European accessibility standard",
        url: "https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf",
        type: "Standard"
      },
      {
        title: "ADA Compliance Guide",
        description: "Americans with Disabilities Act digital compliance",
        url: "https://www.ada.gov/",
        type: "Legal"
      }
    ]
  },
  {
    category: "Development Tools",
    icon: Code,
    items: [
      {
        title: "axe DevTools",
        description: "Browser extension for accessibility testing",
        url: "https://www.deque.com/axe/devtools/",
        type: "Tool"
      },
      {
        title: "WAVE",
        description: "Web accessibility evaluation tool",
        url: "https://wave.webaim.org/",
        type: "Tool"
      },
      {
        title: "Colour Contrast Analyser",
        description: "Free desktop app for contrast testing",
        url: "https://www.tpgi.com/color-contrast-checker/",
        type: "Tool"
      },
      {
        title: "NVDA Screen Reader",
        description: "Free screen reader for Windows",
        url: "https://www.nvaccess.org/",
        type: "Software"
      }
    ]
  },
  {
    category: "Learning Materials",
    icon: BookOpen,
    items: [
      {
        title: "Inclusive Design Principles",
        description: "Microsoft's inclusive design methodology",
        url: "https://inclusive.microsoft.design/",
        type: "Guide"
      },
      {
        title: "Accessibility Fundamentals",
        description: "Google's accessibility course",
        url: "https://web.dev/accessibility/",
        type: "Course"
      },
      {
        title: "A11Y Style Guide",
        description: "Living style guide focused on accessibility",
        url: "https://a11y-style-guide.com/style-guide/",
        type: "Guide"
      },
      {
        title: "Inclusive Components",
        description: "Accessible component patterns",
        url: "https://inclusive-components.design/",
        type: "Patterns"
      }
    ]
  }
]

const internalResources = [
  {
    title: "Visual Accessibility Simulation",
    description: "Experience what it's like to navigate with visual impairments",
    href: "/visual",
    icon: Eye,
    type: "Simulation"
  },
  {
    title: "Environmental & Glare Simulation", 
    description: "Understand how glare, tunnel vision, and color filters impact perception",
    href: "/visual",
    icon: Sun,
    type: "Simulation"
  },
  {
    title: "Motor Accessibility Simulation",
    description: "Experience motor difficulty challenges in web navigation",
    href: "/motor",
    icon: Users,
    type: "Simulation"
  },
  {
    title: "Cognitive Accessibility Simulation",
    description: "Simulate cognitive load and attention difficulties",
    href: "/cognitive",
    icon: Lightbulb,
    type: "Simulation"
  },
  {
    title: "Accessibility Guidelines",
    description: "Comprehensive WCAG implementation guide",
    href: "/guidelines",
    icon: BookOpen,
    type: "Guide"
  },
  {
    title: "Testing Tools",
    description: "Interactive accessibility testing utilities",
    href: "/tools",
    icon: Code,
    type: "Tools"
  }
]

const quickLinks = [
  { title: "Contrast Checker", href: "/tools#contrast", icon: Eye },
  { title: "Text Size Tester", href: "/tools#text-size", icon: FileText },
  { title: "WCAG Checklist", href: "/guidelines#wcag", icon: BookOpen },
  { title: "Testing Guide", href: "/guidelines#testing", icon: Code },
  { title: "Common Mistakes", href: "/guidelines#mistakes", icon: Lightbulb },
  { title: "Best Practices", href: "/guidelines#best-practices", icon: Users }
]

export function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background grid-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="outline" className="mb-6 text-primary border-primary/20">
            Accessibility Resources
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Complete <span className="text-primary">Accessibility</span> Resource Center
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Everything you need to learn about, implement, and test web accessibility. 
            From beginner guides to advanced testing tools.
          </p>
        </div>

        {/* Quick Links */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Quick Access</h2>
            <p className="text-muted-foreground">Jump directly to the most commonly used resources</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <link.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="text-sm font-medium">{link.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Internal Resources */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">DisabilityLens Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our interactive simulations and educational tools to build accessibility awareness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internalResources.map((resource, index) => (
              <Link key={index} href={resource.href}>
                <Card className="h-full hover:shadow-lg transition-shadow group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <resource.icon className="h-8 w-8 text-primary" />
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {resource.title}
                    </CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full justify-between hover:bg-primary/10">
                      Get Started
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* External Resources */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">External Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated collection of the best accessibility resources from around the web
            </p>
          </div>

          <div className="space-y-12">
            {externalResources.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-semibold text-foreground">{category.category}</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <a 
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors dark:text-black"
                        >
                          Visit Resource →
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
} 