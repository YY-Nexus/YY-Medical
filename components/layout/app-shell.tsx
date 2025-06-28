"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/layout/app-header"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { KeyboardShortcutsDialog } from "@/components/layout/keyboard-shortcuts-dialog"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isKeyboardShortcutsOpen, setIsKeyboardShortcutsOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useIsMobile()

  // 监听键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+S 切换侧边栏
      if (e.altKey && e.key === "s") {
        e.preventDefault()
        setIsSidebarCollapsed((prev) => !prev)
      }

      // Alt+K 打开键盘快捷键对话框
      if (e.altKey && e.key === "k") {
        e.preventDefault()
        setIsKeyboardShortcutsOpen(true)
      }

      // Ctrl+/ 打开键盘快捷键对话框
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault()
        setIsKeyboardShortcutsOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // 移动设备上强制折叠侧边栏
  useEffect(() => {
    if (isMobile) {
      setIsSidebarCollapsed(true)
    }
  }, [isMobile])

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* 侧边栏 */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          className={cn(
            "transition-all duration-300",
            isMobile && !isSidebarCollapsed ? "absolute z-50 shadow-xl" : "",
          )}
        />

        {/* 主内容区 */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* 顶部导航栏 */}
          <AppHeader onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)} />

          {/* 内容区域 */}
          <main
            className={cn(
              "flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6",
              "transition-all duration-300 ease-in-out",
              "bg-gray-50 dark:bg-gray-900",
            )}
            id="main-content"
          >
            {children}
          </main>
        </div>
      </div>

      {/* 键盘快捷键对话框 */}
      <KeyboardShortcutsDialog open={isKeyboardShortcutsOpen} onOpenChange={setIsKeyboardShortcutsOpen} />
    </>
  )
}
