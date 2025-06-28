"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Brain, FileText, ImageIcon, Activity, AlertCircle, CheckCircle, HelpCircle } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

interface AIDiagnosisProps {
  patientId?: string
  recordId?: string
  className?: string
}

interface DiagnosisResult {
  condition: string
  probability: number
  description: string
  recommendations: string[]
  references: { title: string; url: string }[]
  severity: "low" | "medium" | "high" | "critical"
}

export function AIDiagnosis({ patientId, recordId, className = "" }: AIDiagnosisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<DiagnosisResult[]>([])
  const [activeTab, setActiveTab] = useState("text")
  const [userInput, setUserInput] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { t } = useTranslation()

  // 模拟图像列表
  const availableImages = [
    {
      id: "img1",
      thumbnail: "/placeholder.svg?height=100&width=100&query=X-Ray%20Chest",
      fullSize: "/placeholder.svg?height=512&width=512&query=X-Ray%20Chest",
      type: "X-Ray",
      date: "2023-10-15",
    },
    {
      id: "img2",
      thumbnail: "/placeholder.svg?height=100&width=100&query=MRI%20Brain",
      fullSize: "/placeholder.svg?height=512&width=512&query=MRI%20Brain",
      type: "MRI",
      date: "2023-09-22",
    },
    {
      id: "img3",
      thumbnail: "/placeholder.svg?height=100&width=100&query=CT%20Scan%20Abdomen",
      fullSize: "/placeholder.svg?height=512&width=512&query=CT%20Scan%20Abdomen",
      type: "CT",
      date: "2023-11-05",
    },
  ]

  // 模拟AI分析
  const performAnalysis = () => {
    setIsAnalyzing(true)

    // 模拟API调用延迟
    setTimeout(() => {
      // 根据不同的输入类型生成不同的结果
      let generatedResults: DiagnosisResult[] = []

      if (activeTab === "text" && userInput) {
        // 文本分析结果
        generatedResults = [
          {
            condition: "2型糖尿病",
            probability: 0.89,
            description: "基于症状描述和实验室值，患者很可能患有2型糖尿病。",
            recommendations: [
              "进行糖化血红蛋白(HbA1c)检测",
              "口服葡萄糖耐量试验(OGTT)",
              "制定饮食和运动计划",
              "考虑二甲双胍治疗",
            ],
            references: [
              { title: "美国糖尿病协会指南", url: "#" },
              { title: "2型糖尿病诊断标准", url: "#" },
            ],
            severity: "medium",
          },
          {
            condition: "高血压",
            probability: 0.72,
            description: "患者描述的症状和风险因素表明存在高血压的可能性。",
            recommendations: ["定期监测血压", "低盐饮食", "增加有氧运动", "考虑降压药物治疗"],
            references: [{ title: "高血压诊断与治疗指南", url: "#" }],
            severity: "medium",
          },
        ]
      } else if (activeTab === "image" && selectedImage) {
        // 图像分析结果
        if (selectedImage.includes("X-Ray")) {
          generatedResults = [
            {
              condition: "轻度肺炎",
              probability: 0.76,
              description: "X光片显示右下肺叶有轻微浸润性阴影，符合轻度肺炎表现。",
              recommendations: ["抗生素治疗", "休息和充分水分摄入", "一周后复查X光片"],
              references: [{ title: "社区获得性肺炎诊疗指南", url: "#" }],
              severity: "medium",
            },
          ]
        } else if (selectedImage.includes("MRI")) {
          generatedResults = [
            {
              condition: "无明显异常",
              probability: 0.95,
              description: "脑部MRI未显示明显结构异常或病变。",
              recommendations: ["无需特殊治疗", "建议定期随访"],
              references: [{ title: "神经影像学解读标准", url: "#" }],
              severity: "low",
            },
          ]
        } else if (selectedImage.includes("CT")) {
          generatedResults = [
            {
              condition: "胆囊结石",
              probability: 0.88,
              description: "腹部CT扫描显示胆囊内有多发高密度结石，最大直径约8mm。",
              recommendations: ["超声波进一步评估", "考虑腹腔镜胆囊切除术", "饮食调整，避免高脂食物"],
              references: [{ title: "胆囊结石诊疗指南", url: "#" }],
              severity: "medium",
            },
            {
              condition: "轻度脂肪肝",
              probability: 0.65,
              description: "CT显示肝脏密度轻度降低，符合轻度脂肪肝表现。",
              recommendations: ["减轻体重", "限制酒精摄入", "增加体育锻炼", "定期肝功能检查"],
              references: [{ title: "非酒精性脂肪肝病管理指南", url: "#" }],
              severity: "low",
            },
          ]
        }
      }

      setResults(generatedResults)
      setIsAnalyzing(false)
    }, 2000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low":
        return <CheckCircle className="h-4 w-4" />
      case "medium":
        return <AlertCircle className="h-4 w-4" />
      case "high":
        return <AlertCircle className="h-4 w-4" />
      case "critical":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <HelpCircle className="h-4 w-4" />
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          {t("aiDiagnosis")}
        </CardTitle>
        <CardDescription>
          {patientId
            ? `${t("analyzing")} ${t("patient")} #${patientId}${recordId ? `, ${t("record")} #${recordId}` : ""}`
            : t("aiDiagnosisDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {t("textInput")}
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              {t("imageAnalysis")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4 pt-4">
            <Textarea
              placeholder={t("enterSymptoms")}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={5}
            />
          </TabsContent>

          <TabsContent value="image" className="space-y-4 pt-4">
            <div className="grid grid-cols-3 gap-2">
              {availableImages.map((image) => (
                <div
                  key={image.id}
                  className={`relative cursor-pointer rounded-md overflow-hidden border-2 ${
                    selectedImage === image.fullSize ? "border-primary" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(image.fullSize)}
                >
                  <img src={image.thumbnail || "/placeholder.svg"} alt={image.type} className="w-full h-auto" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1">
                    <div>{image.type}</div>
                    <div>{image.date}</div>
                  </div>
                </div>
              ))}
            </div>

            {selectedImage && (
              <div className="mt-4">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Selected medical image"
                  className="w-full h-auto rounded-md"
                />
              </div>
            )}
          </TabsContent>
        </Tabs>

        {results.length > 0 && (
          <div className="space-y-4 mt-6 border-t pt-4">
            <h3 className="text-lg font-medium">{t("diagnosisResults")}</h3>

            {results.map((result, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-medium">{result.condition}</h4>
                  <Badge variant="outline" className={`${getSeverityColor(result.severity)} flex items-center gap-1`}>
                    {getSeverityIcon(result.severity)}
                    <span>{t(result.severity)}</span>
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    {t("probability")}: {(result.probability * 100).toFixed(1)}%
                  </div>
                </div>

                <p className="text-sm">{result.description}</p>

                <div>
                  <h5 className="text-sm font-medium mb-1">{t("recommendations")}</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {result.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-medium mb-1">{t("references")}</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {result.references.map((ref, i) => (
                      <li key={i}>
                        <a href={ref.url} className="text-primary hover:underline">
                          {ref.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={performAnalysis}
          disabled={isAnalyzing || (activeTab === "text" && !userInput) || (activeTab === "image" && !selectedImage)}
          className="w-full"
        >
          {isAnalyzing ? (
            <>
              <LoadingSpinner className="mr-2" />
              {t("analyzing")}...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              {t("startAnalysis")}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
