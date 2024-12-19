import { MultipleChoice } from '../../models/MultipleChoice'

interface QuizQuestionProps {
  question: MultipleChoice
  userAnswer: string
  onAnswer: (answer: string) => void
  currentQuestion: number
  totalQuestions: number
}

export default function QuizQuestion({ 
  question, 
  userAnswer, 
  onAnswer, 
  currentQuestion, 
  totalQuestions 
}: QuizQuestionProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Question {currentQuestion + 1}</h2>
        <span className="text-sm font-medium text-gray-600">{currentQuestion + 1} of {totalQuestions}</span>
      </div>
      <p className="text-lg mb-6">{question.question}</p>
      <div className="space-y-4">
        {question.choices.map((choice, index) => (
          <label key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="radio"
              name="answer"
              value={String.fromCharCode(97 + index)}
              checked={userAnswer === String.fromCharCode(97 + index)}
              onChange={(e) => onAnswer(e.target.value)}
              className="input-radio"
            />
            <span className="text-gray-700">{choice}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

