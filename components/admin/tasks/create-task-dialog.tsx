"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

export function CreateTaskDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    schedule: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 处理任务创建逻辑
    console.log("创建任务:", formData)
    setOpen(false)
    setFormData({ name: "", type: "", schedule: "", description: "" })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          创建任务
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>创建新任务</DialogTitle>
          <DialogDescription>配置新的系统任务，设置执行计划和参数。</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                任务名称
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                placeholder="输入任务名称"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                任务类型
              </Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="选择任务类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backup">数据备份</SelectItem>
                  <SelectItem value="cleanup">系统清理</SelectItem>
                  <SelectItem value="report">报告生成</SelectItem>
                  <SelectItem value="sync">数据同步</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="schedule" className="text-right">
                执行计划
              </Label>
              <Select
                value={formData.schedule}
                onValueChange={(value) => setFormData({ ...formData, schedule: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="选择执行计划" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once">立即执行</SelectItem>
                  <SelectItem value="daily">每日执行</SelectItem>
                  <SelectItem value="weekly">每周执行</SelectItem>
                  <SelectItem value="monthly">每月执行</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                描述
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                placeholder="任务描述（可选）"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button type="submit">创建任务</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
