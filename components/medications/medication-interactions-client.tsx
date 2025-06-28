"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MedicalButton } from "@/components/ui/medical-button"
import { Workflow, Search, AlertTriangle, Info, CheckCircle, X, Plus, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function MedicationInteractionsClient() {
  const [selectedMedications, setSelectedMedications] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const addMedication = (medication: string) => {
    if (!selectedMedications.includes(medication)) {
      setSelectedMedications([...selectedMedications, medication])
    }
  }

  const removeMedication = (medication: string) => {
    setSelectedMedications(selectedMedications.filter((med) => med !== medication))
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader
        heading="药物互作分析"
        subheading="检查和分析药物之间的相互作用"
        icon={<Workflow className="h-6 w-6 text-medical-600" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>选择药物</CardTitle>
              <CardDescription>添加药物以检查潜在的相互作用</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索药物..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="font-medium">常用药物</div>
                <div className="flex flex-wrap gap-2">
                  {commonMedications.map((med) => (
                    <MedicalButton
                      key={med}
                      variant="outline"
                      size="sm"
                      onClick={() => addMedication(med)}
                      disabled={selectedMedications.includes(med)}
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      {med}
                    </MedicalButton>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium">已选择药物</div>
                {selectedMedications.length === 0 ? (
                  <div className="text-sm text-muted-foreground">尚未选择任何药物</div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedMedications.map((med) => (
                      <Badge key={med} variant="secondary" className="flex items-center gap-1">
                        {med}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-destructive"
                          onClick={() => removeMedication(med)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <MedicalButton className="w-full" disabled={selectedMedications.length < 2}>
                分析相互作用
              </MedicalButton>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>患者处方分析</CardTitle>
              <CardDescription>分析特定患者的全部处方药物</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择患者" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient1">张明 (P10045678)</SelectItem>
                  <SelectItem value="patient2">王丽 (P10045679)</SelectItem>
                  <SelectItem value="patient3">刘强 (P10045680)</SelectItem>
                  <SelectItem value="patient4">赵芳 (P10045681)</SelectItem>
                </SelectContent>
              </Select>

              <MedicalButton className="w-full">分析患者处方</MedicalButton>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>相互作用分析结果</CardTitle>
              <CardDescription>
                {selectedMedications.length < 2
                  ? "请至少选择两种药物进行分析"
                  : `分析 ${selectedMedications.length} 种药物的相互作用`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedMedications.length < 2 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Workflow className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">准备分析药物相互作用</h3>
                  <p className="text-muted-foreground max-w-md mt-2">
                    请从左侧选择至少两种药物，系统将自动分析它们之间可能存在的相互作用
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">分析结果摘要</div>
                    <MedicalButton variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      导出报告
                    </MedicalButton>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-red-600">2</div>
                      <div className="text-sm text-red-600">严重相互作用</div>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <Info className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-amber-600">3</div>
                      <div className="text-sm text-amber-600">中度相互作用</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">5</div>
                      <div className="text-sm text-green-600">无相互作用</div>
                    </div>
                  </div>

                  <Tabs defaultValue="severe">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="severe">严重</TabsTrigger>
                      <TabsTrigger value="moderate">中度</TabsTrigger>
                      <TabsTrigger value="none">无相互作用</TabsTrigger>
                    </TabsList>

                    <TabsContent value="severe" className="space-y-4 mt-4">
                      <InteractionCard
                        drug1="阿司匹林"
                        drug2="华法林"
                        severity="severe"
                        description="两种药物联合使用会显著增加出血风险"
                        recommendation="避免联合使用，如必须使用，需密切监测凝血功能"
                      />
                      <InteractionCard
                        drug1="克拉霉素"
                        drug2="辛伐他汀"
                        severity="severe"
                        description="克拉霉素会抑制辛伐他汀的代谢，增加肌病和横纹肌溶解症风险"
                        recommendation="避免联合使用，考虑替代抗生素或调整他汀类药物"
                      />
                    </TabsContent>

                    <TabsContent value="moderate" className="space-y-4 mt-4">
                      <InteractionCard
                        drug1="氟西汀"
                        drug2="曲马多"
                        severity="moderate"
                        description="可能增加血清素综合征风险"
                        recommendation="谨慎联合使用，监测血清素综合征症状"
                      />
                      <InteractionCard
                        drug1="二甲双胍"
                        drug2="氢氯噻嗪"
                        severity="moderate"
                        description="可能影响血糖控制"
                        recommendation="联合使用时密切监测血糖水平"
                      />
                      <InteractionCard
                        drug1="阿托伐他汀"
                        drug2="地尔硫卓"
                        severity="moderate"
                        description="可能增加阿托伐他汀血药浓度"
                        recommendation="考虑降低阿托伐他汀剂量"
                      />
                    </TabsContent>

                    <TabsContent value="none" className="mt-4">
                      <div className="text-center py-4">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-muted-foreground">以下药物组合未发现明显相互作用</p>
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                          {selectedMedications
                            .filter(
                              (med) =>
                                ![
                                  "阿司匹林",
                                  "华法林",
                                  "克拉霉素",
                                  "辛伐他汀",
                                  "氟西汀",
                                  "曲马多",
                                  "二甲双胍",
                                  "氢氯噻嗪",
                                  "阿托伐他汀",
                                  "地尔硫卓",
                                ].includes(med),
                            )
                            .map((med) => (
                              <Badge key={med} variant="outline">
                                {med}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface InteractionCardProps {
  drug1: string
  drug2: string
  severity: "severe" | "moderate" | "mild"
  description: string
  recommendation: string
}

function InteractionCard({ drug1, drug2, severity, description, recommendation }: InteractionCardProps) {
  const getSeverityInfo = (severity: string) => {
    switch (severity) {
      case "severe":
        return {
          icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
          text: "严重",
          color: "bg-red-50 border-red-200",
        }
      case "moderate":
        return {
          icon: <Info className="h-5 w-5 text-amber-500" />,
          text: "中度",
          color: "bg-amber-50 border-amber-200",
        }
      case "mild":
        return { icon: <Info className="h-5 w-5 text-blue-500" />, text: "轻度", color: "bg-blue-50 border-blue-200" }
      default:
        return { icon: <Info className="h-5 w-5" />, text: severity, color: "bg-gray-50 border-gray-200" }
    }
  }

  const severityInfo = getSeverityInfo(severity)

  return (
    <div className={`border rounded-lg p-4 ${severityInfo.color}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {severityInfo.icon}
          <span className="font-medium">
            {drug1} + {drug2}
          </span>
        </div>
        <Badge variant="outline">{severityInfo.text}相互作用</Badge>
      </div>
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium">相互作用: </span>
          {description}
        </div>
        <div>
          <span className="font-medium">建议: </span>
          {recommendation}
        </div>
      </div>
    </div>
  )
}

// 示例数据
const commonMedications = [
  "阿司匹林",
  "氨氯地平",
  "阿托伐他汀",
  "二甲双胍",
  "辛伐他汀",
  "华法林",
  "克拉霉素",
  "氟西汀",
  "曲马多",
  "氢氯噻嗪",
  "地尔硫卓",
  "美托洛尔",
  "布地奈德",
  "沙丁胺醇",
  "格列美脲",
]
