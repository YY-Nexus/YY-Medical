"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function NodeVersionCheck() {
  const [nodeVersion, setNodeVersion] = useState<string | null>(null)
  const [npmVersion, setNpmVersion] = useState<string | null>(null)
  const [isCompatible, setIsCompatible] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkVersions() {
      try {
        const res = await fetch("/api/system-info")
        const data = await res.json()

        setNodeVersion(data.nodeVersion)
        setNpmVersion(data.npmVersion)

        // 检查 Node.js 版本是否兼容
        const major = Number.parseInt(data.nodeVersion.split(".")[0], 10)
        setIsCompatible(major >= 22)

        setIsLoading(false)
      } catch (error) {
        console.error("获取系统信息失败:", error)
        setIsLoading(false)
      }
    }

    checkVersions()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>系统兼容性检查</CardTitle>
          <CardDescription>检查当前环境是否与应用要求兼容</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Node.js 版本:</span>
            <span className="flex items-center">
              {nodeVersion}
              {isCompatible === true && <CheckCircle className="ml-2 text-green-500 h-5 w-5" />}
              {isCompatible === false && <XCircle className="ml-2 text-red-500 h-5 w-5" />}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">npm 版本:</span>
            <span>{npmVersion}</span>
          </div>

          <div className="mt-4 p-4 rounded-md bg-gray-50">
            {isCompatible === true ? (
              <p className="text-green-600 flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                环境兼容，可以正常运行应用
              </p>
            ) : (
              <p className="text-red-600 flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                需要 Node.js 22.x 或更高版本
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">推荐使用 Node.js 22.x 和 npm 10.x 以获得最佳体验</p>
        </CardFooter>
      </Card>
    </div>
  )
}
