'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XMarkIcon, 
  PlayIcon, 
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon 
} from '@heroicons/react/24/outline'

interface VideoIntroModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function VideoIntroModal({ isOpen, onClose }: VideoIntroModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showSubtitles, setShowSubtitles] = useState(true)
  const [speechSupported, setSpeechSupported] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Mock video duration for demo (in seconds)
  const mockDuration = 180 // 3 minutes

  // Video script with slides and voiceover text
  const videoSlides = useMemo(() => [
    {
      id: 0,
      startTime: 0,
      endTime: 30,
      background: 'from-primary-600 via-secondary-600 to-accent-600',
      icon: '🎓',
      title: 'Welcome to TutorHub',
      subtitle: 'Your Gateway to Academic Excellence',
      voiceover: 'Hello! Welcome to TutorHub, where academic dreams become reality.',
      content: [
        'Expert GCSE tutoring',
        'Personalized learning approach',
        'Proven success strategies'
      ]
    },
    {
      id: 1,
      startTime: 30,
      endTime: 60,
      background: 'from-emerald-600 via-teal-600 to-cyan-600',
      icon: '📚',
      title: 'Five Core Subjects',
      subtitle: 'Complete GCSE Coverage',
      voiceover: 'We specialize in the five most important GCSE subjects that determine your future.',
      content: [
        '🧮 Mathematics - From basics to advanced',
        '⚗️ Chemistry - Practical and theoretical',
        '🔬 Physics - Mechanics to modern physics',
        '🧬 Biology - Life sciences made simple',
        '💻 Computer Science - Programming and theory'
      ]
    },
    {
      id: 2,
      startTime: 60,
      endTime: 90,
      background: 'from-violet-600 via-purple-600 to-fuchsia-600',
      icon: '⭐',
      title: '98% Success Rate',
      subtitle: 'Results That Speak for Themselves',
      voiceover: 'Our students consistently achieve grades 4-9, with 98% reaching their target grades.',
      content: [
        '10,000+ successful students',
        '500+ expert tutors',
        'Average 2 grade improvement',
        'Money-back guarantee'
      ]
    },
    {
      id: 3,
      startTime: 90,
      endTime: 120,
      background: 'from-orange-600 via-red-600 to-pink-600',
      icon: '👨‍🏫',
      title: 'Expert Tutors',
      subtitle: 'Qualified. Experienced. Passionate.',
      voiceover: 'Our tutors are qualified professionals with years of teaching experience.',
      content: [
        'University-qualified teachers',
        'Subject specialists only',
        'Continuous training programs',
        'Student-focused approach'
      ]
    },
    {
      id: 4,
      startTime: 120,
      endTime: 150,
      background: 'from-blue-600 via-indigo-600 to-purple-600',
      icon: '🎯',
      title: 'Personalized Learning',
      subtitle: 'Tailored to Your Needs',
      voiceover: 'Every student is unique, so we create personalized learning plans for maximum success.',
      content: [
        'Individual learning assessments',
        'Customized study plans',
        'Progress tracking',
        'Flexible scheduling'
      ]
    },
    {
      id: 5,
      startTime: 150,
      endTime: 180,
      background: 'from-green-600 via-emerald-600 to-teal-600',
      icon: '🚀',
      title: 'Start Your Journey',
      subtitle: 'Excellence Awaits',
      voiceover: 'Ready to transform your academic future? Let\'s start your success story today!',
      content: [
        'Free consultation available',
        'Flexible payment options',
        'Start anytime',
        'Join thousands of successful students'
      ]
    }
  ], [])

  const currentSlideData = videoSlides[currentSlide] || videoSlides[0]

  // Check for speech synthesis support
  useEffect(() => {
    setSpeechSupported('speechSynthesis' in window)
  }, [])

  // Stop speech when modal closes
  useEffect(() => {
    if (!isOpen && speechRef.current) {
      window.speechSynthesis.cancel()
    }
  }, [isOpen])

  // Handle speech synthesis for current slide
  useEffect(() => {
    if (isPlaying && !isMuted && speechSupported && currentSlideData) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()
      
      // Create new speech utterance
      const utterance = new SpeechSynthesisUtterance(currentSlideData.voiceover)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1
      
      // Set voice (prefer female voice if available)
      const voices = window.speechSynthesis.getVoices()
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('hazel')
      )
      if (femaleVoice) {
        utterance.voice = femaleVoice
      }
      
      speechRef.current = utterance
      window.speechSynthesis.speak(utterance)
    } else if (speechRef.current) {
      window.speechSynthesis.cancel()
    }
  }, [currentSlide, isPlaying, isMuted, speechSupported, currentSlideData])

  useEffect(() => {
    if (isOpen) {
      setCurrentTime(0)
      setDuration(mockDuration)
      setIsPlaying(false)
      setCurrentSlide(0)
    }
  }, [isOpen, mockDuration])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= mockDuration) {
            setIsPlaying(false)
            if (speechRef.current) {
              window.speechSynthesis.cancel()
            }
            return mockDuration
          }
          
          // Update current slide based on time
          const newSlide = videoSlides.findIndex(slide => 
            prev >= slide.startTime && prev < slide.endTime
          )
          if (newSlide !== -1 && newSlide !== currentSlide) {
            setCurrentSlide(newSlide)
          }
          
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, mockDuration, currentSlide, videoSlides])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying && speechRef.current) {
      window.speechSynthesis.cancel()
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted && speechRef.current) {
      window.speechSynthesis.cancel()
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value)
    setCurrentTime(newTime)
    
    // Update slide based on seek position
    const newSlide = videoSlides.findIndex(slide => 
      newTime >= slide.startTime && newTime < slide.endTime
    )
    if (newSlide !== -1 && newSlide !== currentSlide) {
      setCurrentSlide(newSlide)
    }
    
    // Cancel current speech when seeking
    if (speechRef.current) {
      window.speechSynthesis.cancel()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Welcome to TutorHub</h2>
                <p className="text-gray-600">Discover how we can help you achieve your learning goals</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Close video"
                aria-label="Close video introduction"
              >
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Video Container */}
            <div className={`relative aspect-video bg-gradient-to-br ${currentSlideData.background}`}>
              {/* Dynamic Slide Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <motion.div
                    key={currentSlide}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: isPlaying ? [1, 1.1, 1] : 1,
                      opacity: 1 
                    }}
                    transition={{
                      scale: {
                        duration: 2,
                        repeat: isPlaying ? Infinity : 0,
                        ease: "easeInOut"
                      },
                      opacity: { duration: 0.5 }
                    }}
                    className="text-8xl mb-6"
                  >
                    {currentSlideData.icon}
                  </motion.div>
                  
                  <motion.h3 
                    key={`title-${currentSlide}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold mb-4"
                  >
                    {currentSlideData.title}
                  </motion.h3>
                  
                  <motion.p 
                    key={`subtitle-${currentSlide}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl mb-6 max-w-2xl"
                  >
                    {currentSlideData.subtitle}
                  </motion.p>
                  
                  {/* Voiceover Text Display */}
                  {showSubtitles && (
                    <motion.div
                      key={`voiceover-${currentSlide}`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-black/30 backdrop-blur-sm rounded-xl p-4 mb-6 max-w-3xl mx-auto"
                    >
                      <p className="text-lg italic">&ldquo;{currentSlideData.voiceover}&rdquo;</p>
                    </motion.div>
                  )}
                  
                  {/* Content Points */}
                  <motion.div 
                    key={`content-${currentSlide}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
                  >
                    {currentSlideData.content.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + index * 0.2 }}
                        className="bg-white/20 backdrop-blur-sm rounded-xl p-4"
                      >
                        <p className="text-sm font-medium">{item}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Play Button Overlay */}
              {!isPlaying && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <PlayIcon className="w-8 h-8 text-gray-800 ml-1" />
                  </div>
                </motion.button>
              )}
            </div>

            {/* Video Controls */}
            <div className="p-4 bg-gray-50">
              <div className="flex items-center space-x-4">
                <button
                  onClick={togglePlay}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <PauseIcon className="w-5 h-5 text-gray-700" />
                  ) : (
                    <PlayIcon className="w-5 h-5 text-gray-700" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="w-5 h-5 text-gray-700" />
                  ) : (
                    <SpeakerWaveIcon className="w-5 h-5 text-gray-700" />
                  )}
                </button>

                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    showSubtitles 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  title="Toggle subtitles"
                >
                  CC
                </button>

                {!speechSupported && (
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    Speech not supported
                  </span>
                )}

                <div className="flex-1 flex items-center space-x-2">
                  <span className="text-sm text-gray-600 min-w-[3rem]">
                    {formatTime(currentTime)}
                  </span>
                  
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      title="Video progress"
                      aria-label="Seek video position"
                    />
                    <div 
                      className="absolute top-0 left-0 h-2 bg-primary-600 rounded-lg pointer-events-none transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  
                  <span className="text-sm text-gray-600 min-w-[3rem]">
                    {formatTime(duration)}
                  </span>
                </div>

                <div className="text-xs text-gray-500 ml-4">
                  Slide {currentSlide + 1} of {videoSlides.length}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Start Learning?</h3>
                <p className="text-gray-600 mb-4">
                  Join thousands of students achieving their GCSE goals with expert tutoring
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    Browse Courses
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-white border-2 border-primary-200 text-primary-700 rounded-xl font-semibold hover:border-primary-300 transition-all duration-200"
                  >
                    Find a Tutor
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
