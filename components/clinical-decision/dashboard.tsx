"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Brain, Stethoscope, FileText, PlusCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// 模拟诊断数据
const diagnosticData = [
  {
    id: "DIAG-001",
    patientName: "张三",
    patientId: "P-10045",
    symptoms: ["持续性头痛", "视力模糊", "恶心"],
    aiDiagnosis: "偏头痛",
    confidence: 92,
    alternativeDiagnoses: [
      { name: "紧张性头痛", probability: 45 },
      { name: "高血压性头痛", probability: 30 },
      { name: "眼部疾病", probability: 15 },
    ],
    recommendedTests: ["血压检测", "眼底检查", "头部CT扫描"],
    date: "2023-05-15",
  },
  {
    id: "DIAG-002",
    patientName: "李四",
    patientId: "P-10078",
    symptoms: ["胸痛", "呼吸急促", "心悸"],
    aiDiagnosis: "心绞痛",
    confidence: 88,
    alternativeDiagnoses: [
      { name: "胃食管反流", probability: 40 },
      { name: "肋间神经痛", probability: 25 },
      { name: "焦虑发作", probability: 20 },
    ],
    recommendedTests: ["心电图", "心脏酶学检查", "运动负荷试验"],
    date: "2023-05-16",
  },
  {
    id: "DIAG-003",
    patientName: "王五",
    patientId: "P-10103",
    symptoms: ["咳嗽", "发热", "胸痛", "呼吸困难"],
    aiDiagnosis: "社区获得性肺炎",
    confidence: 95,
    alternativeDiagnoses: [
      { name: "支气管炎", probability: 35 },
      { name: "流感", probability: 30 },
      { name: "COVID-19", probability: 25 },
    ],
    recommendedTests: ["胸部X光", "血常规", "痰培养", "核酸检测"],
    date: "2023-05-17",
  },
]

export function ClinicalDashboard() {
  const [activeTab, setActiveTab] = useState("recent")
  const [searchTerm, setSearchTerm] = useState("")

  // 过滤诊断数据
  const filteredDiagnostics = diagnosticData.filter(
    (diag) =>
      diag.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diag.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diag.aiDiagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>临床决策支持仪表板</CardTitle>
        <CardDescription>AI辅助诊断和治疗建议</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索患者、诊断或症状..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="w-full md:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            新建诊断
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="recent">最近诊断</TabsTrigger>
            <TabsTrigger value="saved">已保存模板</TabsTrigger>
            <TabsTrigger value="stats">诊断统计</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-4">
            {filteredDiagnostics.map((diagnostic) => (
              <Card key={diagnostic.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{diagnostic.patientName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{diagnostic.patientName}</CardTitle>
                          <Badge variant="outline">{diagnostic.patientId}</Badge>
                        </div>
                        <CardDescription>{diagnostic.date}</CardDescription>
                      </div>
                    </div>
                    <Badge
                      className="flex items-center gap-1"
                      variant={diagnostic.confidence >= 90 ? "default" : "secondary"}
                    >
                      <Brain className="h-3 w-3" />
                      AI 置信度: {diagnostic.confidence}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-sm font-medium">症状</h4>
                      <div className="flex flex-wrap gap-1">
                        {diagnostic.symptoms.map((symptom, index) => (
                          <Badge key={index} variant="outline">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-medium">AI 诊断</h4>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-primary" />
                        <span className="font-medium">{diagnostic.aiDiagnosis}</span>
                      </div>
                      <h4 className="mt-3 mb-2 text-sm font-medium">备选诊断</h4>
                      <div className="space-y-1">
                        {diagnostic.alternativeDiagnoses.map((alt, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span>{alt.name}</span>
                            <span className="text-muted-foreground">{alt.probability}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-medium">推荐检查</h4>
                    <div className="flex flex-wrap gap-1">
                      {diagnostic.recommendedTests.map((test, index) => (
                        <Badge key={index} variant="secondary">
                          {test}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <FileText className="h-4 w-4" />
                      查看详情
                    </Button>
                    <Button size="sm" className="gap-1">
                      <Stethoscope className="h-4 w-4" />
                      治疗建议
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <div className="flex items-center justify-center h-40 border rounded-md">
              <div className="text-center">
                <p className="text-muted-foreground">暂无保存的诊断模板</p>
                <Button variant="outline" className="mt-2">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  创建模板
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">诊断总数</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">128</div>
                  <p className="text-xs text-muted-foreground">
                    较上月 <span className="text-green-500">↑ 12%</span>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">平均置信度</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">
                    较上月 <span className="text-green-500">↑ 3%</span>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">医生采纳率</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">
                    较上月 <span className="text-green-500">↑ 5%</span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
