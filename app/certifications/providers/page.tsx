import type { Metadata } from "next"
import { VerificationProvidersClient } from "@/components/certifications/verification-providers-client"

export const metadata: Metadata = {
  title: "验证机构管理 | 言语云³",
  description: "管理和配置资质验证服务提供商",
}

export default function VerificationProvidersPage() {
  return <VerificationProvidersClient />
}
