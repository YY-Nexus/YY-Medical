import { NextResponse } from "next/server"
import { CheckStatus } from "@/services/deployment-check-service"

// 模拟延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function GET() {
  try {
    // 模拟API延迟
    await delay(2000)

    // 返回模拟的系统检查结果
    return NextResponse.json({
      status: CheckStatus.SUCCESS,
      items: [
        { name: "操作系统兼容性", status: CheckStatus.SUCCESS, message: "系统兼容性良好" },
        { name: "内存使用情况", status: CheckStatus.SUCCESS, message: "内存使用率: 65%" },
        { name: "磁盘空间", status: CheckStatus.SUCCESS, message: "磁盘空间充足: 75% 可用" },
        { name: "CPU使用率", status: CheckStatus.SUCCESS, message: "CPU平均使用率: 45%" },
        { name: "网络连接", status: CheckStatus.SUCCESS, message: "网络连接正常" },
      ],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("系统检查失败:", error)
    return NextResponse.json({ error: "系统检查失败" }, { status: 500 })
  }
}
