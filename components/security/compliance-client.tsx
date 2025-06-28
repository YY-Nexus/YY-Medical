"use client"

import { Suspense } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import { ComplianceManagement } from "@/components/security/compliance-management"

export default function ComplianceClient() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <ComplianceManagement />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
