import type React from "react"
import { cn } from "@/lib/utils"
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card"
import { Download } from "lucide-react"
import { MedicalButton } from "@/components/ui/medical-button"

interface AssetItemProps {
  title: string
  description: string
  type: string
  size?: string
  preview: React.ReactNode
  className?: string
}

function AssetItem({ title, description, type, size, preview, className }: AssetItemProps) {
  return (
    <MedicalCard className={cn("", className)}>
      <div className="h-40 bg-medical-50 flex items-center justify-center p-4 border-b border-medical-100">
        {preview}
      </div>
      <MedicalCardHeader>
        <MedicalCardTitle className="text-base">{title}</MedicalCardTitle>
      </MedicalCardHeader>
      <MedicalCardContent className="space-y-3">
        <p className="text-sm text-medical-600">{description}</p>
        <div className="flex items-center justify-between">
          <div className="text-xs text-medical-500">
            {type} {size && `• ${size}`}
          </div>
          <MedicalButton size="sm" variant="outline" className="h-8">
            <Download className="h-4 w-4 mr-1" /> 下载
          </MedicalButton>
        </div>
      </MedicalCardContent>
    </MedicalCard>
  )
}

interface AssetManagementProps {
  className?: string
}

export function AssetManagement({ className }: AssetManagementProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <div>
        <h3 className="text-lg font-medium mb-3">品牌标识资产</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AssetItem
            title="主标志 - 全彩版"
            description="言语「医枢³」智能诊疗系统完整标志，适用于白色或浅色背景。"
            type="SVG, PNG, PDF"
            size="多种尺寸"
            preview={
              <div className="flex items-center justify-center h-full w-full">
                <div className="h-16 w-16 rounded-full bg-medical-gradient flex items-center justify-center">
                  <span className="text-white font-bold text-lg">YY³</span>
                </div>
              </div>
            }
          />

          <AssetItem
            title="主标志 - 单色版"
            description="言语「医枢³」智能诊疗系统单色标志，适用于单色印刷或特殊应用场景。"
            type="SVG, PNG, PDF"
            size="多种尺寸"
            preview={
              <div className="flex items-center justify-center h-full w-full">
                <div className="h-16 w-16 rounded-full bg-medical-800 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">YY³</span>
                </div>
              </div>
            }
          />

          <AssetItem
            title="图标 - 应用图标"
            description="言语「医枢³」应用图标，适用于移动应用、桌面应用和网站favicon。"
            type="SVG, PNG, ICO"
            size="多种尺寸"
            preview={
              <div className="flex items-center justify-center h-full w-full">
                <div className="h-16 w-16 rounded-xl bg-medical-gradient flex items-center justify-center">
                  <span className="text-white font-bold text-lg">YY³</span>
                </div>
              </div>
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">品牌图形资产</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AssetItem
            title="品牌图案 - 波形"
            description="代表语音和医疗数据的波形图案，可用于背景、装饰元素等。"
            type="SVG, PNG"
            size="可缩放"
            preview={
              <div className="flex items-center justify-center h-full w-full">
                <div className="h-8 w-32 bg-medical-gradient rounded-full overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-4 flex items-center">
                      <div className="w-1 h-1 bg-white rounded-full mx-0.5"></div>
                      <div className="w-1 h-2 bg-white rounded-full mx-0.5"></div>
                      <div className="w-1 h-3 bg-white rounded-full mx-0.5"></div>
                      <div className="w-1 h-4 bg-white rounded-full mx-0.5"></div>
                      <div className="w-1 h-3 bg-white rounded-full mx-0.5"></div>
                      <div className="w-1 h-2 bg-white rounded-full mx-0.5"></div>
                      <div className="w-1 h-1 bg-white rounded-full mx-0.5"></div>
                      <div className="w-1 h-2 bg-white rounded-full mx-0.5"></div>
                      <div className="w-1 h-3 bg-white rounded-full mx-0.5"></div>
                      <div className="w-1 h-2 bg-white rounded-full mx-0.5"></div>
                      <div className="w-1 h-1 bg-white rounded-full mx-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          <AssetItem
            title="品牌图案 - 六边形网格"
            description="代表医疗数据网络的六边形网格图案，可用于背景、装饰元素等。"
            type="SVG, PNG"
            size="可缩放"
            preview={
              <div className="flex items-center justify-center h-full w-full">
                <div className="grid grid-cols-3 gap-1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="h-8 w-8 border-2 border-[#0066CC] rounded-lg opacity-50"></div>
                  ))}
                </div>
              </div>
            }
          />

          <AssetItem
            title="品牌图案 - 3D元素"
            description="代表三维精准的3D立体元素，可用于特殊场景和宣传材料。"
            type="SVG, PNG"
            size="可缩放"
            preview={
              <div className="flex items-center justify-center h-full w-full">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 bg-[#0066CC] rounded-lg opacity-30 transform translate-x-2 translate-y-2"></div>
                  <div className="absolute inset-0 bg-[#00A3E0] rounded-lg opacity-60 transform translate-x-1 translate-y-1"></div>
                  <div className="absolute inset-0 bg-medical-gradient rounded-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">³</span>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">品牌模板资产</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AssetItem
            title="演示文稿模板"
            description="言语「医枢³」品牌演示文稿模板，包含多种幻灯片布局和元素。"
            type="PPTX, KEY"
            size="16:9"
            preview={
              <div className="flex items-center justify-center h-full w-full">
                <div className="h-24 w-40 bg-white border border-medical-200 rounded-md flex flex-col">
                  <div className="h-6 bg-medical-gradient w-full rounded-t-md"></div>
                  <div className="flex-1 p-2">
                    <div className="h-2 w-3/4 bg-medical-200 rounded-full mb-1"></div>
                    <div className="h-2 w-1/2 bg-medical-200 rounded-full mb-1"></div>
                    <div className="h-2 w-2/3 bg-medical-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            }
          />

          <AssetItem
            title="文档模板"
            description="言语「医枢³」品牌文档模板，包含封面、页眉、页脚和多种页面布局。"
            type="DOCX, PDF"
            size="A4"
            preview={
              <div className="flex items-center justify-center h-full w-full">
                <div className="h-32 w-24 bg-white border border-medical-200 rounded-md flex flex-col">
                  <div className="h-8 bg-medical-gradient w-full rounded-t-md flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-white flex items-center justify-center">
                      <span className="text-[#0066CC] font-bold text-[8px]">YY³</span>
                    </div>
                  </div>
                  <div className="flex-1 p-2">
                    <div className="h-1 w-full bg-medical-200 rounded-full mb-1"></div>
                    <div className="h-1 w-full bg-medical-200 rounded-full mb-1"></div>
                    <div className="h-1 w-3/4 bg-medical-200 rounded-full mb-1"></div>
                    <div className="h-1 w-full bg-medical-200 rounded-full mb-1"></div>
                    <div className="h-1 w-full bg-medical-200 rounded-full mb-1"></div>
                    <div className="h-1 w-1/2 bg-medical-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">品牌资产使用指南</h3>
        <MedicalCard>
          <MedicalCardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-base font-medium mb-3">标志使用规范</h4>
                <ul className="space-y-2 text-sm text-medical-600 list-disc pl-5">
                  <li>标志周围应保留足够的空白区域，至少为标志高度的1/4</li>
                  <li>不得变形、旋转或改变标志的颜色</li>
                  <li>不得在复杂背景上使用标志，应确保标志清晰可辨</li>
                  <li>最小使用尺寸：印刷品中不小于15mm宽，数字媒体中不小于60px宽</li>
                </ul>
              </div>

              <div>
                <h4 className="text-base font-medium mb-3">色彩使用规范</h4>
                <ul className="space-y-2 text-sm text-medical-600 list-disc pl-5">
                  <li>主色医枢蓝(#0066CC)应用于品牌标识和主要视觉元素</li>
                  <li>辅助色应按照规定的场景使用，不应喧宾夺主</li>
                  <li>在印刷品中，应使用CMYK色值，确保色彩还原准确</li>
                  <li>在特殊场合可使用单色版标志，但应遵循单色版使用规范</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-base font-medium mb-3">资产获取与更新</h4>
              <div className="p-4 bg-medical-50 rounded-lg text-sm text-medical-600">
                <p className="mb-2">
                  所有品牌资产均可从品牌资产管理平台获取最新版本。如需特殊格式或定制资产，请联系品牌管理团队。
                </p>
                <p>品牌资产定期更新，请确保使用最新版本。更新通知将通过邮件发送给所有注册用户。</p>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>
      </div>
    </div>
  )
}
