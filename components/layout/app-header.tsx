"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { UserAvatarMenu } from "@/components/user-avatar-menu"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"

export function AppHeader() {
  const [showSearch, setShowSearch] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  // 模拟用户数据，实际应用中应从用户认证状态获取
  const user = {
    name: "张医生",
    email: "zhang.doctor@medinexus.com",
    role: "主治医师",
    avatar: "/doctor-avatar.png",
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLogout = () => {
    console.log("用户登出")
    // 实际应用中应调用登出API并清除用户会话
  }

  // 添加搜索快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K 或 Command+K 打开搜索
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setShowSearch(true)
      }

      // Escape 关闭搜索
      if (e.key === "Escape" && showSearch) {
        setShowSearch(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showSearch])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2 md:gap-4">
          <MobileNav />
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <span className="hidden font-bold sm:inline-block">YanYu MediNexus³-Admin</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {showSearch ? (
            <div className="relative flex items-center">
              <Input
                type="search"
                placeholder="搜索..."
                className="w-full md:w-[300px] pr-8"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    e.preventDefault()
                    setShowSearch(false)
                  }
                }}
              />
              <div className="absolute right-2 flex items-center gap-1">
                <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  ESC
                </kbd>
                <X className="h-4 w-4 cursor-pointer text-muted-foreground" onClick={() => setShowSearch(false)} />
              </div>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)} className="text-muted-foreground">
              <Search className="h-5 w-5" />
              <span className="sr-only">搜索</span>
              <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-2">
                Ctrl K
              </kbd>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="relative text-muted-foreground">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
              >
                {notifications}
              </Badge>
            )}
            <span className="sr-only">通知</span>
          </Button>

          <UserAvatarMenu
            user={user}
            onLogout={handleLogout}
            onThemeToggle={toggleTheme}
            isDarkMode={theme === "dark"}
          />
        </div>
      </div>
    </header>
  )
}
