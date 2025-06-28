"use client"

import { CardFooter } from "@/components/ui/card"

import { TableCell } from "@/components/ui/table"

import { TableBody } from "@/components/ui/table"

import { TableHead } from "@/components/ui/table"

import { TableRow } from "@/components/ui/table"

import { TableHeader } from "@/components/ui/table"

import { Table } from "@/components/ui/table"

import { CardDescription } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, Eye, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CertificationStatusBadge } from "./certification-status-badge"

// 模拟资质数据
const mockCertifications = [
  {
    id: "cert-001",
    type: "doctor-license",
    licenseNumber: "1102023001001",
    name: "张三",
    institution: "北京协和医院",
    issueDate: "2018-07-01",
    expiryDate: "2028-06-30",
    status: "active",
  },
  {
    id: "cert-002",
    type: "specialist-certificate",
    licenseNumber: "2202023002002",
    name: "张三",
    specialty: "心血管内科",
    institution: "卫生部",
    issueDate: "2019-09-15",
    expiryDate: "2027-09-14",
    status: "active",
  },
  {
    id: "cert-003",
    type: "doctor-license",
    licenseNumber: "1234567890123",
    name: "李四",
    institution: "上海市第一人民医院",
    issueDate: "2019-05-20",
    expiryDate: "2029-05-19",
    status: "expired",
  },
  {
    id: "cert-004",
    type: "specialist-certificate",
    licenseNumber: "9876543210987",
    name: "王五",
    specialty: "神经内科",
    institution: "北京大学第一医院",
    issueDate: "2020-02-10",
    expiryDate: "2028-02-09",
    status: "pending",
  },
]

interface CertificationListProps {
  onViewDetail: (certificationId: string) => void
}

export function CertificationList({ onViewDetail }: CertificationListProps) {
  const [certifications, setCertifications] = useState(mockCertifications)

  // 删除资质
  const handleDeleteCertification = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id))
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>我的资质</CardTitle>
        <CardDescription>查看和管理您的资质认证信息</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>资质类型</TableHead>
                  <TableHead>证书编号</TableHead>
                  <TableHead>姓名</TableHead>
                  <TableHead>发证机构</TableHead>
                  <TableHead>有效期至</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certifications.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-medium">{cert.type}</TableCell>
                    <TableCell>{cert.licenseNumber}</TableCell>
                    <TableCell>{cert.name}</TableCell>
                    <TableCell>{cert.institution}</TableCell>
                    <TableCell>{cert.expiryDate}</TableCell>
                    <TableCell>
                      <CertificationStatusBadge status={cert.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => onViewDetail(cert.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              下载证书
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteCertification(cert.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          添加新资质
        </Button>
      </CardFooter>
    </Card>
  )
}
