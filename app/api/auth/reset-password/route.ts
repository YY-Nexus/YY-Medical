import { type NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import bcrypt from "bcryptjs"

// JWT载荷接口
interface ResetTokenPayload {
  email: string
  type: string
  timestamp?: number
  iat?: number
  exp?: number
}

// 密码强度验证
const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (!password || password.length < 8) {
    return { isValid: false, message: "密码长度至少8位" }
  }
  
  // 检查是否包含数字和字母
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /\d/.test(password)
  
  if (!hasLetter || !hasNumber) {
    return { isValid: false, message: "密码必须包含字母和数字" }
  }
  
  return { isValid: true }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password } = body

    // 验证输入
    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { success: false, message: "重置令牌不能为空" }, 
        { status: 400 }
      )
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, message: "密码不能为空" }, 
        { status: 400 }
      )
    }

    // 验证密码强度
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { success: false, message: passwordValidation.message }, 
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

    try {
      // 验证重置令牌
      const decoded = verify(token, jwtSecret) as ResetTokenPayload

      if (decoded.type !== "password-reset") {
        return NextResponse.json(
          { success: false, message: "无效的重置令牌类型" }, 
          { status: 400 }
        )
      }

      if (!decoded.email) {
        return NextResponse.json(
          { success: false, message: "令牌中缺少邮箱信息" }, 
          { status: 400 }
        )
      }

      // 加密新密码
      const saltRounds = 12 // 增加安全性
      const hashedPassword = await bcrypt.hash(password, saltRounds)

      // 实际应用中应更新数据库中的用户密码
      if (process.env.NODE_ENV === "development") {
        console.warn(`[开发模式] 更新用户 ${decoded.email} 的密码`)
      }

      // TODO: 在实际应用中执行以下操作:
      // 1. 查询用户是否存在
      // 2. 更新用户密码
      // 3. 使重置令牌失效
      // 4. 记录密码修改日志

      return NextResponse.json({
        success: true,
        message: "密码重置成功",
      })
    } catch (tokenError) {
      console.error("重置令牌验证失败:", tokenError)
      return NextResponse.json(
        { success: false, message: "重置令牌已过期或无效" }, 
        { status: 400 }
      )
    }
  } catch (error) {
    console.error("密码重置请求处理失败:", error)
    return NextResponse.json(
      { success: false, message: "服务器内部错误" }, 
      { status: 500 }
    )
  }
}
