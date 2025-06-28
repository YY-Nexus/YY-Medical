import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import RecordsClient from "@/components/teleconsultation/records-client"

export default function RecordsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">会诊记录</h1>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <RecordsClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
