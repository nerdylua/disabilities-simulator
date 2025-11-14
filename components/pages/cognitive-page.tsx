"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import { Brain, BookOpen, Clock, Focus, Info, AlertCircle, Activity } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

type CognitiveTab = "dyslexia" | "memory" | "attention"

const normalText = "Reading should be a smooth and effortless experience that allows you to focus on understanding the content rather than struggling with the words themselves."

const scrambleText = (text: string, intensity: number) => {
  if (intensity === 0) return text
  
  return text.split('').map(char => {
    if (Math.random() < intensity / 100 && /[a-zA-Z]/.test(char)) {
      const isUpperCase = char === char.toUpperCase()
      const scrambled = ['b', 'd', 'p', 'q'][Math.floor(Math.random() * 4)]
      return isUpperCase ? scrambled.toUpperCase() : scrambled
    }
    return char
  }).join('')
}

const overlayMessages = [
  "New message from your study group",
  "Reminder: quiz starts in 10 minutes",
  "Breaking news: campus update just dropped",
  "Someone liked your latest design post",
  "Trending: accessibility tools everyone’s trying",
  "Friend request from Alex",
  "Sale alert: notebooks 50% off today",
  "Calendar ping: project sync at 3 PM",
  "You have a new follower",
  "Inbox: internship feedback arrived"
]

const overlayColorClasses = [
  "bg-rose-500/90 text-white",
  "bg-blue-500/90 text-white",
  "bg-amber-400/95 text-slate-900",
  "bg-emerald-500/90 text-white",
  "bg-purple-500/90 text-white",
  "bg-pink-500/90 text-white",
]

function ConcentrationOverlay({ level }: { level: number }) {
  const [mounted, setMounted] = useState(false)

  const overlays = useMemo(() => {
    if (level <= 0) return []

    const intensity = Math.min(1, Math.max(0, level / 100))
    const count = Math.min(10, Math.max(2, Math.round(intensity * 8)))
    const baseDelay = Math.max(0.25, 1 - intensity)

    return Array.from({ length: count }).map((_, index) => ({
      message: overlayMessages[(index + Math.floor(intensity * overlayMessages.length)) % overlayMessages.length],
      colorClass: overlayColorClasses[index % overlayColorClasses.length],
      top: 4 + Math.random() * 80,
      left: Math.random() * 70 + (index % 2 === 0 ? 5 : 20),
      delay: index * baseDelay,
      duration: Math.max(3.5, 6 - intensity * 2) + Math.random() * 1.5,
    }))
  }, [level])

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted || overlays.length === 0) return null

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {overlays.map(({ message, top, left, delay, duration, colorClass }, index) => (
        <motion.span
          key={`${message}-${index}`}
          className={cn(
            "absolute rounded-lg px-4 py-2 text-xs font-semibold shadow-lg ring-1 backdrop-blur-md",
            colorClass
          )}
          style={{ top: `${top}%`, left: `${left}%` }}
          initial={{ opacity: 0, y: -16, scale: 0.9 }}
          animate={{
            opacity: [0, 1, 0],
            y: [-16, 0, -16],
            scale: [0.9, 1.08, 0.92],
            x: [0, -4, 0, 4, 0],
          }}
          transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {message}
        </motion.span>
      ))}
    </div>,
    document.body
  )
}

const MAX_TILES = 10
const FLASH_DURATION = 240
const FLASH_GAP = 360

export function CognitivePage() {
  const [simulationActive, setSimulationActive] = useState(false)
  const [dyslexiaIntensity, setDyslexiaIntensity] = useState([0])
  const [memoryChallenge, setMemoryChallenge] = useState(false)
  const [distractionLevel, setDistractionLevel] = useState([0])
  const [tileCount, setTileCount] = useState(4)
  const [sequence, setSequence] = useState<number[]>([])
  const [userSequence, setUserSequence] = useState<number[]>([])
  const [activeTile, setActiveTile] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [sequenceScore, setSequenceScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [statusMessage, setStatusMessage] = useState(
    "Click start to begin and watch the sequence carefully."
  )
  const [showSequence, setShowSequence] = useState(false)
  const [activeTab, setActiveTab] = useState<CognitiveTab>("dyslexia")

  const timeoutsRef = useRef<number[]>([])
  const tiles = useMemo(() => Array.from({ length: MAX_TILES }, (_, idx) => idx), [])

  const clearPendingTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    timeoutsRef.current = []
  }, [])

  const resetMemoryGame = useCallback(() => {
    clearPendingTimeouts()
    setTileCount(4)
    setSequence([])
    setUserSequence([])
    setActiveTile(null)
    setIsAnimating(false)
    setGameStarted(false)
    setShowSequence(false)
    setSequenceScore(0)
    setStatusMessage("Click start to begin and watch the sequence carefully.")
  }, [clearPendingTimeouts])

  useEffect(() => {
    const stored = sessionStorage.getItem("memory-high-score")
    if (stored) {
      const parsed = Number(stored)
      if (!Number.isNaN(parsed)) {
        setHighScore(parsed)
      }
    }
  }, [])

  useEffect(() => {
    if (sequenceScore > highScore) {
      setHighScore(sequenceScore)
      sessionStorage.setItem("memory-high-score", String(sequenceScore))
    }
  }, [sequenceScore, highScore])

  useEffect(() => () => clearPendingTimeouts(), [clearPendingTimeouts])

  useEffect(() => {
    if (!simulationActive) {
      setMemoryChallenge(false)
      setDyslexiaIntensity([0])
      setDistractionLevel([0])
      resetMemoryGame()
    }
  }, [simulationActive, resetMemoryGame])

  const generateSequence = useCallback((count: number) => {
    const tiles = Array.from({ length: count }, (_, idx) => idx)
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[tiles[i], tiles[j]] = [tiles[j], tiles[i]]
    }
    return tiles
  }, [])

  const playSequence = useCallback(
    (seq: number[]) => {
      if (seq.length === 0) return
      clearPendingTimeouts()
      setIsAnimating(true)
      setShowSequence(true)
      setStatusMessage("Watch the sequence...")

      seq.forEach((tile, index) => {
        const showTimeout = window.setTimeout(() => {
          setActiveTile(tile)

          const hideTimeout = window.setTimeout(() => {
            setActiveTile(null)

            if (index === seq.length - 1) {
              const finishTimeout = window.setTimeout(() => {
                setIsAnimating(false)
                setShowSequence(false)
                setStatusMessage("Repeat the sequence by tapping the tiles.")
              }, FLASH_DURATION)
              timeoutsRef.current.push(finishTimeout)
            }
          }, FLASH_DURATION)
          timeoutsRef.current.push(hideTimeout)
        }, index * (FLASH_DURATION + FLASH_GAP))

        timeoutsRef.current.push(showTimeout)
      })
    },
    [clearPendingTimeouts]
  )

  const startGame = useCallback(() => {
    if (!simulationActive) {
      setStatusMessage("Activate the simulation to start the memory test.")
      return
    }

    if (!memoryChallenge) {
      setStatusMessage("Enable memory challenges to start the game.")
      return
    }

    const initialSequence = generateSequence(4)
    setTileCount(4)
    setSequence(initialSequence)
    setUserSequence([])
    setActiveTile(null)
    setSequenceScore(0)
    setGameStarted(true)
    setStatusMessage("Watch the sequence carefully.")
    setShowSequence(true)
    setIsAnimating(true)

    clearPendingTimeouts()
    const kickoff = window.setTimeout(() => playSequence(initialSequence), 300)
    timeoutsRef.current.push(kickoff)
  }, [simulationActive, memoryChallenge, generateSequence, playSequence, clearPendingTimeouts])

  const endGame = useCallback(
    (message: string) => {
      clearPendingTimeouts()
      setGameStarted(false)
      setIsAnimating(false)
      setActiveTile(null)
      setSequence([])
      setUserSequence([])
      setTileCount(4)
      setShowSequence(false)
      setStatusMessage(message)
    },
    [clearPendingTimeouts]
  )

  const handleTileClick = (index: number) => {
    if (!simulationActive || !gameStarted || isAnimating || showSequence) return
    if (index >= tileCount) return

    const nextUserSequence = [...userSequence, index]
    setUserSequence(nextUserSequence)

    const expected = sequence[nextUserSequence.length - 1]
    if (expected === undefined || index !== expected) {
      endGame(`Game over! You reached a score of ${sequenceScore}. Click start to try again.`)
      return
    }

    if (nextUserSequence.length < sequence.length) {
      const remaining = sequence.length - nextUserSequence.length
      setStatusMessage(`Great! ${remaining} more ${remaining === 1 ? "tile" : "tiles"} to go.`)
      return
    }

    const newScore = sequenceScore + 1
    setSequenceScore(newScore)

    const reachedMax = tileCount >= MAX_TILES
    const nextCount = reachedMax ? MAX_TILES : tileCount + 1
    setTileCount(nextCount)

    setStatusMessage(
      reachedMax
        ? "Excellent! You've mastered all tiles. Watch for a fresh pattern."
        : "Nice! A new tile has been added. Watch the next sequence."
    )

    const nextSequence = generateSequence(nextCount)
    setSequence(nextSequence)
    setUserSequence([])
    setShowSequence(true)
    setIsAnimating(true)

    clearPendingTimeouts()
    const delayTimeout = window.setTimeout(() => playSequence(nextSequence), 800)
    timeoutsRef.current.push(delayTimeout)
  }

  const statusBadges = useMemo(() => {
    if (!simulationActive) return []
    const badges: string[] = []
    if (dyslexiaIntensity[0] > 0) badges.push("Dyslexia")
    if (distractionLevel[0] > 0) badges.push("Attention load")
    if (distractionLevel[0] >= 40) badges.push("Ambient distractions")
    return badges
  }, [simulationActive, dyslexiaIntensity, distractionLevel])

  const resetAdjustments = useCallback(() => {
    setDyslexiaIntensity([0])
    setDistractionLevel([0])
    setMemoryChallenge(false)
    resetMemoryGame()
  }, [resetMemoryGame])

  const handleTabChange = (value: string) => {
    const tab = value as CognitiveTab
    setActiveTab(tab)
    resetAdjustments()
  }

  const displayText = useMemo(() => {
    return simulationActive ? scrambleText(normalText, dyslexiaIntensity[0]) : normalText
  }, [simulationActive, dyslexiaIntensity])

  return (
    <div className="min-h-screen bg-background grid-background">
      <ConcentrationOverlay level={simulationActive ? distractionLevel[0] : 0} />
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Brain className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Cognitive Disability Simulator</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Experience how cognitive challenges affect information processing and learning.
            6.5 million children in the US receive special education services for cognitive disabilities.
          </p>
        </div>

        {/* Main Simulation Controls */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Focus className="h-5 w-5 mr-2 text-primary" />
                  Cognitive Simulation Controls
                </CardTitle>
                <CardDescription>
                  Adjust settings to experience different cognitive challenges
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
                      aria-label="Toggle cognitive simulation"
                    />
                  </div>
                </div>
                <span className="hidden text-xs text-muted-foreground sm:block">
                  {simulationActive
                    ? "Adjustments apply immediately to the reading and memory demos."
                    : "Configure each mode, then switch on to experience it."}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dyslexia">Dyslexia</TabsTrigger>
                <TabsTrigger value="memory">Memory Issues</TabsTrigger>
                <TabsTrigger value="attention">ADHD</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dyslexia" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Letter Confusion: {dyslexiaIntensity[0]}%
                  </label>
                  <Slider
                    value={dyslexiaIntensity}
                    onValueChange={setDyslexiaIntensity}
                    max={50}
                    step={5}
                    className="w-full"
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Info className="h-4 w-4 inline mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Dyslexia causes letters to appear jumbled or reversed, making reading difficult.
                  </span>
                </div>
              </TabsContent>
              
              <TabsContent value="memory" className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium leading-none">Enable memory challenges</p>
                      <p className="text-xs text-muted-foreground">
                        Mirrors the extension&apos;s sequence recall challenge that strains working memory.
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={memoryChallenge && simulationActive}
                    onCheckedChange={setMemoryChallenge}
                    disabled={!simulationActive}
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Info className="h-4 w-4 inline mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Working memory difficulties affect the ability to hold and manipulate information.
                  </span>
                </div>
              </TabsContent>
              
              <TabsContent value="attention" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Distraction Level: {distractionLevel[0]}%
                  </label>
                  <Slider
                    value={distractionLevel}
                    onValueChange={setDistractionLevel}
                    max={100}
                    step={10}
                    className="w-full"
                  />
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <Activity className="mt-1 h-5 w-5 text-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">Ambient distractions</p>
                    <p className="text-xs text-muted-foreground">
                      Increase the slider to flood the interface with more frequent notifications, messages,
                      and alerts—mirroring a busy student&apos;s environment.
                    </p>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Info className="h-4 w-4 inline mr-2" />
                  <span className="text-sm text-muted-foreground">
                    ADHD makes it difficult to maintain focus and filter out distractions.
                  </span>
                </div>
              </TabsContent>
              
            </Tabs>
          </CardContent>
        </Card>

        {/* Demo Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Reading Challenge */}
          <Card>
            <CardHeader>
              <CardTitle>Reading Challenge</CardTitle>
              <CardDescription>
                Experience how dyslexia affects text comprehension
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div 
                  className="p-4 bg-background border rounded-lg min-h-[120px]"
                  style={{
                    filter: simulationActive && distractionLevel[0] > 0 ? 
                      `blur(${distractionLevel[0] / 50}px)` : 'none',
                    opacity: simulationActive && distractionLevel[0] > 0 ? 
                      Math.max(0.3, 1 - distractionLevel[0] / 200) : 1
                  }}
                >
                  <p className="text-sm leading-relaxed">{displayText}</p>
                </div>
                
                {simulationActive && statusBadges.length > 0 && (
                  <div className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {statusBadges.join(" • ")}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Memory Test */}
          <Card>
            <CardHeader>
              <CardTitle>Memory Test</CardTitle>
              <CardDescription>
                Test working memory with sequence recall
              </CardDescription>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:text-sm">
                <div className="rounded-md border border-border/50 bg-muted/40 px-3 py-1.5 text-left">
                  <span className="font-semibold text-foreground">Score</span>
                  <span className="ml-2 text-muted-foreground">{sequenceScore}</span>
                </div>
                <div className="rounded-md border border-border/50 bg-muted/40 px-3 py-1.5 text-left">
                  <span className="font-semibold text-foreground">High Score</span>
                  <span className="ml-2 text-muted-foreground">{highScore}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Button
                    onClick={startGame}
                    className="min-w-[180px]"
                    disabled={!simulationActive || isAnimating || !memoryChallenge}
                  >
                    {gameStarted ? "Restart Memory Test" : "Start Memory Test"}
                  </Button>
                  {!simulationActive && (
                    <span className="text-xs text-muted-foreground">
                      Activate the simulation to begin.
                    </span>
                  )}
                  {!memoryChallenge && simulationActive && (
                    <span className="text-xs text-muted-foreground">
                      Enable memory challenges to start the game.
                    </span>
                  )}
                </div>

                <p className="min-h-[24px] text-center text-xs text-muted-foreground">
                  {statusMessage}
                </p>

                <div className="grid grid-cols-5 justify-items-center gap-3 sm:gap-4">
                  {tiles.map((index) => {
                    const isUnlocked = index < tileCount
                    const isActiveTile = activeTile === index
                    const isClickable =
                      simulationActive && gameStarted && !isAnimating && !showSequence && isUnlocked

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleTileClick(index)}
                        disabled={!isClickable}
                    className={cn(
                      "flex items-center justify-center rounded-lg border font-semibold transition-all duration-150 select-none",
                      "h-16 w-16 text-sm sm:h-20 sm:w-20 sm:text-base",
                          isUnlocked
                            ? isActiveTile
                              ? "bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900"
                              : "bg-card text-foreground hover:bg-primary/10"
                            : "bg-muted/40 text-muted-foreground border-dashed border-border/50 pointer-events-none",
                          (!isClickable && isUnlocked) && "cursor-not-allowed opacity-70",
                          !isUnlocked && "opacity-60",
                          !gameStarted && "opacity-70"
                        )}
                        aria-label={`Memory tile ${index + 1}`}
                      >
                        {index + 1}
                      </button>
                    )
                  })}
                </div>

                <div className="text-center text-xs text-muted-foreground">
                  {userSequence.length > 0
                    ? `Your input: ${userSequence.map((n) => n + 1).join(" → ")}`
                    : gameStarted
                      ? "Tap the tiles in the order they flashed."
                      : "Press start to begin a new memory sequence."}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle className="text-lg">Dyslexia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A learning disorder that affects reading fluency, decoding, 
                and reading comprehension skills.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Clock className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle className="text-lg">Working Memory</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The ability to hold and manipulate information in mind 
                for brief periods during mental tasks.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <AlertCircle className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle className="text-lg">ADHD</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Affects attention, hyperactivity, and impulse control, 
                making it difficult to focus on tasks.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 