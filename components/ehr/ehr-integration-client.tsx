"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { EHRIntegrationStatus } from "@/components/ehr-integration-status"

// 动态导入可能使用浏览器API的组件
const EHRDashboard = dynamic(
  () => import("@/components/ehr-dashboard").then((mod) => ({ default: mod.EHRDashboard })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

const EHRDataMapping = dynamic(
  () => import("@/components/ehr-data-mapping").then((mod) => ({ default: mod.EHRDataMapping })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

export default function EHRIntegrationClient() {
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" onClick={() => router.push("/ehr-integration")}>
              集成概览
            </TabsTrigger>
            <TabsTrigger value="mapping" onClick={() => router.push("/ehr-integration/mapping")}>
              数据映射
            </TabsTrigger>
            <TabsTrigger value="sync" onClick={() => router.push("/ehr-integration/sync")}>
              同步状态
            </TabsTrigger>
            <TabsTrigger value="connections" onClick={() => router.push("/ehr-integration/connections")}>
              系统连接
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className="mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">电子病历集成概览</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                onClick={() => router.push("/ehr-integration/mapping")}
              >
                <span className="text-lg font-medium">数据映射</span>
                <span className="text-sm text-muted-foreground">配置字段映射关系</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                onClick={() => router.push("/ehr-integration/sync")}
              >
                <span className="text-lg font-medium">同步状态</span>
                <span className="text-sm text-muted-foreground">监控数据同步进度</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                onClick={() => router.push("/ehr-integration/connections")}
              >
                <span className="text-lg font-medium">系统连接</span>
                <span className="text-sm text-muted-foreground">管理外部系统连接</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                onClick={() => router.push("/ehr-integration/settings")}
              >
                <span className="text-lg font-medium">集成设置</span>
                <span className="text-sm text-muted-foreground">配置集成参数</span>
              </Button>
            </div>
          </div>
        </Card>

        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <EHRDashboard />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">系统连接</h2>
        <EHRIntegrationStatus />
      </div>
    </div>
  )
}
