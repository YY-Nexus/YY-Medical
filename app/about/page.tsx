import type { Metadata } from "next"
import { BrandLogo } from "@/components/brand/logo"
import { BrandFormula } from "@/components/brand/formula"
import { BrandSlogan } from "@/components/brand/slogan"
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card"

export const metadata: Metadata = {
  title: "关于我们 | 言语医枢³智能诊疗系统",
  description: "了解言语医枢³智能诊疗系统的品牌理念、技术优势和行业适配策略",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">关于言语「 医枢³」</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <MedicalCard>
          <MedicalCardHeader>
            <MedicalCardTitle>品牌介绍</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="flex justify-center mb-6">
              <BrandLogo />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-2">中文全称</h3>
                <p className="text-medical-800">言语「 医枢³」智能诊疗系统</p>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">英文全称</h3>
                <p className="text-medical-800">YanYu MediNexus³ AI Diagnostic System</p>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">缩写</h3>
                <p className="text-medical-800">YY³-MNDS</p>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        <MedicalCard>
          <MedicalCardHeader>
            <MedicalCardTitle>品牌公式</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <BrandFormula />
          </MedicalCardContent>
        </MedicalCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <MedicalCard>
          <MedicalCardHeader>
            <MedicalCardTitle>传播话术设计</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2">技术向</h3>
                <BrandSlogan variant="technical" className="bg-medical-50 border border-medical-100" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">患者向</h3>
                <BrandSlogan variant="patient" className="bg-medical-50 border border-medical-100" />
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        <MedicalCard>
          <MedicalCardHeader>
            <MedicalCardTitle>行业适配策略</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="space-y-4">
              <div className="p-3 bg-medical-50 rounded-lg border border-medical-100">
                <p className="font-medium text-medical-800 mb-1">"医"字聚焦行业属性、"诊疗系统"强化专业价值</p>
              </div>
              <div className="p-3 bg-medical-50 rounded-lg border border-medical-100">
                <p className="font-medium text-medical-800 mb-1">技术信任：³维精准赋能对标医疗黄金标准</p>
              </div>
              <div className="p-3 bg-medical-50 rounded-lg border border-medical-100">
                <p className="font-medium text-medical-800 mb-1">情感共鸣：语言智能与患者关怀深度融合</p>
              </div>
              <div className="p-3 bg-medical-50 rounded-lg border border-medical-100">
                <p className="font-medium text-medical-800 mb-1">生态扩展：从诊断到健康管理的闭环覆盖</p>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>
      </div>
    </div>
  )
}
