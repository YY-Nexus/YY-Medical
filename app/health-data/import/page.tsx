import type { Metadata } from "next"
import { DataImportClient } from "@/components/health-data/data-import-client"

export const metadata: Metadata = {
  title: "数据导入 | YanYu MediNexus³",
  description: "健康数据导入工具",
}

export default function DataImportPage() {
  return <DataImportClient />
}
