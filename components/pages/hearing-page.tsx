"use client"

import { useState } from "react"
import { Ear, Volume2, VolumeX, Play, Pause, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export function HearingPage() {
  const [simulationActive, setSimulationActive] = useState(false)
  const [hearingLoss, setHearingLoss] = useState([0])
  const [frequencyLoss, setFrequencyLoss] = useState([0])
  const [tinnitus, setTinnitus] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-background grid-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Ear className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Hearing Impairment Simulator</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Experience how hearing impairments affect audio perception and communication.
            466 million people worldwide have disabling hearing loss.
          </p>
        </div>

        {/* Main Simulation Controls */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Volume2 className="h-5 w-5 mr-2 text-primary" />
                  Audio Simulation Controls
                </CardTitle>
                <CardDescription>
                  Adjust settings to experience different types of hearing loss
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
            <Tabs defaultValue="volume" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="volume">Volume Loss</TabsTrigger>
                <TabsTrigger value="frequency">Frequency Loss</TabsTrigger>
                <TabsTrigger value="tinnitus">Tinnitus</TabsTrigger>
              </TabsList>
              
              <TabsContent value="volume" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Hearing Loss: {hearingLoss[0]}% reduction
                  </label>
                  <Slider
                    value={hearingLoss}
                    onValueChange={setHearingLoss}
                    max={90}
                    step={5}
                    className="w-full"
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Info className="h-4 w-4 inline mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Simulates general volume reduction experienced by people with hearing loss.
                  </span>
                </div>
              </TabsContent>
              
              <TabsContent value="frequency" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    High Frequency Loss: {frequencyLoss[0]}%
                  </label>
                  <Slider
                    value={frequencyLoss}
                    onValueChange={setFrequencyLoss}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Info className="h-4 w-4 inline mr-2" />
                  <span className="text-sm text-muted-foreground">
                    High-frequency hearing loss is common and affects speech comprehension.
                  </span>
                </div>
              </TabsContent>
              
              <TabsContent value="tinnitus" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={tinnitus}
                    onCheckedChange={setTinnitus}
                  />
                  <label className="text-sm font-medium">
                    Enable Tinnitus Simulation
                  </label>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Info className="h-4 w-4 inline mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Tinnitus causes phantom ringing sounds that can be very distracting.
                  </span>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Demo Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Audio Sample */}
          <Card>
            <CardHeader>
              <CardTitle>Audio Sample</CardTitle>
              <CardDescription>
                Listen to how hearing loss affects audio perception
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
                  <Button
                    size="lg"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center space-x-2"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    <span>{isPlaying ? "Pause" : "Play"} Sample Audio</span>
                  </Button>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  {simulationActive ? (
                    <span>🔇 Hearing simulation is active</span>
                  ) : (
                    <span>🔊 Normal hearing</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication Challenges */}
          <Card>
            <CardHeader>
              <CardTitle>Communication Impact</CardTitle>
              <CardDescription>
                See how hearing loss affects conversation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-background border rounded-lg">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">A</div>
                    <div className="flex-1">
                      <p className="text-sm">
                        {simulationActive ? 
                          "H--- c-- y-- h--- m-?" : 
                          "Hey, can you hear me?"
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">B</div>
                    <div className="flex-1">
                      <p className="text-sm">
                        {simulationActive ? 
                          "S---y, c--- y-- r----t t---?" : 
                          "Sorry, could you repeat that?"
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground text-center">
                  {simulationActive ? 
                    "Speech appears broken and unclear with hearing loss" :
                    "Normal speech perception"
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardHeader>
              <VolumeX className="h-8 w-8 text-red-500 mb-2" />
              <CardTitle className="text-lg">Hearing Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ranges from mild to profound and can affect one or both ears. 
                Often age-related or caused by noise exposure.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Ear className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle className="text-lg">Frequency Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                High-frequency hearing loss makes it difficult to hear consonants, 
                affecting speech clarity and comprehension.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Volume2 className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle className="text-lg">Tinnitus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Phantom sounds like ringing, buzzing, or hissing that can be 
                constant and very distracting.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Accessibility Tips */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Making Audio Accessible</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Essential Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Closed captions for all video content</li>
                  <li>• Visual indicators for audio cues</li>
                  <li>• Adjustable volume controls</li>
                  <li>• Text alternatives for audio content</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Best Practices</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Clear, slow speech in videos</li>
                  <li>• Multiple ways to access information</li>
                  <li>• Visual alerts and notifications</li>
                  <li>• Sign language interpretation when possible</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 