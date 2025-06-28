import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import ResearchClient from "@/components/research/research-client"

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">医学研究中心</h1>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <ResearchClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
