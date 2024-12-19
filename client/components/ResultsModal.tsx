import { X } from 'lucide-react'

interface ResultsModalProps {
  results: { score: number; prediction: number } | null
  onClose: () => void
  onRetake: () => void
  isSubmitting?: boolean
}

export default function ResultsModal({ results, onClose, onRetake, isSubmitting = false }: ResultsModalProps) {
  if (isSubmitting) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700">Analyzing Results...</h2>
            <p className="text-gray-500 mt-2 text-center">
              Please wait while we process your answers and analyze the data.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!results) return null;

  console.log("results are: ", results)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Quiz Results</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <p className="text-lg font-semibold mb-2">Your score:</p>
            <p className="text-3xl font-bold text-blue-600">{results.score} / 25</p>
          </div>
          <div className="text-center">
            <div className={`inline-block px-6 py-3 rounded-lg ${results.prediction === 1
              ? 'bg-red-100 text-red-700 border-2 border-red-500'
              : 'bg-green-100 text-green-700 border-2 border-green-500'
              }`}>
              <p className="text-lg font-bold">
                {results.prediction === 1 ? 'Likely Cheating' : 'No Cheating'}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg space-y-3">
          <button
            onClick={onRetake}
            className="btn btn-primary w-full mb-2"
          >
            Take Exam Again
          </button>
          <button
            onClick={onClose}
            className="btn btn-secondary w-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

