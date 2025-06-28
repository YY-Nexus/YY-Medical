"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Microscope, Users, FileText, RefreshCw, Calendar, Dna } from "lucide-react"

// 模拟研究项目数据
const projectsByCategory = [
  { name: "临床试验", count: 24, color: "#10b981" },
  { name: "观察性研究", count: 18, color: "#3b82f6" },
  { name: "基础研究", count: 15, color: "#f59e0b" },
  { name: "转化医学", count: 12, color: "#8b5cf6" },
  { name: "流行病学", count: 10, color: "#ec4899" },
]

// 模拟研究项目状态
const projectStatus = [
  { name: "进行中", value: 42, color: "#3b82f6" },
  { name: "计划中", value: 18, color: "#f59e0b" },
  { name: "已完成", value: 25, color: "#10b981" },
  { name: "已暂停", value: 5, color: "#6b7280" },
]

// 模拟研究趋势数据
const researchTrends = [
  { month: "1月", 新项目: 5, 发表论文: 3, 获得资助: 2 },
  { month: "2月", 新项目: 7, 发表论文: 4, 获得资助: 3 },
  { month: "3月", 新项目: 4, 发表论文: 6, 获得资助: 1 },
  { month: "4月", 新项目: 8, 发表论文: 5, 获得资助: 4 },
]

export function ResearchProjectsDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [lastUpdateTime, setLastUpdateTime] = useState("2025-04-28 14:30")

  // 模拟更新数据
  const updateData = () => {
    // 更新最后更新时间
    const now = new Date()
    setLastUpdateTime(
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ` +
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
    )
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>研究项目管理</CardTitle>
          <Button variant="outline" size="sm" onClick={updateData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            更新数据
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">项目概览</TabsTrigger>
            <TabsTrigger value="categories">研究类别</TabsTrigger>
            <TabsTrigger value="trends">研究趋势</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">总研究项目数</div>
                  <div className="text-4xl font-bold mb-2">90</div>
                  <div className="text-xs text-muted-foreground mt-2">上次更新: {lastUpdateTime}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Microscope className="w-5 h-5 text-medical-500" />
                    <div>
                      <div className="font-medium">活跃项目</div>
                      <div className="text-sm text-muted-foreground">42 个</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Users className="w-5 h-5 text-medical-500" />
                    <div>
                      <div className="font-medium">研究人员</div>
                      <div className="text-sm text-muted-foreground">156 名</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <FileText className="w-5 h-5 text-medical-500" />
                    <div>
                      <div className="font-medium">发表论文</div>
                      <div className="text-sm text-muted-foreground">78 篇</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Dna className="w-5 h-5 text-medical-500" />
                    <div>
                      <div className="font-medium">样本数量</div>
                      <div className="text-sm text-muted-foreground">12,450</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">项目状态分布</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={projectStatus}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {projectStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">近期研究活动</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-medical-500" />
                    <div>
                      <div className="font-medium">研究项目评审会议</div>
                      <div className="text-sm text-muted-foreground">2025-05-05 14:00</div>
                    </div>
                  </div>
                  <Badge>即将到来</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-medical-500" />
                    <div>
                      <div className="font-medium">季度研究报告提交截止</div>
                      <div className="text-sm text-muted-foreground">2025-05-10</div>
                    </div>
                  </div>
                  <Badge>即将到来</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-medical-500" />
                    <div>
                      <div className="font-medium">研究合作伙伴会议</div>
                      <div className="text-sm text-muted-foreground">2025-05-15 10:00</div>
                    </div>
                  </div>
                  <Badge>即将到来</Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">研究类别分布</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={projectsByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="name"
                      >
                        {projectsByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">研究项目数量</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={projectsByCategory}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="项目数量" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">研究类别详情</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        研究类别
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        项目数量
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        研究人员
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        发表论文
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        资金(万元)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">临床试验</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">24</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">48</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">32</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">1,250</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">观察性研究</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">18</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">36</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">24</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">850</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">基础研究</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">15</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">30</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">18</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">720</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">转化医学</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">12</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">24</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">15</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">680</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">流行病学</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">10</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">18</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">12</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">520</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={researchTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="新项目" stroke="#3b82f6" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="发表论文" stroke="#10b981" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="获得资助" stroke="#f59e0b" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-4xl font-bold text-medical-500">24</div>
                <div className="text-sm text-muted-foreground">本季度新项目</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-4xl font-bold text-medical-500">18</div>
                <div className="text-sm text-muted-foreground">本季度发表论文</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-4xl font-bold text-medical-500">10</div>
                <div className="text-sm text-muted-foreground">本季度获得资助</div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">研究成果趋势分析</h3>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">研究产出效率</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    本季度研究产出效率较上季度提升15%，主要得益于新引入的自动化数据分析工具和跨部门协作机制的改进。
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">热点研究领域</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    人工智能辅助诊断、精准医疗和慢性病管理是当前研究热点，相关项目数量和资金投入均呈上升趋势。
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">未来发展方向</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    建议加强多中心协作研究，扩大样本规模，提高研究结果的可靠性和普适性，同时加强与国际研究机构的合作。
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
