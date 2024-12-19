import { NextResponse } from 'next/server'
import { Features } from '../../../models/Features'

export async function POST(request: Request) {
  const { features, userAnswers } = await request.json()

  // Calculate the score
  const score = calculateScore(userAnswers)

  // Analyze features for cheating probability
  const cheatingProbability = analyzeCheating(features)

  return NextResponse.json({ score, cheatingProbability })
}

function calculateScore(userAnswers: string[]): number {
  const correctAnswers = ['c', 'b', 'c', 'd', 'c']
  return userAnswers.reduce((score, answer, index) => {
    return score + (answer === correctAnswers[index] ? 1 : 0)
  }, 0)
}

function analyzeCheating(features: Features): number {
  // This is a simplified model for demonstration purposes
  // In a real-world scenario, you would use a more sophisticated machine learning model
  let cheatingScore = 0

  if (features.browserTabsOpen > 1) cheatingScore += 0.2
  if (features.timePerQuestion < 0.5) cheatingScore += 0.2
  if (features.keyboardActivity > 50) cheatingScore += 0.2
  if (features.mouseMovements > 100) cheatingScore += 0.1
  if (features.proximityAlerts > 0) cheatingScore += 0.3
  if (features.inactivityPeriods > 5) cheatingScore += 0.1
  if (features.windowSwitches > 2) cheatingScore += 0.2

  return Math.min(cheatingScore, 1) // Ensure the probability is between 0 and 1
}

