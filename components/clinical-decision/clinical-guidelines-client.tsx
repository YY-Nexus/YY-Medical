"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  FileText,
  Calendar,
  Globe,
  Star,
  Download,
  Bookmark,
  Share2,
  ChevronRight,
  ExternalLink,
  Filter,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// 模拟临床指南数据
const clinicalGuidelines = [
  {
    id: "cg-001",
    title: "2型糖尿病诊疗指南",
    organization: "中华医学会糖尿病学分会",
    publishDate: "2023-03-15",
    updateDate: "2023-03-15",
    version: "2023版",
    category: "内分泌科",
    subcategory: "糖尿病",
    recommendationCount: 42,
    evidenceLevels: ["A", "B", "C", "D"],
    keyPoints: [
      "强调个体化血糖控制目标",
      "推荐二甲双胍作为一线用药",
      "更新了心血管获益药物的应用建议",
      "增加了糖尿病技术应用的内容",
    ],
    summary:
      "本指南基于最新循证医学证据，提供了2型糖尿病的筛查、诊断、治疗和随访管理的全面建议。强调了个体化治疗策略，并更新了药物治疗和并发症管理的内容。",
    url: "https://example.com/guidelines/diabetes-2023",
    isFavorite: true,
    downloadCount: 1245,
  },
  {
    id: "cg-002",
    title: "高血压诊疗指南",
    organization: "中国高血压联盟",
    publishDate: "2022-11-08",
    updateDate: "2022-11-08",
    version: "2022版",
    category: "心血管科",
    subcategory: "高血压",
    recommendationCount: 38,
    evidenceLevels: ["A", "B", "C"],
    keyPoints: [
      "更新了高血压的诊断标准",
      "强调了家庭血压监测的重要性",
      "提供了不同人群的降压目标",
      "更新了药物治疗的推荐方案",
    ],
    summary:
      "本指南提供了高血压的预防、筛查、诊断和治疗的最新建议。基于最新研究证据，更新了高血压的分级标准和治疗目标，并强调了生活方式干预的重要性。",
    url: "https://example.com/guidelines/hypertension-2022",
    isFavorite: false,
    downloadCount: 987,
  },
  {
    id: "cg-003",
    title: "冠心病二级预防指南",
    organization: "中华心血管病学会",
    publishDate: "2022-09-20",
    updateDate: "2023-01-15",
    version: "2022版(2023更新)",
    category: "心血管科",
    subcategory: "冠心病",
    recommendationCount: 35,
    evidenceLevels: ["A", "B", "C", "D"],
    keyPoints: [
      "强调多重危险因素的综合管理",
      "更新了他汀类药物的应用建议",
      "明确了抗血小板治疗的持续时间",
      "提供了心脏康复的具体方案",
    ],
    summary:
      "本指南聚焦于冠心病患者的二级预防策略，包括危险因素控制、药物治疗和生活方式干预。基于最新临床试验结果，更新了抗血小板和调脂治疗的建议。",
    url: "https://example.com/guidelines/coronary-heart-disease-2022",
    isFavorite: true,
    downloadCount: 856,
  },
  {
    id: "cg-004",
    title: "社区获得性肺炎诊疗指南",
    organization: "中华医学会呼吸病学分会",
    publishDate: "2022-06-12",
    updateDate: "2022-06-12",
    version: "2022版",
    category: "呼吸科",
    subcategory: "感染性疾病",
    recommendationCount: 30,
    evidenceLevels: ["A", "B", "C"],
    keyPoints: [
      "更新了病原学诊断方法",
      "提供了抗生素选择的流程图",
      "明确了重症肺炎的识别标准",
      "增加了特殊人群的治疗建议",
    ],
    summary:
      "本指南提供了社区获得性肺炎的诊断、评估和治疗的最新建议。基于最新微生物学和临床研究，更新了病原体检测和抗生素治疗的内容，并强调了严重程度评估的重要性。",
    url: "https://example.com/guidelines/pneumonia-2022",
    isFavorite: false,
    downloadCount: 723,
  },
  {
    id: "cg-005",
    title: "慢性阻塞性肺疾病诊疗指南",
    organization: "中华医学会呼吸病学分会",
    publishDate: "2021-12-05",
    updateDate: "2023-02-18",
    version: "2021版(2023更新)",
    category: "呼吸科",
    subcategory: "慢性气道疾病",
    recommendationCount: 36,
    evidenceLevels: ["A", "B", "C", "D"],
    keyPoints: [
      "更新了COPD的分类标准",
      "提供了药物治疗的阶梯方案",
      "明确了急性加重的处理策略",
      "增加了肺康复的具体建议",
    ],
    summary:
      "本指南提供了慢性阻塞性肺疾病的诊断、评估、治疗和管理的全面建议。基于最新研究证据，更新了疾病分类和药物治疗的内容，并强调了非药物治疗的重要性。",
    url: "https://example.com/guidelines/copd-2021",
    isFavorite: false,
    downloadCount: 645,
  },
  {
    id: "cg-006",
    title: "急性缺血性脑卒中诊疗指南",
    organization: "中华神经科学会",
    publishDate: "2022-08-30",
    updateDate: "2022-08-30",
    version: "2022版",
    category: "神经内科",
    subcategory: "脑血管病",
    recommendationCount: 40,
    evidenceLevels: ["A", "B", "C"],
    keyPoints: [
      "更新了溶栓治疗的时间窗",
      "明确了机械取栓的适应症",
      "提供了卒中单元的建设标准",
      "增加了早期康复的具体方案",
    ],
    summary:
      "本指南提供了急性缺血性脑卒中的早期识别、评估和治疗的最新建议。基于最新临床试验结果，更新了再灌注治疗的适应症和禁忌症，并强调了卒中中心建设的重要性。",
    url: "https://example.com/guidelines/stroke-2022",
    isFavorite: true,
    downloadCount: 912,
  },
  {
    id: "cg-007",
    title: "抑郁症诊疗指南",
    organization: "中华精神医学会",
    publishDate: "2022-04-16",
    updateDate: "2022-04-16",
    version: "2022��",
    category: "精神科",
    subcategory: "情感障碍",
    recommendationCount: 32,
    evidenceLevels: ["A", "B", "C", "D"],
    keyPoints: [
      "更新了抑郁症的诊断标准",
      "提供了抗抑郁药物选择的流程图",
      "明确了心理治疗的适应症",
      "增加了难治性抑郁症的处理策略",
    ],
    summary:
      "本指南提供了抑郁症的筛查、诊断、治疗和随访管理的全面建议。基于最新研究证据，更新了药物治疗和心理治疗的内容，并强调了个体化治疗的重要性。",
    url: "https://example.com/guidelines/depression-2022",
    isFavorite: false,
    downloadCount: 578,
  },
  {
    id: "cg-008",
    title: "骨质疏松症诊疗指南",
    organization: "中华骨质疏松症学会",
    publishDate: "2022-10-10",
    updateDate: "2022-10-10",
    version: "2022版",
    category: "内分泌科",
    subcategory: "代谢性骨病",
    recommendationCount: 28,
    evidenceLevels: ["A", "B", "C"],
    keyPoints: [
      "更新了骨质疏松症的诊断标准",
      "提供了药物治疗的选择策略",
      "明确了骨折风险评估的方法",
      "增加了特殊人群的管理建议",
    ],
    summary:
      "本指南提供了骨质疏松症的预防、筛查、诊断和治疗的最新建议。基于最新研究证据，更新了诊断标准和药物治疗的内容，并强调了骨折风险评估的重要性。",
    url: "https://example.com/guidelines/osteoporosis-2022",
    isFavorite: false,
    downloadCount: 432,
  },
]

// 模拟推荐数据
const recommendationData = [
  {
    id: "rec-001",
    guidelineId: "cg-001",
    content: "对于新诊断的2型糖尿病患者，推荐二甲双胍作为一线降糖药物，除非有禁忌症。",
    evidenceLevel: "A",
    strength: "强推荐",
    category: "药物治疗",
    references: [
      {
        id: "ref-001",
        title:
          "Effect of intensive blood-glucose control with metformin on complications in overweight patients with type 2 diabetes (UKPDS 34)",
        authors: "UK Prospective Diabetes Study (UKPDS) Group",
        journal: "Lancet",
        year: 1998,
        volume: "352",
        pages: "854-865",
        doi: "10.1016/S0140-6736(98)07037-8",
      },
      {
        id: "ref-002",
        title: "10-year follow-up of intensive glucose control in type 2 diabetes",
        authors: "Holman RR, Paul SK, Bethel MA, Matthews DR, Neil HA",
        journal: "N Engl J Med",
        year: 2008,
        volume: "359",
        pages: "1577-1589",
        doi: "10.1056/NEJMoa0806470",
      },
    ],
  },
  {
    id: "rec-002",
    guidelineId: "cg-001",
    content:
      "对于已确诊的2型糖尿病患者，建议将糖化血红蛋白(HbA1c)控制在7.0%以下，但应根据患者年龄、并发症和低血糖风险等因素个体化制定目标。",
    evidenceLevel: "B",
    strength: "强推荐",
    category: "治疗目标",
    references: [
      {
        id: "ref-003",
        title: "Glycemic Targets: Standards of Medical Care in Diabetes-2021",
        authors: "American Diabetes Association",
        journal: "Diabetes Care",
        year: 2021,
        volume: "44",
        pages: "S73-S84",
        doi: "10.2337/dc21-S006",
      },
    ],
  },
  {
    id: "rec-003",
    guidelineId: "cg-001",
    content: "对于2型糖尿病合并动脉粥样硬化性心血管疾病的患者，推荐使用具有心血管获益的GLP-1受体激动剂或SGLT-2抑制剂。",
    evidenceLevel: "A",
    strength: "强推荐",
    category: "药物治疗",
    references: [
      {
        id: "ref-004",
        title:
          "2019 ESC Guidelines on diabetes, pre-diabetes, and cardiovascular diseases developed in collaboration with the EASD",
        authors: "Cosentino F, Grant PJ, Aboyans V, et al.",
        journal: "Eur Heart J",
        year: 2020,
        volume: "41",
        pages: "255-323",
        doi: "10.1093/eurheartj/ehz486",
      },
    ],
  },
  {
    id: "rec-004",
    guidelineId: "cg-001",
    content: "对于2型糖尿病患者，建议每3-6个月检测一次糖化血红蛋白，根据治疗目标和药物调整需要可适当增加检测频率。",
    evidenceLevel: "C",
    strength: "一般推荐",
    category: "监测随访",
    references: [
      {
        id: "ref-005",
        title: "Glycemic Targets: Standards of Medical Care in Diabetes-2021",
        authors: "American Diabetes Association",
        journal: "Diabetes Care",
        year: 2021,
        volume: "44",
        pages: "S73-S84",
        doi: "10.2337/dc21-S006",
      },
    ],
  },
  {
    id: "rec-005",
    guidelineId: "cg-001",
    content:
      "对于2型糖尿病患者，推荐进行规律的有氧运动和抗阻运动，每周至少150分钟中等强度有氧运动，每周2-3次抗阻运动。",
    evidenceLevel: "B",
    strength: "强推荐",
    category: "生活方式干预",
    references: [
      {
        id: "ref-006",
        title: "Physical Activity/Exercise and Diabetes: A Position Statement of the American Diabetes Association",
        authors: "Colberg SR, Sigal RJ, Yardley JE, et al.",
        journal: "Diabetes Care",
        year: 2016,
        volume: "39",
        pages: "2065-2079",
        doi: "10.2337/dc16-1728",
      },
    ],
  },
]

// 模拟证据级别说明
const evidenceLevelExplanations = [
  {
    level: "A",
    description: "来自多个随机对照试验或荟萃分析的高质量证据",
    reliability: "高",
  },
  {
    level: "B",
    description: "来自单个随机对照试验或大型非随机研究的中等质量证据",
    reliability: "中",
  },
  {
    level: "C",
    description: "来自专家共识、病例系列或小型研究的有限证据",
    reliability: "低",
  },
  {
    level: "D",
    description: "专家意见或临床经验",
    reliability: "很低",
  },
]

// 模拟推荐强度说明
const recommendationStrengthExplanations = [
  {
    strength: "强推荐",
    description: "对大多数患者在大多数情况下应该采取的措施，收益明显大于风险",
    implication: "应该遵循，除非有令人信服的理由采取其他措施",
  },
  {
    strength: "一般推荐",
    description: "不同患者的最佳措施可能有所不同，收益和风险相近或不确定",
    implication: "需要根据个体情况和患者偏好做出决定",
  },
  {
    strength: "弱推荐",
    description: "其他措施可能同样合理，收益仅略大于风险或存在较大不确定性",
    implication: "需要充分考虑患者具体情况、价值观和偏好",
  },
  {
    strength: "不推荐",
    description: "对大多数患者在大多数情况下不应该采取的措施，风险大于收益",
    implication: "应该避免，除非有特殊情况",
  },
]

export function ClinicalGuidelinesClient() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedGuideline, setSelectedGuideline] = useState<(typeof clinicalGuidelines)[0] | null>(null)
  const [showRecommendationDialog, setShowRecommendationDialog] = useState(false)
  const [selectedRecommendation, setSelectedRecommendation] = useState<(typeof recommendationData)[0] | null>(null)
  const [showEvidenceLevelDialog, setShowEvidenceLevelDialog] = useState(false)

  // 获取所有类别
  const allCategories = Array.from(new Set(clinicalGuidelines.map((g) => g.category)))

  // 过滤指南
  const filteredGuidelines = clinicalGuidelines.filter(
    (guideline) =>
      (searchTerm === "" ||
        guideline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guideline.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guideline.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guideline.subcategory.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === null || guideline.category === selectedCategory),
  )

  // 获取指南的推荐建议
  const getGuidelineRecommendations = (guidelineId: string) => {
    return recommendationData.filter((rec) => rec.guidelineId === guidelineId)
  }

  // 查看指南详情
  const viewGuidelineDetails = (guideline: (typeof clinicalGuidelines)[0]) => {
    setSelectedGuideline(guideline)
  }

  // 查看推荐建议详情
  const viewRecommendationDetails = (recommendation: (typeof recommendationData)[0]) => {
    setSelectedRecommendation(recommendation)
    setShowRecommendationDialog(true)
  }

  // 获取证据级别标签颜色
  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case "A":
        return "bg-green-100 text-green-800"
      case "B":
        return "bg-blue-100 text-blue-800"
      case "C":
        return "bg-yellow-100 text-yellow-800"
      case "D":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取推荐强度标签颜色
  const getRecommendationStrengthColor = (strength: string) => {
    switch (strength) {
      case "强推荐":
        return "bg-green-100 text-green-800"
      case "一般推荐":
        return "bg-blue-100 text-blue-800"
      case "弱推荐":
        return "bg-yellow-100 text-yellow-800"
      case "不推荐":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>临床指南查询</CardTitle>
                <CardDescription>查询和应用最新临床指南，获取循证医学支持</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowEvidenceLevelDialog(true)}>
                  <Info className="h-4 w-4 mr-1" />
                  证据级别说明
                </Button>
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-1" />
                  最近查看
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-1" />
                  我的收藏
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索指南标题、组织或疾病..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={selectedCategory || ""} onValueChange={(value) => setSelectedCategory(value || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="选择科室" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部科室</SelectItem>
                  {allCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                高级筛选
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">全部指南</TabsTrigger>
                <TabsTrigger value="recent">最新发布</TabsTrigger>
                <TabsTrigger value="popular">热门指南</TabsTrigger>
                <TabsTrigger value="favorite">我的收藏</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {filteredGuidelines.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <FileText className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">未找到匹配的临床指南</h3>
                    <p className="text-muted-foreground max-w-md">
                      尝试使用不同的搜索词或筛选条件，或者清除筛选条件查看所有指南
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredGuidelines.map((guideline) => (
                      <Card key={guideline.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg line-clamp-2">{guideline.title}</CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                <Globe className="h-3 w-3 mr-1" />
                                {guideline.organization}
                              </CardDescription>
                            </div>
                            {guideline.isFavorite && <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline">{guideline.category}</Badge>
                            <Badge variant="outline">{guideline.subcategory}</Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {guideline.publishDate}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-3">{guideline.summary}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <FileText className="h-3 w-3 mr-1" />
                            {guideline.recommendationCount} 条建议
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => viewGuidelineDetails(guideline)}>
                            查看详情
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="recent" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredGuidelines
                    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
                    .slice(0, 6)
                    .map((guideline) => (
                      <Card key={guideline.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg line-clamp-2">{guideline.title}</CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                <Globe className="h-3 w-3 mr-1" />
                                {guideline.organization}
                              </CardDescription>
                            </div>
                            {guideline.isFavorite && <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline">{guideline.category}</Badge>
                            <Badge variant="outline">{guideline.subcategory}</Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {guideline.publishDate}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-3">{guideline.summary}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <FileText className="h-3 w-3 mr-1" />
                            {guideline.recommendationCount} 条建议
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => viewGuidelineDetails(guideline)}>
                            查看详情
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="popular" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredGuidelines
                    .sort((a, b) => b.downloadCount - a.downloadCount)
                    .slice(0, 6)
                    .map((guideline) => (
                      <Card key={guideline.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg line-clamp-2">{guideline.title}</CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                <Globe className="h-3 w-3 mr-1" />
                                {guideline.organization}
                              </CardDescription>
                            </div>
                            {guideline.isFavorite && <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline">{guideline.category}</Badge>
                            <Badge variant="outline">{guideline.subcategory}</Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Download className="h-3 w-3 mr-1" />
                              {guideline.downloadCount} 次下载
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-3">{guideline.summary}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <FileText className="h-3 w-3 mr-1" />
                            {guideline.recommendationCount} 条建议
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => viewGuidelineDetails(guideline)}>
                            查看详情
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="favorite" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredGuidelines
                    .filter((g) => g.isFavorite)
                    .map((guideline) => (
                      <Card key={guideline.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg line-clamp-2">{guideline.title}</CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                <Globe className="h-3 w-3 mr-1" />
                                {guideline.organization}
                              </CardDescription>
                            </div>
                            <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline">{guideline.category}</Badge>
                            <Badge variant="outline">{guideline.subcategory}</Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {guideline.publishDate}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-3">{guideline.summary}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <FileText className="h-3 w-3 mr-1" />
                            {guideline.recommendationCount} 条建议
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => viewGuidelineDetails(guideline)}>
                            查看详情
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
                {filteredGuidelines.filter((g) => g.isFavorite).length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Bookmark className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">暂无收藏的临床指南</h3>
                    <p className="text-muted-foreground max-w-md">
                      浏览指南并点击星标图标将其添加到收藏夹，方便快速访问常用指南
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* 指南详情对话框 */}
      {selectedGuideline && (
        <Dialog open={!!selectedGuideline} onOpenChange={() => setSelectedGuideline(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedGuideline.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {selectedGuideline.organization} · {selectedGuideline.version}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground mb-1">发布日期</div>
                  <div className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {selectedGuideline.publishDate}
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground mb-1">更新日期</div>
                  <div className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {selectedGuideline.updateDate}
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground mb-1">科室分类</div>
                  <div className="font-medium">
                    {selectedGuideline.category} / {selectedGuideline.subcategory}
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground mb-1">下载次数</div>
                  <div className="font-medium flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    {selectedGuideline.downloadCount}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">指南摘要</h3>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm">{selectedGuideline.summary}</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">关键要点</h3>
                <Card>
                  <CardContent className="pt-4">
                    <ul className="list-disc list-inside space-y-2">
                      {selectedGuideline.keyPoints.map((point, index) => (
                        <li key={index} className="text-sm">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium">推荐建议</h3>
                  <div className="flex items-center gap-2">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="全部分类" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部分类</SelectItem>
                        <SelectItem value="diagnosis">诊断</SelectItem>
                        <SelectItem value="treatment">治疗</SelectItem>
                        <SelectItem value="medication">用药</SelectItem>
                        <SelectItem value="followup">随访</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="全部证据级别" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部证据级别</SelectItem>
                        <SelectItem value="A">A级证据</SelectItem>
                        <SelectItem value="B">B级证据</SelectItem>
                        <SelectItem value="C">C级证据</SelectItem>
                        <SelectItem value="D">D级证据</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  {getGuidelineRecommendations(selectedGuideline.id).map((recommendation) => (
                    <Card key={recommendation.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm mb-2">{recommendation.content}</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge className={getEvidenceLevelColor(recommendation.evidenceLevel)}>
                                证据级别: {recommendation.evidenceLevel}
                              </Badge>
                              <Badge className={getRecommendationStrengthColor(recommendation.strength)}>
                                {recommendation.strength}
                              </Badge>
                              <Badge variant="outline">{recommendation.category}</Badge>
                            </div>
                            <div className="flex justify-end mt-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs"
                                onClick={() => viewRecommendationDetails(recommendation)}
                              >
                                查看详情
                                <ChevronRight className="h-3 w-3 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Bookmark className="h-4 w-4" />
                  收藏
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  分享
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  下载PDF
                </Button>
                <Button size="sm" className="gap-1">
                  <ExternalLink className="h-4 w-4" />
                  访问原文
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* 推荐建议详情对话框 */}
      {selectedRecommendation && (
        <Dialog open={showRecommendationDialog} onOpenChange={setShowRecommendationDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>推荐建议详情</DialogTitle>
              <DialogDescription>查看推荐建议的详细信息和参考文献</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <Alert className="bg-blue-50">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>推荐内容</AlertTitle>
                <AlertDescription>{selectedRecommendation.content}</AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground mb-1">证据级别</div>
                  <div className="font-medium">
                    <Badge className={getEvidenceLevelColor(selectedRecommendation.evidenceLevel)}>
                      {selectedRecommendation.evidenceLevel}
                    </Badge>
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground mb-1">推荐强度</div>
                  <div className="font-medium">
                    <Badge className={getRecommendationStrengthColor(selectedRecommendation.strength)}>
                      {selectedRecommendation.strength}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">参考文献</h3>
                <div className="space-y-3">
                  {selectedRecommendation.references.map((reference) => (
                    <Card key={reference.id}>
                      <CardContent className="p-3">
                        <h4 className="text-sm font-medium mb-1">{reference.title}</h4>
                        <p className="text-xs text-gray-600 mb-1">{reference.authors}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>
                            {reference.journal}, {reference.year}, {reference.volume}:{reference.pages}
                          </span>
                        </div>
                        {reference.doi && (
                          <Button variant="link" size="sm" className="h-6 p-0 text-xs mt-1">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            DOI: {reference.doi}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">临床应用</h3>
                <Card>
                  <CardContent className="p-3">
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">适用人群：</span>
                        {selectedRecommendation.guidelineId === "cg-001"
                          ? "2型糖尿病患者，尤其是新诊断患者"
                          : "符合指南适用条件的患者"}
                      </p>
                      <p>
                        <span className="font-medium">注意事项：</span>
                        {selectedRecommendation.guidelineId === "cg-001"
                          ? "应考虑患者的肾功能状态、年龄和并发症情况，个体化制定治疗方案"
                          : "应根据患者具体情况个体化应用"}
                      </p>
                      <p>
                        <span className="font-medium">实施建议：</span>
                        {selectedRecommendation.guidelineId === "cg-001"
                          ? "从小剂量开始，逐渐调整至有效剂量，定期监测疗效和不良反应"
                          : "遵循循证医学原则，结合临床经验实施"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRecommendationDialog(false)}>
                关闭
              </Button>
              <Button>应用到患者</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* 证据级别说明对话框 */}
      <Dialog open={showEvidenceLevelDialog} onOpenChange={setShowEvidenceLevelDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>证据级别与推荐强度说明</DialogTitle>
            <DialogDescription>了解临床指南中使用的证据级别和推荐强度的含义</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <h3 className="text-lg font-medium mb-3">证据级别</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>级别</TableHead>
                    <TableHead>描述</TableHead>
                    <TableHead>可靠性</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evidenceLevelExplanations.map((level) => (
                    <TableRow key={level.level}>
                      <TableCell>
                        <Badge className={getEvidenceLevelColor(level.level)}>{level.level}</Badge>
                      </TableCell>
                      <TableCell>{level.description}</TableCell>
                      <TableCell>{level.reliability}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">推荐强度</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>强度</TableHead>
                    <TableHead>描述</TableHead>
                    <TableHead>临床意义</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recommendationStrengthExplanations.map((strength) => (
                    <TableRow key={strength.strength}>
                      <TableCell>
                        <Badge className={getRecommendationStrengthColor(strength.strength)}>{strength.strength}</Badge>
                      </TableCell>
                      <TableCell>{strength.description}</TableCell>
                      <TableCell>{strength.implication}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>重要提示</AlertTitle>
              <AlertDescription>
                临床指南提供的是基于现有证据的一般性建议，实际临床决策应结合患者具体情况、医生经验和患者偏好综合考虑。
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowEvidenceLevelDialog(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
