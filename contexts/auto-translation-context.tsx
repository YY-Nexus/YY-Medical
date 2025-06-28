"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { translateText } from "@/services/translation-service"

type TranslationCache = Record<string, Record<string, string>>

interface AutoTranslationContextType {
  isEnabled: boolean
  setIsEnabled: (enabled: boolean) => void
  translate: (text: string, targetLang: string) => Promise<string>
  clearCache: () => void
  cache: TranslationCache
}

const AutoTranslationContext = createContext<AutoTranslationContextType | null>(null)

export function AutoTranslationProvider({ children }: { children: ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(false)
  const [cache, setCache] = useState<TranslationCache>({})

  // 从本地存储加载设置和缓存
  useEffect(() => {
    try {
      // 加载自动翻译设置
      const savedIsEnabled = localStorage.getItem("autoTranslateEnabled")
      if (savedIsEnabled !== null) {
        setIsEnabled(savedIsEnabled === "true")
      }

      // 加载翻译缓存
      const savedCache = localStorage.getItem("translationCache")
      if (savedCache) {
        setCache(JSON.parse(savedCache))
      }
    } catch (error) {
      console.error("Error loading translation settings:", error)
    }
  }, [])

  // 保存设置到本地存储
  useEffect(() => {
    localStorage.setItem("autoTranslateEnabled", String(isEnabled))
  }, [isEnabled])

  // 保存缓存到本地存储
  useEffect(() => {
    try {
      localStorage.setItem("translationCache", JSON.stringify(cache))
    } catch (error) {
      console.error("Error saving translation cache:", error)
    }
  }, [cache])

  // 翻译函数
  const translate = useCallback(
    async (text: string, targetLang: string): Promise<string> => {
      // 如果自动翻译被禁用，返回原文
      if (!isEnabled) {
        return text
      }

      // 检查缓存
      if (cache[text]?.[targetLang]) {
        return cache[text][targetLang]
      }

      try {
        // 调用翻译服务
        const translated = await translateText(text, targetLang)

        // 更新缓存
        setCache((prev) => ({
          ...prev,
          [text]: {
            ...(prev[text] || {}),
            [targetLang]: translated,
          },
        }))

        return translated
      } catch (error) {
        console.error("Translation error:", error)
        return text
      }
    },
    [isEnabled, cache],
  )

  // 清除缓存
  const clearCache = useCallback(() => {
    setCache({})
    localStorage.removeItem("translationCache")
  }, [])

  const value = {
    isEnabled,
    setIsEnabled,
    translate,
    clearCache,
    cache,
  }

  return <AutoTranslationContext.Provider value={value}>{children}</AutoTranslationContext.Provider>
}

export function useAutoTranslation() {
  const context = useContext(AutoTranslationContext)
  if (!context) {
    throw new Error("useAutoTranslation must be used within an AutoTranslationProvider")
  }
  return context
}
