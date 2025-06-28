import type { Metadata } from "next"
import { PrescriptionManagementClient } from "@/components/medications/prescription-management-client"

export const metadata: Metadata = {
  title: "处方管理 | YanYu MediNexus³",
  description: "医疗处方管理系统",
}

export default function PrescriptionsPage() {
  return <PrescriptionManagementClient />
}
