"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, FileText, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CertificationDashboard } from "./certification-dashboard"

// 模拟医生数据
const mockDoctors = [
  { id: "doctor-001", name: "张医生", department: "呼吸科", avatar: "/caring-doctor.png" },
  { id: "doctor-002", name: "李医生", department: "放射科", avatar: "/caring-doctor.png" },
  { id: "doctor-003", name: "王医生", department: "肿瘤科", avatar: "/caring-doctor.png" },
]

// 模拟待审核资质数据
const mockPendingCertifications = [
  {
    id: "cert-001",
    type: "doctor-license",
    licenseNumber: "1102023001001",
    name: "张三",
    institution: "北京协和医院",
    issueDate: "2018-07-01",
    expiryDate: "2028-06-30",
    status: "pending",
    uploadedBy: "张医生",
    uploadedAt: "2023-11-15 14:30",
  },
  {
    id: "cert-002",
    type: "specialist-certificate",
    licenseNumber: "2202023002002",
    name: "李四",
    specialty: "心血管内科",
    institution: "卫生部",
    issueDate: "2019-09-15",
    expiryDate: "2027-09-14",
    status: "pending",
    uploadedBy: "李医生",
    uploadedAt: "2023-11-14 09:15",
  },
  {
    id: "cert-003",
    type: "doctor-license",
    licenseNumber: "3302023003003",
    name: "王五",
    institution: "上海交通大学医学院附属瑞金医院",
    issueDate: "2020-05-20",
    expiryDate: "2029-05-19",
    status: "pending",
    uploadedBy: "王医生",
    uploadedAt: "2023-11-13 11:20",
  },
]

// 模拟审核历史数据
const mockReviewHistory = [
  {
    id: "review-001",
    certificationId: "cert-001",
    reviewer: "李审核员",
    reviewDate: "2023-11-16 09:00",
    status: "approved",
    comment: "资质信息完整，符合要求",
  },
  {
    id: "review-002",
    certificationId: "cert-002",
    reviewer: "赵审核员",
    reviewDate: "2023-11-15 15:30",
    status: "rejected",
    comment: "缺少专科医师资格证",
  },
]

export function AdminCertificationClient() {
  const [activeTab, setActiveTab] = useState("pending")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCertification, setSelectedCertification] = useState<string | null>(null)

  // 过滤待审核资质
  const filteredPendingCertifications = mockPendingCertifications.filter(
    (cert) =>
      cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.institution.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 过滤审核历史
  const filteredReviewHistory = mockReviewHistory.filter(
    (review) =>
      review.reviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 获取选中的资质
  const getSelectedCertification = () => {
    if (!selectedCertification) return null

    if (activeTab === "pending") {
      return mockPendingCertifications.find((cert) => cert.id === selectedCertification)
    } else {
      return mockReviewHistory.find((review) => review.certificationId === selectedCertification)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>资质审核管理</CardTitle>
          <CardDescription>审核医生上传的资质认证信息</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">审核概览</TabsTrigger>
              <TabsTrigger value="pending">待审核</TabsTrigger>
              <TabsTrigger value="history">审核历史</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-4 mt-4">
              <CertificationDashboard />
            </TabsContent>

            <TabsContent value="pending" className="space-y-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索姓名、证书编号或机构..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>资质类型</TableHead>
                      <TableHead>证书编号</TableHead>
                      <TableHead>姓名</TableHead>
                      <TableHead>发证机构</TableHead>
                      <TableHead>有效期至</TableHead>
                      <TableHead>上传时间</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPendingCertifications.map((cert) => (
                      <TableRow key={cert.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{cert.type}</TableCell>
                        <TableCell>{cert.licenseNumber}</TableCell>
                        <TableCell>{cert.name}</TableCell>
                        <TableCell>{cert.institution}</TableCell>
                        <TableCell>{cert.expiryDate}</TableCell>
                        <TableCell>{cert.uploadedAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="icon" onClick={() => setSelectedCertification(cert.id)}>
                              <FileText className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>查看详情</DropdownMenuItem>
                                <DropdownMenuItem>下载证书</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">删除</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索审核员或评论..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>资质类型</TableHead>
                      <TableHead>证书编号</TableHead>
                      <TableHead>姓名</TableHead>
                      <TableHead>审核员</TableHead>
                      <TableHead>审核日期</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReviewHistory.map((review) => (
                      <TableRow key={review.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{review.certificationId}</TableCell>
                        <TableCell>{review.reviewer}</TableCell>
                        <TableCell>{review.reviewDate}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{review.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedCertification(review.certificationId)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>查看详情</DropdownMenuItem>
                                <DropdownMenuItem>下载证书</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">删除</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
