"use client"

import type * as React from "react"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DynamicLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean
  children: React.ReactNode
  loadingText?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "medical" | "accent" | "success"
}

export function DynamicLoading({
  isLoading,
  children,
  loadingText,
  size = "md",
  variant = "medical",
  className,
  ...props
}: DynamicLoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  const variantClasses = {
    default: "text-gray-500",
    medical: "text-medical-500",
    accent: "text-accent-500",
    success: "text-success-500",
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center p-8 space-y-4"
        >
          <Loader2 className={cn("animate-spin", sizeClasses[size], variantClasses[variant])} />
          {loadingText && <p className={cn("text-sm font-medium", variantClasses[variant])}>{loadingText}</p>}
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.2 }}>
          {children}
        </motion.div>
      )}
    </div>
  )
}
