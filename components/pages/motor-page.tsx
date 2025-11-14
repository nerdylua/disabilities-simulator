"use client"

import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { Hand, MousePointer, Zap, Info, Target, Clock, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type MotorTab = "tremor" | "delay" | "precision"

export function MotorPage() {
  const [simulationActive, setSimulationActive] = useState(false)
  const [tremorIntensity, setTremorIntensity] = useState([0])
  const [delayAmount, setDelayAmount] = useState([0])
  const [smallTargets, setSmallTargets] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [timeToClick, setTimeToClick] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [delayPending, setDelayPending] = useState(false)
  const delayTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [targetPosition, setTargetPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 })
  const [activeTab, setActiveTab] = useState<MotorTab>("tremor")
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const successTimeout = useRef<number | null>(null)

  const generateRandomPosition = useCallback(() => {
    const x = 12 + Math.random() * 76
    const y = 12 + Math.random() * 76
    return { x, y }
  }, [])

  useEffect(() => {
    setTargetPosition(generateRandomPosition())
  }, [generateRandomPosition])

  useEffect(() => {
    if (!simulationActive) {
      setDelayPending(false)
      setTremorIntensity([0])
      setDelayAmount([0])
      setSmallTargets(false)
      setClickCount(0)
      setTimeToClick(null)
      setStartTime(null)
      setTargetPosition({ x: 50, y: 50 })
      if (delayTimeout.current) {
        clearTimeout(delayTimeout.current)
        delayTimeout.current = null
      }
      if (successTimeout.current) {
        clearTimeout(successTimeout.current)
        successTimeout.current = null
      }
      setShowSuccess(false)
      setFormErrors({})
      setFormData({ name: "", email: "", message: "" })
    } else {
      setTargetPosition(generateRandomPosition())
    }
  }, [simulationActive, generateRandomPosition])

  useEffect(() => {
    if (simulationActive) {
      setStartTime(Date.now())
    } else {
      setStartTime(null)
      setTimeToClick(null)
    }
  }, [simulationActive])

  useEffect(() => {
    return () => {
      if (delayTimeout.current) {
        clearTimeout(delayTimeout.current)
      }
      if (successTimeout.current) {
        clearTimeout(successTimeout.current)
      }
      document.body.style.cursor = ""
    }
  }, [])

  const recordClickMetrics = () => {
    if (startTime) {
      setTimeToClick(Date.now() - startTime)
    }
    setClickCount(prev => prev + 1)
    setStartTime(Date.now())
    setDelayPending(false)
    setTargetPosition(generateRandomPosition())
  }

  const handleTargetClick = () => {
    if (simulationActive && delayAmount[0] > 0) {
      setDelayPending(true)
      if (delayTimeout.current) {
        clearTimeout(delayTimeout.current)
      }
      delayTimeout.current = setTimeout(() => {
        recordClickMetrics()
        delayTimeout.current = null
      }, delayAmount[0])
      return
    }

    recordClickMetrics()
  }

  const resetMotorSettings = () => {
    setTremorIntensity([0])
    setDelayAmount([0])
    setSmallTargets(false)
    setDelayPending(false)
    setClickCount(0)
    setTimeToClick(null)
    setStartTime(simulationActive ? Date.now() : null)
    setTargetPosition(generateRandomPosition())
    setFormData({ name: "", email: "", message: "" })
    setFormErrors({})
    setShowSuccess(false)
    if (delayTimeout.current) {
      clearTimeout(delayTimeout.current)
      delayTimeout.current = null
    }
    if (successTimeout.current) {
      clearTimeout(successTimeout.current)
      successTimeout.current = null
    }
  }

  const handleFormChange =
    (field: "name" | "email" | "message") =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value
      setFormData((prev) => ({ ...prev, [field]: value }))
      setFormErrors((prev) => ({ ...prev, [field]: undefined }))
    }

  const validateForm = () => {
    const nextErrors: typeof formErrors = {}
    if (!formData.name.trim()) {
      nextErrors.name = "Name is required."
    }
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required."
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      nextErrors.email = "Enter a valid email."
    }
    if (!formData.message.trim()) {
      nextErrors.message = "Add a short message to continue."
    }

    setFormErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateForm()) return

    setFormErrors({})
    setFormData({ name: "", email: "", message: "" })
    setShowSuccess(true)

    if (successTimeout.current) {
      clearTimeout(successTimeout.current)
    }
    successTimeout.current = window.setTimeout(() => {
      setShowSuccess(false)
      successTimeout.current = null
    }, 3200)
  }

  const handleTabChange = (value: string) => {
    const tab = value as MotorTab
    setActiveTab(tab)
    resetMotorSettings()
  }

  return (
    <div className="min-h-screen bg-background grid-background">
      <ParkinsonsCursor active={simulationActive && tremorIntensity[0] > 0} intensity={tremorIntensity[0]} />
      {showSuccess && (
        <div className="fixed top-24 right-6 z-50">
          <div className="flex items-start gap-3 rounded-lg border border-emerald-400 bg-emerald-500/95 px-4 py-3 text-emerald-50 shadow-xl dark:border-emerald-300/60 dark:bg-emerald-500/90">
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="text-sm font-semibold">Submission synced</p>
              <p className="text-xs leading-tight opacity-90">
                Motor strain acknowledged. Targets reset to keep the challenge fresh.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Hand className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Motor Disability Simulator</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Experience how motor impairments affect digital interaction and navigation.
            200 million people worldwide have motor disabilities affecting their daily activities.
          </p>
        </div>

        {/* Main Simulation Controls */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <MousePointer className="h-5 w-5 mr-2 text-primary" />
                  Motor Simulation Controls
                </CardTitle>
                <CardDescription>
                  Adjust settings to experience different motor challenges
                </CardDescription>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "hidden sm:inline-flex items-center gap-1 border px-2.5 py-1 text-xs font-medium",
                      simulationActive
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                        : "border-slate-400/30 bg-slate-400/10 text-slate-500"
                    )}
                  >
                    {simulationActive ? "Simulation Active" : "Preview Mode"}
                  </Badge>
                  <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-3 py-1 shadow-sm">
                    <span className="text-xs font-medium text-muted-foreground">
                      {simulationActive ? "On" : "Off"}
                    </span>
                    <Switch 
                      checked={simulationActive}
                      onCheckedChange={setSimulationActive}
                      aria-label="Toggle motor simulation"
                    />
                  </div>
                </div>
                <span className="hidden text-xs text-muted-foreground sm:block">
                  {simulationActive
                    ? "Controls apply immediately to the demo below."
                    : "Set your configuration, then turn the simulation on."}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tremor">Tremor</TabsTrigger>
                <TabsTrigger value="delay">Motor Delay</TabsTrigger>
                <TabsTrigger value="precision">Precision Loss</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tremor" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Tremor Intensity: {tremorIntensity[0]}px
                  </label>
                  <Slider
                    value={tremorIntensity}
                    onValueChange={setTremorIntensity}
                    max={40}
                    step={2}
                    className="w-full"
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Info className="h-4 w-4 inline mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Simulates involuntary shaking that makes precise cursor movement difficult.
                  </span>
                </div>
              </TabsContent>
              
              <TabsContent value="delay" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Response Delay: {delayAmount[0]}ms
                  </label>
                  <Slider
                    value={delayAmount}
                    onValueChange={setDelayAmount}
                    max={2000}
                    step={100}
                    className="w-full"
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Info className="h-4 w-4 inline mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Simulates slower reaction times common in various motor conditions.
                  </span>
                </div>
              </TabsContent>
              
              <TabsContent value="precision" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={smallTargets}
                    onCheckedChange={setSmallTargets}
                  />
                  <label className="text-sm font-medium">
                    Make targets smaller (reduced precision)
                  </label>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Info className="h-4 w-4 inline mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Simulates difficulty with fine motor control and precise movements.
                  </span>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Demo Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Click Target Test */}
          <Card>
            <CardHeader>
              <CardTitle>Target Practice</CardTitle>
              <CardDescription>
                Test how motor challenges affect clicking accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative h-[220px] rounded-lg border border-dashed border-border/60 bg-muted/30 p-4 sm:h-[260px]">
                  <Button
                    onClick={handleTargetClick}
                    className={cn(
                      "absolute -translate-x-1/2 -translate-y-1/2 rounded-md border border-primary/50 transition-transform duration-150",
                      "bg-primary text-primary-foreground shadow-md hover:bg-primary/90",
                      smallTargets && simulationActive
                        ? "px-2 py-[2px] text-[0.4rem] min-h-[22px] min-w-[48px]"
                        : "px-3 py-[3px] text-xs min-h-[30px] min-w-[72px]",
                      simulationActive
                        ? "cursor-none hover:cursor-none focus:cursor-none"
                        : "cursor-pointer",
                      (!simulationActive || delayPending) && "cursor-not-allowed opacity-70",
                    )}
                    disabled={delayPending}
                    style={{ left: `${targetPosition.x}%`, top: `${targetPosition.y}%` }}
                    aria-label="Click challenge target"
                  >
                    Click me
                  </Button>
                  {delayPending && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground animate-pulse">
                      Executing delayed click...
                    </div>
                  )}
                </div>
                <div className="text-center space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Clicks: {clickCount}
                  </div>
                  {timeToClick && (
                    <div className="text-sm text-muted-foreground">
                      Last click time: {timeToClick}ms
                    </div>
                  )}
                  {simulationActive && delayAmount[0] > 0 && (
                    <div className="text-xs text-muted-foreground">
                      Actions are delayed by {delayAmount[0]}ms
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Interaction */}
          <Card>
            <CardHeader>
              <CardTitle>Form Interaction</CardTitle>
              <CardDescription>
                Experience how motor challenges affect form filling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" htmlFor="motor-name">
                    Name
                  </label>
                  <input
                    id="motor-name"
                    type="text"
                    value={formData.name}
                    onChange={handleFormChange("name")}
                    placeholder="Try typing with tremor active"
                    aria-invalid={Boolean(formErrors.name)}
                    aria-describedby={formErrors.name ? "motor-name-error" : undefined}
                    className={cn(
                      "w-full rounded-md border border-border bg-background px-3 py-2 text-foreground transition shadow-sm",
                      "focus:outline-none focus:ring-2 focus:ring-primary/40",
                      formErrors.name && "border-destructive/70 focus:ring-destructive/40"
                    )}
                  />
                  {formErrors.name && (
                    <p id="motor-name-error" className="text-xs text-destructive">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium" htmlFor="motor-email">
                    Email
                  </label>
                  <input
                    id="motor-email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange("email")}
                    placeholder="email@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(formErrors.email)}
                    aria-describedby={formErrors.email ? "motor-email-error" : undefined}
                    className={cn(
                      "w-full rounded-md border border-border bg-background px-3 py-2 text-foreground transition shadow-sm",
                      "focus:outline-none focus:ring-2 focus:ring-primary/40",
                      formErrors.email && "border-destructive/70 focus:ring-destructive/40"
                    )}
                  />
                  {formErrors.email && (
                    <p id="motor-email-error" className="text-xs text-destructive">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium" htmlFor="motor-message">
                    Message
                  </label>
                  <textarea
                    id="motor-message"
                    value={formData.message}
                    onChange={handleFormChange("message")}
                    placeholder="This gets difficult with motor impairments..."
                    rows={4}
                    aria-invalid={Boolean(formErrors.message)}
                    aria-describedby={formErrors.message ? "motor-message-error" : undefined}
                    className={cn(
                      "w-full rounded-md border border-border bg-background px-3 py-2 text-foreground transition shadow-sm resize-none",
                      "focus:outline-none focus:ring-2 focus:ring-primary/40",
                      formErrors.message && "border-destructive/70 focus:ring-destructive/40"
                    )}
                  />
                  {formErrors.message && (
                    <p id="motor-message-error" className="text-xs text-destructive">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full hover:cursor-pointer"
                    size={smallTargets && simulationActive ? "sm" : "default"}
                  >
                    Submit Form
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Tip: toggling smaller targets or tremor mid-entry shows how recovery from mistakes slows down.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-red-500 mb-2" />
              <CardTitle className="text-lg">Tremors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Involuntary shaking that affects fine motor control, making 
                precise cursor movements very challenging.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Clock className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle className="text-lg">Slower Response</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Delayed motor responses require more time to complete 
                interactions and may need extended timeouts.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Target className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle className="text-lg">Limited Precision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Difficulty with fine motor control makes small targets 
                and precise interactions very difficult to use.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 

function ParkinsonsCursor({ active, intensity }: { active: boolean; intensity: number }) {
  useEffect(() => {
    if (!active || intensity <= 0) {
      document.body.style.cursor = ""
      return
    }

    const cursor = document.createElement("div")
    cursor.setAttribute("data-motor-cursor", "true")
    cursor.style.position = "fixed"
    cursor.style.width = "18px"
    cursor.style.height = "18px"
    cursor.style.borderRadius = "50%"
    cursor.style.border = "2px solid var(--foreground)"
    cursor.style.boxShadow = "0 0 12px rgba(0,0,0,0.25)"
    cursor.style.pointerEvents = "none"
    cursor.style.zIndex = "70"
    cursor.style.backdropFilter = "blur(2px)"
    cursor.style.left = "0"
    cursor.style.top = "0"

    document.body.appendChild(cursor)

    const previousCursor = document.body.style.cursor
    document.body.style.cursor = "none"

    let lastX = window.innerWidth / 2
    let lastY = window.innerHeight / 2
    let offsetX = 0
    let offsetY = 0

    const updateCursorPosition = () => {
      cursor.style.transform = `translate(${lastX + offsetX}px, ${lastY + offsetY}px)`
    }

    const handlePointerMove = (event: PointerEvent) => {
      lastX = event.clientX
      lastY = event.clientY
      updateCursorPosition()
    }

    const jitter = () => {
      const range = Math.max(intensity * 2.2, 8)
      offsetX = (Math.random() - 0.5) * range
      offsetY = (Math.random() - 0.5) * range
      updateCursorPosition()
    }

    const jitterInterval = window.setInterval(jitter, 120)
    window.addEventListener("pointermove", handlePointerMove)

    updateCursorPosition()

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.clearInterval(jitterInterval)
      cursor.remove()
      document.body.style.cursor = previousCursor
    }
  }, [active, intensity])

  return null
}