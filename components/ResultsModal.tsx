import { X } from 'lucide-react'

interface ResultsModalProps {
  results: { score: number; cheatingProbability: number }
  onClose: () => void
}

export default function ResultsModal({ results, onClose }: ResultsModalProps) {
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
            <p className="text-3xl font-bold text-blue-600">{results.score} / 5</p>
          </div>
          <div>
            <p className="text-lg font-semibold mb-2">Integrity analysis:</p>
            <div className="bg-gray-100 rounded-full h-4 w-full">
              <div 
                className="bg-green-500 h-4 rounded-full" 
                style={{ width: `${(1 - results.cheatingProbability) * 100}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Integrity score: {((1 - results.cheatingProbability) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
          <button
            onClick={onClose}
            className="btn btn-primary w-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

