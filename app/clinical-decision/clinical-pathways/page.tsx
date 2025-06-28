import type { Metadata } from "next"
import { ClinicalPathwaysClient } from "@/components/clinical-decision/clinical-pathways-client"

export const metadata: Metadata = {
  title: "临床路径管理 | 言语医枢³智能诊疗系统",
  description: "管理和定制临床路径，规范诊疗流程，提高医疗质量",
}

export default function ClinicalPathwaysPage() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">临床路径管理</h1>
        <p className="text-muted-foreground">管理和定制临床路径，规范诊疗流程，提高医疗质量</p>
      </div>

      <ClinicalPathwaysClient />
    </div>
  )
}
