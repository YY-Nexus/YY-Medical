import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import MobileAppReleasesClient from "@/components/mobile-app/releases-client"

export default function MobileAppReleasesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">版本发布</h1>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <MobileAppReleasesClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
