import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

interface Notification {
  id: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  read: boolean
  createdAt: string
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  isLoading: boolean

  // 操作
  fetchNotifications: () => Promise<void>
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationState>()(
  immer((set, get) => ({
    notifications: [],
    unreadCount: 0,
    isLoading: false,

    fetchNotifications: async () => {
      set((state) => {
        state.isLoading = true
      })

      try {
        // 实际项目中替换为真实API调用
        const response = await fetch("/api/notifications")

        if (!response.ok) {
          throw new Error("获取通知失败")
        }

        const data = await response.json()

        set((state) => {
          state.notifications = data
          state.unreadCount = data.filter((n: Notification) => !n.read).length
          state.isLoading = false
        })
      } catch (error) {
        set((state) => {
          state.isLoading = false
        })
        console.error("获取通知时发生错误:", error)
      }
    },

    addNotification: (notification) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        read: false,
        createdAt: new Date().toISOString(),
      }

      set((state) => {
        state.notifications.unshift(newNotification)
        state.unreadCount += 1
      })
    },

    markAsRead: (id) => {
      set((state) => {
        const notification = state.notifications.find((n) => n.id === id)
        if (notification && !notification.read) {
          notification.read = true
          state.unreadCount -= 1
        }
      })
    },

    markAllAsRead: () => {
      set((state) => {
        state.notifications.forEach((n) => {
          n.read = true
        })
        state.unreadCount = 0
      })
    },

    deleteNotification: (id) => {
      set((state) => {
        const notification = state.notifications.find((n) => n.id === id)
        if (notification && !notification.read) {
          state.unreadCount -= 1
        }
        state.notifications = state.notifications.filter((n) => n.id !== id)
      })
    },

    clearAll: () => {
      set((state) => {
        state.notifications = []
        state.unreadCount = 0
      })
    },
  })),
)
