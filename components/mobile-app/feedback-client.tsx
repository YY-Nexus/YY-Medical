"use client"

import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import { MobileAppFeedback } from "@/components/mobile-app/mobile-app-feedback"

export default function MobileAppFeedbackClient() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <MobileAppFeedback />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
