import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva("rounded-xl transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-white border border-medical-100 shadow-medical hover:shadow-medical-md",
      elevated: "bg-white border border-medical-100 shadow-medical-3d hover:shadow-medical-lg hover:-translate-y-1",
      flat: "bg-medical-50 border border-medical-100",
      gradient: "bg-medical-gradient text-white border border-medical-400",
    },
    size: {
      default: "p-6",
      sm: "p-4",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface MedicalCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const MedicalCard = React.forwardRef<HTMLDivElement, MedicalCardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, size, className }))} {...props} />
  ),
)
MedicalCard.displayName = "MedicalCard"

const MedicalCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col space-y-1.5", className)} {...props} />,
)
MedicalCardHeader.displayName = "MedicalCardHeader"

const MedicalCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-xl font-semibold text-medical-800 leading-none tracking-tight", className)}
      {...props}
    />
  ),
)
MedicalCardTitle.displayName = "MedicalCardTitle"

const MedicalCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm text-medical-600", className)} {...props} />,
)
MedicalCardDescription.displayName = "MedicalCardDescription"

const MedicalCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("pt-4", className)} {...props} />,
)
MedicalCardContent.displayName = "MedicalCardContent"

const MedicalCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center pt-4", className)} {...props} />,
)
MedicalCardFooter.displayName = "MedicalCardFooter"

export {
  MedicalCard,
  MedicalCardHeader,
  MedicalCardFooter,
  MedicalCardTitle,
  MedicalCardDescription,
  MedicalCardContent,
}
