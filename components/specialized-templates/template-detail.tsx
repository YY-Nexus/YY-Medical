"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Download,
  Heart,
  Share2,
  Copy,
  FileText,
  Users,
  Calendar,
  Star,
  ArrowLeft,
  Clipboard,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react"

interface TemplateDetailProps {
  template: any
  onBack: () => void
  onUseTemplate: (template: any) => void
}

export function TemplateDetail({ template, onBack, onUseTemplate }: TemplateDetailProps) {
  if (!template) return null

  // 模拟模板详细内容
  const templateDetail = {
    ...template,
    content: {
      objective: "评估新型治疗方法在目标疾病患者中的有效性和安全性，并确定最佳给药方案。",
      hypothesis: "与标准治疗相比，新型治疗方法可显著改善患者的主要结局指标，且不增加严重不良事件的发生率。",
      groups: [
        { name: "干预组A", size: "100", description: "接受新型治疗方法标准剂量的患者" },
        { name: "干预组B", size: "100", description: "接受新型治疗方法高剂量的患者" },
        { name: "对照组", size: "100", description: "接受标准治疗或安慰剂的患者" },
      ],
      variables: [
        { name: "主要结局指标", type: "连续变量", unit: "分数", method: "标准化评估量表" },
        { name: "次要结局指标", type: "连续变量", unit: "mmol/L", method: "实验室检测" },
        { name: "安全性指标", type: "分类变量", unit: "无", method: "不良事件记录" },
        { name: "生活质量", type: "连续变量", unit: "分数", method: "生活质量问卷" },
      ],
      methods: [
        { name: "受试者招募", description: "根据纳入和排除标准从多中心招募符合条件的患者" },
        { name: "随机化", description: "使用区组随机化方法将受试者分配到不同干预组" },
        { name: "盲法", description: "采用双盲设计，受试者和研究者均不知道分组情况" },
        { name: "干预实施", description: "按照方案规定的剂量和方式给予研究药物或对照药物" },
        { name: "随访", description: "在规定的时间点进行随访，收集结局指标数据" },
      ],
      statisticalAnalysis:
        "主要采用意向性分析(ITT)，使用混合效应模型分析重复测量数据。对于主要结局指标，设置显著性水平α=0.05，检验效能为90%。次要结局指标采用Bonferroni校正控制多重比较的I类错误。",
      ethicalConsiderations:
        "研究方案需获得各参与中心的伦理委员会批准。所有受试者均需签署知情同意书。建立独立的数据安全监察委员会监督研究安全性。严格保护受试者隐私和数据安全。",
      sampleSizeCalculation:
        "基于预期效应量d=0.4，显著性水平α=0.05，检验效能1-β=90%，考虑到15%的脱落率，每组需要100例受试者，共计300例。",
      strengths: [
        "采用严格的随机化和盲法设计，减少偏倚",
        "多中心研究设计，提高结果的外部有效性",
        "包含剂量探索组，有助于确定最佳给药方案",
        "综合评估有效性、安全性和生活质量",
        "详细的统计分析计划，确保结果的可靠性",
      ],
      limitations: [
        "研究周期较长，可能面临较高的脱落率",
        "排除标准可能限制结果的推广性",
        "某些次要结局指标的临床意义尚不明确",
        "成本较高，实施难度大",
      ],
      references: [
        "Smith J, et al. Similar clinical trial designs in the field. J Clin Res. 2022;45(3):234-245.",
        "Johnson A, et al. Statistical methods for this type of study. Stat Med. 2021;30(2):123-134.",
        "Chen X, et al. Previous findings on this treatment. N Engl J Med. 2020;382(10):914-923.",
      ],
    },
    reviews: [
      {
        reviewer: "李教授",
        institution: "北京医学研究院",
        rating: 5,
        comment: "设计严谨，统计方法合理，是高质量临床研究的典范。",
        date: "2023-08-15",
      },
      {
        reviewer: "张医生",
        institution: "上海医科大学",
        rating: 4,
        comment: "整体设计良好，但样本量计算可能需要更详细的说明。",
        date: "2023-07-20",
      },
      {
        reviewer: "王研究员",
        institution: "广州医学院",
        rating: 5,
        comment: "非常实用的模板，已成功应用于我们的研究中，节省了大量设计时间。",
        date: "2023-06-10",
      },
    ],
    usageStats: {
      totalDownloads: 245,
      monthlyDownloads: 32,
      favoriteCount: 78,
      successRate: 92,
      averageCompletionTime: "4.5小时",
      approvalRate: 85,
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">{template.name}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>模板概述</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </div>
                <Badge className="flex items-center gap-1">{template.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground mb-1">研究类型</div>
                  <div className="font-medium">{template.type}</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground mb-1">设计类型</div>
                  <div className="font-medium">{template.designType}</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground mb-1">作者</div>
                  <div className="font-medium">{template.author}</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-muted-foreground mb-1">机构</div>
                  <div className="font-medium">{template.institution}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium">标签</div>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="design" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="design">研究设计</TabsTrigger>
              <TabsTrigger value="methods">方法与变量</TabsTrigger>
              <TabsTrigger value="analysis">分析与考虑</TabsTrigger>
              <TabsTrigger value="reviews">评价与使用</TabsTrigger>
            </TabsList>

            <TabsContent value="design" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">研究目标与假设</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-medium mb-1">研究目标</div>
                    <p className="text-sm text-muted-foreground">{templateDetail.content.objective}</p>
                  </div>
                  <div>
                    <div className="font-medium mb-1">研究假设</div>
                    <p className="text-sm text-muted-foreground">{templateDetail.content.hypothesis}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">研究组设置</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {templateDetail.content.groups.map((group: any, index: number) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="flex justify-between">
                          <div className="font-medium">{group.name}</div>
                          <div className="text-sm">目标样本量: {group.size}</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">样本量计算</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{templateDetail.content.sampleSizeCalculation}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="methods" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">研究变量</CardTitle>
                </CardHeader>
                <CardContent>
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
                        {templateDetail.content.variables.map((variable: any, index: number) => (
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">研究方法</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {templateDetail.content.methods.map((method: any, index: number) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="font-medium mb-1">{method.name}</div>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">统计分析方法</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{templateDetail.content.statisticalAnalysis}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">伦理考虑</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{templateDetail.content.ethicalConsiderations}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">设计优势</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {templateDetail.content.strengths.map((strength: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">潜在局限</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {templateDetail.content.limitations.map((limitation: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">参考文献</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {templateDetail.content.references.map((reference: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{reference}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">使用统计</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground mb-1">总下载次数</div>
                      <div className="font-medium">{templateDetail.usageStats.totalDownloads}</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground mb-1">本月下载</div>
                      <div className="font-medium">{templateDetail.usageStats.monthlyDownloads}</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground mb-1">收藏数</div>
                      <div className="font-medium">{templateDetail.usageStats.favoriteCount}</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground mb-1">成功率</div>
                      <div className="font-medium">{templateDetail.usageStats.successRate}%</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground mb-1">平均完成时间</div>
                      <div className="font-medium">{templateDetail.usageStats.averageCompletionTime}</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground mb-1">伦理批准率</div>
                      <div className="font-medium">{templateDetail.usageStats.approvalRate}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">专家评价</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {templateDetail.reviews.map((review: any, index: number) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium">{review.reviewer}</div>
                            <div className="text-sm text-muted-foreground">{review.institution}</div>
                          </div>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">{review.comment}</p>
                        <div className="text-xs text-muted-foreground mt-2">{review.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">模板操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" onClick={() => onUseTemplate(template)}>
                使用此模板
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="flex items-center justify-center gap-1">
                  <Download className="h-4 w-4" />
                  下载
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-1">
                  <Heart className="h-4 w-4" />
                  收藏
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-1">
                  <Share2 className="h-4 w-4" />
                  分享
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-1">
                  <Copy className="h-4 w-4" />
                  复制
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">模板信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">模板ID</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">{template.id}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Clipboard className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">作者</span>
                </div>
                <span className="text-sm font-medium">{template.author}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">更新日期</span>
                </div>
                <span className="text-sm font-medium">{template.lastUpdated}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">评分</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">{template.popularity}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(template.popularity)
                            ? "fill-yellow-400 text-yellow-400"
                            : i < template.popularity
                              ? "fill-yellow-400 text-yellow-400 opacity-50"
                              : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">适用场景</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">多中心临床研究</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">药物或干预措施评估</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">需要严格随机化和盲法的研究</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm">需要评估多个结局指标的研究</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">使用提示</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-700 flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5" />
                <div>
                  <p>此模板提供了研究设计的基本框架，您需要根据具体研究问题进行适当调整。</p>
                  <p className="mt-2">使用前请咨询统计学家和伦理专家，确保设计符合科学和伦理要求。</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
