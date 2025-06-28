import { cn } from "@/lib/utils"
import Image from "next/image"

interface IllustrationDisplayProps {
  src: string
  name: string
  description: string
  className?: string
}

function IllustrationDisplay({ src, name, description, className }: IllustrationDisplayProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="h-48 w-full rounded-lg mb-2 overflow-hidden bg-medical-50 relative">
        {/* 使用Next.js的Image组件替代img标签 */}
        <Image
          src={src || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-contain p-2"
          quality={80}
        />
      </div>
      <div className="text-sm font-medium mt-2">{name}</div>
      <div className="text-xs text-medical-600">{description}</div>
    </div>
  )
}

interface IllustrationSystemProps {
  className?: string
}

export function IllustrationSystem({ className }: IllustrationSystemProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <div>
        <h3 className="text-lg font-medium mb-3">品牌插图风格</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <IllustrationDisplay
            src="/medical-team-blue.png"
            name="医疗场景插图"
            description="展示医生和患者互动的医疗场景，使用品牌蓝色渐变"
          />
          <IllustrationDisplay
            src="/interconnected-health.png"
            name="医疗科技抽象插图"
            description="展示医疗科技的抽象概念，使用品牌蓝色和绿色"
          />
          <IllustrationDisplay
            src="/medical-data-blue-gradient.png"
            name="3D数据可视化插图"
            description="展示医疗数据的3D可视化，使用品牌蓝色渐变"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">应用场景插图</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IllustrationDisplay
            src="/ai-doctor-consult.png"
            name="AI诊疗场景"
            description="展示AI医生与患者交流的场景，使用品牌蓝色和紫色渐变"
          />
          <IllustrationDisplay
            src="/medical-analysis-blue-dashboard.png"
            name="数据分析场景"
            description="展示医疗数据分析仪表板，使用品牌蓝色渐变"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">图标插图风格</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <IllustrationDisplay
            src="/minimalist-blue-brain.png"
            name="极简大脑图标"
            description="极简风格的大脑图标，使用品牌蓝色渐变"
          />
          <IllustrationDisplay
            src="/minimalist-heart-monitor.png"
            name="极简心电图图标"
            description="极简风格的心电图图标，使用品牌蓝色和绿色"
          />
          <IllustrationDisplay
            src="/abstract-dna-helix.png"
            name="极简DNA图标"
            description="极简风格的DNA图标，使用品牌蓝色和紫色"
          />
          <IllustrationDisplay
            src="/blue-gradient-medical-cross.png"
            name="极简医疗十字图标"
            description="极简风格的医疗十字图标，使用品牌蓝色渐变"
          />
        </div>
      </div>
    </div>
  )
}
