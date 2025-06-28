import type { Metadata } from "next"
import { DiagnosticToolsClient } from "@/components/clinical-decision/diagnostic-tools-client"

export const metadata: Metadata = {
  title: "诊断辅助工具 | 言语医枢³智能诊疗系统",
  description: "基于AI的诊断辅助工具，提供症状分析、鉴别诊断和风险评估",
}

export default function DiagnosticToolsPage() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">诊断辅助工具</h1>
        <p className="text-muted-foreground">基于AI的诊断辅助工具，提供症状分析、鉴别诊断和风险评估</p>
      </div>

      <DiagnosticToolsClient />
    </div>
  )
}
