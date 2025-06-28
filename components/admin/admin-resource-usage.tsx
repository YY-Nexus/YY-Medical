"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// 模拟CPU使用数据
const cpuUsageData = [
  { time: "00:00", usage: 25 },
  { time: "02:00", usage: 18 },
  { time: "04:00", usage: 15 },
  { time: "06:00", usage: 20 },
  { time: "08:00", usage: 35 },
  { time: "10:00", usage: 45 },
  { time: "12:00", usage: 50 },
  { time: "14:00", usage: 48 },
  { time: "16:00", usage: 52 },
  { time: "18:00", usage: 40 },
  { time: "20:00", usage: 30 },
  { time: "22:00", usage: 28 },
]

// 模拟内存使用数据
const memoryUsageData = [
  { time: "00:00", usage: 40 },
  { time: "02:00", usage: 42 },
  { time: "04:00", usage: 38 },
  { time: "06:00", usage: 35 },
  { time: "08:00", usage: 48 },
  { time: "10:00", usage: 55 },
  { time: "12:00", usage: 60 },
  { time: "14:00", usage: 62 },
  { time: "16:00", usage: 65 },
  { time: "18:00", usage: 58 },
  { time: "20:00", usage: 52 },
  { time: "22:00", usage: 45 },
]

// 模拟磁盘使用数据
const diskUsageData = [
  { name: "系统", value: 120, color: "#8884d8" },
  { name: "数据库", value: 450, color: "#82ca9d" },
  { name: "日志", value: 80, color: "#ffc658" },
  { name: "备份", value: 200, color: "#ff8042" },
  { name: "媒体", value: 150, color: "#0088fe" },
  { name: "可用空间", value: 500, color: "#00C49F" },
]

// 模拟网络使用数据
const networkUsageData = [
  { time: "00:00", incoming: 10, outgoing: 5 },
  { time: "02:00", incoming: 8, outgoing: 4 },
  { time: "04:00", incoming: 5, outgoing: 2 },
  { time: "06:00", incoming: 12, outgoing: 6 },
  { time: "08:00", incoming: 25, outgoing: 15 },
  { time: "10:00", incoming: 35, outgoing: 20 },
  { time: "12:00", incoming: 40, outgoing: 25 },
  { time: "14:00", incoming: 38, outgoing: 22 },
  { time: "16:00", incoming: 42, outgoing: 28 },
  { time: "18:00", incoming: 30, outgoing: 18 },
  { time: "20:00", incoming: 20, outgoing: 12 },
  { time: "22:00", incoming: 15, outgoing: 8 },
]

export function AdminResourceUsage() {
  const [activeTab, setActiveTab] = useState("cpu")

  // 计算总磁盘空间
  const totalDiskSpace = diskUsageData.reduce((acc, item) => acc + item.value, 0)
  const usedDiskSpace = totalDiskSpace - diskUsageData.find((item) => item.name === "可用空间")!.value
  const diskUsagePercent = Math.round((usedDiskSpace / totalDiskSpace) * 100)

  return (
    <div className="space-y-4">
      <Tabs defaultValue="cpu" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cpu">CPU使用率</TabsTrigger>
          <TabsTrigger value="memory">内存使用率</TabsTrigger>
          <TabsTrigger value="disk">磁盘使用情况</TabsTrigger>
          <TabsTrigger value="network">网络流量</TabsTrigger>
        </TabsList>

        <TabsContent value="cpu" className="pt-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>CPU使用率趋势</CardTitle>
                <CardDescription>过去24小时CPU使用率变化</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={cpuUsageData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="usage" name="CPU使用率 (%)" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>当前CPU使用率</CardTitle>
                  <CardDescription>实时CPU使用情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>总体使用率</span>
                      <span className="font-medium">48%</span>
                    </div>
                    <Progress value={48} className="h-2" />

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>核心 1</span>
                        <span className="font-medium">52%</span>
                      </div>
                      <Progress value={52} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span>核心 2</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span>核心 3</span>
                        <span className="font-medium">50%</span>
                      </div>
                      <Progress value={50} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span>核心 4</span>
                        <span className="font-medium">46%</span>
                      </div>
                      <Progress value={46} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>CPU信息</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">处理器型号</span>
                      <span>Intel Xeon E5-2680 v4</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">核心数</span>
                      <span>4 核心 / 8 线程</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">基础频率</span>
                      <span>2.4 GHz</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">最大频率</span>
                      <span>3.3 GHz</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">缓存</span>
                      <span>35 MB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="memory" className="pt-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>内存使用率趋势</CardTitle>
                <CardDescription>过去24小时内存使用率变化</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={memoryUsageData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="usage" name="内存使用率 (%)" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>当前内存使用情况</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>使用率</span>
                      <span className="font-medium">62%</span>
                    </div>
                    <Progress value={62} className="h-2" />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">总内存</p>
                        <p className="text-xl font-medium">64 GB</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">已使用</p>
                        <p className="text-xl font-medium">39.7 GB</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">可用</p>
                        <p className="text-xl font-medium">24.3 GB</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">缓存</p>
                        <p className="text-xl font-medium">12.8 GB</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>内存分配</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>数据库服务</span>
                      <span className="font-medium">18.5 GB</span>
                    </div>
                    <Progress value={29} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span>应用服务器</span>
                      <span className="font-medium">12.2 GB</span>
                    </div>
                    <Progress value={19} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span>缓存服务</span>
                      <span className="font-medium">6.8 GB</span>
                    </div>
                    <Progress value={11} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span>系统进程</span>
                      <span className="font-medium">2.2 GB</span>
                    </div>
                    <Progress value={3} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="disk" className="pt-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>磁盘空间分配</CardTitle>
                <CardDescription>各类数据占用空间情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={diskUsageData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, value }) => `${name}: ${value} GB`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {diskUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} GB`, "空间"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>磁盘使用概览</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>使用率</span>
                      <span className="font-medium">{diskUsagePercent}%</span>
                    </div>
                    <Progress value={diskUsagePercent} className="h-2" />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">总容量</p>
                        <p className="text-xl font-medium">{totalDiskSpace} GB</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">已使用</p>
                        <p className="text-xl font-medium">{usedDiskSpace} GB</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">可用</p>
                        <p className="text-xl font-medium">
                          {diskUsageData.find((item) => item.name === "可用空间")?.value} GB
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">分区数</p>
                        <p className="text-xl font-medium">4</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>磁盘性能</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">读取速度</span>
                      <span>520 MB/s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">写入速度</span>
                      <span>480 MB/s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">平均响应时间</span>
                      <span>0.8 ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">IOPS</span>
                      <span>98,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">磁盘类型</span>
                      <span>NVMe SSD</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="network" className="pt-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>网络流量趋势</CardTitle>
                <CardDescription>过去24小时网络流量变化</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={networkUsageData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="incoming" name="入站流量 (Mbps)" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="outgoing" name="出站流量 (Mbps)" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>当前网络状态</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">入站流量</p>
                        <p className="text-xl font-medium">42 Mbps</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">出站流量</p>
                        <p className="text-xl font-medium">28 Mbps</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">活跃连接</p>
                        <p className="text-xl font-medium">1,245</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">带宽使用率</p>
                        <p className="text-xl font-medium">35%</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>入站带宽</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <Progress value={42} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span>出站带宽</span>
                        <span className="font-medium">28%</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>网络接口</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">主要接口</span>
                      <span>eth0 (1 Gbps)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">IP地址</span>
                      <span>10.0.1.5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">MAC地址</span>
                      <span>00:1B:44:11:3A:B7</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">MTU</span>
                      <span>1500</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">状态</span>
                      <span className="text-green-500">正常运行</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
