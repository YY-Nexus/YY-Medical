import type { Metadata } from "next"
import { DeploymentCheckClient } from "@/components/admin/deployment-check/deployment-check-client"

export const metadata: Metadata = {
  title: "部署前深度检查 | 医枢³管理平台",
  description: "全面检查系统配置、性能、安全性和兼容性，确保系统可以安全部署",
}

export default function DeploymentCheckPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">部署前深度检查</h1>
      <DeploymentCheckClient />
    </div>
  )
}
