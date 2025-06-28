"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  Search,
  Plus,
  FileText,
  Clock,
  Star,
  StarHalf,
  Users,
  Beaker,
  FlaskConical,
  Download,
  Copy,
} from "lucide-react"

// 模拟模板数据
const templates = [
  {
    id: "TPL-001",
    name: "随机对照试验标准模板",
    description: "适用于药物和干预措施有效性评估的标准RCT设计",
    type: "临床研究",
    designType: "随机对照试验",
    createdBy: "张教授",
    createdAt: "2023-01-15",
    updatedAt: "2023-03-20",
    popularity: "高",
    rating: 4.8,
    usageCount: 24,
    isPublic: true,
    tags: ["随机对照", "临床试验", "药物评估"],
    content: {
      groups: [
        { name: "干预组", size: 0, description: "接受研究干预的受试者" },
        { name: "对照组", size: 0, description: "接受安慰剂或标准治疗的受试者" },
      ],
      variables: [
        { name: "主要结局指标", type: "连续变量", unit: "", method: "" },
        { name: "次要结局指标", type: "连续变量", unit: "", method: "" },
        { name: "基线特征", type: "分类变量", unit: "", method: "" },
      ],
      methods: [
        { name: "随机化", description: "使用计算机生成的随机序列进行分组" },
        { name: "盲法", description: "采用双盲设计，研究者和受试者均不知道分组情况" },
        { name: "样本量计算", description: "基于预期效应量、显著性水平和检验效能计算所需样本量" },
      ],
      statisticalAnalysis: "主要采用意向性分析(ITT)，使用t检验或方差分析比较组间差异，p<0.05认为有统计学意义。",
      ethicalConsiderations: "研究方案需获得伦理委员会批准，所有受试者均需签署知情同意书。",
    },
  },
  {
    id: "TPL-002",
    name: "队列研究标准模板",
    description: "适用于长期随访特定人群的观察性研究设计",
    type: "流行病学研究",
    designType: "队列研究",
    createdBy: "李教授",
    createdAt: "2023-02-10",
    updatedAt: "2023-04-05",
    popularity: "高",
    rating: 4.6,
    usageCount: 18,
    isPublic: true,
    tags: ["队列研究", "观察性研究", "长期随访"],
    content: {
      groups: [
        { name: "暴露组", size: 0, description: "暴露于研究因素的人群" },
        { name: "非暴露组", size: 0, description: "未暴露于研究因素的人群" },
      ],
      variables: [
        { name: "暴露因素", type: "分类变量", unit: "", method: "问卷调查" },
        { name: "结局事件", type: "分类变量", unit: "", method: "随访记录" },
        { name: "混杂因素", type: "混合", unit: "", method: "多种方法" },
      ],
      methods: [
        { name: "队列建立", description: "明确纳入和排除标准，建立研究队列" },
        { name: "随访方案", description: "制定详细的随访计划，包括随访频率、方式和内容" },
        { name: "失访管理", description: "建立失访预防和处理机制，减少失访率" },
      ],
      statisticalAnalysis: "使用Cox比例风险模型分析暴露因素与结局事件的关联，计算风险比(HR)及其95%置信区间。",
      ethicalConsiderations: "研究方案需获得伦理委员会批准，保护受试者隐私和数据安全。",
    },
  },
  {
    id: "TPL-003",
    name: "交叉试验设计模板",
    description: "受试者分别接受不同干预措施的交叉设计",
    type: "临床研究",
    designType: "交叉试验",
    createdBy: "王教授",
    createdAt: "2023-03-05",
    updatedAt: "2023-05-12",
    popularity: "中",
    rating: 4.2,
    usageCount: 12,
    isPublic: true,
    tags: ["交叉试验", "临床试验", "自身对照"],
    content: {
      groups: [
        { name: "序列1", size: 0, description: "先接受干预A再接受干预B的受试者" },
        { name: "序列2", size: 0, description: "先接受干预B再接受干预A的受试者" },
      ],
      variables: [
        { name: "结局指标", type: "连续变量", unit: "", method: "" },
        { name: "不良反应", type: "分类变量", unit: "", method: "临床观察" },
        { name: "依从性", type: "分类变量", unit: "", method: "记录" },
      ],
      methods: [
        { name: "随机分配", description: "将受试者随机分配到不同序列" },
        { name: "洗脱期设计", description: "设置足够长的洗脱期，消除干预的残余效应" },
        { name: "盲法", description: "采用双盲设计，减少偏倚" },
      ],
      statisticalAnalysis: "使用混合效应模型分析，考虑序列效应、时期效应和残余效应。",
      ethicalConsiderations: "研究方案需获得伦理委员会批准，所有受试者均需签署知情同意书。",
    },
  },
  {
    id: "TPL-004",
    name: "病例对照研究模板",
    description: "比较病例组和对照组的回顾性研究设计",
    type: "流行病学研究",
    designType: "病例对照研究",
    createdBy: "刘教授",
    createdAt: "2023-04-20",
    updatedAt: "2023-06-15",
    popularity: "中",
    rating: 4.0,
    usageCount: 10,
    isPublic: true,
    tags: ["病例对照", "回顾性研究", "风险因素"],
    content: {
      groups: [
        { name: "病例组", size: 0, description: "患有研究疾病的受试者" },
        { name: "对照组", size: 0, description: "未患有研究疾病的受试者" },
      ],
      variables: [
        { name: "暴露因素", type: "分类变量", unit: "", method: "问卷调查" },
        { name: "混杂因素", type: "混合", unit: "", method: "多种方法" },
      ],
      methods: [
        { name: "病例定义", description: "明确病例的诊断标准和纳入排除标准" },
        { name: "对照选择", description: "选择合适的对照，可采用匹配设计" },
        { name: "数据收集", description: "使用标准化的问卷或表格收集数据" },
      ],
      statisticalAnalysis: "使用Logistic回归分析计算比值比(OR)及其95%置信区间，评估暴露因素与疾病的关联。",
      ethicalConsiderations: "研究方案需获得伦理委员会批准，保护受试者隐私和数据安全。",
    },
  },
  {
    id: "TPL-005",
    name: "诊断试验评价模板",
    description: "评估诊断方法准确性的研究设计",
    type: "方法学研究",
    designType: "诊断试验",
    createdBy: "赵教授",
    createdAt: "2023-05-25",
    updatedAt: "2023-07-10",
    popularity: "中",
    rating: 4.3,
    usageCount: 8,
    isPublic: true,
    tags: ["诊断试验", "方法评价", "准确性"],
    content: {
      groups: [
        { name: "疾病组", size: 0, description: "确诊患有目标疾病的受试者" },
        { name: "非疾病组", size: 0, description: "确诊不患有目标疾病的受试者" },
      ],
      variables: [
        { name: "指标测量值", type: "连续变量", unit: "", method: "待评价的诊断方法" },
        { name: "金标准结果", type: "分类变量", unit: "", method: "金标准诊断方法" },
      ],
      methods: [
        { name: "受试者选择", description: "明确纳入和排除标准，避免选择偏倚" },
        { name: "盲法实施", description: "确保诊断测试的执行和解读相互独立" },
        { name: "样本量计算", description: "基于预期的敏感性和特异性计算所需样本量" },
      ],
      statisticalAnalysis:
        "计算敏感性、特异性、阳性预测值、阴性预测值、似然比和诊断比值比，绘制ROC曲线并计算曲线下面积(AUC)。",
      ethicalConsiderations: "研究方案需获得伦理委员会批准，所有受试者均需签署知情同意书。",
    },
  },
]

// 模拟我的模板数据
const myTemplates = [
  {
    id: "TPL-101",
    name: "糖尿病生物标志物研究模板",
    description: "用于糖尿病生物标志物筛查和验证的研究设计",
    type: "临床研究",
    designType: "病例对照研究",
    createdBy: "我",
    createdAt: "2023-06-10",
    updatedAt: "2023-06-10",
    popularity: "私有",
    rating: 0,
    usageCount: 2,
    isPublic: false,
    tags: ["糖尿病", "生物标志物", "蛋白质组学"],
    content: {
      groups: [
        { name: "糖尿病组", size: 0, description: "确诊2型糖尿病患者" },
        { name: "对照组", size: 0, description: "年龄、性别匹配的健康志愿者" },
      ],
      variables: [
        { name: "空腹血糖", type: "连续变量", unit: "mmol/L", method: "葡萄糖氧化酶法" },
        { name: "糖化血红蛋白", type: "连续变量", unit: "%", method: "高效液相色谱法" },
        { name: "血清胰岛素", type: "连续变量", unit: "μIU/mL", method: "化学发光免疫法" },
      ],
      methods: [
        { name: "样本采集", description: "空腹采集静脉血10mL，分离血清，-80°C保存" },
        { name: "蛋白质组学分析", description: "使用液相色谱-质谱联用技术(LC-MS/MS)进行无标记定量蛋白质组学分析" },
        { name: "数据分析", description: "使用R软件进行统计分析，p<0.05认为差异有统计学意义" },
      ],
      statisticalAnalysis:
        "使用t检验比较两组间连续变量差异，卡方检验比较分类变量差异。使用Logistic回归分析筛选与疾病相关的独立危险因素。",
      ethicalConsiderations: "本研究已获得医院伦理委员会批准。所有参与者均签署知情同意书。",
    },
  },
  {
    id: "TPL-102",
    name: "肝纤维化动物模型模板",
    description: "用于肝纤维化小鼠模型药效评价的研究设计",
    type: "动物实验",
    designType: "随机对照试验",
    createdBy: "我",
    createdAt: "2023-07-05",
    updatedAt: "2023-07-05",
    popularity: "私有",
    rating: 0,
    usageCount: 1,
    isPublic: false,
    tags: ["肝纤维化", "动物模型", "药效评价"],
    content: {
      groups: [
        { name: "模型组", size: 0, description: "CCl4诱导肝纤维化+生理盐水" },
        { name: "低剂量组", size: 0, description: "CCl4诱导肝纤维化+药物(低剂量)" },
        { name: "高剂量组", size: 0, description: "CCl4诱导肝纤维化+药物(高剂量)" },
        { name: "阳性对照组", size: 0, description: "CCl4诱导肝纤维化+阳性对照药" },
        { name: "空白对照组", size: 0, description: "溶剂+生理盐水" },
      ],
      variables: [
        { name: "肝功能指标", type: "连续变量", unit: "U/L", method: "生化分析" },
        { name: "肝脏羟脯氨酸含量", type: "连续变量", unit: "μg/g", method: "比色法" },
        { name: "肝脏组织学评分", type: "序数变量", unit: "分", method: "HE染色和Masson染色" },
      ],
      methods: [
        { name: "模型建立", description: "腹腔注射CCl4，每周3次，连续6周" },
        { name: "药物给药", description: "从第4周开始，每日灌胃给药，连续3周" },
        { name: "样本采集", description: "末次给药24小时后处死动物，采集血液和肝脏组织" },
      ],
      statisticalAnalysis: "使用ANOVA分析各组间差异，LSD法进行多重比较，p<0.05认为差异有统计学意义。",
      ethicalConsiderations: "本研究已获得实验动物伦理委员会批准。严格遵循实验动物福利和伦理准则。",
    },
  },
]

interface ExperimentTemplateManagerProps {
  onSelectTemplate: (template: any) => void
  onClose: () => void
}

export function ExperimentTemplateManager({ onSelectTemplate, onClose }: ExperimentTemplateManagerProps) {
  const [activeTab, setActiveTab] = useState("public")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null)

  // 过滤模板
  const filteredTemplates = (activeTab === "public" ? templates : myTemplates).filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

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
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  // 获取流行度图标
  const getPopularityIcon = (popularity: string) => {
    switch (popularity) {
      case "高":
        return <Star className="h-4 w-4 text-yellow-500" />
      case "中":
        return <StarHalf className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="flex flex-col h-full">
      <DialogHeader className="px-6 pt-6">
        <DialogTitle>试验设计模板</DialogTitle>
        <DialogDescription>浏览和使用预设的试验设计模板，或创建自己的模板</DialogDescription>
      </DialogHeader>

      <div className="flex items-center gap-4 px-6 py-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索模板..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
          <Plus className="h-4 w-4 mr-2" />
          新建模板
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="public">公共模板</TabsTrigger>
            <TabsTrigger value="my">我的模板</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/3 border-r">
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="p-4 space-y-2">
                {filteredTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer hover:bg-accent/50 ${
                      selectedTemplate?.id === template.id ? "border-primary" : ""
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          <CardDescription className="text-xs flex items-center gap-1">
                            {getTypeIcon(template.type)}
                            {template.type} · {template.designType}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          {getPopularityIcon(template.popularity)}
                          <span className="text-xs text-muted-foreground">
                            {template.isPublic ? `${template.usageCount}次使用` : "私有"}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}

                {filteredTemplates.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <FileText className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">未找到匹配的模板</h3>
                    <p className="text-muted-foreground max-w-md">尝试使用不同的搜索词，或者创建新模板</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          <div className="w-2/3">
            {selectedTemplate ? (
              <ScrollArea className="h-[calc(100vh-250px)]">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold">{selectedTemplate.name}</h2>
                      <p className="text-muted-foreground mt-1">{selectedTemplate.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        导出
                      </Button>
                      <Button variant="outline" className="flex items-center gap-1">
                        <Copy className="h-4 w-4" />
                        复制
                      </Button>
                      <Button onClick={() => onSelectTemplate(selectedTemplate)}>使用此模板</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground mb-1">模板ID</div>
                      <div className="font-medium">{selectedTemplate.id}</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground mb-1">创建者</div>
                      <div className="font-medium">{selectedTemplate.createdBy}</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground mb-1">创建日期</div>
                      <div className="font-medium">{selectedTemplate.createdAt}</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground mb-1">更新日期</div>
                      <div className="font-medium">{selectedTemplate.updatedAt}</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <h3 className="font-medium">标签</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">研究组</h3>
                      <div className="space-y-3">
                        {selectedTemplate.content.groups.map((group, index) => (
                          <div key={index} className="border rounded-md p-3">
                            <div className="font-medium mb-1">{group.name}</div>
                            <p className="text-sm text-muted-foreground">{group.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

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
                            {selectedTemplate.content.variables.map((variable, index) => (
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
                      <div className="space-y-3">
                        {selectedTemplate.content.methods.map((method, index) => (
                          <div key={index} className="border rounded-md p-3">
                            <div className="font-medium mb-1">{method.name}</div>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">统计分析方法</h3>
                      <p className="text-sm text-muted-foreground border rounded-md p-3">
                        {selectedTemplate.content.statisticalAnalysis}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">伦理考虑</h3>
                      <p className="text-sm text-muted-foreground border rounded-md p-3">
                        {selectedTemplate.content.ethicalConsiderations}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)] p-6 text-center">
                <FileText className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">选择一个模板查看详情</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  从左侧列表中选择一个模板查看详细信息，或者创建一个新的模板
                </p>
                <Button onClick={() => setSelectedTemplate(templates[0])}>查看示例模板</Button>
              </div>
            )}
          </div>
        </div>
      </Tabs>

      <div className="border-t p-6 flex justify-between">
        <Button variant="outline" onClick={onClose}>
          取消
        </Button>
        <Button onClick={onClose}>完成</Button>
      </div>
    </div>
  )
}
