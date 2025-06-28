"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { ChevronDown, ChevronRight, Keyboard } from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { isClient } from "@/utils/client-utils"
import { ShieldLogo } from "@/components/brand/shield-logo"

// 导入导航配置
import { navItems } from "@/config/navigation"

// 添加测试ID属性
interface SidebarProps {
  className?: string
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
  testId?: string
}

export function Sidebar({ className, isCollapsed, setIsCollapsed, testId = "sidebar" }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [openItems, setOpenItems] = useState<string[]>([])
  const isMobile = useIsMobile()
  const [isAnimating, setIsAnimating] = useState(false)

  // 自动展开当前活动的菜单项
  useEffect(() => {
    if (!isClient) return

    const activeParent = navItems.find((item) => item.children?.some((child) => pathname.startsWith(child.href)))
    if (activeParent && !openItems.includes(activeParent.title)) {
      setOpenItems((prev) => [...prev, activeParent.title])
    }
  }, [pathname, openItems])

  const toggleItem = (title: string) => {
    setOpenItems((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    )
  }

  const isItemOpen = (title: string) => openItems.includes(title)

  // 在移动设备上，默认折叠侧边栏
  useEffect(() => {
    if (!isClient) return

    if (isMobile) {
      setIsCollapsed(true)
    }
  }, [isMobile, setIsCollapsed])

  // 处理侧边栏折叠/展开的动画
  const handleToggleSidebar = () => {
    setIsAnimating(true)
    setIsCollapsed(!isCollapsed)
    // 动画结束后重置状态
    setTimeout(() => {
      setIsAnimating(false)
    }, 300) // 与CSS过渡时间相匹配
  }

  // 处理父菜单项点击
  const handleParentItemClick = (title: string) => {
    if (!isCollapsed) {
      toggleItem(title)
    }
  }

  // 添加键盘导航支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 当焦点在导航项上时，使用箭头键导航
      if (e.target instanceof HTMLElement && e.target.getAttribute("role") === "menuitem") {
        const currentItem = e.target

        if (e.key === "ArrowDown") {
          e.preventDefault()
          const nextItem = currentItem.nextElementSibling as HTMLElement
          if (nextItem) nextItem.focus()
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          const prevItem = currentItem.previousElementSibling as HTMLElement
          if (prevItem) prevItem.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <TooltipProvider delayDuration={300}>
      <div
        data-testid={testId}
        className={cn(
          "h-screen border-r border-medical-100 bg-white transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
          isMobile ? "hidden" : "flex flex-col",
          isAnimating ? "overflow-hidden" : "",
          className,
        )}
      >
        <div className="flex h-16 items-center border-b border-medical-100 px-4">
          <div className="flex items-center gap-2">
            {!isCollapsed ? (
              <Link href="/" data-testid="sidebar-logo-expanded">
                <ShieldLogo size="md" showText={true} />
              </Link>
            ) : (
              <Link href="/" data-testid="sidebar-logo-collapsed">
                <ShieldLogo size="sm" showText={false} />
              </Link>
            )}
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-2" aria-label="主导航">
          <ul className="space-y-1" role="menu">
            {navItems.map((item) => (
              <li
                key={item.title}
                data-testid={`nav-item-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                role="none"
              >
                {item.children ? (
                  <Collapsible open={!isCollapsed && isItemOpen(item.title)} className="w-full">
                    <div
                      onClick={() => handleParentItemClick(item.title)}
                      data-testid={`nav-parent-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all hover:bg-medical-50 cursor-pointer",
                        pathname.startsWith(item.children[0].href)
                          ? "bg-medical-gradient text-white shadow-medical"
                          : "text-medical-700 hover:text-medical-900",
                      )}
                      role="menuitem"
                      tabIndex={0}
                      aria-expanded={isItemOpen(item.title)}
                      aria-haspopup="true"
                    >
                      <div className="flex items-center gap-3">
                        {isCollapsed ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <item.icon className="h-5 w-5 mx-auto" />
                            </TooltipTrigger>
                            <TooltipContent side="right">{item.title}</TooltipContent>
                          </Tooltip>
                        ) : (
                          <>
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                          </>
                        )}
                      </div>
                      {!isCollapsed && (
                        <div>
                          {isItemOpen(item.title) ? (
                            <ChevronDown className="h-4 w-4" data-testid="nav-chevron-down" />
                          ) : (
                            <ChevronRight className="h-4 w-4" data-testid="nav-chevron-right" />
                          )}
                        </div>
                      )}
                    </div>
                    <CollapsibleContent className="pl-10 space-y-1 mt-1">
                      {!isCollapsed &&
                        item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            data-testid={`nav-child-${child.title.toLowerCase().replace(/\s+/g, "-")}`}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-medical-50",
                              pathname === child.href
                                ? "bg-medical-100 text-medical-800 font-medium"
                                : "text-medical-600 hover:text-medical-900",
                            )}
                          >
                            <child.icon className="h-4 w-4" />
                            <span>{child.title}</span>
                          </Link>
                        ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : isCollapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        data-testid={`nav-link-collapsed-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                        className={cn(
                          "flex items-center justify-center rounded-lg px-3 py-2 transition-all hover:bg-medical-50",
                          pathname === item.href
                            ? "bg-medical-gradient text-white shadow-medical"
                            : "text-medical-700 hover:text-medical-900",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  </Tooltip>
                ) : (
                  <Link
                    href={item.href}
                    data-testid={`nav-link-expanded-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-medical-50",
                      pathname === item.href
                        ? "bg-medical-gradient text-white shadow-medical"
                        : "text-medical-700 hover:text-medical-900",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-medical-100 p-2">
          <div className={cn("rounded-lg bg-medical-50 p-3", isCollapsed ? "text-center" : "flex items-center gap-3")}>
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full bg-medical-100",
                isCollapsed ? "mx-auto" : "",
              )}
              data-testid="sidebar-pro-badge"
            >
              <span className="text-xs font-medium text-medical-700">PRO</span>
            </div>
            {!isCollapsed && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-medical-800">升级专业版</p>
                <p className="text-xs text-medical-600">解锁全部高级功能</p>
              </div>
            )}
          </div>
        </div>
        {!isCollapsed && (
          <div className="border-t border-medical-100 p-2">
            <div className="flex items-center justify-between text-xs text-gray-500 px-3 py-2">
              <div className="flex items-center gap-1">
                <Keyboard className="h-3 w-3" />
                <span>快捷键:</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded">
                <span>Alt</span>
                <span>+</span>
                <span>S</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
