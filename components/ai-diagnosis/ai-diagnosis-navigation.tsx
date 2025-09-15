"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Brain, History, BarChart3, Settings } from "lucide-react"

const navigationItems = [
  {
    title: "AI诊断",
    href: "/ai-diagnosis",
    icon: Brain,
  },
  {
    title: "诊断记录",
    href: "/ai-diagnosis/records",
    icon: History,
  },
  {
    title: "统计分析",
    href: "/ai-diagnosis/analytics",
    icon: BarChart3,
  },
  {
    title: "模型设置",
    href: "/ai-diagnosis/settings",
    icon: Settings,
  },
]

export function AIDiagnosisNavigation() {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-8 py-4">
      {navigationItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-primary border-b-2 border-primary" : "text-muted-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}
