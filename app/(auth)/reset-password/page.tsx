import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm"
import { TermsFooter } from "@/components/auth/TermsFooter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "重置密码 - MediNexus³",
  description: "设置您的新 MediNexus³ 账号密码",
}

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-md">
      <ResetPasswordForm />
      <TermsFooter />
    </div>
  )
}
