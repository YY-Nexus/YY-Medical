"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Users,
  Globe,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Plus,
  BarChart3,
  FileText,
  Shield,
} from "lucide-react"
import {
  multiCenterResearchService,
  type ResearchCenter,
  type MultiCenterStudy,
} from "@/services/multi-center-research-service"

export function MultiCenterCollaboration() {
  const [centers, setCenters] = useState<ResearchCenter[]>([])
  const [studies, setStudies] = useState<MultiCenterStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("centers")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [centersData, studiesData] = await Promise.all([
        multiCenterResearchService.getResearchCenters(),
        multiCenterResearchService.getMultiCenterStudies(),
      ])
      setCenters(centersData)
      setStudies(studiesData)
    } catch (error) {
      console.error("加载数据失败:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCenters = centers.filter((center) => {
    if (statusFilter !== "all" && center.status !== statusFilter) return false
    if (
      searchQuery &&
      !center.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !center.institution.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false
    return true
  })

  const filteredStudies = studies.filter((study) => {
    if (statusFilter !== "all" && study.status !== statusFilter) return false
    if (searchQuery && !study.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
      case "recruiting":
        return <Badge className="bg-green-500">活跃</Badge>
      case "inactive":
      case "suspended":
        return <Badge className="bg-red-500">暂停</Badge>
      case "pending":
      case "planning":
        return <Badge className="bg-yellow-500">筹备中</Badge>
      case "completed":
        return <Badge className="bg-blue-500">已完成</Badge>
      default:
        return <Badge className="bg-gray-500">未知</Badge>
    }
  }

  const getPhaseBadge = (phase: string) => {
    const colors = {
      I: "bg-purple-500",
      II: "bg-blue-500",
      III: "bg-green-500",
      IV: "bg-orange-500",
    }
    return <Badge className={colors[phase] || "bg-gray-500"}>Phase {phase}</Badge>
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">加载多中心协作数据...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Building2 className="mr-2 h-5 w-5" />
            多中心研究协作
          </CardTitle>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建协作
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="centers">研究中心</TabsTrigger>
            <TabsTrigger value="studies">多中心研究</TabsTrigger>
            <TabsTrigger value="standards">数据标准</TabsTrigger>
            <TabsTrigger value="analytics">协作分析</TabsTrigger>
          </TabsList>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between my-4 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="状态" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有状态</SelectItem>
                <SelectItem value="active">活跃</SelectItem>
                <SelectItem value="inactive">暂停</SelectItem>
                <SelectItem value="pending">筹备中</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="centers" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCenters.map((center) => (
                <Card key={center.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm mb-1">{center.name}</h3>
                        <p className="text-sm text-muted-foreground">{center.institution}</p>
                      </div>
                      {getStatusBadge(center.status)}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Globe className="mr-2 h-3 w-3 text-muted-foreground" />
                        <span>
                          {center.city}, {center.country}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-2 h-3 w-3 text-muted-foreground" />
                        <span>{center.totalPatients} 患者</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="mr-2 h-3 w-3 text-muted-foreground" />
                        <span>{center.activeStudies} 活跃研究</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-xs text-muted-foreground mb-1">研究能力</div>
                      <div className="flex flex-wrap gap-1">
                        {center.capabilities.slice(0, 3).map((capability, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                        {center.capabilities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{center.capabilities.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-xs text-muted-foreground mb-1">主要研究者</div>
                      <div className="text-sm">{center.principalInvestigator.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {center.principalInvestigator.credentials.join(", ")}
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        详情
                      </Button>
                      <Button size="sm">联系</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="studies" className="mt-0">
            <div className="space-y-4">
              {filteredStudies.map((study) => (
                <Card key={study.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{study.title}</h3>
                          {getPhaseBadge(study.phase)}
                          {getStatusBadge(study.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{study.description}</p>
                        <div className="text-sm">
                          <span className="font-medium">主要终点:</span> {study.primaryEndpoint}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-muted-foreground">入组进度</div>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={(study.currentEnrollment / study.targetEnrollment) * 100}
                            className="flex-1"
                          />
                          <span className="text-sm">
                            {study.currentEnrollment}/{study.targetEnrollment}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">参与中心</div>
                        <div className="text-sm font-medium">{study.participatingCenters.length} 个中心</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">预计完成</div>
                        <div className="text-sm">{study.estimatedCompletionDate}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">参与中心</div>
                      <div className="flex flex-wrap gap-1">
                        {study.participatingCenters.map((centerId) => {
                          const center = centers.find((c) => c.id === centerId)
                          return (
                            <Badge key={centerId} variant="outline" className="text-xs">
                              {center?.name || centerId}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">伦理审批状态</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {study.ethicsApproval.localApprovals.map((approval) => {
                          const center = centers.find((c) => c.id === approval.centerId)
                          return (
                            <div
                              key={approval.centerId}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded"
                            >
                              <span className="text-xs">{center?.name || approval.centerId}</span>
                              {approval.status === "approved" && <CheckCircle className="h-3 w-3 text-green-500" />}
                              {approval.status === "pending" && <Clock className="h-3 w-3 text-yellow-500" />}
                              {approval.status === "expired" && <AlertTriangle className="h-3 w-3 text-red-500" />}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        进度报告
                      </Button>
                      <Button variant="outline" size="sm">
                        <Shield className="mr-2 h-4 w-4" />
                        数据质量
                      </Button>
                      <Button size="sm">管理研究</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="standards" className="mt-0">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">数据标准化管理</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">CDISC SDTM 标准</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>版本:</span>
                          <span>3.3</span>
                        </div>
                        <div className="flex justify-between">
                          <span>数据域:</span>
                          <span>23个</span>
                        </div>
                        <div className="flex justify-between">
                          <span>变量:</span>
                          <span>156个</span>
                        </div>
                        <div className="flex justify-between">
                          <span>合规性:</span>
                          <Badge className="bg-green-500">100%</Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">数据质量指标</h3>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>完整性</span>
                            <span>95%</span>
                          </div>
                          <Progress value={95} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>一致性</span>
                            <span>92%</span>
                          </div>
                          <Progress value={92} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>准确性</span>
                            <span>98%</span>
                          </div>
                          <Progress value={98} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium mb-3">数据映射规则</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">源字段</th>
                            <th className="text-left p-2">目标字段</th>
                            <th className="text-left p-2">转换规则</th>
                            <th className="text-left p-2">状态</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">patient_id</td>
                            <td className="p-2">USUBJID</td>
                            <td className="p-2">格式转换为CDISC标准</td>
                            <td className="p-2">
                              <Badge className="bg-green-500">已配置</Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">visit_date</td>
                            <td className="p-2">RFSTDTC</td>
                            <td className="p-2">日期格式标准化</td>
                            <td className="p-2">
                              <Badge className="bg-green-500">已配置</Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">vital_signs</td>
                            <td className="p-2">VS</td>
                            <td className="p-2">生命体征域映射</td>
                            <td className="p-2">
                              <Badge className="bg-yellow-500">待配置</Badge>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <Button variant="outline">导出标准</Button>
                    <Button>配置映射</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">协作网络概览</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{centers.length}</div>
                      <div className="text-sm text-muted-foreground">合作中心</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{studies.length}</div>
                      <div className="text-sm text-muted-foreground">多中心研究</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {studies.reduce((sum, study) => sum + study.currentEnrollment, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">总入组患者</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {centers.reduce((sum, center) => sum + center.activeStudies, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">活跃研究</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">研究进展</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studies.slice(0, 3).map((study) => (
                      <div key={study.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="truncate">{study.title}</span>
                          <span>{Math.round((study.currentEnrollment / study.targetEnrollment) * 100)}%</span>
                        </div>
                        <Progress value={(study.currentEnrollment / study.targetEnrollment) * 100} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">地理分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                    研究中心地理分布图表
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
