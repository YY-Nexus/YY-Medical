"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertTriangle, Shield } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface CheckItem {
  name: string
  status: string
  message: string
}

interface SecurityCheckProps {
  result?: {
    status: string
    items: CheckItem[]
  }
  isRunning: boolean
}

export function SecurityCheck({ result, isRunning }: SecurityCheckProps) {
  if (isRunning) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-center text-gray-500">正在进行安全检查...</p>
            <Progress value={35} className="w-full max-w-xs mt-4" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!result) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <Shield className="h-12 w-12 mb-2 opacity-30" />
            <p>尚未进行安全检查</p>
            <p className="text-sm mt-2">点击"开始检查"按钮开始全面安全检查</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">安全检查结果</h3>
            <div
              className={`px-2 py-1 rounded text-xs font-medium ${
                result.status === "success"
                  ? "bg-green-100 text-green-800"
                  : result.status === "warning"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {result.status === "success" ? "通过" : result.status === "warning" ? "警告" : "错误"}
            </div>
          </div>

          <div className="divide-y">
            {result.items.map((item, index) => (
              <div key={index} className="py-3 flex items-start">
                <div className="mr-3 mt-0.5">
                  {item.status === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : item.status === "warning" ? (
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
