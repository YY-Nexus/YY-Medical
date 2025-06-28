"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PageTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  animation?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "rotate"
  duration?: number
}

export function PageTransition({
  children,
  animation = "fade",
  duration = 0.5,
  className,
  ...props
}: PageTransitionProps) {
  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    "slide-up": {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    "slide-down": {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 },
    },
    "slide-left": {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-right": {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
    rotate: {
      hidden: { opacity: 0, rotate: -2, scale: 0.98 },
      visible: { opacity: 1, rotate: 0, scale: 1 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants[animation]}
      transition={{ duration, ease: "easeOut" }}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
