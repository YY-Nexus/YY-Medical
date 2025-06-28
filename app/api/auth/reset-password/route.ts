import { NextResponse } from "next/server"

// 模拟用户数据库
// 实际项目中应连接到真实数据库
const users = [
  {
    id: "1",
    email: "doctor@medinexus.com",
    password: "password123", // 实际项目中应存储哈希值
    name: "张医生",
    role: "doctor",
    department: "内科",
    avatar: "/avatars/doctor.png",
  },
  // 其他用户...
]

// 模拟重置令牌存储
// 实际项目中应存储在数据库中
const resetTokens: Record<string, { email: string; expires: number }> = {}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    // 验证请求数据
    if (!email) {
      return NextResponse.json({ message: "请提供邮箱地址" }, { status: 400 })
    }

    // 查找用户
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

    // 即使用户不存在，也返回成功以防止邮箱枚举攻击
    if (!user) {
      return NextResponse.json({
        message: "如果该邮箱已注册，您将收到重置密码的邮件",
      })
    }

    // 生成重置令牌
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    // 存储重置令牌（有效期1小时）
    resetTokens[resetToken] = {
      email: user.email,
      expires: Date.now() + 60 * 60 * 1000,
    }

    // 在实际项目中，这里应该发送包含重置链接的邮件
    // sendResetEmail(user.email, `https://yourdomain.com/reset-password?token=${resetToken}`)

    // 返回成功消息
    return NextResponse.json({
      message: "如果该邮箱已注册，您将收到重置密码的邮件",
    })
  } catch (error) {
    console.error("密码重置请求错误:", error)
    return NextResponse.json({ message: "处理密码重置请求时发生错误" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { token, newPassword } = body

    // 验证请求数据
    if (!token || !newPassword) {
      return NextResponse.json({ message: "请提供令牌和新密码" }, { status: 400 })
    }

    // 验证令牌
    const resetData = resetTokens[token]
    if (!resetData || resetData.expires < Date.now()) {
      return NextResponse.json({ message: "无效或已过期的重置令牌" }, { status: 400 })
    }

    // 查找用户
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === resetData.email.toLowerCase())

    if (userIndex === -1) {
      return NextResponse.json({ message: "用户不存在" }, { status: 404 })
    }

    // 更新密码
    users[userIndex].password = newPassword // 实际项目中应哈希处理

    // 删除使用过的令牌
    delete resetTokens[token]

    // 返回成功消息
    return NextResponse.json({
      message: "密码已成功重置",
    })
  } catch (error) {
    console.error("密码重置错误:", error)
    return NextResponse.json({ message: "重置密码时发生错误" }, { status: 500 })
  }
}
