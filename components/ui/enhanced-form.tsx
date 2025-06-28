"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button3d } from "./3d-button"
import { useIsMobile } from "@/hooks/use-mobile"

interface EnhancedFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent) => void
  isLoading?: boolean
  submitText?: string
  cancelText?: string
  onCancel?: () => void
  layout?: "vertical" | "horizontal"
  gap?: "sm" | "md" | "lg"
  isValid?: boolean
  validationMessage?: string
}

export function EnhancedForm({
  children,
  className,
  onSubmit,
  isLoading = false,
  submitText = "提交",
  cancelText = "取消",
  onCancel,
  layout = "vertical",
  gap = "md",
  isValid = true,
  validationMessage = "",
  ...props
}: EnhancedFormProps) {
  const isMobile = useIsMobile()
  const finalLayout = isMobile ? "vertical" : layout

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(e)
  }

  return (
    <form
      className={cn(
        "w-full",
        gap === "sm" && "space-y-3",
        gap === "md" && "space-y-4",
        gap === "lg" && "space-y-6",
        className,
      )}
      onSubmit={handleSubmit}
      {...props}
    >
      <div
        className={cn("w-full", gap === "sm" && "space-y-3", gap === "md" && "space-y-4", gap === "lg" && "space-y-6")}
      >
        {children}
      </div>

      {!isValid && validationMessage && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {validationMessage}
        </div>
      )}

      <div
        className={cn(
          "flex mt-6",
          finalLayout === "vertical" ? "flex-col space-y-2" : "flex-row space-x-2",
          onCancel ? "justify-between" : "justify-end",
        )}
      >
        {onCancel && (
          <Button3d
            type="button"
            variant="outline"
            onClick={onCancel}
            className={cn(finalLayout === "vertical" && "w-full")}
          >
            {cancelText}
          </Button3d>
        )}
        <Button3d
          type="submit"
          isLoading={isLoading}
          className={cn(finalLayout === "vertical" && "w-full")}
          animation="scale"
          disabled={!isValid && !!validationMessage}
        >
          {submitText}
        </Button3d>
      </div>
    </form>
  )
}

interface FormFieldProps {
  children: React.ReactNode
  label: string
  htmlFor: string
  description?: string
  error?: string
  required?: boolean
  className?: string
}

export function FormField({
  children,
  label,
  htmlFor,
  description,
  error,
  required = false,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-baseline">
        <label
          htmlFor={htmlFor}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            error ? "text-error-500" : "text-medical-700",
          )}
        >
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
        {error && <p className="text-xs font-medium text-error-500">{error}</p>}
      </div>
      {description && <p className="text-xs text-medical-500">{description}</p>}
      {children}
    </div>
  )
}

interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  error?: boolean
}

export const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ className, icon, error, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-medical-500">{icon}</div>}
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            icon && "pl-10",
            error && "border-error-300 focus-visible:ring-error-400",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
EnhancedInput.displayName = "EnhancedInput"
