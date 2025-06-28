import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DeviceIcon } from "./device-icon"
import { Clock, MapPin, Globe, Info } from "lucide-react"

interface DeviceDetailsProps {
  device: {
    id: string
    type: string
    name: string
    browser: string
    os: string
    ip: string
    location: string
    lastActive: string
    isCurrentDevice: boolean
  }
}

export function DeviceDetails({ device }: DeviceDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <DeviceIcon type={device.type} className="h-6 w-6 mr-2 text-primary" />
          <div>
            <CardTitle>{device.name}</CardTitle>
            <CardDescription>
              {device.browser} • {device.os}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Globe className="h-4 w-4 mr-2 text-gray-500" />
            <div>
              <p className="text-sm font-medium">IP地址</p>
              <p className="text-sm text-gray-500">{device.ip}</p>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            <div>
              <p className="text-sm font-medium">位置</p>
              <p className="text-sm text-gray-500">{device.location}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <div>
              <p className="text-sm font-medium">最后活动</p>
              <p className="text-sm text-gray-500">{device.lastActive}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Info className="h-4 w-4 mr-2 text-gray-500" />
            <div>
              <p className="text-sm font-medium">状态</p>
              <p className="text-sm text-gray-500">{device.isCurrentDevice ? "当前设备" : "活跃"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
