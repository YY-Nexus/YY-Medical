import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import ScheduleClient from "@/components/teleconsultation/schedule-client"

export default function SchedulePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">会诊排程管理</h1>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <ScheduleClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
