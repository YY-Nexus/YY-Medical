import type { Metadata } from "next"
import { DrugReferenceClient } from "@/components/clinical-decision/drug-reference-client"

export const metadata: Metadata = {
  title: "药物参考 | 言语医枢³智能诊疗系统",
  description: "查询药物信息、相互作用和用药指导",
}

export default function MedicationsPage() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">药物参考</h1>
        <p className="text-muted-foreground">查询药物信息、相互作用和用药指导</p>
      </div>

      <DrugReferenceClient />
    </div>
  )
}
