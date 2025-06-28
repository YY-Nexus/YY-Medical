"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { Brain, Database, BarChart, Play, Pause, RefreshCw } from "lucide-react"

// 模拟训练数据
const trainingData = [
  { epoch: 1, loss: 0.75, accuracy: 0.65, valLoss: 0.78, valAccuracy: 0.63 },
  { epoch: 2, loss: 0.68, accuracy: 0.72, valLoss: 0.72, valAccuracy: 0.68 },
  { epoch: 3, loss: 0.62, accuracy: 0.78, valLoss: 0.65, valAccuracy: 0.74 },
  { epoch: 4, loss: 0.55, accuracy: 0.82, valLoss: 0.6, valAccuracy: 0.79 },
  { epoch: 5, loss: 0.48, accuracy: 0.86, valLoss: 0.55, valAccuracy: 0.82 },
  { epoch: 6, loss: 0.42, accuracy: 0.89, valLoss: 0.5, valAccuracy: 0.85 },
  { epoch: 7, loss: 0.38, accuracy: 0.91, valLoss: 0.47, valAccuracy: 0.87 },
  { epoch: 8, loss: 0.35, accuracy: 0.92, valLoss: 0.45, valAccuracy: 0.88 },
  { epoch: 9, loss: 0.32, accuracy: 0.93, valLoss: 0.43, valAccuracy: 0.89 },
  { epoch: 10, loss: 0.3, accuracy: 0.94, valLoss: 0.42, valAccuracy: 0.9 },
]

// 模拟数据集信息
const datasetInfo = {
  total: 25000,
  training: 20000,
  validation: 3000,
  test: 2000,
  categories: [
    { name: "心脏病", count: 5000 },
    { name: "糖尿病", count: 4500 },
    { name: "肺炎", count: 4000 },
    { name: "高血压", count: 3500 },
    { name: "骨折", count: 3000 },
    { name: "皮肤病", count: 2500 },
    { name: "其他", count: 2500 },
  ],
}

export function ModelTrainingDashboard() {
  const [activeTab, setActiveTab] = useState("training")
  const [isTraining, setIsTraining] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [selectedModel, setSelectedModel] = useState("cnn")
  const [selectedDisease, setSelectedDisease] = useState("all")

  // 模拟开始训练
  const startTraining = () => {
    setIsTraining(true)
    setTrainingProgress(0)

    // 模拟训练进度
    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsTraining(false)
          return 100
        }
        return prev + 1
      })
    }, 100)
  }

  // 模拟暂停训练
  const pauseTraining = () => {
    setIsTraining(false)
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>AI模型训练</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="training">训练过程</TabsTrigger>
            <TabsTrigger value="dataset">数据集管理</TabsTrigger>
            <TabsTrigger value="parameters">参数配置</TabsTrigger>
          </TabsList>

          <TabsContent value="training" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">选择模型架构</label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择模型架构" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cnn">卷积神经网络 (CNN)</SelectItem>
                      <SelectItem value="transformer">Transformer</SelectItem>
                      <SelectItem value="resnet">ResNet-50</SelectItem>
                      <SelectItem value="densenet">DenseNet-121</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">训练进度</label>
                  <Progress value={trainingProgress} className="h-2" />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Epoch: {Math.floor(trainingProgress / 10)} / 10</span>
                    <span>{trainingProgress}%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!isTraining ? (
                    <Button onClick={startTraining} className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      开始训练
                    </Button>
                  ) : (
                    <Button onClick={pauseTraining} variant="outline" className="flex-1">
                      <Pause className="w-4 h-4 mr-2" />
                      暂停训练
                    </Button>
                  )}
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    重置
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Brain className="w-5 h-5 text-emerald-500" />
                  <div>
                    <div className="font-medium">模型架构</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedModel === "cnn" && "卷积神经网络 (CNN)"}
                      {selectedModel === "transformer" && "Transformer"}
                      {selectedModel === "resnet" && "ResNet-50"}
                      {selectedModel === "densenet" && "DenseNet-121"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Database className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">数据集大小</div>
                    <div className="text-sm text-muted-foreground">
                      训练集: {datasetInfo.training.toLocaleString()} 样本
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <BarChart className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="font-medium">当前性能</div>
                    <div className="text-sm text-muted-foreground">
                      准确率:{" "}
                      {trainingData[Math.min(Math.floor(trainingProgress / 10), 9)]?.accuracy.toFixed(2) || "0.00"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trainingData.slice(0, Math.max(1, Math.floor(trainingProgress / 10)))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="epoch" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="accuracy" name="训练准确率" stroke="#10b981" />
                  <Line type="monotone" dataKey="valAccuracy" name="验证准确率" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="loss" name="训练损失" stroke="#ef4444" />
                  <Line type="monotone" dataKey="valLoss" name="验证损失" stroke="#f97316" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="dataset" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-medium mb-2">数据集分布</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={datasetInfo.categories} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="count" name="样本数量" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">数据集划分</h3>
                <div className="h-60 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { name: "训练集", value: datasetInfo.training },
                        { name: "验证集", value: datasetInfo.validation },
                        { name: "测试集", value: datasetInfo.test },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" name="样本数量" stroke="#10b981" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">数据增强策略</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">图像旋转</div>
                  <div className="text-sm text-muted-foreground">随机旋转 ±15°</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">亮度调整</div>
                  <div className="text-sm text-muted-foreground">随机调整 ±10%</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">水平翻转</div>
                  <div className="text-sm text-muted-foreground">50% 概率翻转</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">缩放</div>
                  <div className="text-sm text-muted-foreground">随机缩放 90-110%</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">裁剪</div>
                  <div className="text-sm text-muted-foreground">随机裁剪 224x224</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">对比度</div>
                  <div className="text-sm text-muted-foreground">随机调整 ±10%</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="parameters" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">训练参数</h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-muted rounded-lg">
                    <span>批量大小</span>
                    <span className="font-medium">32</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted rounded-lg">
                    <span>学习率</span>
                    <span className="font-medium">0.001</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted rounded-lg">
                    <span>优化器</span>
                    <span className="font-medium">Adam</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted rounded-lg">
                    <span>Epochs</span>
                    <span className="font-medium">10</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted rounded-lg">
                    <span>早停耐心值</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">模型参数</h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-muted rounded-lg">
                    <span>卷积层数</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted rounded-lg">
                    <span>全连接层数</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted rounded-lg">
                    <span>Dropout率</span>
                    <span className="font-medium">0.3</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted rounded-lg">
                    <span>激活函数</span>
                    <span className="font-medium">ReLU</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted rounded-lg">
                    <span>输出激活</span>
                    <span className="font-medium">Softmax</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
