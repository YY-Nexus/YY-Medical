"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Keyboard } from "lucide-react"

interface ShortcutItem {
  keys: string[]
  description: string
  category: string
}

const shortcuts: ShortcutItem[] = [
  {
    keys: ["Alt", "S"],
    description: "切换侧边栏折叠/展开状态",
    category: "导航",
  },
  {
    keys: ["Alt", "H"],
    description: "返回首页",
    category: "导航",
  },
  {
    keys: ["Alt", "P"],
    description: "转到患者列表",
    category: "导航",
  },
  {
    keys: ["Alt", "D"],
    description: "打开/关闭AI医生助手",
    category: "功能",
  },
  {
    keys: ["Alt", "F"],
    description: "打开全局搜索",
    category: "功能",
  },
  {
    keys: ["Ctrl", "S"],
    description: "保存当前表单/数据",
    category: "数据",
  },
  {
    keys: ["Esc"],
    description: "关闭当前对话框/弹窗",
    category: "界面",
  },
]

export function KeyboardShortcutsHelp() {
  const [open, setOpen] = useState(false)

  const categories = Array.from(new Set(shortcuts.map((s) => s.category)))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Keyboard className="h-4 w-4" />
          <span>键盘快捷键</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>键盘快捷键</DialogTitle>
          <DialogDescription>使用这些键盘快捷键可以更快地操作系统</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-gray-500 mb-2">{category}</h3>
              <div className="space-y-2">
                {shortcuts
                  .filter((s) => s.category === category)
                  .map((shortcut, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{shortcut.description}</span>
                      <div className="flex gap-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <span key={keyIndex} className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                            {key}
                            {keyIndex < shortcut.keys.length - 1 && <span className="mx-1">+</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
