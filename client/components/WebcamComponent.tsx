'use client'

import { useEffect, useRef, useState } from 'react'
import * as faceDetection from '@tensorflow-models/face-detection'
import '@tensorflow/tfjs-backend-webgl'

interface WebcamComponentProps {
    onWebcamStatus: (status: boolean) => void;
    onProximityUpdate: (maxFaces: number) => void;
}

const WebcamComponent = ({ onWebcamStatus, onProximityUpdate }: WebcamComponentProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isStreaming, setIsStreaming] = useState(false)
    const [numFaces, setNumFaces] = useState(0)
    const detectorRef = useRef<faceDetection.FaceDetector | null>(null)
    const animationFrameRef = useRef<number>()
    const [isModelLoaded, setIsModelLoaded] = useState(false)
    const [maxFaces, setMaxFaces] = useState(0)

    useEffect(() => {
        startCamera()
        loadModel()

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
                videoRef.current.onloadeddata = () => {
                    setIsStreaming(true)
                    onWebcamStatus(true)
                }
            }
        } catch (err) {
            console.error('Error accessing webcam:', err)
            onWebcamStatus(false)
        }
    }

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream
            stream.getTracks().forEach(track => track.stop())
            setIsStreaming(false)
            onWebcamStatus(false)

            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }

    const loadModel = async () => {
        try {
            console.log('Loading face detection model...')
            const model = faceDetection.SupportedModels.MediaPipeFaceDetector
            const detectorConfig = {
                runtime: 'tfjs',
                maxFaces: 10,
            }
            const detector = await faceDetection.createDetector(model, detectorConfig)
            detectorRef.current = detector
            setIsModelLoaded(true)
            console.log('Face detection model loaded successfully.')
        } catch (err) {
            console.error('Error loading face detection model:', err)
        }
    }

    const detectFaces = async () => {
        if (!detectorRef.current || !videoRef.current || !isStreaming) {
            return
        }

        try {
            const faces = await detectorRef.current.estimateFaces(videoRef.current)
            setNumFaces(faces.length)
            if (faces.length > maxFaces) {
                setMaxFaces(faces.length)
                onProximityUpdate(faces.length)
            }
        } catch (err) {
            console.error('Error detecting faces:', err)
        }

        animationFrameRef.current = requestAnimationFrame(detectFaces)
    }

    useEffect(() => {
        if (isStreaming && isModelLoaded && detectorRef.current) {
            console.log('Starting face detection...')
            detectFaces()
        }
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [isStreaming, isModelLoaded])

    return (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
            <div className="relative">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="rounded-lg shadow-lg w-[320px] h-[240px]"
                />
                <div className="absolute bottom-2 left-2 bg-gray-900 text-white px-3 py-1 rounded-md opacity-80">
                    Faces Detected: {numFaces}
                </div>
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
