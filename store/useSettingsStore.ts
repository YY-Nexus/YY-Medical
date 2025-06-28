import { create } from "zustand"
import { persist } from "zustand/middleware"

// 主题类型
export type Theme = "light" | "dark" | "system"

// 语言类型
export type Language = "zh-CN" | "en-US"

// 设置状态接口
interface SettingsState {
  theme: Theme
  language: Language
  fontSize: number
  highContrast: boolean
  animations: boolean
  notifications: boolean
  autoSave: boolean
  compactView: boolean

  // 操作
  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
  setFontSize: (size: number) => void
  toggleHighContrast: () => void
  toggleAnimations: () => void
  toggleNotifications: () => void
  toggleAutoSave: () => void
  toggleCompactView: () => void
  resetSettings: () => void
}

// 默认设置
const defaultSettings = {
  theme: "system" as Theme,
  language: "zh-CN" as Language,
  fontSize: 16,
  highContrast: false,
  animations: true,
  notifications: true,
  autoSave: true,
  compactView: false,
}

// 创建设置存储
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setTheme: (theme) => set({ theme }),

      setLanguage: (language) => set({ language }),

      setFontSize: (fontSize) => set({ fontSize }),

      toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),

      toggleAnimations: () => set((state) => ({ animations: !state.animations })),

      toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),

      toggleAutoSave: () => set((state) => ({ autoSave: !state.autoSave })),

      toggleCompactView: () => set((state) => ({ compactView: !state.compactView })),

      resetSettings: () => set(defaultSettings),
    }),
    {
      name: "medinexus-settings",
    },
  ),
)
