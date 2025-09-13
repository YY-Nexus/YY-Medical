"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Users, FileText, Calendar, UserCheck } from "lucide-react"

const navigationItems = [
  {
    title: "患者列表",
    href: "/patients",
    icon: Users,
  },
  {
    title: "病历记录",
    href: "/patients/records",
    icon: FileText,
  },
  {
    title: "随访管理",
    href: "/patients/followup",
    icon: Calendar,
  },
  {
    title: "患者分组",
    href: "/patients/groups",
    icon: UserCheck,
  },
]

export function PatientNavigation() {
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
