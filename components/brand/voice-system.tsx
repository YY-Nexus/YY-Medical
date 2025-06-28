import { cn } from "@/lib/utils"
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card"

interface VoiceExampleProps {
  scenario: string
  standard: string
  example: string
  className?: string
}

function VoiceExample({ scenario, standard, example, className }: VoiceExampleProps) {
  return (
    <MedicalCard className={cn("", className)}>
      <MedicalCardHeader>
        <MedicalCardTitle className="text-base">{scenario}</MedicalCardTitle>
      </MedicalCardHeader>
      <MedicalCardContent className="space-y-3">
        <div>
          <div className="text-sm font-medium text-medical-800">标准</div>
          <div className="text-sm text-medical-600 bg-medical-50 p-2 rounded-md">{standard}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-medical-800">言语医枢³示例</div>
          <div className="text-sm text-medical-800 bg-[#E6F4FF] p-2 rounded-md border border-[#0066CC]/20">
            {example}
          </div>
        </div>
      </MedicalCardContent>
    </MedicalCard>
  )
}

interface VoiceSystemProps {
  className?: string
}

export function VoiceSystem({ className }: VoiceSystemProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <div>
        <h3 className="text-lg font-medium mb-3">品牌语音特性</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MedicalCard>
            <MedicalCardHeader>
              <MedicalCardTitle className="text-base">专业可信</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <p className="text-sm text-medical-600">
                使用准确的医学术语，提供基于证据的信息，同时保持清晰易懂。引用权威医学来源和研究数据，建立专业可信的形象。
              </p>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard>
            <MedicalCardHeader>
              <MedicalCardTitle className="text-base">温暖共情</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <p className="text-sm text-medical-600">
                表达对患者关切的理解和同理心，使用温暖、鼓励的语言。避免冷漠或机械的回应，确保每次互动都传达关怀。
              </p>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard>
            <MedicalCardHeader>
              <MedicalCardTitle className="text-base">清晰简洁</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <p className="text-sm text-medical-600">
                使用简明直接的语言传达复杂的医学概念，避免过度使用专业术语。确保信息易于理解，同时不失专业性。
              </p>
            </MedicalCardContent>
          </MedicalCard>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">语音示例</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VoiceExample
            scenario="问候语"
            standard="您好，我是AI医疗助手，有什么可以帮您？"
            example="您好，我是言语医枢³智能助手。很高兴能为您提供帮助，请告诉我您的健康问题或需求。"
          />

          <VoiceExample
            scenario="诊断反馈"
            standard="根据您的症状，可能是感冒。"
            example="根据您描述的症状组合，我的初步分析显示这与季节性感冒的典型表现相符（置信度93%）。不过，为了确保诊断准确，建议进一步检查。"
          />

          <VoiceExample
            scenario="用药建议"
            standard="您可以服用布洛芬缓解疼痛。"
            example="考虑到您的症状和病史，我建议可以适量服用布洛芬（如泰诺林）来缓解疼痛和发热。标准剂量为每次400mg，每6-8小时一次，请随餐服用以减少胃部不适。"
          />

          <VoiceExample
            scenario="安慰患者"
            standard="不要担心，这种情况很常见。"
            example="我理解这些症状可能让您感到担忧。请放心，根据临床数据，这种情况在您的年龄段和健康状况下是相对常见的，大多数患者在适当治疗后会在7-10天内恢复。我们会一起面对这个过程。"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">语音个性</h3>
        <MedicalCard>
          <MedicalCardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-base font-medium mb-2">语音特征</h4>
                <ul className="space-y-2 text-sm text-medical-600">
                  <li className="flex items-start">
                    <span className="text-[#0066CC] mr-2">•</span>
                    <span>语调：平稳、专业中带有温暖</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0066CC] mr-2">•</span>
                    <span>节奏：中等速度，重要信息时会适当放慢</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0066CC] mr-2">•</span>
                    <span>音色：中性偏温暖，清晰易懂</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0066CC] mr-2">•</span>
                    <span>情感：表达关怀和理解，但保持专业</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-base font-medium mb-2">语言特点</h4>
                <ul className="space-y-2 text-sm text-medical-600">
                  <li className="flex items-start">
                    <span className="text-[#0066CC] mr-2">•</span>
                    <span>使用"我们"而非"我"，强调协作关系</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0066CC] mr-2">•</span>
                    <span>提供信息时附带置信度，增强透明度</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0066CC] mr-2">•</span>
                    <span>使用医学术语时主动解释，确保理解</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0066CC] mr-2">•</span>
                    <span>在建议后提供理由，增强说服力</span>
                  </li>
                </ul>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>
      </div>
    </div>
  )
}
