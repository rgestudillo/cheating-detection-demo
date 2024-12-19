'use client'

import { useState, useEffect } from 'react'
import { quizData } from '../data/quizData'
import { Features } from '../models/Features'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import QuizQuestion from '@/components/QuizQuestion'
import FeatureTracker from '@/components/FeatureTracker'
import FeatureDisplay from '@/components/FeatureDisplay'
import QuizNavigation from '@/components/QuizNavigation'
import ResultsModal from '@/components/ResultsModal'
import WebcamComponent from '@/components/WebcamComponent'

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>(new Array(quizData.length).fill(''))
  const [features, setFeatures] = useState<Features>({
    browserTabsOpen: 1,
    timePerQuestion: 0,
    keyboardActivity: 0,
    mouseMovements: 0,
    proximityAlerts: 0,
    inactivityPeriods: 0,
    windowSwitches: 0
  })
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<{ score: number; prediction: number } | null>(null)
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const startQuiz = () => {
    setQuizStarted(true)
  }

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = answer
    setUserAnswers(newAnswers)
  }

  const goToNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const submitQuiz = async () => {
    setIsSubmitting(true)
    try {
      const requestBody = {
        features,
        userAnswers,
      };

      console.log('Request Body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features, userAnswers }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("data is: ", data)
        setResults(data)
        setShowResults(true)
      } else {
        console.error('Failed to analyze quiz results')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRetake = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setUserAnswers(new Array(quizData.length).fill(''))
    setFeatures({
      browserTabsOpen: 1,
      timePerQuestion: 0,
      keyboardActivity: 0,
      mouseMovements: 0,
      proximityAlerts: 0,
      inactivityPeriods: 0,
      windowSwitches: 0
    })
    setShowResults(false)
    setResults(null)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {!quizStarted ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to start the quiz?</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md">
                This quiz will test your knowledge while our advanced system monitors for any potential irregularities.
              </p>
              {!isWebcamEnabled && (
                <p className="text-red-500 mb-4">
                  Please enable your webcam to start the quiz
                </p>
              )}
              <button
                onClick={startQuiz}
                disabled={!isWebcamEnabled}
                className={`btn btn-primary text-lg px-8 py-3 ${!isWebcamEnabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                Start Quiz
              </button>
            </div>
          ) : (
            <>
              <FeatureTracker features={features} setFeatures={setFeatures} />
              <FeatureDisplay features={features} />
              <QuizQuestion
                question={quizData[currentQuestion]}
                userAnswer={userAnswers[currentQuestion]}
                onAnswer={handleAnswer}
                currentQuestion={currentQuestion}
                totalQuestions={quizData.length}
              />
              <QuizNavigation
                currentQuestion={currentQuestion}
                totalQuestions={quizData.length}
                goToPreviousQuestion={goToPreviousQuestion}
                goToNextQuestion={goToNextQuestion}
                submitQuiz={submitQuiz}
                isSubmitting={isSubmitting}
              />
            </>
          )}
          {showResults && results && (
            <ResultsModal
              results={results}
              onClose={() => setShowResults(false)}
              onRetake={handleRetake}
            />
          )}
        </div>
      </main>
      <WebcamComponent
        onWebcamStatus={setIsWebcamEnabled}
        onProximityUpdate={(maxFaces) =>
          setFeatures(prev => ({ ...prev, proximityAlerts: maxFaces }))
        }
      />
      <Footer />
    </div>
  )
}

