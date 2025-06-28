"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Cloud,
  Server,
  Cpu,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Play,
  Pause,
} from "lucide-react"

// 模拟数据
const deployments = [
  {
    id: "dep-001",
    name: "生产环境",
    status: "running",
    model: "MediNexus-v3.2",
    version: "3.2.5",
    environment: "production",
    deployedAt: "2025-04-15 09:30:22",
    lastUpdated: "2025-05-10 14:22:45",
    metrics: {
      requests: 12450,
      avgResponseTime: 120,
      p95ResponseTime: 350,
      errorRate: 0.05,
      uptime: 99.98,
    },
  },
  {
    id: "dep-002",
    name: "测试环境",
    status: "running",
    model: "MediNexus-v3.3-beta",
    version: "3.3.0-beta.2",
    environment: "staging",
    deployedAt: "2025-05-05 11:15:30",
    lastUpdated: "2025-05-18 08:45:12",
    metrics: {
      requests: 3240,
      avgResponseTime: 115,
      p95ResponseTime: 320,
      errorRate: 0.08,
      uptime: 99.85,
    },
  },
  {
    id: "dep-003",
    name: "开发环境",
    status: "stopped",
    model: "MediNexus-v3.4-dev",
    version: "3.4.0-dev.5",
    environment: "development",
    deployedAt: "2025-05-12 15:40:18",
    lastUpdated: "2025-05-17 22:10:33",
    metrics: {
      requests: 850,
      avgResponseTime: 108,
      p95ResponseTime: 290,
      errorRate: 0.12,
      uptime: 98.75,
    },
  },
]

const modelVersions = [
  { id: "v-001", name: "MediNexus-v3.2", version: "3.2.5", status: "stable" },
  { id: "v-002", name: "MediNexus-v3.3-beta", version: "3.3.0-beta.2", status: "beta" },
  { id: "v-003", name: "MediNexus-v3.4-dev", version: "3.4.0-dev.5", status: "development" },
  { id: "v-004", name: "MediNexus-v3.1", version: "3.1.8", status: "deprecated" },
]

const environments = [
  { id: "env-001", name: "生产环境", type: "production", resources: { cpu: 8, memory: 32, gpu: 2 } },
  { id: "env-002", name: "测试环境", type: "staging", resources: { cpu: 4, memory: 16, gpu: 1 } },
  { id: "env-003", name: "开发环境", type: "development", resources: { cpu: 2, memory: 8, gpu: 1 } },
]

export function ModelDeployment() {
  const [activeTab, setActiveTab] = useState("deployments")
  const [selectedDeployment, setSelectedDeployment] = useState(deployments[0])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">模型部署</h2>
          <p className="text-muted-foreground">管理AI模型的部署环境和版本</p>
        </div>
        <Button>
          <Cloud className="mr-2 h-4 w-4" />
          新建部署
        </Button>
      </div>

      <Tabs defaultValue="deployments" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="deployments">当前部署</TabsTrigger>
          <TabsTrigger value="versions">模型版本</TabsTrigger>
          <TabsTrigger value="environments">部署环境</TabsTrigger>
          <TabsTrigger value="history">部署历史</TabsTrigger>
        </TabsList>

        <TabsContent value="deployments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {deployments.map((deployment) => (
              <Card
                key={deployment.id}
                className={`cursor-pointer hover:border-primary transition-colors ${
                  selectedDeployment.id === deployment.id ? "border-primary" : ""
                }`}
                onClick={() => setSelectedDeployment(deployment)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{deployment.name}</CardTitle>
                    {deployment.status === "running" ? (
                      <Badge className="bg-green-500">运行中</Badge>
                    ) : (
                      <Badge variant="outline" className="text-amber-500 border-amber-500">
                        已停止
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    {deployment.model} (v{deployment.version})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">环境:</span>
                      <span className="font-medium">
                        {deployment.environment === "production"
                          ? "生产"
                          : deployment.environment === "staging"
                            ? "测试"
                            : "开发"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">部署时间:</span>
                      <span className="font-medium">{deployment.deployedAt}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">请求数:</span>
                      <span className="font-medium">{deployment.metrics.requests.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">平均响应时间:</span>
                      <span className="font-medium">{deployment.metrics.avgResponseTime}ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">错误率:</span>
                      <span className="font-medium">{(deployment.metrics.errorRate * 100).toFixed(2)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedDeployment && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">{selectedDeployment.name} 详情</CardTitle>
                    <CardDescription>
                      {selectedDeployment.model} (v{selectedDeployment.version})
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {selectedDeployment.status === "running" ? (
                      <Button variant="outline" size="sm">
                        <Pause className="mr-2 h-4 w-4" />
                        停止
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        启动
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      重启
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      配置
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">请求数</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedDeployment.metrics.requests.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">过去30天</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">平均响应时间</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedDeployment.metrics.avgResponseTime}ms</div>
                      <p className="text-xs text-muted-foreground">过去24小时</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">错误率</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {(selectedDeployment.metrics.errorRate * 100).toFixed(2)}%
                      </div>
                      <p className="text-xs text-muted-foreground">过去24小时</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">可用性</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedDeployment.metrics.uptime}%</div>
                      <p className="text-xs text-muted-foreground">过去30天</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">性能监控</h3>
                  <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">性能监控图表</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">资源使用</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">CPU 使用率</span>
                        <span className="text-sm">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">内存使用率</span>
                        <span className="text-sm">48%</span>
                      </div>
                      <Progress value={48} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">GPU 使用率</span>
                        <span className="text-sm">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">部署日志</h3>
                  <Card className="bg-muted">
                    <CardContent className="p-4">
                      <pre className="text-xs overflow-auto max-h-[200px]">
                        [2025-05-19 08:15:22] INFO: 模型服务启动成功 [2025-05-19 08:15:23] INFO: 加载模型版本 v3.2.5
                        [2025-05-19 08:15:25] INFO: 初始化GPU加速 [2025-05-19 08:15:28] INFO: 模型服务就绪，开始接收请求
                        [2025-05-19 10:22:15] WARN: 检测到高负载，自动扩展实例数 [2025-05-19 12:45:33] INFO:
                        实例扩展完成，当前实例数: 3
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="versions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>模型版本管理</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    上传模型
                  </Button>
                  <Button size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    刷新
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        模型名称
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        版本
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        状态
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {modelVersions.map((model) => (
                      <tr key={model.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">{model.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{model.version}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {model.status === "stable" ? (
                            <Badge className="bg-green-500">稳定版</Badge>
                          ) : model.status === "beta" ? (
                            <Badge variant="outline" className="text-blue-500 border-blue-500">
                              测试版
                            </Badge>
                          ) : model.status === "development" ? (
                            <Badge variant="outline" className="text-amber-500 border-amber-500">
                              开发版
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-gray-500 border-gray-500">
                              已弃用
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm">
                            部署
                          </Button>
                          <Button variant="ghost" size="sm">
                            查看
                          </Button>
                          <Button variant="ghost" size="sm">
                            下载
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>部署环境管理</CardTitle>
                <Button size="sm">
                  <Server className="mr-2 h-4 w-4" />
                  添加环境
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {environments.map((env) => (
                  <Card key={env.id}>
                    <CardHeader>
                      <CardTitle>{env.name}</CardTitle>
                      <CardDescription>
                        {env.type === "production" ? "生产环境" : env.type === "staging" ? "测试环境" : "开发环境"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">CPU:</span>
                          <span className="font-medium">{env.resources.cpu} 核</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">内存:</span>
                          <span className="font-medium">{env.resources.memory} GB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">GPU:</span>
                          <span className="font-medium">{env.resources.gpu} 个</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="pt-2 flex justify-between">
                          <Button variant="outline" size="sm">
                            <Settings className="mr-2 h-4 w-4" />
                            配置
                          </Button>
                          <Button variant="outline" size="sm">
                            <Cpu className="mr-2 h-4 w-4" />
                            扩展
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>部署历史记录</CardTitle>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="选择环境" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有环境</SelectItem>
                      <SelectItem value="production">生产环境</SelectItem>
                      <SelectItem value="staging">测试环境</SelectItem>
                      <SelectItem value="development">开发环境</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        时间
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        模型
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        环境
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        状态
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        操作人
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">2025-05-18 14:22:45</td>
                      <td className="px-6 py-4 whitespace-nowrap">MediNexus-v3.2 (v3.2.5)</td>
                      <td className="px-6 py-4 whitespace-nowrap">生产环境</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                          <span>成功</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">张医生</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Button variant="ghost" size="sm">
                          查看日志
                        </Button>
                        <Button variant="ghost" size="sm">
                          回滚
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">2025-05-17 22:10:33</td>
                      <td className="px-6 py-4 whitespace-nowrap">MediNexus-v3.4-dev (v3.4.0-dev.5)</td>
                      <td className="px-6 py-4 whitespace-nowrap">开发环境</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                          <span>成功</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">李工程师</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Button variant="ghost" size="sm">
                          查看日志
                        </Button>
                        <Button variant="ghost" size="sm">
                          回滚
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">2025-05-15 09:45:12</td>
                      <td className="px-6 py-4 whitespace-nowrap">MediNexus-v3.3-beta (v3.3.0-beta.1)</td>
                      <td className="px-6 py-4 whitespace-nowrap">测试环境</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <AlertCircle className="text-red-500 mr-2 h-4 w-4" />
                          <span>失败</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">王研究员</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Button variant="ghost" size="sm">
                          查看日志
                        </Button>
                        <Button variant="ghost" size="sm">
                          重试
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">2025-05-12 15:40:18</td>
                      <td className="px-6 py-4 whitespace-nowrap">MediNexus-v3.4-dev (v3.4.0-dev.4)</td>
                      <td className="px-6 py-4 whitespace-nowrap">开发环境</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                          <span>成功</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">李工程师</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Button variant="ghost" size="sm">
                          查看日志
                        </Button>
                        <Button variant="ghost" size="sm">
                          回滚
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">2025-05-10 14:22:45</td>
                      <td className="px-6 py-4 whitespace-nowrap">MediNexus-v3.2 (v3.2.4)</td>
                      <td className="px-6 py-4 whitespace-nowrap">生产环境</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                          <span>成功</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">张医生</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Button variant="ghost" size="sm">
                          查看日志
                        </Button>
                        <Button variant="ghost" size="sm">
                          回滚
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
