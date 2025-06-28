import type { Metadata } from "next"
import { ExperimentDesignClient } from "@/components/research/experiment-design-client"

export const metadata: Metadata = {
  title: "试验设计 | YanYu MediNexus³",
  description: "医学研究试验设计工具",
}

export default function ExperimentDesignPage() {
  return <ExperimentDesignClient />
}
