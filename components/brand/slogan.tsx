"use client"

import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

interface SloganProps {
  className?: string
  variant?: "default" | "hero" | "footer"
}

export function Slogan({ className, variant = "default" }: SloganProps) {
  const { language } = useLanguage()

  const slogans = {
    "zh-CN": "言启立方于万象，语枢智云守健康",
    "en-US": "Words Initiate Cube Amid Vast Scenarios, Language Serves as Core, Smart Cloud Guards Health",
  }

  const variantStyles = {
    default: "text-base text-muted-foreground",
    hero: "text-lg md:text-xl text-blue-600 dark:text-blue-400 font-medium",
    footer: "text-sm text-blue-200/80",
  }

  return (
    <p className={cn(variantStyles[variant], className)}>
      {slogans[language as keyof typeof slogans] || slogans["zh-CN"]}
    </p>
  )
}
