import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyJwtToken } from "@/lib/auth/jwt"

// 需要认证的路径
const AUTH_PATHS = [
  "/patients",
  "/ai-diagnosis",
  "/clinical-decision",
  "/analytics",
  "/research",
  "/medical-records",
  "/health-data",
  "/ai-model",
  "/security",
  "/teleconsultation",
  "/ehr-integration",
]

// 公开路径
const PUBLIC_PATHS = ["/login", "/register", "/forgot-password", "/reset-password", "/unauthorized"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 检查是否是需要认证的路径
  const isAuthPath = AUTH_PATHS.some((path) => pathname.startsWith(path))
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname === path)
  const isApiPath = pathname.startsWith("/api")
  const isStaticPath = pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")

  // 如果是静态资源或API路径，直接放行
  if (isStaticPath || isApiPath) {
    return NextResponse.next()
  }

  // 如果是首页或公开路径，不需要认证
  if (pathname === "/" || isPublicPath) {
    return NextResponse.next()
  }

  // 如果是需要认证的路径，检查认证状态
  if (isAuthPath) {
    // 获取认证令牌
    const token = request.cookies.get("auth-token")?.value

    // 如果没有令牌，重定向到登录页
    if (!token) {
      const url = new URL("/login", request.url)
      url.searchParams.set("returnUrl", pathname)
      return NextResponse.redirect(url)
    }

    try {
      // 验证令牌
      const payload = await verifyJwtToken(token)

      if (!payload) {
        throw new Error("Invalid token")
      }

      return NextResponse.next()
    } catch (error) {
      // 令牌无效或已过期，重定向到登录页
      const url = new URL("/login", request.url)
      url.searchParams.set("returnUrl", pathname)
      return NextResponse.redirect(url)
    }
  }

  // 其他路径放行
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}
