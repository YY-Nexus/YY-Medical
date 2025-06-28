"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

const responsiveCardVariants = cva("rounded-xl transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-white border border-medical-100 shadow-medical hover:shadow-medical-md",
      elevated: "bg-white border border-medical-100 shadow-medical-3d hover:shadow-medical-lg hover:-translate-y-1",
      flat: "bg-medical-50 border border-medical-100",
      gradient: "bg-medical-gradient text-white border border-medical-400",
    },
    size: {
      default: "p-6 md:p-6",
      sm: "p-3 md:p-4",
      lg: "p-4 md:p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ResponsiveMedicalCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof responsiveCardVariants> {}

const ResponsiveMedicalCard = React.forwardRef<HTMLDivElement, ResponsiveMedicalCardProps>(
  ({ className, variant, size, ...props }, ref) => {
    const isMobile = useIsMobile()

    return (
      <div
        ref={ref}
        className={cn(responsiveCardVariants({ variant, size, className }), isMobile ? "w-full" : "")}
        {...props}
      />
    )
  },
)
ResponsiveMedicalCard.displayName = "ResponsiveMedicalCard"

const ResponsiveMedicalCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col space-y-1.5", className)} {...props} />,
)
ResponsiveMedicalCardHeader.displayName = "ResponsiveMedicalCardHeader"

const ResponsiveMedicalCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
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
ResponsiveMedicalCardTitle.displayName = "ResponsiveMedicalCardTitle"

const ResponsiveMedicalCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm text-medical-600", className)} {...props} />)
ResponsiveMedicalCardDescription.displayName = "ResponsiveMedicalCardDescription"

const ResponsiveMedicalCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("pt-4", className)} {...props} />,
)
ResponsiveMedicalCardContent.displayName = "ResponsiveMedicalCardContent"

const ResponsiveMedicalCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center pt-4", className)} {...props} />,
)
ResponsiveMedicalCardFooter.displayName = "ResponsiveMedicalCardFooter"

export {
  ResponsiveMedicalCard,
  ResponsiveMedicalCardHeader,
  ResponsiveMedicalCardFooter,
  ResponsiveMedicalCardTitle,
  ResponsiveMedicalCardDescription,
  ResponsiveMedicalCardContent,
}
