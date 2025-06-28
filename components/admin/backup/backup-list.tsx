"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Download, FileArchive, MoreHorizontal, Search, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// 模拟备份数据
const backupData = [
  {
    id: "bkp-001",
    name: "每日自动备份",
    date: "2025-05-15 00:00:00",
    size: "1.2 GB",
    type: "自动",
    status: "完成",
  },
  {
    id: "bkp-002",
    name: "每周自动备份",
    date: "2025-05-10 00:00:00",
    size: "1.5 GB",
    type: "自动",
    status: "完成",
  },
  {
    id: "bkp-003",
    name: "系统升级前备份",
    date: "2025-05-05 10:30:00",
    size: "1.3 GB",
    type: "手动",
    status: "完成",
  },
  {
    id: "bkp-004",
    name: "数据迁移前备份",
    date: "2025-04-28 14:15:00",
    size: "1.4 GB",
    type: "手动",
    status: "完成",
  },
  {
    id: "bkp-005",
    name: "每月自动备份",
    date: "2025-04-01 00:00:00",
    size: "1.6 GB",
    type: "自动",
    status: "完成",
  },
]

export function BackupList() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreatingBackup, setIsCreatingBackup] = useState(false)
  const [backups, setBackups] = useState(backupData)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const filteredBackups = backups.filter(
    (backup) =>
      backup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      backup.date.includes(searchQuery) ||
      backup.type.includes(searchQuery),
  )

  const handleCreateBackup = () => {
    setIsCreatingBackup(true)

    // 模拟备份创建过程
    setTimeout(() => {
      const newBackup = {
        id: `bkp-${Math.floor(Math.random() * 1000)}`,
        name: `手动备份 ${new Date().toLocaleString("zh-CN")}`,
        date: new Date().toISOString().replace("T", " ").substring(0, 19),
        size: "1.3 GB",
        type: "手动",
        status: "完成",
      }

      setBackups([newBackup, ...backups])
      setIsCreatingBackup(false)

      toast({
        title: "备份创建成功",
        description: `备份 "${newBackup.name}" 已成功创建。`,
      })
    }, 2000)
  }

  const handleDeleteBackup = (id: string) => {
    setBackups(backups.filter((backup) => backup.id !== id))
    setConfirmDeleteId(null)

    toast({
      title: "备份已删除",
      description: "所选备份已成功删除。",
    })
  }

  const handleDownloadBackup = (id: string) => {
    const backup = backups.find((b) => b.id === id)

    toast({
      title: "备份下载已开始",
      description: `备份 "${backup?.name}" 正在下载中。`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>备份列表</CardTitle>
            <CardDescription>查看和管理系统的所有备份文件</CardDescription>
          </div>
          <Button onClick={handleCreateBackup} disabled={isCreatingBackup}>
            {isCreatingBackup ? "备份中..." : "创建新备份"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索备份..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>备份名称</TableHead>
                <TableHead>创建日期</TableHead>
                <TableHead>大小</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBackups.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    未找到备份记录
                  </TableCell>
                </TableRow>
              ) : (
                filteredBackups.map((backup) => (
                  <TableRow key={backup.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileArchive className="mr-2 h-4 w-4 text-blue-500" />
                        {backup.name}
                      </div>
                    </TableCell>
                    <TableCell>{backup.date}</TableCell>
                    <TableCell>{backup.size}</TableCell>
                    <TableCell>
                      <Badge variant={backup.type === "自动" ? "outline" : "secondary"}>{backup.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="success" className="bg-green-100 text-green-800">
                        {backup.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">操作菜单</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDownloadBackup(backup.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            <span>下载</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setConfirmDeleteId(backup.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>删除</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={confirmDeleteId !== null} onOpenChange={() => setConfirmDeleteId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>确认删除备份</DialogTitle>
              <DialogDescription>您确定要删除此备份吗？此操作无法撤销，备份数据将永久丢失。</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>
                取消
              </Button>
              <Button variant="destructive" onClick={() => confirmDeleteId && handleDeleteBackup(confirmDeleteId)}>
                删除
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
