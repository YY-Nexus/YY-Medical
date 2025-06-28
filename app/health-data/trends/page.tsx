import type { Metadata } from "next"
import { TrendsAnalysisClient } from "@/components/health-data/trends-analysis-client"

export const metadata: Metadata = {
  title: "趋势分析 | YanYu MediNexus³",
  description: "健康数据趋势分析",
}

export default function TrendsAnalysisPage() {
  return <TrendsAnalysisClient />
}
