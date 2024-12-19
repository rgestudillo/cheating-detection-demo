'use client'

import { useEffect, useRef, useState } from 'react'

const WebcamComponent = ({ onWebcamStatus }: { onWebcamStatus: (status: boolean) => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isStreaming, setIsStreaming] = useState(false)

    useEffect(() => {
        startCamera()
        return () => {
            stopCamera()
        }
    }, [])

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 320, height: 240 }
            })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                setIsStreaming(true)
                onWebcamStatus(true)
            }
        } catch (err) {
            console.error("Error accessing webcam:", err)
            onWebcamStatus(false)
        }
    }

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream
            stream.getTracks().forEach(track => track.stop())
            setIsStreaming(false)
            onWebcamStatus(false)
        }
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="relative">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="rounded-lg shadow-lg w-[320px] h-[240px]"
                />
                <button
                    onClick={isStreaming ? stopCamera : startCamera}
                    className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100"
                >
                    {isStreaming ? '⏹️' : '▶️'}
                </button>
            </div>
        </div>
    )
}

export default WebcamComponent