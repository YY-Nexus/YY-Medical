"use client"

import { Fragment } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { navItems } from "@/config/navigation"

interface BreadcrumbProps {
  className?: string
}

export function Breadcrumb({ className }: BreadcrumbProps) {
  const pathname = usePathname()

  // 如果是首页，不显示面包屑
  if (pathname === "/") {
    return null
  }

  // 解析路径，生成面包屑项
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean)
    const breadcrumbs = [{ href: "/", label: "首页", icon: Home }]

    let currentPath = ""

    for (let i = 0; i < paths.length; i++) {
      currentPath += `/${paths[i]}`

      // 查找匹配的导航项
      let label = paths[i]
      let found = false

      // 检查是否是一级导航
      for (const item of navItems) {
        if (item.href === currentPath) {
          label = item.title
          found = true
          break
        }

        // 检查是否是二级导航
        if (item.children) {
          for (const child of item.children) {
            if (child.href === currentPath) {
              label = child.title

              // 如果是第一个路径段，添加父级
              if (i === 0 && !breadcrumbs.some((b) => b.label === item.title)) {
                breadcrumbs.push({
                  href: child.href,
                  label: item.title,
                })
              }

              found = true
              break
            }
          }
          if (found) break
        }
      }

      // 如果没有找到匹配项，使用格式化的路径段
      if (!found) {
        label = label.charAt(0).toUpperCase() + label.slice(1).replace(/-/g, " ")
      }

      breadcrumbs.push({
        href: currentPath,
        label,
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <nav aria-label="面包屑" className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((breadcrumb, index) => (
          <Fragment key={breadcrumb.href}>
            {index > 0 && <ChevronRight className="h-4 w-4 text-medical-400" />}
            <li>
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-medical-800">
                  {breadcrumb.icon && <breadcrumb.icon className="inline-block h-4 w-4 mr-1" />}
                  {breadcrumb.label}
                </span>
              ) : (
                <Link href={breadcrumb.href} className="text-medical-600 hover:text-medical-800 hover:underline">
                  {breadcrumb.icon && <breadcrumb.icon className="inline-block h-4 w-4 mr-1" />}
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
