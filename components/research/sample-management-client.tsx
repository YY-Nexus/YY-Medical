"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter } from "lucide-react"

const mockSamples = [
  { id: "S001", type: "血液", status: "已处理", location: "冷冻库A-1", date: "2024-01-15" },
  { id: "S002", type: "组织", status: "处理中", location: "实验室B", date: "2024-01-16" },
  { id: "S003", type: "尿液", status: "待处理", location: "冷冻库A-2", date: "2024-01-17" },
]

export function SampleManagementClient() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">样本管理</h1>
          <p className="text-muted-foreground">生物样本的存储和管理</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            添加样本
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>样本列表</CardTitle>
          <CardDescription>当前存储的所有生物样本</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>样本ID</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>位置</TableHead>
                <TableHead>日期</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSamples.map((sample) => (
                <TableRow key={sample.id}>
                  <TableCell className="font-medium">{sample.id}</TableCell>
                  <TableCell>{sample.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        sample.status === "已处理" ? "default" : sample.status === "处理中" ? "secondary" : "outline"
                      }
                    >
                      {sample.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{sample.location}</TableCell>
                  <TableCell>{sample.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
