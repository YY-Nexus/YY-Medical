"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CertificationList } from "@/components/profile/certifications/certification-list"
import { ExpirationReminder } from "@/components/profile/certifications/expiration-reminder"
import { PageHeader } from "@/components/page-header"
import { Award, CheckCircle, Clock, FileCheck } from "lucide-react"

export function CertificationsClient() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader
        title="资质验证系统"
        description="管理和验证医疗专业人员资质证书"
        icon={<Award className="h-6 w-6" />}
      />

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="verified">已验证</TabsTrigger>
          <TabsTrigger value="pending">待验证</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">资质总数</CardTitle>
                <FileCheck className="h-4 w-4 text-medical-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  较上月 <span className="text-green-500">+12%</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">已验证资质</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">
                  验证率 <span className="text-green-500">75%</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">即将过期</CardTitle>
                <Clock className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">30天内到期</p>
              </CardContent>
            </Card>
          </div>

          <ExpirationReminder />

          <Card>
            <CardHeader>
              <CardTitle>最近上传的资质</CardTitle>
              <CardDescription>查看最近上传的资质证书及其验证状态</CardDescription>
            </CardHeader>
            <CardContent>
              <CertificationList limit={5} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verified" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>已验证资质</CardTitle>
              <CardDescription>所有已通过第三方验证的资质证书</CardDescription>
            </CardHeader>
            <CardContent>
              <CertificationList status="verified" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>待验证资质</CardTitle>
              <CardDescription>等待验证或验证中的资质证书</CardDescription>
            </CardHeader>
            <CardContent>
              <CertificationList status="pending" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
