import type { Metadata } from "next"
import { PageBreadcrumb } from "@/components/layout/page-breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MedicalButton } from "@/components/ui/medical-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "布局演示",
  description: "统一布局系统演示",
}

export default function LayoutDemoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">统一布局演示</h1>
          <PageBreadcrumb className="mt-2" />
        </div>
        <MedicalButton>新建项目</MedicalButton>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="components">组件</TabsTrigger>
          <TabsTrigger value="responsive">响应式设计</TabsTrigger>
          <TabsTrigger value="navigation">导航体系</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>统一布局系统介绍</CardTitle>
              <CardDescription>全新的布局系统为燕鱼医疗平台提供统一一致的用户体验</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>本系统采用了现代化的组件架构，确保各模块之间的一致性和灵活性，同时针对医疗场景进行了专门优化。</p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">响应式设计</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">完全适配各种尺寸的设备，从手机到大屏显示器</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">深色模式支持</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">内置深色模式支持，减轻长时间使用的视觉疲劳</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">键盘快捷键</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">全面的键盘快捷键支持，提高操作效率</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>特性一览</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">可折叠侧边栏</span>
                    <Badge>已实现</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">统一顶部导航</span>
                    <Badge>已实现</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">面包屑导航</span>
                    <Badge>已实现</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">深色模式支持</span>
                    <Badge>已实现</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">键盘快捷键</span>
                    <Badge>已实现</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">响应式设计</span>
                    <Badge>已实现</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">多语言支持</span>
                    <Badge variant="outline">开发中</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>使用指南</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">只需按照以下步骤，即可在任何页面中使用统一布局系统:</p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>页面已自动应用布局，无需额外包装</li>
                  <li>
                    在页面顶部添加 <code className="bg-muted px-1 py-0.5 rounded">PageBreadcrumb</code> 组件
                  </li>
                  <li>使用统一的UI组件和样式</li>
                  <li>按Alt+S可以切换侧边栏折叠状态</li>
                  <li>按Ctrl+K或Alt+K可以使用键盘快捷键</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="components" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>布局组件体系</CardTitle>
              <CardDescription>统一布局系统包含以下核心组件</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">AppShell</h3>
                    <p className="text-sm text-muted-foreground">整体布局容器，负责协调各组件并处理布局逻辑</p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">AppHeader</h3>
                    <p className="text-sm text-muted-foreground">顶部导航栏，包含logo、搜索框、通知中心和用户菜单</p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">SidebarNav</h3>
                    <p className="text-sm text-muted-foreground">侧边导航栏，支持折叠/展开，包含分组和工具提示</p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">PageBreadcrumb</h3>
                    <p className="text-sm text-muted-foreground">面包屑导航，自动根据路径生成或手动指定</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responsive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>响应式布局说明</CardTitle>
              <CardDescription>统一布局系统在各种设备尺寸下的表现</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">移动设备 (小于 768px)</h3>
                  <p className="text-sm text-muted-foreground">
                    - 侧边栏默认隐藏，可通过菜单按钮打开
                    <br />- 搜索框收起为图标，点击展开
                    <br />- 内容区域垂直排列
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">平板设备 (768px - 1024px)</h3>
                  <p className="text-sm text-muted-foreground">
                    - 侧边栏可使用，默认折叠为图标模式
                    <br />- 搜索框常驻显示
                    <br />- 内容区域部分适应网格布局
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">桌面设备 (大于 1024px)</h3>
                  <p className="text-sm text-muted-foreground">
                    - 侧边栏默认展开，显示完整菜单
                    <br />- 所有功能完全显示
                    <br />- 内容区域使用多列网格布局
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>导航体系说明</CardTitle>
              <CardDescription>统一布局系统的导航结构和原则</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>导航体系采用了分层结构，确保用户在复杂的医疗系统中能够高效定位所需功能：</p>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">一级导航 (顶层模块)</h3>
                  <p className="text-sm text-muted-foreground">
                    通过侧边栏一级菜单访问，如"智能诊断"、"患者管理"等主要功能模块
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">二级导航 (功能组)</h3>
                  <p className="text-sm text-muted-foreground">
                    侧边栏子菜单，如"智能诊断"下的"诊断中心"、"模型管理"等
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">三级导航 (页内导航)</h3>
                  <p className="text-sm text-muted-foreground">
                    通过页面内的选项卡、分段控件等实现，如诊断中心内的不同类型诊断
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">辅助导航</h3>
                  <p className="text-sm text-muted-foreground">
                    面包屑、搜索功能、最近访问、快捷入口等帮助用户快速定位
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
