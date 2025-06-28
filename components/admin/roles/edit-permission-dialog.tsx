"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

interface EditPermissionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  permission: any
  availableModules: string[]
}

export function EditPermissionDialog({ open, onOpenChange, permission, availableModules }: EditPermissionDialogProps) {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [description, setDescription] = useState("")
  const [module, setModule] = useState("")
  const [active, setActive] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (permission) {
      setName(permission.name || "")
      setCode(permission.code || "")
      setDescription(permission.description || "")
      setModule(permission.module || "")
      setActive(permission.isActive !== false)
    }
  }, [permission])

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
        title: "权限已更新",
        description: `权限 "${name}" 已成功更新。`,
      })

      setLoading(false)
      onOpenChange(false)
    }, 1000)
  }

  // 如果permission未定义，不显示对话框
  if (!permission && open) {
    onOpenChange(false)
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>编辑权限</DialogTitle>
            <DialogDescription>修改权限信息和状态。</DialogDescription>
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
                disabled
              />
              <p className="text-xs text-gray-500">权限代码不可修改</p>
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
            <div className="flex items-center justify-between">
              <Label htmlFor="active" className="cursor-pointer">
                权限状态
              </Label>
              <Switch id="active" checked={active} onCheckedChange={setActive} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              取消
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "保存中..." : "保存更改"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
