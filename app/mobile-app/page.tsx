import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import MobileAppClient from "@/components/mobile-app/mobile-app-client"

export default function MobileAppPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">移动端应用</h1>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <MobileAppClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
