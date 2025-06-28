import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import MobileAppFeaturesClient from "@/components/mobile-app/features-client"

export default function MobileAppFeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">移动应用功能管理</h1>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <MobileAppFeaturesClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
