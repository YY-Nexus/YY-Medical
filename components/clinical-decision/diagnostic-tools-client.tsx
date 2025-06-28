"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Brain,
  Stethoscope,
  FileText,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  ChevronRight,
  Lightbulb,
  Calculator,
  BarChart,
  Thermometer,
  Heart,
  Droplet,
  Clipboard,
  Filter,
  Search,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"

export function DiagnosticToolsClient() {
  const [activeTab, setActiveTab] = useState("symptom-analyzer")
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [symptomInput, setSymptomInput] = useState("")
  const [patientAge, setPatientAge] = useState<number | null>(null)
  const [patientGender, setPatientGender] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any | null>(null)

  // 鉴别诊断状态
  const [initialDiagnosis, setInitialDiagnosis] = useState<string | null>(null)
  const [differentialSymptoms, setDifferentialSymptoms] = useState<string[]>([])
  const [differentialResults, setDifferentialResults] = useState<any | null>(null)
  const [differentialLoading, setDifferentialLoading] = useState(false)

  // 风险评估状态
  const [selectedRiskTool, setSelectedRiskTool] = useState<string | null>(null)
  const [riskFactors, setRiskFactors] = useState<Record<string, any>>({})
  const [riskResult, setRiskResult] = useState<any | null>(null)
  const [calculatingRisk, setCalculatingRisk] = useState(false)

  // 模拟常见症状
  const commonSymptoms = [
    "头痛",
    "发热",
    "咳嗽",
    "胸痛",
    "腹痛",
    "恶心",
    "呕吐",
    "腹泻",
    "便秘",
    "呼吸困难",
    "疲劳",
    "体重减轻",
    "食欲不振",
    "关节痛",
    "肌肉痛",
    "皮疹",
    "头晕",
    "视力模糊",
    "听力下降",
    "心悸",
  ]

  // 模拟常见诊断
  const commonDiagnoses = [
    "上呼吸道感染",
    "肺炎",
    "支气管炎",
    "胃炎",
    "胃溃疡",
    "肠炎",
    "尿路感染",
    "高血压",
    "糖尿病",
    "冠心病",
    "心力衰竭",
    "脑梗塞",
    "偏头痛",
    "抑郁症",
    "焦虑症",
    "甲状腺功能亢进",
    "甲状腺功能减退",
    "类风湿关节炎",
    "骨关节炎",
    "肝炎",
  ]

  // 模拟风险评估工具
  const riskAssessmentTools = [
    {
      id: "cvd-risk",
      name: "心血管疾病风险评估",
      description: "评估10年内发生心血管疾病的风险",
      icon: <Heart className="h-5 w-5 text-red-500" />,
      factors: [
        { id: "age", name: "年龄", type: "number", unit: "岁" },
        { id: "gender", name: "性别", type: "select", options: ["男", "女"] },
        { id: "sbp", name: "收缩压", type: "number", unit: "mmHg" },
        { id: "tc", name: "总胆固醇", type: "number", unit: "mmol/L" },
        { id: "hdl", name: "高密度脂蛋白", type: "number", unit: "mmol/L" },
        { id: "diabetes", name: "糖尿病", type: "boolean" },
        { id: "smoker", name: "吸烟", type: "boolean" },
      ],
    },
    {
      id: "stroke-risk",
      name: "卒中风险评估 (CHA₂DS₂-VASc)",
      description: "评估心房颤动患者发生卒中的风险",
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      factors: [
        { id: "chf", name: "心力衰竭", type: "boolean" },
        { id: "hypertension", name: "高血压", type: "boolean" },
        { id: "age75", name: "年龄≥75岁", type: "boolean" },
        { id: "diabetes", name: "糖尿病", type: "boolean" },
        { id: "stroke", name: "既往卒中/TIA", type: "boolean" },
        { id: "vascular", name: "血管疾病", type: "boolean" },
        { id: "age65", name: "年龄65-74岁", type: "boolean" },
        { id: "gender", name: "性别", type: "select", options: ["男", "女"] },
      ],
    },
    {
      id: "bleeding-risk",
      name: "出血风险评估 (HAS-BLED)",
      description: "评估抗凝治疗患者的出血风险",
      icon: <Droplet className="h-5 w-5 text-red-500" />,
      factors: [
        { id: "hypertension", name: "高血压", type: "boolean" },
        { id: "renal", name: "肾功能异常", type: "boolean" },
        { id: "liver", name: "肝功能异常", type: "boolean" },
        { id: "stroke", name: "既往卒中", type: "boolean" },
        { id: "bleeding", name: "出血史或倾向", type: "boolean" },
        { id: "inr", name: "INR不稳定", type: "boolean" },
        { id: "age65", name: "年龄>65岁", type: "boolean" },
        { id: "drugs", name: "药物使用", type: "boolean" },
        { id: "alcohol", name: "酒精使用", type: "boolean" },
      ],
    },
    {
      id: "pneumonia-risk",
      name: "肺炎严重程度评估 (CURB-65)",
      description: "评估肺炎患者的严重程度和死亡风险",
      icon: <Thermometer className="h-5 w-5 text-orange-500" />,
      factors: [
        { id: "confusion", name: "意识模糊", type: "boolean" },
        { id: "urea", name: "尿素>7mmol/L", type: "boolean" },
        { id: "respiratory", name: "呼吸频率≥30次/分", type: "boolean" },
        { id: "bp", name: "血压(收缩压<90mmHg或舒张压≤60mmHg)", type: "boolean" },
        { id: "age65", name: "年龄≥65岁", type: "boolean" },
      ],
    },
  ]

  // 添加症状
  const addSymptom = (symptom: string) => {
    if (symptom && !symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom])
      setSymptomInput("")
    }
  }

  // 移除症状
  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter((s) => s !== symptom))
  }

  // 添加鉴别诊断症状
  const addDifferentialSymptom = (symptom: string) => {
    if (symptom && !differentialSymptoms.includes(symptom)) {
      setDifferentialSymptoms([...differentialSymptoms, symptom])
    }
  }

  // 移除鉴别诊断症状
  const removeDifferentialSymptom = (symptom: string) => {
    setDifferentialSymptoms(differentialSymptoms.filter((s) => s !== symptom))
  }

  // 模拟分析过程
  const analyzeSymptoms = () => {
    if (symptoms.length === 0) return

    setAnalyzing(true)
    setAnalysisResult(null)

    // 模拟API调用延迟
    setTimeout(() => {
      // 模拟分析结果
      const result = {
        possibleDiagnoses: [
          {
            name: "上呼吸道感染",
            probability: 0.85,
            description: "上呼吸道感染是指鼻、咽、喉等上呼吸道的急性炎症，常由病毒或细菌引起。",
            symptoms: ["发热", "咳嗽", "喉咙痛", "鼻塞", "流涕"],
            recommendedTests: ["血常规", "咽拭子培养"],
            urgencyLevel: "一般",
          },
          {
            name: "流行性感冒",
            probability: 0.65,
            description: "流行性感冒是由流感病毒引起的急性呼吸道传染病，具有较强的传染性。",
            symptoms: ["高热", "全身肌肉酸痛", "乏力", "咳嗽", "头痛"],
            recommendedTests: ["流感病毒核酸检测", "血常规"],
            urgencyLevel: "一般",
          },
          {
            name: "支气管炎",
            probability: 0.45,
            description: "支气管炎是支气管粘膜的炎症，可由感染或非感染因素引起。",
            symptoms: ["咳嗽", "咳痰", "胸闷", "气促", "低热"],
            recommendedTests: ["胸部X线", "痰培养", "血常规"],
            urgencyLevel: "一般",
          },
        ],
        riskFactors: [
          {
            factor: "年龄",
            risk: patientAge && patientAge > 65 ? "高" : "低",
            description: patientAge && patientAge > 65 ? "老年人免疫功能下降，感染风险增加" : "年龄不是主要风险因素",
          },
          {
            factor: "症状持续时间",
            risk: "中",
            description: "症状持续时间超过3天，需要进一步评估",
          },
        ],
        urgencyAssessment: {
          level: "一般",
          recommendation: "建议在24小时内就医",
          warningSigns: ["高热持续不退", "呼吸困难加重", "意识状态改变"],
        },
        differentialPoints: [
          "流感通常起病急，全身症状明显，而普通感冒起病较缓，以上呼吸道症状为主",
          "支气管炎通常有明显的咳痰，而上呼吸道感染痰液较少",
          "肺炎可能有明显的呼吸困难和湿啰音，需要进行胸部影像学检查鉴别",
        ],
      }

      setAnalysisResult(result)
      setAnalyzing(false)
    }, 2000)
  }

  // 清空分析
  const clearAnalysis = () => {
    setSymptoms([])
    setPatientAge(null)
    setPatientGender(null)
    setAnalysisResult(null)
  }

  // 模拟鉴别诊断分析
  const analyzeDifferentialDiagnosis = () => {
    if (!initialDiagnosis) return

    setDifferentialLoading(true)
    setDifferentialResults(null)

    // 模拟API调用延迟
    setTimeout(() => {
      // 模拟鉴别诊断结果
      const results = {
        initialDiagnosis: initialDiagnosis,
        differentialDiagnoses: [
          {
            name: "肺炎",
            similarity: 0.78,
            keyDifferences: [
              "肺炎患者通常有明显的呼吸困难",
              "肺炎可能有湿啰音",
              "肺炎患者常有高热不退",
              "肺炎需要进行胸部影像学检查确诊",
            ],
            diagnosticCriteria: ["胸部X线或CT显示肺部浸润影", "白细胞计数升高", "咳嗽伴有脓性痰液"],
          },
          {
            name: "慢性阻塞性肺疾病急性加重",
            similarity: 0.65,
            keyDifferences: [
              "COPD患者有长期吸烟史或其他危险因素暴露史",
              "COPD患者有慢性咳嗽、咳痰和呼吸困难病史",
              "COPD患者肺功能检查显示气流受限",
            ],
            diagnosticCriteria: ["肺功能检查FEV1/FVC<0.7", "支气管扩张试验阴性", "有COPD病史"],
          },
          {
            name: "支气管哮喘",
            similarity: 0.55,
            keyDifferences: [
              "哮喘发作常有明显的喘息",
              "哮喘症状常在夜间或清晨加重",
              "哮喘患者对支气管扩张剂反应良好",
              "哮喘患者常有过敏史",
            ],
            diagnosticCriteria: ["肺功能检查显示可逆性气流受限", "支气管激发试验阳性", "呼出气一氧化氮升高"],
          },
        ],
        recommendedTests: [
          {
            name: "胸部X线检查",
            purpose: "检查肺部是否有浸润影、积液或其他异常",
            priority: "高",
          },
          {
            name: "血常规",
            purpose: "评估是否有感染、炎症反应",
            priority: "高",
          },
          {
            name: "痰培养",
            purpose: "确定病原体及药物敏感性",
            priority: "中",
          },
          {
            name: "肺功能检查",
            purpose: "评估肺功能状态，鉴别COPD和哮喘",
            priority: "中",
          },
          {
            name: "血气分析",
            purpose: "评估氧合和通气功能",
            priority: "根据病情",
          },
        ],
        clinicalPearls: [
          "在老年患者中，肺炎可能表现不典型，可能没有发热或白细胞升高",
          "支气管哮喘和COPD可能并存，称为哮喘-COPD重叠综合征(ACOS)",
          "肺栓塞应作为呼吸困难的重要鉴别诊断，尤其是在有危险因素的患者中",
          "心力衰竭可引起呼吸困难，应注意心源性和肺源性呼吸困难的鉴别",
        ],
      }

      setDifferentialResults(results)
      setDifferentialLoading(false)
    }, 2000)
  }

  // 清空鉴别诊断
  const clearDifferentialDiagnosis = () => {
    setInitialDiagnosis(null)
    setDifferentialSymptoms([])
    setDifferentialResults(null)
  }

  // 计算风险评分
  const calculateRisk = () => {
    if (!selectedRiskTool) return

    setCalculatingRisk(true)
    setRiskResult(null)

    // 模拟API调用延迟
    setTimeout(() => {
      // 根据不同的风险评估工具生成不同的结果
      let result
      const tool = riskAssessmentTools.find((t) => t.id === selectedRiskTool)

      if (selectedRiskTool === "cvd-risk") {
        // 模拟心血管疾病风险评估结果
        const riskScore = Math.round(Math.random() * 30)
        result = {
          toolName: tool?.name,
          score: riskScore,
          interpretation: riskScore < 10 ? "低风险" : riskScore < 20 ? "中等风险" : "高风险",
          riskLevel: riskScore < 10 ? "低" : riskScore < 20 ? "中" : "高",
          riskPercentage: riskScore,
          recommendations: [
            riskScore < 10
              ? "继续保持健康生活方式"
              : riskScore < 20
                ? "考虑生活方式干预，必要时药物治疗"
                : "积极干预所有危险因素，考虑药物治疗",
            "定期监测血压和血脂",
            "戒烟限酒",
            "规律运动，健康饮食",
          ],
          followUp:
            riskScore < 10 ? "建议每年评估一次" : riskScore < 20 ? "建议每6个月评估一次" : "建议每3个月评估一次",
        }
      } else if (selectedRiskTool === "stroke-risk") {
        // 模拟卒中风险评估结果
        let score = 0
        if (riskFactors.chf) score += 1
        if (riskFactors.hypertension) score += 1
        if (riskFactors.age75) score += 2
        if (riskFactors.diabetes) score += 1
        if (riskFactors.stroke) score += 2
        if (riskFactors.vascular) score += 1
        if (riskFactors.age65) score += 1
        if (riskFactors.gender === "女") score += 1

        const annualRisk = [0, 1.3, 2.2, 3.2, 4.0, 6.7, 9.8, 9.6, 6.7, 15.2][score] || 15.2

        result = {
          toolName: tool?.name,
          score: score,
          interpretation:
            score === 0
              ? "极低风险"
              : score === 1
                ? "低风险"
                : score <= 3
                  ? "中等风险"
                  : score <= 5
                    ? "中高风险"
                    : "高风险",
          riskLevel: score < 2 ? "低" : score < 4 ? "中" : "高",
          riskPercentage: annualRisk,
          recommendations: [
            score < 2 ? "可考虑不抗凝" : score < 4 ? "考虑口服抗凝药物" : "强烈推荐口服抗凝药物，除非有明确禁忌",
            "控制其他心血管危险因素",
            "定期随访评估卒中和出血风险",
          ],
          followUp: "建议每3-6个月随访一次",
        }
      } else if (selectedRiskTool === "bleeding-risk") {
        // 模拟出血风险评估结果
        let score = 0
        if (riskFactors.hypertension) score += 1
        if (riskFactors.renal) score += 1
        if (riskFactors.liver) score += 1
        if (riskFactors.stroke) score += 1
        if (riskFactors.bleeding) score += 1
        if (riskFactors.inr) score += 1
        if (riskFactors.age65) score += 1
        if (riskFactors.drugs) score += 1
        if (riskFactors.alcohol) score += 1

        result = {
          toolName: tool?.name,
          score: score,
          interpretation: score < 3 ? "低出血风险" : score === 3 ? "中等出血风险" : "高出血风险",
          riskLevel: score < 3 ? "低" : score === 3 ? "中" : "高",
          riskPercentage: score < 3 ? 1.13 : score === 3 ? 3.74 : 8.7,
          recommendations: [
            score >= 3 ? "谨慎使用抗凝药物，密切监测" : "可以相对安全地使用抗凝药物",
            "控制可调节的出血风险因素",
            "考虑定期监测血常规和肝肾功能",
            score >= 3 ? "考虑降低抗凝药物剂量或选择出血风险较低的抗凝药物" : "",
          ].filter(Boolean),
          followUp: score < 3 ? "建议每6个月评估一次" : "建议每3个月评估一次",
        }
      } else if (selectedRiskTool === "pneumonia-risk") {
        // 模拟肺炎严重程度评估结果
        let score = 0
        if (riskFactors.confusion) score += 1
        if (riskFactors.urea) score += 1
        if (riskFactors.respiratory) score += 1
        if (riskFactors.bp) score += 1
        if (riskFactors.age65) score += 1

        let mortality
        if (score === 0) mortality = "0.6%"
        else if (score === 1) mortality = "2.7%"
        else if (score === 2) mortality = "6.8%"
        else if (score === 3) mortality = "14.0%"
        else mortality = "27.8%"

        result = {
          toolName: tool?.name,
          score: score,
          interpretation:
            score === 0 || score === 1
              ? "低风险，可考虑门诊治疗"
              : score === 2
                ? "中等风险，考虑住院治疗"
                : "高风险，需要住院治疗，考虑ICU",
          riskLevel: score < 2 ? "低" : score === 2 ? "中" : "高",
          riskPercentage: Number.parseFloat(mortality),
          recommendations: [
            score < 2
              ? "可考虑门诊治疗"
              : score === 2
                ? "建议住院治疗"
                : score >= 4
                  ? "建议ICU治疗"
                  : "需要住院治疗，评估是否需要ICU",
            "及时给予适当的抗生素治疗",
            "监测生命体征和氧合状态",
            score >= 3 ? "考虑呼吸支持治疗" : "",
          ].filter(Boolean),
          followUp: score < 2 ? "24-48小时复查" : "密切监测病情变化",
        }
      }

      setRiskResult(result)
      setCalculatingRisk(false)
    }, 1500)
  }

  // 清空风险评估
  const clearRiskAssessment = () => {
    setSelectedRiskTool(null)
    setRiskFactors({})
    setRiskResult(null)
  }

  // 处理风险因素变化
  const handleRiskFactorChange = (id: string, value: any) => {
    setRiskFactors({
      ...riskFactors,
      [id]: value,
    })
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="symptom-analyzer">症状分析器</TabsTrigger>
          <TabsTrigger value="differential-diagnosis">鉴别诊断助手</TabsTrigger>
          <TabsTrigger value="risk-calculator">风险评估计算器</TabsTrigger>
        </TabsList>

        {/* 症状分析器 */}
        <TabsContent value="symptom-analyzer" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* 左侧：症状输入 */}
            <Card>
              <CardHeader>
                <CardTitle>症状输入</CardTitle>
                <CardDescription>输入患者症状和基本信息，获取AI辅助诊断</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>患者基本信息</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-age">年龄</Label>
                      <Input
                        id="patient-age"
                        type="number"
                        placeholder="输入年龄"
                        value={patientAge || ""}
                        onChange={(e) => setPatientAge(Number.parseInt(e.target.value) || null)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-gender">性别</Label>
                      <Select value={patientGender || ""} onValueChange={setPatientGender}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择性别" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">男</SelectItem>
                          <SelectItem value="female">女</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>症状</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="输入症状"
                      value={symptomInput}
                      onChange={(e) => setSymptomInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addSymptom(symptomInput)
                        }
                      }}
                    />
                    <Button type="button" onClick={() => addSymptom(symptomInput)}>
                      添加
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {symptoms.map((symptom) => (
                      <Badge key={symptom} variant="secondary" className="flex items-center gap-1">
                        {symptom}
                        <button
                          className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                          onClick={() => removeSymptom(symptom)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>

                  {symptoms.length === 0 && (
                    <p className="text-sm text-muted-foreground">尚未添加症状，请添加至少一个症状</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>常见症状</Label>
                  <ScrollArea className="h-[120px]">
                    <div className="flex flex-wrap gap-2">
                      {commonSymptoms.map((symptom) => (
                        <Badge
                          key={symptom}
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-100"
                          onClick={() => addSymptom(symptom)}
                        >
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="space-y-2">
                  <Label>其他信息</Label>
                  <Textarea placeholder="输入其他相关信息，如症状持续时间、加重或缓解因素等" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={clearAnalysis}>
                  清空
                </Button>
                <Button onClick={analyzeSymptoms} disabled={symptoms.length === 0 || analyzing} className="gap-2">
                  {analyzing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
                  {analyzing ? "分析中..." : "分析症状"}
                </Button>
              </CardFooter>
            </Card>

            {/* 右侧：分析结果 */}
            <Card>
              <CardHeader>
                <CardTitle>分析结果</CardTitle>
                <CardDescription>基于输入症状的AI辅助诊断结果</CardDescription>
              </CardHeader>
              <CardContent>
                {analyzing ? (
                  <div className="flex flex-col items-center justify-center h-[400px]">
                    <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mb-4" />
                    <p className="text-muted-foreground">正在分析症状，请稍候...</p>
                  </div>
                ) : analysisResult ? (
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2 flex items-center">
                          <Stethoscope className="h-5 w-5 mr-2 text-blue-500" />
                          可能的诊断
                        </h3>
                        <div className="space-y-4">
                          {analysisResult.possibleDiagnoses.map((diagnosis: any, index: number) => (
                            <Card key={index} className="overflow-hidden">
                              <CardHeader className="pb-2 bg-gray-50">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <span className="font-medium">{diagnosis.name}</span>
                                    <Badge className="ml-2 bg-blue-100 text-blue-800">
                                      {Math.round(diagnosis.probability * 100)}%
                                    </Badge>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className={
                                      diagnosis.urgencyLevel === "紧急"
                                        ? "bg-red-100 text-red-800"
                                        : diagnosis.urgencyLevel === "较急"
                                          ? "bg-orange-100 text-orange-800"
                                          : "bg-green-100 text-green-800"
                                    }
                                  >
                                    {diagnosis.urgencyLevel}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="pt-3">
                                <p className="text-sm mb-3">{diagnosis.description}</p>

                                <div className="mb-3">
                                  <h4 className="text-xs font-medium text-gray-500 mb-1">典型症状：</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {diagnosis.symptoms.map((symptom: string, i: number) => (
                                      <Badge
                                        key={i}
                                        variant="outline"
                                        className={symptoms.includes(symptom) ? "bg-green-100 text-green-800" : ""}
                                      >
                                        {symptoms.includes(symptom) && <CheckCircle className="h-3 w-3 mr-1" />}
                                        {symptom}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div className="mb-3">
                                  <h4 className="text-xs font-medium text-gray-500 mb-1">建议检查：</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {diagnosis.recommendedTests.map((test: string, i: number) => (
                                      <Badge key={i} variant="secondary">
                                        {test}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div className="mt-2 pt-2 border-t flex justify-end">
                                  <Button variant="outline" size="sm" className="text-xs">
                                    查看详情
                                    <ChevronRight className="h-3 w-3 ml-1" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2 flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                          风险评估
                        </h3>
                        <Card>
                          <CardContent className="pt-4">
                            <div className="space-y-3">
                              {analysisResult.riskFactors.map((factor: any, index: number) => (
                                <div key={index} className="flex justify-between items-center">
                                  <div>
                                    <span className="font-medium">{factor.factor}</span>
                                    <p className="text-sm text-muted-foreground">{factor.description}</p>
                                  </div>
                                  <Badge
                                    className={
                                      factor.risk === "高"
                                        ? "bg-red-100 text-red-800"
                                        : factor.risk === "中"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-green-100 text-green-800"
                                    }
                                  >
                                    {factor.risk}风险
                                  </Badge>
                                </div>
                              ))}
                            </div>

                            <div className="mt-4 pt-3 border-t">
                              <h4 className="text-sm font-medium mb-2">紧急程度评估</h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">紧急程度：</span>
                                  <Badge
                                    className={
                                      analysisResult.urgencyAssessment.level === "紧急"
                                        ? "bg-red-100 text-red-800"
                                        : analysisResult.urgencyAssessment.level === "较急"
                                          ? "bg-orange-100 text-orange-800"
                                          : "bg-green-100 text-green-800"
                                    }
                                  >
                                    {analysisResult.urgencyAssessment.level}
                                  </Badge>
                                </div>
                                <p className="text-sm">{analysisResult.urgencyAssessment.recommendation}</p>

                                <div className="mt-2">
                                  <h5 className="text-xs font-medium text-gray-500 mb-1">警示症状：</h5>
                                  <ul className="list-disc list-inside text-sm">
                                    {analysisResult.urgencyAssessment.warningSigns.map((sign: string, i: number) => (
                                      <li key={i}>{sign}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2 flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-gray-500" />
                          鉴别要点
                        </h3>
                        <Card>
                          <CardContent className="pt-4">
                            <ul className="list-disc list-inside space-y-2">
                              {analysisResult.differentialPoints.map((point: string, index: number) => (
                                <li key={index} className="text-sm">
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <Lightbulb className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">尚未进行分析</h3>
                    <p className="text-muted-foreground max-w-md">
                      请在左侧输入患者症状和基本信息，然后点击"分析症状"按钮获取AI辅助诊断结果
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 鉴别诊断助手 */}
        <TabsContent value="differential-diagnosis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>鉴别诊断助手</CardTitle>
              <CardDescription>输入初步诊断，获取鉴别诊断建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>初步诊断</Label>
                    <Select value={initialDiagnosis || ""} onValueChange={setInitialDiagnosis}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择或输入初步诊断" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonDiagnoses.map((diagnosis) => (
                          <SelectItem key={diagnosis} value={diagnosis}>
                            {diagnosis}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>关键症状和体征</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="输入症状或体征"
                        value={symptomInput}
                        onChange={(e) => setSymptomInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addDifferentialSymptom(symptomInput)
                            setSymptomInput("")
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addDifferentialSymptom(symptomInput)
                          setSymptomInput("")
                        }}
                      >
                        添加
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {differentialSymptoms.map((symptom) => (
                        <Badge key={symptom} variant="secondary" className="flex items-center gap-1">
                          {symptom}
                          <button
                            className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                            onClick={() => removeDifferentialSymptom(symptom)}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>患者基本信息</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="diff-patient-age">年龄</Label>
                        <Input id="diff-patient-age" type="number" placeholder="输入年龄" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="diff-patient-gender">性别</Label>
                        <Select>
                          <SelectTrigger id="diff-patient-gender">
                            <SelectValue placeholder="选择性别" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">男</SelectItem>
                            <SelectItem value="female">女</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>实验室检查结果</Label>
                    <Textarea placeholder="输入已有的实验室检查结果" />
                  </div>

                  <div className="space-y-2">
                    <Label>影像学检查结果</Label>
                    <Textarea placeholder="输入已有的影像学检查结果" />
                  </div>

                  <div className="flex justify-between mt-4">
                    <Button variant="outline" onClick={clearDifferentialDiagnosis}>
                      清空
                    </Button>
                    <Button
                      onClick={analyzeDifferentialDiagnosis}
                      disabled={!initialDiagnosis || differentialLoading}
                      className="gap-2"
                    >
                      {differentialLoading ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Filter className="h-4 w-4" />
                      )}
                      {differentialLoading ? "分析中..." : "生成鉴别诊断"}
                    </Button>
                  </div>
                </div>

                <div>
                  {differentialLoading ? (
                    <div className="flex flex-col items-center justify-center h-[500px]">
                      <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mb-4" />
                      <p className="text-muted-foreground">正在生成鉴别诊断，请稍候...</p>
                    </div>
                  ) : differentialResults ? (
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-3 flex items-center">
                            <Filter className="h-5 w-5 mr-2 text-blue-500" />
                            鉴别诊断
                          </h3>

                          <Card className="mb-4 bg-blue-50 border-blue-200">
                            <CardContent className="pt-4">
                              <div className="flex items-center">
                                <div className="flex-1">
                                  <h4 className="font-medium">初步诊断：{differentialResults.initialDiagnosis}</h4>
                                  <p className="text-sm text-blue-700 mt-1">以下是与初步诊断需要鉴别的其他可能疾病</p>
                                </div>
                                <Search className="h-5 w-5 text-blue-500" />
                              </div>
                            </CardContent>
                          </Card>

                          <div className="space-y-4">
                            {differentialResults.differentialDiagnoses.map((diagnosis: any, index: number) => (
                              <Card key={index}>
                                <CardHeader className="pb-2">
                                  <div className="flex justify-between items-center">
                                    <h4 className="font-medium">{diagnosis.name}</h4>
                                    <Badge className="bg-blue-100 text-blue-800">
                                      相似度 {Math.round(diagnosis.similarity * 100)}%
                                    </Badge>
                                  </div>
                                </CardHeader>
                                <CardContent className="pt-3">
                                  <div className="space-y-3">
                                    <div>
                                      <h5 className="text-sm font-medium text-gray-700 mb-1">关键区别：</h5>
                                      <ul className="list-disc list-inside space-y-1">
                                        {diagnosis.keyDifferences.map((diff: string, i: number) => (
                                          <li key={i} className="text-sm">
                                            {diff}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div>
                                      <h5 className="text-sm font-medium text-gray-700 mb-1">诊断标准：</h5>
                                      <ul className="list-disc list-inside space-y-1">
                                        {diagnosis.diagnosticCriteria.map((criteria: string, i: number) => (
                                          <li key={i} className="text-sm">
                                            {criteria}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-3 flex items-center">
                            <Clipboard className="h-5 w-5 mr-2 text-green-600" />
                            建议检查
                          </h3>
                          <Card>
                            <CardContent className="pt-4">
                              <div className="space-y-3">
                                {differentialResults.recommendedTests.map((test: any, index: number) => (
                                  <div key={index} className="flex items-start">
                                    <Badge
                                      variant="outline"
                                      className={
                                        test.priority === "高"
                                          ? "bg-red-50 text-red-700 border-red-200 mr-2"
                                          : test.priority === "中"
                                            ? "bg-yellow-50 text-yellow-700 border-yellow-200 mr-2"
                                            : "bg-blue-50 text-blue-700 border-blue-200 mr-2"
                                      }
                                    >
                                      {test.priority}
                                    </Badge>
                                    <div>
                                      <div className="font-medium text-sm">{test.name}</div>
                                      <div className="text-sm text-gray-500">{test.purpose}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-3 flex items-center">
                            <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                            临床珍珠
                          </h3>
                          <Card>
                            <CardContent className="pt-4">
                              <ul className="list-disc list-inside space-y-2">
                                {differentialResults.clinicalPearls.map((pearl: string, index: number) => (
                                  <li key={index} className="text-sm">
                                    {pearl}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[500px] text-center">
                      <Filter className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">尚未生成鉴别诊断</h3>
                      <p className="text-muted-foreground max-w-md">
                        请在左侧选择初步诊断并输入关键症状，然后点击"生成鉴别诊断"按钮
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 风险评估计算器 */}
        <TabsContent value="risk-calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>风险评估计算器</CardTitle>
              <CardDescription>选择评估工具，计算患者的疾病风险</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>选择风险评估工具</Label>
                      <div className="grid grid-cols-1 gap-3">
                        {riskAssessmentTools.map((tool) => (
                          <Card
                            key={tool.id}
                            className={`cursor-pointer transition-all ${
                              selectedRiskTool === tool.id
                                ? "border-blue-500 bg-blue-50"
                                : "hover:border-gray-300 hover:bg-gray-50"
                            }`}
                            onClick={() => {
                              setSelectedRiskTool(tool.id)
                              setRiskFactors({})
                              setRiskResult(null)
                            }}
                          >
                            <CardContent className="p-4 flex items-center gap-3">
                              <div
                                className={`p-2 rounded-full ${
                                  selectedRiskTool === tool.id ? "bg-blue-100" : "bg-gray-100"
                                }`}
                              >
                                {tool.icon}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{tool.name}</h3>
                                <p className="text-sm text-gray-500">{tool.description}</p>
                              </div>
                              <ChevronRight
                                className={`h-5 w-5 ${
                                  selectedRiskTool === tool.id ? "text-blue-500" : "text-gray-300"
                                }`}
                              />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {selectedRiskTool && (
                      <div className="space-y-4 mt-6">
                        <h3 className="text-lg font-medium">
                          {riskAssessmentTools.find((t) => t.id === selectedRiskTool)?.name}
                        </h3>
                        <div className="space-y-4">
                          {riskAssessmentTools
                            .find((t) => t.id === selectedRiskTool)
                            ?.factors.map((factor) => (
                              <div key={factor.id} className="space-y-2">
                                <Label htmlFor={factor.id}>{factor.name}</Label>
                                {factor.type === "number" && (
                                  <div className="flex items-center gap-2">
                                    <Input
                                      id={factor.id}
                                      type="number"
                                      placeholder={`输入${factor.name}`}
                                      value={riskFactors[factor.id] || ""}
                                      onChange={(e) =>
                                        handleRiskFactorChange(factor.id, Number.parseFloat(e.target.value) || "")
                                      }
                                    />
                                    {factor.unit && <span className="text-sm text-gray-500">{factor.unit}</span>}
                                  </div>
                                )}
                                {factor.type === "select" && (
                                  <Select
                                    value={riskFactors[factor.id] || ""}
                                    onValueChange={(value) => handleRiskFactorChange(factor.id, value)}
                                  >
                                    <SelectTrigger id={factor.id}>
                                      <SelectValue placeholder={`选择${factor.name}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {factor.options?.map((option) => (
                                        <SelectItem key={option} value={option}>
                                          {option}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                                {factor.type === "boolean" && (
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      id={factor.id}
                                      checked={riskFactors[factor.id] || false}
                                      onCheckedChange={(checked) => handleRiskFactorChange(factor.id, checked)}
                                    />
                                    <Label htmlFor={factor.id} className="text-sm">
                                      {riskFactors[factor.id] ? "是" : "否"}
                                    </Label>
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>

                        <div className="flex justify-between mt-6">
                          <Button variant="outline" onClick={clearRiskAssessment}>
                            清空
                          </Button>
                          <Button
                            onClick={calculateRisk}
                            disabled={calculatingRisk}
                            className="gap-2 bg-blue-600 hover:bg-blue-700"
                          >
                            {calculatingRisk ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Calculator className="h-4 w-4" />
                            )}
                            {calculatingRisk ? "计算中..." : "计算风险"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {calculatingRisk ? (
                    <div className="flex flex-col items-center justify-center h-[500px]">
                      <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mb-4" />
                      <p className="text-muted-foreground">正在计算风险评分，请稍候...</p>
                    </div>
                  ) : riskResult ? (
                    <div className="space-y-6">
                      <Card className="bg-blue-50 border-blue-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl text-blue-800">{riskResult.toolName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="text-sm text-blue-700">风险评分</div>
                              <div className="text-3xl font-bold">{riskResult.score}</div>
                            </div>
                            <Badge
                              className={
                                riskResult.riskLevel === "高"
                                  ? "bg-red-100 text-red-800 text-lg px-3 py-1"
                                  : riskResult.riskLevel === "中"
                                    ? "bg-yellow-100 text-yellow-800 text-lg px-3 py-1"
                                    : "bg-green-100 text-green-800 text-lg px-3 py-1"
                              }
                            >
                              {riskResult.riskLevel}风险
                            </Badge>
                          </div>

                          <div className="mb-4">
                            <div className="text-sm text-blue-700 mb-1">风险解释</div>
                            <div className="text-lg font-medium">{riskResult.interpretation}</div>
                          </div>

                          {typeof riskResult.riskPercentage === "number" && (
                            <div className="mb-6">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-blue-700">风险百分比</span>
                                <span className="text-sm font-medium">{riskResult.riskPercentage.toFixed(1)}%</span>
                              </div>
                              <Progress
                                value={riskResult.riskPercentage}
                                max={30}
                                className="h-2"
                                style={{
                                  background: "linear-gradient(to right, #22c55e, #eab308, #ef4444)",
                                }}
                              />
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>低风险</span>
                                <span>中等风险</span>
                                <span>高风险</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">建议措施</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-2">
                            {riskResult.recommendations.map((rec: string, index: number) => (
                              <li key={index} className="text-sm">
                                {rec}
                              </li>
                            ))}
                          </ul>

                          <div className="mt-4 pt-4 border-t">
                            <div className="text-sm font-medium mb-2">随访建议</div>
                            <p className="text-sm">{riskResult.followUp}</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">风险因素分析</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {riskAssessmentTools
                              .find((t) => t.id === selectedRiskTool)
                              ?.factors.map((factor) => {
                                const value = riskFactors[factor.id]
                                return (
                                  <div key={factor.id} className="flex justify-between items-center">
                                    <div className="text-sm">{factor.name}</div>
                                    <div className="font-medium">
                                      {factor.type === "boolean" ? (value ? "是" : "否") : value || "未填写"}
                                      {factor.unit && value ? ` ${factor.unit}` : ""}
                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : selectedRiskTool ? (
                    <div className="flex flex-col items-center justify-center h-[500px] text-center">
                      <Calculator className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">请填写风险因素</h3>
                      <p className="text-muted-foreground max-w-md">
                        在左侧填写相关风险因素信息，然后点击"计算风险"按钮获取评估结果
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[500px] text-center">
                      <BarChart className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">请选择风险评估工具</h3>
                      <p className="text-muted-foreground max-w-md">
                        在左侧选择一个风险评估工具，填写相关信息后计算患者的疾病风险
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
