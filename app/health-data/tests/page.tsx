import type { Metadata } from "next"
import { TestResultsClient } from "@/components/health-data/test-results-client"

export const metadata: Metadata = {
  title: "检测结果 | YanYu MediNexus³",
  description: "患者检测结果管理与分析",
}

export default function TestResultsPage() {
  return <TestResultsClient />
}
