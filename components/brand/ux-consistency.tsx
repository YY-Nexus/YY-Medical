import { cn } from "@/lib/utils"
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card"

interface UXPrincipleProps {
  title: string
  description: string
  className?: string
}

function UXPrinciple({ title, description, className }: UXPrincipleProps) {
  return (
    <MedicalCard className={cn("", className)}>
      <MedicalCardHeader>
        <MedicalCardTitle className="text-base">{title}</MedicalCardTitle>
      </MedicalCardHeader>
      <MedicalCardContent>
        <p className="text-sm text-medical-600">{description}</p>
      </MedicalCardContent>
    </MedicalCard>
  )
}

interface UXConsistencyProps {
  className?: string
}

export function UXConsistency({ className }: UXConsistencyProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <div>
        <h3 className="text-lg font-medium mb-3">用户体验原则</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UXPrinciple
            title="清晰透明"
            description="所有界面元素和交互都应清晰明了，避免歧义。AI决策过程应透明可解释，让用户理解系统是如何得出结论的。"
          />

          <UXPrinciple
            title="专业可靠"
            description="界面设计应体现医疗专业性，使用准确的医学术语和图标。系统响应应快速稳定，给用户以可靠的感受。"
          />

          <UXPrinciple
            title="以人为本"
            description="设计应以用户需求为中心，考虑不同用户群体（医生、患���、管理人员）的特点和需求，提供个性化的体验。"
          />

          <UXPrinciple
            title="无缝衔接"
            description="各功能模块之间应无缝衔接，用户在不同场景间切换时不应感到割裂，保持一致的交互逻辑和视觉风格。"
          />

          <UXPrinciple
            title="渐进引导"
            description="对于复杂功能，应采用渐进式引导，让用户逐步了解和掌握，避免信息过载和操作困难。"
          />

          <UXPrinciple
            title="情感共鸣"
            description="界面设计和交互应考虑用户的情感需求，在适当的场景中表达关怀和理解，建立情感连接。"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">视觉一致性</h3>
        <MedicalCard>
          <MedicalCardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-base font-medium mb-3">色彩应用</h4>
                <div className="space-y-2 text-sm text-medical-600">
                  <p>
                    <span className="font-medium text-medical-800">主色应用：</span>{" "}
                    医枢蓝(#0066CC)作为主色，用于主要按钮、重要信息高亮和品牌标识。
                  </p>
                  <p>
                    <span className="font-medium text-medical-800">辅助色应用：</span>{" "}
                    健康绿(#00CC99)用于正面反馈和健康状态，警示红(#FF6B6B)用于警告和错误提示。
                  </p>
                  <p>
                    <span className="font-medium text-medical-800">背景色：</span>{" "}
                    主要使用白色和浅蓝(#E6F4FF)作为背景，确保内容清晰可读。
                  </p>
                  <p>
                    <span className="font-medium text-medical-800">文本色：</span>{" "}
                    主要文本使用深灰(#4D4D4D)，次要文本使用中灰，确保足够对比度。
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-base font-medium mb-3">排版规范</h4>
                <div className="space-y-2 text-sm text-medical-600">
                  <p>
                    <span className="font-medium text-medical-800">字体：</span>{" "}
                    全系统统一使用无衬线字体，中文优先使用思源黑体，英文使用Inter。
                  </p>
                  <p>
                    <span className="font-medium text-medical-800">字号：</span>{" "}
                    标题使用18-24px，正文使用14-16px，注释和辅助文本使用12px。
                  </p>
                  <p>
                    <span className="font-medium text-medical-800">行高：</span>{" "}
                    标题行高1.2，正文行高1.5，确保良好的可读性。
                  </p>
                  <p>
                    <span className="font-medium text-medical-800">对齐：</span>{" "}
                    文本左对齐，数据和表格可居中对齐，保持一致的视觉节奏。
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-base font-medium mb-3">组件设计</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-medical-50 rounded-lg">
                  <p className="font-medium text-medical-800 mb-1">卡片组件</p>
                  <p className="text-sm text-medical-600">
                    所有卡片使用一致的圆角(8px)、阴影和边距(16px)，内容区域保持统一的内边距(16px)。
                  </p>
                </div>

                <div className="p-3 bg-medical-50 rounded-lg">
                  <p className="font-medium text-medical-800 mb-1">按钮组件</p>
                  <p className="text-sm text-medical-600">
                    主要按钮使用品牌蓝色填充，次要按钮使用白色填充配蓝色边框，禁用状态统一使用灰色。
                  </p>
                </div>

                <div className="p-3 bg-medical-50 rounded-lg">
                  <p className="font-medium text-medical-800 mb-1">表单组件</p>
                  <p className="text-sm text-medical-600">
                    输入框、下拉菜单等表单元素保持一致的高度(40px)、边框样式和焦点状态。
                  </p>
                </div>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">交互一致性</h3>
        <MedicalCard>
          <MedicalCardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-base font-medium mb-3">导航模式</h4>
                <div className="space-y-2 text-sm text-medical-600">
                  <p>
                    <span className="font-medium text-medical-800">主导航：</span>{" "}
                    使用左侧垂直导航栏，突出显示当前位置，分组相关功能。
                  </p>
                  <p>
                    <span className="font-medium text-medical-800">二级导航：</span> 使用顶部水平标签，保持层级清晰。
                  </p>
                  <p>
                    <span className="font-medium text-medical-800">移动端导航：</span>{" "}
                    使用底部导航栏，显示最常用的4-5个功能入口。
                  </p>
                  <p>
                    <span className="font-medium text-medical-800">面包屑：</span>{" "}
                    在复杂层级页面中使用面包屑导航，帮助用户定位和返回。
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-base font-medium mb-3">反馈机制</h4>
                <div className="space-y-2 text-sm text-medical-600">
                  <p>
                    <span className="font-medium text-medical-800">操作反馈：</span>{" "}
                    所有用户操作都应有明确的视觉反馈，如按钮点击效果、表单提交状态等。
                  </p>
                  <p>
                    <span className="font-medium text-medical-800">加载状态：</span>{" "}
                    使用统一的加载动画，显示进度和预计完成时间。
                  </p>
                  <p>
                    <span className="font-medium text-medical-800">成功/错误提示：</span>{" "}
                    使用一致的提示样式，成功提示使用绿色，错误提示使用红色。
                  </p>
                  <p>
                    <span className="font-medium text-medical-800">确认对话框：</span>{" "}
                    对于重要操作，使用统一的确认对话框样式，明确操作后果。
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-base font-medium mb-3">特殊交互模式</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-medical-50 rounded-lg">
                  <p className="font-medium text-medical-800 mb-1">AI诊断流程</p>
                  <p className="text-sm text-medical-600">
                    AI诊断过程应显示思考过程和置信度，使用统一的步骤指示器，让用户了解当前进度和后续步骤。
                  </p>
                </div>

                <div className="p-3 bg-medical-50 rounded-lg">
                  <p className="font-medium text-medical-800 mb-1">数据可视化</p>
                  <p className="text-sm text-medical-600">
                    所有图表使用一致的颜色编码和交互方式，确保数据易于理解和比较，支持缩放和筛选操作。
                  </p>
                </div>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>
      </div>
    </div>
  )
}
