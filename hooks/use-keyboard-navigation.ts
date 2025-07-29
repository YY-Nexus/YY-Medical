"use client"

import { useEffect, useCallback } from "react"

interface KeyboardNavigationOptions {
  enableArrowKeys?: boolean
  enableTabTrapping?: boolean
  enableEscapeKey?: boolean
  onEscape?: () => void
}

export function useKeyboardNavigation(options: KeyboardNavigationOptions = {}) {
  const { enableArrowKeys = true, enableTabTrapping = false, enableEscapeKey = true, onEscape } = options

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Handle escape key
      if (enableEscapeKey && event.key === "Escape") {
        onEscape?.()
        return
      }

      // Handle arrow key navigation
      if (enableArrowKeys) {
        const focusableElements = document.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )

        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as Element)

        switch (event.key) {
          case "ArrowDown":
          case "ArrowRight":
            event.preventDefault()
            const nextIndex = (currentIndex + 1) % focusableElements.length
            ;(focusableElements[nextIndex] as HTMLElement)?.focus()
            break

          case "ArrowUp":
          case "ArrowLeft":
            event.preventDefault()
            const prevIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1
            ;(focusableElements[prevIndex] as HTMLElement)?.focus()
            break
        }
      }

      // Handle tab trapping
      if (enableTabTrapping && event.key === "Tab") {
        const focusableElements = document.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement?.focus()
          }
        }
      }
    },
    [enableArrowKeys, enableTabTrapping, enableEscapeKey, onEscape],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Announce page changes to screen readers
  const announcePageChange = useCallback((message: string) => {
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "polite")
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent = message

    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }, [])

  return {
    announcePageChange,
  }
}
