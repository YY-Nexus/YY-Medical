"use client"

import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import { MobileAppReleases } from "@/components/mobile-app/mobile-app-releases"

export default function MobileAppReleasesClient() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <MobileAppReleases />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
