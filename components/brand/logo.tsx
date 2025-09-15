"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showText?: boolean
  animated?: boolean
}

const sizeMap = {
  sm: { width: 32, height: 32, textSize: "text-sm" },
  md: { width: 48, height: 48, textSize: "text-base" },
  lg: { width: 64, height: 64, textSize: "text-lg" },
  xl: { width: 80, height: 80, textSize: "text-xl" },
}

export function Logo({ size = "md", className, showText = false, animated = false }: LogoProps) {
  const { width, height, textSize } = sizeMap[size]

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", animated && "animate-pulse")}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/YYC%C2%B3-%E5%BE%BD%E6%A0%87-D4DNFGgyeOlUR8oO0JVSSVwfJBa92N.png"
          alt="YYC³-Med Logo"
          width={width}
          height={height}
          className={cn("object-contain", animated && "hover:scale-110 transition-transform duration-300")}
          priority
        />
        {animated && <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />}
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold text-blue-600", textSize)}>言语云³</span>
          <span className={cn("text-xs text-muted-foreground")}>YYC³-Med</span>
        </div>
      )}
    </div>
  )
}

export default Logo
