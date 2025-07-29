"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { Skeleton } from "@/components/ui/skeleton"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requiredRole?: string
  fallback?: React.ReactNode
}

export function AuthGuard({ children, requireAuth = true, requiredRole, fallback }: AuthGuardProps) {
  const { isAuthenticated, user, token, setLoading } = useAuthStore()
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true)

      // 检查本地存储的token
      const storedToken = localStorage.getItem("token")
      const storedUser = localStorage.getItem("user")

      if (storedToken && storedUser) {
        try {
          // 验证token是否有效
          const response = await fetch("/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })

          if (!response.ok) {
            // Token无效，清除存储
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            useAuthStore.getState().logout()
          }
        } catch (error) {
          console.error("Token verification failed:", error)
          useAuthStore.getState().logout()
        }
      }

      setIsChecking(false)
      setLoading(false)
    }

    checkAuth()
  }, [setLoading])

  useEffect(() => {
    if (!isChecking) {
      if (requireAuth && !isAuthenticated) {
        router.push("/login")
        return
      }

      if (requiredRole && user?.role !== requiredRole) {
        router.push("/unauthorized")
        return
      }
    }
  }, [isChecking, requireAuth, isAuthenticated, requiredRole, user, router])

  if (isChecking) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="space-y-4 w-full max-w-md">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      )
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null
  }

  return <>{children}</>
}
