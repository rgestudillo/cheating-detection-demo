interface QuizNavigationProps {
  currentQuestion: number
  totalQuestions: number
  goToPreviousQuestion: () => void
  goToNextQuestion: () => void
  submitQuiz: () => void
  isSubmitting: boolean
}

export default function QuizNavigation({
  currentQuestion,
  totalQuestions,
  goToPreviousQuestion,
  goToNextQuestion,
  submitQuiz,
  isSubmitting
}: QuizNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={goToPreviousQuestion}
        disabled={currentQuestion === 0 || isSubmitting}
        className="btn btn-secondary"
      >
        Previous
      </button>

      {currentQuestion === totalQuestions - 1 ? (
        <button
          onClick={submitQuiz}
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
              Submitting...
            </span>
          ) : (
            'Submit Quiz'
          )}
        </button>
      ) : (
        <button
          onClick={goToNextQuestion}
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          Next
        </button>
      )}
    </div>
  )
}

