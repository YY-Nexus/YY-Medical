import { NextResponse } from "next/server"
import { CheckStatus } from "@/services/deployment-check-service"

// 模拟延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function GET() {
  try {
    // 模拟API延迟
    await delay(4000)

    // 返回模拟的安全检查结果
    return NextResponse.json({
      status: CheckStatus.SUCCESS,
      items: [
        { name: "依赖项安全检查", status: CheckStatus.SUCCESS, message: "未发现已知安全漏洞" },
        { name: "API安全检查", status: CheckStatus.SUCCESS, message: "API安全配置正确" },
        { name: "认证机制", status: CheckStatus.SUCCESS, message: "认证机制安全" },
        { name: "CSRF保护", status: CheckStatus.SUCCESS, message: "CSRF保护已正确配置" },
        { name: "XSS防护", status: CheckStatus.SUCCESS, message: "XSS防护已启用" },
      ],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("安全检查失败:", error)
    return NextResponse.json({ error: "安全检查失败" }, { status: 500 })
  }
}
