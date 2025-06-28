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
import { toast } from "@/components/ui/use-toast"

interface CreateRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateRoleDialog({ open, onOpenChange }: CreateRoleDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

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
        title: "角色已创建",
        description: `角色 "${name}" 已成功创建。`,
      })

      setLoading(false)
      setName("")
      setDescription("")
      onOpenChange(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>创建角色</DialogTitle>
            <DialogDescription>创建新的用户角色和权限组。</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">角色名称</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="输入角色名称" />
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
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              取消
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "创建中..." : "创建角色"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
