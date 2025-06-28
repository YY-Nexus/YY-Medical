"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  variant?: "default" | "minimal" | "text-only"
  className?: string
  textClassName?: string
  showText?: boolean
  animated?: boolean
}

export function AnimatedLogo({
  size = "md",
  variant = "default",
  className = "",
  textClassName = "",
  showText = true,
  animated = true,
}: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // 添加初始加载动画
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // 根据尺寸确定宽高
  const dimensions = {
    xs: { width: 32, height: 32, textSize: "text-sm", iconSize: 20 },
    sm: { width: 40, height: 40, textSize: "text-base", iconSize: 24 },
    md: { width: 48, height: 48, textSize: "text-lg", iconSize: 28 },
    lg: { width: 64, height: 64, textSize: "text-xl", iconSize: 36 },
    xl: { width: 96, height: 96, textSize: "text-2xl", iconSize: 48 },
  }

  const { width, height, textSize, iconSize } = dimensions[size]

  // 如果不支持客户端动画，则返回静态版本
  if (!isMounted) {
    return (
      <div className={cn("flex items-center", className)}>
        <div className="relative" style={{ width, height }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-full rounded-full bg-medical-gradient flex items-center justify-center">
              <span className="text-white font-bold">YY³</span>
            </div>
          </div>
        </div>
        {showText && <span className={cn("ml-2 font-bold text-medical-800", textSize, textClassName)}>医枢³</span>}
      </div>
    )
  }

  // 最小化版本只显示图标
  if (variant === "minimal") {
    return (
      <motion.div
        className={cn("relative", className)}
        style={{ width, height }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: isLoaded ? (isHovered ? 1.05 : 1) : 0.8,
          opacity: isLoaded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-full w-full rounded-full bg-medical-gradient flex items-center justify-center shadow-lg">
          <motion.span
            className="text-white font-bold"
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotateY: isHovered ? 360 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            YY³
          </motion.span>
        </div>
      </motion.div>
    )
  }

  // 仅文字版本
  if (variant === "text-only") {
    return (
      <motion.span
        className={cn("font-bold text-medical-800", textSize, textClassName, className)}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        医枢³
      </motion.span>
    )
  }

  // 默认完整版本
  return (
    <div
      className={cn("flex items-center", className)}
      onMouseEnter={() => animated && setIsHovered(true)}
      onMouseLeave={() => animated && setIsHovered(false)}
    >
      <motion.div
        className="relative"
        style={{ width, height }}
        initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
        animate={{
          scale: isLoaded ? (isHovered && animated ? 1.05 : 1) : 0.8,
          opacity: isLoaded ? 1 : 0,
          rotate: isLoaded ? 0 : -10,
        }}
        transition={{ duration: 0.4, type: "spring" }}
      >
        <div className="h-full w-full rounded-full bg-medical-gradient flex items-center justify-center shadow-lg">
          <motion.div
            animate={{
              scale: isHovered && animated ? 1.1 : 1,
              rotateY: isHovered && animated ? 360 : 0,
            }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            {/* 云形状和数字3 */}
            <svg viewBox="0 0 100 100" width={iconSize} height={iconSize} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="cloudGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e0f2fe" />
                  <stop offset="100%" stopColor="#bfdbfe" />
                </linearGradient>
                <linearGradient id="cloudGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
                <linearGradient id="cloudGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>

              {/* 云形状1 */}
              <path
                d="M50,20 C65,20 75,35 75,50 C75,65 65,80 50,80 C35,80 25,65 25,50 C25,35 35,20 50,20 Z"
                fill="url(#cloudGradient1)"
                opacity="0.9"
              />

              {/* 云形状2 */}
              <path
                d="M40,25 C55,25 65,40 65,55 C65,70 55,75 40,75 C25,75 20,60 20,45 C20,30 25,25 40,25 Z"
                fill="url(#cloudGradient2)"
                opacity="0.8"
              />

              {/* 云形状3 */}
              <path
                d="M60,25 C75,25 80,40 80,55 C80,70 75,75 60,75 C45,75 35,60 35,45 C35,30 45,25 60,25 Z"
                fill="url(#cloudGradient3)"
                opacity="0.8"
              />

              {/* 数字3 */}
              <text
                x="50"
                y="58"
                fontSize="30"
                fontWeight="bold"
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                3
              </text>
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {showText && (
        <AnimatePresence>
          <motion.span
            className={cn("ml-2 font-bold text-medical-800", textSize, textClassName)}
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              x: isLoaded ? 0 : -10,
              scale: isHovered && animated ? 1.05 : 1,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            医枢³
          </motion.span>
        </AnimatePresence>
      )}
    </div>
  )
}
