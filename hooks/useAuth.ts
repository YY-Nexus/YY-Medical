"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/store/useAuthStore"

export function useAuth() {
  const { user, token, isAuthenticated, isLoading, error, login, logout, refreshToken, updateUser, clearError } =
    useAuthStore()

  // 检查用户是否有特定权限
  const hasPermission = (requiredRole: string) => {
    if (!user) return false

    // 如果用户是管理员，拥有所有权限
    if (user.role === "admin") return true

    // 检查用户角色是否匹配所需角色
    return user.role === requiredRole
  }

  // 在组件挂载时尝试刷新令牌
  useEffect(() => {
    if (token && !isAuthenticated) {
      refreshToken()
    }
  }, [token, isAuthenticated, refreshToken])

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    updateUser,
    clearError,
    hasPermission,
  }
}
