"use client"

import { useEffect, useState } from "react"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface AnimatedCounterProps {
  target: string
  duration?: number
  className?: string
}

export function AnimatedCounter({ target, duration = 2000, className = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [displayValue, setDisplayValue] = useState("0")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    // Extract number and suffix from target (e.g., "1.3B" -> 1.3 and "B")
    const match = target.match(/^([\d.]+)(.*)$/)
    if (!match) {
      setDisplayValue(target)
      return
    }

    const [, numberPart, suffix] = match
    const targetNumber = parseFloat(numberPart)

    // Handle different number formats
    let steps = 60
    let increment = targetNumber / steps
    
    // For percentages and ratios, use different animation speeds
    if (suffix.includes('%')) {
      steps = Math.min(targetNumber * 2, 60)
      increment = targetNumber / steps
    } else if (suffix.includes(':')) {
      steps = Math.min(targetNumber * 10, 60)
      increment = targetNumber / steps
    }

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= targetNumber) {
        current = targetNumber
        clearInterval(timer)
      }
      
      // Format the display value
      let displayNum = current.toFixed(1)
      if (current >= targetNumber) {
        displayNum = numberPart // Use original precision
      } else if (current < 1) {
        displayNum = current.toFixed(2)
      } else if (current >= 1 && current < 10) {
        displayNum = current.toFixed(1)
      } else {
        displayNum = Math.round(current).toString()
      }
      
      setDisplayValue(displayNum + suffix)
      setCount(current)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  )
} 