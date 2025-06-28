"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRoles?: string[]
  redirectTo?: string
}

export function AuthGuard({ children, requiredRoles = [], redirectTo = "/login" }: AuthGuardProps) {
  const { isAuthenticated, isLoading, user, hasPermission } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 如果不在加载中且未认证，重定向到登录页
    if (!isLoading && !isAuthenticated) {
      router.push(`${redirectTo}?returnUrl=${encodeURIComponent(pathname)}`)
      return
    }

    // 如果已认证但没有所需角色权限，重定向到首页或其他页面
    if (!isLoading && isAuthenticated && requiredRoles.length > 0) {
      const hasRequiredRole = requiredRoles.some((role) => hasPermission(role))
      if (!hasRequiredRole) {
        router.push("/unauthorized")
      }
    }
  }, [isLoading, isAuthenticated, user, hasPermission, requiredRoles, router, pathname, redirectTo])

  // 加载中显示加载状态
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // 未认证或无权限时不渲染子组件
  if (!isAuthenticated || (requiredRoles.length > 0 && !requiredRoles.some((role) => hasPermission(role)))) {
    return null
  }

  // 已认证且有权限，渲染子组件
  return <>{children}</>
}
