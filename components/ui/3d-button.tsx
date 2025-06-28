"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const button3dVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-3d-button-gradient text-white shadow-[0_6px_0_0_#0057a5] hover:shadow-[0_4px_0_0_#0057a5] hover:translate-y-[2px] active:shadow-[0_2px_0_0_#0057a5] active:translate-y-[4px]",
        destructive:
          "bg-3d-error-gradient text-white shadow-[0_6px_0_0_#b91c1c] hover:shadow-[0_4px_0_0_#b91c1c] hover:translate-y-[2px] active:shadow-[0_2px_0_0_#b91c1c] active:translate-y-[4px]",
        outline:
          "border-2 border-medical-200 bg-white text-medical-800 shadow-[0_6px_0_0_#bae0fd] hover:shadow-[0_4px_0_0_#bae0fd] hover:translate-y-[2px] active:shadow-[0_2px_0_0_#bae0fd] active:translate-y-[4px] hover:bg-medical-50",
        secondary:
          "bg-3d-accent-gradient text-white shadow-[0_6px_0_0_#1b635f] hover:shadow-[0_4px_0_0_#1b635f] hover:translate-y-[2px] active:shadow-[0_2px_0_0_#1b635f] active:translate-y-[4px]",
        ghost: "hover:bg-medical-100 hover:text-medical-900 text-medical-700",
        link: "text-medical-600 underline-offset-4 hover:underline",
        success:
          "bg-3d-success-gradient text-white shadow-[0_6px_0_0_#15803d] hover:shadow-[0_4px_0_0_#15803d] hover:translate-y-[2px] active:shadow-[0_2px_0_0_#15803d] active:translate-y-[4px]",
        warning:
          "bg-3d-warning-gradient text-white shadow-[0_6px_0_0_#bf3b04] hover:shadow-[0_4px_0_0_#bf3b04] hover:translate-y-[2px] active:shadow-[0_2px_0_0_#bf3b04] active:translate-y-[4px]",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-11 w-11",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-full",
        none: "rounded-none",
      },
      animation: {
        none: "",
        bounce: "active:animate-button-press hover:animate-none",
        scale: "hover:scale-105 active:scale-95 transition-transform",
        glow: "hover:shadow-[0_0_15px_rgba(12,138,237,0.5)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      animation: "bounce",
    },
  },
)

export interface Button3dProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button3dVariants> {
  asChild?: boolean
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const Button3d = React.forwardRef<HTMLButtonElement, Button3dProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      animation,
      asChild = false,
      isLoading = false,
      icon,
      iconPosition = "left",
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button"
    const [isPressed, setIsPressed] = React.useState(false)

    // 添加键盘支持
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        setIsPressed(true)
      }
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        setIsPressed(false)
      }
    }

    return (
      <Comp
        className={cn(button3dVariants({ variant, size, rounded, animation, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => isPressed && setIsPressed(false)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        aria-busy={isLoading}
        {...props}
      >
        <span className={cn("flex items-center justify-center", isPressed ? "transform translate-y-[1px]" : "")}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>{children}</span>
              <span className="sr-only">加载中</span>
            </>
          ) : (
            <>
              {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
              <span>{children}</span>
              {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
            </>
          )}
        </span>

        {/* 添加按钮点击波纹效果 */}
        <span className="absolute inset-0 rounded-lg overflow-hidden">
          <span className="ripple-effect" />
        </span>
      </Comp>
    )
  },
)
Button3d.displayName = "Button3d"

export { Button3d, button3dVariants }
