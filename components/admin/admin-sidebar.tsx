"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Users,
  Settings,
  Shield,
  Database,
  BarChart3,
  FileText,
  AlertTriangle,
  Server,
  Layers,
  UserCog,
  BadgeCheck,
  Key,
  Globe,
  Cpu,
  MessageSquare,
  Bell,
  HardDrive,
  Clock,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShieldLogo } from "@/components/brand/shield-logo"

const adminNavItems = [
  {
    title: "概览",
    href: "/admin",
    icon: BarChart3,
  },
  {
    title: "用户管理",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "角色与权限",
    href: "/admin/roles",
    icon: Shield,
  },
  {
    title: "资质审核",
    href: "/admin/certifications",
    icon: BadgeCheck,
  },
  {
    title: "API配置",
    href: "/admin/api-config",
    icon: Key,
  },
  {
    title: "数据管理",
    href: "/admin/data",
    icon: Database,
  },
  {
    title: "系统日志",
    href: "/admin/logs",
    icon: FileText,
  },
  {
    title: "告警中心",
    href: "/admin/alerts",
    icon: AlertTriangle,
  },
  {
    title: "系统设置",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    title: "服务器监控",
    href: "/admin/servers",
    icon: Server,
  },
  {
    title: "备份与恢复",
    href: "/admin/backup",
    icon: HardDrive,
  },
  {
    title: "计划任务",
    href: "/admin/tasks",
    icon: Clock,
  },
  {
    title: "集成管理",
    href: "/admin/integrations",
    icon: Layers,
  },
  {
    title: "管理员设置",
    href: "/admin/admins",
    icon: UserCog,
  },
  {
    title: "AI模型管理",
    href: "/admin/ai-models",
    icon: Cpu,
  },
  {
    title: "国际化设置",
    href: "/admin/localization",
    icon: Globe,
  },
  {
    title: "消息模板",
    href: "/admin/message-templates",
    icon: MessageSquare,
  },
  {
    title: "通知设置",
    href: "/admin/notifications",
    icon: Bell,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-white lg:block w-64">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <ShieldLogo size="sm" showText={false} />
          <span className="font-bold text-lg">管理平台</span>
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)] py-2">
        <nav className="grid gap-1 px-2">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-100",
                pathname === item.href ? "bg-gray-100" : "text-gray-500 hover:text-gray-900",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
