// 药物基因组学分析服务
export interface PharmacogenomicsProfile {
  id: string
  patientId: string
  geneVariants: {
    gene: string
    variant: string
    phenotype: string
    metabolizerType: "poor" | "intermediate" | "normal" | "rapid" | "ultrarapid"
    clinicalSignificance: "high" | "moderate" | "low"
  }[]
  drugRecommendations: {
    drugId: string
    drugName: string
    recommendation: "standard" | "reduced" | "increased" | "alternative" | "avoid"
    dosageAdjustment?: string
    reasoning: string
    evidenceLevel: "A" | "B" | "C" | "D"
  }[]
  testDate: string
  reportGenerated: string
  status: "pending" | "completed" | "reviewed"
}

export interface DrugGenePair {
  drugId: string
  drugName: string
  genes: string[]
  interactions: {
    gene: string
    variant: string
    effect: string
    recommendation: string
    evidenceLevel: string
  }[]
}

// 模拟药物基因组学数据
const mockPharmacogenomicsProfiles: PharmacogenomicsProfile[] = [
  {
    id: "pgx-001",
    patientId: "patient-001",
    geneVariants: [
      {
        gene: "CYP2D6",
        variant: "*1/*4",
        phenotype: "Intermediate Metabolizer",
        metabolizerType: "intermediate",
        clinicalSignificance: "high",
      },
      {
        gene: "CYP2C19",
        variant: "*1/*2",
        phenotype: "Intermediate Metabolizer",
        metabolizerType: "intermediate",
        clinicalSignificance: "high",
      },
      {
        gene: "SLCO1B1",
        variant: "c.521T>C",
        phenotype: "Decreased Function",
        metabolizerType: "poor",
        clinicalSignificance: "moderate",
      },
    ],
    drugRecommendations: [
      {
        drugId: "drug-001",
        drugName: "氯吡格雷",
        recommendation: "alternative",
        reasoning: "CYP2C19中间代谢型，药物活化能力降低，建议使用替代药物",
        evidenceLevel: "A",
      },
      {
        drugId: "drug-002",
        drugName: "辛伐他汀",
        recommendation: "reduced",
        dosageAdjustment: "起始剂量减半，最大剂量不超过20mg/日",
        reasoning: "SLCO1B1变异增加肌病风险",
        evidenceLevel: "A",
      },
      {
        drugId: "drug-003",
        drugName: "美托洛尔",
        recommendation: "reduced",
        dosageAdjustment: "起始剂量减少25-50%",
        reasoning: "CYP2D6中间代谢型，药物清除率降低",
        evidenceLevel: "B",
      },
    ],
    testDate: "2024-01-15",
    reportGenerated: "2024-01-18",
    status: "completed",
  },
]

const mockDrugGenePairs: DrugGenePair[] = [
  {
    drugId: "drug-001",
    drugName: "氯吡格雷",
    genes: ["CYP2C19"],
    interactions: [
      {
        gene: "CYP2C19",
        variant: "*2",
        effect: "药物活化能力降低",
        recommendation: "考虑使用替代药物或增加剂量",
        evidenceLevel: "A",
      },
      {
        gene: "CYP2C19",
        variant: "*3",
        effect: "药物活化能力显著降低",
        recommendation: "避免使用，选择替代药物",
        evidenceLevel: "A",
      },
    ],
  },
  {
    drugId: "drug-002",
    drugName: "华法林",
    genes: ["CYP2C9", "VKORC1"],
    interactions: [
      {
        gene: "CYP2C9",
        variant: "*2/*3",
        effect: "药物代谢能力降低",
        recommendation: "起始剂量减少25-50%",
        evidenceLevel: "A",
      },
      {
        gene: "VKORC1",
        variant: "-1639G>A",
        effect: "华法林敏感性增加",
        recommendation: "起始剂量减少25-50%",
        evidenceLevel: "A",
      },
    ],
  },
]

export const pharmacogenomicsService = {
  // 获取患者药物基因组学档案
  getPatientProfile: async (patientId: string): Promise<PharmacogenomicsProfile | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const profile = mockPharmacogenomicsProfiles.find((p) => p.patientId === patientId)
        resolve(profile || null)
      }, 500)
    })
  },

  // 获取药物基因对信息
  getDrugGenePairs: async (): Promise<DrugGenePair[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDrugGenePairs), 500)
    })
  },

  // 分析药物基因相互作用
  analyzeDrugGeneInteraction: async (
    drugId: string,
    geneVariants: any[],
  ): Promise<{
    recommendation: string
    dosageAdjustment?: string
    reasoning: string
    evidenceLevel: string
  } | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const drugGenePair = mockDrugGenePairs.find((pair) => pair.drugId === drugId)
        if (!drugGenePair) return resolve(null)

        // 简化的分析逻辑
        for (const variant of geneVariants) {
          const interaction = drugGenePair.interactions.find(
            (int) => int.gene === variant.gene && int.variant === variant.variant,
          )
          if (interaction) {
            return resolve({
              recommendation: interaction.recommendation.includes("避免")
                ? "avoid"
                : interaction.recommendation.includes("减少")
                  ? "reduced"
                  : "standard",
              dosageAdjustment: interaction.recommendation.includes("减少") ? interaction.recommendation : undefined,
              reasoning: interaction.effect,
              evidenceLevel: interaction.evidenceLevel,
            })
          }
        }

        resolve({
          recommendation: "standard",
          reasoning: "未发现显著的药物基因相互作用",
          evidenceLevel: "C",
        })
      }, 500)
    })
  },

  // 生成个性化用药建议
  generatePersonalizedRecommendations: async (
    patientId: string,
    medications: string[],
  ): Promise<
    {
      drugId: string
      drugName: string
      recommendation: string
      reasoning: string
      evidenceLevel: string
    }[]
  > => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const profile = mockPharmacogenomicsProfiles.find((p) => p.patientId === patientId)
        if (!profile) return resolve([])

        const recommendations = medications.map((drugId) => {
          const existing = profile.drugRecommendations.find((rec) => rec.drugId === drugId)
          if (existing) {
            return {
              drugId: existing.drugId,
              drugName: existing.drugName,
              recommendation: existing.recommendation,
              reasoning: existing.reasoning,
              evidenceLevel: existing.evidenceLevel,
            }
          }

          return {
            drugId,
            drugName: `药物-${drugId}`,
            recommendation: "standard",
            reasoning: "未发现显著的药物基因相互作用",
            evidenceLevel: "C",
          }
        })

        resolve(recommendations)
      }, 500)
    })
  },
}
