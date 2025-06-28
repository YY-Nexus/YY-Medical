import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  name: string
  role: string
  department?: string
  avatar?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<boolean>
  updateUser: (userData: Partial<User>) => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })

        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          })

          const data = await response.json()

          if (!response.ok) {
            throw new Error(data.message || "登录失败")
          }

          // 设置认证状态
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          })

          // 设置 cookie (在实际应用中，这通常由服务器设置)
          document.cookie = `auth-token=${data.token}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict`
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "登录过程中发生错误",
          })
          throw error
        }
      },

      logout: () => {
        // 清除认证状态
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })

        // 清除 cookie
        document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      },

      refreshToken: async () => {
        const { token } = get()

        if (!token) {
          return false
        }

        try {
          const response = await fetch("/api/auth/refresh", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          const data = await response.json()

          if (!response.ok) {
            throw new Error(data.message || "刷新令牌失败")
          }

          // 更新令牌
          set({
            token: data.token,
            isAuthenticated: true,
          })

          // 更新 cookie
          document.cookie = `auth-token=${data.token}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict`

          return true
        } catch (error) {
          console.error("刷新令牌错误:", error)
          return false
        }
      },

      updateUser: (userData) => {
        const { user } = get()

        if (!user) {
          return
        }

        set({
          user: { ...user, ...userData },
        })
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
