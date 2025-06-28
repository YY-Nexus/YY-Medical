"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Smartphone, MessageSquare, ThumbsUp, ThumbsDown, Star, AlertCircle, Search, Filter } from "lucide-react"

export function MobileAppFeedback() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // 模拟用户反馈数据
  const feedbackData = [
    {
      id: "fb-001",
      user: "李明",
      title: "诊断功能非常实用",
      content: "AI诊断功能帮助我快速了解了我的症状，非常实用。医生的远程会诊也很方便。",
      rating: 5,
      date: "2025-05-05",
      status: "published",
      type: "feature",
      feature: "AI诊断",
      appVersion: "2.3.0",
      deviceInfo: "iPhone 15 Pro, iOS 18.2",
    },
    {
      id: "fb-002",
      user: "张华",
      title: "预约功能需要改进",
      content: "预约医生的流程有点复杂，希望能简化一些步骤，特别是选择科室和医生的部分。",
      rating: 3,
      date: "2025-05-04",
      status: "inProgress",
      type: "improvement",
      feature: "预约管理",
      appVersion: "2.3.0",
      deviceInfo: "Samsung Galaxy S24, Android 15",
    },
    {
      id: "fb-003",
      user: "王芳",
      title: "健康数据同步问题",
      content: "有时候我的运动数据无法正常同步到应用中，需要多次尝试才能成功。",
      rating: 2,
      date: "2025-05-03",
      status: "pending",
      type: "bug",
      feature: "健康数据",
      appVersion: "2.3.0",
      deviceInfo: "OPPO Find X6, Android 14",
    },
    {
      id: "fb-004",
      user: "刘强",
      title: "新界面设计很棒",
      content: "最新版本的界面设计非常清爽，信息展示更加合理，使用体验提升很大！",
      rating: 5,
      date: "2025-05-02",
      status: "published",
      type: "design",
      feature: "用户界面",
      appVersion: "2.3.0",
      deviceInfo: "Xiaomi 13, Android 14",
    },
    {
      id: "fb-005",
      user: "周小红",
      title: "问诊记录查询不方便",
      content: "希望能够提供更好的问诊记录查询功能，现在找历史记录比较麻烦。",
      rating: 3,
      date: "2025-05-01",
      status: "inProgress",
      type: "improvement",
      feature: "问诊记录",
      appVersion: "2.3.0",
      deviceInfo: "iPhone 14, iOS 17.5",
    },
    {
      id: "fb-006",
      user: "赵梅",
      title: "登录偶尔失败",
      content: "有时候登录会失败，显示网络错误，但我的网络连接是正常的。",
      rating: 2,
      date: "2025-04-30",
      status: "pending",
      type: "bug",
      feature: "用户认证",
      appVersion: "2.2.5",
      deviceInfo: "Huawei Mate 60, HarmonyOS 4.0",
    },
    {
      id: "fb-007",
      user: "孙明",
      title: "药品信息很全面",
      content: "应用中的药品信息库非常全面，查询药品信息和副作用很方便。",
      rating: 5,
      date: "2025-04-29",
      status: "published",
      type: "feature",
      feature: "药品信息",
      appVersion: "2.2.5",
      deviceInfo: "iPhone 15, iOS 18.1",
    },
    {
      id: "fb-008",
      user: "吴静",
      title: "闪退问题",
      content: "在查看大型医疗报告时，应用偶尔会闪退，希望能解决这个问题。",
      rating: 1,
      date: "2025-04-28",
      status: "inProgress",
      type: "bug",
      feature: "医疗报告",
      appVersion: "2.2.5",
      deviceInfo: "OnePlus 12, Android 14",
    },
  ]

  // 过滤反馈
  const filteredFeedback = feedbackData.filter((feedback) => {
    // 分类过滤
    if (activeTab !== "all" && feedback.type !== activeTab) {
      return false
    }

    // 状态过滤
    if (statusFilter !== "all" && feedback.status !== statusFilter) {
      return false
    }

    // 搜索过滤
    if (
      searchQuery &&
      !feedback.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !feedback.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !feedback.user.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  // 评分统计
  const ratingStats = {
    5: feedbackData.filter((fb) => fb.rating === 5).length,
    4: feedbackData.filter((fb) => fb.rating === 4).length,
    3: feedbackData.filter((fb) => fb.rating === 3).length,
    2: feedbackData.filter((fb) => fb.rating === 2).length,
    1: feedbackData.filter((fb) => fb.rating === 1).length,
  }

  // 计算平均评分
  const totalRating = Object.keys(ratingStats).reduce((sum, key) => sum + Number(key) * ratingStats[key], 0)
  const averageRating = (totalRating / feedbackData.length).toFixed(1)

  // 获取状态徽章
  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">已发布</Badge>
      case "inProgress":
        return <Badge className="bg-blue-500">处理中</Badge>
      case "pending":
        return <Badge className="bg-amber-500">待处理</Badge>
      default:
        return <Badge className="bg-gray-500">未知</Badge>
    }
  }

  // 获取类型徽章
  const getTypeBadge = (type) => {
    switch (type) {
      case "feature":
        return <Badge className="bg-emerald-500">功能体验</Badge>
      case "improvement":
        return <Badge className="bg-blue-500">改进建议</Badge>
      case "bug":
        return <Badge className="bg-red-500">问题反馈</Badge>
      case "design":
        return <Badge className="bg-purple-500">设计反馈</Badge>
      default:
        return <Badge className="bg-gray-500">其他</Badge>
    }
  }

  // 获取评分星级
  const getRatingStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
        ))}
        <span className="ml-1 text-sm">{rating}</span>
      </div>
    )
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>用户反馈</CardTitle>
          <Smartphone className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">总体评分</div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{averageRating}</span>
                </div>
              </div>
              <div className="text-3xl font-bold mt-1">{feedbackData.length}</div>
              <div className="text-sm text-muted-foreground">用户反馈</div>
            </CardContent>
          </Card>

          <Card className="col-span-2 bg-gray-50">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground mb-2">评分分布</div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <div className="w-8">{rating}星</div>
                    <Progress value={(ratingStats[rating] / feedbackData.length) * 100} className="h-2 flex-1 mx-2" />
                    <div className="w-8 text-right text-sm">{ratingStats[rating]}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="feature">功能体验</TabsTrigger>
              <TabsTrigger value="improvement">改进建议</TabsTrigger>
              <TabsTrigger value="bug">问题反馈</TabsTrigger>
              <TabsTrigger value="design">设计反馈</TabsTrigger>
            </TabsList>

            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索反馈..."
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
                  <SelectItem value="published">已发布</SelectItem>
                  <SelectItem value="inProgress">处理中</SelectItem>
                  <SelectItem value="pending">待处理</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            {filteredFeedback.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">未找到反馈</h3>
                <p className="text-sm text-muted-foreground mt-1">尝试调整搜索条件或筛选器</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFeedback.map((feedback) => (
                  <Card key={feedback.id} className="overflow-hidden">
                    <div className="border-l-4 border-primary">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                              <h3 className="font-medium">{feedback.title}</h3>
                              <div className="flex flex-wrap gap-2">
                                {getTypeBadge(feedback.type)}
                                {getStatusBadge(feedback.status)}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 mb-2">{feedback.content}</p>
                            <div className="flex flex-col md:flex-row md:items-center gap-2 text-xs text-muted-foreground">
                              <span>用户: {feedback.user}</span>
                              <span className="hidden md:inline">•</span>
                              <span>日期: {feedback.date}</span>
                              <span className="hidden md:inline">•</span>
                              <span>功能: {feedback.feature}</span>
                              <span className="hidden md:inline">•</span>
                              <span>版本: {feedback.appVersion}</span>
                            </div>
                          </div>
                          <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2 md:min-w-[120px]">
                            {getRatingStars(feedback.rating)}
                            <div className="text-xs text-muted-foreground">{feedback.deviceInfo}</div>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4 gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            回复
                          </Button>
                          <Button variant="outline" size="sm">
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            有用
                          </Button>
                          <Button variant="outline" size="sm">
                            <ThumbsDown className="mr-2 h-4 w-4" />
                            不适用
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
