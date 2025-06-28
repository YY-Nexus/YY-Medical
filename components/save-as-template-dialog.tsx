"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X, Plus } from "lucide-react"

interface SaveAsTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (templateData: { name: string; description: string; tags: string[]; isPublic: boolean }) => void
  experimentData: any | null
}

export function SaveAsTemplateDialog({ open, onOpenChange, onSave, experimentData }: SaveAsTemplateDialogProps) {
  const [templateName, setTemplateName] = useState(experimentData ? `${experimentData.title}模板` : "")
  const [templateDescription, setTemplateDescription] = useState(
    experimentData ? `基于"${experimentData.title}"创建的模板` : "",
  )
  const [isPublic, setIsPublic] = useState(false)
  const [tags, setTags] = useState<string[]>(experimentData ? [...experimentData.tags] : [])
  const [newTag, setNewTag] = useState("")

  // 添加标签
  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  // 移除标签
  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  // 处理保存
  const handleSave = () => {
    if (!templateName) {
      alert("请输入模板名称")
      return
    }

    onSave({
      name: templateName,
      description: templateDescription,
      tags,
      isPublic,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>保存为模板</DialogTitle>
          <DialogDescription>将当前试验设计保存为可重用的模板</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="template-name">模板名称</Label>
            <Input
              id="template-name"
              placeholder="输入模板名称"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="template-description">模板描述</Label>
            <Textarea
              id="template-description"
              placeholder="输入模板描述"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>标签</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="添加标签"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTag()
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="is-public" checked={isPublic} onCheckedChange={setIsPublic} />
            <Label htmlFor="is-public">公开此模板</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave}>保存模板</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
