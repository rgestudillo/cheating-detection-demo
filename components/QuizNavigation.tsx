interface QuizNavigationProps {
  currentQuestion: number
  totalQuestions: number
  goToPreviousQuestion: () => void
  goToNextQuestion: () => void
  submitQuiz: () => void
}

export default function QuizNavigation({
  currentQuestion,
  totalQuestions,
  goToPreviousQuestion,
  goToNextQuestion,
  submitQuiz
}: QuizNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-8">
      <button
        onClick={goToPreviousQuestion}
        disabled={currentQuestion === 0}
        className={`btn ${currentQuestion === 0 ? 'btn-disabled' : 'btn-primary'}`}
      >
        Previous
      </button>
      {currentQuestion === totalQuestions - 1 ? (
        <button
          onClick={submitQuiz}
          className="btn btn-secondary"
        >
          Submit Quiz
        </button>
      ) : (
        <button
          onClick={goToNextQuestion}
          className="btn btn-primary"
        >
          Next
        </button>
      )}
    </div>
  )
}

