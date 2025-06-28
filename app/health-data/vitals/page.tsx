import type { Metadata } from "next"
import { VitalSignsClient } from "@/components/health-data/vital-signs-client"

export const metadata: Metadata = {
  title: "生命体征 | YanYu MediNexus³",
  description: "患者生命体征监测与分析",
}

export default function VitalSignsPage() {
  return <VitalSignsClient />
}
