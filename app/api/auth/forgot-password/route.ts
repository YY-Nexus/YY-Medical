import { type NextRequest, NextResponse } from "next/server"
import { sign } from "jsonwebtoken"

// 邮件服务配置类型
interface EmailConfig {
  serviceUrl?: string
  apiKey?: string
}

// 模拟邮件发送服务
const sendResetEmail = async (email: string, resetToken: string): Promise<boolean> => {
  try {
    // 实际应用中应使用真实的邮件服务
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`
    
    // 在生产环境中，这里应该调用实际的邮件服务API
    if (process.env.NODE_ENV === "development") {
      console.warn(`[开发模式] 发送密码重置邮件到: ${email}`)
      console.warn(`[开发模式] 重置链接: ${resetLink}`)
    }

    // 模拟邮件发送延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return true
  } catch (error) {
    console.error("邮件发送失败:", error)
    return false
  }
}

// 验证邮箱格式
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // 验证输入
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "邮箱地址不能为空" }, 
        { status: 400 }
      )
    }

    // 验证邮箱格式
    if (!isValidEmail(email.trim())) {
      return NextResponse.json(
        { success: false, message: "邮箱格式不正确" }, 
        { status: 400 }
      )
    }

    // 检查JWT密钥配置
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      console.error("JWT_SECRET环境变量未配置")
      return NextResponse.json(
        { success: false, message: "服务器配置错误" }, 
        { status: 500 }
      )
    }

    // 生成重置令牌（实际应用中应检查用户是否存在）
    const resetToken = sign(
      { 
        email: email.trim(), 
        type: "password-reset",
        timestamp: Date.now()
      }, 
      jwtSecret, 
      { expiresIn: "1h" }
    )

    // 发送重置邮件
    const emailSent = await sendResetEmail(email.trim(), resetToken)
    
    if (!emailSent) {
      return NextResponse.json(
        { success: false, message: "邮件发送失败，请稍后重试" }, 
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "密码重置邮件已发送",
    })
  } catch (error) {
    console.error("密码重置请求处理失败:", error)
    return NextResponse.json(
      { success: false, message: "服务器内部错误" }, 
      { status: 500 }
    )
  }
}
