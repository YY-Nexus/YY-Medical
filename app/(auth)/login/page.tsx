import { Suspense } from "react"
import { LoginForm } from "@/components/auth/LoginForm"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Logo } from "@/components/brand/logo"

function LoginSkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto border-blue-200 shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4 mx-auto bg-blue-100" />
          <Skeleton className="h-4 w-full bg-blue-50" />
          <Skeleton className="h-10 w-full bg-blue-50" />
          <Skeleton className="h-10 w-full bg-blue-50" />
          <Skeleton className="h-10 w-full bg-blue-50" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 relative overflow-hidden">
      {/* 背景动画折射线 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-pulse" />
        <div
          className="absolute top-1/2 left-1/4 w-0.5 h-24 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-3/4 left-1/2 w-1 h-28 bg-gradient-to-b from-transparent via-blue-500/35 to-transparent animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-0.5 h-20 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-2/3 right-0 w-1 h-36 bg-gradient-to-b from-transparent via-blue-600/25 to-transparent animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo和标题区域 */}
        <div className="text-center mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 shadow-lg">
          <div className="flex justify-center mb-4">
            <Logo size="xl" animated={true} />
          </div>
          <h1 className="text-3xl font-bold text-blue-800 mb-2">言语云³医疗AI系统</h1>
          <p className="text-blue-600 font-medium">智能医疗管理平台 - 安全登录</p>

          {/* 装饰性折射线 */}
          <div className="relative mt-4 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full animate-pulse" />
          </div>
        </div>

        <Suspense fallback={<LoginSkeleton />}>
          <LoginForm />
        </Suspense>

        {/* 底部装饰 */}
        <div className="text-center mt-6 text-blue-600/70 text-sm">
          <p>© 2024 言语云³医疗AI系统 - 专业医疗管理解决方案</p>
        </div>
      </div>
    </div>
  )
}
