"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Microscope,
  FlaskConical,
  Beaker,
  Users,
  Upload,
  Download,
  FileText,
  Plus,
  Search,
  ListFilter,
  LayoutGrid,
  ChevronRight,
  BarChart,
  Printer,
  Share2,
  Edit,
  X,
  Trash2,
} from "lucide-react"
import type { ExperimentFilters } from "@/components/experiment-filter-drawer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExperimentFilterDrawer } from "@/components/experiment-filter-drawer"
import { ExperimentFilterTags } from "@/components/experiment-filter-tags"
import { QuickFilterMenu } from "@/components/quick-filter-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ExperimentTemplateManager } from "@/components/experiment-template-manager"
import { SaveAsTemplateDialog } from "@/components/save-as-template-dialog"

// 模拟试验设计数据
const experimentDesigns = [
  {
    id: "EXP-001",
    title: "糖尿病患者血清生物标志物分析",
    type: "临床研究",
    status: "已批准",
    designType: "病例对照研究",
    createdDate: "2023-04-15",
    updatedDate: "2023-05-01",
    startDate: "2023-06-01",
    endDate: "2023-12-31",
    principalInvestigator: "张教授",
    department: "内分泌科",
    objective: "识别2型糖尿病患者特异性血清生物标志物，评估其在疾病早期诊断中的价值",
    hypothesis: "2型糖尿病患者血清中存在特定蛋白质标志物，其表达水平与疾病进展相关",
    groups: [
      { name: "糖尿病组", size: 100, description: "确诊2型糖尿病患者" },
      { name: "对照组", size: 100, description: "年龄、性别匹配的健康志愿者" },
    ],
    variables: [
      { name: "空腹血糖", type: "连续变量", unit: "mmol/L", method: "葡萄糖氧化酶法" },
      { name: "糖化血红蛋白", type: "连续变量", unit: "%", method: "高效液相色谱法" },
      { name: "血清胰岛素", type: "连续变量", unit: "μIU/mL", method: "化学发光免疫法" },
      { name: "BMI", type: "连续变量", unit: "kg/m²", method: "身高体重计算" },
      { name: "年龄", type: "连续变量", unit: "岁", method: "问卷调查" },
      { name: "性别", type: "分类变量", unit: "无", method: "问卷调查" },
    ],
    methods: [
      { name: "样本采集", description: "空腹采集静脉血10mL，分离血清，-80°C保存" },
      { name: "蛋白质组学分析", description: "使用液相色谱-质谱联用技术(LC-MS/MS)进行无标记定量蛋白质组学分析" },
      { name: "数据分析", description: "使用R软件进行统计分析，p<0.05认为差异有统计学意义" },
    ],
    statisticalAnalysis:
      "使用t检验比较两组间连续变量差异，卡方检验比较分类变量差异。使用Logistic回归分析筛选与疾病相关的独立危险因素。",
    ethicalConsiderations: "本研究已获得医院伦理委员会批准(批准号:EC-2023-042)。所有参与者均签署知情同意书。",
    budget: 150000,
    currency: "CNY",
    collaborators: ["李教授(生物信息学)", "王教授(临床医学)", "赵博士(质谱分析)"],
    attachments: ["研究方案.pdf", "伦理批准.pdf", "知情同意书.pdf"],
    tags: ["糖尿病", "生物标志物", "蛋白质组学"],
    hasEthicalApproval: true,
  },
  {
    id: "EXP-002",
    title: "肝纤维化小鼠模型中抗纤维化药物疗效评估",
    type: "动物实验",
    status: "进行中",
    designType: "随机对照试验",
    createdDate: "2023-03-20",
    updatedDate: "2023-04-10",
    startDate: "2023-05-01",
    endDate: "2023-08-31",
    principalInvestigator: "李教授",
    department: "药理学系",
    objective: "评估新型抗纤维化药物XYZ-123在CCl4诱导的肝纤维化小鼠模型中的疗效",
    hypothesis: "XYZ-123通过抑制TGF-β/Smad信号通路减轻肝纤维化程度",
    groups: [
      { name: "模型组", size: 20, description: "CCl4诱导肝纤维化+生理盐水" },
      { name: "低剂量组", size: 20, description: "CCl4诱导肝纤维化+XYZ-123(10mg/kg)" },
      { name: "高剂量组", size: 20, description: "CCl4诱导肝纤维化+XYZ-123(30mg/kg)" },
      { name: "阳性对照组", size: 20, description: "CCl4诱导肝纤维化+吡非尼酮(100mg/kg)" },
      { name: "空白对照组", size: 10, description: "橄榄油+生理盐水" },
    ],
    variables: [
      { name: "肝功能指标", type: "连续变量", unit: "U/L", method: "生化分析" },
      { name: "肝脏羟脯氨酸含量", type: "连续变量", unit: "μg/g", method: "比色法" },
      { name: "肝脏组织学评分", type: "序数变量", unit: "分", method: "HE染色和Masson染色" },
      { name: "纤维化相关基因表达", type: "连续变量", unit: "相对表达量", method: "RT-qPCR" },
      { name: "纤维化相关蛋白表达", type: "连续变量", unit: "相对表达量", method: "Western blot" },
    ],
    methods: [
      { name: "模型建立", description: "腹腔注射CCl4(1mL/kg，20%橄榄油溶液)，每周3次，连续6周" },
      { name: "药物给药", description: "从第4周开始，每日灌胃给药，连续3周" },
      { name: "样本采集", description: "末次给药24小时后处死动物，采集血液和肝脏组织" },
      { name: "组织学分析", description: "石蜡包埋，切片，HE染色和Masson染色" },
      { name: "分子生物学分析", description: "提取RNA和蛋白，进行RT-qPCR和Western blot分析" },
    ],
    statisticalAnalysis: "使用ANOVA分析各组间差异，LSD法进行多重比较，p<0.05认为差异有统计学意义。",
    ethicalConsiderations:
      "本研究已获得实验动物伦理委员会批准(批准号:IACUC-2023-015)。严格遵循实验动物福利和伦理准则。",
    budget: 200000,
    currency: "CNY",
    collaborators: ["张教授(病理学)", "刘博士(分子生物学)"],
    attachments: ["研究方案.pdf", "动物伦理批准.pdf", "实验操作规程.pdf"],
    tags: ["肝纤维化", "抗纤维化药物", "动物模型"],
    hasEthicalApproval: true,
  },
  {
    id: "EXP-003",
    title: "新型冠状病毒抗体检测方法的比较研究",
    type: "方法学研究",
    status: "计划中",
    designType: "方法比较研究",
    createdDate: "2023-05-05",
    updatedDate: "2023-05-05",
    startDate: "2023-07-01",
    endDate: "2023-09-30",
    principalInvestigator: "王教授",
    department: "检验医学科",
    objective: "比较三种不同的新型冠状病毒抗体检测方法的灵敏度、特异度和一致性",
    hypothesis: "化学发光免疫法在灵敏度和特异度方面优于胶体金法和酶联免疫法",
    groups: [
      { name: "确诊组", size: 100, description: "PCR确诊的COVID-19患者" },
      { name: "疑似组", size: 50, description: "临床疑似但PCR阴性的患者" },
      { name: "对照组", size: 100, description: "健康志愿者" },
    ],
    variables: [
      { name: "IgM抗体(胶体金法)", type: "分类变量", unit: "阳性/阴性", method: "胶体金免疫层析法" },
      { name: "IgG抗体(胶体金法)", type: "分类变量", unit: "阳性/阴性", method: "胶体金免疫层析法" },
      { name: "IgM抗体(ELISA)", type: "连续变量", unit: "S/CO", method: "酶联免疫吸附法" },
      { name: "IgG抗体(ELISA)", type: "连续变量", unit: "S/CO", method: "酶联免疫吸附法" },
      { name: "IgM抗体(CLIA)", type: "连续变量", unit: "AU/mL", method: "化学发光免疫法" },
      { name: "IgG抗体(CLIA)", type: "连续变量", unit: "AU/mL", method: "化学发光免疫法" },
    ],
    methods: [
      { name: "样本采集", description: "采集静脉血5mL，分离血清，-20°C保存" },
      { name: "胶体金法检测", description: "使用商品化试剂盒按说明书操作" },
      { name: "ELISA检测", description: "使用商品化试剂盒按说明书操作" },
      { name: "CLIA检测", description: "使用商品化试剂盒按说明书操作" },
    ],
    statisticalAnalysis:
      "计算各方法的灵敏度、特异度、阳性预测值和阴性预测值。使用Kappa系数评估方法间一致性。使用ROC曲线分析各方法的诊断效能。",
    ethicalConsiderations: "本研究已获得医院伦理委员会批准(批准号:EC-2023-056)。所有参与者均签署知情同意书。",
    budget: 100000,
    currency: "CNY",
    collaborators: ["张医生(感染科)", "刘技师(检验科)"],
    attachments: ["研究方案.pdf", "伦理批准.pdf", "知情同意书.pdf"],
    tags: ["COVID-19", "抗体检测", "方法比较"],
    hasEthicalApproval: false,
  },
]

// 模拟研究类型数据
const researchTypes = [
  { id: "type-001", name: "临床研究", description: "涉及人类受试者的研究" },
  { id: "type-002", name: "动物实验", description: "使用动物模型的研究" },
  { id: "type-003", name: "体外研究", description: "在实验室条件下使用细胞或组织的研究" },
  { id: "type-004", name: "方法学研究", description: "开发或评估研究方法的研究" },
  { id: "type-005", name: "流行病学研究", description: "研究疾病在人群中的分布和决定因素" },
  { id: "type-006", name: "系统评价", description: "系统地收集和评估现有研究的研究" },
]

// 模拟研究设计类型数据
const designTypes = [
  { id: "design-001", name: "随机对照试验", description: "将受试者随机分配到不同干预组的实验性研究" },
  { id: "design-002", name: "病例对照研究", description: "比较有特定结局的病例组和没有该结局的对照组的观察性研究" },
  { id: "design-003", name: "队列研究", description: "随时间跟踪一组受试者的观察性研究" },
  { id: "design-004", name: "横断面研究", description: "在特定时间点收集数据的观察性研究" },
  { id: "design-005", name: "方法比较研究", description: "比较不同方法或技术的研究" },
  { id: "design-006", name: "剂量递增研究", description: "评估不同剂量效应的研究" },
]

// 默认筛选器
const defaultFilters: ExperimentFilters = {
  searchTerm: "",
  types: [],
  designTypes: [],
  statuses: [],
  departments: [],
  dateRange: {
    from: undefined,
    to: undefined,
  },
  tags: [],
  budgetRange: [0, 1000000],
  sampleTypes: [],
  hasEthicalApproval: null,
  createdByMe: false,
  collaborators: [],
}

// 新建设计的默认数据
const defaultNewDesign = {
  id: "",
  title: "",
  type: "",
  status: "计划中",
  designType: "",
  createdDate: new Date().toISOString().split("T")[0],
  updatedDate: new Date().toISOString().split("T")[0],
  startDate: "",
  endDate: "",
  principalInvestigator: "",
  department: "",
  objective: "",
  hypothesis: "",
  groups: [],
  variables: [],
  methods: [],
  statisticalAnalysis: "",
  ethicalConsiderations: "",
  budget: 0,
  currency: "CNY",
  collaborators: [],
  attachments: [],
  tags: [],
  hasEthicalApproval: false,
}

export function ExperimentDesign() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<ExperimentFilters>(defaultFilters)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showDesignDetails, setShowDesignDetails] = useState(false)
  const [selectedDesign, setSelectedDesign] = useState<(typeof experimentDesigns)[0] | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [showTemplateManager, setShowTemplateManager] = useState(false)
  const [showSaveAsTemplate, setShowSaveAsTemplate] = useState(false)
  const [currentDesignData, setCurrentDesignData] = useState<any>(defaultNewDesign)
  const [isFromTemplate, setIsFromTemplate] = useState(false)

  // 更新搜索词到筛选器
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      searchTerm,
    }))
  }, [searchTerm])

  // 过滤试验设计数据
  const filteredDesigns = experimentDesigns.filter((design) => {
    // 基本搜索
    if (
      filters.searchTerm &&
      !design.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !design.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !design.principalInvestigator.toLowerCase().includes(filters.searchTerm.toLowerCase())
    ) {
      return false
    }

    // 研究类型筛选
    if (filters.types.length > 0 && !filters.types.includes(design.type)) {
      return false
    }

    // 设计类型筛选
    if (filters.designTypes.length > 0 && !filters.designTypes.includes(design.designType)) {
      return false
    }

    // 状态筛选
    if (filters.statuses.length > 0 && !filters.statuses.includes(design.status)) {
      return false
    }

    // 部门筛选
    if (filters.departments.length > 0 && !filters.departments.includes(design.department)) {
      return false
    }

    // 日期范围筛选
    if (filters.dateRange.from) {
      const startDate = new Date(design.createdDate)
      if (startDate < filters.dateRange.from) {
        return false
      }
    }

    if (filters.dateRange.to) {
      const startDate = new Date(design.createdDate)
      if (startDate > filters.dateRange.to) {
        return false
      }
    }

    // 标签筛选
    if (filters.tags.length > 0 && !filters.tags.some((tag) => design.tags.includes(tag))) {
      return false
    }

    // 预算范围筛选
    if (design.budget < filters.budgetRange[0] || design.budget > filters.budgetRange[1]) {
      return false
    }

    // 样本类型筛选
    if (filters.sampleTypes.length > 0) {
      // 这里需要实际数据中有样本类型字段，这里简化处理
      const hasSampleType = design.methods.some(
        (method) =>
          method.name.includes("样本") && filters.sampleTypes.some((type) => method.description.includes(type)),
      )
      if (!hasSampleType) {
        return false
      }
    }

    // 伦理批准筛选
    if (filters.hasEthicalApproval !== null && design.hasEthicalApproval !== filters.hasEthicalApproval) {
      return false
    }

    // 标签页筛选
    if (activeTab !== "all") {
      if (activeTab === "clinical" && design.type !== "临床研究") return false
      if (activeTab === "animal" && design.type !== "动物实验") return false
      if (activeTab === "method" && design.type !== "方法学研究") return false
      if (activeTab === "approved" && design.status !== "已批准") return false
      if (activeTab === "ongoing" && design.status !== "进行中") return false
      if (activeTab === "planned" && design.status !== "计划中") return false
    }

    return true
  })

  // 查看设计详情
  const viewDesignDetails = (design: (typeof experimentDesigns)[0]) => {
    setSelectedDesign(design)
    setShowDesignDetails(true)
  }

  // 获取研究状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "已批准":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            已批准
          </Badge>
        )
      case "进行中":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            进行中
          </Badge>
        )
      case "计划中":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            计划中
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // 获取研究类型图标
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "临床研究":
        return <Users className="h-4 w-4 text-blue-500" />
      case "动物实验":
        return <Beaker className="h-4 w-4 text-orange-500" />
      case "方法学研究":
        return <FlaskConical className="h-4 w-4 text-purple-500" />
      default:
        return <Microscope className="h-4 w-4 text-gray-500" />
    }
  }

  // 应用筛选器
  const applyFilters = (newFilters: ExperimentFilters) => {
    setFilters(newFilters)
  }

  // 清除所有筛选器
  const clearFilters = () => {
    setFilters(defaultFilters)
    setSearchTerm("")
  }

  // 移除单个筛选条件
  const removeFilter = (key: keyof ExperimentFilters, value?: string) => {
    if (key === "searchTerm") {
      setSearchTerm("")
      setFilters((prev) => ({ ...prev, searchTerm: "" }))
    } else if (key === "dateRange") {
      setFilters((prev) => ({
        ...prev,
        dateRange: { from: undefined, to: undefined },
      }))
    } else if (key === "budgetRange") {
      setFilters((prev) => ({
        ...prev,
        budgetRange: [0, 1000000],
      }))
    } else if (key === "hasEthicalApproval") {
      setFilters((prev) => ({
        ...prev,
        hasEthicalApproval: null,
      }))
    } else if (key === "createdByMe") {
      setFilters((prev) => ({
        ...prev,
        createdByMe: false,
      }))
    } else if (Array.isArray(filters[key])) {
      // 处理数组类型的筛选条件
      setFilters((prev) => ({
        ...prev,
        [key]: value ? (prev[key] as string[]).filter((item) => item !== value) : [],
      }))
    }
  }

  // 应用快速筛选
  const applyQuickFilter = (partialFilters: Partial<ExperimentFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...partialFilters,
    }))
  }

  // 处理保存为模板
  const handleSaveAsTemplate = (templateData: {
    name: string
    description: string
    tags: string[]
    isPublic: boolean
  }) => {
    // 在实际应用中，这里会调用API保存模板
    console.log("保存模板:", { ...templateData, content: selectedDesign })
    setShowSaveAsTemplate(false)

    // 显示成功消息
    alert(`模板"${templateData.name}"已成功保存！`)
  }

  // 处理应用模板
  const handleApplyTemplate = (template: any) => {
    // 将模板内容应用到当前设计
    setCurrentDesignData({
      ...defaultNewDesign,
      title: `基于"${template.name}"的新设计`,
      type: template.type,
      designType: template.designType,
      groups: [...template.content.groups],
      variables: [...template.content.variables],
      methods: [...template.content.methods],
      statisticalAnalysis: template.content.statisticalAnalysis,
      ethicalConsiderations: template.content.ethicalConsiderations,
      tags: [...template.tags],
    })

    // 标记为来自模板
    setIsFromTemplate(true)

    // 打开添加对话框
    setShowAddDialog(true)
  }

  // 打开模板管理器
  const openTemplateManager = () => {
    setShowTemplateManager(true)
  }

  // 打开保存为模板对话框
  const openSaveAsTemplateDialog = () => {
    if (!selectedDesign) {
      alert("请先选择一个设计")
      return
    }
    setShowSaveAsTemplate(true)
  }

  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>试验设计管理</CardTitle>
              <CardDescription>创建和管理研究试验设计方案</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-1">
                <Upload className="h-4 w-4" />
                导入
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                导出
              </Button>
              <Button variant="outline" className="flex items-center gap-1" onClick={openTemplateManager}>
                <FileText className="h-4 w-4" />
                模板
              </Button>
              <Button
                onClick={() => {
                  setCurrentDesignData(defaultNewDesign)
                  setIsFromTemplate(false)
                  setShowAddDialog(true)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                新建设计
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索设计标题、ID或研究者..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <QuickFilterMenu onApplyFilter={applyQuickFilter} />
              <ExperimentFilterDrawer filters={filters} onFiltersChange={applyFilters} onClearFilters={clearFilters} />

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setViewMode("list")}
                >
                  <ListFilter className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <ExperimentFilterTags filters={filters} onRemoveFilter={removeFilter} onClearFilters={clearFilters} />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">所有设计</TabsTrigger>
              <TabsTrigger value="clinical">临床研究</TabsTrigger>
              <TabsTrigger value="animal">动物实验</TabsTrigger>
              <TabsTrigger value="method">方法学研究</TabsTrigger>
              <TabsTrigger value="approved">已批准</TabsTrigger>
              <TabsTrigger value="ongoing">进行中</TabsTrigger>
              <TabsTrigger value="planned">计划中</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {viewMode === "list" ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>标题</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead>设计类型</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>主要研究者</TableHead>
                        <TableHead>创建日期</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDesigns.map((design) => (
                        <TableRow key={design.id}>
                          <TableCell className="font-medium">{design.id}</TableCell>
                          <TableCell>{design.title}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getTypeIcon(design.type)}
                              <span>{design.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{design.designType}</TableCell>
                          <TableCell>{getStatusBadge(design.status)}</TableCell>
                          <TableCell>{design.principalInvestigator}</TableCell>
                          <TableCell>{design.createdDate}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => viewDesignDetails(design)}>
                                详情
                              </Button>
                              <Button variant="ghost" size="sm">
                                编辑
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDesigns.map((design) => (
                    <Card key={design.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{design.title}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              {design.id} · {design.principalInvestigator}
                            </CardDescription>
                          </div>
                          {getStatusBadge(design.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getTypeIcon(design.type)}
                            {design.type}
                          </Badge>
                          <Badge variant="outline">{design.designType}</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <div>
                              <span className="font-medium">目标：</span>
                              {design.objective.length > 100
                                ? design.objective.substring(0, 100) + "..."
                                : design.objective}
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div>
                              <span className="font-medium">研究组：</span>
                              {design.groups.length} 组，共 {design.groups.reduce((sum, g) => sum + g.size, 0)} 例
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div>
                              <span className="font-medium">创建日期：</span>
                              {design.createdDate}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="ghost" size="sm" className="w-full" onClick={() => viewDesignDetails(design)}>
                          查看详情
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}

              {filteredDesigns.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FlaskConical className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">未找到匹配的试验设计</h3>
                  <p className="text-muted-foreground max-w-md">
                    尝试使用不同的搜索词或筛选条件，或者清除筛选条件查看所有设计
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            设计统计
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              上一页
            </Button>
            <span className="text-sm">第 1 页，共 1 页</span>
            <Button variant="outline" size="sm" disabled>
              下一页
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* 添加试验设计对话框 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isFromTemplate ? "基于模板创建试验设计" : "创建新试验设计"}</DialogTitle>
            <DialogDescription>
              {isFromTemplate ? "已应用模板内容，您可以根据需要修改" : "填写新试验设计的详细信息"}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">基本信息</TabsTrigger>
              <TabsTrigger value="groups">研究组</TabsTrigger>
              <TabsTrigger value="methods">方法与变量</TabsTrigger>
              <TabsTrigger value="other">其他信息</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">研究标题</Label>
                  <Input
                    id="title"
                    placeholder="输入研究标题"
                    value={currentDesignData.title}
                    onChange={(e) => setCurrentDesignData({ ...currentDesignData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="id">研究ID</Label>
                  <Input
                    id="id"
                    placeholder="输入研究ID"
                    value={currentDesignData.id}
                    onChange={(e) => setCurrentDesignData({ ...currentDesignData, id: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">研究类型</Label>
                  <Select
                    value={currentDesignData.type}
                    onValueChange={(value) => setCurrentDesignData({ ...currentDesignData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择研究类型" />
                    </SelectTrigger>
                    <SelectContent>
                      {researchTypes.map((type) => (
                        <SelectItem key={type.id} value={type.name}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="design-type">设计类型</Label>
                  <Select
                    value={currentDesignData.designType}
                    onValueChange={(value) => setCurrentDesignData({ ...currentDesignData, designType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择设计类型" />
                    </SelectTrigger>
                    <SelectContent>
                      {designTypes.map((type) => (
                        <SelectItem key={type.id} value={type.name}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pi">主要研究者</Label>
                  <Input
                    id="pi"
                    placeholder="输入主要研究者姓名"
                    value={currentDesignData.principalInvestigator}
                    onChange={(e) =>
                      setCurrentDesignData({ ...currentDesignData, principalInvestigator: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">所属部门</Label>
                  <Input
                    id="department"
                    placeholder="输入所属部门"
                    value={currentDesignData.department}
                    onChange={(e) => setCurrentDesignData({ ...currentDesignData, department: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start-date">开始日期</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={currentDesignData.startDate}
                    onChange={(e) => setCurrentDesignData({ ...currentDesignData, startDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">结束日期</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={currentDesignData.endDate}
                    onChange={(e) => setCurrentDesignData({ ...currentDesignData, endDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="objective">研究目标</Label>
                  <Textarea
                    id="objective"
                    placeholder="输入研究目标"
                    value={currentDesignData.objective}
                    onChange={(e) => setCurrentDesignData({ ...currentDesignData, objective: e.target.value })}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="hypothesis">研究假设</Label>
                  <Textarea
                    id="hypothesis"
                    placeholder="输入研究假设"
                    value={currentDesignData.hypothesis}
                    onChange={(e) => setCurrentDesignData({ ...currentDesignData, hypothesis: e.target.value })}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="status">研究状态</Label>
                  <RadioGroup
                    value={currentDesignData.status}
                    onValueChange={(value) => setCurrentDesignData({ ...currentDesignData, status: value })}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="计划中" id="planned" />
                      <Label htmlFor="planned">计划中</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="已批准" id="approved" />
                      <Label htmlFor="approved">已批准</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="进行中" id="ongoing" />
                      <Label htmlFor="ongoing">进行中</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="groups" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">研究组设置</h3>
                <Button
                  size="sm"
                  onClick={() => {
                    const newGroups = [
                      ...currentDesignData.groups,
                      { name: `研究组 ${currentDesignData.groups.length + 1}`, size: 0, description: "" },
                    ]
                    setCurrentDesignData({ ...currentDesignData, groups: newGroups })
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  添加研究组
                </Button>
              </div>

              <div className="space-y-4">
                {currentDesignData.groups.map((group, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{group.name}</CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newGroups = [...currentDesignData.groups]
                            newGroups.splice(index, 1)
                            setCurrentDesignData({ ...currentDesignData, groups: newGroups })
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`group-name-${index}`}>组名</Label>
                        <Input
                          id={`group-name-${index}`}
                          placeholder="输入研究组名称"
                          value={group.name}
                          onChange={(e) => {
                            const newGroups = [...currentDesignData.groups]
                            newGroups[index].name = e.target.value
                            setCurrentDesignData({ ...currentDesignData, groups: newGroups })
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`group-size-${index}`}>样本量</Label>
                        <Input
                          id={`group-size-${index}`}
                          type="number"
                          placeholder="输入样本量"
                          value={group.size}
                          onChange={(e) => {
                            const newGroups = [...currentDesignData.groups]
                            newGroups[index].size = Number.parseInt(e.target.value) || 0
                            setCurrentDesignData({ ...currentDesignData, groups: newGroups })
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`group-desc-${index}`}>描述</Label>
                        <Textarea
                          id={`group-desc-${index}`}
                          placeholder="输入研究组描述"
                          value={group.description}
                          onChange={(e) => {
                            const newGroups = [...currentDesignData.groups]
                            newGroups[index].description = e.target.value
                            setCurrentDesignData({ ...currentDesignData, groups: newGroups })
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {currentDesignData.groups.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center border rounded-md">
                    <Beaker className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">尚未添加研究组</h3>
                    <p className="text-muted-foreground max-w-md mb-4">点击"添加研究组"按钮创建您的第一个研究组</p>
                    <Button
                      size="sm"
                      onClick={() => {
                        const newGroups = [...currentDesignData.groups, { name: "研究组 1", size: 0, description: "" }]
                        setCurrentDesignData({ ...currentDesignData, groups: newGroups })
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      添加研究组
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="methods" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">研究变量</h3>
                    <Button
                      size="sm"
                      onClick={() => {
                        const newVariables = [
                          ...currentDesignData.variables,
                          { name: "", type: "连续变量", unit: "", method: "" },
                        ]
                        setCurrentDesignData({ ...currentDesignData, variables: newVariables })
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      添加变量
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {currentDesignData.variables.map((variable, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">变量 {index + 1}</CardTitle>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newVariables = [...currentDesignData.variables]
                                newVariables.splice(index, 1)
                                setCurrentDesignData({ ...currentDesignData, variables: newVariables })
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`var-name-${index}`}>变量名称</Label>
                            <Input
                              id={`var-name-${index}`}
                              placeholder="输入变量名称"
                              value={variable.name}
                              onChange={(e) => {
                                const newVariables = [...currentDesignData.variables]
                                newVariables[index].name = e.target.value
                                setCurrentDesignData({ ...currentDesignData, variables: newVariables })
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`var-type-${index}`}>变量类型</Label>
                            <Select
                              value={variable.type}
                              onValueChange={(value) => {
                                const newVariables = [...currentDesignData.variables]
                                newVariables[index].type = value
                                setCurrentDesignData({ ...currentDesignData, variables: newVariables })
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="选择变量类型" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="连续变量">连续变量</SelectItem>
                                <SelectItem value="分类变量">分类变量</SelectItem>
                                <SelectItem value="序数变量">序数变量</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`var-unit-${index}`}>单位</Label>
                            <Input
                              id={`var-unit-${index}`}
                              placeholder="输入变量单位"
                              value={variable.unit}
                              onChange={(e) => {
                                const newVariables = [...currentDesignData.variables]
                                newVariables[index].unit = e.target.value
                                setCurrentDesignData({ ...currentDesignData, variables: newVariables })
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`var-method-${index}`}>测量方法</Label>
                            <Input
                              id={`var-method-${index}`}
                              placeholder="输入测量方法"
                              value={variable.method}
                              onChange={(e) => {
                                const newVariables = [...currentDesignData.variables]
                                newVariables[index].method = e.target.value
                                setCurrentDesignData({ ...currentDesignData, variables: newVariables })
                              }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">研究方法</h3>
                    <Button
                      size="sm"
                      onClick={() => {
                        const newMethods = [...currentDesignData.methods, { name: "", description: "" }]
                        setCurrentDesignData({ ...currentDesignData, methods: newMethods })
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      添加方法
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {currentDesignData.methods.map((method, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">方法 {index + 1}</CardTitle>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newMethods = [...currentDesignData.methods]
                                newMethods.splice(index, 1)
                                setCurrentDesignData({ ...currentDesignData, methods: newMethods })
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`method-name-${index}`}>方法名称</Label>
                            <Input
                              id={`method-name-${index}`}
                              placeholder="输入方法名称"
                              value={method.name}
                              onChange={(e) => {
                                const newMethods = [...currentDesignData.methods]
                                newMethods[index].name = e.target.value
                                setCurrentDesignData({ ...currentDesignData, methods: newMethods })
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`method-desc-${index}`}>方法描述</Label>
                            <Textarea
                              id={`method-desc-${index}`}
                              placeholder="输入方法描述"
                              value={method.description}
                              onChange={(e) => {
                                const newMethods = [...currentDesignData.methods]
                                newMethods[index].description = e.target.value
                                setCurrentDesignData({ ...currentDesignData, methods: newMethods })
                              }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="statistical-analysis">统计分析方法</Label>
                <Textarea
                  id="statistical-analysis"
                  placeholder="输入统计分析方法"
                  value={currentDesignData.statisticalAnalysis}
                  onChange={(e) => setCurrentDesignData({ ...currentDesignData, statisticalAnalysis: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="other" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ethical">伦理考虑</Label>
                  <Textarea
                    id="ethical"
                    placeholder="输入伦理考虑"
                    value={currentDesignData.ethicalConsiderations}
                    onChange={(e) =>
                      setCurrentDesignData({ ...currentDesignData, ethicalConsiderations: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">预算</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="输入预算金额"
                      value={currentDesignData.budget}
                      onChange={(e) =>
                        setCurrentDesignData({ ...currentDesignData, budget: Number.parseInt(e.target.value) || 0 })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">货币</Label>
                    <Select
                      value={currentDesignData.currency}
                      onValueChange={(value) => setCurrentDesignData({ ...currentDesignData, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择货币" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CNY">人民币 (CNY)</SelectItem>
                        <SelectItem value="USD">美元 (USD)</SelectItem>
                        <SelectItem value="EUR">欧元 (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collaborators">合作者</Label>
                  <Textarea
                    id="collaborators"
                    placeholder="输入合作者信息，每行一个"
                    value={currentDesignData.collaborators.join("\n")}
                    onChange={(e) =>
                      setCurrentDesignData({
                        ...currentDesignData,
                        collaborators: e.target.value.split("\n").filter((line) => line.trim() !== ""),
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>标签</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentDesignData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => {
                            const newTags = [...currentDesignData.tags]
                            newTags.splice(index, 1)
                            setCurrentDesignData({ ...currentDesignData, tags: newTags })
                          }}
                        />
                      </Badge>
                    ))}
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary"
                      onClick={() => {
                        const newTag = prompt("请输入标签名称")
                        if (newTag && !currentDesignData.tags.includes(newTag)) {
                          setCurrentDesignData({ ...currentDesignData, tags: [...currentDesignData.tags, newTag] })
                        }
                      }}
                    >
                      + 添加
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>附件</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      拖放文件到此处，或者
                      <span className="text-primary font-medium cursor-pointer"> 点击上传</span>
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">支持 PDF, DOC, DOCX, XLS, XLSX 格式</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              取消
            </Button>
            <Button
              onClick={() => {
                // 在实际应用中，这里会调用API保存设计
                console.log("保存设计:", currentDesignData)
                setShowAddDialog(false)

                // 显示成功消息
                alert("设计已成功保存！")
              }}
            >
              保存设计
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 设计详情对话框 */}
      {selectedDesign && (
        <Dialog open={showDesignDetails} onOpenChange={setShowDesignDetails}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                {getTypeIcon(selectedDesign.type)}
                {selectedDesign.title}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                {selectedDesign.id} · {selectedDesign.designType} · {getStatusBadge(selectedDesign.status)}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">概览</TabsTrigger>
                <TabsTrigger value="groups">研究组</TabsTrigger>
                <TabsTrigger value="methods">方法与变量</TabsTrigger>
                <TabsTrigger value="other">其他信息</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">主要研究者</div>
                    <div className="font-medium">{selectedDesign.principalInvestigator}</div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">所属部门</div>
                    <div className="font-medium">{selectedDesign.department}</div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">创建日期</div>
                    <div className="font-medium">{selectedDesign.createdDate}</div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">更新日期</div>
                    <div className="font-medium">{selectedDesign.updatedDate}</div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">开始日期</div>
                    <div className="font-medium">{selectedDesign.startDate}</div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">结束日期</div>
                    <div className="font-medium">{selectedDesign.endDate}</div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">预算</div>
                    <div className="font-medium">
                      {selectedDesign.budget.toLocaleString()} {selectedDesign.currency}
                    </div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">伦理批准</div>
                    <div className="font-medium">{selectedDesign.hasEthicalApproval ? "已批准" : "未批准"}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">研究目标</h3>
                    <p className="text-sm text-muted-foreground">{selectedDesign.objective}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">研究假设</h3>
                    <p className="text-sm text-muted-foreground">{selectedDesign.hypothesis}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">标签</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDesign.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="groups" className="space-y-4 mt-4">
                <h3 className="font-medium mb-2">研究组设置</h3>
                <div className="space-y-4">
                  {selectedDesign.groups.map((group, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{group.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">样本量:</span>
                          <span className="font-medium">{group.size} 例</span>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">描述:</span>
                          <p className="text-sm mt-1">{group.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="methods" className="space-y-6 mt-4">
                <div>
                  <h3 className="font-medium mb-3">研究变量</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>变量名称</TableHead>
                          <TableHead>变量类型</TableHead>
                          <TableHead>单位</TableHead>
                          <TableHead>测量方法</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedDesign.variables.map((variable, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{variable.name}</TableCell>
                            <TableCell>{variable.type}</TableCell>
                            <TableCell>{variable.unit}</TableCell>
                            <TableCell>{variable.method}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">研究方法</h3>
                  <div className="space-y-4">
                    {selectedDesign.methods.map((method, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">{method.name}</h4>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">统计分析方法</h3>
                  <p className="text-sm text-muted-foreground">{selectedDesign.statisticalAnalysis}</p>
                </div>
              </TabsContent>

              <TabsContent value="other" className="space-y-6 mt-4">
                <div>
                  <h3 className="font-medium mb-2">伦理考虑</h3>
                  <p className="text-sm text-muted-foreground">{selectedDesign.ethicalConsiderations}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">合作者</h3>
                  <div className="space-y-2">
                    {selectedDesign.collaborators.map((collaborator, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <p className="text-sm">{collaborator}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">附件</h3>
                  <div className="space-y-2">
                    {selectedDesign.attachments.map((attachment, index) => (
                      <div key={index} className="border rounded-md p-3 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">{attachment}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6 gap-2">
              <Button variant="outline" className="flex items-center gap-1" onClick={openSaveAsTemplateDialog}>
                <FileText className="h-4 w-4" />
                保存为模板
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <Printer className="h-4 w-4" />
                打印
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                分享
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <Edit className="h-4 w-4" />
                编辑
              </Button>
              <Button onClick={() => setShowDesignDetails(false)}>关闭</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* 模板管理器对话框 */}
      <Dialog open={showTemplateManager} onOpenChange={setShowTemplateManager}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
          <ExperimentTemplateManager
            onSelectTemplate={handleApplyTemplate}
            onClose={() => setShowTemplateManager(false)}
          />
        </DialogContent>
      </Dialog>

      {/* 保存为模板对话框 */}
      <SaveAsTemplateDialog
        open={showSaveAsTemplate}
        onOpenChange={setShowSaveAsTemplate}
        onSave={handleSaveAsTemplate}
        experimentData={selectedDesign}
      />
    </>
  )
}
