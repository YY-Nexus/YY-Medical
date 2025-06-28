"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import { MobileAppFeatures } from "@/components/mobile-app-features"

// 动态导入可能使用浏览器API的组件
const MobileAppPreview = dynamic(
  () => import("@/components/mobile-app-preview").then((mod) => ({ default: mod.MobileAppPreview })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

const MobileAppScreenshots = dynamic(
  () => import("@/components/mobile-app-screenshots").then((mod) => ({ default: mod.MobileAppScreenshots })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

export default function MobileAppClient() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h2 className="text-xl font-semibold mb-4">应用预览</h2>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <MobileAppPreview />
          </Suspense>
        </ErrorBoundary>

        <h2 className="text-xl font-semibold mt-8 mb-4">应用截图</h2>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <MobileAppScreenshots />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">功能列表</h2>
        <MobileAppFeatures />
      </div>
    </div>
  )
}
