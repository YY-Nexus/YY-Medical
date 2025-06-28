"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ShieldLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  animated?: boolean
  className?: string
  showText?: boolean
}

export function ShieldLogo({ size = "md", animated = true, className = "", showText = true }: ShieldLogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 根据尺寸确定宽高
  const dimensions = {
    xs: { width: 24, height: 24 },
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
    xl: { width: 96, height: 96 },
  }

  const { width, height } = dimensions[size]

  // 如果不支持客户端动画，则返回静态版本
  if (!isMounted || !animated) {
    return (
      <div className={cn("relative flex items-center", className)}>
        <Image
          src="/yanyu-shield-logo.png"
          alt="言语云³ Logo"
          width={width}
          height={height}
          className="object-contain"
        />
        {showText && size !== "xs" && size !== "sm" && (
          <span className="ml-2 font-bold text-medical-700 whitespace-nowrap">
            言语云<sup>3</sup>
          </span>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn("relative flex items-center", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ scale: 1, rotate: 0 }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          rotate: isHovered ? 2 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src="/yanyu-shield-logo.png"
          alt="言语云³ Logo"
          width={width}
          height={height}
          className="object-contain"
        />
      </motion.div>

      {showText && size !== "xs" && size !== "sm" && (
        <motion.span
          className="ml-2 font-bold text-medical-700 whitespace-nowrap"
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            x: isHovered ? 2 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          言语云<sup>3</sup>
        </motion.span>
      )}
    </div>
  )
}
