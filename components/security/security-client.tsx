"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import { AccessControlPanel } from "@/components/access-control-panel"

// 动态导入可能使用浏览器API的组件
const SecurityDashboard = dynamic(
  () => import("@/components/security-dashboard").then((mod) => ({ default: mod.SecurityDashboard })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

const AuditLogViewer = dynamic(
  () => import("@/components/audit-log-viewer").then((mod) => ({ default: mod.AuditLogViewer })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

export default function SecurityClient() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h2 className="text-xl font-semibold mb-4">安全状态概览</h2>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <SecurityDashboard />
          </Suspense>
        </ErrorBoundary>

        <h2 className="text-xl font-semibold mt-8 mb-4">审计日志</h2>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <AuditLogViewer />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">访问控制</h2>
        <AccessControlPanel />
      </div>
    </div>
  )
}
