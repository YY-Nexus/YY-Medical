"use client"

import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

interface SloganProps {
  className?: string
  size?: "sm" | "md" | "lg"
  align?: "left" | "center" | "right"
}

const slogans = {
  zh: "言启立方于万象，语枢智云守健康",
  en: "Words Initiate Cube Amid Vast Scenarios, Language Serves as Core, Smart Cloud Guards Health",
}

const sizeMap = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
}

const alignMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
}

export function Slogan({ className, size = "md", align = "center" }: SloganProps) {
  const { language } = useLanguage()
  const slogan = slogans[language as keyof typeof slogans] || slogans.zh

  return <p className={cn("text-muted-foreground font-medium", sizeMap[size], alignMap[align], className)}>{slogan}</p>
}

export default Slogan
