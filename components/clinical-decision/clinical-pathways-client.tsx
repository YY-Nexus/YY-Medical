"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, MoreHorizontal, FileText, Clock, AlertTriangle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// 模拟临床路径数据
const clinicalPathways = [
  {
    id: "CP001",
    name: "2型糖尿病标准诊疗路径",
    department: "内分泌科",
    version: "3.2",
    status: "已发布",
    lastUpdated: "2023-04-15",
    author: "李医生",
    usageCount: 128,
    complianceRate: 92,
  },
  {
    id: "CP002",
    name: "社区获得性肺炎诊疗路径",
    department: "呼吸科",
    version: "2.5",
    status: "已发布",
    lastUpdated: "2023-03-22",
    author: "张医生",
    usageCount: 87,
    complianceRate: 88,
  },
  {
    id: "CP003",
    name: "急性心肌梗死诊疗路径",
    department: "心内科",
    version: "4.0",
    status: "已发布",
    lastUpdated: "2023-05-10",
    author: "王医生",
    usageCount: 56,
    complianceRate: 95,
  },
  {
    id: "CP004",
    name: "脑卒中诊疗路径",
    department: "神经内科",
    version: "3.1",
    status: "已发布",
    lastUpdated: "2023-02-28",
    author: "赵医生",
    usageCount: 72,
    complianceRate: 90,
  },
  {
    id: "CP005",
    name: "慢性阻塞性肺疾病诊疗路径",
    department: "呼吸科",
    version: "2.8",
    status: "审核中",
    lastUpdated: "2023-05-18",
    author: "刘医生",
    usageCount: 0,
    complianceRate: 0,
  },
  {
    id: "CP006",
    name: "高血压诊疗路径",
    department: "心内科",
    version: "3.5",
    status: "草稿",
    lastUpdated: "2023-05-20",
    author: "陈医生",
    usageCount: 0,
    complianceRate: 0,
  },
]

// 模拟路径节点数据
const pathwayNodes = [
  {
    id: "node-1",
    type: "诊断",
    title: "初步评估",
    description: "进行病史采集、体格检查和初步实验室检查",
    requiredTests: ["血糖", "糖化血红蛋白", "血脂", "肾功能"],
    expectedOutcomes: ["确认糖尿病诊断", "评估并发症风险"],
    timeframe: "1天",
    order: 1,
  },
  {
    id: "node-2",
    type: "检查",
    title: "综合评估",
    description: "进行全面的并发症筛查和风险评估",
    requiredTests: ["眼底检查", "尿微量白蛋白", "神经病变筛查", "心血管评估"],
    expectedOutcomes: ["明确并发症情况", "制定个体化治疗方案"],
    timeframe: "2-3天",
    order: 2,
  },
  {
    id: "node-3",
    type: "治疗",
    title: "初始治疗",
    description: "根据评估结果制定并实施初始治疗方案",
    medications: ["二甲双胍", "生活方式干预"],
    expectedOutcomes: ["血糖控制改善", "患者教育完成"],
    timeframe: "1-2周",
    order: 3,
  },
  {
    id: "node-4",
    type: "随访",
    title: "定期随访",
    description: "定期评估治疗效果，调整治疗方案",
    followupSchedule: "每3个月一次",
    monitoringItems: ["空腹血糖", "糖化血红蛋白", "体重", "血压", "用药依从性"],
    expectedOutcomes: ["血糖达标", "无低血糖发生", "生活质量改善"],
    timeframe: "持续",
    order: 4,
  },
  {
    id: "node-5",
    type: "教育",
    title: "患者教育",
    description: "提供糖尿病自我管理教育",
    educationTopics: ["饮食控制", "运动指导", "血糖监测", "用药指导", "并发症预防"],
    expectedOutcomes: ["自我管理能力提升", "生活方式改善"],
    timeframe: "贯穿全程",
    order: 5,
  },
]

// 模拟路径变异数据
const pathwayVariations = [
  {
    id: "var-1",
    pathwayId: "CP001",
    nodeId: "node-3",
    variationType: "治疗调整",
    description: "对于肾功能不全患者，避免使用二甲双胍，改用DPP-4抑制剂",
    condition: "eGFR < 30 ml/min/1.73m²",
    recommendedAction: "更换为沙格列汀，初始剂量2.5mg，每日一次",
    evidenceLevel: "B",
    author: "李医生",
    createdAt: "2023-04-10",
  },
  {
    id: "var-2",
    pathwayId: "CP001",
    nodeId: "node-4",
    variationType: "随访频率调整",
    description: "对于血糖控制不佳的患者，增加随访频率",
    condition: "糖化血红蛋白 > 9%",
    recommendedAction: "将随访频率调整为每月一次，直至血糖控制改善",
    evidenceLevel: "C",
    author: "张医生",
    createdAt: "2023-04-12",
  },
  {
    id: "var-3",
    pathwayId: "CP001",
    nodeId: "node-2",
    variationType: "检查项目调整",
    description: "对于年龄>65岁的患者，增加认知功能评估",
    condition: "年龄 > 65岁",
    recommendedAction: "增加简易精神状态检查(MMSE)评估",
    evidenceLevel: "B",
    author: "王医生",
    createdAt: "2023-04-14",
  },
]

export function ClinicalPathwaysClient() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showPathwayDialog, setShowPathwayDialog] = useState(false)
  const [showNodeDialog, setShowNodeDialog] = useState(false)
  const [selectedPathway, setSelectedPathway] = useState<(typeof clinicalPathways)[0] | null>(null)

  // 过滤路径数据
  const filteredPathways = clinicalPathways.filter(
    (pathway) =>
      pathway.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pathway.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pathway.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 根据状态获取路径颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "已发布":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "审核中":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "草稿":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    }
  }

  // 查看路径详��
  const viewPathwayDetails = (pathway: (typeof clinicalPathways)[0]) => {
    setSelectedPathway(pathway)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>临床路径管理</CardTitle>
              <CardDescription>管理和定制临床路径，规范诊疗流程</CardDescription>
            </div>
            <Button onClick={() => setShowPathwayDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              新建路径
            </Button>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索路径名称、科室或ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              筛选
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">全部路径</TabsTrigger>
              <TabsTrigger value="published">已发布</TabsTrigger>
              <TabsTrigger value="review">审核中</TabsTrigger>
              <TabsTrigger value="draft">草稿</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>路径名称</TableHead>
                      <TableHead>科室</TableHead>
                      <TableHead>版本</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>最后更新</TableHead>
                      <TableHead>使用次数</TableHead>
                      <TableHead>依从率</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredPathways.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                          未找到匹配的临床路径
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPathways.map((pathway) => (
                        <TableRow key={pathway.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{pathway.name}</TableCell>
                          <TableCell>{pathway.department}</TableCell>
                          <TableCell>v{pathway.version}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(pathway.status)} variant="outline">
                              {pathway.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{pathway.lastUpdated}</TableCell>
                          <TableCell>{pathway.usageCount}</TableCell>
                          <TableCell>{pathway.status === "已发布" ? `${pathway.complianceRate}%` : "-"}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => viewPathwayDetails(pathway)}>
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">查看详情</span>
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">更多操作</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>编辑路径</DropdownMenuItem>
                                  <DropdownMenuItem>复制路径</DropdownMenuItem>
                                  <DropdownMenuItem>导出路径</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">删除路径</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="published" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>路径名称</TableHead>
                      <TableHead>科室</TableHead>
                      <TableHead>版本</TableHead>
                      <TableHead>最后更新</TableHead>
                      <TableHead>使用次数</TableHead>
                      <TableHead>依从率</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredPathways
                      .filter((p) => p.status === "已发布")
                      .map((pathway) => (
                        <TableRow key={pathway.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{pathway.name}</TableCell>
                          <TableCell>{pathway.department}</TableCell>
                          <TableCell>v{pathway.version}</TableCell>
                          <TableCell>{pathway.lastUpdated}</TableCell>
                          <TableCell>{pathway.usageCount}</TableCell>
                          <TableCell>{pathway.complianceRate}%</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => viewPathwayDetails(pathway)}>
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">查看详情</span>
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">更多操作</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>编辑路径</DropdownMenuItem>
                                  <DropdownMenuItem>复制路径</DropdownMenuItem>
                                  <DropdownMenuItem>导出路径</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">删除路径</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="review" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>路径名称</TableHead>
                      <TableHead>科室</TableHead>
                      <TableHead>版本</TableHead>
                      <TableHead>提交人</TableHead>
                      <TableHead>提交日期</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredPathways
                      .filter((p) => p.status === "审核中")
                      .map((pathway) => (
                        <TableRow key={pathway.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{pathway.name}</TableCell>
                          <TableCell>{pathway.department}</TableCell>
                          <TableCell>v{pathway.version}</TableCell>
                          <TableCell>{pathway.author}</TableCell>
                          <TableCell>{pathway.lastUpdated}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => viewPathwayDetails(pathway)}>
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">查看详情</span>
                              </Button>
                              <Button variant="outline" size="sm">
                                审核
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="draft" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>路径名称</TableHead>
                      <TableHead>科室</TableHead>
                      <TableHead>版本</TableHead>
                      <TableHead>创建人</TableHead>
                      <TableHead>最后更新</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredPathways
                      .filter((p) => p.status === "草稿")
                      .map((pathway) => (
                        <TableRow key={pathway.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{pathway.name}</TableCell>
                          <TableCell>{pathway.department}</TableCell>
                          <TableCell>v{pathway.version}</TableCell>
                          <TableCell>{pathway.author}</TableCell>
                          <TableCell>{pathway.lastUpdated}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => viewPathwayDetails(pathway)}>
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">查看详情</span>
                              </Button>
                              <Button variant="outline" size="sm">
                                编辑
                              </Button>
                              <Button variant="outline" size="sm">
                                提交审核
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 路径详情对话框 */}
      {selectedPathway && (
        <Dialog open={!!selectedPathway} onOpenChange={() => setSelectedPathway(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedPathway.name}</DialogTitle>
              <DialogDescription>
                {selectedPathway.department} · v{selectedPathway.version} · {selectedPathway.status}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground mb-1">创建者</div>
                  <div className="font-medium">{selectedPathway.author}</div>
                </div>
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground mb-1">最后更新</div>
                  <div className="font-medium">{selectedPathway.lastUpdated}</div>
                </div>
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground mb-1">使用情况</div>
                  <div className="font-medium">
                    {selectedPathway.usageCount} 次使用 · {selectedPathway.complianceRate}% 依从率
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">路径节点</h3>
                  <Button variant="outline" size="sm" onClick={() => setShowNodeDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    添加节点
                  </Button>
                </div>

                <div className="space-y-4">
                  {pathwayNodes.map((node) => (
                    <Card key={node.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={
                                node.type === "诊断"
                                  ? "bg-blue-100 text-blue-800"
                                  : node.type === "检查"
                                    ? "bg-purple-100 text-purple-800"
                                    : node.type === "治疗"
                                      ? "bg-green-100 text-green-800"
                                      : node.type === "随访"
                                        ? "bg-orange-100 text-orange-800"
                                        : "bg-gray-100 text-gray-800"
                              }
                            >
                              {node.type}
                            </Badge>
                            <CardTitle className="text-lg">{node.title}</CardTitle>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {node.timeframe}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>编辑节点</DropdownMenuItem>
                                <DropdownMenuItem>添加变异</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">删除节点</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-3">{node.description}</p>

                        {node.requiredTests && (
                          <div className="mb-3">
                            <h4 className="text-xs font-medium text-gray-500 mb-1">必要检查：</h4>
                            <div className="flex flex-wrap gap-1">
                              {node.requiredTests.map((test, index) => (
                                <Badge key={index} variant="outline">
                                  {test}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {node.medications && (
                          <div className="mb-3">
                            <h4 className="text-xs font-medium text-gray-500 mb-1">推荐用药：</h4>
                            <div className="flex flex-wrap gap-1">
                              {node.medications.map((med, index) => (
                                <Badge key={index} variant="outline">
                                  {med}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {node.followupSchedule && (
                          <div className="mb-3">
                            <h4 className="text-xs font-medium text-gray-500 mb-1">随访计划：</h4>
                            <p className="text-sm">{node.followupSchedule}</p>
                          </div>
                        )}

                        {node.monitoringItems && (
                          <div className="mb-3">
                            <h4 className="text-xs font-medium text-gray-500 mb-1">监测项目：</h4>
                            <div className="flex flex-wrap gap-1">
                              {node.monitoringItems.map((item, index) => (
                                <Badge key={index} variant="outline">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {node.educationTopics && (
                          <div className="mb-3">
                            <h4 className="text-xs font-medium text-gray-500 mb-1">教育主题：</h4>
                            <div className="flex flex-wrap gap-1">
                              {node.educationTopics.map((topic, index) => (
                                <Badge key={index} variant="outline">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-3">
                          <h4 className="text-xs font-medium text-gray-500 mb-1">预期结果：</h4>
                          <ul className="list-disc list-inside text-sm">
                            {node.expectedOutcomes.map((outcome, index) => (
                              <li key={index}>{outcome}</li>
                            ))}
                          </ul>
                        </div>

                        {/* 显示该节点的变异 */}
                        {pathwayVariations.filter((v) => v.nodeId === node.id).length > 0 && (
                          <div className="mt-4 pt-3 border-t">
                            <h4 className="text-xs font-medium text-gray-500 mb-2">路径变异：</h4>
                            <div className="space-y-2">
                              {pathwayVariations
                                .filter((v) => v.nodeId === node.id)
                                .map((variation) => (
                                  <div key={variation.id} className="bg-amber-50 p-2 rounded-md text-sm">
                                    <div className="flex items-center gap-1 mb-1">
                                      <AlertTriangle className="h-3 w-3 text-amber-600" />
                                      <span className="font-medium">{variation.variationType}</span>
                                      <Badge className="ml-auto" variant="outline">
                                        证据级别: {variation.evidenceLevel}
                                      </Badge>
                                    </div>
                                    <p className="mb-1">{variation.description}</p>
                                    <div className="text-xs text-gray-600">
                                      <span className="font-medium">适用条件：</span>
                                      {variation.condition}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                      <span className="font-medium">推荐操作：</span>
                                      {variation.recommendedAction}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">使用统计</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">总使用次数</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedPathway.usageCount}</div>
                      <p className="text-xs text-muted-foreground">
                        较上月 <span className="text-green-500">↑ 12%</span>
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">平均依从率</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedPathway.complianceRate}%</div>
                      <p className="text-xs text-muted-foreground">
                        较上月 <span className="text-green-500">↑ 3%</span>
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">变异率</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8%</div>
                      <p className="text-xs text-muted-foreground">
                        较上月 <span className="text-red-500">↓ 2%</span>
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedPathway(null)}>
                关闭
              </Button>
              <Button>编辑路径</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* 新建路径对话框 */}
      <Dialog open={showPathwayDialog} onOpenChange={setShowPathwayDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新建临床路径</DialogTitle>
            <DialogDescription>创建新的临床路径，规范诊疗流程</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="pathway-name">路径名称</Label>
              <Input id="pathway-name" placeholder="输入临床路径名称" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">所属科室</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择科室" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal-medicine">内科</SelectItem>
                  <SelectItem value="surgery">外科</SelectItem>
                  <SelectItem value="pediatrics">儿科</SelectItem>
                  <SelectItem value="obstetrics-gynecology">妇产科</SelectItem>
                  <SelectItem value="neurology">神经内科</SelectItem>
                  <SelectItem value="cardiology">心内科</SelectItem>
                  <SelectItem value="respiratory">呼吸科</SelectItem>
                  <SelectItem value="gastroenterology">消化内科</SelectItem>
                  <SelectItem value="endocrinology">内分泌科</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">路径描述</Label>
              <Input id="description" placeholder="简要描述该临床路径的目的和适用范围" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="version">版本号</Label>
              <Input id="version" placeholder="1.0" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="template" />
              <Label htmlFor="template">基于现有模板创建</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPathwayDialog(false)}>
              取消
            </Button>
            <Button onClick={() => setShowPathwayDialog(false)}>创建</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 添加节点对话框 */}
      <Dialog open={showNodeDialog} onOpenChange={setShowNodeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加路径节点</DialogTitle>
            <DialogDescription>添加新的临床路径节点</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="node-title">节点标题</Label>
              <Input id="node-title" placeholder="输入节点标题" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="node-type">节点类型</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择节点类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diagnosis">诊断</SelectItem>
                  <SelectItem value="examination">检查</SelectItem>
                  <SelectItem value="treatment">治疗</SelectItem>
                  <SelectItem value="followup">随访</SelectItem>
                  <SelectItem value="education">患者教育</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="node-description">节点描述</Label>
              <Input id="node-description" placeholder="描述该节点的主要内容和目的" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeframe">时��框架</Label>
              <Input id="timeframe" placeholder="例如：1-2天、1周、持续等" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expected-outcomes">预期结果</Label>
              <Input id="expected-outcomes" placeholder="输入预期结果，多个结果用逗号分隔" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNodeDialog(false)}>
              取消
            </Button>
            <Button onClick={() => setShowNodeDialog(false)}>添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
