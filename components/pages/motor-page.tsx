"use client"

import { useState, useEffect } from "react"
import { Hand, MousePointer, Zap, Info, Target, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export function MotorPage() {
  const [simulationActive, setSimulationActive] = useState(false)
  const [tremorIntensity, setTremorIntensity] = useState([0])
  const [delayAmount, setDelayAmount] = useState([0])
  const [smallTargets, setSmallTargets] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [timeToClick, setTimeToClick] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)

  useEffect(() => {
    if (simulationActive && tremorIntensity[0] > 0) {
      const interval = setInterval(() => {
        const tremor = tremorIntensity[0]
        document.body.style.transform = `translate(${Math.random() * tremor - tremor/2}px, ${Math.random() * tremor - tremor/2}px)`
      }, 50)
      
      return () => {
        clearInterval(interval)
        document.body.style.transform = 'none'
      }
    } else {
      document.body.style.transform = 'none'
    }
  }, [simulationActive, tremorIntensity])

  const handleTargetClick = () => {
    if (startTime) {
      setTimeToClick(Date.now() - startTime)
    }
    setClickCount(prev => prev + 1)
    setStartTime(Date.now())
  }

  return (
    <div className="min-h-screen bg-background grid-background">
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
            <Tabs defaultValue="tremor" className="w-full">
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
                    max={20}
                    step={1}
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
                <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg min-h-[200px] relative">
                  <Button
                    size={smallTargets && simulationActive ? "sm" : "lg"}
                    onClick={handleTargetClick}
                    className="flex items-center space-x-2"
                  >
                    <Target className="h-4 w-4" />
                    <span>Click Me!</span>
                  </Button>
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
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    placeholder="Try typing with tremor active"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground h-20 resize-none"
                    placeholder="This gets difficult with motor impairments..."
                  />
                </div>
                <Button className="w-full" size={smallTargets && simulationActive ? "sm" : "default"}>
                  Submit Form
                </Button>
              </div>
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

        {/* Accessibility Tips */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Making Interfaces Motor-Accessible</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Design Principles</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Large, easy-to-target buttons (minimum 44px)</li>
                  <li>• Adequate spacing between interactive elements</li>
                  <li>• Multiple ways to complete actions</li>
                  <li>• Extended timeout periods</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Implementation</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Keyboard navigation alternatives</li>
                  <li>• Voice control compatibility</li>
                  <li>• Undo/cancel functionality</li>
                  <li>• Customizable interface sizing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 