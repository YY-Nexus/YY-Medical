"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Clock,
  MapPin,
  Info,
  LogOut,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

// 设备类型定义
interface Device {
  id: string
  type: "desktop" | "mobile" | "tablet" | "other"
  name: string
  browser: string
  os: string
  ip: string
  location: string
  lastActive: string
  isCurrentDevice: boolean
}

// 模拟设备数据
const mockDevices: Device[] = [
  {
    id: "device-1",
    type: "desktop",
    name: "Windows PC",
    browser: "Chrome 98.0.4758",
    os: "Windows 11",
    ip: "192.168.1.1",
    location: "北京, 中国",
    lastActive: "当前活跃",
    isCurrentDevice: true,
  },
  {
    id: "device-2",
    type: "mobile",
    name: "iPhone 13",
    browser: "Safari 15.4",
    os: "iOS 15.4",
    ip: "192.168.1.2",
    location: "上海, 中国",
    lastActive: "10分钟前",
    isCurrentDevice: false,
  },
  {
    id: "device-3",
    type: "tablet",
    name: "iPad Pro",
    browser: "Safari 15.3",
    os: "iPadOS 15.3",
    ip: "192.168.1.3",
    location: "广州, 中国",
    lastActive: "1小时前",
    isCurrentDevice: false,
  },
  {
    id: "device-4",
    type: "desktop",
    name: "MacBook Pro",
    browser: "Firefox 97.0",
    os: "macOS 12.3",
    ip: "192.168.1.4",
    location: "深圳, 中国",
    lastActive: "3小时前",
    isCurrentDevice: false,
  },
]

export function LoginDevices() {
  const [devices, setDevices] = useState<Device[]>(mockDevices)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showLogoutAllDialog, setShowLogoutAllDialog] = useState(false)
  const [logoutSuccess, setLogoutSuccess] = useState<string | null>(null)
  const { toast } = useToast()

  // 获取设备图标
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "desktop":
        return <Monitor className="h-6 w-6 text-blue-500" />
      case "mobile":
        return <Smartphone className="h-6 w-6 text-green-500" />
      case "tablet":
        return <Tablet className="h-6 w-6 text-purple-500" />
      default:
        return <Laptop className="h-6 w-6 text-gray-500" />
    }
  }

  // 登出单个设备
  const handleLogoutDevice = (device: Device) => {
    if (device.isCurrentDevice) {
      // 当前设备需要特殊处理，通常会重定向到登录页面
      toast({
        title: "无法登出当前设备",
        description: "请使用正常的退出登录功能登出当前设备",
        variant: "destructive",
      })
      return
    }

    setSelectedDevice(device)
    setShowLogoutDialog(true)
  }

  // 确认登出设备
  const confirmLogoutDevice = async () => {
    if (!selectedDevice) return

    setIsLoading(true)
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 更新设备列表
      setDevices(devices.filter((d) => d.id !== selectedDevice.id))
      setLogoutSuccess(`已成功登出设备: ${selectedDevice.name}`)

      toast({
        title: "设备已登出",
        description: `已成功登出设备: ${selectedDevice.name}`,
        variant: "default",
      })

      setShowLogoutDialog(false)
      setSelectedDevice(null)
    } catch (error) {
      toast({
        title: "操作失败",
        description: "登出设备时发生错误，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 登出所有其他设备
  const handleLogoutAllDevices = () => {
    setShowLogoutAllDialog(true)
  }

  // 确认登出所有其他设备
  const confirmLogoutAllDevices = async () => {
    setIsLoading(true)
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 只保留当前设备
      const currentDevice = devices.find((d) => d.isCurrentDevice)
      setDevices(currentDevice ? [currentDevice] : [])
      setLogoutSuccess("已成功登出所有其他设备")

      toast({
        title: "操作成功",
        description: "已成功登出所有其他设备",
        variant: "default",
      })

      setShowLogoutAllDialog(false)
    } catch (error) {
      toast({
        title: "操作失败",
        description: "登出所有设备时发生错误，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>登录设备</CardTitle>
          <CardDescription>查看和管理当前登录的设备</CardDescription>
        </div>
        <Button
          variant="outline"
          onClick={handleLogoutAllDevices}
          disabled={devices.filter((d) => !d.isCurrentDevice).length === 0}
        >
          登出所有其他设备
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {logoutSuccess && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">操作成功</AlertTitle>
            <AlertDescription className="text-green-700">{logoutSuccess}</AlertDescription>
          </Alert>
        )}

        {devices.length === 0 ? (
          <div className="text-center py-6">
            <Info className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">没有找到登录设备信息</p>
          </div>
        ) : (
          <div className="space-y-4">
            {devices.map((device) => (
              <div
                key={device.id}
                className={`flex items-start p-4 rounded-lg border ${
                  device.isCurrentDevice ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
                }`}
              >
                <div className="mr-4 mt-1">{getDeviceIcon(device.type)}</div>
                <div className="flex-grow">
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900">{device.name}</h3>
                    {device.isCurrentDevice && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">当前设备</span>
                    )}
                  </div>
                  <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Info className="h-3.5 w-3.5 mr-1.5" />
                      <span>
                        {device.browser} • {device.os}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1.5" />
                      <span>
                        {device.ip} • {device.location}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                      <span>{device.lastActive}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLogoutDevice(device)}
                    disabled={isLoading}
                    className={device.isCurrentDevice ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    登出
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 text-sm text-gray-500 flex items-start">
          <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
          <p>
            如果您发现任何可疑的登录活动，请立即登出该设备并修改您的密码。
            为了保障账号安全，建议定期检查登录设备并清理不需要的会话。
          </p>
        </div>
      </CardContent>

      {/* 登出单个设备确认对话框 */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认登出设备</DialogTitle>
            <DialogDescription>您确定要登出以下设备吗？该设备将需要重新登录才能访问系统。</DialogDescription>
          </DialogHeader>

          {selectedDevice && (
            <div className="flex items-center p-3 bg-gray-50 rounded-md">
              {getDeviceIcon(selectedDevice.type)}
              <div className="ml-3">
                <p className="font-medium">{selectedDevice.name}</p>
                <p className="text-sm text-gray-500">
                  {selectedDevice.browser} • {selectedDevice.location}
                </p>
              </div>
            </div>
          )}

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>注意</AlertTitle>
            <AlertDescription>此操作将立即终止该设备的会话，可能会中断正在进行的操作。</AlertDescription>
          </Alert>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={confirmLogoutDevice} disabled={isLoading}>
              {isLoading ? "处理中..." : "确认登出"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 登出所有设备确认对话框 */}
      <Dialog open={showLogoutAllDialog} onOpenChange={setShowLogoutAllDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>登出所有其他设备</DialogTitle>
            <DialogDescription>您确定要登出所有其他设备吗？这些设备将需要重新登录才能访问系统。</DialogDescription>
          </DialogHeader>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>警告</AlertTitle>
            <AlertDescription>此操作将立即终止除当前设备外的所有会话，可能会中断正在进行的操作。</AlertDescription>
          </Alert>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutAllDialog(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={confirmLogoutAllDevices} disabled={isLoading}>
              {isLoading ? "处理中..." : "确认登出所有设备"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
