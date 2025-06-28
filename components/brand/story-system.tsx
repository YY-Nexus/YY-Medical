import { cn } from "@/lib/utils"
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card"
import Image from "next/image"

interface StoryScenarioProps {
  title: string
  description: string
  image: string
  className?: string
}

function StoryScenario({ title, description, image, className }: StoryScenarioProps) {
  return (
    <MedicalCard className={cn("overflow-hidden", className)}>
      <div className="h-48 relative">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <MedicalCardHeader>
        <MedicalCardTitle className="text-base">{title}</MedicalCardTitle>
      </MedicalCardHeader>
      <MedicalCardContent>
        <p className="text-sm text-medical-600">{description}</p>
      </MedicalCardContent>
    </MedicalCard>
  )
}

interface StorySystemProps {
  className?: string
}

export function StorySystem({ className }: StorySystemProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <div>
        <h3 className="text-lg font-medium mb-3">品牌故事</h3>
        <MedicalCard>
          <MedicalCardContent className="p-6">
            <h4 className="text-base font-medium mb-3">言语「医枢³」的诞生</h4>
            <div className="prose prose-sm text-medical-600 max-w-none">
              <p>
                言语「医枢³」智能诊疗系统诞生于一个简单而深刻的愿景：将尖端AI技术与医学专业知识和人文关怀相结合，创造一个真正以患者为中心的医疗体验。
              </p>
              <p>
                这个故事始于三位来自不同背景的创始人的相遇：一位资深神经科医生，一位AI研究科学家，和一位曾因误诊而延误治疗的患者。他们共同认识到，现代医疗系统虽然技术先进，却常常缺乏高效的信息整合和人文关怀。
              </p>
              <p>
                "医枢"这个名字代表着医疗信息的中心枢纽，而"言语"则强调了通过语言智能建立医患沟通的桥梁。数字"³"象征着系统的三大核心价值：精准诊断(AI_Dx)、数据安全(Data_Safe)和情感关怀(Empathy_Care)。
              </p>
              <p>
                经过五年的研发和临床验证，言语「医枢³」从一个实验室概念发展成为一个全面的智能诊疗平台，现已在全国超过300家医疗机构部署，每天辅助医生进行超过10,000次诊断，准确率达到99.3%，同时显著提升了患者满意度和医疗效率。
              </p>
              <p>
                我们的使命是通过技术创新和人文关怀，重新定义医疗体验，让每一位患者都能获得精准、安全、有温度的医疗服务。
              </p>
            </div>
          </MedicalCardContent>
        </MedicalCard>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">核心价值观</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MedicalCard>
            <MedicalCardHeader>
              <MedicalCardTitle className="text-base">精准可靠</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <p className="text-sm text-medical-600">
                我们坚持医学的严谨性和科学性，确保每一次诊断和建议都基于最新的医学证据和精确的数据分析。我们的AI模型经过严格的临床验证，诊断准确率达到99.3%，超越行业标准。
              </p>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard>
            <MedicalCardHeader>
              <MedicalCardTitle className="text-base">安全透明</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <p className="text-sm text-medical-600">
                患者数据安全是我们的首要责任。我们采用量子级加密技术保护所有医疗数据，符合HIPAA和GDPR等全球最严格的隐私标准。同时，我们确保AI决策过程的透明度，让医生和患者理解并信任每一个诊断建议。
              </p>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard>
            <MedicalCardHeader>
              <MedicalCardTitle className="text-base">情感共鸣</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <p className="text-sm text-medical-600">
                技术再先进，也不能替代人文关怀。我们的系统融合了情感计算技术，能够识别患者的情绪状态，并以适当的方式回应，提供个性化的心理支持。我们相信，真正的医疗不仅是治疗疾病，更是关怀人。
              </p>
            </MedicalCardContent>
          </MedicalCard>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">使用场景</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StoryScenario
            title="基层医疗辅助诊断"
            image="/placeholder.svg?height=200&width=400&query=rural%20doctor%20using%20tablet%20with%20AI%20medical%20system"
            description="在基层医疗机构，医生可以使用言语「医枢³」辅助诊断复杂疾病，提高诊断准确率，减少转诊率。系统会根据患者症状、体征和检查结果，提供可能的诊断和处理建议，同时考虑当地医疗资源情况。"
          />

          <StoryScenario
            title="急诊分诊决策支持"
            image="/placeholder.svg?height=200&width=400&query=emergency%20room%20triage%20with%20AI%20medical%20system"
            description="在急诊科，言语「医枢��」可以快速分析患者症状和生命体征，协助医护人员进行分诊决策，识别潜在的危重症患者，优化医疗资源分配，提高急诊效率和安全性。"
          />

          <StoryScenario
            title="远程医疗咨询"
            image="/placeholder.svg?height=200&width=400&query=telemedicine%20consultation%20with%20AI%20assistant"
            description="在偏远地区或行动不便的患者家中，言语「医枢³」可以通过远程医疗设备，收集患者健康数据，进行初步评估，并连接专科医生进行远程会诊，打破地域限制，提供及时的医疗服务。"
          />

          <StoryScenario
            title="慢病管理与健康教育"
            image="/placeholder.svg?height=200&width=400&query=chronic%20disease%20management%20with%20AI%20health%20coach"
            description="对于慢性病患者，言语「医枢³」可以持续监测健康指标，提供个性化的健康管理建议，定期评估治疗效果，并通过情感计算技术，提供心理支持和健康教育，提高患者依从性和生活质量。"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">品牌承诺</h3>
        <MedicalCard>
          <MedicalCardContent className="p-6">
            <div className="prose prose-sm text-medical-600 max-w-none">
              <p className="font-medium text-medical-800">言语「医枢³」承诺：</p>
              <ul>
                <li>始终将患者健康和安全放在首位</li>
                <li>持续提升AI诊断的准确性和可靠性</li>
                <li>严格保护患者数据隐私和安全</li>
                <li>保持医疗决策过程的透明度和可解释性</li>
                <li>将先进技术与人文关怀相结合，提供有温度的医疗服务</li>
                <li>支持医生工作，而非取代医生的专业判断</li>
                <li>持续学习和改进，跟进最新医学研究和技术发展</li>
              </ul>
            </div>
          </MedicalCardContent>
        </MedicalCard>
      </div>
    </div>
  )
}
