"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAutoTranslation } from "@/contexts/auto-translation-context"
import { useLanguage } from "@/contexts/language-context"
import type { SupportedLanguage } from "@/services/translation-service"

interface AutoTranslatedTextProps {
  text: string
  fallback?: string
  className?: string
  showOriginal?: boolean
}

export function AutoTranslatedText({ text, fallback, className = "", showOriginal = false }: AutoTranslatedTextProps) {
  const { locale } = useLanguage()
  const { translateMissing, translationCache, isTranslating } = useAutoTranslation()
  const [translated, setTranslated] = useState<string>(
    translationCache[locale as SupportedLanguage]?.[text] || fallback || text,
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // 如果已经有缓存的翻译，直接使用
    if (translationCache[locale as SupportedLanguage]?.[text]) {
      setTranslated(translationCache[locale as SupportedLanguage][text])
      return
    }

    // 否则，异步翻译
    setLoading(true)
    translateMissing(text, locale as SupportedLanguage)
      .then((result) => {
        setTranslated(result)
      })
      .catch((error) => {
        console.error("翻译失败:", error)
        setTranslated(fallback || text)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [text, locale, fallback, translateMissing, translationCache])

  return (
    <span className={`${className} ${loading ? "opacity-70" : ""}`}>
      {translated}
      {showOriginal && translated !== text && <span className="text-xs text-gray-500 ml-1">({text})</span>}
    </span>
  )
}

// 批量翻译组件
interface AutoTranslatedListProps {
  texts: string[]
  render: (translatedTexts: Record<string, string>, loading: boolean) => React.ReactNode
}

export function AutoTranslatedList({ texts, render }: AutoTranslatedListProps) {
  const { locale } = useLanguage()
  const { batchTranslateMissing, translationCache } = useAutoTranslation()
  const [translations, setTranslations] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // 检查是否所有文本都已经在缓存中
    const allInCache = texts.every((text) => translationCache[locale as SupportedLanguage]?.[text])

    if (allInCache) {
      // 从缓存构建翻译映射
      const cachedTranslations = texts.reduce(
        (acc, text) => ({
          ...acc,
          [text]: translationCache[locale as SupportedLanguage][text],
        }),
        {},
      )

      setTranslations(cachedTranslations)
      return
    }

    // 否则，批量翻译
    setLoading(true)
    batchTranslateMissing(texts, locale as SupportedLanguage)
      .then((result) => {
        setTranslations(result)
      })
      .catch((error) => {
        console.error("批量翻译失败:", error)
        // 失败时使用原文
        const fallbackTranslations = texts.reduce((acc, text) => ({ ...acc, [text]: text }), {})
        setTranslations(fallbackTranslations)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [texts, locale, batchTranslateMissing, translationCache])

  return <>{render(translations, loading)}</>
}
