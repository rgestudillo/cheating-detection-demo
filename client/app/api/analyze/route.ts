import { NextResponse } from 'next/server'
import * as tf from '@tensorflow/tfjs-node'
import * as joblib from 'joblib-node'
import { Features } from '../../../models/Features'

// Load the model
const model = joblib.load('knn_model.joblib')

// Normalize function (should match the one used in training)
function normalize(features: Features): number[] {
  return [
    features.browserTabsOpen / 10, // Assuming max 10 tabs
    features.timePerQuestion / 10, // Assuming max 10 minutes per question
    features.keyboardActivity / 100, // Assuming max 100 key presses per minute
    features.mouseMovements / 100, // Assuming max 100 mouse movements per minute
    features.proximityAlerts / 5, // Assuming max 5 proximity alerts
    features.inactivityPeriods / 300, // Assuming max 5 minutes (300 seconds) of inactivity
    features.windowSwitches / 10 // Assuming max 10 window switches
  ]
}

export async function POST(request: Request) {
  const { features, userAnswers } = await request.json()

  // Calculate the score
  const score = calculateScore(userAnswers)

  // Analyze features for cheating probability
  const cheatingDetected = await analyzeCheating(features)

  return NextResponse.json({ score, cheatingDetected })
}

function calculateScore(userAnswers: string[]): number {
  const correctAnswers = ['c', 'b', 'c', 'd', 'c']
  return userAnswers.reduce((score, answer, index) => {
    return score + (answer === correctAnswers[index] ? 1 : 0)
  }, 0)
}

async function analyzeCheating(features: Features): Promise<number> {
  try {
    const normalizedFeatures = normalize(features)
    const inputTensor = tf.tensor2d([normalizedFeatures])
    const prediction = model.predict(inputTensor)
    const result = prediction.dataSync()[0]
    return result > 0.5 ? 1 : 0
  } catch (error) {
    console.error('Prediction error:', error)
    return 0 // Default to no cheating if there's an error
  }
}

