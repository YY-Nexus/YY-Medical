import { type NextRequest, NextResponse } from "next/server"
import { sign } from "jsonwebtoken"

// 模拟邮件发送服务
const sendResetEmail = async (email: string, resetToken: string) => {
  // 实际应用中应使用真实的邮件服务
  console.log(`发送密码重置邮件到: ${email}`)
  console.log(`重置链接: ${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`)

  // 模拟邮件发送延迟
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return true
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // 验证输入
    if (!email) {
      return NextResponse.json({ message: "邮箱地址不能为空" }, { status: 400 })
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "邮箱格式不正确" }, { status: 400 })
    }

    // 生成重置令牌（实际应用中应检查用户是否存在）
    const resetToken = sign({ email, type: "password-reset" }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "1h",
    })

    // 发送重置邮件
    await sendResetEmail(email, resetToken)

    return NextResponse.json({
      message: "密码重置邮件已发送",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ message: "服务器错误" }, { status: 500 })
  }
}
