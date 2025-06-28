"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
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
  Cell,
  PieChart,
  Pie,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowRight, AlertCircle, BarChart2, PieChartIcon, Activity, Save, Share2, FileText } from "lucide-react"

// 模拟评估数据
const evaluationData = {
  metrics: {
    accuracy: 0.924,
    precision: 0.918,
    recall: 0.932,
    f1: 0.925,
    auc: 0.956,
    specificity: 0.917,
  },
  confusionMatrix: [
    { name: "真阳性", value: 856 },
    { name: "假阳性", value: 76 },
    { name: "假阴性", value: 62 },
    { name: "真阴性", value: 906 },
  ],
  classPerformance: [
    { class: "肺炎", accuracy: 0.95, precision: 0.94, recall: 0.96, f1: 0.95, samples: 450 },
    { class: "肺结节", accuracy: 0.92, precision: 0.9, recall: 0.93, f1: 0.91, samples: 380 },
    { class: "肺气肿", accuracy: 0.89, precision: 0.87, recall: 0.9, f1: 0.88, samples: 320 },
    { class: "支气管炎", accuracy: 0.91, precision: 0.89, recall: 0.92, f1: 0.9, samples: 290 },
    { class: "正常", accuracy: 0.97, precision: 0.96, recall: 0.98, f1: 0.97, samples: 460 },
  ],
  errorAnalysis: [
    { category: "图像质量问题", count: 42, percentage: 30.4 },
    { category: "边界病例", count: 38, percentage: 27.5 },
    { category: "罕见病例", count: 25, percentage: 18.1 },
    { category: "标注错误", count: 18, percentage: 13.0 },
    { category: "其他", count: 15, percentage: 11.0 },
  ],
  thresholdAnalysis: [
    { threshold: 0.5, precision: 0.82, recall: 0.98, f1: 0.89 },
    { threshold: 0.6, precision: 0.86, recall: 0.95, f1: 0.9 },
    { threshold: 0.7, precision: 0.9, recall: 0.91, f1: 0.91 },
    { threshold: 0.8, precision: 0.94, recall: 0.85, f1: 0.89 },
    { threshold: 0.9, precision: 0.97, recall: 0.76, f1: 0.85 },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function ModelEvaluation() {
  const [selectedModel, setSelectedModel] = useState("lung-ct-v2.1")
  const [selectedDataset, setSelectedDataset] = useState("test-set-1")
  const [confidenceThreshold, setConfidenceThreshold] = useState([0.7])
  const [activeTab, setActiveTab] = useState("overview")
  const [isAutoEvaluate, setIsAutoEvaluate] = useState(true)
  const [isEvaluating, setIsEvaluating] = useState(false)

  const handleEvaluate = () => {
    setIsEvaluating(true)
    // 模拟评估过程
    setTimeout(() => {
      setIsEvaluating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">模型评估</CardTitle>
              <CardDescription>评估AI诊断模型的性能和准确性</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="选择模型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lung-ct-v2.1">肺部CT分析模型 v2.1</SelectItem>
                  <SelectItem value="lung-ct-v2.0">肺部CT分析模型 v2.0</SelectItem>
                  <SelectItem value="ecg-v1.8">心电图异常检测 v1.8</SelectItem>
                  <SelectItem value="skin-v3.1">皮肤病变分类 v3.1</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="选择数据集" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="test-set-1">测试集 1 (1,900例)</SelectItem>
                  <SelectItem value="test-set-2">测试集 2 (850例)</SelectItem>
                  <SelectItem value="validation">验证集 (2,500例)</SelectItem>
                  <SelectItem value="custom">自定义数据集</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="auto-evaluate" className="text-sm">
                  自动评估
                </Label>
                <Switch id="auto-evaluate" checked={isAutoEvaluate} onCheckedChange={setIsAutoEvaluate} />
              </div>
              <div className="ml-4">
                <Label className="text-sm">置信度阈值</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={confidenceThreshold}
                    onValueChange={setConfidenceThreshold}
                    max={1}
                    step={0.01}
                    className="w-32"
                  />
                  <span className="text-sm font-medium">{confidenceThreshold[0].toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button onClick={handleEvaluate} disabled={isEvaluating} className="bg-medical-600 hover:bg-medical-700">
              {isEvaluating ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  评估中...
                </>
              ) : (
                <>
                  <Activity className="mr-2 h-4 w-4" />
                  开始评估
                </>
              )}
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <BarChart2 className="h-4 w-4" />
                总体概览
              </TabsTrigger>
              <TabsTrigger value="class-performance" className="flex items-center gap-1">
                <PieChartIcon className="h-4 w-4" />
                分类性能
              </TabsTrigger>
              <TabsTrigger value="error-analysis" className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                错误分析
              </TabsTrigger>
              <TabsTrigger value="threshold" className="flex items-center gap-1">
                <Activity className="h-4 w-4" />
                阈值分析
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* 性能指标卡片 */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">准确率</div>
                    <div className="text-2xl font-bold text-medical-700">
                      {(evaluationData.metrics.accuracy * 100).toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">精确率</div>
                    <div className="text-2xl font-bold text-medical-700">
                      {(evaluationData.metrics.precision * 100).toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">召回率</div>
                    <div className="text-2xl font-bold text-medical-700">
                      {(evaluationData.metrics.recall * 100).toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">F1分数</div>
                    <div className="text-2xl font-bold text-medical-700">
                      {(evaluationData.metrics.f1 * 100).toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">AUC</div>
                    <div className="text-2xl font-bold text-medical-700">
                      {(evaluationData.metrics.auc * 100).toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">特异性</div>
                    <div className="text-2xl font-bold text-medical-700">
                      {(evaluationData.metrics.specificity * 100).toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 混淆矩阵 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">混淆矩阵</CardTitle>
                    <CardDescription>模型预测结果与实际标签的对比</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={evaluationData.confusionMatrix}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                          >
                            {evaluationData.confusionMatrix.map((entry, index) => (
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
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">混淆矩阵详情</CardTitle>
                    <CardDescription>各类别的预测结果统计</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm font-medium text-green-700 mb-1">真阳性 (TP)</div>
                        <div className="text-2xl font-bold text-green-800">856</div>
                        <div className="text-xs text-green-600 mt-1">正确识别为阳性的样本</div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="text-sm font-medium text-red-700 mb-1">假阳性 (FP)</div>
                        <div className="text-2xl font-bold text-red-800">76</div>
                        <div className="text-xs text-red-600 mt-1">错误识别为阳性的样本</div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="text-sm font-medium text-yellow-700 mb-1">假阴性 (FN)</div>
                        <div className="text-2xl font-bold text-yellow-800">62</div>
                        <div className="text-xs text-yellow-600 mt-1">错误识别为阴性的样本</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm font-medium text-blue-700 mb-1">真阴性 (TN)</div>
                        <div className="text-2xl font-bold text-blue-800">906</div>
                        <div className="text-xs text-blue-600 mt-1">正确识别为阴性的样本</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="class-performance" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">各类别性能指标</CardTitle>
                  <CardDescription>不同疾病类别的模型性能对比</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      accuracy: {
                        label: "准确率",
                        color: "hsl(var(--chart-1))",
                      },
                      precision: {
                        label: "精确率",
                        color: "hsl(var(--chart-2))",
                      },
                      recall: {
                        label: "召回率",
                        color: "hsl(var(--chart-3))",
                      },
                      f1: {
                        label: "F1分数",
                        color: "hsl(var(--chart-4))",
                      },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={evaluationData.classPerformance} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          type="number"
                          domain={[0.8, 1]}
                          tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                        />
                        <YAxis type="category" dataKey="class" width={80} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="accuracy" fill="var(--color-accuracy)" name="准确率" />
                        <Bar dataKey="precision" fill="var(--color-precision)" name="精确率" />
                        <Bar dataKey="recall" fill="var(--color-recall)" name="召回率" />
                        <Bar dataKey="f1" fill="var(--color-f1)" name="F1分数" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">样本分布</CardTitle>
                  <CardDescription>各类别的样本数量分布</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={evaluationData.classPerformance}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="samples"
                          nameKey="class"
                          label={({ name, value, percent }) => `${name}: ${value}例 (${(percent * 100).toFixed(1)}%)`}
                        >
                          {evaluationData.classPerformance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}例`, "样本数"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="error-analysis" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">错误分析</CardTitle>
                  <CardDescription>模型错误预测的原因分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={evaluationData.errorAnalysis}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="count"
                              nameKey="category"
                              label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                            >
                              {evaluationData.errorAnalysis.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value}例`, "错误数"]} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div>
                      <div className="space-y-4">
                        {evaluationData.errorAnalysis.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">{item.category}</div>
                              <div className="text-xs text-gray-500">
                                {item.count}例 ({item.percentage}%)
                              </div>
                            </div>
                            <div className="w-full max-w-[200px] h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${item.percentage}%`,
                                  backgroundColor: COLORS[index % COLORS.length],
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                        <h4 className="font-medium text-amber-800 mb-2">改进建议</h4>
                        <ul className="text-sm text-amber-700 space-y-2">
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>增加图像质量较差的训练样本，提高模型对低质量图像的适应性</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>针对边界病例进行专项训练，提高模型对模糊情况的判断能力</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>增加罕见病例的样本数量，平衡各类别的训练数据</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">错误样本分析</CardTitle>
                  <CardDescription>查看和分析模型预测错误的样本</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 bg-slate-50 p-3 text-sm font-medium">
                      <div className="col-span-1">ID</div>
                      <div className="col-span-2">实际标签</div>
                      <div className="col-span-2">预测标签</div>
                      <div className="col-span-2">置信度</div>
                      <div className="col-span-3">错误类型</div>
                      <div className="col-span-2">操作</div>
                    </div>
                    <div className="divide-y">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="grid grid-cols-12 p-3 text-sm items-center">
                          <div className="col-span-1 font-medium">E-{i.toString().padStart(3, "0")}</div>
                          <div className="col-span-2">
                            <Badge variant="outline" className="bg-blue-50">
                              {i % 2 === 0 ? "肺结节" : "肺炎"}
                            </Badge>
                          </div>
                          <div className="col-span-2">
                            <Badge variant="outline" className="bg-red-50 text-red-700">
                              {i % 2 === 0 ? "正常" : "肺气肿"}
                            </Badge>
                          </div>
                          <div className="col-span-2">{(0.6 + i * 0.05).toFixed(2)}</div>
                          <div className="col-span-3">
                            {i % 3 === 0 ? "图像质量问题" : i % 3 === 1 ? "边界病例" : "罕见病例"}
                          </div>
                          <div className="col-span-2">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                查看
                              </Button>
                              <Button variant="outline" size="sm">
                                添加到训练
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

            <TabsContent value="threshold" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">置信度阈值分析</CardTitle>
                  <CardDescription>不同置信度阈值下的模型性能变化</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      precision: {
                        label: "精确率",
                        color: "hsl(var(--chart-1))",
                      },
                      recall: {
                        label: "召回率",
                        color: "hsl(var(--chart-2))",
                      },
                      f1: {
                        label: "F1分数",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={evaluationData.thresholdAnalysis}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="threshold"
                          tickFormatter={(value) => value.toFixed(1)}
                          label={{ value: "置信度阈值", position: "insideBottomRight", offset: -10 }}
                        />
                        <YAxis domain={[0.7, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="precision" stroke="var(--color-precision)" name="精确率" />
                        <Line type="monotone" dataKey="recall" stroke="var(--color-recall)" name="召回率" />
                        <Line type="monotone" dataKey="f1" stroke="var(--color-f1)" name="F1分数" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">阈值选择建议</h4>
                    <p className="text-sm text-blue-700 mb-4">
                      基于当前评估结果，建议将置信度阈值设置为 <strong>0.7</strong>
                      ，此时F1分数达到最优值0.91，精确率和召回率较为平衡。
                    </p>
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                        onClick={() => setConfidenceThreshold([0.7])}
                      >
                        应用推荐阈值
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button variant="outline" className="flex items-center gap-1">
                  <Save className="h-4 w-4" />
                  保存评估结果
                </Button>
                <Button variant="outline" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  生成报告
                </Button>
                <Button variant="outline" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  分享结果
                </Button>
                <Button className="bg-medical-600 hover:bg-medical-700 flex items-center gap-1">
                  <ArrowRight className="h-4 w-4" />
                  应用到模型
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
