"use client"

import { Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
  className?: string
}

export function Logo({ size = "md", animated = false, className }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  }

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-10 w-10",
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg",
        sizeClasses[size],
        animated && "animate-pulse",
        className,
      )}
    >
      {/* 背景光晕效果 */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 opacity-75 blur-sm"></div>

      {/* 主图标 */}
      <Shield className={cn("relative z-10 text-white drop-shadow-sm", iconSizes[size])} />

      {/* 装饰性小点 */}
      <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-80"></div>
      <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-white rounded-full opacity-60"></div>

      {/* 动画光环 */}
      {animated && <div className="absolute inset-0 rounded-xl border-2 border-white/30 animate-ping"></div>}
    </div>
  )
}
