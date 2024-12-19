import { useEffect } from 'react'
import { Features } from '../models/Features'

interface FeatureTrackerProps {
  features: Features
  setFeatures: React.Dispatch<React.SetStateAction<Features>>
}

export default function FeatureTracker({ features, setFeatures }: FeatureTrackerProps) {
  useEffect(() => {
    const startTime = Date.now()
    let keyPresses = 0
    let mouseClicks = 0
    let lastActivityTime = Date.now()

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setFeatures(prev => ({ ...prev, windowSwitches: prev.windowSwitches + 1 }))
      }
    }

    const handleKeyPress = () => {
      keyPresses++
      lastActivityTime = Date.now()
    }

    const handleMouseMove = () => {
      lastActivityTime = Date.now()
    }

    const handleMouseClick = () => {
      mouseClicks++
      lastActivityTime = Date.now()
    }

    const updateFeatures = () => {
      const currentTime = Date.now()
      const elapsedMinutes = (currentTime - startTime) / 60000
      const inactivityTime = (currentTime - lastActivityTime) / 1000

      setFeatures(prev => ({
        ...prev,
        timePerQuestion: elapsedMinutes,
        keyboardActivity: keyPresses / elapsedMinutes,
        mouseMovements: mouseClicks / elapsedMinutes,
        inactivityPeriods: inactivityTime > 10 ? prev.inactivityPeriods + 1 : prev.inactivityPeriods
      }))
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('keydown', handleKeyPress)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('click', handleMouseClick)

    const intervalId = setInterval(updateFeatures, 1000)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('keydown', handleKeyPress)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleMouseClick)
      clearInterval(intervalId)
    }
  }, [setFeatures])

  return null
}

