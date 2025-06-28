import type { Metadata } from "next"
import { Suspense } from "react"
import { MedicationCatalog } from "@/components/medications/medication-catalog"
import { MedicationInventory } from "@/components/medications/medication-inventory"
import { PrescriptionManagement } from "@/components/medications/prescription-management"
import { MedicationInteractions } from "@/components/medications/medication-interactions"
import { PopularMedications } from "@/components/medications/popular-medications"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pill, ClipboardList, AlertTriangle, Package } from "lucide-react"

export const metadata: Metadata = {
  title: "药物管理 | 言语医枢³智能诊疗系统",
  description: "言语医枢³全面的药物管理系统，包括药物目录、库存管理、处方管理和药物相互作用检查",
}

export default function MedicationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">药物管理系统</h1>

      <Tabs defaultValue="catalog" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="catalog" className="flex items-center gap-1">
            <Pill className="h-4 w-4" />
            药品目录
          </TabsTrigger>
          <TabsTrigger value="prescriptions" className="flex items-center gap-1">
            <ClipboardList className="h-4 w-4" />
            处方管理
          </TabsTrigger>
          <TabsTrigger value="interactions" className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            药物互作
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            库存管理
          </TabsTrigger>
        </TabsList>

        <TabsContent value="catalog">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Suspense fallback={<LoadingSpinner />}>
                <MedicationCatalog />
              </Suspense>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">常用药物</h2>
              <PopularMedications />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="prescriptions">
          <Suspense fallback={<LoadingSpinner />}>
            <PrescriptionManagement />
          </Suspense>
        </TabsContent>

        <TabsContent value="interactions">
          <Suspense fallback={<LoadingSpinner />}>
            <MedicationInteractions />
          </Suspense>
        </TabsContent>

        <TabsContent value="inventory">
          <Suspense fallback={<LoadingSpinner />}>
            <MedicationInventory />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
