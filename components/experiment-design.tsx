"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Microscope,
  FlaskConical,
  Beaker,
  Users,
  Search,
  Plus,
  Filter,
  Grid3X3,
  List,
  Save,
  FileText,
  Star,
} from "lucide-react"
import { ExperimentFilterDrawer } from "@/components/experiment-filter-drawer"
import { ExperimentFilterTags } from "@/components/experiment-filter-tags"
import { QuickFilterMenu } from "@/components/quick-filter-menu"
import { EthicsApplicationIntegration } from "@/components/ethics-application-integration"
import type { ExperimentFilters } from "@/components/experiment-filter-drawer"
import { Label } from "@/components/ui/label"

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

// 模拟模板数据
const designTemplates = [
  {
    id: "template-001",
    title: "临床研究标准模板",
    type: "临床研究",
    description: "适用于一般临床研究的标准模板，包含基本的研究设计框架",
    createdBy: "系统",
    createdDate: "2023-01-15",
    lastUsed: "2023-09-20",
    usageCount: 56,
    isPublic: true,
    isFavorite: true,
    tags: ["临床研究", "标准模板"],
  },
  {
    id: "template-002",
    title: "动物实验标准模板",
    type: "动物实验",
    description: "适用于动物实验的标准模板，符合动物实验伦理要求",
    createdBy: "系统",
    createdDate: "2023-02-10",
    lastUsed: "2023-08-15",
    usageCount: 42,
    isPublic: true,
    isFavorite: false,
    tags: ["动物实验", "标准模板"],
  },
  {
    id: "template-003",
    title: "药物干预研究模板",
    type: "临床研究",
    description: "适用于药物干预类临床研究，包含详细的安全性监测计划",
    createdBy: "张教授",
    createdDate: "2023-03-22",
    lastUsed: "2023-10-05",
    usageCount: 28,
    isPublic: true,
    isFavorite: true,
    tags: ["药物干预", "临床研究", "安全监测"],
  },
  {
    id: "template-004",
    title: "诊断试验评价模板",
    type: "方法学研究",
    description: "适用于诊断试验评价研究，包含灵敏度、特异度等指标的评估方法",
    createdBy: "王教授",
    createdDate: "2023-04-30",
    lastUsed: "2023-09-12",
    usageCount: 19,
    isPublic: true,
    isFavorite: false,
    tags: ["诊断试验", "方法学研究"],
  },
  {
    id: "template-005",
    title: "我的糖尿病研究模板",
    type: "临床研究",
    description: "个人定制的糖尿病研究模板，包含特定的生物标志物分析方案",
    createdBy: "当前用户",
    createdDate: "2023-05-15",
    lastUsed: "2023-10-10",
    usageCount: 5,
    isPublic: false,
    isFavorite: true,
    tags: ["糖尿病", "生物标志物", "个人模板"],
  },
]

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
  const [showFilterDrawer, setShowFilterDrawer] = useState(false)

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
    setShowFilterDrawer(false)
  }

  // 清除所有筛选器
  const clearFilters = () => {
    setFilters(defaultFilters)
    setSearchTerm("")
  }

  // 移除���个筛选条件
  const removeFilter = (key: keyof ExperimentFilters, value?: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev }

      if (key === "searchTerm") {
        newFilters.searchTerm = ""
        setSearchTerm("")
      } else if (key === "dateRange") {
        newFilters.dateRange = { from: undefined, to: undefined }
      } else if (key === "budgetRange") {
        newFilters.budgetRange = [0, 1000000]
      } else if (key === "hasEthicalApproval") {
        newFilters.hasEthicalApproval = null
      } else if (key === "createdByMe") {
        newFilters.createdByMe = false
      } else if (value && Array.isArray(newFilters[key])) {
        // @ts-ignore
        newFilters[key] = newFilters[key].filter((item) => item !== value)
      }

      return newFilters
    })
  }

  // 打开模板管理器
  const openTemplateManager = () => {
    setShowTemplateManager(true)
  }

  // 保存为模板
  const saveAsTemplate = () => {
    if (selectedDesign) {
      setCurrentDesignData(selectedDesign)
      setShowSaveAsTemplate(true)
    }
  }

  // 从模板创建
  const createFromTemplate = (templateId: string) => {
    // 这里可以实现从模板加载数据的逻辑
    console.log("从模板创建", templateId)

    // 模拟从模板加载数据
    const template = designTemplates.find((t) => t.id === templateId)
    if (template) {
      setCurrentDesignData({
        ...defaultNewDesign,
        title: `基于"${template.title}"的新设计`,
        type: template.type,
        tags: [...template.tags],
      })
      setIsFromTemplate(true)
      setShowAddDialog(true)
      setShowTemplateManager(false)
    }
  }

  // 处理模板保存
  const handleTemplateSave = (templateData: any) => {
    console.log("保存模板", templateData)
    // 这里可以添加保存模板到后端的逻辑
    setShowSaveAsTemplate(false)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">试验设计管理</h1>
          <p className="text-muted-foreground">管理和创建研究试验设计，跟踪伦理审批状态</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索试验设计..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
          <Button variant="outline" onClick={() => setShowFilterDrawer(true)}>
            <Filter className="h-4 w-4 mr-2" />
            筛选
          </Button>
          <Button variant="outline" onClick={openTemplateManager}>
            <FileText className="h-4 w-4 mr-2" />
            模板
          </Button>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            新建设计
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="clinical">临床研究</TabsTrigger>
          <TabsTrigger value="animal">动物实验</TabsTrigger>
          <TabsTrigger value="method">方法学研究</TabsTrigger>
          <TabsTrigger value="approved">已批准</TabsTrigger>
          <TabsTrigger value="ongoing">进行中</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-2">
        <QuickFilterMenu onFilterSelect={(filter) => setFilters((prev) => ({ ...prev, ...filter }))} />
        <ExperimentFilterTags filters={filters} onRemove={removeFilter} onClear={clearFilters} />
      </div>

      {filteredDesigns.length > 0 ? (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
          {filteredDesigns.map((design) => (
            <Card key={design.id} className={viewMode === "list" ? "overflow-hidden" : ""}>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(design.type)}
                      <CardTitle className="text-base">{design.title}</CardTitle>
                    </div>
                    <CardDescription>
                      {design.id} · {design.principalInvestigator} · {design.department}
                    </CardDescription>
                  </div>
                  {getStatusBadge(design.status)}
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-sm text-muted-foreground line-clamp-2 mb-2">{design.objective}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {design.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <div className="text-xs text-muted-foreground">
                  创建于 {design.createdDate} · 更新于 {design.updatedDate}
                </div>
                <Button variant="ghost" size="sm" onClick={() => viewDesignDetails(design)}>
                  查看详情
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Microscope className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">未找到试验设计</h3>
          <p className="mt-2 text-center text-muted-foreground">尝试调整筛选条件或创建新的试验设计。</p>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" onClick={clearFilters}>
              清除筛选
            </Button>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              新建设计
            </Button>
          </div>
        </div>
      )}

      {/* 筛选抽屉 */}
      <ExperimentFilterDrawer
        open={showFilterDrawer}
        onOpenChange={setShowFilterDrawer}
        filters={filters}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
      />

      {/* 设计详情对话框 */}
      {selectedDesign && (
        <Dialog open={showDesignDetails} onOpenChange={setShowDesignDetails}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getTypeIcon(selectedDesign.type)}
                {selectedDesign.title}
              </DialogTitle>
              <DialogDescription>
                {selectedDesign.id} · {getStatusBadge(selectedDesign.status)}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">主要研究者</h4>
                <p>{selectedDesign.principalInvestigator}</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">所属部门</h4>
                <p>{selectedDesign.department}</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">研究设计类型</h4>
                <p>{selectedDesign.designType}</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">开始日期</h4>
                <p>{selectedDesign.startDate}</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">结束日期</h4>
                <p>{selectedDesign.endDate}</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">预算</h4>
                <p>
                  {selectedDesign.budget.toLocaleString()} {selectedDesign.currency}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">研究目标</h4>
                <p className="text-sm">{selectedDesign.objective}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">研究假设</h4>
                <p className="text-sm">{selectedDesign.hypothesis}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">研究组</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedDesign.groups.map((group, index) => (
                    <div key={index} className="p-2 border rounded-md">
                      <div className="font-medium">{group.name}</div>
                      <div className="text-sm text-muted-foreground">
                        样本量: {group.size} · {group.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">研究方法</h4>
                <div className="space-y-2">
                  {selectedDesign.methods.map((method, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{method.name}:</span> {method.description}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">统计分析</h4>
                <p className="text-sm">{selectedDesign.statisticalAnalysis}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">伦理考虑</h4>
                <p className="text-sm">{selectedDesign.ethicalConsiderations}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">协作者</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDesign.collaborators.map((collaborator, index) => (
                    <Badge key={index} variant="secondary">
                      {collaborator}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">附件</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDesign.attachments.map((attachment, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {attachment}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" onClick={saveAsTemplate}>
                  <Save className="h-4 w-4 mr-2" />
                  保存为模板
                </Button>
                <EthicsApplicationIntegration experimentId={selectedDesign.id} experimentData={selectedDesign} />
              </div>
              <Button variant="outline" onClick={() => setShowDesignDetails(false)}>
                关闭
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* 新建设计对话框 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>新建试验设计</DialogTitle>
            <DialogDescription>
              {isFromTemplate ? "基于模板创建新的试验设计" : "创建新的试验设计并填写详细信息"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">研究标题</Label>
                  <Input
                    id="title"
                    placeholder="输入研究标题"
                    value={currentDesignData.title}
                    onChange={(e) => setCurrentDesignData((prev: any) => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">研究类型</Label>
                  <select
                    id="type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={currentDesignData.type}
                    onChange={(e) => setCurrentDesignData((prev: any) => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="">选择研究类型</option>
                    {researchTypes.map((type) => (
                      <option key={type.id} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designType">研究设计类型</Label>
                  <select
                    id="designType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={currentDesignData.designType}
                    onChange={(e) => setCurrentDesignData((prev: any) => ({ ...prev, designType: e.target.value }))}
                  >
                    <option value="">选择研究设计类型</option>
                    {designTypes.map((type) => (
                      <option key={type.id} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="principalInvestigator">主要研究者</Label>
                  <Input
                    id="principalInvestigator"
                    placeholder="输入主要研究者姓名"
                    value={currentDesignData.principalInvestigator}
                    onChange={(e) =>
                      setCurrentDesignData((prev: any) => ({ ...prev, principalInvestigator: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="objective">研究目标</Label>
                <textarea
                  id="objective"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="描述研究目标"
                  value={currentDesignData.objective}
                  onChange={(e) => setCurrentDesignData((prev: any) => ({ ...prev, objective: e.target.value }))}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddDialog(false)
                setIsFromTemplate(false)
                setCurrentDesignData(defaultNewDesign)
              }}
            >
              取消
            </Button>
            <Button
              onClick={() => {
                // 这里可以添加保存新设计的逻辑
                console.log("保存新设计", currentDesignData)
                setShowAddDialog(false)
                setIsFromTemplate(false)
                setCurrentDesignData(defaultNewDesign)
              }}
            >
              继续完善设计
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 模板管理对话框 */}
      <Dialog open={showTemplateManager} onOpenChange={setShowTemplateManager}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>试验设计模板</DialogTitle>
            <DialogDescription>浏览和管理试验设计模板，快速创建新的研究设计</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">全部模板</TabsTrigger>
                <TabsTrigger value="favorites">收藏模板</TabsTrigger>
                <TabsTrigger value="my">我的模板</TabsTrigger>
                <TabsTrigger value="system">系统模板</TabsTrigger>
              </TabsList>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {designTemplates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-base">{template.title}</CardTitle>
                          <CardDescription>
                            {template.type} · 使用 {template.usageCount} 次
                          </CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          {template.isFavorite ? (
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ) : (
                            <Star className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {template.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <div className="text-xs text-muted-foreground">
                        创建者: {template.createdBy} · {template.createdDate}
                      </div>
                      <Button size="sm" onClick={() => createFromTemplate(template.id)}>
                        使用此模板
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </Tabs>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTemplateManager(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 保存为模板对话框 */}
      <Dialog open={showSaveAsTemplate} onOpenChange={setShowSaveAsTemplate}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>保存为模板</DialogTitle>
            <DialogDescription>将当前设计保存为模板，方便未来重复使用</DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="templateName">模板名称</Label>
              <Input
                id="templateName"
                placeholder="输入模板名称"
                defaultValue={currentDesignData ? `${currentDesignData.title} 模板` : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="templateDescription">模板描述</Label>
              <textarea
                id="templateDescription"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="描述此模板的用途和特点"
                defaultValue={currentDesignData ? `基于"${currentDesignData.title}"创建的模板` : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="templateTags">标签</Label>
              <Input
                id="templateTags"
                placeholder="输入标签，用逗号分隔"
                defaultValue={currentDesignData ? currentDesignData.tags.join(", ") : ""}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPublic"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                defaultChecked
              />
              <Label htmlFor="isPublic">公开此模板，允许其他用户使用</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveAsTemplate(false)}>
              取消
            </Button>
            <Button
              onClick={() =>
                handleTemplateSave({
                  name: (document.getElementById("templateName") as HTMLInputElement).value,
                  description: (document.getElementById("templateDescription") as HTMLTextAreaElement).value,
                  tags: (document.getElementById("templateTags") as HTMLInputElement).value
                    .split(",")
                    .map((tag) => tag.trim()),
                  isPublic: (document.getElementById("isPublic") as HTMLInputElement).checked,
                  sourceDesign: currentDesignData,
                })
              }
            >
              保存模板
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
