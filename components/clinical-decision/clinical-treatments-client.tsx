"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Plus,
  Filter,
  FileText,
  Clock,
  Star,
  Download,
  Share2,
  ChevronRight,
  Users,
  Calendar,
  CheckCircle,
  AlertCircle,
  Stethoscope,
  Pill,
  Activity,
  Heart,
  Brain,
  TreesIcon as Lungs,
  Clipboard,
  Bell,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// 模拟治疗方案数据
const treatmentPlans = [
  {
    id: "TP001",
    name: "2型糖尿病标准治疗方案",
    category: "内分泌科",
    subcategory: "糖尿病",
    createdBy: "李医生",
    createdAt: "2023-12-15",
    updatedAt: "2024-04-10",
    status: "已发布",
    usageCount: 128,
    effectivenessRating: 4.2,
    aiAssisted: true,
    description: "基于最新临床指南的2型糖尿病综合治疗方案，包括药物治疗、生活方式干预和并发症管理。",
    phases: [
      {
        name: "初始评估",
        duration: "1-2周",
        description: "全面评估患者病情，确定治疗目标",
        steps: [
          "全面病史采集",
          "体格检查",
          "实验室检查（空腹血糖、糖化血红蛋白、血脂、肝肾功能等）",
          "并发症筛查",
          "制定个体化治疗目标",
        ],
      },
      {
        name: "初始治疗",
        duration: "4-12周",
        description: "根据评估结果开始初始治疗",
        steps: [
          "生活方式干预（饮食控制、运动指导）",
          "二甲双胍单药治疗（无禁忌症）",
          "患者教育（自我管理、血糖监测）",
          "定期随访评估治疗效果",
        ],
      },
      {
        name: "治疗调整",
        duration: "持续",
        description: "根据治疗反应调整治疗方案",
        steps: ["评估初始治疗效果", "必要时调整药物种类或剂量", "加强生活方式干预", "管理并发症和合并症"],
      },
      {
        name: "长期管理",
        duration: "持续",
        description: "长期疾病管理和并发症预防",
        steps: ["定期随访（每3-6个月一次）", "定期筛查并发症", "调整治疗目标和方案", "持续患者教育和支持"],
      },
    ],
    medications: [
      {
        category: "一线用药",
        drugs: ["二甲双胍（首选）", "磺脲类药物", "DPP-4抑制剂", "SGLT-2抑制剂", "GLP-1受体激动剂"],
      },
      {
        category: "二线用药",
        drugs: ["胰岛素", "噻唑烷二酮类", "α-糖苷酶抑制剂"],
      },
    ],
    monitoringItems: [
      { name: "空腹血糖", frequency: "每周1-3次", target: "4.4-7.0 mmol/L" },
      { name: "餐后2小时血糖", frequency: "每周1-3次", target: "< 10.0 mmol/L" },
      { name: "糖化血红蛋白", frequency: "每3个月", target: "< 7.0%" },
      { name: "血压", frequency: "每次随访", target: "< 130/80 mmHg" },
      { name: "体重", frequency: "每次随访", target: "BMI < 24 kg/m²" },
    ],
  },
  {
    id: "TP002",
    name: "高血压阶梯治疗方案",
    category: "心内科",
    subcategory: "高血压",
    createdBy: "王医生",
    createdAt: "2024-01-10",
    updatedAt: "2024-03-22",
    status: "已发布",
    usageCount: 156,
    effectivenessRating: 4.5,
    aiAssisted: true,
    description: "基于最新高血压指南的阶梯治疗方案，包括药物治疗和生活方式干预。",
    phases: [
      {
        name: "初始评估",
        duration: "1-2周",
        description: "评估高血压严重程度和靶器官损害",
        steps: [
          "全面病史采集",
          "体格检查",
          "实验室检查（血常规、尿常规、血脂、肝肾功能等）",
          "心电图、超声心动图",
          "评估心血管风险",
        ],
      },
      {
        name: "生活方式干预",
        duration: "持续",
        description: "非药物治疗措施",
        steps: [
          "限盐饮食（每日摄入量<6g）",
          "控制体重（BMI<24kg/m²）",
          "规律运动（每周150分钟中等强度有氧运动）",
          "限制饮酒",
          "戒烟",
          "心理减压",
        ],
      },
      {
        name: "药物治疗",
        duration: "持续",
        description: "根据血压水平和心血管风险选择药物",
        steps: [
          "一级高血压：单药治疗或低剂量联合治疗",
          "二级高血压：两种药物联合治疗",
          "三级高血压：三种药物联合治疗",
          "难治性高血压：加用螺内酯或其他药物",
        ],
      },
      {
        name: "长期管理",
        duration: "持续",
        description: "长期随访和管理",
        steps: ["定期随访（血压控制良好每3个月一次）", "家庭血压监测", "定期评估靶器官功能", "调整治疗方案"],
      },
    ],
    medications: [
      {
        category: "首选药物",
        drugs: ["血管紧张素转换酶抑制剂(ACEI)", "血管紧张素II受体拮抗剂(ARB)", "钙通道阻滞剂(CCB)", "噻嗪类利尿剂"],
      },
      {
        category: "其他药物",
        drugs: ["β受体阻滞剂", "醛固酮拮抗剂", "中枢性降压药", "α受体阻滞剂"],
      },
    ],
    monitoringItems: [
      { name: "诊室血压", frequency: "每次随访", target: "< 140/90 mmHg" },
      { name: "家庭血压", frequency: "每周2-3天，每天早晚各一次", target: "< 135/85 mmHg" },
      { name: "24小时动态血压", frequency: "必要时", target: "24小时平均 < 130/80 mmHg" },
      { name: "血钾", frequency: "开始治疗后2-4周，之后每6-12个月", target: "3.5-5.5 mmol/L" },
      { name: "肾功能", frequency: "每6-12个月", target: "肌酐清除率 > 60 ml/min" },
    ],
  },
  {
    id: "TP003",
    name: "冠心病二级预防方案",
    category: "心内科",
    subcategory: "冠心病",
    createdBy: "张医生",
    createdAt: "2023-11-05",
    updatedAt: "2024-02-18",
    status: "已发布",
    usageCount: 92,
    effectivenessRating: 4.7,
    aiAssisted: false,
    description: "冠心病患者的综合二级预防方案，包括药物治疗、生活方式干预和心脏康复。",
    phases: [
      {
        name: "风险评估",
        duration: "1-2周",
        description: "评估冠心病严重程度和复发风险",
        steps: [
          "详细病史采集",
          "体格检查",
          "实验室检查（血脂、血糖、肝肾功能等）",
          "心电图、超声心动图",
          "必要时冠脉造影或CT",
        ],
      },
      {
        name: "药物治疗",
        duration: "持续",
        description: "预防心血管事件的药物治疗",
        steps: [
          "抗血小板治疗（阿司匹林、P2Y12受体拮抗剂）",
          "他汀类药物（高强度）",
          "β受体阻滞剂",
          "血管紧张素转换酶抑制剂/血管紧张素II受体拮抗剂",
          "必要时硝酸酯类药物",
        ],
      },
      {
        name: "生活方式干预",
        duration: "持续",
        description: "改善生活方式，降低风险因素",
        steps: [
          "戒烟",
          "地中海饮食或DASH饮食",
          "规律运动（每周150分钟中等强度有氧运动）",
          "控制体重（BMI<24kg/m²）",
          "心理健康管理",
        ],
      },
      {
        name: "心脏康复",
        duration: "8-12周",
        description: "结构化心脏康复计划",
        steps: ["运动训练（有监督的有氧运动和抗阻训练）", "健康教育", "心理支持", "风险因素管理"],
      },
      {
        name: "长期随访",
        duration: "持续",
        description: "长期管理和随访",
        steps: [
          "定期随访（每3-6个月一次）",
          "定期评估药物治疗效果和不良反应",
          "调整治疗方案",
          "定期筛查心血管事件风险",
        ],
      },
    ],
    medications: [
      {
        category: "抗血小板药物",
        drugs: ["阿司匹林", "氯吡格雷", "替格瑞洛"],
      },
      {
        category: "调脂药物",
        drugs: ["阿托伐他汀", "瑞舒伐他汀", "依折麦布"],
      },
      {
        category: "抗心肌缺血药物",
        drugs: ["β受体阻滞剂", "钙通道阻滞剂", "硝酸酯类"],
      },
      {
        category: "其他药物",
        drugs: ["ACEI/ARB", "醛固酮拮抗剂"],
      },
    ],
    monitoringItems: [
      { name: "血脂", frequency: "开始治疗后4-12周，之后每3-12个月", target: "LDL-C < 1.4 mmol/L" },
      { name: "血压", frequency: "每次随访", target: "< 130/80 mmHg" },
      { name: "心电图", frequency: "每年或症状变化时", target: "无新发缺血改变" },
      { name: "运动耐量", frequency: "心脏康复期间定期评估", target: "逐渐提高" },
      { name: "生活质量", frequency: "每次随访", target: "持续改善" },
    ],
  },
  {
    id: "TP004",
    name: "慢性阻塞性肺疾病管理方案",
    category: "呼吸科",
    subcategory: "COPD",
    createdBy: "刘医生",
    createdAt: "2023-10-20",
    updatedAt: "2024-01-30",
    status: "已发布",
    usageCount: 78,
    effectivenessRating: 4.0,
    aiAssisted: true,
    description: "慢性阻塞性肺疾病的综合管理方案，包括药物治疗、肺康复和预防急性加重。",
    phases: [
      {
        name: "评估分级",
        duration: "1-2周",
        description: "评估COPD严重程度和分级",
        steps: [
          "详细病史采集",
          "体格检查",
          "肺功能检查（FEV1/FVC、FEV1）",
          "评估症状（mMRC呼吸困难量表、CAT评分）",
          "评估急性加重风险",
          "合并症筛查",
        ],
      },
      {
        name: "稳定期治疗",
        duration: "持续",
        description: "稳定期药物治疗和非药物治疗",
        steps: [
          "支气管扩张剂治疗（长效β2受体激动剂、长效抗胆碱能药物）",
          "必要时吸入糖皮质激素",
          "戒烟",
          "肺康复",
          "氧疗（适应症患者）",
        ],
      },
      {
        name: "急性加重期管理",
        duration: "视情况而定",
        description: "急性加重期的处理",
        steps: ["短效支气管扩张剂", "全身性糖皮质激素", "必要时抗生素", "必要时无创通气", "预防再次急性加重"],
      },
      {
        name: "长期管理",
        duration: "持续",
        description: "长期疾病管理和随访",
        steps: [
          "定期随访（每3-6个月一次）",
          "定期肺功能检查（每年至少一次）",
          "疫苗接种（流感疫苗、肺炎球菌疫苗）",
          "调整治疗方案",
          "管理合并症",
        ],
      },
    ],
    medications: [
      {
        category: "短效支气管扩张剂",
        drugs: ["沙丁胺醇", "异丙托溴铵"],
      },
      {
        category: "长效支气管扩张剂",
        drugs: ["茚达特罗", "噻托溴铵", "维兰特罗", "乌美溴铵"],
      },
      {
        category: "吸入糖皮质激素",
        drugs: ["布地奈德", "氟替卡松"],
      },
      {
        category: "其他药物",
        drugs: ["茶碱", "罗氟司特", "大环内酯类抗生素（长期低剂量）"],
      },
    ],
    monitoringItems: [
      { name: "肺功能", frequency: "每年至少一次", target: "FEV1下降速度减缓" },
      { name: "症状评分", frequency: "每次随访", target: "CAT评分 < 10分" },
      { name: "急性加重", frequency: "持续监测", target: "减少急性加重次数" },
      { name: "运动耐量", frequency: "每3-6个月", target: "6分钟步行距离增加" },
      { name: "氧合状态", frequency: "必要时", target: "SpO2 > 90%" },
    ],
  },
  {
    id: "TP005",
    name: "抑郁症阶梯治疗方案",
    category: "精神科",
    subcategory: "抑郁症",
    createdBy: "赵医生",
    createdAt: "2024-02-05",
    updatedAt: "2024-04-12",
    status: "审核中",
    usageCount: 0,
    effectivenessRating: 0,
    aiAssisted: true,
    description: "抑郁症的阶梯式治疗方案，包括药物治疗、心理治疗和物理治疗。",
    phases: [
      {
        name: "评估诊断",
        duration: "1-2周",
        description: "全面评估和明确诊断",
        steps: [
          "详细病史采集",
          "精神状态检查",
          "抑郁量表评估（PHQ-9、HAMD等）",
          "排除器质性疾病",
          "评估自杀风险",
          "共病筛查",
        ],
      },
      {
        name: "初始治疗",
        duration: "4-8周",
        description: "根据抑郁严重程度选择初始治疗",
        steps: [
          "轻度抑郁：心理治疗或药物治疗",
          "中度抑郁：药物治疗联合心理治疗",
          "重度抑郁：药物治疗为主，必要时联合心理治疗",
          "定期评估治疗反应和不良反应",
        ],
      },
      {
        name: "治疗调整",
        duration: "4-12周",
        description: "根据初始治疗反应调整治疗方案",
        steps: [
          "治疗反应不佳：调整药物剂量或更换药物",
          "部分缓解：强化现有治疗",
          "治疗反应良好：继续现有治疗",
          "考虑联合治疗策略",
        ],
      },
      {
        name: "巩固治疗",
        duration: "4-9个月",
        description: "症状缓解后的巩固治疗",
        steps: ["继续有效的治疗方案", "预防复发", "处理残留症状", "改善社会功能"],
      },
      {
        name: "维持治疗",
        duration: "至少6-24个月",
        description: "预防复发的维持治疗",
        steps: ["继续有效的药物治疗", "定期随访", "心理支持", "复发预警和早期干预"],
      },
    ],
    medications: [
      {
        category: "选择性5-羟色胺再摄取抑制剂(SSRIs)",
        drugs: ["艾司西酞普兰", "舍曲林", "帕罗西汀", "氟西汀"],
      },
      {
        category: "5-羟色胺和去甲肾上腺素再摄取抑制剂(SNRIs)",
        drugs: ["文拉法辛", "度洛西汀"],
      },
      {
        category: "其他抗抑郁药",
        drugs: ["米氮平", "阿戈美拉汀", "伯氨喹", "氢溴酸伏硫西汀"],
      },
      {
        category: "增效策略",
        drugs: ["锂盐", "抗精神病药（小剂量）", "甲状腺激素"],
      },
    ],
    monitoringItems: [
      { name: "抑郁症状", frequency: "每2-4周（初始），之后每1-3个月", target: "PHQ-9评分 < 5分" },
      { name: "不良反应", frequency: "每次随访", target: "无严重不良反应" },
      { name: "自杀风险", frequency: "每次随访", target: "无自杀意念和行为" },
      { name: "社会功能", frequency: "每3个月", target: "恢复正常社会功能" },
      { name: "生活质量", frequency: "每3-6个月", target: "生活质量显著改善" },
    ],
  },
]

// 模拟个性化治疗方案数据
const personalizedTreatments = [
  {
    id: "PT001",
    patientId: "P-20240428-001",
    patientName: "张伟",
    basedOn: "TP001",
    planName: "张伟的糖尿病个性化治疗方案",
    createdBy: "李医生",
    createdAt: "2024-04-28",
    status: "进行中",
    progress: 35,
    nextReview: "2024-05-28",
    adjustments: [
      {
        category: "药物调整",
        description: "因肾功能轻度下降，二甲双胍剂量减至500mg，每日两次",
        reason: "eGFR 58 ml/min/1.73m²",
      },
      {
        category: "监测频率",
        description: "增加血糖监测频率至每日两次",
        reason: "血糖波动较大",
      },
      {
        category: "治疗目标",
        description: "糖化血红蛋白目标调整为<7.5%",
        reason: "考虑年龄和低血糖风险",
      },
    ],
    outcomes: [
      {
        date: "2024-04-28",
        metrics: [
          { name: "空腹血糖", value: "8.2 mmol/L", target: "4.4-7.0 mmol/L", status: "未达标" },
          { name: "糖化血红蛋白", value: "8.1%", target: "<7.5%", status: "未达标" },
          { name: "体重", value: "78 kg", target: "<75 kg", status: "未达标" },
        ],
      },
    ],
  },
  {
    id: "PT002",
    patientId: "P-20240427-015",
    patientName: "李敏",
    basedOn: "TP002",
    planName: "李敏的高血压个性化治疗方案",
    createdBy: "王医生",
    createdAt: "2024-04-26",
    status: "进行中",
    progress: 42,
    nextReview: "2024-05-26",
    adjustments: [
      {
        category: "药物选择",
        description: "首选ARB类药物（替米沙坦40mg，每日一次）",
        reason: "有ACEI相关咳嗽史",
      },
      {
        category: "生活方式",
        description: "强化低盐饮食指导，每日盐摄入量控制在4g以内",
        reason: "盐敏感性高血压",
      },
    ],
    outcomes: [
      {
        date: "2024-04-26",
        metrics: [
          { name: "诊室血压", value: "148/92 mmHg", target: "<140/90 mmHg", status: "未达标" },
          { name: "家庭血压", value: "142/88 mmHg", target: "<135/85 mmHg", status: "未达标" },
        ],
      },
    ],
  },
  {
    id: "PT003",
    patientId: "P-20240426-042",
    patientName: "王强",
    basedOn: "TP003",
    planName: "王强的冠心病个性化治疗方案",
    createdBy: "张医生",
    createdAt: "2024-04-20",
    status: "进行中",
    progress: 65,
    nextReview: "2024-05-20",
    adjustments: [
      {
        category: "抗血小板治疗",
        description: "使用替格瑞洛90mg，每日两次，替代氯吡格雷",
        reason: "既往PCI术后支架内血栓史",
      },
      {
        category: "他汀治疗",
        description: "使用瑞舒伐他汀20mg，每日一次",
        reason: "高强度他汀不耐受（肌肉症状）",
      },
      {
        category: "运动处方",
        description: "调整为低强度、高频率运动（每日30分钟轻度有氧运动）",
        reason: "膝关节骨关节炎限制运动能力",
      },
    ],
    outcomes: [
      {
        date: "2024-04-20",
        metrics: [
          { name: "LDL-C", value: "1.8 mmol/L", target: "<1.4 mmol/L", status: "未达标" },
          { name: "血压", value: "128/78 mmHg", target: "<130/80 mmHg", status: "达标" },
          { name: "心绞痛发作", value: "2次/周", target: "无发作", status: "未达标" },
        ],
      },
    ],
  },
]

export function ClinicalTreatmentsClient() {
  const [activeTab, setActiveTab] = useState("standard")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPlan, setSelectedPlan] = useState<(typeof treatmentPlans)[0] | null>(null)
  const [selectedPersonalizedPlan, setSelectedPersonalizedPlan] = useState<(typeof personalizedTreatments)[0] | null>(
    null,
  )

  // 获取所有类别
  const allCategories = Array.from(new Set(treatmentPlans.map((plan) => plan.category)))

  // 过滤标准方案
  const filteredStandardPlans = treatmentPlans.filter(
    (plan) =>
      (searchTerm === "" ||
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.subcategory.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "all" || plan.category === selectedCategory),
  )

  // 过滤个性化方案
  const filteredPersonalizedPlans = personalizedTreatments.filter(
    (plan) =>
      searchTerm === "" ||
      plan.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.patientName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 获取图标
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "内分泌科":
        return <Activity className="h-5 w-5 text-blue-500" />
      case "心内科":
        return <Heart className="h-5 w-5 text-red-500" />
      case "呼吸科":
        return <Lungs className="h-5 w-5 text-green-500" />
      case "神经内科":
        return <Brain className="h-5 w-5 text-purple-500" />
      case "精神科":
        return <Brain className="h-5 w-5 text-indigo-500" />
      case "消化内科":
        return <Activity className="h-5 w-5 text-orange-500" />
      default:
        return <Stethoscope className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>治疗方案管理</CardTitle>
              <CardDescription>管理标准治疗方案和个性化治疗方案</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-1" />
                最近使用
              </Button>
              <Button variant="outline" size="sm">
                <Star className="h-4 w-4 mr-1" />
                收藏方案
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                新建方案
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索方案名称、科室或疾病..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
              <TabsTrigger value="standard">标准方案</TabsTrigger>
              <TabsTrigger value="personalized">个性化方案</TabsTrigger>
              <TabsTrigger value="templates">方案模板</TabsTrigger>
              <TabsTrigger value="ai">AI推荐</TabsTrigger>
            </TabsList>

            <TabsContent value="standard" className="space-y-4">
              {filteredStandardPlans.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">未找到匹配的治疗方案</h3>
                  <p className="text-muted-foreground max-w-md">
                    尝试使用不同的搜索词或筛选条件，或者清除筛选条件查看所有方案
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredStandardPlans.map((plan) => (
                    <Card key={plan.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-2">
                            <div className="mt-1">{getCategoryIcon(plan.category)}</div>
                            <div>
                              <CardTitle className="text-lg line-clamp-2">{plan.name}</CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                {plan.category} · {plan.subcategory}
                              </CardDescription>
                            </div>
                          </div>
                          {plan.aiAssisted && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              AI辅助
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline">{plan.status}</Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {plan.usageCount} 次使用
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {plan.effectivenessRating.toFixed(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{plan.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          更新于 {plan.updatedAt}
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedPlan(plan)}>
                          查看详情
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="personalized" className="space-y-4">
              {filteredPersonalizedPlans.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Clipboard className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">未找到匹配的个性化治疗方案</h3>
                  <p className="text-muted-foreground max-w-md">
                    尝试使用不同的搜索词，或者为患者创建新的个性化治疗方案
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPersonalizedPlans.map((plan) => (
                    <Card key={plan.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{plan.patientName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{plan.planName}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span>患者: {plan.patientName}</span>
                                <span className="mx-2">•</span>
                                <span>ID: {plan.patientId}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant="outline"
                                  className={
                                    plan.status === "进行中"
                                      ? "bg-green-50 text-green-700 border-green-200"
                                      : plan.status === "已完成"
                                        ? "bg-blue-50 text-blue-700 border-blue-200"
                                        : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  }
                                >
                                  {plan.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  基于: {treatmentPlans.find((t) => t.id === plan.basedOn)?.name}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>进度</span>
                              <span className="font-medium">{plan.progress}%</span>
                            </div>
                            <Progress value={plan.progress} max={100} className="h-2" />
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              下次评估: {plan.nextReview}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium">方案调整</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => setSelectedPersonalizedPlan(plan)}
                            >
                              查看详情
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {plan.adjustments.slice(0, 2).map((adjustment, index) => (
                              <div key={index} className="text-sm">
                                <span className="font-medium">{adjustment.category}:</span>{" "}
                                <span className="text-muted-foreground">{adjustment.description}</span>
                              </div>
                            ))}
                            {plan.adjustments.length > 2 && (
                              <div className="text-xs text-muted-foreground">
                                还有 {plan.adjustments.length - 2} 项调整...
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t flex justify-between items-center">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>创建: {plan.createdAt}</span>
                            <span className="mx-2">•</span>
                            <span>医生: {plan.createdBy}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Clipboard className="h-4 w-4 mr-1" />
                              记录进展
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="h-4 w-4 mr-1" />
                              分享
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="flex justify-center mt-6">
                <Button>
                  <Plus className="h-4 w-4 mr-1" />
                  创建个性化治疗方案
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Clipboard className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">方案模板功能即将上线</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  您将能够创建和管理自定义治疗方案模板，提高工作效率
                </p>
                <Button variant="outline">
                  <Bell className="h-4 w-4 mr-1" />
                  功能上线时通知我
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="ai" className="space-y-4">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Brain className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">AI推荐功能即将上线</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  基于患者数据和最新医学证据，AI将为您推荐个性化治疗方案
                </p>
                <Button variant="outline">
                  <Bell className="h-4 w-4 mr-1" />
                  功能上线时通知我
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 标准方案详情 */}
      {selectedPlan && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="mt-1">{getCategoryIcon(selectedPlan.category)}</div>
                <div>
                  <CardTitle>{selectedPlan.name}</CardTitle>
                  <CardDescription>
                    {selectedPlan.category} · {selectedPlan.subcategory} · {selectedPlan.status}
                  </CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  导出
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  分享
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  应用到患者
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">创建者</div>
                <div className="font-medium">{selectedPlan.createdBy}</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">创建日期</div>
                <div className="font-medium">{selectedPlan.createdAt}</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">更新日期</div>
                <div className="font-medium">{selectedPlan.updatedAt}</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">使用情况</div>
                <div className="font-medium">{selectedPlan.usageCount} 次使用</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">方案概述</h3>
              <p className="text-sm">{selectedPlan.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">治疗阶段</h3>
              <div className="space-y-4">
                {selectedPlan.phases.map((phase, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">{phase.name}</CardTitle>
                        <Badge variant="outline">{phase.duration}</Badge>
                      </div>
                      <CardDescription>{phase.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {phase.steps.map((step, stepIndex) => (
                          <li key={stepIndex}>{step}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">推荐用药</h3>
                <div className="space-y-4">
                  {selectedPlan.medications.map((medication, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{medication.category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {medication.drugs.map((drug, drugIndex) => (
                            <Badge key={drugIndex} variant="outline" className="flex items-center gap-1">
                              <Pill className="h-3 w-3" />
                              {drug}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">监测指标</h3>
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>指标</TableHead>
                          <TableHead>频率</TableHead>
                          <TableHead>目标值</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedPlan.monitoringItems.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.frequency}</TableCell>
                            <TableCell>{item.target}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setSelectedPlan(null)}>
                关闭详情
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 个性化方案详情 */}
      {selectedPersonalizedPlan && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{selectedPersonalizedPlan.planName}</CardTitle>
                <CardDescription>
                  患者: {selectedPersonalizedPlan.patientName} · ID: {selectedPersonalizedPlan.patientId} ·{" "}
                  {selectedPersonalizedPlan.status}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  导出
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  分享
                </Button>
                <Button size="sm">
                  <Clipboard className="h-4 w-4 mr-1" />
                  记录进展
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">创建者</div>
                <div className="font-medium">{selectedPersonalizedPlan.createdBy}</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">创建日期</div>
                <div className="font-medium">{selectedPersonalizedPlan.createdAt}</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">下次评估</div>
                <div className="font-medium">{selectedPersonalizedPlan.nextReview}</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">进度</div>
                <div className="font-medium">{selectedPersonalizedPlan.progress}%</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">方案调整</h3>
              <div className="space-y-3">
                {selectedPersonalizedPlan.adjustments.map((adjustment, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex flex-col">
                        <div className="font-medium">{adjustment.category}</div>
                        <p className="text-sm mt-1">{adjustment.description}</p>
                        <div className="text-xs text-muted-foreground mt-2">原因: {adjustment.reason}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">治疗结果</h3>
              <div className="space-y-4">
                {selectedPersonalizedPlan.outcomes.map((outcome, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">评估日期: {outcome.date}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {outcome.metrics.map((metric, metricIndex) => (
                          <div key={metricIndex} className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{metric.name}</div>
                              <div className="text-xs text-muted-foreground">目标: {metric.target}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="font-medium">{metric.value}</div>
                              <Badge
                                variant="outline"
                                className={
                                  metric.status === "达标"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                                }
                              >
                                {metric.status === "达标" ? (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                ) : (
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                )}
                                {metric.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">基于标准方案</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getCategoryIcon(
                      treatmentPlans.find((t) => t.id === selectedPersonalizedPlan.basedOn)?.category || "",
                    )}
                    <div>
                      <div className="font-medium">
                        {treatmentPlans.find((t) => t.id === selectedPersonalizedPlan.basedOn)?.name}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {treatmentPlans.find((t) => t.id === selectedPersonalizedPlan.basedOn)?.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          查看标准方案
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setSelectedPersonalizedPlan(null)}>
                关闭详情
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
