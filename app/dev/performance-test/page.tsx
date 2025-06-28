import PerformanceDashboard from "@/components/dev/performance-dashboard"

export default function PerformanceTestPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">性能监控测试</h1>
      <PerformanceDashboard />
    </div>
  )
}
