"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  Line,
  Pie,
  PieChart,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Brain,
  BarChart2,
  ArrowRight,
  RefreshCw,
  FileText,
  Database,
  Layers,
  AlertCircle,
  CheckCircle,
  Filter,
  Download,
  Settings,
  Zap,
  Activity,
  Share2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 模拟诊断记录数据
const diagnosisData = {
  byModel: [
    { model: "肺部CT分析 v2.1", count: 1245, accuracy: 0.94, avgTime: 1.2 },
    { model: "心电图异常检测 v1.8", count: 876, accuracy: 0.91, avgTime: 0.8 },
    { model: "皮肤病变分类 v3.1", count: 542, accuracy: 0.89, avgTime: 1.5 },
    { model: "病理切片分析 v2.0", count: 328, accuracy: 0.92, avgTime: 2.0 },
    { model: "医学文本分析 v1.5", count: 687, accuracy: 0.87, avgTime: 1.0 },
  ],
  errorDistribution: [
    { category: "假阴性", count: 62, percentage: 35.2 },
    { category: "假阳性", count: 76, percentage: 43.2 },
    { category: "分类错误", count: 38, percentage: 21.6 },
  ],
  performanceTrend: [
    { month: "1月", accuracy: 0.89, count: 420 },
    { month: "2月", accuracy: 0.9, count: 480 },
    { month: "3月", accuracy: 0.91, count: 520 },
    { month: "4月", accuracy: 0.92, count: 580 },
    { month: "5月", accuracy: 0.93, count: 650 },
    { month: "6月", accuracy: 0.94, count: 720 },
  ],
  improvementOpportunities: [
    { category: "肺结节检测", errorRate: 0.08, sampleCount: 450, priority: "高" },
    { category: "心律失常分类", errorRate: 0.11, sampleCount: 320, priority: "中" },
    { category: "皮肤癌分级", errorRate: 0.14, sampleCount: 280, priority: "高" },
    { category: "病理图像分割", errorRate: 0.09, sampleCount: 180, priority: "中" },
    { category: "医疗文本实体识别", errorRate: 0.16, sampleCount: 420, priority: "低" },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function DiagnosisModelIntegration() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("performance")
  const [selectedModel, setSelectedModel] = useState("all")
  const [timeRange, setTimeRange] = useState("6months")
  const [isGeneratingDataset, setIsGeneratingDataset] = useState(false)
  const [datasetProgress, setDatasetProgress] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // 处理数据集生成
  const handleGenerateDataset = () => {
    if (selectedCategories.length === 0) {
      toast({
        title: "请选择至少一个改进类别",
        description: "需要选择要改进的类别以生成训练数据集",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingDataset(true)
    setDatasetProgress(0)

    // 模拟数据集生成进度
    const interval = setInterval(() => {
      setDatasetProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGeneratingDataset(false)

          toast({
            title: "数据集生成完成",
            description: `已成功生成包含 ${selectedCategories.length} 个类别的训练数据集`,
          })

          return 100
        }
        return prev + 5
      })
    }, 300)
  }

  // 切换选中类别
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">诊断记录与模型分析</CardTitle>
              <CardDescription>分析诊断记录数据，发现模型改进机会</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="选择模型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有模型</SelectItem>
                  <SelectItem value="lung-ct">肺部CT分析模型</SelectItem>
                  <SelectItem value="ecg">心电图异常检测</SelectItem>
                  <SelectItem value="skin">皮肤病变分类</SelectItem>
                  <SelectItem value="pathology">病理切片分析</SelectItem>
                  <SelectItem value="nlp">医学文本分析</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="时间范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">近1个月</SelectItem>
                  <SelectItem value="3months">近3个月</SelectItem>
                  <SelectItem value="6months">近6个月</SelectItem>
                  <SelectItem value="1year">近1年</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="performance" className="flex items-center gap-1">
                <BarChart2 className="h-4 w-4" />
                模型性能
              </TabsTrigger>
              <TabsTrigger value="errors" className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                错误分析
              </TabsTrigger>
              <TabsTrigger value="improvement" className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                改进机会
              </TabsTrigger>
              <TabsTrigger value="dataset" className="flex items-center gap-1">
                <Database className="h-4 w-4" />
                数据集生成
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">总诊断次数</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-bold text-medical-700">
                        {diagnosisData.byModel.reduce((sum, item) => sum + item.count, 0).toLocaleString()}
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                        <Activity className="h-3 w-3" />
                        +12.5%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">平均准确率</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-bold text-medical-700">
                        {(
                          (diagnosisData.byModel.reduce((sum, item) => sum + item.accuracy * item.count, 0) /
                            diagnosisData.byModel.reduce((sum, item) => sum + item.count, 0)) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                        <Activity className="h-3 w-3" />
                        +1.2%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">平均响应时间</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-bold text-medical-700">
                        {(
                          diagnosisData.byModel.reduce((sum, item) => sum + item.avgTime * item.count, 0) /
                          diagnosisData.byModel.reduce((sum, item) => sum + item.count, 0)
                        ).toFixed(1)}
                        s
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                        <Activity className="h-3 w-3" />
                        -0.2s
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>各模型诊断性能</CardTitle>
                  <CardDescription>不同模型的诊断次数和准确率对比</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      count: {
                        label: "诊断次数",
                        color: "hsl(var(--chart-1))",
                      },
                      accuracy: {
                        label: "准确率",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={diagnosisData.byModel}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="model" />
                        <YAxis yAxisId="left" />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          domain={[0.8, 1]}
                          tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="count" fill="var(--color-count)" name="诊断次数" />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="accuracy"
                          stroke="var(--color-accuracy)"
                          name="准确率"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>性能趋势分析</CardTitle>
                  <CardDescription>诊断准确率和数量随时间的变化趋势</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      count: {
                        label: "诊断次数",
                        color: "hsl(var(--chart-1))",
                      },
                      accuracy: {
                        label: "准确率",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={diagnosisData.performanceTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          domain={[0.85, 0.95]}
                          tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="count" fill="var(--color-count)" name="诊断次数" />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="accuracy"
                          stroke="var(--color-accuracy)"
                          name="准确率"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="errors" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>错误类型分布</CardTitle>
                    <CardDescription>不同类型错误的分布情况</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={diagnosisData.errorDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="category"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          >
                            {diagnosisData.errorDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}例`, "数量"]} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>错误分析详情</CardTitle>
                    <CardDescription>各类型错误的详细分析</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {diagnosisData.errorDistribution.map((item, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              ></div>
                              <span className="font-medium">{item.category}</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {item.count}例 ({item.percentage}%)
                            </span>
                          </div>
                          <Progress value={item.percentage} className="h-2" />
                          <p className="mt-1 text-sm text-gray-500">
                            {index === 0 && "模型未能识别出实际存在的病变，需要提高敏感性"}
                            {index === 1 && "模型错误地将正常组织识别为病变，需要提高特异性"}
                            {index === 2 && "模型将一种疾病错误地分类为另一种疾病，需要改进分类能力"}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-medium text-amber-800 mb-2">错误模式分析</h4>
                      <ul className="text-sm text-amber-700 space-y-2">
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>假阴性错误主要出现在早期病变和边界不清的病例中</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>假阳性错误常见于图像质量较差或存在干扰因素的情况</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>分类错误多发生在症状相似的疾病之间，如不同类型的肺炎</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>错误样本分析</CardTitle>
                      <CardDescription>查看和分析模型预测错误的样本</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Filter className="h-3.5 w-3.5 mr-1" />
                        筛选
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download className="h-3.5 w-3.5 mr-1" />
                        导出
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 bg-slate-50 p-3 text-sm font-medium">
                      <div className="col-span-1">ID</div>
                      <div className="col-span-2">患者信息</div>
                      <div className="col-span-2">实际诊断</div>
                      <div className="col-span-2">AI诊断</div>
                      <div className="col-span-1">置信度</div>
                      <div className="col-span-2">错误类型</div>
                      <div className="col-span-2">操作</div>
                    </div>
                    <div className="divide-y">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="grid grid-cols-12 p-3 text-sm items-center">
                          <div className="col-span-1 font-medium">E-{i.toString().padStart(3, "0")}</div>
                          <div className="col-span-2">
                            <div className="font-medium">患者{i + 10}</div>
                            <div className="text-xs text-gray-500">
                              {60 + i}岁 {i % 2 === 0 ? "男" : "女"}
                            </div>
                          </div>
                          <div className="col-span-2">
                            <Badge variant="outline" className="bg-blue-50">
                              {i % 3 === 0 ? "肺结节" : i % 3 === 1 ? "肺炎" : "正常"}
                            </Badge>
                          </div>
                          <div className="col-span-2">
                            <Badge variant="outline" className="bg-red-50 text-red-700">
                              {i % 3 === 0 ? "正常" : i % 3 === 1 ? "肺气肿" : "肺结节"}
                            </Badge>
                          </div>
                          <div className="col-span-1">{(0.6 + i * 0.05).toFixed(2)}</div>
                          <div className="col-span-2">
                            {i % 3 === 0 ? "假阴性" : i % 3 === 1 ? "分类错误" : "假阳性"}
                          </div>
                          <div className="col-span-2">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                查看
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const category =
                                    i % 3 === 0 ? "肺结节检测" : i % 3 === 1 ? "肺炎识别" : "正常样本识别"
                                  if (!selectedCategories.includes(category)) {
                                    setSelectedCategories((prev) => [...prev, category])
                                  }
                                  setActiveTab("dataset")
                                }}
                              >
                                添加到数据集
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="improvement" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>模型改进机会</CardTitle>
                  <CardDescription>基于诊断记录分析的模型改进建议</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 bg-slate-50 p-3 text-sm font-medium">
                      <div className="col-span-3">改进类别</div>
                      <div className="col-span-2">错误率</div>
                      <div className="col-span-2">样本数量</div>
                      <div className="col-span-2">优先级</div>
                      <div className="col-span-3">操作</div>
                    </div>
                    <div className="divide-y">
                      {diagnosisData.improvementOpportunities.map((item, index) => (
                        <div key={index} className="grid grid-cols-12 p-3 text-sm items-center">
                          <div className="col-span-3 font-medium">{item.category}</div>
                          <div className="col-span-2">
                            <Badge variant={item.errorRate > 0.1 ? "destructive" : "outline"}>
                              {(item.errorRate * 100).toFixed(1)}%
                            </Badge>
                          </div>
                          <div className="col-span-2">{item.sampleCount}例</div>
                          <div className="col-span-2">
                            <Badge
                              variant="outline"
                              className={
                                item.priority === "高"
                                  ? "bg-red-50 text-red-700"
                                  : item.priority === "中"
                                    ? "bg-yellow-50 text-yellow-700"
                                    : "bg-blue-50 text-blue-700"
                              }
                            >
                              {item.priority}优先级
                            </Badge>
                          </div>
                          <div className="col-span-3">
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  if (!selectedCategories.includes(item.category)) {
                                    setSelectedCategories((prev) => [...prev, item.category])
                                  }
                                  setActiveTab("dataset")
                                }}
                              >
                                <Database className="h-3.5 w-3.5 mr-1" />
                                生成数据集
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  window.location.href = "/ai-model-training"
                                }}
                              >
                                <Layers className="h-3.5 w-3.5 mr-1" />
                                训练模型
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>改进建议</CardTitle>
                    <CardDescription>基于错误分析的模型改进建议</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                          <Brain className="h-4 w-4 mr-2" />
                          数据增强建议
                        </h4>
                        <ul className="text-sm text-blue-700 space-y-2">
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>增加早期肺结节的训练样本，提高模型对小型结节的敏感性</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>添加更多低质量图像的训练数据，提高模型在不理想条件下的表现</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>平衡各类疾病的样本数量，减少类别不平衡导致的偏差</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2 flex items-center">
                          <Settings className="h-4 w-4 mr-2" />
                          模型优化建议
                        </h4>
                        <ul className="text-sm text-green-700 space-y-2">
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>调整模型置信度阈值，在敏感性和特异性之间找到更好的平衡</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>使用更先进的图像预处理技术，提高输入数据质量</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>考虑使用集成学习方法，结合多个模型的预测结果</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>预期改进效果</CardTitle>
                    <CardDescription>实施改进后的预期性能提升</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">准确率</span>
                          <span className="text-sm text-gray-500">预计提升 2.5%</span>
                        </div>
                        <div className="flex h-4 items-center gap-2">
                          <div className="h-2 flex-1 rounded-full bg-gray-100">
                            <div className="h-full w-[92%] rounded-full bg-gray-400"></div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                          <div className="h-2 flex-1 rounded-full bg-gray-100">
                            <div className="h-full w-[94.5%] rounded-full bg-green-500"></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>当前: 92.0%</span>
                          <span>目标: 94.5%</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">假阴性率</span>
                          <span className="text-sm text-gray-500">预计降低 3.2%</span>
                        </div>
                        <div className="flex h-4 items-center gap-2">
                          <div className="h-2 flex-1 rounded-full bg-gray-100">
                            <div className="h-full w-[8.2%] rounded-full bg-red-400"></div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                          <div className="h-2 flex-1 rounded-full bg-gray-100">
                            <div className="h-full w-[5%] rounded-full bg-green-500"></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>当前: 8.2%</span>
                          <span>目标: 5.0%</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">假阳性率</span>
                          <span className="text-sm text-gray-500">预计降低 2.8%</span>
                        </div>
                        <div className="flex h-4 items-center gap-2">
                          <div className="h-2 flex-1 rounded-full bg-gray-100">
                            <div className="h-full w-[7.6%] rounded-full bg-red-400"></div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                          <div className="h-2 flex-1 rounded-full bg-gray-100">
                            <div className="h-full w-[4.8%] rounded-full bg-green-500"></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>当前: 7.6%</span>
                          <span>目标: 4.8%</span>
                        </div>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-lg mt-4">
                        <h4 className="font-medium text-purple-800 mb-2">投资回报分析</h4>
                        <p className="text-sm text-purple-700 mb-2">
                          预计改进将减少约 35% 的误诊率，每年可避免约 420 例不必要的进一步检查和治疗，
                          节省医疗资源并提高患者满意度。
                        </p>
                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                            onClick={() => {
                              window.location.href = "/ai-model/performance"
                            }}
                          >
                            查看详细分析
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="dataset" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>训练数据集生成</CardTitle>
                  <CardDescription>从诊断记录中生成模型训练数据集</CardDescription>
                </CardHeader>
                <CardContent>
                  {isGeneratingDataset ? (
                    <div className="p-4 bg-blue-50 rounded-lg mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-blue-700">正在生成数据集...</h3>
                        <span className="text-sm text-blue-600">{datasetProgress}%</span>
                      </div>
                      <Progress value={datasetProgress} className="h-2" />
                      <p className="mt-2 text-sm text-blue-600">正在从诊断记录中提取和处理数据，请稍候...</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">选择改进类别</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {diagnosisData.improvementOpportunities.map((item, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <Checkbox
                                id={`category-${index}`}
                                checked={selectedCategories.includes(item.category)}
                                onCheckedChange={() => toggleCategory(item.category)}
                              />
                              <div className="grid gap-1.5 leading-none">
                                <label
                                  htmlFor={`category-${index}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {item.category}
                                </label>
                                <p className="text-sm text-gray-500">
                                  错误率: {(item.errorRate * 100).toFixed(1)}%, 样本数: {item.sampleCount}例
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">数据集配置</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="dataset-name">数据集名称</Label>
                              <Input
                                id="dataset-name"
                                placeholder="输入数据集名称"
                                defaultValue={`改进数据集-${new Date().toISOString().split("T")[0]}`}
                              />
                            </div>
                            <div>
                              <Label htmlFor="dataset-type">数据集类型</Label>
                              <Select defaultValue="balanced">
                                <SelectTrigger id="dataset-type">
                                  <SelectValue placeholder="选择数据集类型" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="balanced">平衡数据集</SelectItem>
                                  <SelectItem value="error-focused">错误样本强化</SelectItem>
                                  <SelectItem value="augmented">数据增强</SelectItem>
                                  <SelectItem value="mixed">混合数据集</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="split-ratio">训练/验证/测试比例</Label>
                              <Select defaultValue="70-15-15">
                                <SelectTrigger id="split-ratio">
                                  <SelectValue placeholder="选择数据分割比例" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="70-15-15">70% / 15% / 15%</SelectItem>
                                  <SelectItem value="80-10-10">80% / 10% / 10%</SelectItem>
                                  <SelectItem value="60-20-20">60% / 20% / 20%</SelectItem>
                                  <SelectItem value="custom">自定义比例</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="augmentation">数据增强方法</Label>
                              <Select defaultValue="standard">
                                <SelectTrigger id="augmentation">
                                  <SelectValue placeholder="选择数据增强方法" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="standard">标准增强 (旋转、缩放、翻转)</SelectItem>
                                  <SelectItem value="advanced">高级增强 (对比度、亮度、噪声)</SelectItem>
                                  <SelectItem value="gan">GAN生成样本</SelectItem>
                                  <SelectItem value="none">不使用数据增强</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Switch id="include-metadata" defaultChecked />
                            <Label htmlFor="include-metadata" className="text-sm">
                              包含元数据 (年龄、性别、临床信息)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="anonymize" defaultChecked />
                            <Label htmlFor="anonymize" className="text-sm">
                              匿名化患者信息
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="include-annotations" defaultChecked />
                            <Label htmlFor="include-annotations" className="text-sm">
                              包含医生标注
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-gray-500">
                    {selectedCategories.length > 0
                      ? `已选择 ${selectedCategories.length} 个类别，预计生成约 ${selectedCategories.length * 200} 个样本`
                      : "请至少选择一个改进类别"}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => setSelectedCategories([])}
                      disabled={selectedCategories.length === 0 || isGeneratingDataset}
                    >
                      清除选择
                    </Button>
                    <Button
                      className="bg-medical-600 hover:bg-medical-700 flex items-center gap-1"
                      onClick={handleGenerateDataset}
                      disabled={selectedCategories.length === 0 || isGeneratingDataset}
                    >
                      {isGeneratingDataset ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                          生成中...
                        </>
                      ) : (
                        <>
                          <Database className="h-4 w-4 mr-1" />
                          生成数据集
                        </>
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              {datasetProgress === 100 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>数据集生成完成</CardTitle>
                        <CardDescription>数据集已成功生成，可用于模型训练</CardDescription>
                      </div>
                      <Badge variant="success" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> 已完成
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">数据集信息</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-500">数据集名称:</span>
                            <span className="font-medium">改进数据集-{new Date().toISOString().split("T")[0]}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">样本总数:</span>
                            <span className="font-medium">{selectedCategories.length * 200}例</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">类别数量:</span>
                            <span className="font-medium">{selectedCategories.length}个</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">数据分割:</span>
                            <span className="font-medium">70% 训练 / 15% 验证 / 15% 测试</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">创建时间:</span>
                            <span className="font-medium">{new Date().toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-4">下一步操作</h3>
                        <div className="space-y-3">
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => {
                              window.location.href = "/ai-model-training"
                            }}
                          >
                            <Layers className="h-4 w-4 mr-2" />
                            使用此数据集训练模型
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <FileText className="h-4 w-4 mr-2" />
                            查看数据集详情
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            下载数据集
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Share2 className="h-4 w-4 mr-2" />
                            分享数据集
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
