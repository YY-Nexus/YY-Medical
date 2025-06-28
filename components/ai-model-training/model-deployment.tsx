"use client"

import { Slider } from "@/components/ui/slider"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Cloud,
  Server,
  Globe,
  Cpu,
  HardDrive,
  BarChart,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ArrowUpDown,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download,
} from "lucide-react"

// 模拟部署环境数据
const deploymentEnvironments = [
  {
    id: "env-001",
    name: "生产环境",
    type: "production",
    status: "active",
    url: "https://api.medinexus.ai/prod",
    resources: { cpu: "8 vCPU", memory: "32GB", gpu: "2x NVIDIA T4" },
    scaling: { min: 2, max: 8, current: 3 },
    lastDeployed: "2023-11-10 14:30",
    metrics: { uptime: "99.98%", latency: "180ms", throughput: "45/分钟" },
  },
  {
    id: "env-002",
    name: "预发布环境",
    type: "staging",
    status: "active",
    url: "https://api.medinexus.ai/staging",
    resources: { cpu: "4 vCPU", memory: "16GB", gpu: "1x NVIDIA T4" },
    scaling: { min: 1, max: 4, current: 1 },
    lastDeployed: "2023-11-12 09:15",
    metrics: { uptime: "99.95%", latency: "210ms", throughput: "20/分钟" },
  },
  {
    id: "env-003",
    name: "测试环境",
    type: "testing",
    status: "active",
    url: "https://api.medinexus.ai/test",
    resources: { cpu: "2 vCPU", memory: "8GB", gpu: "1x NVIDIA T4" },
    scaling: { min: 1, max: 2, current: 1 },
    lastDeployed: "2023-11-14 16:45",
    metrics: { uptime: "99.90%", latency: "250ms", throughput: "10/分钟" },
  },
]

// 模拟模型版本数据
const modelVersions = [
  {
    id: "model-v2.1",
    version: "v2.1",
    name: "肺部CT分析模型",
    status: "production",
    accuracy: 0.94,
    trainedDate: "2023-11-05",
    size: "2.8GB",
    framework: "PyTorch 2.0",
    deployments: ["env-001", "env-002"],
  },
  {
    id: "model-v2.0",
    version: "v2.0",
    name: "肺部CT分析模型",
    status: "archived",
    accuracy: 0.92,
    trainedDate: "2023-10-15",
    size: "2.7GB",
    framework: "PyTorch 2.0",
    deployments: ["env-003"],
  },
  {
    id: "model-v1.9",
    version: "v1.9",
    name: "肺部CT分析模型",
    status: "archived",
    accuracy: 0.89,
    trainedDate: "2023-09-20",
    size: "2.5GB",
    framework: "PyTorch 1.13",
    deployments: [],
  },
]

// 模拟部署历史数据
const deploymentHistory = [
  {
    id: "deploy-001",
    modelVersion: "v2.1",
    environment: "生产环境",
    status: "success",
    deployedBy: "张医生",
    deployedAt: "2023-11-10 14:30",
    duration: "8分钟",
    notes: "正式发布肺部CT分析模型v2.1",
  },
  {
    id: "deploy-002",
    modelVersion: "v2.1",
    environment: "预发布环境",
    status: "success",
    deployedBy: "张医生",
    deployedAt: "2023-11-08 10:15",
    duration: "6分钟",
    notes: "预发布测试肺部CT分析模型v2.1",
  },
  {
    id: "deploy-003",
    modelVersion: "v2.0",
    environment: "测试环境",
    status: "success",
    deployedBy: "李医生",
    deployedAt: "2023-10-18 09:30",
    duration: "5分钟",
    notes: "部署v2.0版本进行测试",
  },
  {
    id: "deploy-004",
    modelVersion: "v2.0",
    environment: "生产环境",
    status: "failed",
    deployedBy: "李医生",
    deployedAt: "2023-10-17 16:45",
    duration: "12分钟",
    notes: "部署失败，GPU资源不足",
  },
]

export function ModelDeployment() {
  const [activeTab, setActiveTab] = useState("environments")
  const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>(null)
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployProgress, setDeployProgress] = useState(0)
  const [showNewEnvironment, setShowNewEnvironment] = useState(false)
  const [deploymentNotes, setDeploymentNotes] = useState("")

  // 处理部署操作
  const handleDeploy = () => {
    if (!selectedEnvironment || !selectedVersion) return

    setIsDeploying(true)
    setDeployProgress(0)

    // 模拟部署进度
    const interval = setInterval(() => {
      setDeployProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDeploying(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  // 获取环境状态徽章
  const getEnvironmentStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> 运行中
          </Badge>
        )
      case "updating":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3" /> 更新中
          </Badge>
        )
      case "stopped":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Pause className="h-3 w-3" /> 已停止
          </Badge>
        )
      case "error":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> 错误
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // 获取模型版本状态徽章
  const getModelStatusBadge = (status: string) => {
    switch (status) {
      case "production":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> 生产中
          </Badge>
        )
      case "staging":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> 预发布
          </Badge>
        )
      case "testing":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <BarChart className="h-3 w-3" /> 测试中
          </Badge>
        )
      case "archived":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <HardDrive className="h-3 w-3" /> 已归档
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // 获取部署历史状态徽章
  const getDeploymentHistoryBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> 成功
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> 失败
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3" className="animate-spin" /> 进行中
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // 获取环境类型图标
  const getEnvironmentTypeIcon = (type: string) => {
    switch (type) {
      case "production":
        return <Globe className="h-5 w-5 text-green-500" />
      case "staging":
        return <Cloud className="h-5 w-5 text-blue-500" />
      case "testing":
        return <Server className="h-5 w-5 text-purple-500" />
      default:
        return <Server className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">模型部署</CardTitle>
              <CardDescription>管理AI模型的部署环境和版本</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowNewEnvironment(true)} className="flex items-center gap-1">
                <Server className="h-4 w-4" />
                添加环境
              </Button>
              <Button
                className="bg-medical-600 hover:bg-medical-700 flex items-center gap-1"
                onClick={handleDeploy}
                disabled={!selectedEnvironment || !selectedVersion || isDeploying}
              >
                {isDeploying ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    部署中...
                  </>
                ) : (
                  <>
                    <ArrowUpDown className="h-4 w-4" />
                    部署模型
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isDeploying && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-blue-700">正在部署模型...</h3>
                <span className="text-sm text-blue-600">{deployProgress}%</span>
              </div>
              <Progress value={deployProgress} className="h-2" />
              <p className="mt-2 text-sm text-blue-600">正在将 肺部CT分析模型 v2.1 部署到 生产环境，请稍候...</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">部署环境</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-medical-700">{deploymentEnvironments.length}</div>
                  <div className="flex gap-1">
                    <Badge variant="success" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> 全部在线
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">已部署模型</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-medical-700">
                    {modelVersions.filter((v) => v.deployments.length > 0).length}
                  </div>
                  <div className="text-sm text-gray-500">共 {modelVersions.length} 个版本</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">最近部署</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-xl font-bold text-medical-700">{deploymentHistory[0].modelVersion}</div>
                  <div className="text-sm text-gray-500">{deploymentHistory[0].deployedAt}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="environments" className="flex items-center gap-1">
                <Server className="h-4 w-4" />
                部署环境
              </TabsTrigger>
              <TabsTrigger value="versions" className="flex items-center gap-1">
                <HardDrive className="h-4 w-4" />
                模型版本
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                部署历史
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                部署设置
              </TabsTrigger>
            </TabsList>

            <TabsContent value="environments" className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {deploymentEnvironments.map((env) => (
                  <Card
                    key={env.id}
                    className={`overflow-hidden ${selectedEnvironment === env.id ? "ring-2 ring-medical-500" : ""}`}
                    onClick={() => setSelectedEnvironment(env.id)}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {getEnvironmentTypeIcon(env.type)}
                            <h3 className="text-lg font-medium">{env.name}</h3>
                          </div>
                          {getEnvironmentStatusBadge(env.status)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <Label className="text-xs text-gray-500">API端点</Label>
                            <div className="font-mono text-xs">{env.url}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">资源配置</Label>
                            <div>
                              {env.resources.cpu}, {env.resources.memory}
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">GPU</Label>
                            <div>{env.resources.gpu}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">实例数</Label>
                            <div>
                              {env.scaling.current} (最小: {env.scaling.min}, 最大: {env.scaling.max})
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">最近部署</Label>
                            <div>{env.lastDeployed}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">可用性</Label>
                            <div className="text-green-600 font-medium">{env.metrics.uptime}</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-6 flex flex-row md:flex-col justify-between items-center md:w-48">
                        <div className="flex flex-col items-center mb-4">
                          <div className="text-3xl font-bold text-medical-600">{env.metrics.latency}</div>
                          <div className="text-xs text-gray-500">平均响应时间</div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                            <BarChart className="h-3.5 w-3.5 mr-1" />
                            查看监控
                          </Button>
                          <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                            <Settings className="h-3.5 w-3.5 mr-1" />
                            配置环境
                          </Button>
                          <Button
                            variant={env.status === "active" ? "outline" : "default"}
                            size="sm"
                            className={`w-full flex items-center justify-center ${
                              env.status === "active" ? "" : "bg-medical-600 hover:bg-medical-700"
                            }`}
                          >
                            {env.status === "active" ? (
                              <>
                                <Pause className="h-3.5 w-3.5 mr-1" />
                                停止环境
                              </>
                            ) : (
                              <>
                                <Play className="h-3.5 w-3.5 mr-1" />
                                启动环境
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {showNewEnvironment && (
                <Card>
                  <CardHeader>
                    <CardTitle>添加新环境</CardTitle>
                    <CardDescription>配置新的模型部署环境</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="env-name">环境名称</Label>
                          <Input id="env-name" placeholder="输入环境名称" />
                        </div>
                        <div>
                          <Label htmlFor="env-type">环境类型</Label>
                          <Select>
                            <SelectTrigger id="env-type">
                              <SelectValue placeholder="选择环境类型" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="production">生产环境</SelectItem>
                              <SelectItem value="staging">预发布环境</SelectItem>
                              <SelectItem value="testing">测试环境</SelectItem>
                              <SelectItem value="development">开发环境</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="env-url">API端点</Label>
                          <Input id="env-url" placeholder="https://api.example.com/v1" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="env-cpu">CPU资源</Label>
                          <Select>
                            <SelectTrigger id="env-cpu">
                              <SelectValue placeholder="选择CPU配置" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2vcpu">2 vCPU</SelectItem>
                              <SelectItem value="4vcpu">4 vCPU</SelectItem>
                              <SelectItem value="8vcpu">8 vCPU</SelectItem>
                              <SelectItem value="16vcpu">16 vCPU</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="env-memory">内存资源</Label>
                          <Select>
                            <SelectTrigger id="env-memory">
                              <SelectValue placeholder="选择内存配置" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="8gb">8 GB</SelectItem>
                              <SelectItem value="16gb">16 GB</SelectItem>
                              <SelectItem value="32gb">32 GB</SelectItem>
                              <SelectItem value="64gb">64 GB</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="env-gpu">GPU资源</Label>
                          <Select>
                            <SelectTrigger id="env-gpu">
                              <SelectValue placeholder="选择GPU配置" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">无GPU</SelectItem>
                              <SelectItem value="1xt4">1x NVIDIA T4</SelectItem>
                              <SelectItem value="2xt4">2x NVIDIA T4</SelectItem>
                              <SelectItem value="1xv100">1x NVIDIA V100</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div>
                        <Label>自动扩缩容设置</Label>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                          <div>
                            <Label htmlFor="min-instances" className="text-xs">
                              最小实例数
                            </Label>
                            <Input id="min-instances" type="number" min="1" defaultValue="1" />
                          </div>
                          <div>
                            <Label htmlFor="max-instances" className="text-xs">
                              最大实例数
                            </Label>
                            <Input id="max-instances" type="number" min="1" defaultValue="4" />
                          </div>
                          <div>
                            <Label htmlFor="target-cpu" className="text-xs">
                              目标CPU使用率
                            </Label>
                            <Input id="target-cpu" type="number" min="1" max="100" defaultValue="70" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label>高级设置</Label>
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center space-x-2">
                            <Switch id="auto-deploy" />
                            <Label htmlFor="auto-deploy" className="text-sm">
                              启用自动部署
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="ssl" defaultChecked />
                            <Label htmlFor="ssl" className="text-sm">
                              启用SSL加密
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="monitoring" defaultChecked />
                            <Label htmlFor="monitoring" className="text-sm">
                              启用监控和告警
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowNewEnvironment(false)}>
                      取消
                    </Button>
                    <Button className="bg-medical-600 hover:bg-medical-700">创建环境</Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="versions" className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {modelVersions.map((model) => (
                  <Card
                    key={model.id}
                    className={`overflow-hidden ${selectedVersion === model.id ? "ring-2 ring-medical-500" : ""}`}
                    onClick={() => setSelectedVersion(model.id)}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Cpu className="h-5 w-5 text-medical-600" />
                            <h3 className="text-lg font-medium">
                              {model.name} {model.version}
                            </h3>
                          </div>
                          {getModelStatusBadge(model.status)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <Label className="text-xs text-gray-500">准确率</Label>
                            <div className="text-medical-600 font-medium">{(model.accuracy * 100).toFixed(1)}%</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">训练日期</Label>
                            <div>{model.trainedDate}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">模型大小</Label>
                            <div>{model.size}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">框架</Label>
                            <div>{model.framework}</div>
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-xs text-gray-500">已部署环境</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {model.deployments.length > 0 ? (
                                model.deployments.map((envId) => {
                                  const env = deploymentEnvironments.find((e) => e.id === envId)
                                  return env ? (
                                    <Badge key={envId} variant="outline" className="bg-blue-50">
                                      {env.name}
                                    </Badge>
                                  ) : null
                                })
                              ) : (
                                <span className="text-gray-500">未部署</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-6 flex flex-row md:flex-col justify-between items-center md:w-48">
                        <div className="flex flex-col items-center mb-4">
                          <div className="text-3xl font-bold text-medical-600">{model.version}</div>
                          <div className="text-xs text-gray-500">版本号</div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                            <BarChart className="h-3.5 w-3.5 mr-1" />
                            性能分析
                          </Button>
                          <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                            <Download className="h-3.5 w-3.5 mr-1" />
                            下载模型
                          </Button>
                          {model.status !== "production" && (
                            <Button
                              size="sm"
                              className="w-full bg-medical-600 hover:bg-medical-700 flex items-center justify-center"
                            >
                              <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
                              部署模型
                            </Button>
                          )}
                          {model.status === "production" && (
                            <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                              <RotateCcw className="h-3.5 w-3.5 mr-1" />
                              回滚版本
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>部署历史记录</CardTitle>
                  <CardDescription>查看模型部署的历史记录和状态</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 bg-slate-50 p-3 text-sm font-medium">
                      <div className="col-span-2">模型版本</div>
                      <div className="col-span-2">部署环境</div>
                      <div className="col-span-1">状态</div>
                      <div className="col-span-2">部署人员</div>
                      <div className="col-span-2">部署时间</div>
                      <div className="col-span-1">耗时</div>
                      <div className="col-span-2">操作</div>
                    </div>
                    <div className="divide-y">
                      {deploymentHistory.map((history) => (
                        <div key={history.id} className="grid grid-cols-12 p-3 text-sm items-center">
                          <div className="col-span-2 font-medium">{history.modelVersion}</div>
                          <div className="col-span-2">{history.environment}</div>
                          <div className="col-span-1">{getDeploymentHistoryBadge(history.status)}</div>
                          <div className="col-span-2">{history.deployedBy}</div>
                          <div className="col-span-2">{history.deployedAt}</div>
                          <div className="col-span-1">{history.duration}</div>
                          <div className="col-span-2">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                详情
                              </Button>
                              {history.status === "failed" && (
                                <Button variant="outline" size="sm">
                                  重试
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>部署设置</CardTitle>
                  <CardDescription>配置模型部署的全局设置</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">自动部署设置</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="auto-deploy-new" className="text-base">
                              自动部署新模型
                            </Label>
                            <p className="text-sm text-gray-500">新训练的模型自动部署到测试环境</p>
                          </div>
                          <Switch id="auto-deploy-new" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="auto-promote" className="text-base">
                              自动提升模型
                            </Label>
                            <p className="text-sm text-gray-500">测试通过的模型自动提升到预发布环境</p>
                          </div>
                          <Switch id="auto-promote" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="require-approval" className="text-base">
                              生产环境需要审批
                            </Label>
                            <p className="text-sm text-gray-500">部署到生产环境需要管理员审批</p>
                          </div>
                          <Switch id="require-approval" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">部署策略</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="deployment-strategy">部署策略</Label>
                          <Select defaultValue="blue-green">
                            <SelectTrigger id="deployment-strategy">
                              <SelectValue placeholder="选择部署策略" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rolling">滚动更新</SelectItem>
                              <SelectItem value="blue-green">蓝绿部署</SelectItem>
                              <SelectItem value="canary">金丝雀发布</SelectItem>
                              <SelectItem value="recreate">重建策略</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="canary-percentage">金丝雀流量百分比</Label>
                          <div className="flex items-center gap-2">
                            <Slider id="canary-percentage" defaultValue={[10]} max={50} step={5} className="flex-1" />
                            <span className="w-12 text-center">10%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="auto-rollback" className="text-base">
                              自动回滚
                            </Label>
                            <p className="text-sm text-gray-500">部署失败时自动回滚到上一个稳定版本</p>
                          </div>
                          <Switch id="auto-rollback" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">安全设置</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="vulnerability-scan" className="text-base">
                              部署前漏洞扫描
                            </Label>
                            <p className="text-sm text-gray-500">部署前进行安全漏洞扫描</p>
                          </div>
                          <Switch id="vulnerability-scan" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="model-encryption" className="text-base">
                              模型加密
                            </Label>
                            <p className="text-sm text-gray-500">对部署的模型进行加密保护</p>
                          </div>
                          <Switch id="model-encryption" defaultChecked />
                        </div>
                        <div>
                          <Label htmlFor="access-control">访问控制</Label>
                          <Select defaultValue="role-based">
                            <SelectTrigger id="access-control">
                              <SelectValue placeholder="选择访问控制方式" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="role-based">基于角色的访问控制</SelectItem>
                              <SelectItem value="attribute-based">基于属性的访问控制</SelectItem>
                              <SelectItem value="ip-based">基于IP的访问控制</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">重置为默认值</Button>
                  <Button className="bg-medical-600 hover:bg-medical-700">保存设置</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t pt-6">
          {selectedEnvironment && selectedVersion ? (
            <div className="w-full p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">部署配置</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="deploy-env" className="text-sm text-blue-700">
                    部署环境
                  </Label>
                  <div className="font-medium text-blue-900">
                    {deploymentEnvironments.find((e) => e.id === selectedEnvironment)?.name || "未选择环境"}
                  </div>
                </div>
                <div>
                  <Label htmlFor="deploy-model" className="text-sm text-blue-700">
                    模型版本
                  </Label>
                  <div className="font-medium text-blue-900">
                    {modelVersions.find((m) => m.id === selectedVersion)?.name}{" "}
                    {modelVersions.find((m) => m.id === selectedVersion)?.version || "未选择模型"}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="deploy-notes" className="text-sm text-blue-700">
                    部署说明
                  </Label>
                  <Textarea
                    id="deploy-notes"
                    placeholder="输入部署说明或备注"
                    className="bg-white"
                    value={deploymentNotes}
                    onChange={(e) => setDeploymentNotes(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedEnvironment(null)
                    setSelectedVersion(null)
                  }}
                >
                  取消
                </Button>
                <Button className="bg-medical-600 hover:bg-medical-700" onClick={handleDeploy} disabled={isDeploying}>
                  {isDeploying ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                      部署中...
                    </>
                  ) : (
                    <>
                      <ArrowUpDown className="h-4 w-4 mr-1" />
                      开始部署
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full text-center text-gray-500">请选择部署环境和模型版本以继续</div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
