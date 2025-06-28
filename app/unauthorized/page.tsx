import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "无权限访问 - MediNexus³",
  description: "您没有权限访问此页面",
}

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">访问受限</h1>
        <p className="text-xl text-gray-700 mb-8">您没有权限访问此页面。如果您认为这是一个错误，请联系系统管理员。</p>
        <div className="space-y-4">
          <Button asChild>
            <Link href="/">返回首页</Link>
          </Button>
          <div className="pt-2">
            <Link href="/contact-support" className="text-blue-600 hover:underline">
              联系技术支持
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
