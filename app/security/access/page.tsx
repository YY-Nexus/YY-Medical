import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import AccessControlClient from "@/components/security/access-control-client"

export default function AccessControlPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">访问控制</h1>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <AccessControlClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
