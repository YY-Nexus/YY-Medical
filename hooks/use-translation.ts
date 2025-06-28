"use client"

import { useLanguage } from "@/contexts/language-context"
import { useAutoTranslation } from "@/contexts/auto-translation-context"
import { useState, useCallback } from "react"

export function useTranslation() {
  const { t: tBase, locale, setLocale, availableLocales, localeName } = useLanguage()
  const { translate, isEnabled: autoTranslateEnabled, setIsEnabled: setAutoTranslateEnabled } = useAutoTranslation()
  const [isTranslating, setIsTranslating] = useState(false)

  // 同步翻译函数 - 使用预定义翻译
  const tSync = useCallback(
    (key: string, fallback?: string): string => {
      return tBase(key, fallback)
    },
    [tBase],
  )

  // 异步翻译函数 - 支持自动翻译
  const t = useCallback(
    async (key: string, fallback?: string): Promise<string> => {
      // 首先尝试使用预定义翻译
      const baseTranslation = tBase(key, null)

      // 如果找到预定义翻译，直接返回
      if (baseTranslation !== null && baseTranslation !== key) {
        return baseTranslation
      }

      // 如果没有预定义翻译且启用了自动翻译，尝试自动翻译
      if (autoTranslateEnabled && fallback) {
        setIsTranslating(true)
        try {
          const result = await translate(fallback, locale)
          return result
        } catch (error) {
          console.error("Translation error:", error)
          return fallback || key
        } finally {
          setIsTranslating(false)
        }
      }

      // 如果没有启用自动翻译或没有回退值，返回回退值或键名
      return fallback || key
    },
    [tBase, translate, locale, autoTranslateEnabled],
  )

  // 格式化日期的辅助函数
  const formatDate = useCallback(
    (date: Date | string | number): string => {
      const d = new Date(date)

      if (locale === "zh-CN" || locale === "ja-JP") {
        return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
      } else if (locale === "ko-KR") {
        return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
      } else {
        // 英文和其他语言
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
      }
    },
    [locale],
  )

  return {
    t,
    tSync,
    locale,
    setLocale,
    availableLocales,
    localeName,
    formatDate,
    isTranslating,
    autoTranslateEnabled,
    setAutoTranslateEnabled,
  }
}
