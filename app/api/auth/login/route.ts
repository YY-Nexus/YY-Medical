import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// 模拟用户数据库
const users = [
  {
    id: 1,
    email: "admin@yanyucloud.com",
    password: "admin123",
    name: "系统管理员",
    role: "admin",
    department: "信息科",
    status: "active",
  },
  {
    id: 2,
    email: "doctor@yanyucloud.com",
    password: "doctor123",
    name: "张医生",
    role: "doctor",
    department: "内科",
    status: "active",
  },
  {
    id: 3,
    email: "nurse@yanyucloud.com",
    password: "nurse123",
    name: "李护士",
    role: "nurse",
    department: "护理部",
    status: "active",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // 验证输入
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "邮箱和密码不能为空",
          code: "MISSING_FIELDS",
        },
        { status: 400 },
      )
    }

    // 查找用户
    const user = users.find((u) => u.email === email)

    if (!user) {
      return NextResponse.json(
        {
          message: "邮箱地址不存在",
          code: "INVALID_EMAIL",
        },
        { status: 401 },
      )
    }

    // 检查账户状态
    if (user.status !== "active") {
      return NextResponse.json(
        {
          message: "账户已被禁用，请联系管理员",
          code: "ACCOUNT_DISABLED",
        },
        { status: 403 },
      )
    }

    // 验证密码
    if (user.password !== password) {
      return NextResponse.json(
        {
          message: "密码错误",
          code: "INVALID_PASSWORD",
        },
        { status: 401 },
      )
    }

    // 生成JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" },
    )

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "登录成功",
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        message: "API endpoint not implemented in demo version",
        code: "INTERNAL_ERROR",
      },
      { status: 501 },
    )
  }
}
