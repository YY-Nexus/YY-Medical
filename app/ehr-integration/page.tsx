import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import EHRIntegrationClient from "@/components/ehr/ehr-integration-client"

export default function EHRIntegrationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">电子病历系统集成</h1>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <EHRIntegrationClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
