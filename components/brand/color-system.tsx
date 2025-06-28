import { cn } from "@/lib/utils"

interface ColorSwatchProps {
  color: string
  name: string
  hex: string
  className?: string
}

function ColorSwatch({ color, name, hex, className }: ColorSwatchProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div
        className={cn("h-16 w-full rounded-lg mb-2", color)}
        style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}
      />
      <div className="text-sm font-medium">{name}</div>
      <div className="text-xs text-medical-600">{hex}</div>
    </div>
  )
}

interface ColorSystemProps {
  className?: string
}

export function ColorSystem({ className }: ColorSystemProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <div>
        <h3 className="text-lg font-medium mb-3">主色系统</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch color="bg-[#0066CC]" name="医枢蓝 (Primary)" hex="#0066CC" />
          <ColorSwatch color="bg-[#00A3E0]" name="智能蓝 (Secondary)" hex="#00A3E0" />
          <ColorSwatch color="bg-[#005A9C]" name="深度蓝 (Dark)" hex="#005A9C" />
          <ColorSwatch color="bg-[#E6F4FF]" name="浅蓝 (Light)" hex="#E6F4FF" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">辅助色系统</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <ColorSwatch color="bg-[#00CC99]" name="健康绿" hex="#00CC99" />
          <ColorSwatch color="bg-[#FF6B6B]" name="警示红" hex="#FF6B6B" />
          <ColorSwatch color="bg-[#FFB84D]" name="提醒橙" hex="#FFB84D" />
          <ColorSwatch color="bg-[#9966FF]" name="创新紫" hex="#9966FF" />
          <ColorSwatch color="bg-[#4D4D4D]" name="专业灰" hex="#4D4D4D" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">功能色系统</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch color="bg-[#28A745]" name="成功绿" hex="#28A745" />
          <ColorSwatch color="bg-[#DC3545]" name="错误红" hex="#DC3545" />
          <ColorSwatch color="bg-[#FFC107]" name="警告黄" hex="#FFC107" />
          <ColorSwatch color="bg-[#17A2B8]" name="信息蓝" hex="#17A2B8" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">渐变色系统</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ColorSwatch
            color="bg-gradient-to-r from-[#0066CC] to-[#00A3E0]"
            name="医枢主渐变"
            hex="Linear: #0066CC → #00A3E0"
          />
          <ColorSwatch
            color="bg-gradient-to-r from-[#00CC99] to-[#00A3E0]"
            name="健康渐变"
            hex="Linear: #00CC99 → #00A3E0"
          />
          <ColorSwatch
            color="bg-gradient-to-r from-[#9966FF] to-[#FF6B6B]"
            name="创新渐变"
            hex="Linear: #9966FF → #FF6B6B"
          />
        </div>
      </div>
    </div>
  )
}
