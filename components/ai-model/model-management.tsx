"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Brain,
  Search,
  Plus,
  Settings,
  BarChart,
  Activity,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  RefreshCw,
  History,
  Layers,
  Bell,
  ArrowUpDown,
} from "lucide-react"
import { ModelVersionHistory } from "./model-version-history"
import { ModelDeployment } from "./model-deployment"
import { ModelMonitoring } from "./model-monitoring"

// 模拟模型数据
const mockModels = [
  {
    id: "model-001",
    name: "肺部CT分析模型",
    version: "2.3.0",
    type: "影像分析",
    status: "active",
    accuracy: 0.94,
    lastUpdated: "2023-11-15",
    deployedAt: "2023-11-16",
    description: "用于肺部CT影像的病变检测和分类，支持肺结节、肺炎和肺气肿的识别。",
    versions: [
      { version: "2.3.0", date: "2023-11-15", status: "active", accuracy: 0.94 },
      { version: "2.2.1", date: "2023-10-05", status: "archived", accuracy: 0.92 },
      { version: "2.1.0", date: "2023-08-20", status: "archived", accuracy: 0.89 },
    ],
    metrics: {
      responseTime: "1.2s",
      throughput: "45/分钟",
      errorRate: "0.5%",
      lastIncident: "2023-10-28",
    },
    alerts: [
      { id: "alert-001", type: "performance", message: "响应时间超过阈值", severity: "warning", date: "2023-11-10" },
    ],
  },
  {
    id: "model-002",
    name: "心电图异常检测",
    version: "1.8.5",
    type: "信号分析",
    status: "active",
    accuracy: 0.91,
    lastUpdated: "2023-10-22",
    deployedAt: "2023-10-25",
    description: "分析心电图数据，检测心律失常、心肌梗死和其他心脏异常。",
    versions: [
      { version: "1.8.5", date: "2023-10-22", status: "active", accuracy: 0.91 },
      { version: "1.8.0", date: "2023-09-15", status: "archived", accuracy: 0.9 },
      { version: "1.7.2", date: "2023-08-01", status: "archived", accuracy: 0.88 },
    ],
    metrics: {
      responseTime: "0.8s",
      throughput: "60/分钟",
      errorRate: "0.3%",
      lastIncident: "2023-09-15",
    },
    alerts: [],
  },
  {
    id: "model-003",
    name: "皮肤病变分类",
    version: "3.1.2",
    type: "影像分析",
    status: "maintenance",
    accuracy: 0.89,
    lastUpdated: "2023-09-18",
    deployedAt: "2023-09-20",
    description: "对皮肤病变图像进行分类，可识别多种皮肤癌和常见皮肤病。",
    versions: [
      { version: "3.1.2", date: "2023-09-18", status: "maintenance", accuracy: 0.89 },
      { version: "3.1.0", date: "2023-08-05", status: "archived", accuracy: 0.87 },
      { version: "3.0.0", date: "2023-06-20", status: "archived", accuracy: 0.85 },
    ],
    metrics: {
      responseTime: "1.5s",
      throughput: "30/分钟",
      errorRate: "1.2%",
      lastIncident: "2023-11-05",
    },
    alerts: [{ id: "alert-002", type: "error", message: "错误率超过1%", severity: "critical", date: "2023-11-05" }],
  },
  {
    id: "model-004",
    name: "病理切片分析",
    version: "2.0.1",
    type: "影像分析",
    status: "inactive",
    accuracy: 0.92,
    lastUpdated: "2023-08-05",
    deployedAt: null,
    description: "分析病理切片图像，辅助病理医生进行癌症诊断和分级。",
    versions: [
      { version: "2.0.1", date: "2023-08-05", status: "inactive", accuracy: 0.92 },
      { version: "2.0.0", date: "2023-07-15", status: "archived", accuracy: 0.91 },
      { version: "1.9.5", date: "2023-06-01", status: "archived", accuracy: 0.9 },
    ],
    metrics: {
      responseTime: "2.0s",
      throughput: "20/分钟",
      errorRate: "0.8%",
      lastIncident: "2023-08-01",
    },
    alerts: [],
  },
  {
    id: "model-005",
    name: "医学文本分析",
    version: "1.5.0",
    type: "自然语言处理",
    status: "active",
    accuracy: 0.87,
    lastUpdated: "2023-10-10",
    deployedAt: "2023-10-12",
    description: "从医疗记录和临床笔记中提取关键信息，支持自动编码和摘要生成。",
    versions: [
      { version: "1.5.0", date: "2023-10-10", status: "active", accuracy: 0.87 },
      { version: "1.4.2", date: "2023-09-01", status: "archived", accuracy: 0.85 },
      { version: "1.4.0", date: "2023-07-20", status: "archived", accuracy: 0.83 },
    ],
    metrics: {
      responseTime: "1.0s",
      throughput: "50/分钟",
      errorRate: "0.7%",
      lastIncident: "2023-10-01",
    },
    alerts: [{ id: "alert-003", type: "usage", message: "使用量突增", severity: "info", date: "2023-11-12" }],
  },
]

export function ModelManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [activeTab, setActiveTab] = useState("deployed")
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [detailView, setDetailView] = useState<string | null>(null)

  // 过滤模型
  const filteredModels = mockModels.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || model.type === filterType
    const matchesStatus = filterStatus === "all" || model.status === filterStatus
    const matchesTab =
      (activeTab === "deployed" && model.deployedAt) || (activeTab === "development" && !model.deployedAt)

    return matchesSearch && matchesType && matchesStatus && matchesTab
  })

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> 活跃
          </Badge>
        )
      case "maintenance":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <Settings className="h-3 w-3" /> 维护中
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> 未激活
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // 获取选中的模型
  const getSelectedModelData = () => {
    return mockModels.find((model) => model.id === selectedModel) || null
  }

  // 渲染详细视图
  const renderDetailView = () => {
    const model = getSelectedModelData()
    if (!model) return null

    switch (detailView) {
      case "versions":
        return <ModelVersionHistory model={model} onClose={() => setDetailView(null)} />
      case "deployment":
        return <ModelDeployment model={model} onClose={() => setDetailView(null)} />
      case "monitoring":
        return <ModelMonitoring model={model} onClose={() => setDetailView(null)} />
      default:
        return null
    }
  }

  // 如果有详细视图，则渲染详细视图
  if (detailView && selectedModel) {
    return renderDetailView()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">模型管理</CardTitle>
              <CardDescription>管理和部署AI诊断模型</CardDescription>
            </div>
            <Button className="bg-medical-600 hover:bg-medical-700">
              <Plus className="mr-2 h-4 w-4" />
              添加新模型
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="deployed" className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                已部署模型
              </TabsTrigger>
              <TabsTrigger value="development" className="flex items-center gap-1">
                <Activity className="h-4 w-4" />
                开发中模型
              </TabsTrigger>
            </TabsList>

            {/* 搜索和筛选 */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索模型..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-40">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="模型类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有类型</SelectItem>
                      <SelectItem value="影像分析">影像分析</SelectItem>
                      <SelectItem value="信号分析">信号分析</SelectItem>
                      <SelectItem value="自然语言处理">自然语言处理</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-40">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有状态</SelectItem>
                      <SelectItem value="active">活跃</SelectItem>
                      <SelectItem value="maintenance">维护中</SelectItem>
                      <SelectItem value="inactive">未激活</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <TabsContent value="deployed" className="space-y-4">
              {filteredModels.length > 0 ? (
                filteredModels.map((model) => (
                  <Card key={model.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Brain className="h-5 w-5 text-medical-600" />
                            <h3 className="text-lg font-medium">{model.name}</h3>
                          </div>
                          {getStatusBadge(model.status)}
                        </div>
                        <p className="text-sm text-gray-500 mb-4">{model.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <Label className="text-xs text-gray-500">版本</Label>
                            <div className="flex items-center">
                              {model.version}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 ml-1"
                                onClick={() => {
                                  setSelectedModel(model.id)
                                  setDetailView("versions")
                                }}
                              >
                                <History className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">类型</Label>
                            <div>{model.type}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">准确率</Label>
                            <div className="text-medical-600 font-medium">{(model.accuracy * 100).toFixed(1)}%</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">部署时间</Label>
                            <div>{model.deployedAt || "未部署"}</div>
                          </div>
                        </div>

                        {/* 新增：告警指示器 */}
                        {model.alerts && model.alerts.length > 0 && (
                          <div className="mt-4 p-2 bg-amber-50 rounded-md flex items-center">
                            <Bell className="h-4 w-4 text-amber-500 mr-2" />
                            <span className="text-sm text-amber-700">{model.alerts.length}个活跃告警</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-auto"
                              onClick={() => {
                                setSelectedModel(model.id)
                                setDetailView("monitoring")
                              }}
                            >
                              查看详情
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="bg-gray-50 p-6 flex flex-row md:flex-col justify-between items-center md:w-48">
                        <div className="flex flex-col items-center mb-4">
                          <div className="text-3xl font-bold text-medical-600">
                            {(model.accuracy * 100).toFixed(1)}%
                          </div>
                          <div className="text-xs text-gray-500">准确率</div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full flex items-center justify-center"
                            onClick={() => {
                              setSelectedModel(model.id)
                              setDetailView("versions")
                            }}
                          >
                            <Layers className="h-3.5 w-3.5 mr-1" />
                            版本管理
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full flex items-center justify-center"
                            onClick={() => {
                              setSelectedModel(model.id)
                              setDetailView("deployment")
                            }}
                          >
                            <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
                            部署管理
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full flex items-center justify-center"
                            onClick={() => {
                              setSelectedModel(model.id)
                              setDetailView("monitoring")
                            }}
                          >
                            <Activity className="h-3.5 w-3.5 mr-1" />
                            监控告警
                          </Button>
                          <Button size="sm" className="w-full bg-medical-600 hover:bg-medical-700">
                            <BarChart className="h-3.5 w-3.5 mr-1" />
                            性能分析
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">未找到匹配的模型</div>
              )}
            </TabsContent>

            <TabsContent value="development" className="space-y-4">
              {filteredModels.length > 0 ? (
                filteredModels.map((model) => (
                  <Card key={model.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{model.name}</CardTitle>
                        <Badge variant="outline">开发中</Badge>
                      </div>
                      <CardDescription>{model.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-gray-500">版本</Label>
                          <div className="flex items-center">
                            {model.version}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 ml-1"
                              onClick={() => {
                                setSelectedModel(model.id)
                                setDetailView("versions")
                              }}
                            >
                              <History className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">类型</Label>
                          <div>{model.type}</div>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">准确率</Label>
                          <div>{(model.accuracy * 100).toFixed(1)}%</div>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">最后更新</Label>
                          <div>{model.lastUpdated}</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`deploy-${model.id}`} className="text-sm cursor-pointer">
                          部署模型
                        </Label>
                        <Switch id={`deploy-${model.id}`} />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedModel(model.id)
                            setDetailView("versions")
                          }}
                        >
                          <Layers className="h-3.5 w-3.5 mr-1" />
                          版本
                        </Button>
                        <Button variant="outline" size="sm">
                          <Activity className="h-3.5 w-3.5 mr-1" />
                          测试
                        </Button>
                        <Button size="sm" className="bg-medical-600 hover:bg-medical-700">
                          <Settings className="h-3.5 w-3.5 mr-1" />
                          配置
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">未找到匹配的开发中模型</div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <div className="text-sm text-gray-500">共 {filteredModels.length} 个模型</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5 mr-1" />
              导出模型列表
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-3.5 w-3.5 mr-1" />
              导入模型
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              刷新
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
