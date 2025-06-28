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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface CreatePermissionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  availableModules: string[]
}

export function CreatePermissionDialog({ open, onOpenChange, availableModules }: CreatePermissionDialogProps) {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [description, setDescription] = useState("")
  const [module, setModule] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !code || !module) {
      toast({
        title: "验证错误",
        description: "请填写所有必填字段",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // 模拟API调用
    setTimeout(() => {
      toast({
        title: "权限已创建",
        description: `权限 "${name}" 已成功创建。`,
      })

      setLoading(false)
      setName("")
      setCode("")
      setDescription("")
      setModule("")
      onOpenChange(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>创建权限</DialogTitle>
            <DialogDescription>创建新的系统权限。</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">权限名称</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="输入权限名称" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">权限代码</Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="例如: admin:users:create"
              />
              <p className="text-xs text-gray-500">权限代码应遵循命名规范，例如 模块:资源:操作</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="module">所属模块</Label>
              <Select value={module} onValueChange={setModule}>
                <SelectTrigger id="module">
                  <SelectValue placeholder="选择模块" />
                </SelectTrigger>
                <SelectContent>
                  {availableModules.map((mod) => (
                    <SelectItem key={mod} value={mod}>
                      {mod}
                    </SelectItem>
                  ))}
                  <SelectItem value="new">+ 新建模块</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {module === "new" && (
              <div className="space-y-2">
                <Label htmlFor="newModule">新模块名称</Label>
                <Input id="newModule" placeholder="输入新模块名称" onChange={(e) => setModule(e.target.value)} />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="description">权限描述</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="输入权限描述"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              取消
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "创建中..." : "创建权限"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
