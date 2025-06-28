import { Laptop, Smartphone, Tablet, Monitor, HardDrive } from "lucide-react"

interface DeviceIconProps {
  type: string
  className?: string
}

export function DeviceIcon({ type, className = "h-5 w-5" }: DeviceIconProps) {
  switch (type.toLowerCase()) {
    case "desktop":
      return <Monitor className={className} />
    case "mobile":
      return <Smartphone className={className} />
    case "tablet":
      return <Tablet className={className} />
    case "laptop":
      return <Laptop className={className} />
    default:
      return <HardDrive className={className} />
  }
}
