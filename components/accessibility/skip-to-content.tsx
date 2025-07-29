"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function SkipToContent() {
  const [isVisible, setIsVisible] = useState(false)

  const handleSkip = () => {
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Button
      className={`
        fixed top-4 left-4 z-[9999] transform transition-transform duration-200
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        bg-medical-600 hover:bg-medical-700 text-white
        focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-medical-500
      `}
      onClick={handleSkip}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      aria-label="跳转到主要内容"
    >
      跳转到主要内容
    </Button>
  )
}
