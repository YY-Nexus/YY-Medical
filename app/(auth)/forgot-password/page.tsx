import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"
import { TermsFooter } from "@/components/auth/TermsFooter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "忘记密码 - MediNexus³",
  description: "重置您的 MediNexus³ 账号密码",
}

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md">
      <ForgotPasswordForm />
      <TermsFooter />
    </div>
  )
}
