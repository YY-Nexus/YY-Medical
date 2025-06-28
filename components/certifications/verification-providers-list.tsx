import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ExternalLink, Info, Shield, Award, Clock, FileCheck } from "lucide-react"
import Link from "next/link"

// 验证机构数据
const verificationProviders = [
  {
    id: "nhc",
    name: "国家卫健委医师资格认证中心",
    description: "国家卫生健康委员会下属的官方医师资格认证机构，提供执业医师资格证书验证服务。",
    supportedTypes: ["doctor-license", "specialist-certificate"],
    verificationTime: "1-2个工作日",
    officialWebsite: "https://example.com/nhc",
    isOfficial: true,
    isFast: false,
    coverage: "全国",
    fee: "免费",
  },
  {
    id: "cmda",
    name: "中国医师协会认证中心",
    description: "中国医师协会提供的专业资质认证服务，支持多种医疗专业资质的验证。",
    supportedTypes: ["doctor-license", "specialist-certificate", "continuing-education"],
    verificationTime: "2-3个工作日",
    officialWebsite: "https://example.com/cmda",
    isOfficial: true,
    isFast: false,
    coverage: "全国",
    fee: "会员免费，非会员收费",
  },
  {
    id: "medverify",
    name: "医证通快速验证服务",
    description: "第三方专业医疗资质验证服务，提供快速验证和额外的验证详情。",
    supportedTypes: ["doctor-license", "specialist-certificate", "practice-permit", "continuing-education"],
    verificationTime: "4小时内",
    officialWebsite: "https://example.com/medverify",
    isOfficial: false,
    isFast: true,
    coverage: "全国主要城市",
    fee: "每次验证30元",
  },
  {
    id: "healthcert",
    name: "健康证书验证联盟",
    description: "多家医疗机构组成的验证联盟，提供全面的医疗资质验证服务。",
    supportedTypes: ["doctor-license", "specialist-certificate", "practice-permit"],
    verificationTime: "1个工作日",
    officialWebsite: "https://example.com/healthcert",
    isOfficial: false,
    isFast: true,
    coverage: "全国",
    fee: "包月服务",
  },
]

export function VerificationProvidersList() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {verificationProviders.map((provider) => (
          <Card key={provider.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{provider.name}</CardTitle>
                <div className="flex space-x-2">
                  {provider.isOfficial && (
                    <Badge className="bg-blue-500">
                      <Shield className="h-3 w-3 mr-1" />
                      官方认证
                    </Badge>
                  )}
                  {provider.isFast && (
                    <Badge className="bg-green-500">
                      <Clock className="h-3 w-3 mr-1" />
                      快速验证
                    </Badge>
                  )}
                </div>
              </div>
              <CardDescription>{provider.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-3">
                <div className="flex items-start">
                  <FileCheck className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">支持的资质类型</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {provider.supportedTypes.map((type) => {
                        let typeName = ""
                        switch (type) {
                          case "doctor-license":
                            typeName = "执业医师资格证"
                            break
                          case "specialist-certificate":
                            typeName = "专科医师资格证"
                            break
                          case "practice-permit":
                            typeName = "医疗机构执业许可证"
                            break
                          case "continuing-education":
                            typeName = "继续教育证书"
                            break
                          default:
                            typeName = type
                        }
                        return (
                          <Badge key={type} variant="outline" className="text-xs">
                            {typeName}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                    <div>
                      <p className="text-sm font-medium">验证时间</p>
                      <p className="text-sm">{provider.verificationTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-muted-foreground mr-2" />
                    <div>
                      <p className="text-sm font-medium">覆盖范围</p>
                      <p className="text-sm">{provider.coverage}</p>
                    </div>
                  </div>

                  <div className="flex items-center col-span-2">
                    <Info className="h-4 w-4 text-muted-foreground mr-2" />
                    <div>
                      <p className="text-sm font-medium">验证费用</p>
                      <p className="text-sm">{provider.fee}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <Button variant="outline" size="sm" asChild>
                <Link href={provider.officialWebsite} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  访问官网
                </Link>
              </Button>
              <Button size="sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                选择此机构
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
