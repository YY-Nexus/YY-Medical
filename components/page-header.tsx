import {
  Brain,
  Users,
  Stethoscope,
  Pill,
  HeartPulse,
  Microscope,
  Lock,
  Smartphone,
  FileText,
  Video,
  BarChart3,
  Server,
  Globe,
  Activity,
} from "lucide-react"

type IconName =
  | "brain"
  | "users"
  | "stethoscope"
  | "pill"
  | "heartPulse"
  | "microscope"
  | "lock"
  | "smartphone"
  | "fileText"
  | "video"
  | "barChart3"
  | "server"
  | "globe"
  | "activity"

interface PageHeaderProps {
  title: string
  description: string
  icon?: IconName
  breadcrumbs?: Array<{ label: string; href: string }>
}

const iconComponents = {
  brain: Brain,
  users: Users,
  stethoscope: Stethoscope,
  pill: Pill,
  heartPulse: HeartPulse,
  microscope: Microscope,
  lock: Lock,
  smartphone: Smartphone,
  fileText: FileText,
  video: Video,
  barChart3: BarChart3,
  server: Server,
  globe: Globe,
  activity: Activity,
}

export function PageHeader({ title, description, icon, breadcrumbs }: PageHeaderProps) {
  const IconComponent = icon ? iconComponents[icon] : null

  return (
    <div className="flex flex-col space-y-2 mb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="mx-1">/</span>}
              <a href={crumb.href} className="hover:text-medical-600 transition-colors">
                {crumb.label}
              </a>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        {IconComponent && <IconComponent className="h-8 w-8 text-medical-600" />}
        <h1 className="text-3xl font-bold text-medical-900">{title}</h1>
      </div>
      <p className="text-lg text-medical-600">{description}</p>
    </div>
  )
}
