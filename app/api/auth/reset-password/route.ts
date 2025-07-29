import { type NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    // 验证输入
    if (!token || !password) {
      return NextResponse.json({ message: "令牌和密码不能为空" }, { status: 400 })
    }

    // 验证密码强度
    if (password.length < 8) {
      return NextResponse.json({ message: "密码长度至少8位" }, { status: 400 })
    }

    try {
      // 验证重置令牌
      const decoded = verify(token, process.env.JWT_SECRET || "your-secret-key") as any

      if (decoded.type !== "password-reset") {
        return NextResponse.json({ message: "无效的重置令牌" }, { status: 400 })
      }

      // 加密新密码
      const hashedPassword = await bcrypt.hash(password, 10)

      // 实际应用中应更新数据库中的用户密码
      console.log(`更新用户 ${decoded.email} 的密码`)

      return NextResponse.json({
        message: "密码重置成功",
      })
    } catch (tokenError) {
      return NextResponse.json({ message: "重置令牌已过期或无效" }, { status: 400 })
    }
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ message: "服务器错误" }, { status: 500 })
  }
}
