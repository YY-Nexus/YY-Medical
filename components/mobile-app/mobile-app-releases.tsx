"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Smartphone,
  BarChart,
  ChevronRight,
  PackageOpen,
  Sparkles,
  Bug,
  Wrench,
  Rocket,
  Zap,
  ShieldAlert,
} from "lucide-react"

export function MobileAppReleases() {
  const [activeTab, setActiveTab] = useState("versions")

  // 模拟版本数据
  const releaseVersions = [
    {
      id: "v-230",
      version: "2.3.0",
      codeName: "健康护航",
      releaseDate: "2025-04-15",
      status: "released",
      platforms: ["iOS", "Android", "HarmonyOS"],
      deploymentStatus: {
        ios: { status: "completed", percentage: 100 },
        android: { status: "completed", percentage: 100 },
        harmonyos: { status: "completed", percentage: 100 },
      },
      features: [
        { type: "new", description: "新增AI辅助诊断功能，提供初步症状分析" },
        { type: "new", description: "支持健康设备数据同步，实时监测健康状况" },
        { type: "improvement", description: "优化用户界面，提升操作体验" },
        { type: "improvement", description: "改进预约流程，预约更加便捷" },
        { type: "bugfix", description: "修复部分设备上闪退问题" },
        { type: "bugfix", description: "解决账号同步偶发性失败的问题" },
      ],
      metrics: {
        downloads: 25000,
        activeUsers: 18500,
        crashRate: 0.2,
        rating: 4.7,
      },
    },
    {
      id: "v-225",
      version: "2.2.5",
      codeName: "安心守护",
      releaseDate: "2025-03-01",
      status: "released",
      platforms: ["iOS", "Android", "HarmonyOS"],
      deploymentStatus: {
        ios: { status: "completed", percentage: 100 },
        android: { status: "completed", percentage: 100 },
        harmonyos: { status: "completed", percentage: 100 },
      },
      features: [
        { type: "improvement", description: "优化远程问诊功能，提高连接稳定性" },
        { type: "improvement", description: "改进药品信息展示，增加更多详细说明" },
        { type: "bugfix", description: "修复部分Android设备无法上传图片的问题" },
        { type: "bugfix", description: "解决iOS设备上日历同步问题" },
        { type: "security", description: "增强数据传输加密，提升安全性" },
      ],
      metrics: {
        downloads: 28000,
        activeUsers: 20000,
        crashRate: 0.3,
        rating: 4.6,
      },
    },
    {
      id: "v-220",
      version: "2.2.0",
      codeName: "智慧医疗",
      releaseDate: "2025-01-15",
      status: "released",
      platforms: ["iOS", "Android", "HarmonyOS"],
      deploymentStatus: {
        ios: { status: "completed", percentage: 100 },
        android: { status: "completed", percentage: 100 },
        harmonyos: { status: "completed", percentage: 100 },
      },
      features: [
        { type: "new", description: "新增家庭健康管理功能，支持家庭成员健康数据管理" },
        { type: "new", description: "增加药品识别功能，扫描药品包装获取信息" },
        { type: "improvement", description: "重新设计数据图表，更直观展示健康趋势" },
        { type: "improvement", description: "优化启动速度，提升加载性能" },
        { type: "bugfix", description: "修复多个界面布局在平板设备上的显示问题" },
      ],
      metrics: {
        downloads: 32000,
        activeUsers: 22000,
        crashRate: 0.5,
        rating: 4.5,
      },
    },
    {
      id: "v-240",
      version: "2.4.0",
      codeName: "智能伙伴",
      releaseDate: "2025-06-01",
      status: "development",
      platforms: ["iOS", "Android", "HarmonyOS"],
      deploymentStatus: {
        ios: { status: "pending", percentage: 0 },
        android: { status: "pending", percentage: 0 },
        harmonyos: { status: "pending", percentage: 0 },
      },
      features: [
        { type: "new", description: "全新的健康助手功能，提供个性化健康建议" },
        { type: "new", description: "支持医疗记录的PDF导出和分享" },
        { type: "improvement", description: "AI诊断引擎升级，提高诊断准确率" },
        { type: "improvement", description: "用户界面升级，全新视觉体验" },
        { type: "security", description: "增强生物认证功能，提高账户安全性" },
      ],
      developmentProgress: 65,
    },
    {
      id: "v-235",
      version: "2.3.5",
      codeName: "便捷互联",
      releaseDate: "2025-05-15",
      status: "testing",
      platforms: ["iOS", "Android", "HarmonyOS"],
      deploymentStatus: {
        ios: { status: "inProgress", percentage: 20 },
        android: { status: "testing", percentage: 0 },
        harmonyos: { status: "pending", percentage: 0 },
      },
      features: [
        { type: "new", description: "支持医疗记录与主流医院系统互通" },
        { type: "improvement", description: "优化离线模式，提升无网络环境下的使用体验" },
        { type: "improvement", description: "提升应用内搜索功能，更快找到需要的信息" },
        { type: "bugfix", description: "修复后台同步偶发性失败的问题" },
        { type: "bugfix", description: "解决部分设备上消息推送延迟的问题" },
      ],
      testingProgress: 80,
    },
  ]

  // 获取状态徽章
  const getStatusBadge = (status) => {
    switch (status) {
      case "released":
        return <Badge className="bg-green-500">已发布</Badge>
      case "testing":
        return <Badge className="bg-blue-500">测试中</Badge>
      case "development":
        return <Badge className="bg-purple-500">开发中</Badge>
      case "pending":
        return <Badge className="bg-gray-500">未开始</Badge>
      case "inProgress":
        return <Badge className="bg-amber-500">进行中</Badge>
      case "completed":
        return <Badge className="bg-green-500">已完成</Badge>
      default:
        return <Badge className="bg-gray-500">未知</Badge>
    }
  }

  // 获取功能类型徽章和图标
  const getFeatureTypeInfo = (type) => {
    switch (type) {
      case "new":
        return {
          badge: <Badge className="bg-emerald-500">新功能</Badge>,
          icon: <Sparkles className="h-4 w-4 text-emerald-500" />,
        }
      case "improvement":
        return {
          badge: <Badge className="bg-blue-500">优化改进</Badge>,
          icon: <Zap className="h-4 w-4 text-blue-500" />,
        }
      case "bugfix":
        return {
          badge: <Badge className="bg-red-500">问题修复</Badge>,
          icon: <Bug className="h-4 w-4 text-red-500" />,
        }
      case "security":
        return {
          badge: <Badge className="bg-purple-500">安全增强</Badge>,
          icon: <ShieldAlert className="h-4 w-4 text-purple-500" />,
        }
      default:
        return {
          badge: <Badge className="bg-gray-500">其他</Badge>,
          icon: <Wrench className="h-4 w-4 text-gray-500" />,
        }
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>版本发布管理</CardTitle>
          <Smartphone className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="versions">版本管理</TabsTrigger>
            <TabsTrigger value="dashboard">数据概览</TabsTrigger>
          </TabsList>

          <TabsContent value="versions" className="pt-4">
            <div className="space-y-6">
              {/* 开发中版本 */}
              <div>
                <h3 className="text-lg font-medium mb-3">开发中的版本</h3>
                <div className="space-y-4">
                  {releaseVersions
                    .filter((version) => version.status === "development")
                    .map((version) => (
                      <Card key={version.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="text-lg font-medium">v{version.version}</div>
                                {getStatusBadge(version.status)}
                              </div>
                              <div className="text-sm text-muted-foreground">{version.codeName}</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                计划发布日期: {version.releaseDate}
                              </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-1">
                              {version.platforms.map((platform) => (
                                <Badge key={platform} variant="outline">
                                  {platform}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm">
                              <span>开发进度</span>
                              <span>{version.developmentProgress}%</span>
                            </div>
                            <Progress value={version.developmentProgress} className="mt-1" />
                          </div>

                          <div className="mt-4 space-y-2">
                            <div className="text-sm font-medium">主要功能</div>
                            {version.features.slice(0, 3).map((feature, index) => {
                              const { icon } = getFeatureTypeInfo(feature.type)
                              return (
                                <div key={index} className="flex items-start">
                                  <div className="mr-2 mt-0.5">{icon}</div>
                                  <div className="text-sm">{feature.description}</div>
                                </div>
                              )
                            })}
                            {version.features.length > 3 && (
                              <Button variant="link" className="p-0 h-auto text-sm">
                                查看全部 {version.features.length} 项功能
                                <ChevronRight className="ml-1 h-3 w-3" />
                              </Button>
                            )}
                          </div>

                          <div className="mt-4 flex justify-end">
                            <Button size="sm">管理版本</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* 测试中版本 */}
              <div>
                <h3 className="text-lg font-medium mb-3">测试中的版本</h3>
                <div className="space-y-4">
                  {releaseVersions
                    .filter((version) => version.status === "testing")
                    .map((version) => (
                      <Card key={version.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="text-lg font-medium">v{version.version}</div>
                                {getStatusBadge(version.status)}
                              </div>
                              <div className="text-sm text-muted-foreground">{version.codeName}</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                计划发布日期: {version.releaseDate}
                              </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-1">
                              {version.platforms.map((platform) => (
                                <Badge key={platform} variant="outline">
                                  {platform}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm">
                              <span>测试进度</span>
                              <span>{version.testingProgress}%</span>
                            </div>
                            <Progress value={version.testingProgress} className="mt-1" />
                          </div>

                          <div className="mt-3">
                            <div className="text-sm font-medium mb-2">部署状态</div>
                            <div className="space-y-2">
                              {Object.entries(version.deploymentStatus).map(([platform, status]) => (
                                <div key={platform} className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="w-24 capitalize">{platform}</div>
                                    {getStatusBadge(status.status)}
                                  </div>
                                  {status.status === "inProgress" && (
                                    <Progress value={status.percentage} className="w-24 h-2" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 space-y-2">
                            <div className="text-sm font-medium">主要功能</div>
                            {version.features.slice(0, 3).map((feature, index) => {
                              const { icon } = getFeatureTypeInfo(feature.type)
                              return (
                                <div key={index} className="flex items-start">
                                  <div className="mr-2 mt-0.5">{icon}</div>
                                  <div className="text-sm">{feature.description}</div>
                                </div>
                              )
                            })}
                            {version.features.length > 3 && (
                              <Button variant="link" className="p-0 h-auto text-sm">
                                查看全部 {version.features.length} 项功能
                                <ChevronRight className="ml-1 h-3 w-3" />
                              </Button>
                            )}
                          </div>

                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              测试报告
                            </Button>
                            <Button size="sm">管理版本</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* 已发布版本 */}
              <div>
                <h3 className="text-lg font-medium mb-3">已发布的版本</h3>
                <div className="space-y-4">
                  {releaseVersions
                    .filter((version) => version.status === "released")
                    .map((version) => (
                      <Card key={version.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="text-lg font-medium">v{version.version}</div>
                                {getStatusBadge(version.status)}
                              </div>
                              <div className="text-sm text-muted-foreground">{version.codeName}</div>
                              <div className="text-sm text-muted-foreground mt-1">发布日期: {version.releaseDate}</div>
                            </div>
                            <div className="hidden sm:flex items-center gap-1">
                              {version.platforms.map((platform) => (
                                <Badge key={platform} variant="outline">
                                  {platform}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card className="bg-gray-50">
                              <CardContent className="p-3">
                                <div className="text-xs text-muted-foreground">下载量</div>
                                <div className="text-lg font-medium">{version.metrics.downloads.toLocaleString()}</div>
                              </CardContent>
                            </Card>
                            <Card className="bg-gray-50">
                              <CardContent className="p-3">
                                <div className="text-xs text-muted-foreground">活跃用户</div>
                                <div className="text-lg font-medium">
                                  {version.metrics.activeUsers.toLocaleString()}
                                </div>
                              </CardContent>
                            </Card>
                            <Card className="bg-gray-50">
                              <CardContent className="p-3">
                                <div className="text-xs text-muted-foreground">崩溃率</div>
                                <div className="text-lg font-medium">{version.metrics.crashRate}%</div>
                              </CardContent>
                            </Card>
                            <Card className="bg-gray-50">
                              <CardContent className="p-3">
                                <div className="text-xs text-muted-foreground">评分</div>
                                <div className="text-lg font-medium">{version.metrics.rating}</div>
                              </CardContent>
                            </Card>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-1">
                            {version.features.map((feature, index) => {
                              const { badge } = getFeatureTypeInfo(feature.type)
                              return (
                                <div key={index} className="group relative">
                                  {badge}
                                  <div className="absolute z-10 invisible group-hover:visible bg-black text-white text-xs p-2 rounded shadow-lg -top-1 left-full ml-2 w-60">
                                    {feature.description}
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <BarChart className="mr-2 h-4 w-4" />
                              数据分析
                            </Button>
                            <Button variant="outline" size="sm">
                              <PackageOpen className="mr-2 h-4 w-4" />
                              版本详情
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-muted-foreground">当前版本</div>
                    <Badge className="bg-green-500">已发布</Badge>
                  </div>
                  <div className="text-3xl font-bold mt-1">v2.3.0</div>
                  <div className="text-sm text-muted-foreground">健康护航</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-muted-foreground">下个版本</div>
                    <Badge className="bg-blue-500">测试中</Badge>
                  </div>
                  <div className="text-3xl font-bold mt-1">v2.3.5</div>
                  <div className="text-sm text-muted-foreground">便捷互联</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-muted-foreground">路线图</div>
                    <Badge className="bg-purple-500">开发中</Badge>
                  </div>
                  <div className="text-3xl font-bold mt-1">v2.4.0</div>
                  <div className="text-sm text-muted-foreground">智能伙伴</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>版本采用率</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">版本采用率图表</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>设备分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">设备分布图表</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>功能使用率</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">功能使用率图表</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>用户留存率</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">用户留存率图表</div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 flex justify-end">
              <Button>
                <Rocket className="mr-2 h-4 w-4" />
                发布新版本
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
