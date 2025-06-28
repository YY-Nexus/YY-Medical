import { cn } from "@/lib/utils"

interface SloganProps {
  variant?: "technical" | "patient"
  className?: string
}

export function BrandSlogan({ variant = "technical", className }: SloganProps) {
  return (
    <div className={cn("p-3 rounded-lg", className)}>
      {variant === "technical" ? (
        <p className="text-center font-medium">
          <span className="medical-gradient-text">³维精准：</span>
          1mm病灶识别、3秒AI初诊、30年临床知识库
        </p>
      ) : (
        <p className="text-center font-medium">
          <span className="medical-gradient-text">言语医心，³度关怀</span>
          ——从精准诊疗到有温度的健康守护
        </p>
      )}
    </div>
  )
}
