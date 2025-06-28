import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "认证 - 言语云³医疗AI系统",
  description: "言语云³医疗AI智能诊疗系统 - 安全登录",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="absolute inset-0 bg-[url('/images/medical-pattern.svg')] opacity-5"></div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
