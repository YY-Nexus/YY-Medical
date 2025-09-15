import type React from "react"
import type { Metadata } from "next"
import { PatientNavigation } from "@/components/patients/patient-navigation"

export const metadata: Metadata = {
  title: "患者管理 | 言语云³",
  description: "患者信息管理系统",
}

export default function PatientsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4">
          <PatientNavigation />
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">{children}</div>
    </div>
  )
}
