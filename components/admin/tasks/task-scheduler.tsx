"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function TaskScheduler() {
  const [date, setDate] = useState<Date>()
  const [activeTab, setActiveTab] = useState("simple")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="simple">简单调度</TabsTrigger>
          <TabsTrigger value="advanced">高级调度</TabsTrigger>
          <TabsTrigger value="dependencies">任务依赖</TabsTrigger>
        </TabsList>

        <TabsContent value="simple" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task-name">任务名称</Label>
                <Input id="task-name" placeholder="输入任务名称" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-type">任务类型</Label>
                <Select>
                  <SelectTrigger id="task-type">
                    <SelectValue placeholder="选择任务类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">系统任务</SelectItem>
                    <SelectItem value="analytics">分析任务</SelectItem>
                    <SelectItem value="ai">AI任务</SelectItem>
                    <SelectItem value="custom">自定义任务</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-command">执行命令/脚本</Label>
                <Input id="task-command" placeholder="输入执行命令或脚本路径" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-description">任务描述</Label>
                <Input id="task-description" placeholder="输入任务描述" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>执行频率</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择执行频率" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">一次性</SelectItem>
                    <SelectItem value="hourly">每小时</SelectItem>
                    <SelectItem value="daily">每天</SelectItem>
                    <SelectItem value="weekly">每周</SelectItem>
                    <SelectItem value="monthly">每月</SelectItem>
                    <SelectItem value="custom">自定义</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>开始日期</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "yyyy-MM-dd") : "选择日期"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>开始时间</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择时间" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, hour) => (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {`${hour.toString().padStart(2, "0")}:00`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>重复选项</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="repeat-mon" />
                    <label
                      htmlFor="repeat-mon"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      周一
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="repeat-tue" />
                    <label
                      htmlFor="repeat-tue"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      周二
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="repeat-wed" />
                    <label
                      htmlFor="repeat-wed"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      周三
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="repeat-thu" />
                    <label
                      htmlFor="repeat-thu"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      周四
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="repeat-fri" />
                    <label
                      htmlFor="repeat-fri"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      周五
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="repeat-sat" />
                    <label
                      htmlFor="repeat-sat"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      周六
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="repeat-sun" />
                    <label
                      htmlFor="repeat-sun"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      周日
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>高级选项</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="option-timeout" />
                    <label
                      htmlFor="option-timeout"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      设置超时时间
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="option-retry" />
                    <label
                      htmlFor="option-retry"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      失败自动重试
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="option-notify" />
                    <label
                      htmlFor="option-notify"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      执行结果通知
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline">取消</Button>
            <Button>保存任务</Button>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Cron表达式</Label>
                <Input placeholder="0 0 * * *" />
                <p className="text-sm text-muted-foreground">使用标准Cron表达式格式 (分 时 日 月 周)</p>
              </div>

              <div className="space-y-2">
                <Label>执行环境</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择执行环境" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">生产环境</SelectItem>
                    <SelectItem value="staging">测试环境</SelectItem>
                    <SelectItem value="development">开发环境</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>资源限制</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">CPU限制 (%)</Label>
                    <Input type="number" placeholder="80" />
                  </div>
                  <div>
                    <Label className="text-sm">内存限制 (MB)</Label>
                    <Input type="number" placeholder="512" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>超时设置</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">执行超时 (分钟)</Label>
                    <Input type="number" placeholder="30" />
                  </div>
                  <div>
                    <Label className="text-sm">重试次数</Label>
                    <Input type="number" placeholder="3" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>通知设置</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-success" />
                    <label htmlFor="notify-success" className="text-sm">
                      执行成功时通知
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-failure" />
                    <label htmlFor="notify-failure" className="text-sm">
                      执行失败时通知
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-timeout" />
                    <label htmlFor="notify-timeout" className="text-sm">
                      执行超时时通知
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline">取消</Button>
            <Button>保存高级任务</Button>
          </div>
        </TabsContent>

        <TabsContent value="dependencies" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>任务依赖</Label>
              <p className="text-sm text-muted-foreground">
                设置此任务的前置依赖任务，只有依赖任务成功完成后才会执行此任务
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">依赖任务列表</h4>
                  <Button variant="outline" size="sm">
                    添加依赖
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">数据备份任务</p>
                      <p className="text-sm text-muted-foreground">每日凌晨2点执行</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      移除
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">系统清理任务</p>
                      <p className="text-sm text-muted-foreground">每周日执行</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      移除
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>依赖策略</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择依赖策略" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有依赖任务都成功</SelectItem>
                  <SelectItem value="any">任意依赖任务成功</SelectItem>
                  <SelectItem value="none">忽略依赖任务状态</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline">取消</Button>
              <Button>保存依赖配置</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
