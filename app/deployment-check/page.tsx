"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle, Server, Globe, Database } from "lucide-react"

type CheckStatus = "pending" | "success" | "error" | "warning"

interface CheckItem {
  name: string
  status: CheckStatus
  message: string
  icon: React.ReactNode
}

export default function DeploymentCheck() {
  const [checks, setChecks] = useState<CheckItem[]>([
    {
      name: "环境变量",
      status: "pending",
      message: "检查中...",
      icon: <Database className="h-5 w-5" />,
    },
    {
      name: "API 连接",
      status: "pending",
      message: "检查中...",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      name: "服务器配置",
      status: "pending",
      message: "检查中...",
      icon: <Server className="h-5 w-5" />,
    },
  ])

  useEffect(() => {
    async function runChecks() {
      // 检查环境变量
      const envCheck = { ...checks[0] }
      try {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL
        if (appUrl) {
          envCheck.status = "success"
          envCheck.message = "环境变量已正确配置"
        } else {
          envCheck.status = "warning"
          envCheck.message = "部分环境变量可能未设置"
        }
      } catch (error) {
        envCheck.status = "error"
        envCheck.message = "环境变量检查失败"
      }

      // 检查 API 连接
      const apiCheck = { ...checks[1] }
      try {
        const res = await fetch("/api/system-info")
        if (res.ok) {
          apiCheck.status = "success"
          apiCheck.message = "API 连接正常"
        } else {
          apiCheck.status = "error"
          apiCheck.message = "API 连接失败"
        }
      } catch (error) {
        apiCheck.status = "error"
        apiCheck.message = "API 连接失败"
      }

      // 检查服务器配置
      const serverCheck = { ...checks[2] }
      try {
        const res = await fetch("/api/system-info")
        const data = await res.json()

        if (data.nodeVersion) {
          const major = Number.parseInt(data.nodeVersion.split(".")[0], 10)
          if (major >= 22) {
            serverCheck.status = "success"
            serverCheck.message = `Node.js ${data.nodeVersion} (兼容)`
          } else {
            serverCheck.status = "warning"
            serverCheck.message = `Node.js ${data.nodeVersion} (建议升级到 22.x)`
          }
        } else {
          serverCheck.status = "warning"
          serverCheck.message = "无法确定 Node.js 版本"
        }
      } catch (error) {
        serverCheck.status = "error"
        serverCheck.message = "服务器配置检查失败"
      }

      setChecks([envCheck, apiCheck, serverCheck])
    }

    runChecks()
  }, [])

  const getStatusIcon = (status: CheckStatus) => {
    switch (status) {
      case "success":
        return <CheckCircle className="text-green-500 h-5 w-5" />
      case "error":
        return <XCircle className="text-red-500 h-5 w-5" />
      case "warning":
        return <AlertCircle className="text-yellow-500 h-5 w-5" />
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-blue-500 animate-spin"></div>
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>部署检查</CardTitle>
          <CardDescription>验证应用部署环境是否正确配置</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {checks.map((check, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-md">{check.icon}</div>
                  <span className="font-medium">{check.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm ${
                      check.status === "success"
                        ? "text-green-600"
                        : check.status === "error"
                          ? "text-red-600"
                          : check.status === "warning"
                            ? "text-yellow-600"
                            : "text-blue-600"
                    }`}
                  >
                    {check.message}
                  </span>
                  {getStatusIcon(check.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
