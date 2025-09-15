import type React from "react"
import type { Metadata } from "next"
import { AIDiagnosisNavigation } from "@/components/ai-diagnosis/ai-diagnosis-navigation"

export const metadata: Metadata = {
  title: "AI诊断 | 言语云³",
  description: "AI智能诊断系统",
}

export default function AIDiagnosisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4">
          <AIDiagnosisNavigation />
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">{children}</div>
    </div>
  )
}
