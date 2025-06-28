import type { Metadata } from "next"
import { CertificationManagementClient } from "@/components/certifications/certification-management-client"

export const metadata: Metadata = {
  title: "资质管理 | 言语云³",
  description: "管理医疗专业人员资质证书",
}

export default function CertificationManagementPage() {
  return <CertificationManagementClient />
}
