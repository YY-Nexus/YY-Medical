"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"

// 模拟疾病分类性能数据
const diseasePerformance = [
  { name: "心脏病", precision: 0.92, recall: 0.89, f1: 0.9, accuracy: 0.91 },
  { name: "糖尿病", precision: 0.88, recall: 0.85, f1: 0.86, accuracy: 0.87 },
  { name: "肺炎", precision: 0.94, recall: 0.92, f1: 0.93, accuracy: 0.93 },
  { name: "高血压", precision: 0.87, recall: 0.84, f1: 0.85, accuracy: 0.86 },
  { name: "骨折", precision: 0.96, recall: 0.95, f1: 0.95, accuracy: 0.96 },
  { name: "皮肤病", precision: 0.91, recall: 0.88, f1: 0.89, accuracy: 0.9 },
]

// 模拟混淆矩阵数据
const confusionMatrix = [
  { name: "心脏病", 心脏病: 450, 糖尿病: 15, 肺炎: 10, 高血压: 20, 骨折: 5, 皮肤病: 0 },
  { name: "糖尿病", 心脏病: 25, 糖尿病: 430, 肺炎: 5, 高血压: 30, 骨折: 0, 皮肤病: 10 },
  { name: "肺炎", 心脏病: 10, 糖尿病: 5, 肺炎: 470, 高血压: 5, 骨折: 5, 皮肤病: 5 },
  { name: "高血压", 心脏病: 30, 糖尿病: 35, 肺炎: 5, 高血压: 420, 骨折: 0, 皮肤病: 10 },
  { name: "骨折", 心脏病: 0, 糖尿病: 0, 肺炎: 5, 高血压: 0, 骨折: 490, 皮肤病: 5 },
  { name: "皮肤病", 心脏病: 0, 糖尿病: 5, 肺炎: 5, 高血压: 5, 骨折: 5, 皮肤病: 480 },
]

// 模拟ROC曲线数据
const rocData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.02, tpr: 0.4 },
  { fpr: 0.05, tpr: 0.7 },
  { fpr: 0.1, tpr: 0.85 },
  { fpr: 0.2, tpr: 0.9 },
  { fpr: 0.3, tpr: 0.95 },
  { fpr: 0.5, tpr: 0.98 },
  { fpr: 0.7, tpr: 0.99 },
  { fpr: 1, tpr: 1 },
]

// 模拟模型比较数据
const modelComparison = [
  { name: "CNN", accuracy: 0.91, speed: 85, size: 45 },
  { name: "Transformer", accuracy: 0.93, speed: 70, size: 80 },
  { name: "ResNet-50", accuracy: 0.92, speed: 75, size: 65 },
  { name: "DenseNet-121", accuracy: 0.9, speed: 80, size: 60 },
]

export function ModelPerformanceMetrics() {
  const [activeTab, setActiveTab] = useState("metrics")
  const [selectedDisease, setSelectedDisease] = useState("all")

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>模型性能评估</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="metrics">性能指标</TabsTrigger>
            <TabsTrigger value="confusion">混淆矩阵</TabsTrigger>
            <TabsTrigger value="roc">ROC曲线</TabsTrigger>
            <TabsTrigger value="comparison">模型比较</TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="pt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">选择疾病类别</label>
              <Select value={selectedDisease} onValueChange={setSelectedDisease}>
                <SelectTrigger>
                  <SelectValue placeholder="选择疾病类别" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有疾病</SelectItem>
                  <SelectItem value="heart">心脏病</SelectItem>
                  <SelectItem value="diabetes">糖尿病</SelectItem>
                  <SelectItem value="pneumonia">肺炎</SelectItem>
                  <SelectItem value="hypertension">高血压</SelectItem>
                  <SelectItem value="fracture">骨折</SelectItem>
                  <SelectItem value="skin">皮肤病</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={diseasePerformance} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="precision" name="精确率" fill="#10b981" />
                  <Bar dataKey="recall" name="召回率" fill="#3b82f6" />
                  <Bar dataKey="f1" name="F1分数" fill="#f59e0b" />
                  <Bar dataKey="accuracy" name="准确率" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="p-3 bg-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground">平均精确率</div>
                <div className="text-2xl font-bold text-emerald-500">
                  {(
                    diseasePerformance.reduce((sum, item) => sum + item.precision, 0) / diseasePerformance.length
                  ).toFixed(2)}
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground">平均召回率</div>
                <div className="text-2xl font-bold text-blue-500">
                  {(diseasePerformance.reduce((sum, item) => sum + item.recall, 0) / diseasePerformance.length).toFixed(
                    2,
                  )}
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground">平均F1分数</div>
                <div className="text-2xl font-bold text-amber-500">
                  {(diseasePerformance.reduce((sum, item) => sum + item.f1, 0) / diseasePerformance.length).toFixed(2)}
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground">平均准确率</div>
                <div className="text-2xl font-bold text-purple-500">
                  {(
                    diseasePerformance.reduce((sum, item) => sum + item.accuracy, 0) / diseasePerformance.length
                  ).toFixed(2)}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="confusion" className="pt-4">
            <div className="h-96 overflow-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2 bg-muted">预测 \ 实际</th>
                    {diseasePerformance.map((disease) => (
                      <th key={disease.name} className="border p-2 bg-muted">
                        {disease.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {confusionMatrix.map((row, index) => (
                    <tr key={index}>
                      <td className="border p-2 font-medium bg-muted">{row.name}</td>
                      {diseasePerformance.map((disease) => (
                        <td
                          key={disease.name}
                          className={`border p-2 text-center ${row.name === disease.name ? "bg-green-100" : ""}`}
                          style={{
                            backgroundColor:
                              row.name === disease.name
                                ? `rgba(16, 185, 129, ${row[disease.name] / 500})`
                                : `rgba(239, 68, 68, ${row[disease.name] / 100})`,
                          }}
                        >
                          {row[disease.name]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="roc" className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rocData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="fpr"
                    label={{ value: "假阳性率 (FPR)", position: "insideBottom", offset: -5 }}
                    domain={[0, 1]}
                  />
                  <YAxis label={{ value: "真阳性率 (TPR)", angle: -90, position: "insideLeft" }} domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="tpr" name="ROC曲线" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="fpr" name="随机猜测" stroke="#9ca3af" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-medium mb-2">ROC曲线分析</h3>
              <p className="text-sm text-muted-foreground">
                ROC曲线下面积 (AUC): <span className="font-medium">0.92</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                该模型的ROC曲线显示了良好的分类性能，AUC值为0.92，表明模型在区分不同疾病类别方面表现出色。
                曲线远离对角线（随机猜测线），说明模型的预测能力显著优于随机猜测。
              </p>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">准确率比较</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={modelComparison} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0.85, 0.95]} />
                      <Tooltip />
                      <Bar dataKey="accuracy" name="准确率" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">综合性能雷达图</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={modelComparison}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="准确率" dataKey="accuracy" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                      <Radar name="速度" dataKey="speed" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      <Radar name="模型大小" dataKey="size" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">模型对比分析</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2 bg-muted">模型</th>
                      <th className="border p-2 bg-muted">准确率</th>
                      <th className="border p-2 bg-muted">推理速度</th>
                      <th className="border p-2 bg-muted">模型大小</th>
                      <th className="border p-2 bg-muted">优势</th>
                      <th className="border p-2 bg-muted">劣势</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 font-medium">CNN</td>
                      <td className="border p-2">91%</td>
                      <td className="border p-2">快</td>
                      <td className="border p-2">小</td>
                      <td className="border p-2">速度快，资源消耗少</td>
                      <td className="border p-2">复杂特征提取能力有限</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-medium">Transformer</td>
                      <td className="border p-2">93%</td>
                      <td className="border p-2">慢</td>
                      <td className="border p-2">大</td>
                      <td className="border p-2">准确率高，特征提取能力强</td>
                      <td className="border p-2">计算资源消耗大</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-medium">ResNet-50</td>
                      <td className="border p-2">92%</td>
                      <td className="border p-2">中</td>
                      <td className="border p-2">中</td>
                      <td className="border p-2">深度特征提取，准确率高</td>
                      <td className="border p-2">训练时间长</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-medium">DenseNet-121</td>
                      <td className="border p-2">90%</td>
                      <td className="border p-2">中</td>
                      <td className="border p-2">中</td>
                      <td className="border p-2">特征重用，参数效率高</td>
                      <td className="border p-2">内存消耗大</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
