import { AdminCertificationClient } from "@/components/admin/certifications/admin-certification-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "资质审核 - MediNexus³",
  description: "审核医生上传的资质认证信息",
}

export default function AdminCertificationsPage() {
  return (
    <div className="container mx-auto py-6">
      <AdminCertificationClient />
    </div>
  )
}
