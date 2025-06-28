import type { Metadata } from "next"
import { CertificationsClient } from "@/components/certifications/certifications-client"

export const metadata: Metadata = {
  title: "资质验证概览 | 言语云³",
  description: "医疗专业人员资质验证系统概览",
}

export default function CertificationsPage() {
  return <CertificationsClient />
}
