"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"

// 动态导入移动应用功能组件
const MobileAppFeatures = dynamic(
  () => import("@/components/mobile-app-features").then((mod) => ({ default: mod.MobileAppFeatures })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

export default function MobileAppFeaturesClient() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <MobileAppFeatures />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
