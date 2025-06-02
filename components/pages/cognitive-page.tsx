"use client"

import { useState } from "react"
import { Brain, BookOpen, Clock, Focus, Info, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

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

export function CognitivePage() {
  const [simulationActive, setSimulationActive] = useState(false)
  const [dyslexiaIntensity, setDyslexiaIntensity] = useState([0])
  const [memoryChallenge, setMemoryChallenge] = useState(false)
  const [distractionLevel, setDistractionLevel] = useState([0])
  const [processingDelay, setProcessingDelay] = useState([0])
  const [sequenceMemory, setSequenceMemory] = useState<number[]>([])
  const [userSequence, setUserSequence] = useState<number[]>([])
  const [showSequence, setShowSequence] = useState(false)
  const [sequenceScore, setSequenceScore] = useState(0)

  const generateSequence = () => {
    const length = 4
    const newSequence = Array.from({length}, () => Math.floor(Math.random() * 4))
    setSequenceMemory(newSequence)
    setUserSequence([])
    setShowSequence(true)
    
    setTimeout(() => {
      setShowSequence(false)
    }, 2000)
  }

  const addToUserSequence = (num: number) => {
    const newUserSequence = [...userSequence, num]
    setUserSequence(newUserSequence)
    
    if (newUserSequence.length === sequenceMemory.length) {
      const correct = sequenceMemory.every((num, index) => num === newUserSequence[index])
      setSequenceScore(correct ? sequenceScore + 1 : 0)
      setTimeout(() => {
        generateSequence()
      }, 1000)
    }
  }

  const displayText = simulationActive ? scrambleText(normalText, dyslexiaIntensity[0]) : normalText

  return (
    <div className="min-h-screen bg-background grid-background">
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
            <Tabs defaultValue="dyslexia" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="dyslexia">Dyslexia</TabsTrigger>
                <TabsTrigger value="memory">Memory Issues</TabsTrigger>
                <TabsTrigger value="attention">ADHD</TabsTrigger>
                <TabsTrigger value="processing">Processing Speed</TabsTrigger>
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
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={memoryChallenge}
                    onCheckedChange={setMemoryChallenge}
                  />
                  <label className="text-sm font-medium">
                    Enable memory challenges
                  </label>
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
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Info className="h-4 w-4 inline mr-2" />
                  <span className="text-sm text-muted-foreground">
                    ADHD makes it difficult to maintain focus and filter out distractions.
                  </span>
                </div>
              </TabsContent>
              
              <TabsContent value="processing" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Processing Delay: {processingDelay[0]}ms
                  </label>
                  <Slider
                    value={processingDelay}
                    onValueChange={setProcessingDelay}
                    max={3000}
                    step={100}
                    className="w-full"
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Info className="h-4 w-4 inline mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Slower processing speed affects how quickly information can be understood.
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
                
                {simulationActive && (
                  <div className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {dyslexiaIntensity[0] > 0 && "Dyslexia simulation active"}
                      {distractionLevel[0] > 0 && " • Attention difficulties"}
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
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <Button onClick={generateSequence} className="mb-4">
                    Start Memory Test
                  </Button>
                  <div className="text-sm text-muted-foreground mb-2">
                    Score: {sequenceScore}
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((num) => (
                    <Button
                      key={num}
                      variant={showSequence && sequenceMemory.includes(num) ? "default" : "outline"}
                      onClick={() => !showSequence && addToUserSequence(num)}
                      disabled={showSequence}
                      className={`h-16 ${
                        showSequence && sequenceMemory[sequenceMemory.indexOf(num)] === num ? 
                        'bg-primary animate-pulse' : ''
                      }`}
                    >
                      {num + 1}
                    </Button>
                  ))}
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  {showSequence ? 
                    "Remember this sequence..." : 
                    "Click the buttons in the same order"
                  }
                </div>
                
                {userSequence.length > 0 && (
                  <div className="text-center text-sm">
                    Your sequence: {userSequence.map(n => n + 1).join(', ')}
                  </div>
                )}
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

        {/* Accessibility Tips */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Making Content Cognitively Accessible</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Content Design</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Clear, simple language and short sentences</li>
                  <li>• Logical organization and consistent navigation</li>
                  <li>• Visual aids and multimedia support</li>
                  <li>• Adequate white space and readable fonts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Interactive Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Auto-save and progress preservation</li>
                  <li>• Adjustable time limits</li>
                  <li>• Error prevention and clear feedback</li>
                  <li>• Multiple ways to complete tasks</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 