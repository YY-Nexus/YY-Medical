import { jwtVerify } from "jose"

// 获取 JWT 密钥
export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error("JWT_SECRET 环境变量未设置")
  }

  return new TextEncoder().encode(secret)
}

// 验证 JWT 令牌
export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey())
    return payload
  } catch (error) {
    return null
  }
}
