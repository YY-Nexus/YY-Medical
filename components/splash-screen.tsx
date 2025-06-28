"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-mobile"
import { WifiOff } from "lucide-react"

interface SplashScreenProps {
  onComplete?: () => void
  duration?: number
  isOffline?: boolean
}

export function SplashScreen({ onComplete, duration = 3000, isOffline = false }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const isMobile = useIsMobile()
  const [allowSkip, setAllowSkip] = useState(false)
  const [progress, setProgress] = useState(0)

  // 处理进度条动画
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // 离线状态下进度条最多到95%，表示无法完全加载
        const maxProgress = isOffline ? 95 : 100
        const newProgress = prev + (maxProgress - prev) * 0.05
        return newProgress > maxProgress - 0.5 ? maxProgress : newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isOffline])

  // 允许跳过动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setAllowSkip(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // 处理动画完成
  useEffect(() => {
    // 离线状态下不自动完成，除非用户点击跳过
    if (!isOffline) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onComplete) {
          setTimeout(onComplete, 500) // 给退出动画一些时间
        }
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, onComplete, isOffline])

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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleSkip}
        >
          {/* 离线状态指示器 */}
          {isOffline && (
            <motion.div
              className="absolute top-4 right-4 flex items-center px-3 py-1.5 bg-red-500 rounded-full text-white text-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <WifiOff className="w-4 h-4 mr-1.5" />
              <span>离线模式</span>
            </motion.div>
          )}

          {/* 主要内容 */}
          <div className="relative flex flex-col items-center px-4">
            {/* Logo容器 */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="relative mb-4 md:mb-8"
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
                  duration: isMobile ? 1.5 : 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              {/* Logo */}
              <motion.div
                animate={{
                  rotateY: isMobile ? [0, 5, 0, -5, 0] : [0, 10, 0, -10, 0],
                  scale: [1, 1.03, 1, 1.03, 1],
                }}
                transition={{
                  duration: isMobile ? 2 : 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Image
                  src="/yanyu-cloud-logo.png"
                  alt="言语云³ Logo"
                  width={isMobile ? 140 : 180}
                  height={isMobile ? 140 : 180}
                  className="relative z-10"
                  priority
                />
              </motion.div>

              {/* 粒子效果 */}
              <Particles isMobile={isMobile} />
            </motion.div>

            {/* 品牌名称 */}
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.h1
                className={`${isMobile ? "text-3xl" : "text-4xl"} font-bold mb-2`}
                animate={{
                  textShadow: [
                    "0 0 8px rgba(255,255,255,0.5)",
                    "0 0 16px rgba(255,255,255,0.8)",
                    "0 0 8px rgba(255,255,255,0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                言语云<sup>3</sup>
              </motion.h1>
              <motion.p
                className={`${isMobile ? "text-lg" : "text-xl"} opacity-90`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.8 }}
              >
                {isOffline ? "离线模式 · 部分功能可用" : "智能医疗 · 云端守护"}
              </motion.p>
            </motion.div>

            {/* 加载指示器 */}
            <motion.div
              className="mt-8 md:mt-12 w-full max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <LoadingIndicator isMobile={isMobile} />

              {/* 进度条 */}
              <div className="mt-4 w-full bg-blue-200 bg-opacity-30 rounded-full h-1.5 md:h-2">
                <motion.div
                  className={`h-full rounded-full ${isOffline ? "bg-yellow-300" : "bg-white"}`}
                  style={{ width: `${progress}%` }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* 离线状态提示 */}
              {isOffline && (
                <motion.p
                  className="text-sm text-center mt-4 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  您当前处于离线状态，部分功能可能不可用
                </motion.p>
              )}

              {/* 跳过提示 */}
              {(isMobile || isOffline) && allowSkip && (
                <motion.p
                  className="text-xs text-center mt-4 text-white text-opacity-70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  点击屏幕{isOffline ? "进入离线模式" : "跳过"}
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* 移动设备专用的底部装饰 */}
          {isMobile && (
            <motion.div
              className="absolute bottom-0 w-full"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  fill="white"
                  fillOpacity="0.1"
                />
              </svg>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// 粒子效果组件
function Particles({ isMobile }: { isMobile: boolean }) {
  // 移动设备上减少粒子数量
  const particleCount = isMobile ? 6 : 12

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

// 加载指示器组件
function LoadingIndicator({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="flex items-center justify-center space-x-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`${isMobile ? "w-2 h-2" : "w-3 h-3"} bg-white rounded-full`}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: isMobile ? 1 : 1.2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  )
}
