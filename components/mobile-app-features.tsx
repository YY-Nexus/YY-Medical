"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Heart,
  Calendar,
  MessageSquare,
  FileText,
  Bell,
  Lock,
  Zap,
  Fingerprint,
  CloudOff,
  Share2,
  RefreshCw,
} from "lucide-react"

// 模拟应用功能列表
const features = [
  {
    id: 1,
    name: "健康数据监测",
    icon: <Heart className="w-5 h-5 text-red-500" />,
    description: "实时监测和记录心率、血压、睡眠等健康数据",
    status: "released",
  },
  {
    id: 2,
    name: "预约管理",
    icon: <Calendar className="w-5 h-5 text-blue-500" />,
    description: "在线预约医生，查看和管理预约历史",
    status: "released",
  },
  {
    id: 3,
    name: "AI智能问诊",
    icon: <MessageSquare className="w-5 h-5 text-emerald-500" />,
    description: "通过AI助手进行初步症状诊断和健康咨询",
    status: "released",
  },
  {
    id: 4,
    name: "医疗记录查看",
    icon: <FileText className="w-5 h-5 text-purple-500" />,
    description: "随时查看个人医疗记录、检查报告和诊断结果",
    status: "released",
  },
  {
    id: 5,
    name: "用药提醒",
    icon: <Bell className="w-5 h-5 text-amber-500" />,
    description: "设置用药提醒，确保按时服药",
    status: "released",
  },
  {
    id: 6,
    name: "数据加密保护",
    icon: <Lock className="w-5 h-5 text-gray-500" />,
    description: "全面的数据加密和隐私保护措施",
    status: "released",
  },
  {
    id: 7,
    name: "远程会诊",
    icon: <Share2 className="w-5 h-5 text-indigo-500" />,
    description: "支持与多位专家同时进行远程视频会诊",
    status: "upcoming",
  },
  {
    id: 8,
    name: "离线模式",
    icon: <CloudOff className="w-5 h-5 text-gray-500" />,
    description: "在无网络环境下查看已同步的健康数据和记录",
    status: "upcoming",
  },
  {
    id: 9,
    name: "生物识别登录",
    icon: <Fingerprint className="w-5 h-5 text-blue-500" />,
    description: "支持指纹和面部识别安全登录",
    status: "released",
  },
  {
    id: 10,
    name: "实时数据同步",
    icon: <RefreshCw className="w-5 h-5 text-green-500" />,
    description: "与医院系统实时同步最新的医疗数据",
    status: "released",
  },
  {
    id: 11,
    name: "急救模式",
    icon: <Zap className="w-5 h-5 text-red-500" />,
    description: "紧急情况下快速显示关键健康信息和联系人",
    status: "upcoming",
  },
]

export function MobileAppFeatures() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>应用功能</CardTitle>
          <Smartphone className="w-5 h-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="mt-0.5">{feature.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{feature.name}</div>
                  {feature.status === "released" ? (
                    <Badge className="bg-emerald-500">已发布</Badge>
                  ) : (
                    <Badge variant="outline" className="text-amber-500 border-amber-500">
                      即将推出
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
