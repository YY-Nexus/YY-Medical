import type { Metadata } from "next"
import { CertificationUploadClient } from "@/components/certifications/certification-upload-client"

export const metadata: Metadata = {
  title: "资质上传 | 言语云³",
  description: "上传医疗专业人员资质证书",
}

export default function CertificationUploadPage() {
  return <CertificationUploadClient />
}
