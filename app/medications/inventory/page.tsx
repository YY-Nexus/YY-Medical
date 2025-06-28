import type { Metadata } from "next"
import { MedicationInventoryClient } from "@/components/medications/medication-inventory-client"

export const metadata: Metadata = {
  title: "药品库存管理 | YanYu MediNexus³",
  description: "医疗药品库存管理系统",
}

export default function MedicationInventoryPage() {
  return <MedicationInventoryClient />
}
