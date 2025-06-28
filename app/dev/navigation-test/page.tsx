import { NavigationTester } from "@/components/dev/navigation-tester"

export const metadata = {
  title: "导航测试 - 医枢³开发工具",
  description: "测试医枢³系统的导航链接和侧边栏功能",
}

export default function NavigationTestPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">导航测试工具</h1>
      <NavigationTester />
    </div>
  )
}
