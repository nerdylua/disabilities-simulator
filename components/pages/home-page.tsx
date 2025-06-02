"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Eye, Ear, Hand, Brain, ChevronRight, BookOpen, Wrench, Users, CheckCircle, Target, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuroraText } from "@/components/ui/aurora-text"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { RainbowButton } from "@/components/ui/rainbow-button"
import Link from "next/link"

const features = [
  {
    icon: Eye,
    title: "Visual Impairments",
    description: "Experience how vision loss affects web navigation",
    href: "/visual",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Ear,
    title: "Hearing Impairments", 
    description: "Understand challenges in audio-dependent interfaces",
    href: "/hearing",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Hand,
    title: "Motor Disabilities",
    description: "Simulate difficulties with fine motor control",
    href: "/motor", 
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Brain,
    title: "Cognitive Disabilities",
    description: "Experience cognitive load and attention challenges",
    href: "/cognitive",
    gradient: "from-orange-500 to-red-500"
  }
]

const resources = [
  {
    icon: BookOpen,
    title: "Accessibility Guidelines",
    description: "WCAG principles, best practices, and implementation tips",
    href: "/guidelines",
    type: "Learn"
  },
  {
    icon: Wrench,
    title: "Testing Tools",
    description: "Interactive color contrast checker and text size tester",
    href: "/tools",
    type: "Test"
  },
  {
    icon: Users,
    title: "Resource Center",
    description: "Curated external resources and learning materials",
    href: "/resources",
    type: "Explore"
  }
]

const stats = [
  { number: "1.3B", label: "People with disabilities worldwide" },
  { number: "15%", label: "Of the global population" },
  { number: "98%", label: "Of websites have accessibility issues" },
  { number: "4.5:1", label: "Minimum contrast ratio (WCAG AA)" }
]

export function HomePage() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])

  return (
    <div className="min-h-screen bg-background grid-background">
      {/* Hero Section */}
      <section className="relative px-6 pt-10 pb-16 sm:pt-18 sm:pb-24 overflow-hidden">
        {/* Parallax background elements */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-40 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        />
        <motion.div 
          style={{ y: y1 }}
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
        />
        
        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div 
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-6 text-sm px-3 py-1 text-primary border-primary/20">
              ✨ Revolutionizing Digital Accessibility →
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-8 leading-[1.1] py-2">
              Experience the{" "}
              <AuroraText 
                className="inline-block py-1"
                colors={["#06b6d4", "#3b82f6", "#06b6d4"]}
                animationSpeed={6}
              >
                Web Through Different
              </AuroraText>
              {" "}Abilities
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
              Interactive simulations that help you understand and empathize with users who have disabilities. 
              Build more inclusive digital experiences with comprehensive accessibility education.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/visual">
                <RainbowButton className="text-base px-4 py-2 h-9">
                  Start with Visual Simulation <ArrowRight className="ml-2 h-4 w-4" />
                </RainbowButton>
              </Link>
              <Button variant="outline" className="text-base px-4 py-2 h-9" asChild>
                <Link href="/guidelines">
                  Learn Guidelines <BookOpen className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, margin: "-10%" }}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter target={stat.number} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Simulations Grid */}
      <section className="px-6 py-16 bg-muted/20">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-10%" }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Interactive Disability Simulations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Step into the shoes of users with different abilities and understand the challenges they face online.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true, margin: "-10%" }}
                className="relative"
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 1, 0, -1, 0]
                  }}
                  transition={{ 
                    duration: 6 + index,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Link href={feature.href}>
                    <Card className="h-full group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-background to-muted/50 overflow-hidden">
                      <CardHeader className="text-center pb-4">
                        <motion.div 
                          className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <feature.icon className="h-8 w-8 text-white" />
                        </motion.div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-center">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between hover:bg-primary/10 transition-colors"
                        >
                          Try Simulation
                          <ChevronRight className="h-4 w-4 hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-10%" }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Complete Accessibility Toolkit
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Beyond simulations - get practical tools, guidelines, and resources to implement accessibility in your projects.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5, scale: 1.02 }}
                viewport={{ once: true, margin: "-5%" }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 0.5, 0, -0.5, 0]
                  }}
                  transition={{ 
                    duration: 7 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Link href={resource.href}>
                    <Card className="h-full group hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-4">
                          <motion.div 
                            className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <resource.icon className="h-6 w-6 text-primary" />
                          </motion.div>
                          <Badge variant="secondary" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {resource.title}
                        </CardTitle>
                        <CardDescription>
                          {resource.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full hover:bg-primary hover:text-white transition-colors">
                          Explore Now →
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="px-6 py-16 bg-muted/20">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-6 text-primary border-primary/20">
                Why This Matters
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Building Empathy Through Experience
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Understanding accessibility isn&apos;t just about compliance—it&apos;s about creating digital experiences 
                that work for everyone. Our simulations help developers, designers, and decision-makers truly 
                understand the challenges faced by users with disabilities.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Improve user experience for 1.3 billion people</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Meet legal compliance requirements (ADA, WCAG)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Expand market reach and business opportunities</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Build more inclusive and innovative products</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <Target className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Better Design Decisions</h3>
                <p className="text-sm text-muted-foreground">
                  Experience firsthand how design choices impact users with disabilities
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Team Education</h3>
                <p className="text-sm text-muted-foreground">
                  Build empathy and awareness across your entire team
                </p>
              </Card>
              <Card className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Compliance Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Learn WCAG guidelines through practical application
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Inclusive Culture</h3>
                <p className="text-sm text-muted-foreground">
                  Foster an inclusive mindset in your organization
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-muted to-muted/50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-foreground/5 dark:bg-black/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-foreground/5 dark:bg-gray-700/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-foreground/5 dark:bg-gray-700/10 rounded-full blur-3xl"></div>
        
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-foreground dark:text-white mb-6 leading-tight">
            Ready to Build More Inclusive Experiences?
          </h2>
          <p className="text-xl text-muted-foreground dark:text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            Start your accessibility journey today with our interactive simulations and comprehensive resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-primary font-semibold transition-all duration-200" asChild>
              <Link href="/visual">
                Begin with Simulations <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-primary font-semibold transition-all duration-200" asChild>
              <Link href="/guidelines">
                View Guidelines <BookOpen className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 