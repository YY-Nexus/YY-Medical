import { NextResponse } from "next/server"
import { SignJWT } from "jose"
import { getJwtSecretKey } from "@/lib/auth/jwt"

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
  {
    id: "2",
    email: "admin@medinexus.com",
    password: "admin123",
    name: "李管理员",
    role: "admin",
    avatar: "/avatars/admin.png",
  },
  {
    id: "3",
    email: "researcher@medinexus.com",
    password: "research123",
    name: "王研究员",
    role: "researcher",
    department: "研发部",
    avatar: "/avatars/researcher.png",
  },
  {
    id: "4",
    email: "china@0379.email",
    password: "My151001", // 注意大小写
    name: "系统管理员",
    role: "admin",
    avatar: "/avatars/admin.png",
  },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // 验证请求数据
    if (!email || !password) {
      return NextResponse.json({ message: "邮箱和密码不能为空" }, { status: 400 })
    }

    // 查找用户
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

    // 验证用户存在和密码正确
    if (!user || user.password !== password) {
      return NextResponse.json({ message: "邮箱或密码不正确" }, { status: 401 })
    }

    // 创建用户对象（不包含密码）
    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      department: user.department,
      avatar: user.avatar,
    }

    // 使用 jose 库生成 JWT 令牌
    const token = await new SignJWT({ ...userWithoutPassword })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(getJwtSecretKey())

    // 返回用户信息和令牌
    return NextResponse.json({
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error("登录错误:", error)
    return NextResponse.json({ message: "登录过程中发生错误" }, { status: 500 })
  }
}
