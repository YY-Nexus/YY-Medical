import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid"

// 模拟用户数据库（实际应用中应使用真实数据库）
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password } = await request.json()

    // 验证输入
    if (!name || !email || !phone || !password) {
      return NextResponse.json({ message: "所有字段都是必填的" }, { status: 400 })
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "邮箱格式不正确" }, { status: 400 })
    }

    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ message: "手机号格式不正确" }, { status: 400 })
    }

    // 验证密码强度
    if (password.length < 8) {
      return NextResponse.json({ message: "密码长度至少8位" }, { status: 400 })
    }

    // 检查用户是否已存在
    const existingUser = users.find((u) => u.email === email || u.phone === phone)
    if (existingUser) {
      return NextResponse.json({ message: "邮箱或手机号已被注册" }, { status: 409 })
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10)

    // 创建新用户
    const newUser = {
      id: uuidv4(),
      name,
      email,
      phone,
      password: hashedPassword,
      role: "user",
      createdAt: new Date().toISOString(),
      emailVerified: false,
    }

    // 保存用户（实际应用中应保存到数据库）
    users.push(newUser)

    // 返回成功响应（不包含密码）
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json(
      {
        message: "注册成功",
        user: userWithoutPassword,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "服务器错误" }, { status: 500 })
  }
}
