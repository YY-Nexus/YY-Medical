"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface CloudLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
  className?: string
}

export function CloudLogo({ size = "md", animated = true, className = "" }: CloudLogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 根据尺寸确定宽高
  const dimensions = {
    sm: { width: 40, height: 40 },
    md: { width: 60, height: 60 },
    lg: { width: 100, height: 100 },
    xl: { width: 150, height: 150 },
  }

  const { width, height } = dimensions[size]

  // 如果不支持客户端动画，则返回静态版本
  if (!isMounted || !animated) {
    return (
      <div className={`relative ${className}`} style={{ width, height }}>
        <Image
          src="/yanyu-shield-logo.png"
          alt="言语云³ Logo"
          width={width}
          height={height}
          className="object-contain"
        />
      </div>
    )
  }

  return (
    <div
      className={`relative ${className}`}
      style={{ width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          rotate: isHovered ? 5 : 0,
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
    </div>
  )
}
