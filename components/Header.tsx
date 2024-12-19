import { Github } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Exam Integrity Monitor</h1>
          <p className="text-gray-600 mt-2">Advanced Cheating Detection System</p>
        </div>
        <a
          href="https://github.com/yourusername/exam-integrity-monitor"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary flex items-center space-x-2"
        >
          <Github className="w-5 h-5" />
          <span className="hidden sm:inline">Star on GitHub</span>
        </a>
      </div>
    </header>
  )
}

