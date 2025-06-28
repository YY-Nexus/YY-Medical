import type { Metadata } from "next"
import { ClinicalGuidelinesClient } from "@/components/clinical-decision/clinical-guidelines-client"

export const metadata: Metadata = {
  title: "临床指南查询 | 言语医枢³智能诊疗系统",
  description: "查询和应用最新临床指南，获取循证医学支持",
}

export default function ClinicalGuidelinesPage() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">临床指南查询</h1>
        <p className="text-muted-foreground">查询和应用最新临床指南，获取循证医学支持</p>
      </div>

      <ClinicalGuidelinesClient />
    </div>
  )
}
