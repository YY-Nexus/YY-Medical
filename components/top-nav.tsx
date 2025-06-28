"use client"

import { MainNav } from "@/components/main-nav"
import { LanguageSwitcher } from "@/components/language-switcher"
import { EnhancedLanguageSwitcher } from "@/components/enhanced-language-switcher"

interface TopNavProps {
  onToggleSidebar: () => void
}

export function TopNav({ onToggleSidebar }: TopNavProps) {
  return (
    <div className="border-b bg-white dark:bg-gray-950">
      <div className="flex h-16 items-center justify-between px-4">
        <MainNav onToggleSidebar={onToggleSidebar} />
        <div className="flex items-center gap-2">
          <EnhancedLanguageSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )
}
