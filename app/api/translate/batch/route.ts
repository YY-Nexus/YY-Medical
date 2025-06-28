import { type NextRequest, NextResponse } from "next/server"

// 使用不带 NEXT_PUBLIC_ 前缀的环境变量
const API_KEY = process.env.TRANSLATOR_API_KEY
const REGION = process.env.TRANSLATOR_REGION

export async function POST(request: NextRequest) {
  try {
    const { texts, targetLanguage } = await request.json()

    if (!texts || !Array.isArray(texts) || !targetLanguage) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // 检查环境变量是否设置
    if (!API_KEY || !REGION || texts.length === 0) {
      console.warn("Translation API key or region not set, or empty texts array")
      return NextResponse.json({ translatedTexts: texts })
    }

    // 将语言代码转换为 Azure Translator 支持的格式
    const langCode = targetLanguage.replace("_", "-").split("-")[0]

    const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${langCode}`

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": API_KEY,
        "Ocp-Apim-Subscription-Region": REGION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(texts.map((text) => ({ text }))),
    })

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const translatedTexts = data.map((item: any, index: number) => item?.translations[0]?.text || texts[index])

    return NextResponse.json({ translatedTexts })
  } catch (error) {
    console.error("Batch translation error:", error)
    return NextResponse.json({ error: "Failed to translate texts" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
