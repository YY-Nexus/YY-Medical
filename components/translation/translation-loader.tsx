"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"

interface TranslationLoaderProps {
  onComplete?: () => void
  message?: string
  duration?: number
  size?: "sm" | "md" | "lg"
}

export function TranslationLoader({
  onComplete,
  message = "正在加载翻译资源...",
  duration = 2000,
  size = "md",
}: TranslationLoaderProps) {
  const [progress, setProgress] = useState(0)

  // 尺寸映射
  const sizeMap = {
    sm: { logoSize: 40, height: "h-20", width: "w-64" },
    md: { logoSize: 60, height: "h-28", width: "w-80" },
    lg: { logoSize: 80, height: "h-36", width: "w-96" },
  }

  const { logoSize, height, width } = sizeMap[size]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          if (onComplete) {
            setTimeout(onComplete, 300)
          }
          return 100
        }
        return prev + 1
      })
    }, duration / 100)

    return () => clearInterval(interval)
  }, [duration, onComplete])

  return (
    <motion.div
      className={`${height} ${width} bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <motion.div
        animate={{
          rotate: [0, 10, 0, -10, 0],
          scale: [1, 1.05, 1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        className="mb-4"
      >
        <Image
          src="/yanyu-shield-logo.png"
          alt="言语云³ Logo"
          width={logoSize}
          height={logoSize}
          className="object-contain"
        />
      </motion.div>

      <p className="text-medical-700 mb-3 text-center">{message}</p>

      <div className="w-full max-w-xs">
        <Progress value={progress} className="h-1.5" />
        <p className="text-xs text-right mt-1 text-medical-500">{progress}%</p>
      </div>
    </motion.div>
  )
}
