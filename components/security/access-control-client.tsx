"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"

// 动态导入访问控制面板组件
const AccessControlPanel = dynamic(
  () => import("@/components/access-control-panel").then((mod) => ({ default: mod.AccessControlPanel })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

export default function AccessControlClient() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <AccessControlPanel />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
