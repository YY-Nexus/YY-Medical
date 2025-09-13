"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
  className?: string
  showText?: boolean
}

export function Logo({ size = "md", animated = false, className, showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  }

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn("relative", sizeClasses[size], animated && "animate-pulse")}>
        <Image
          src="/logo-192.png"
          alt="YYC³ Logo"
          width={80}
          height={80}
          className="w-full h-full object-contain"
          priority
        />
        {animated && <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping"></div>}
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold text-blue-800 dark:text-blue-200", textSizes[size])}>YYC³-Med</span>
          <span className={cn("text-xs text-blue-600 dark:text-blue-400", size === "sm" && "hidden")}>言语云³医疗</span>
        </div>
      )}
    </div>
  )
}
