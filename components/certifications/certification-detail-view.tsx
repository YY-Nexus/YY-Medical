import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, Download, FileText, AlertTriangle, X, Calendar, Info } from "lucide-react"

interface CertificationDetailViewProps {
  certification: any | null
}

export function CertificationDetailView({ certification }: CertificationDetailViewProps) {
  if (!certification) {
    return <div className="text-center py-8">未找到资质信息</div>
  }

  // 获取资质类型名称
  const getTypeName = (type: string) => {
    switch (type) {
      case "doctor-license":
        return "执业医师资格证"
      case "specialist-certificate":
        return "专科医师资格证"
      case "practice-permit":
        return "医疗机构执业许可证"
      case "continuing-education":
        return "继续教育证书"
      default:
        return "未知类型"
    }
  }

  // 获取状态标签
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500">已验证</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">验证中</Badge>
      case "rejected":
        return <Badge className="bg-red-500">已拒绝</Badge>
      case "expired":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-500">
            已过期
          </Badge>
        )
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "rejected":
        return <X className="h-5 w-5 text-red-500" />
      case "expired":
        return <AlertTriangle className="h-5 w-5 text-gray-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-medium">{getTypeName(certification.type)}</h3>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(certification.status)}
          {getStatusBadge(certification.status)}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">证书编号</p>
          <p>{certification.licenseNumber}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">姓名</p>
          <p>{certification.name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">发证机构</p>
          <p>{certification.institution}</p>
        </div>
        {certification.specialty && (
          <div>
            <p className="text-sm font-medium text-muted-foreground">专科</p>
            <p>{certification.specialty}</p>
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-muted-foreground">发证日期</p>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <p>{certification.issueDate}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">有效期至</p>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <p>{certification.expiryDate}</p>
            {new Date(certification.expiryDate) < new Date() && <AlertTriangle className="h-4 w-4 text-red-500 ml-1" />}
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-sm font-medium">验证信息</h4>
        {certification.status === "verified" && (
          <Card className="bg-green-50 border-green-200 p-4">
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">资质已验证</p>
                <p className="text-sm text-muted-foreground">验证日期: {certification.verificationDate}</p>
                <p className="text-sm text-muted-foreground">验证机构: {certification.verificationProvider}</p>
              </div>
            </div>
          </Card>
        )}

        {certification.status === "pending" && (
          <Card className="bg-yellow-50 border-yellow-200 p-4">
            <div className="flex items-start space-x-2">
              <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium">资质验证中</p>
                <p className="text-sm text-muted-foreground">
                  您的资质正在验证中，请耐心等待。验证通常需要1-3个工作日。
                </p>
              </div>
            </div>
          </Card>
        )}

        {certification.status === "rejected" && (
          <Card className="bg-red-50 border-red-200 p-4">
            <div className="flex items-start space-x-2">
              <X className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium">资质验证失败</p>
                <p className="text-sm text-muted-foreground">验证日期: {certification.verificationDate}</p>
                <p className="text-sm text-muted-foreground">验证机构: {certification.verificationProvider}</p>
                <p className="text-sm text-red-500 mt-2">
                  失败原因: {certification.rejectionReason || "未提供失败原因"}
                </p>
              </div>
            </div>
          </Card>
        )}

        {certification.status === "expired" && (
          <Card className="bg-gray-50 border-gray-200 p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">资质已过期</p>
                <p className="text-sm text-muted-foreground">
                  此资质已于 {certification.expiryDate} 过期，请更新您的资质信息。
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          下载证书
        </Button>
        {certification.status === "rejected" && <Button>重新提交</Button>}
      </div>
    </div>
  )
}
