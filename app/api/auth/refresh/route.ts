import { NextResponse } from "next/server"
import { SignJWT } from "jose"
import { getJwtSecretKey, verifyJwtToken } from "@/lib/auth/jwt"

export async function POST(request: Request) {
  try {
    // 从请求头获取令牌
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "未提供授权令牌" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    // 验证令牌
    const payload = await verifyJwtToken(token)

    if (!payload) {
      return NextResponse.json({ message: "无效或已过期的令牌" }, { status: 401 })
    }

    // 创建新令牌（不包含密码）
    const userWithoutPassword = {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      department: payload.department,
      avatar: payload.avatar,
    }

    // 生成新的JWT令牌
    const newToken = await new SignJWT({ ...userWithoutPassword })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(getJwtSecretKey())

    // 返回新令牌
    return NextResponse.json({
      token: newToken,
    })
  } catch (error) {
    console.error("刷新令牌错误:", error)
    return NextResponse.json({ message: "刷新令牌时发生错误" }, { status: 500 })
  }
}
