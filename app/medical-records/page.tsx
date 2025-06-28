import { MedicalRecordsClient } from "@/components/medical-records/medical-records-client"

export default function MedicalRecordsPage() {
  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">医疗记录管理</h1>
        <p className="text-muted-foreground">上传、管理和分析患者的医疗影像、处方和其他医疗记录</p>
      </div>

      <MedicalRecordsClient />
    </div>
  )
}
