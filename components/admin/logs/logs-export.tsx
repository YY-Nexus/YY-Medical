"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, ChevronDown } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function LogsExport() {
  const exportLogs = (format: string) => {
    // 这里应该是真实的导出逻辑
    // 目前只展示一个通知
    toast({
      title: "开始导出",
      description: `正在将日志导出为${format.toUpperCase()}格式，请稍候...`,
    })

    // 模拟导出延迟
    setTimeout(() => {
      toast({
        title: "导出完成",
        description: `日志已成功导出为${format.toUpperCase()}格式。`,
      })
    }, 2000)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
          <Download className="h-4 w-4 mr-1" />
          导出
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => exportLogs("csv")}>导出为CSV</DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportLogs("excel")}>导出为Excel</DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportLogs("json")}>导出为JSON</DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportLogs("pdf")}>导出为PDF</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
