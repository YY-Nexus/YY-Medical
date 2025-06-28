"use client"

// 支持的语言
export type SupportedLanguage = "zh-CN" | "en-US" | "ja-JP" | "ko-KR"

// 通过服务器 API 路由翻译文本
export async function translateText(text: string, targetLanguage: string): Promise<string> {
  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, targetLanguage }),
    })

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.translatedText || text
  } catch (error) {
    console.error("Translation error:", error)
    return text
  }
}

// 通过服务器 API 路由批量翻译文本
export async function batchTranslate(texts: string[], targetLanguage: string): Promise<string[]> {
  if (texts.length === 0) {
    return texts
  }

  try {
    const response = await fetch("/api/translate/batch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ texts, targetLanguage }),
    })

    if (!response.ok) {
      throw new Error(`Batch translation API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.translatedTexts || texts
  } catch (error) {
    console.error("Batch translation error:", error)
    return texts
  }
}
