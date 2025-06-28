import { LogoShowcase } from "@/components/brand/logo-showcase"
import { CloudLogo } from "@/components/brand/cloud-logo"

export default function LogoPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold">品牌标识</h1>
        <p className="text-muted-foreground">YY Cloud³ 品牌标识指南与组件</p>
      </div>

      <div className="flex justify-center mb-12">
        <CloudLogo size="xl" />
      </div>

      <LogoShowcase />

      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">标识使用指南</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">正确用法</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>保持标识的比例和完整性</li>
              <li>确保标识周围有足够的空白空间</li>
              <li>在高对比度背景上使用标识</li>
              <li>使用官方颜色方案</li>
            </ul>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg border flex items-center justify-center">
                <CloudLogo size="md" />
              </div>
              <div className="bg-gray-100 p-4 rounded-lg border flex items-center justify-center">
                <CloudLogo size="md" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">错误用法</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>不要扭曲或变形标识</li>
              <li>不要改变标识的颜色</li>
              <li>不要在杂乱或低对比度背景上使用</li>
              <li>不要添加效果如阴影（除非是官方版本）</li>
            </ul>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex items-center justify-center opacity-50">
                <div className="transform skew-x-12">
                  <CloudLogo size="md" animated={false} />
                </div>
                <div className="absolute">
                  <div className="w-16 h-0.5 bg-red-500 rotate-45"></div>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex items-center justify-center opacity-50">
                <div className="grayscale">
                  <CloudLogo size="md" animated={false} />
                </div>
                <div className="absolute">
                  <div className="w-16 h-0.5 bg-red-500 rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
