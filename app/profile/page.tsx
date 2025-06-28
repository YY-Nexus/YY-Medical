import { PageHeader } from "@/components/page-header"
import { User } from "lucide-react"
import { ProfileClient } from "@/components/profile/profile-client"

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader title="个人资料" description="查看和管理您的个人信息" icon={<User className="h-6 w-6" />} />
      <ProfileClient />
    </div>
  )
}
