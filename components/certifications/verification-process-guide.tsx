import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { FileText, Upload, Search, CheckCircle, AlertTriangle, Clock, HelpCircle, Shield } from "lucide-react"

export function VerificationProcessGuide() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-500" />
            资质验证流程
          </CardTitle>
          <CardDescription>了解资质验证的完整流程和注意事项</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-medium mb-1">1. 准备资料</h3>
              <p className="text-sm text-muted-foreground">准备资质证书原件和相关证明材料</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Upload className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-medium mb-1">2. 提交验证</h3>
              <p className="text-sm text-muted-foreground">上传资质证书和填写相关信息</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Search className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-medium mb-1">3. 验证审核</h3>
              <p className="text-sm text-muted-foreground">验证机构审核资质的真实性和有效性</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <CheckCircle className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-medium mb-1">4. 获取结果</h3>
              <p className="text-sm text-muted-foreground">接收验证结果并获取验证证明</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">验证状态说明</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Alert className="bg-yellow-50 border-yellow-200">
                <Clock className="h-4 w-4 text-yellow-500" />
                <AlertTitle>验证中</AlertTitle>
                <AlertDescription className="text-sm">
                  您的资质正在验证过程中，请耐心等待。验证时间取决于所选验证机构，通常为1-3个工作日。
                </AlertDescription>
              </Alert>

              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertTitle>已验证</AlertTitle>
                <AlertDescription className="text-sm">
                  您的资质已通过验证，验证结果将保存在系统中，有效期内无需重复验证。
                </AlertDescription>
              </Alert>

              <Alert className="bg-red-50 border-red-200">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <AlertTitle>验证失败</AlertTitle>
                <AlertDescription className="text-sm">
                  资质验证未通过，请检查提交的信息是否准确，或联系验证机构了解详情。
                </AlertDescription>
              </Alert>

              <Alert className="bg-gray-50 border-gray-200">
                <HelpCircle className="h-4 w-4 text-gray-500" />
                <AlertTitle>需要补充材料</AlertTitle>
                <AlertDescription className="text-sm">
                  验证机构需要额外的证明材料，请按照要求提供补充资料。
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">常见问题</h3>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium">验证需要多长时间？</h4>
                <p className="text-sm text-muted-foreground">
                  验证时间取决于所选验证机构，官方机构通常需要1-3个工作日，快速验证服务可在数小时内完成。
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium">验证失败怎么办？</h4>
                <p className="text-sm text-muted-foreground">
                  验证失败时，系统会提供失败原因。您可以检查提交的信息是否准确，或联系验证机构了解详情，然后重新提交验证。
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium">验证结果有效期是多久？</h4>
                <p className="text-sm text-muted-foreground">
                  验证结果通常与资质证书的有效期一致。如果资质证书更新或变更，需要重新进行验证。
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium">是否可以同时使用多个验证机构？</h4>
                <p className="text-sm text-muted-foreground">
                  是的，您可以根据不同资质类型选择不同的验证机构，系统会保存所有验证结果。
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
