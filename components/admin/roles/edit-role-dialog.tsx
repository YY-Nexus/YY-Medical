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
import { toast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"

interface EditRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  role: any
}

export function EditRoleDialog({ open, onOpenChange, role }: EditRoleDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [active, setActive] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (role) {
      setName(role.name || "")
      setDescription(role.description || "")
      setActive(role.isActive !== false)
    }
  }, [role])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name) {
      toast({
        title: "验证错误",
        description: "角色名称不能为空",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // 模拟API调用
    setTimeout(() => {
      toast({
        title: "角色已更新",
        description: `角色 "${name}" 已成功更新。`,
      })

      setLoading(false)
      onOpenChange(false)
    }, 1000)
  }

  // 如果role未定义，不显示对话框
  if (!role && open) {
    onOpenChange(false)
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>编辑角色</DialogTitle>
            <DialogDescription>修改角色信息和状态。</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">角色名称</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="输入角色名称"
                disabled={role?.isSystem}
              />
              {role?.isSystem && <p className="text-sm text-gray-500 mt-1">系统内置角色名称不可修改</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">角色描述</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="输入角色描述"
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="active" className="cursor-pointer">
                角色状态
              </Label>
              <Switch id="active" checked={active} onCheckedChange={setActive} disabled={role?.isSystem} />
            </div>
            {role?.isSystem && <p className="text-sm text-gray-500 mt-1">系统内置角色无法禁用</p>}
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
