import { Github } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Online Cheating Detection Model</h1>
          <p className="text-gray-600 mt-2">Using K-Nearest Neighbors (KNN) Algorithm </p>
        </div>
        <a
          href="https://github.com/rgestudillo/cheating-detection-demo/"
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

