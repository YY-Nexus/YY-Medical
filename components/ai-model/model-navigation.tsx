"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BarChart2, Layers, FileText, Settings, Database, AlertCircle, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface NavigationItem {
  title: string
  description: string
  icon: React.ReactNode
  path: string
  badge?: string
  badgeColor?: string
}

export function ModelNavigation() {
  const router = useRouter()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const navigationItems: NavigationItem[] = [
    {
      title: "诊断记录",
      description: "查看和分析AI辅助诊断的历史记录",
      icon: <FileText className="h-5 w-5" />,
      path: "/ai-diagnosis/records",
      badge: "新增",
      badgeColor: "bg-green-100 text-green-800",
    },
    {
      title: "模型训练",
      description: "训练、评估和部署医疗AI模型",
      icon: <Layers className="h-5 w-5" />,
      path: "/ai-model-training",
    },
    {
      title: "性能分析",
      description: "分析AI诊断模型的性能指标",
      icon: <BarChart2 className="h-5 w-5" />,
      path: "/ai-model/performance",
    },
    {
      title: "模型管理",
      description: "管理和部署AI模型版本",
      icon: <Settings className="h-5 w-5" />,
      path: "/ai-model/management",
    },
    {
      title: "数���集管理",
      description: "管理训练和验证数据集",
      icon: <Database className="h-5 w-5" />,
      path: "/ai-model/datasets",
    },
    {
      title: "异常监控",
      description: "监控模型预测异常和性能下降",
      icon: <AlertCircle className="h-5 w-5" />,
      path: "/ai-model/monitoring",
      badge: "重要",
      badgeColor: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "用户反馈",
      description: "查看医生对AI诊断的反馈",
      icon: <Users className="h-5 w-5" />,
      path: "/ai-model/feedback",
    },
  ]

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {navigationItems.map((item) => (
        <div
          key={item.path}
          className={cn(
            "relative p-6 rounded-lg border cursor-pointer transition-all duration-200",
            hoveredItem === item.path
              ? "border-medical-500 shadow-md bg-medical-50"
              : "border-gray-200 hover:border-medical-300 hover:shadow-sm",
          )}
          onClick={() => handleNavigate(item.path)}
          onMouseEnter={() => setHoveredItem(item.path)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "p-2 rounded-md",
                hoveredItem === item.path ? "bg-medical-100 text-medical-700" : "bg-gray-100 text-gray-600",
              )}
            >
              {item.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg">{item.title}</h3>
                {item.badge && (
                  <Badge className={cn("text-xs font-normal", item.badgeColor || "bg-blue-100 text-blue-800")}>
                    {item.badge}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            </div>
          </div>
          <div
            className={cn(
              "absolute bottom-0 left-0 h-1 bg-medical-500 transition-all duration-300",
              hoveredItem === item.path ? "w-full" : "w-0",
            )}
          />
        </div>
      ))}
    </div>
  )
}
