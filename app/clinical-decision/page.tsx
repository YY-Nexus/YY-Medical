import type { Metadata } from "next"
import { ClinicalDashboard } from "@/components/clinical-decision/dashboard"
import { TreatmentRecommendations } from "@/components/clinical-decision/treatment-recommendations"
import { RecentCases } from "@/components/clinical-decision/recent-cases"

export const metadata: Metadata = {
  title: "临床决策支持 | 言语医枢³智能诊疗系统",
  description: "言语医枢³AI驱动的临床决策支持系统，提供诊断建议和治疗方案推荐",
}

export default function ClinicalDecisionPage() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">临床决策支持</h1>
        <p className="text-muted-foreground">AI驱动的临床决策支持系统，提供诊断建议和治疗方案推荐</p>
      </div>

      <ClinicalDashboard />

      <div className="grid gap-6 md:grid-cols-2">
        <TreatmentRecommendations />
        <RecentCases />
      </div>
    </div>
  )
}
