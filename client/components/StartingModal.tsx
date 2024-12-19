import { X } from 'lucide-react'

interface StartingModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function StartingModal({ isOpen, onClose }: StartingModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Demo Limitations Notice</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <p className="text-blue-700 font-medium">Current Browser Limitations</p>
                        <p className="text-blue-600 mt-1">
                            Due to modern browser security restrictions, some features in this demo have limited functionality:
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-semibold text-lg">What's Limited:</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <span className="font-medium">Browser Tab Tracking:</span>
                                {" "}We cannot accurately track the number of open browser tabs due to privacy and security restrictions.
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-semibold text-lg">What Works:</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <span className="font-medium">Webcam Proximity Detection:</span>
                                {" "}Real-time face proximity monitoring
                            </li>
                            <li>
                                <span className="font-medium">Activity Tracking:</span>
                                {" "}Keyboard and mouse movement monitoring
                            </li>
                            <li>
                                <span className="font-medium">Time Tracking:</span>
                                {" "}Time spent per question
                            </li>
                            <li>
                                <span className="font-medium">Window Focus:</span>
                                {" "}Detection when the quiz window loses focus
                            </li>
                        </ul>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                        <p className="text-yellow-700">
                            This is a demonstration project showcasing the potential of browser-based cheating detection.
                            In a production environment, additional security measures would be implemented.
                        </p>
                    </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="btn btn-primary w-full"
                    >
                        I Understand
                    </button>
                </div>
            </div>
        </div>
    )
} 