import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import ComplianceClient from "@/components/security/compliance-client"

export default function CompliancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">合规管理</h1>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <ComplianceClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
