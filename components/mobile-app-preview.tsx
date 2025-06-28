"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  User,
  Calendar,
  FileText,
  MessageSquare,
  Bell,
  Menu,
  Heart,
  Activity,
  Clock,
  ChevronLeft,
  MoreVertical,
  Send,
} from "lucide-react"

// 模拟移动应用界面
export function MobileAppPreview() {
  const [activeTab, setActiveTab] = useState("home")
  const [activePage, setActivePage] = useState("dashboard")

  // 模拟页面切换
  const navigateTo = (page) => {
    setActivePage(page)
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>移动应用预览</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="home">主页</TabsTrigger>
            <TabsTrigger value="records">健康记录</TabsTrigger>
            <TabsTrigger value="chat">AI问诊</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="pt-4">
            <div className="mx-auto w-full max-w-sm border-2 rounded-3xl overflow-hidden shadow-lg bg-white">
              {/* 手机状态栏 */}
              <div className="bg-gray-800 text-white p-2 text-xs flex justify-between items-center">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              </div>

              {/* 应用内容 */}
              <div className="h-[500px] overflow-y-auto">
                {activePage === "dashboard" && (
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-lg font-bold">您好，张明</h2>
                        <p className="text-sm text-muted-foreground">今天是个好日子</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Bell className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Menu className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-xl p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">健康状况</h3>
                        <Button variant="link" size="sm" className="p-0 h-auto" onClick={() => navigateTo("health")}>
                          查看详情
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white rounded-lg p-2 text-center">
                          <Heart className="w-5 h-5 text-red-500 mx-auto mb-1" />
                          <div className="text-lg font-bold">78</div>
                          <div className="text-xs text-muted-foreground">心率</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 text-center">
                          <Activity className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                          <div className="text-lg font-bold">120/80</div>
                          <div className="text-xs text-muted-foreground">血压</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 text-center">
                          <Clock className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                          <div className="text-lg font-bold">6.5h</div>
                          <div className="text-xs text-muted-foreground">睡眠</div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">即将到来的预约</h3>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto"
                          onClick={() => navigateTo("appointments")}
                        >
                          全部预约
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-emerald-500">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">心脏科复诊</div>
                              <div className="text-sm text-muted-foreground">王医生</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">明天</div>
                              <div className="text-xs text-muted-foreground">09:30</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-blue-500">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">常规体检</div>
                              <div className="text-sm text-muted-foreground">李医生</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">下周一</div>
                              <div className="text-xs text-muted-foreground">14:00</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">最近诊断</h3>
                        <Button variant="link" size="sm" className="p-0 h-auto" onClick={() => navigateTo("diagnoses")}>
                          查看全部
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <div className="font-medium">季节性过敏</div>
                            <Badge>轻度</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">诊断日期: 2025-04-15</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <div className="font-medium">轻度高血压</div>
                            <Badge>需关注</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">诊断日期: 2025-03-22</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activePage === "health" && (
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      <Button variant="ghost" size="icon" onClick={() => navigateTo("dashboard")}>
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <h2 className="text-lg font-bold ml-2">健康状况详情</h2>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white border rounded-xl p-4">
                        <h3 className="font-medium mb-2">心率</h3>
                        <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-red-500">78</div>
                            <div className="text-sm text-muted-foreground">BPM</div>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          您的心率在正常范围内，继续保持良好的生活习惯。
                        </div>
                      </div>

                      <div className="bg-white border rounded-xl p-4">
                        <h3 className="font-medium mb-2">血压</h3>
                        <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-blue-500">120/80</div>
                            <div className="text-sm text-muted-foreground">mmHg</div>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          您的血压在理想范围内，继续保持健康的饮食和适当的运动。
                        </div>
                      </div>

                      <div className="bg-white border rounded-xl p-4">
                        <h3 className="font-medium mb-2">睡眠</h3>
                        <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-amber-500">6.5h</div>
                            <div className="text-sm text-muted-foreground">平均睡眠时间</div>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          您的睡眠时间略低于建议的7-8小时，尝试调整作息以获得更充分的休息。
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 底部导航栏 */}
              <div className="border-t bg-white p-2">
                <div className="flex justify-around">
                  <Button variant="ghost" size="icon" className="flex flex-col items-center h-auto py-1">
                    <Home className="w-5 h-5" />
                    <span className="text-xs mt-1">首页</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="flex flex-col items-center h-auto py-1">
                    <Calendar className="w-5 h-5" />
                    <span className="text-xs mt-1">预约</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="flex flex-col items-center h-auto py-1">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-xs mt-1">问诊</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="flex flex-col items-center h-auto py-1">
                    <FileText className="w-5 h-5" />
                    <span className="text-xs mt-1">记录</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="flex flex-col items-center h-auto py-1">
                    <User className="w-5 h-5" />
                    <span className="text-xs mt-1">我的</span>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="records" className="pt-4">
            <div className="mx-auto w-full max-w-sm border-2 rounded-3xl overflow-hidden shadow-lg bg-white">
              {/* 手机状态栏 */}
              <div className="bg-gray-800 text-white p-2 text-xs flex justify-between items-center">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              </div>

              {/* 应用内容 */}
              <div className="h-[500px] overflow-y-auto">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">健康记录</h2>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                    <Badge className="bg-emerald-500 px-3 py-1">全部</Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      诊断报告
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      检查结果
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      用药记录
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      手术记录
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-emerald-50 p-3 border-l-4 border-emerald-500">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">心脏检查报告</div>
                          <Badge>正常</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">2025-04-15 · 王医生</div>
                      </div>
                      <div className="p-3">
                        <p className="text-sm">
                          心电图检查结果正常，心脏功能良好，无异常发现。建议继续保持健康的生活方式。
                        </p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                          查看完整报告
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-blue-50 p-3 border-l-4 border-blue-500">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">常规体检报告</div>
                          <Badge>需关注</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">2025-03-22 · 赵医生</div>
                      </div>
                      <div className="p-3">
                        <p className="text-sm">
                          血压略高于正常范围，建议调整饮食结构，减少盐分摄入，增加适当运动。其他指标正常。
                        </p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                          查看完整报告
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-3 border-l-4 border-gray-500">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">血液检查报告</div>
                          <Badge>正常</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">2024-12-05 · 张医生</div>
                      </div>
                      <div className="p-3">
                        <p className="text-sm">
                          血常规检查结果正常，血糖、血脂等指标均在正常范围内。建议继续保持健康的生活方式。
                        </p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                          查看完整报告
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-amber-50 p-3 border-l-4 border-amber-500">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">过敏原检测报告</div>
                          <Badge>轻度</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">2024-10-18 · 李医生</div>
                      </div>
                      <div className="p-3">
                        <p className="text-sm">
                          检测出对花粉有轻度过敏反应，建议在花粉季节减少户外活动，必要时佩戴口罩。
                        </p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                          查看完整报告
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 底部导航栏 */}
              <div className="border-t bg-white p-2">
                <div className="flex justify-around">
                  <Button variant="ghost" size="icon" className="flex flex-col items-center h-auto py-1">
                    <Home className="w-5 h-5" />
                    <span className="text-xs mt-1">首页</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="flex flex-col items-center h-auto py-1">
                    <Calendar className="w-5 h-5" />
                    <span className="text-xs mt-1">预约</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="flex flex-col items-center h-auto py-1">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-xs mt-1">问诊</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="flex flex-col items-center h-auto py-1">
                    <FileText className="w-5 h-5" />
                    <span className="text-xs mt-1">记录</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="flex flex-col items-center h-auto py-1">
                    <User className="w-5 h-5" />
                    <span className="text-xs mt-1">我的</span>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="pt-4">
            <div className="mx-auto w-full max-w-sm border-2 rounded-3xl overflow-hidden shadow-lg bg-white">
              {/* 手机状态栏 */}
              <div className="bg-gray-800 text-white p-2 text-xs flex justify-between items-center">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              </div>

              {/* 应用内容 */}
              <div className="h-[500px] flex flex-col">
                <div className="p-3 border-b flex items-center">
                  <Button variant="ghost" size="icon">
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <div className="flex-1 text-center">
                    <h2 className="font-medium">AI医疗助手</h2>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                      <p className="text-sm">您好，我是您的AI医疗助手。请描述您的症状，我将协助您进行初步诊断。</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-emerald-500 text-white rounded-lg rounded-tr-none p-3 max-w-[80%]">
                      <p className="text-sm">我最近总是感到头痛，尤其是在早上起床后，有时候还会伴随轻微的头晕。</p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                      <p className="text-sm">
                        了解了。请问您的头痛是持续性的还是间歇性的？疼痛是在头部的哪个位置？是否有其他症状如恶心、视力模糊等？
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-emerald-500 text-white rounded-lg rounded-tr-none p-3 max-w-[80%]">
                      <p className="text-sm">
                        头痛是间歇性的，通常在太阳穴附近，有时候会持续几个小时。没有恶心，但有时候会感到疲劳。
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                      <p className="text-sm">
                        根据您描述的症状，您可能是患有紧张性头痛。这种头痛通常与压力、焦虑或姿势不良有关。我建议您：
                      </p>
                      <ul className="text-sm list-disc pl-5 mt-2">
                        <li>保持充分的休息和规律的作息</li>
                        <li>减少压力，尝试放松技巧如深呼吸或冥想</li>
                        <li>保持良好的姿势，特别是长时间使用电脑时</li>
                        <li>适当饮水，避免脱水</li>
                      </ul>
                      <p className="text-sm mt-2">如果症状持续或加重，建议您预约医生进行面诊。您需要我帮您预约吗？</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Bell className="w-5 h-5" />
                    </Button>
                    <Input placeholder="输入您的问题..." className="rounded-full" />
                    <Button size="icon" className="rounded-full">
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
