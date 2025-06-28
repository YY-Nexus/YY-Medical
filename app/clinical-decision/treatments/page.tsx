import type { Metadata } from "next"
import { ClinicalTreatmentsClient } from "@/components/clinical-decision/clinical-treatments-client"

export const metadata: Metadata = {
  title: "治疗方案 | 言语医枢³智能诊疗系统",
  description: "AI辅助治疗方案推荐与管理",
}

export default function TreatmentsPage() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">治疗方案</h1>
        <p className="text-muted-foreground">AI辅助治疗方案推荐与管理</p>
      </div>

      <ClinicalTreatmentsClient />
    </div>
  )
}
