import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import TeleconsultationClient from "@/components/teleconsultation/teleconsultation-client"

export default function TeleconsultationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">远程会诊</h1>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <TeleconsultationClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
