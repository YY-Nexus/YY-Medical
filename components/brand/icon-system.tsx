import type React from "react"
import { cn } from "@/lib/utils"
import {
  Brain,
  HeartPulse,
  Microscope,
  Pill,
  Stethoscope,
  Dna,
  Activity,
  Clipboard,
  FileText,
  MessageSquare,
  Shield,
  Users,
  Clock,
  Calendar,
} from "lucide-react"

interface IconDisplayProps {
  icon: React.ReactNode
  name: string
  description: string
  className?: string
}

function IconDisplay({ icon, name, description, className }: IconDisplayProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="h-16 w-16 flex items-center justify-center bg-medical-50 rounded-lg mb-2 text-medical-800">
        {icon}
      </div>
      <div className="text-sm font-medium">{name}</div>
      <div className="text-xs text-medical-600 mt-1">{description}</div>
    </div>
  )
}

interface IconSystemProps {
  className?: string
}

export function IconSystem({ className }: IconSystemProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <div>
        <h3 className="text-lg font-medium mb-3">核心图标</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <IconDisplay icon={<Brain size={32} />} name="AI诊断" description="代表系统的AI诊断核心能力" />
          <IconDisplay icon={<HeartPulse size={32} />} name="健康监测" description="代表健康数据监测功能" />
          <IconDisplay icon={<Microscope size={32} />} name="医学研究" description="代表医学研究和分析功能" />
          <IconDisplay icon={<Stethoscope size={32} />} name="临床决策" description="代表临床决策支持系统" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">功能图标</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <IconDisplay icon={<Pill size={32} />} name="药物管理" description="药物和处方管理功能" />
          <IconDisplay icon={<Dna size={32} />} name="基因分析" description="基因组学和个性化医疗" />
          <IconDisplay icon={<Activity size={32} />} name="生命体征" description="生命体征监测和分析" />
          <IconDisplay icon={<Clipboard size={32} />} name="病历管理" description="电子病历和病历管理" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">界面图标</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          <IconDisplay icon={<FileText size={24} />} name="文档" description="报告和文档" />
          <IconDisplay icon={<MessageSquare size={24} />} name="消息" description="通信和消息" />
          <IconDisplay icon={<Shield size={24} />} name="安全" description="数据安全和隐私" />
          <IconDisplay icon={<Users size={24} />} name="用户" description="用户和权限管理" />
          <IconDisplay icon={<Clock size={24} />} name="时间" description="时间和日程安排" />
          <IconDisplay icon={<Calendar size={24} />} name="日历" description="预约和日历" />
        </div>
      </div>
    </div>
  )
}
