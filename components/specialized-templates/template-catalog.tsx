"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Heart,
  Download,
  Star,
  Filter,
  ChevronRight,
  Brain,
  HeartIcon,
  Microscope,
  Pill,
  Stethoscope,
  WormIcon as Virus,
  Baby,
  Eye,
  Bone,
} from "lucide-react"

// 专业领域模板数据
const specializedTemplates = [
  // 心血管研究模板
  {
    id: "CV-001",
    name: "冠心病临床试验设计",
    description: "用于评估冠心病治疗方法有效性的随机对照试验设计",
    category: "心血管",
    type: "临床研究",
    designType: "随机对照试验",
    popularity: 4.8,
    downloads: 245,
    author: "王心医教授",
    institution: "国家心血管病中心",
    lastUpdated: "2023-09-15",
    tags: ["冠心病", "随机对照", "药物干预", "心血管事件"],
    previewImage: "/placeholder-gfsno.png",
  },
  {
    id: "CV-002",
    name: "高血压队列研究设计",
    description: "长期随访高血压患者的前瞻性队列研究设计",
    category: "心血管",
    type: "流行病学研究",
    designType: "队列研究",
    popularity: 4.6,
    downloads: 189,
    author: "李血压教授",
    institution: "高血压研究所",
    lastUpdated: "2023-08-20",
    tags: ["高血压", "队列研究", "心血管风险", "长期随访"],
    previewImage: "/placeholder-tj1aw.png",
  },
  {
    id: "CV-003",
    name: "心力衰竭生物标志物研究",
    description: "心力衰竭患者生物标志物筛查与验证的研究设计",
    category: "心血管",
    type: "转化医学研究",
    designType: "病例对照研究",
    popularity: 4.5,
    downloads: 156,
    author: "张心衰教授",
    institution: "心脏病学研究中心",
    lastUpdated: "2023-07-10",
    tags: ["心力衰竭", "生物标志物", "预后评估", "精准医疗"],
    previewImage: "/placeholder-hcq8h.png",
  },

  // 神经系统研究模板
  {
    id: "NS-001",
    name: "阿尔茨海默病临床试验设计",
    description: "评估阿尔茨海默病治疗干预的随机对照试验设计",
    category: "神经系统",
    type: "临床研究",
    designType: "随机对照试验",
    popularity: 4.9,
    downloads: 278,
    author: "刘神经教授",
    institution: "脑科学研究院",
    lastUpdated: "2023-09-05",
    tags: ["阿尔茨海默病", "认知功能", "神经退行性疾病", "药物干预"],
    previewImage: "/placeholder-76ec7.png",
  },
  {
    id: "NS-002",
    name: "卒中康复评估研究设计",
    description: "评估卒中后康复干预效果的研究设计",
    category: "神经系统",
    type: "临床研究",
    designType: "前后对照研究",
    popularity: 4.4,
    downloads: 145,
    author: "陈康复教授",
    institution: "卒中康复中心",
    lastUpdated: "2023-06-18",
    tags: ["卒中", "康复医学", "功能评估", "生活质量"],
    previewImage: "/placeholder-q3p89.png",
  },
  {
    id: "NS-003",
    name: "帕金森病生物标志物研究",
    description: "帕金森病早期诊断生物标志物的筛查与验证研究设计",
    category: "神经系统",
    type: "转化医学研究",
    designType: "病例对照研究",
    popularity: 4.7,
    downloads: 167,
    author: "吴帕金森教授",
    institution: "神经变性疾病研究所",
    lastUpdated: "2023-08-12",
    tags: ["帕金森病", "生物标志物", "早期诊断", "神经影像学"],
    previewImage: "/placeholder-yw0zk.png",
  },

  // 肿瘤研究模板
  {
    id: "ONC-001",
    name: "肺癌免疫治疗临床试验设计",
    description: "评估免疫检查点抑制剂治疗非小细胞肺癌的临床试验设计",
    category: "肿瘤学",
    type: "临床研究",
    designType: "随机对照试验",
    popularity: 4.9,
    downloads: 312,
    author: "赵肿瘤教授",
    institution: "国家肿瘤中心",
    lastUpdated: "2023-09-20",
    tags: ["肺癌", "免疫治疗", "PD-1抑制剂", "生存分析"],
    previewImage: "/placeholder-t5mg2.png",
  },
  {
    id: "ONC-002",
    name: "乳腺癌基因检测研究设计",
    description: "乳腺癌患者基因突变检测与个体化治疗的研究设计",
    category: "肿瘤学",
    type: "精准医学研究",
    designType: "观察性研究",
    popularity: 4.8,
    downloads: 256,
    author: "孙乳腺教授",
    institution: "乳腺癌研究中心",
    lastUpdated: "2023-07-25",
    tags: ["乳腺癌", "基因检测", "个体化治疗", "预后分析"],
    previewImage: "/placeholder.svg?height=120&width=240&query=乳腺癌基因研究图表",
  },
  {
    id: "ONC-003",
    name: "结直肠癌筛查研究设计",
    description: "评估结直肠癌早期筛查策略有效性的研究设计",
    category: "肿瘤学",
    type: "预防医学研究",
    designType: "队列研究",
    popularity: 4.6,
    downloads: 198,
    author: "钱消化教授",
    institution: "消化道肿瘤研究所",
    lastUpdated: "2023-08-05",
    tags: ["结直肠癌", "筛查", "早期诊断", "成本效益分析"],
    previewImage: "/placeholder.svg?height=120&width=240&query=结直肠癌筛查研究图表",
  },

  // 代谢疾病研究模板
  {
    id: "MET-001",
    name: "2型糖尿病药物干预研究设计",
    description: "评估新型降糖药物在2型糖尿病患者中的有效性和安全性研究设计",
    category: "代谢疾病",
    type: "临床研究",
    designType: "随机对照试验",
    popularity: 4.7,
    downloads: 234,
    author: "周糖尿病教授",
    institution: "代谢病研究中心",
    lastUpdated: "2023-09-10",
    tags: ["2型糖尿病", "降糖药物", "血糖控制", "心血管结局"],
    previewImage: "/placeholder.svg?height=120&width=240&query=糖尿病研究图表",
  },
  {
    id: "MET-002",
    name: "肥胖症干预研究设计",
    description: "评估生活方式干预对肥胖症患者体重控制和代谢指标的影响",
    category: "代谢疾病",
    type: "临床研究",
    designType: "前后对照研究",
    popularity: 4.5,
    downloads: 176,
    author: "郑肥胖教授",
    institution: "营养与代谢研究所",
    lastUpdated: "2023-06-30",
    tags: ["肥胖症", "生活方式干预", "体重管理", "代谢综合征"],
    previewImage: "/placeholder.svg?height=120&width=240&query=肥胖症研究图表",
  },

  // 感染性疾病研究模板
  {
    id: "INF-001",
    name: "抗生素耐药性监测研究设计",
    description: "医院内抗生素耐药菌株监测与分析的研究设计",
    category: "感染性疾病",
    type: "流行病学研究",
    designType: "横断面研究",
    popularity: 4.6,
    downloads: 187,
    author: "吴感染教授",
    institution: "感染病研究所",
    lastUpdated: "2023-08-15",
    tags: ["抗生素耐药", "医院感染", "细菌监测", "耐药机制"],
    previewImage: "/placeholder.svg?height=120&width=240&query=抗生素耐药研究图表",
  },
  {
    id: "INF-002",
    name: "疫苗有效性评估研究设计",
    description: "评估新型疫苗在目标人群中保护效力的研究设计",
    category: "感染性疾病",
    type: "预防医学研究",
    designType: "随机对照试验",
    popularity: 4.8,
    downloads: 265,
    author: "林疫苗教授",
    institution: "疫苗评价中心",
    lastUpdated: "2023-09-18",
    tags: ["疫苗", "免疫原性", "保护效力", "安全性评估"],
    previewImage: "/placeholder.svg?height=120&width=240&query=疫苗研究图表",
  },
]

// 获取分类图标
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "心血管":
      return <HeartIcon className="h-5 w-5 text-red-500" />
    case "神经系统":
      return <Brain className="h-5 w-5 text-purple-500" />
    case "肿瘤学":
      return <Microscope className="h-5 w-5 text-blue-500" />
    case "代谢疾病":
      return <Pill className="h-5 w-5 text-green-500" />
    case "感染性疾病":
      return <Virus className="h-5 w-5 text-orange-500" />
    case "儿科":
      return <Baby className="h-5 w-5 text-pink-500" />
    case "眼科":
      return <Eye className="h-5 w-5 text-cyan-500" />
    case "骨科":
      return <Bone className="h-5 w-5 text-amber-500" />
    default:
      return <Stethoscope className="h-5 w-5 text-gray-500" />
  }
}

interface TemplateCardProps {
  template: (typeof specializedTemplates)[0]
  onSelect: (template: (typeof specializedTemplates)[0]) => void
}

const TemplateCard = ({ template, onSelect }: TemplateCardProps) => {
  return (
    <Card
      className="overflow-hidden hover:border-primary/50 transition-all cursor-pointer"
      onClick={() => onSelect(template)}
    >
      <div className="relative">
        <img
          src={template.previewImage || "/placeholder.svg"}
          alt={template.name}
          className="w-full h-32 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">{template.category}</Badge>
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base line-clamp-1">{template.name}</CardTitle>
            <CardDescription className="line-clamp-1 text-xs">
              {template.type} · {template.designType}
            </CardDescription>
          </div>
          <div className="flex items-center">{getCategoryIcon(template.category)}</div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {template.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {template.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{template.tags.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          {template.popularity}
        </div>
        <div>{template.downloads} 次下载</div>
        <div>更新于 {template.lastUpdated}</div>
      </CardFooter>
    </Card>
  )
}

interface TemplateCatalogProps {
  onSelectTemplate: (template: any) => void
}

export function TemplateCatalog({ onSelectTemplate }: TemplateCatalogProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // 过滤模板
  const filteredTemplates = specializedTemplates.filter((template) => {
    // 搜索过滤
    if (
      searchTerm &&
      !template.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !template.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return false
    }

    // 分类过滤
    if (activeCategory !== "all" && template.category !== activeCategory) {
      return false
    }

    return true
  })

  // 获取所有分类
  const categories = ["all", ...Array.from(new Set(specializedTemplates.map((t) => t.category)))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">专业领域模板库</h2>
          <p className="text-muted-foreground">浏览各专业领域的研究设计模板，快速开始您的研究</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索模板..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <ScrollArea className="w-full">
          <TabsList className="w-full justify-start h-10 p-1">
            <TabsTrigger value="all" className="rounded-full px-3">
              全部
            </TabsTrigger>
            {categories
              .filter((c) => c !== "all")
              .map((category) => (
                <TabsTrigger key={category} value={category} className="rounded-full px-3 flex items-center gap-1">
                  {getCategoryIcon(category)}
                  {category}
                </TabsTrigger>
              ))}
          </TabsList>
        </ScrollArea>

        <TabsContent value={activeCategory} className="mt-6">
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} onSelect={onSelectTemplate} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">未找到匹配的模板</h3>
              <p className="text-muted-foreground max-w-md">尝试使用不同的搜索词或选择其他分类</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center pt-4 border-t">
        <Button variant="outline" className="flex items-center gap-1">
          <Heart className="h-4 w-4" />
          收藏夹
        </Button>
        <Button variant="outline" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          我的下载
        </Button>
        <Button className="flex items-center gap-1">
          浏览更多模板
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
