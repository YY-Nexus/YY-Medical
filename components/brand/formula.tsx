import { cn } from "@/lib/utils"

interface FormulaProps {
  className?: string
  simplified?: boolean
}

export function BrandFormula({ className, simplified = false }: FormulaProps) {
  if (simplified) {
    return (
      <div className={cn("p-4 bg-medical-50 rounded-lg border border-medical-100", className)}>
        <p className="text-center font-medium text-medical-800">³维精准：1mm病灶识别、3秒AI初诊、30年临床知识库</p>
      </div>
    )
  }

  return (
    <div className={cn("p-4 bg-medical-50 rounded-lg border border-medical-100", className)}>
      <div className="text-center font-medium text-medical-800 mb-2">品牌公式</div>
      <div className="bg-white p-3 rounded-md border border-medical-100 text-center">
        <p className="text-medical-800 font-mono">
          YY³-MNDS = MediNexus³ ⊗ (AI<sub>Dx</sub> + Data<sub>Safe</sub> + Empathy<sub>Care</sub>)
        </p>
      </div>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
        <div className="p-2 bg-white rounded-md border border-medical-100">
          <p className="font-medium text-medical-800">
            AI<sub>Dx</sub>：AI诊断引擎
          </p>
          <p className="text-medical-600">精度≥99.3%</p>
        </div>
        <div className="p-2 bg-white rounded-md border border-medical-100">
          <p className="font-medium text-medical-800">
            Data<sub>Safe</sub>：医疗数据量子加密
          </p>
          <p className="text-medical-600">符合HIPAA/GDPR</p>
        </div>
        <div className="p-2 bg-white rounded-md border border-medical-100">
          <p className="font-medium text-medical-800">
            Empathy<sub>Care</sub>：患者交互关怀系统
          </p>
          <p className="text-medical-600">情感计算驱动</p>
        </div>
      </div>
    </div>
  )
}
