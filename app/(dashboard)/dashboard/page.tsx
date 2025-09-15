import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, Brain, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "控制台 | 言语云³",
  description: "医疗AI系统控制台概览",
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">控制台</h1>
        <p className="text-muted-foreground">欢迎使用言语云³医疗AI系统，这里是您的工作概览。</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总患者数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+20.1% 较上月</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI诊断次数</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+15.3% 较上月</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+201 较昨日</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">诊断准确率</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">+0.2% 较上月</p>
          </CardContent>
        </Card>
      </div>

      {/* 快速操作 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>最近患者</CardTitle>
            <CardDescription>查看最近添加的患者信息</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">张三 - 刚刚</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">李四 - 5分钟前</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">王五 - 10分钟前</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>待处理任务</CardTitle>
            <CardDescription>需要您关注的待处理事项</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">AI诊断审核</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">患者随访</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">7</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">报告生成</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">2</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>系统状态</CardTitle>
            <CardDescription>系统运行状态监控</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">AI服务</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">正常</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">数据库</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">正常</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">存储</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">警告</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
