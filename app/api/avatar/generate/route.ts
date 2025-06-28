import { type NextRequest, NextResponse } from "next/server"
import { generateAIAvatar, mockGenerateAIAvatar } from "@/services/ai-avatar-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 在生产环境使用实际API，在开发/测试环境使用模拟数据
    const isDevelopment = process.env.NODE_ENV === "development"
    const result = isDevelopment ? await mockGenerateAIAvatar(body) : await generateAIAvatar(body)

    if (!result.success) {
      return NextResponse.json({ error: result.error || "头像生成失败" }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("AI头像生成API错误:", error)
    return NextResponse.json({ error: "服务器处理请求时出错" }, { status: 500 })
  }
}
