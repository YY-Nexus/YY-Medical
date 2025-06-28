"use client"

import { useTranslation } from "./use-translation"
import { useAutoTranslation } from "@/contexts/auto-translation-context"
import { useState } from "react"
import type { SupportedLanguage } from "@/services/translation-service"

/**
 * 增强的翻译钩子，支持自动翻译缺失的内容
 */
export function useEnhancedTranslation() {
  const { t, locale, ...rest } = useTranslation()
  const { translate, isEnabled } = useAutoTranslation()
  const [translationLoading, setTranslationLoading] = useState<Record<string, boolean>>({})

  // 增强的翻译函数
  const enhancedT = async (key: string, fallback?: string): Promise<string> => {
    // 先尝试使用现有翻译系统
    const translation = t(key)

    // 如果翻译存在且不等于键名，返回翻译
    if (translation !== key) {
      return translation
    }

    // 如果提供了回退文本，使用回退文本
    if (fallback) {
      // 标记为正在翻译
      setTranslationLoading((prev) => ({ ...prev, [key]: true }))

      try {
        // 异步翻译回退文本
        const translatedFallback = await translate(fallback, locale as SupportedLanguage)
        return translatedFallback
      } catch (error) {
        console.error(`翻译键 "${key}" 的回退文本失败:`, error)
        return fallback
      } finally {
        // 标记为翻译完成
        setTranslationLoading((prev) => ({ ...prev, [key]: false }))
      }
    }

    // 没有翻译也没有回退文本，返回键名
    return key
  }

  // 同步版本的翻译函数（用于不支持异步的场景）
  const tSync = (key: string, fallback?: string): string => {
    const translation = t(key)
    if (translation !== key) {
      return translation
    }
    return fallback || key
  }

  return {
    t: enhancedT,
    tSync,
    locale,
    isTranslating: Object.values(translationLoading).some(Boolean),
    isAutoTranslateEnabled: isEnabled,
    ...rest,
  }
}
