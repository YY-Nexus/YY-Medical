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
  // 其他用户...
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, role, department } = body

    // 验证请求数据
    if (!email || !password || !name || !role) {
      return NextResponse.json({ message: "请提供所有必填字段" }, { status: 400 })
    }

    // 检查邮箱是否已存在
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ message: "该邮箱已被注册" }, { status: 409 })
    }

    // 创建新用户
    const newUser = {
      id: (users.length + 1).toString(),
      email,
      password, // 实际项目中应哈希处理
      name,
      role,
      department,
      avatar: `/avatars/${role}.png`, // 默认头像
    }

    // 添加到用户数组（模拟数据库插入）
    users.push(newUser)

    // 创建用户对象（不包含密码）
    const userWithoutPassword = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      department: newUser.department,
      avatar: newUser.avatar,
    }

    // 生成JWT令牌
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
    console.error("注册错误:", error)
    return NextResponse.json({ message: "注册过程中发生错误" }, { status: 500 })
  }
}
