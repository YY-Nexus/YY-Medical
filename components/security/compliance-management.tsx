"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, FileText, Activity, Shield, Lock, FileCheck } from "lucide-react"

export function ComplianceManagement() {
  const [activeTab, setActiveTab] = useState("overview")

  // 模拟合规要求数据
  const complianceRequirements = [
    {
      id: "req-001",
      category: "数据隐私",
      title: "患者数据保护",
      description: "确保所有患者数据按照法规要求进行保护和处理",
      status: "compliant",
      progress: 100,
      lastChecked: "2025-05-05",
      nextReview: "2025-08-05",
    },
    {
      id: "req-002",
      category: "系统安全",
      title: "访问控制",
      description: "实施基于角色的访问控制，确保仅授权人员可访问敏感数据",
      status: "compliant",
      progress: 100,
      lastChecked: "2025-05-03",
      nextReview: "2025-08-03",
    },
    {
      id: "req-003",
      category: "审计跟踪",
      title: "系统活动日志",
      description: "维护完整的系统活动日志，记录所有数据访问和修改",
      status: "compliant",
      progress: 100,
      lastChecked: "2025-05-02",
      nextReview: "2025-08-02",
    },
    {
      id: "req-004",
      category: "数据加密",
      title: "数据传输加密",
      description: "所有数据传输必须使用TLS 1.2或更高版本进行加密",
      status: "compliant",
      progress: 100,
      lastChecked: "2025-05-01",
      nextReview: "2025-08-01",
    },
    {
      id: "req-005",
      category: "应急响应",
      title: "数据泄露应对计划",
      description: "制定并维护数据泄露应对计划，确保及时响应安全事件",
      status: "inProgress",
      progress: 80,
      lastChecked: "2025-04-28",
      nextReview: "2025-05-15",
    },
    {
      id: "req-006",
      category: "系统备份",
      title: "定期数据备份",
      description: "实施定期数据备份策略，确保数据可恢复性",
      status: "compliant",
      progress: 100,
      lastChecked: "2025-04-30",
      nextReview: "2025-07-30",
    },
    {
      id: "req-007",
      category: "用户认证",
      title: "多因素认证",
      description: "对访问敏感数据的用户实施多因素认证",
      status: "inProgress",
      progress: 60,
      lastChecked: "2025-04-25",
      nextReview: "2025-05-20",
    },
    {
      id: "req-008",
      category: "合规培训",
      title: "员工安全培训",
      description: "对所有员工进行定期的数据安全和隐私保护培训",
      status: "needsAttention",
      progress: 40,
      lastChecked: "2025-04-20",
      nextReview: "2025-05-10",
    },
  ]

  // 模拟合规标准数据
  const complianceStandards = [
    {
      id: "std-001",
      name: "HIPAA",
      description: "健康保险流通与责任法案",
      status: "compliant",
      lastAssessment: "2025-03-15",
      nextAssessment: "2025-09-15",
    },
    {
      id: "std-002",
      name: "GDPR",
      description: "通用数据保护条例",
      status: "compliant",
      lastAssessment: "2025-02-20",
      nextAssessment: "2025-08-20",
    },
    {
      id: "std-003",
      name: "ISO 27001",
      description: "信息安全管理体系",
      status: "inProgress",
      lastAssessment: "2025-01-10",
      nextAssessment: "2025-07-10",
    },
    {
      id: "std-004",
      name: "国家网络安全法",
      description: "中国网络安全法规",
      status: "compliant",
      lastAssessment: "2025-04-05",
      nextAssessment: "2025-10-05",
    },
    {
      id: "std-005",
      name: "医疗器械监管要求",
      description: "医疗器械软件监管要求",
      status: "needsAttention",
      lastAssessment: "2025-03-01",
      nextAssessment: "2025-06-01",
    },
  ]

  // 获取状态徽章
  const getStatusBadge = (status) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-green-500">合规</Badge>
      case "inProgress":
        return <Badge className="bg-blue-500">进行中</Badge>
      case "needsAttention":
        return <Badge className="bg-amber-500">需关注</Badge>
      case "nonCompliant":
        return <Badge className="bg-red-500">不合规</Badge>
      default:
        return <Badge className="bg-gray-500">未评估</Badge>
    }
  }

  // 获取状态图标
  const getStatusIcon = (status) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "inProgress":
        return <Activity className="h-5 w-5 text-blue-500" />
      case "needsAttention":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "nonCompliant":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  // 获取分类图标
  const getCategoryIcon = (category) => {
    switch (category) {
      case "数据隐私":
        return <Shield className="h-5 w-5 text-purple-500" />
      case "系统安全":
        return <Lock className="h-5 w-5 text-blue-500" />
      case "审计跟踪":
        return <FileText className="h-5 w-5 text-gray-500" />
      case "数据加密":
        return <Lock className="h-5 w-5 text-green-500" />
      case "应急响应":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "系统备份":
        return <FileCheck className="h-5 w-5 text-amber-500" />
      case "用户认证":
        return <Shield className="h-5 w-5 text-blue-500" />
      case "合规培训":
        return <FileText className="h-5 w-5 text-teal-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  // 计算合规状况统计数据
  const complianceStats = {
    total: complianceRequirements.length,
    compliant: complianceRequirements.filter((req) => req.status === "compliant").length,
    inProgress: complianceRequirements.filter((req) => req.status === "inProgress").length,
    needsAttention: complianceRequirements.filter((req) => req.status === "needsAttention").length,
    nonCompliant: complianceRequirements.filter((req) => req.status === "nonCompliant").length,
  }

  const compliancePercentage = Math.round((complianceStats.compliant / complianceStats.total) * 100)

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>合规管理</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="requirements">合规要求</TabsTrigger>
            <TabsTrigger value="standards">合规标准</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">总体合规率</div>
                  <div className="mt-2 flex items-center">
                    <div className="mr-2 text-3xl font-bold">{compliancePercentage}%</div>
                    {compliancePercentage >= 90 ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : compliancePercentage >= 70 ? (
                      <Activity className="h-5 w-5 text-blue-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    )}
                  </div>
                  <Progress value={compliancePercentage} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">合规要求</div>
                  <div className="mt-2 flex items-center">
                    <div className="mr-2 text-3xl font-bold">{complianceStats.compliant}</div>
                    <div className="text-sm text-muted-foreground">/ {complianceStats.total}</div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">满足的合规要求数量</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">进行中</div>
                  <div className="mt-2 flex items-center">
                    <div className="mr-2 text-3xl font-bold">{complianceStats.inProgress}</div>
                    <Activity className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">正在实施的合规要求</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">需关注</div>
                  <div className="mt-2 flex items-center">
                    <div className="mr-2 text-3xl font-bold">{complianceStats.needsAttention}</div>
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">需要立即关注的要求</div>
                </CardContent>
              </Card>
            </div>

            <h3 className="mt-6 mb-3 text-lg font-medium">合规标准状态</h3>
            <div className="space-y-3">
              {complianceStandards.map((standard) => (
                <div key={standard.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center">
                    {getStatusIcon(standard.status)}
                    <div className="ml-3">
                      <div className="font-medium">{standard.name}</div>
                      <div className="text-sm text-muted-foreground">{standard.description}</div>
                    </div>
                  </div>
                  {getStatusBadge(standard.status)}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button>生成合规报告</Button>
            </div>
          </TabsContent>

          <TabsContent value="requirements" className="pt-4">
            <div className="space-y-4">
              {complianceRequirements.map((req) => (
                <Card key={req.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">{getCategoryIcon(req.category)}</div>
                        <div>
                          <div className="font-medium">{req.title}</div>
                          <div className="text-sm text-muted-foreground">{req.description}</div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            分类: {req.category} • 上次检查: {req.lastChecked} • 下次审核: {req.nextReview}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">{getStatusBadge(req.status)}</div>
                    </div>

                    {req.status !== "compliant" && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs">
                          <span>完成进度</span>
                          <span>{req.progress}%</span>
                        </div>
                        <Progress value={req.progress} className="mt-1 h-1.5" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="standards" className="pt-4">
            <div className="space-y-4">
              {complianceStandards.map((standard) => (
                <Card key={standard.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{standard.name}</div>
                        <div className="text-sm text-muted-foreground">{standard.description}</div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          上次评估: {standard.lastAssessment} • 下次评估: {standard.nextAssessment}
                        </div>
                      </div>
                      <div className="ml-4">{getStatusBadge(standard.status)}</div>
                    </div>

                    <div className="mt-3 flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        查看详情
                      </Button>
                      <Button size="sm">开始评估</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
