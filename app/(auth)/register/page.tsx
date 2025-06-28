import { RegisterForm } from "@/components/auth/RegisterForm"
import { TermsFooter } from "@/components/auth/TermsFooter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "注册 - MediNexus³",
  description: "创建 MediNexus³ 智能诊疗系统账号",
}

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md">
      <RegisterForm />
      <TermsFooter />
    </div>
  )
}
