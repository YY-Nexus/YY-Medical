import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

interface CertificationStatusBadgeProps {
  status: string
}

export function CertificationStatusBadge({ status }: CertificationStatusBadgeProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return {
          icon: <CheckCircle className="h-3 w-3" />,
          text: "已认证",
          className: "bg-green-100 text-green-800",
        }
      case "pending":
        return {
          icon: <Clock className="h-3 w-3" />,
          text: "待审核",
          className: "bg-yellow-100 text-yellow-800",
        }
      case "expired":
        return {
          icon: <AlertCircle className="h-3 w-3" />,
          text: "已过期",
          className: "bg-red-100 text-red-800",
        }
      default:
        return {
          icon: null,
          text: status,
          className: "bg-gray-100 text-gray-800",
        }
    }
  }

  const badge = getStatusBadge(status)

  return (
    <Badge variant="outline" className={badge.className}>
      {badge.icon}
      {badge.text}
    </Badge>
  )
}
