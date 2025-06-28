"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface KeyboardShortcutsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function KeyboardShortcutsDialog({ open, onOpenChange }: KeyboardShortcutsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>键盘快捷键</DialogTitle>
          <DialogDescription>使用以下键盘快捷键可以更快地操作系统</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">导航</h3>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">切换侧边栏</span>
                <kbd className="inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs">
                  Alt + S
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">全局搜索</span>
                <kbd className="inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs">
                  Ctrl + K
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">显示快捷键帮助</span>
                <kbd className="inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs">
                  Ctrl + /
                </kbd>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">操作</h3>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">保存</span>
                <kbd className="inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs">
                  Ctrl + S
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">刷新</span>
                <kbd className="inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs">
                  F5
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">打印</span>
                <kbd className="inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs">
                  Ctrl + P
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
