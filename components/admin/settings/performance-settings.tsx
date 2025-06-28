"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PerformanceSettings() {
  const [cacheEnabled, setCacheEnabled] = useState(true)
  const [prefetchEnabled, setPrefetchEnabled] = useState(true)
  const [imageOptimizationEnabled, setImageOptimizationEnabled] = useState(true)
  const [maxConcurrentRequests, setMaxConcurrentRequests] = useState(10)
  const [cpuUsageLimit, setCpuUsageLimit] = useState(80)
  const [memoryUsageLimit, setMemoryUsageLimit] = useState(70)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>性能设置</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">基本设置</TabsTrigger>
            <TabsTrigger value="advanced">高级设置</TabsTrigger>
            <TabsTrigger value="limits">资源限制</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cache-enabled">启用缓存</Label>
                  <div className="text-sm text-muted-foreground">提高频繁访问数据的响应速度</div>
                </div>
                <Switch id="cache-enabled" checked={cacheEnabled} onCheckedChange={setCacheEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="prefetch-enabled">启用预加载</Label>
                  <div className="text-sm text-muted-foreground">预先加载可能需要的数据</div>
                </div>
                <Switch id="prefetch-enabled" checked={prefetchEnabled} onCheckedChange={setPrefetchEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="image-optimization">图像优化</Label>
                  <div className="text-sm text-muted-foreground">自动优化图像以提高加载速度</div>
                </div>
                <Switch
                  id="image-optimization"
                  checked={imageOptimizationEnabled}
                  onCheckedChange={setImageOptimizationEnabled}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="max-concurrent-requests">最大并发请求数</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="max-concurrent-requests"
                    type="number"
                    value={maxConcurrentRequests}
                    onChange={(e) => setMaxConcurrentRequests(Number.parseInt(e.target.value))}
                    min={1}
                    max={50}
                  />
                  <span className="text-sm text-muted-foreground">请求</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="request-timeout">请求超时 (秒)</Label>
                <Input id="request-timeout" type="number" defaultValue="30" min={1} max={120} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="optimization-level">优化级别</Label>
                <Select defaultValue="balanced">
                  <SelectTrigger id="optimization-level">
                    <SelectValue placeholder="选择优化级别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">最小化 (优先稳定性)</SelectItem>
                    <SelectItem value="balanced">平衡</SelectItem>
                    <SelectItem value="aggressive">激进 (优先性能)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="limits">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="cpu-usage-limit">CPU 使用限制: {cpuUsageLimit}%</Label>
                </div>
                <Slider
                  id="cpu-usage-limit"
                  min={10}
                  max={100}
                  step={5}
                  value={[cpuUsageLimit]}
                  onValueChange={(value) => setCpuUsageLimit(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="memory-usage-limit">内存使用限制: {memoryUsageLimit}%</Label>
                </div>
                <Slider
                  id="memory-usage-limit"
                  min={10}
                  max={100}
                  step={5}
                  value={[memoryUsageLimit]}
                  onValueChange={(value) => setMemoryUsageLimit(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disk-cache-size">磁盘缓存大小 (MB)</Label>
                <Input id="disk-cache-size" type="number" defaultValue="1024" min={128} max={10240} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="memory-cache-size">内存缓存大小 (MB)</Label>
                <Input id="memory-cache-size" type="number" defaultValue="256" min={64} max={2048} />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6 space-x-2">
          <Button variant="outline">重置为默认值</Button>
          <Button>保存设置</Button>
        </div>
      </CardContent>
    </Card>
  )
}
