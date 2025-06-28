import { NavigationTester } from "@/components/navigation-tester"
import { Card3d, Card3dContent, Card3dHeader, Card3dTitle } from "@/components/ui/3d-card"
import { PageTransition } from "@/components/ui/page-transition"

export default function NavigationTestPage() {
  return (
    <PageTransition>
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-medical-800 mb-6">导航链接测试</h1>

        <div className="grid grid-cols-1 gap-6">
          <Card3d>
            <Card3dHeader>
              <Card3dTitle>关于导航测试</Card3dTitle>
            </Card3dHeader>
            <Card3dContent>
              <p className="text-medical-700">
                此页面用于测试MediNexus³系统中的所有导航链接，确保它们能正常工作。测试工具将检查每个链接，并提供详细的测试结果。
              </p>
            </Card3dContent>
          </Card3d>

          <NavigationTester />
        </div>
      </div>
    </PageTransition>
  )
}
