"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Info, BookOpen, Brain, AlertCircle, ArrowRight, ChevronRight } from "lucide-react"

export function DiagnosisExplainer() {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("diabetes")
  const [customQuery, setCustomQuery] = useState("")

  // 模拟诊断解释数据
  const diagnosisData = {
    diabetes: {
      name: "2型糖尿病",
      description: "2型糖尿病是一种代谢紊乱，特征是高血糖，伴随胰岛素抵抗和相对胰岛素分泌不足。",
      symptoms: ["多尿", "多饮", "多食", "体重减轻", "视力模糊", "疲劳", "伤口愈合缓慢"],
      riskFactors: ["超重或肥胖", "身体活动不足", "家族史", "年龄（45岁以上）", "高血压", "异常胆固醇和甘油三酯水平"],
      diagnosticCriteria: [
        "空腹血糖 ≥ 7.0 mmol/L (126 mg/dL)",
        "糖耐量试验2小时血糖 ≥ 11.1 mmol/L (200 mg/dL)",
        "HbA1c ≥ 6.5%",
        "随机血糖 ≥ 11.1 mmol/L (200 mg/dL) 伴典型高血糖症状",
      ],
      aiReasoning: [
        "患者血糖水平持续升高（空腹血糖8.3 mmol/L）",
        "HbA1c值为7.2%，超过诊断阈值",
        "患者报告多尿、多饮和疲劳等典型症状",
        "患者有超重和家族史等风险因素",
        "无1型糖尿病的自身免疫标志物",
      ],
    },
    hypertension: {
      name: "原发性高血压",
      description: "原发性高血压是一种常见的慢性疾病，特征是动脉血压持续升高，无明确的病因。",
      symptoms: ["大多数患者无症状", "头痛", "头晕", "视力问题", "胸痛", "呼吸困难"],
      riskFactors: ["年龄增长", "家族史", "超重或肥胖", "缺乏体力活动", "吸烟", "高钠饮食", "过量饮酒", "压力"],
      diagnosticCriteria: [
        "诊室血压 ≥ 140/90 mmHg",
        "家庭血压 ≥ 135/85 mmHg",
        "24小时动态血压 ≥ 130/80 mmHg",
        "需要在不同场合多次测量确认",
      ],
      aiReasoning: [
        "患者多次测量血压均 > 145/95 mmHg",
        "患者有家族史和超重等风险因素",
        "无继发性高血压的临床线索",
        "心电图显示左心室肥厚",
        "肾功能正常",
      ],
    },
  }

  const currentDiagnosis = selectedDiagnosis === "diabetes" ? diagnosisData.diabetes : diagnosisData.hypertension

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>诊断解释器</CardTitle>
          <CardDescription>了解AI诊断的详细解释、医学依据和推理过程</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="diagnosis-select">选择诊断</Label>
                <Select value={selectedDiagnosis} onValueChange={setSelectedDiagnosis}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择诊断" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diabetes">2型糖尿病</SelectItem>
                    <SelectItem value="hypertension">原发性高血压</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label htmlFor="custom-query">自定义问题</Label>
                <div className="flex gap-2">
                  <Textarea
                    id="custom-query"
                    placeholder="输入关于该诊断的具体问题..."
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    className="h-10"
                  />
                  <Button className="shrink-0">询问</Button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg flex items-start">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 shrink-0" />
              <div>
                <h3 className="font-medium text-blue-700">关于诊断解释器</h3>
                <p className="text-sm text-blue-600">
                  诊断解释器帮助医生理解AI诊断的依据和推理过程，提供相关医学知识和诊断标准的参考。这有助于医生做出最终的临床决策。
                </p>
              </div>
            </div>

            <Tabs defaultValue="overview">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="overview">概述</TabsTrigger>
                <TabsTrigger value="criteria">诊断标准</TabsTrigger>
                <TabsTrigger value="reasoning">AI推理过程</TabsTrigger>
                <TabsTrigger value="references">参考资料</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 pt-4">
                <div>
                  <h3 className="text-lg font-medium flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                    {currentDiagnosis.name}概述
                  </h3>
                  <p className="mt-2 text-gray-700">{currentDiagnosis.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">常见症状</h4>
                    <ul className="space-y-1">
                      {currentDiagnosis.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-center">
                          <ChevronRight className="h-4 w-4 text-blue-500 mr-1" />
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">风险因素</h4>
                    <ul className="space-y-1">
                      {currentDiagnosis.riskFactors.map((factor, index) => (
                        <li key={index} className="flex items-center">
                          <ChevronRight className="h-4 w-4 text-blue-500 mr-1" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="criteria" className="space-y-4 pt-4">
                <div>
                  <h3 className="text-lg font-medium flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
                    {currentDiagnosis.name}诊断标准
                  </h3>
                  <p className="mt-2 text-gray-700">以下是临床诊断{currentDiagnosis.name}的标准和依据：</p>
                </div>

                <div className="bg-white border rounded-lg p-4">
                  <ul className="space-y-3">
                    {currentDiagnosis.diagnosticCriteria.map((criteria, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                          {index + 1}
                        </div>
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="reasoning" className="space-y-4 pt-4">
                <div>
                  <h3 className="text-lg font-medium flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-blue-500" />
                    AI诊断推理过程
                  </h3>
                  <p className="mt-2 text-gray-700">AI系统是如何得出{currentDiagnosis.name}诊断的：</p>
                </div>

                <div className="bg-white border rounded-lg p-4">
                  <ol className="space-y-4">
                    {currentDiagnosis.aiReasoning.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3 shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{step}</div>
                          {index < currentDiagnosis.aiReasoning.length - 1 && (
                            <div className="ml-3 mt-2 mb-2 border-l-2 border-blue-200 pl-4 text-sm text-gray-500">
                              <ArrowRight className="h-4 w-4 text-blue-300 -rotate-90 mb-1" />
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-4 p-3 bg-green-50 rounded-lg text-green-700 flex items-center">
                    <div className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-2 shrink-0">
                      ✓
                    </div>
                    <span className="font-medium">结论：患者符合{currentDiagnosis.name}的诊断标准</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="references" className="space-y-4 pt-4">
                <div>
                  <h3 className="text-lg font-medium flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                    参考资料
                  </h3>
                  <p className="mt-2 text-gray-700">AI诊断所参考的医学指南和文献：</p>
                </div>

                <div className="space-y-3">
                  {selectedDiagnosis === "diabetes" ? (
                    <>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium">临床指南</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="text-blue-600 hover:underline cursor-pointer">
                            中国2型糖尿病防治指南 (2020版)
                          </li>
                          <li className="text-blue-600 hover:underline cursor-pointer">
                            美国糖尿病协会 (ADA) 糖尿病诊疗标准 (2023)
                          </li>
                          <li className="text-blue-600 hover:underline cursor-pointer">
                            国际糖尿病联盟 (IDF) 全球糖尿病指南
                          </li>
                        </ul>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium">相关研究</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="text-blue-600 hover:underline cursor-pointer">
                            中国成人2型糖尿病流行病学调查 (2019-2020)
                          </li>
                          <li className="text-blue-600 hover:underline cursor-pointer">
                            2型糖尿病早期干预的长期效果：系统性回顾与荟萃分析
                          </li>
                          <li className="text-blue-600 hover:underline cursor-pointer">
                            人工智能在糖尿病诊断中的应用：多中心验证研究
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium">临床指南</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="text-blue-600 hover:underline cursor-pointer">中国高血压防治指南 (2022版)</li>
                          <li className="text-blue-600 hover:underline cursor-pointer">
                            欧洲心脏病学会/欧洲高血压学会 (ESC/ESH) 高血压管理指南 (2023)
                          </li>
                          <li className="text-blue-600 hover:underline cursor-pointer">
                            美国心脏协会 (AHA) 高血压临床实践指南
                          </li>
                        </ul>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium">相关研究</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="text-blue-600 hover:underline cursor-pointer">
                            中国高血压流行病学调查与分析 (2018-2022)
                          </li>
                          <li className="text-blue-600 hover:underline cursor-pointer">
                            不同降压策略对心血管结局的影响：随机对照试验的荟萃分析
                          </li>
                          <li className="text-blue-600 hover:underline cursor-pointer">
                            机器学习在高血压风险预测中的应用：前瞻性队列研究
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
