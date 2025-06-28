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
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface EditTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: {
    id: string
    name: string
    type: string
    schedule: string
    description: string
  }
}

export function EditTaskDialog({ open, onOpenChange, task }: EditTaskDialogProps) {
  const [formData, setFormData] = useState({
    name: task?.name || "",
    type: task?.type || "",
    schedule: task?.schedule || "",
    description: task?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 处理任务编辑逻辑
    console.log("编辑任务:", { id: task?.id, ...formData })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>编辑任务</DialogTitle>
          <DialogDescription>修改任务配置和执行计划。</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                任务名称
              </Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-type" className="text-right">
                任务类型
              </Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
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
              <Label htmlFor="edit-schedule" className="text-right">
                执行计划
              </Label>
              <Select
                value={formData.schedule}
                onValueChange={(value) => setFormData({ ...formData, schedule: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
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
              <Label htmlFor="edit-description" className="text-right">
                描述
              </Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit">保存更改</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
