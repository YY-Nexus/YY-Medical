"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { useIsMobile } from "@/hooks/use-mobile"

interface TranslationProgressProps {
  onComplete?: () => void
  totalItems?: number
  translatedItems?: number
  autoComplete?: boolean
  completionTime?: number
  showSkip?: boolean
}

export function TranslationProgress({
  onComplete,
  totalItems = 100,
  translatedItems = 0,
  autoComplete = true,
  completionTime = 3000,
  showSkip = true,
}: TranslationProgressProps) {
  const [progress, setProgress] = useState(Math.floor((translatedItems / totalItems) * 100))
  const [isVisible, setIsVisible] = useState(true)
  const [allowSkip, setAllowSkip] = useState(false)
  const isMobile = useIsMobile()

  // 允许跳过动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setAllowSkip(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // 自动完成进度
  useEffect(() => {
    if (!autoComplete) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsVisible(false)
            if (onComplete) {
              setTimeout(onComplete, 500) // 给退出动画一些时间
            }
          }, 500)
          return 100
        }
        return prev + 1
      })
    }, completionTime / 100)

    return () => clearInterval(interval)
  }, [autoComplete, completionTime, onComplete])

  // 处理跳过动画
  const handleSkip = () => {
    if (allowSkip) {
      setIsVisible(false)
      if (onComplete) {
        setTimeout(onComplete, 300)
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={showSkip ? handleSkip : undefined}
        >
          <div className="relative flex flex-col items-center px-4 max-w-md w-full">
            {/* Logo容器 */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="relative mb-8"
            >
              {/* 光晕效果 */}
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-400 blur-md md:blur-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 0.4, 0.2],
                  scale: [0.8, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              {/* Logo */}
              <motion.div
                animate={{
                  rotateY: [0, 10, 0, -10, 0],
                  scale: [1, 1.03, 1, 1.03, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
                className="relative z-10"
              >
                <Image
                  src="/yanyu-shield-logo.png"
                  alt="言语云³ Logo"
                  width={isMobile ? 120 : 160}
                  height={isMobile ? 120 : 160}
                  priority
                />
              </motion.div>

              {/* 粒子效果 */}
              <TranslationParticles isMobile={isMobile} />
            </motion.div>

            {/* 翻译进度文本 */}
            <motion.div
              className="text-center text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.h2
                className="text-2xl font-bold mb-2"
                animate={{
                  textShadow: [
                    "0 0 8px rgba(255,255,255,0.5)",
                    "0 0 16px rgba(255,255,255,0.8)",
                    "0 0 8px rgba(255,255,255,0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                翻译进度
              </motion.h2>
              <motion.p className="text-lg opacity-90">正在加载翻译资源 ({progress}%)</motion.p>
            </motion.div>

            {/* 进度条 */}
            <motion.div
              className="w-full max-w-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Progress value={progress} className="h-2" />

              {/* 进度详情 */}
              <div className="flex justify-between mt-2 text-sm text-white text-opacity-80">
                <span>已翻译: {Math.floor((totalItems * progress) / 100)} 项</span>
                <span>总计: {totalItems} 项</span>
              </div>

              {/* 跳过提示 */}
              {showSkip && allowSkip && (
                <motion.p
                  className="text-xs text-center mt-6 text-white text-opacity-70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  点击屏幕跳过
                </motion.p>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// 粒子效果组件
function TranslationParticles({ isMobile }: { isMobile: boolean }) {
  // 移动设备上减少粒子数量
  const particleCount = isMobile ? 8 : 15

  return (
    <div className="absolute inset-0 z-0">
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${isMobile ? "w-1.5 h-1.5" : "w-2 h-2"} rounded-full bg-blue-200`}
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
          }}
          animate={{
            x: Math.random() > 0.5 ? [0, (i % 2 ? -1 : 1) * (30 + Math.random() * (isMobile ? 60 : 100))] : 0,
            y: Math.random() > 0.5 ? 0 : [0, (i % 2 ? -1 : 1) * (30 + Math.random() * (isMobile ? 60 : 100))],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 1.5 + Math.random() * (isMobile ? 1 : 2),
            repeat: Number.POSITIVE_INFINITY,
            delay: i * (isMobile ? 0.3 : 0.2),
            repeatType: "loop",
          }}
          style={{
            left: `${50 + (Math.random() - 0.5) * (isMobile ? 15 : 20)}%`,
            top: `${50 + (Math.random() - 0.5) * (isMobile ? 15 : 20)}%`,
          }}
        />
      ))}
    </div>
  )
}
