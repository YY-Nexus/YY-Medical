import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { PatientDetails } from "@/components/patients/patient-details"
import { MedicalButton } from "@/components/ui/medical-button"
import { ChevronLeft, Edit, MessageSquare, Printer, Share } from "lucide-react"
import Link from "next/link"

export default function PatientDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/patients">
            <MedicalButton variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </MedicalButton>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-medical-800">患者详情</h1>
        </div>

        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <MedicalButton variant="outline" size="sm" className="text-medical-700">
            <Printer className="mr-1 h-4 w-4" />
            打印
          </MedicalButton>
          <MedicalButton variant="outline" size="sm" className="text-medical-700">
            <Share className="mr-1 h-4 w-4" />
            分享
          </MedicalButton>
          <MedicalButton variant="outline" size="sm" className="text-medical-700">
            <MessageSquare className="mr-1 h-4 w-4" />
            发送消息
          </MedicalButton>
          <MedicalButton size="sm" className="bg-medical-gradient text-white">
            <Edit className="mr-1 h-4 w-4" />
            编辑
          </MedicalButton>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="p-8 flex justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <PatientDetails patientId={params.id} />
      </Suspense>
    </div>
  )
}
