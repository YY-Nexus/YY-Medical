"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { Card3d, Card3dContent, Card3dDescription, Card3dFooter, Card3dHeader, Card3dTitle } from "./3d-card"

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  icon?: React.ReactNode
  footer?: React.ReactNode
  onClick?: () => void
  isActive?: boolean
  isDisabled?: boolean
  variant?: "default" | "elevated" | "floating" | "flat" | "gradient" | "3d" | "neuromorphic"
  animation?: "none" | "float" | "scale" | "rotate" | "bounce"
}

export function InteractiveCard({
  title,
  description,
  icon,
  footer,
  onClick,
  isActive = false,
  isDisabled = false,
  variant = "default",
  animation = "scale",
  className,
  children,
  ...props
}: InteractiveCardProps) {
  const isMobile = useIsMobile()

  return (
    <Card3d
      variant={isActive ? "gradient" : variant}
      interactive={!isDisabled}
      animation={animation}
      className={cn(
        "transition-all duration-300",
        isDisabled && "opacity-60 cursor-not-allowed",
        onClick && !isDisabled && "cursor-pointer",
        className,
      )}
      onClick={isDisabled ? undefined : onClick}
      {...props}
    >
      <Card3dHeader>
        <div className="flex items-center gap-3">
          {icon && (
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full",
                isActive ? "bg-white/20 text-white" : "bg-medical-100 text-medical-600",
              )}
            >
              {icon}
            </motion.div>
          )}
          <div>
            <Card3dTitle className={cn(isActive && "text-white")}>{title}</Card3dTitle>
            {description && (
              <Card3dDescription className={cn(isActive && "text-white/80")}>{description}</Card3dDescription>
            )}
          </div>
        </div>
      </Card3dHeader>

      {children && <Card3dContent className={cn(isActive && "text-white/90")}>{children}</Card3dContent>}

      {footer && <Card3dFooter className={cn(isActive && "text-white/80")}>{footer}</Card3dFooter>}
    </Card3d>
  )
}
