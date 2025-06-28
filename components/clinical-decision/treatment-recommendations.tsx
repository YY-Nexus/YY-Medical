"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pill, Stethoscope, Activity, FileText, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// 模拟治疗建议数据
const treatmentRecommendations = [
  {
    id: "TR-001",
    diagnosis: "2型糖尿病",
    patientFactors: "45岁男性，BMI 28，无并发症",
    firstLine: [
      { type: "药物", name: "二甲双胍", dosage: "500mg，每日两次", notes: "饭后服用" },
      { type: "生活方式", name: "饮食控制", details: "低碳水化合物饮食，控制总热量摄入" },
      { type: "生活方式", name: "运动", details: "每周至少150分钟中等强度有氧运动" },
    ],
    alternativeOptions: [
      { type: "药物", name: "SGLT-2抑制剂", condition: "如二甲双胍不耐受" },
      { type: "药物", name: "DPP-4抑制剂", condition: "如需要更好的耐受性" },
    ],
    monitoringPlan: [
      { test: "空腹血糖", frequency: "每日" },
      { test: "糖化血红蛋白", frequency: "每3个月" },
      { test: "肾功能", frequency: "每6个月" },
    ],
    confidence: 95,
  },
  {
    id: "TR-002",
    diagnosis: "高血压",
    patientFactors: "62岁男性，伴有冠心病史",
    firstLine: [
      { type: "药物", name: "血管紧张素转换酶抑制剂(ACEI)", dosage: "根据具体药物调整", notes: "监测肾功能" },
      { type: "药物", name: "β受体阻滞剂", dosage: "根据具体药物调整", notes: "特别适用于伴有冠心病的患者" },
      { type: "生活方式", name: "低盐饮食", details: "每日钠摄入量<5g" },
    ],
    alternativeOptions: [
      { type: "药物", name: "钙通道阻滞剂", condition: "如ACEI不耐受" },
      { type: "药物", name: "血管紧张素II受体拮抗剂(ARB)", condition: "如出现ACEI相关咳嗽" },
    ],
    monitoringPlan: [
      { test: "血压", frequency: "每日" },
      { test: "肾功能", frequency: "开始治疗后2周，然后每6个月" },
      { test: "电解质", frequency: "开始治疗后2周，然后每6个月" },
    ],
    confidence: 92,
  },
]

export function TreatmentRecommendations() {
  const [activeTab, setActiveTab] = useState("TR-001")
  const [selectedTreatment, setSelectedTreatment] = useState(treatmentRecommendations[0])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    const treatment = treatmentRecommendations.find((t) => t.id === value)
    if (treatment) {
      setSelectedTreatment(treatment)
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>治疗方案推荐</CardTitle>
        <CardDescription>基于AI分析的个性化治疗方案建议</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            {treatmentRecommendations.map((treatment) => (
              <TabsTrigger key={treatment.id} value={treatment.id}>
                {treatment.diagnosis}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedTreatment.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">{selectedTreatment.diagnosis}</h3>
                <p className="text-sm text-muted-foreground">{selectedTreatment.patientFactors}</p>
              </div>
              <Badge
                className="flex items-center gap-1"
                variant={selectedTreatment.confidence >= 90 ? "default" : "secondary"}
              >
                <Stethoscope className="h-3 w-3" />
                AI 置信度: {selectedTreatment.confidence}%
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-medium flex items-center gap-1">
                  <Activity className="h-4 w-4" />
                  一线治疗方案
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>类型</TableHead>
                      <TableHead>名称</TableHead>
                      <TableHead>详情</TableHead>
                      <TableHead>备注</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTreatment.firstLine.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Badge variant="outline">
                            {item.type === "药物" ? (
                              <Pill className="mr-1 h-3 w-3" />
                            ) : (
                              <Activity className="mr-1 h-3 w-3" />
                            )}
                            {item.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.dosage || item.details}</TableCell>
                        <TableCell>{item.notes || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-medium flex items-center gap-1">
                  <Pill className="h-4 w-4" />
                  替代治疗选项
                </h4>
                <div className="space-y-2">
                  {selectedTreatment.alternativeOptions.map((option, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md border p-2">
                      <div>
                        <div className="font-medium">{option.name}</div>
                        <div className="text-sm text-muted-foreground">{option.condition}</div>
                      </div>
                      <Badge variant="outline">{option.type}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-medium flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  监测计划
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>检测项目</TableHead>
                      <TableHead>频率</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTreatment.monitoringPlan.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.test}</TableCell>
                        <TableCell>{item.frequency}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between pt-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    采纳
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <ThumbsDown className="h-4 w-4" />
                    不采纳
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <MessageSquare className="h-4 w-4" />
                  添加备注
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
