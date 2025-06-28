import { PageHeader } from "@/components/page-header"
import { Shield } from "lucide-react"
import { AccountSecurityClient } from "@/components/security/account-security-client"

export default function AccountSecurityPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader title="账号安全" description="管理您的密码和安全设置" icon={<Shield className="h-6 w-6" />} />
      <AccountSecurityClient />
    </div>
  )
}
