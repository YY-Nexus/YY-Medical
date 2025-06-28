"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 模拟数据生成
const generateTimeSeriesData = (hours = 24, interval = 1) => {
  const data = []
  const now = new Date()

  for (let i = hours; i >= 0; i -= interval) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      time: time.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
      cpu: Math.floor(Math.random() * 30) + 20,
      memory: Math.floor(Math.random() * 40) + 30,
      disk: Math.floor(Math.random() * 20) + 10,
      network: Math.floor(Math.random() * 50) + 30,
      requests: Math.floor(Math.random() * 100) + 50,
    })
  }

  return data
}

export function AdminSystemStatus() {
  const [data, setData] = useState(generateTimeSeriesData())
  const [timeRange, setTimeRange] = useState("24h")
  const [refreshInterval, setRefreshInterval] = useState<number | null>(null)

  useEffect(() => {
    // 根据选择的时间范围更新数据
    const hours = timeRange === "24h" ? 24 : timeRange === "12h" ? 12 : timeRange === "6h" ? 6 : 1
    const interval = timeRange === "24h" ? 1 : timeRange === "12h" ? 0.5 : timeRange === "6h" ? 0.25 : 0.1
    setData(generateTimeSeriesData(hours, interval))
  }, [timeRange])

  useEffect(() => {
    // 设置自动刷新
    if (refreshInterval) {
      const timer = setInterval(() => {
        const hours = timeRange === "24h" ? 24 : timeRange === "12h" ? 12 : timeRange === "6h" ? 6 : 1
        const interval = timeRange === "24h" ? 1 : timeRange === "12h" ? 0.5 : timeRange === "6h" ? 0.25 : 0.1
        setData(generateTimeSeriesData(hours, interval))
      }, refreshInterval * 1000)

      return () => clearInterval(timer)
    }
  }, [refreshInterval, timeRange])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Tabs defaultValue="resources" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="resources">资源使用</TabsTrigger>
            <TabsTrigger value="requests">请求流量</TabsTrigger>
            <TabsTrigger value="services">服务状态</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24小时</SelectItem>
              <SelectItem value="12h">12小时</SelectItem>
              <SelectItem value="6h">6小时</SelectItem>
              <SelectItem value="1h">1小时</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={refreshInterval?.toString() || "0"}
            onValueChange={(val) => setRefreshInterval(val === "0" ? null : Number.parseInt(val))}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="刷新间隔" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">不自动刷新</SelectItem>
              <SelectItem value="10">10秒</SelectItem>
              <SelectItem value="30">30秒</SelectItem>
              <SelectItem value="60">1分钟</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const hours = timeRange === "24h" ? 24 : timeRange === "12h" ? 12 : timeRange === "6h" ? 6 : 1
              const interval = timeRange === "24h" ? 1 : timeRange === "12h" ? 0.5 : timeRange === "6h" ? 0.25 : 0.1
              setData(generateTimeSeriesData(hours, interval))
            }}
          >
            刷新
          </Button>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU使用率 (%)" />
            <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="内存使用率 (%)" />
            <Line type="monotone" dataKey="disk" stroke="#ffc658" name="磁盘I/O (MB/s)" />
            <Line type="monotone" dataKey="network" stroke="#ff8042" name="网络流量 (Mbps)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
