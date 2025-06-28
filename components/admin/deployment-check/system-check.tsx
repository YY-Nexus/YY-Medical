"use client"

import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"

interface CheckItem {
  name: string
  status: string
  message: string
}

interface SystemCheckResult {
  status: string
  timestamp: string
  items: CheckItem[]
}

interface SystemCheckProps {
  result?: SystemCheckResult
  isRunning: boolean
}

export function SystemCheck({ result, isRunning }: SystemCheckProps) {
  if (isRunning) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-500">正在检查系统状态...</p>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="text-center p-8 text-gray-500">
        <p>尚未运行系统检查</p>
        <p className="text-sm mt-2">点击"开始检查"按钮开始全面系统检查</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {result.items.map((item, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-start p-4">
              <div className="mr-4 mt-1">
                {item.status === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : item.status === "warning" ? (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.message}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
