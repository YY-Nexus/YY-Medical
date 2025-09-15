import type React from "react"
import type { Metadata } from "next"
import { Sidebar } from "@/components/sidebar"
import { GlobalNavigation } from "@/components/global-navigation"

export const metadata: Metadata = {
  title: "控制台 | 言语云³",
  description: "医疗AI系统控制台",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <GlobalNavigation />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  )
}
