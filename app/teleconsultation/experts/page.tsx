import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import ExpertsClient from "@/components/teleconsultation/experts-client"

export default function ExpertsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">专家网络</h1>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <ExpertsClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
