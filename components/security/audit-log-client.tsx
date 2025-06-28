"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"

// 动态导入审计日志查看器组件
const AuditLogViewer = dynamic(
  () => import("@/components/audit-log-viewer").then((mod) => ({ default: mod.AuditLogViewer })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

export default function AuditLogClient() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <AuditLogViewer />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
