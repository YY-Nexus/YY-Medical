import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import MobileAppFeedbackClient from "@/components/mobile-app/feedback-client"

export default function MobileAppFeedbackPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">用户反馈</h1>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <MobileAppFeedbackClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
