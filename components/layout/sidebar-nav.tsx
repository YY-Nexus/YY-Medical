"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { navItems } from "@/config/navigation"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ShieldLogo } from "@/components/brand/shield-logo"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MedicalButton } from "@/components/ui/medical-button"
import { ChevronRight, ChevronDown, Sparkles, X } from "lucide-react"

interface SidebarNavProps {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  className?: string
}

export function SidebarNav({ isCollapsed, setIsCollapsed, className }: SidebarNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [openGroups, setOpenGroups] = useState<string[]>([])

  // 根据当前路径自动展开对应的分组
  useEffect(() => {
    // 找到当前活动的路径所属的分组
    const activeGroup = navItems.find((item) =>
      item.children?.some((child) => pathname === child.href || pathname.startsWith(child.href + "/")),
    )

    if (activeGroup && !openGroups.includes(activeGroup.title)) {
      setOpenGroups((prev) => [...prev, activeGroup.title])
    }
  }, [pathname, openGroups])

  // 处理分组的展开/折叠
  const toggleGroup = (title: string) => {
    if (isCollapsed) {
      // 如果侧边栏处于折叠状态，先展开侧边栏
      setIsCollapsed(false)
      // 然后确保分组被展开
      if (!openGroups.includes(title)) {
        setOpenGroups((prev) => [...prev, title])
      }
    } else {
      // 正常切换分组状态
      setOpenGroups((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
    }
  }

  // 处理导航项点击
  const handleNavItemClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault() // 阻止默认行为
    router.push(href) // 使用路由器导航
  }

  // 检查分组是否展开
  const isGroupOpen = (title: string) => openGroups.includes(title)

  // 检查菜单项是否处于活动状态
  const isItemActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <TooltipProvider delayDuration={100}>
      <aside
        className={cn(
          "h-screen border-r bg-white dark:bg-gray-950 flex flex-col",
          isCollapsed ? "w-[70px]" : "w-[240px]",
          "transition-all duration-300 ease-in-out",
          className,
        )}
      >
        {/* 顶部Logo区域 */}
        <div className="h-16 border-b flex items-center px-4 justify-between">
          {!isCollapsed ? (
            <>
              <Link href="/" className="flex items-center">
                <ShieldLogo size="md" showText={true} />
              </Link>
              <MedicalButton variant="ghost" size="icon" onClick={() => setIsCollapsed(true)} aria-label="折叠侧边栏">
                <X className="h-4 w-4" />
              </MedicalButton>
            </>
          ) : (
            <Link href="/" className="flex w-full justify-center items-center">
              <ShieldLogo size="sm" showText={false} />
            </Link>
          )}
        </div>

        {/* 导航区域 */}
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.title}>
                {item.children ? (
                  <Collapsible open={!isCollapsed && isGroupOpen(item.title)} className="w-full">
                    <CollapsibleTrigger
                      onClick={() => toggleGroup(item.title)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-3 py-2",
                        "text-sm font-medium transition-colors hover:bg-muted",
                        isItemActive(item.children[0].href) && !isCollapsed
                          ? "bg-medical-50 text-medical-700"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {isCollapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-center w-full py-1">
                              <item.icon className="h-5 w-5" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="right">{item.title}</TooltipContent>
                        </Tooltip>
                      ) : (
                        <>
                          <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                          </div>
                          {isGroupOpen(item.title) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </>
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-8 space-y-1 pt-1">
                      {!isCollapsed &&
                        item.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            onClick={(e) => handleNavItemClick(child.href, e)}
                            className={cn(
                              "flex items-center gap-2 rounded-md px-3 py-1.5",
                              "text-sm transition-colors hover:bg-muted",
                              isItemActive(child.href)
                                ? "font-medium text-foreground bg-muted"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            <child.icon className="h-4 w-4" />
                            <span>{child.title}</span>
                          </a>
                        ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : isCollapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={item.href}
                        onClick={(e) => handleNavItemClick(item.href, e)}
                        className={cn(
                          "flex items-center justify-center rounded-md p-2",
                          "text-sm font-medium transition-colors hover:bg-muted",
                          isItemActive(item.href)
                            ? "bg-medical-50 text-medical-700"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  </Tooltip>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavItemClick(item.href, e)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2",
                      "text-sm font-medium transition-colors hover:bg-muted",
                      isItemActive(item.href)
                        ? "bg-medical-50 text-medical-700"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* 升级提示 */}
        <div className="border-t p-2">
          <div
            className={cn(
              "rounded-md bg-gradient-to-r from-medical-50 to-blue-50 dark:from-blue-950/50 dark:to-medical-950/50",
              "p-3 transition-all duration-300",
            )}
          >
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex justify-center">
                    <Sparkles className="h-5 w-5 text-medical-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="w-40">
                  <p className="font-medium">升级至专业版</p>
                  <p className="text-xs opacity-70">解锁全部高级功能</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-medical-500" />
                <div>
                  <p className="text-sm font-medium text-medical-700 dark:text-medical-300">升级至专业版</p>
                  <p className="text-xs text-medical-600 dark:text-medical-400">解锁全部高级功能</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 版本信息 */}
        {!isCollapsed && (
          <div className="p-2 text-center">
            <p className="text-xs text-muted-foreground">MediNexus³ v3.5.2</p>
          </div>
        )}
      </aside>
    </TooltipProvider>
  )
}
