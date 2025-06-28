"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  variant?: "default" | "white" | "dark"
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
}

const textSizeClasses = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-2xl",
}

export function Logo({ className, size = "md", showText = true, variant = "default" }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative flex-shrink-0", sizeClasses[size])}>
        <Image src="/images/yanyu-cloud-logo.png" alt="言语云³医疗AI系统" fill className="object-contain" priority />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent",
              textSizeClasses[size],
            )}
          >
            言语云³
          </span>
          <span
            className={cn(
              "text-xs text-muted-foreground -mt-1",
              size === "sm" && "text-[10px]",
              size === "xl" && "text-sm",
            )}
          >
            医疗AI智能诊疗系统
          </span>
        </div>
      )}
    </div>
  )
}

// 简化版Logo（仅图标）
export function LogoIcon({ className, size = "md" }: Pick<LogoProps, "className" | "size">) {
  return (
    <div className={cn("relative flex-shrink-0", sizeClasses[size], className)}>
      <Image src="/images/yanyu-cloud-logo.png" alt="言语云³" fill className="object-contain" priority />
    </div>
  )
}

// 带动画效果的Logo
export function AnimatedLogo({ className, size = "md" }: Pick<LogoProps, "className" | "size">) {
  return (
    <div className={cn("relative flex-shrink-0 transition-transform hover:scale-110", sizeClasses[size], className)}>
      <Image src="/images/yanyu-cloud-logo.png" alt="言语云³" fill className="object-contain drop-shadow-lg" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full animate-pulse" />
    </div>
  )
}
