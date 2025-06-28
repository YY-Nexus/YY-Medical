import { LoginForm } from "@/components/auth/LoginForm"
import { TermsFooter } from "@/components/auth/TermsFooter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "登录 - MediNexus³",
  description: "登录到 MediNexus³ 智能诊疗系统",
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <LoginForm />
      <TermsFooter />
    </div>
  )
}
