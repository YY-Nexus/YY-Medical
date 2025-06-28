"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronRight, Home } from "lucide-react"

interface Breadcrumb {
  label: string
  href: string
  isCurrent?: boolean
}

interface PageBreadcrumbProps {
  items?: Breadcrumb[]
  className?: string
}

export function PageBreadcrumb({ items, className }: PageBreadcrumbProps) {
  const pathname = usePathname()

  // 如果未提供项目，则根据路径自动生成
  const breadcrumbs: Breadcrumb[] = items || generateBreadcrumbs(pathname)

  return (
    <nav className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            <Home className="h-4 w-4" />
            <span className="sr-only">首页</span>
          </Link>
        </li>

        {breadcrumbs.map((breadcrumb, i) => (
          <li key={i} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            {breadcrumb.isCurrent ? (
              <span className="font-medium">{breadcrumb.label}</span>
            ) : (
              <Link href={breadcrumb.href} className="text-muted-foreground hover:text-foreground transition-colors">
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// 根据路径自动生成面包屑
function generateBreadcrumbs(pathname: string): Breadcrumb[] {
  const paths = pathname.split("/").filter(Boolean)

  // 路径映射到用户友好的名称
  const pathNameMap: Record<string, string> = {
    patients: "患者管理",
    records: "病历管理",
    followup: "随访计划",
    groups: "患者分组",
    "ai-diagnosis": "智能诊断",
    "ai-model": "AI模型管理",
    analytics: "数据分析",
    research: "医学研究",
    "clinical-decision": "临床决策",
    "ehr-integration": "EHR集成",
    teleconsultation: "远程会诊",
    security: "安全管理",
    admin: "系统管理",
    settings: "系统设置",
    "health-data": "健康数据",
    medications: "药物管理",
    "mobile-app": "移动应用",
    training: "模型训练",
    deployment: "模型部署",
    performance: "性能分析",
  }

  return paths.map((path, i) => {
    const href = `/${paths.slice(0, i + 1).join("/")}`
    const isCurrent = i === paths.length - 1
    const label = pathNameMap[path] || path.charAt(0).toUpperCase() + path.slice(1)

    return { label, href, isCurrent }
  })
}
