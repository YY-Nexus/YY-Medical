import type { Metadata } from "next"
import { SampleManagementClient } from "@/components/research/sample-management-client"

export const metadata: Metadata = {
  title: "样本管理 | YanYu MediNexus³",
  description: "医学研究样本管理系统",
}

export default function SampleManagementPage() {
  return <SampleManagementClient />
}
