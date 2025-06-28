"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Play, Pause, AlertCircle, CheckCircle, Clock, XCircle, Database, Brain, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// 模拟训练任务数据
const MOCK_JOBS = [
  {
    id: "job-001",
    name: "糖尿病预测模型 v2.1",
    status: "completed",
    progress: 100,
    startTime: "2023-04-15 09:30",
    endTime: "2023-04-15 14:45",
    modelType: "分类",
    dataset: "糖尿病患者数据集 (15,000例)",
    accuracy: 0.92,
    creator: "张医生",
  },
  {
    id: "job-002",
    name: "肺炎X光诊断模型",
    status: "running",
    progress: 68,
    startTime: "2023-04-16 13:20",
    endTime: null,
    modelType: "图像分类",
    dataset: "胸部X光片数据集 (8,500例)",
    accuracy: null,
    creator: "李医生",
  },
  {
    id: "job-003",
    name: "心血管疾病风险预测",
    status: "queued",
    progress: 0,
    startTime: null,
    endTime: null,
    modelType: "回归",
    dataset: "心血管健康数据集 (22,000例)",
    accuracy: null,
    creator: "王医生",
  },
  {
    id: "job-004",
    name: "皮肤病变分类模型",
    status: "failed",
    progress: 45,
    startTime: "2023-04-14 10:15",
    endTime: "2023-04-14 11:30",
    modelType: "图像分类",
    dataset: "皮肤病变图像集 (12,300例)",
    accuracy: null,
    creator: "赵医生",
  },
  {
    id: "job-005",
    name: "药物反应预测模型",
    status: "paused",
    progress: 32,
    startTime: "2023-04-13 16:40",
    endTime: null,
    modelType: "多标签分类",
    dataset: "药物反应数据集 (9,800例)",
    accuracy: null,
    creator: "钱医生",
  },
]

// 模拟数据集
const MOCK_DATASETS = [
  { id: "ds-001", name: "糖尿病患者数据集", count: "15,000例", type: "结构化数据" },
  { id: "ds-002", name: "胸部X光片数据集", count: "8,500例", type: "图像" },
  { id: "ds-003", name: "心血管健康数据集", count: "22,000例", type: "结构化数据" },
  { id: "ds-004", name: "皮肤病变图像集", count: "12,300例", type: "图像" },
  { id: "ds-005", name: "药物反应数据集", count: "9,800例", type: "结构化数据" },
]

// 模拟模型类型
const MODEL_TYPES = [
  { id: "mt-001", name: "分类", description: "用于预测离散类别" },
  { id: "mt-002", name: "回归", description: "用于预测连续值" },
  { id: "mt-003", name: "图像分类", description: "用于图像识别和分类" },
  { id: "mt-004", name: "多标签分类", description: "用于预测多个标签" },
  { id: "mt-005", name: "聚类", description: "用于无监督学习分组" },
]

export function ModelTrainingJobs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // 新任务表单状态
  const [newJobName, setNewJobName] = useState("")
  const [selectedDataset, setSelectedDataset] = useState("")
  const [selectedModelType, setSelectedModelType] = useState("")
  const [jobDescription, setJobDescription] = useState("")

  // 过滤训练任务
  const filteredJobs = MOCK_JOBS.filter((job) => {
    const matchesSearch =
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.creator.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || job.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">已完成</Badge>
      case "running":
        return <Badge className="bg-blue-500">运行中</Badge>
      case "queued":
        return <Badge className="bg-yellow-500">队列中</Badge>
      case "failed":
        return <Badge className="bg-red-500">失败</Badge>
      case "paused":
        return <Badge className="bg-gray-500">已暂停</Badge>
      default:
        return <Badge>未知</Badge>
    }
  }

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "running":
        return <Play className="h-5 w-5 text-blue-500" />
      case "queued":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "paused":
        return <Pause className="h-5 w-5 text-gray-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  // 提交新任务
  const handleSubmitNewJob = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里应该是提交到API的逻辑
    alert(`已提交新任务: ${newJobName}`)

    // 重置表单
    setNewJobName("")
    setSelectedDataset("")
    setSelectedModelType("")
    setJobDescription("")
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active-jobs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="active-jobs">活动任务</TabsTrigger>
            <TabsTrigger value="create-job">创建新任务</TabsTrigger>
          </TabsList>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="搜索任务名称或创建者..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有状态</SelectItem>
                <SelectItem value="running">运行中</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
                <SelectItem value="queued">队列中</SelectItem>
                <SelectItem value="failed">失败</SelectItem>
                <SelectItem value="paused">已暂停</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="active-jobs">
          <Card>
            <CardHeader>
              <CardTitle>模型训练任务</CardTitle>
              <CardDescription>管理和监控AI模型训练任务</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-slate-50 p-3 text-sm font-medium">
                  <div className="col-span-3">任务名称</div>
                  <div className="col-span-2">状态</div>
                  <div className="col-span-2">进度</div>
                  <div className="col-span-2">模型类型</div>
                  <div className="col-span-2">创建者</div>
                  <div className="col-span-1">操作</div>
                </div>

                {filteredJobs.length > 0 ? (
                  <div className="divide-y">
                    {filteredJobs.map((job) => (
                      <div key={job.id} className="grid grid-cols-12 p-3 text-sm items-center">
                        <div className="col-span-3 font-medium flex items-center gap-2">
                          {getStatusIcon(job.status)}
                          <span>{job.name}</span>
                        </div>
                        <div className="col-span-2">{getStatusBadge(job.status)}</div>
                        <div className="col-span-2">
                          <div className="flex flex-col gap-1">
                            <Progress value={job.progress} className="h-2" />
                            <span className="text-xs text-gray-500">{job.progress}%</span>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100">
                            {job.modelType}
                          </span>
                        </div>
                        <div className="col-span-2">{job.creator}</div>
                        <div className="col-span-1">
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              {job.status === "running" ? (
                                <Pause className="h-4 w-4" />
                              ) : job.status === "paused" ? (
                                <Play className="h-4 w-4" />
                              ) : (
                                <BarChart className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">没有找到匹配的训练任务</div>
                )}
              </div>

              <div className="mt-4 text-sm text-gray-500">
                显示 {filteredJobs.length} 个任务中的 {filteredJobs.length} 个
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create-job">
          <Card>
            <CardHeader>
              <CardTitle>创建新训练任务</CardTitle>
              <CardDescription>配置并启动新的AI模型训练任务</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitNewJob} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="job-name">任务名称</Label>
                    <Input
                      id="job-name"
                      placeholder="输入任务名称"
                      value={newJobName}
                      onChange={(e) => setNewJobName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="dataset">选择数据集</Label>
                    <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择训练数据集" />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_DATASETS.map((dataset) => (
                          <SelectItem key={dataset.id} value={dataset.id}>
                            <div className="flex items-center gap-2">
                              <Database className="h-4 w-4" />
                              <span>
                                {dataset.name} ({dataset.count})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="model-type">选择模型类型</Label>
                    <Select value={selectedModelType} onValueChange={setSelectedModelType}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择模型类型" />
                      </SelectTrigger>
                      <SelectContent>
                        {MODEL_TYPES.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              <Brain className="h-4 w-4" />
                              <span>
                                {type.name} - {type.description}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">任务描述</Label>
                    <Textarea
                      id="description"
                      placeholder="输入任务描述和备注"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-md">
                    <h3 className="font-medium mb-2">高级配置</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="epochs">训练轮次</Label>
                        <Input id="epochs" type="number" defaultValue="100" min="1" />
                      </div>
                      <div>
                        <Label htmlFor="batch-size">批次大小</Label>
                        <Input id="batch-size" type="number" defaultValue="32" min="1" />
                      </div>
                      <div>
                        <Label htmlFor="learning-rate">学习率</Label>
                        <Input id="learning-rate" type="number" defaultValue="0.001" step="0.0001" min="0" />
                      </div>
                      <div>
                        <Label htmlFor="validation-split">验证集比例</Label>
                        <Input id="validation-split" type="number" defaultValue="0.2" step="0.05" min="0" max="0.5" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline">
                    取消
                  </Button>
                  <Button type="submit" disabled={!newJobName || !selectedDataset || !selectedModelType}>
                    创建任务
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
