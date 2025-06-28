"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

const card3dVariants = cva("rounded-xl transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-white border border-medical-100 shadow-medical hover:shadow-medical-md",
      elevated:
        "bg-white border border-medical-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.16)] hover:-translate-y-2 transition-all duration-300",
      floating:
        "bg-white border border-medical-100 shadow-[0_8px_16px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.16)] hover:-translate-y-3 transition-all duration-500",
      flat: "bg-medical-50 border border-medical-100",
      gradient: "bg-medical-gradient text-white border border-medical-400",
      "3d": "bg-white border border-medical-100 shadow-[0_8px_0_0_#bae0fd] hover:shadow-[0_12px_0_0_#bae0fd] hover:-translate-y-2 transition-all duration-300",
      neuromorphic:
        "bg-medical-50 shadow-3d-neuromorphic border-none hover:shadow-none hover:bg-medical-100 transition-all duration-300",
    },
    size: {
      default: "p-6 md:p-6",
      sm: "p-3 md:p-4",
      lg: "p-4 md:p-8",
    },
    interactive: {
      true: "cursor-pointer transition-all duration-300",
      false: "",
    },
    animation: {
      none: "",
      float: "hover:animate-float",
      scale: "hover:scale-[1.02] active:scale-[0.98] transition-transform",
      rotate: "hover:rotate-1 transition-transform",
      bounce: "hover:animate-bounce-in",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    interactive: false,
    animation: "none",
  },
})

export interface Card3dProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof card3dVariants> {
  as?: React.ElementType
}

const Card3d = React.forwardRef<HTMLDivElement, Card3dProps>(
  ({ className, variant, size, interactive, animation, as: Component = "div", ...props }, ref) => {
    const isMobile = useIsMobile()
    const [isHovered, setIsHovered] = React.useState(false)
    const [rotation, setRotation] = React.useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || isMobile) return

      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      setRotation({ x: rotateX, y: rotateY })
    }

    const handleMouseEnter = () => {
      if (!interactive || isMobile) return
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      if (!interactive || isMobile) return
      setIsHovered(false)
      setRotation({ x: 0, y: 0 })
    }

    const style =
      interactive && !isMobile && isHovered
        ? {
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`,
            transition: "all 0.3s ease",
          }
        : {}

    return (
      <Component
        ref={ref}
        className={cn(card3dVariants({ variant, size, interactive, animation, className }), isMobile ? "w-full" : "")}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={style}
        {...props}
      />
    )
  },
)
Card3d.displayName = "Card3d"

const Card3dHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col space-y-1.5", className)} {...props} />,
)
Card3dHeader.displayName = "Card3dHeader"

const Card3dTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const isMobile = useIsMobile()

    return (
      <h3
        ref={ref}
        className={cn(
          "font-semibold text-medical-800 leading-none tracking-tight",
          isMobile ? "text-lg" : "text-xl",
          className,
        )}
        {...props}
      />
    )
  },
)
Card3dTitle.displayName = "Card3dTitle"

const Card3dDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm text-medical-600", className)} {...props} />,
)
Card3dDescription.displayName = "Card3dDescription"

const Card3dContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("pt-4", className)} {...props} />,
)
Card3dContent.displayName = "Card3dContent"

const Card3dFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center pt-4", className)} {...props} />,
)
Card3dFooter.displayName = "Card3dFooter"

export { Card3d, Card3dHeader, Card3dFooter, Card3dTitle, Card3dDescription, Card3dContent }
