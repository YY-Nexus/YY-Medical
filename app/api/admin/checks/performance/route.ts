import { NextResponse } from "next/server"
import { CheckStatus } from "@/services/deployment-check-service"

// 模拟延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function GET() {
  try {
    // 模拟API延迟
    await delay(3000)

    // 返回模拟的性能检查结果
    return NextResponse.json({
      status: CheckStatus.WARNING,
      items: [
        { name: "页面加载时间", status: CheckStatus.WARNING, message: "平均页面加载时间: 2.8秒，超过推荐的2秒" },
        { name: "API响应时间", status: CheckStatus.SUCCESS, message: "API平均响应时间: 320ms" },
        { name: "数据库查询性能", status: CheckStatus.SUCCESS, message: "数据库查询平均执行时间: 150ms" },
        { name: "资源加载优化", status: CheckStatus.SUCCESS, message: "资源加载已优化" },
        { name: "缓存配置", status: CheckStatus.WARNING, message: "缓存命中率: 58%，低于推荐的70%" },
      ],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("性能检查失败:", error)
    return NextResponse.json({ error: "性能检查失败" }, { status: 500 })
  }
}
