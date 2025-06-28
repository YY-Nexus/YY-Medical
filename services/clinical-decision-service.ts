import type { ClinicalCase } from "../types/case-library"
import { caseLibraryService } from "./case-library-service"

// 决策支持类型
export type DecisionSupportType = "诊断建议" | "治疗方案" | "用药建议" | "检查建议" | "随访计划" | "风险评估"

// 证据级别
export type EvidenceLevel = "Ia" | "Ib" | "IIa" | "IIb" | "III" | "IV"

// 推荐强度
export type RecommendationStrength = "A" | "B" | "C" | "D" | "GPP"

// 参考文献
export interface Reference {
  id: string
  title: string
  authors: string
  journal: string
  year: number
  doi?: string
  url?: string
  citationCount?: number
}

// 证据来源
export interface Evidence {
  id: string
  description: string
  level: EvidenceLevel
  strength: RecommendationStrength
  references: Reference[]
}

// 决策建议
export interface DecisionRecommendation {
  id: string
  type: DecisionSupportType
  title: string
  description: string
  rationale: string
  confidence: number // 0-1
  evidences: Evidence[]
  alternatives?: {
    title: string
    description: string
    conditions: string
  }[]
  contraindications?: string[]
  warnings?: string[]
  relatedNodeIds: string[]
  relatedCaseIds: string[]
}

// 决策支持结果
export interface DecisionSupportResult {
  patientId: string
  caseId: string
  timestamp: string
  primaryDiagnosis: string
  recommendations: DecisionRecommendation[]
  differentialDiagnoses: {
    diagnosis: string
    probability: number
    keyFindings: string[]
  }[]
  riskFactors: {
    factor: string
    level: "低" | "中" | "高"
    description: string
  }[]
  summary: string
}

// 模拟参考文献数据
const mockReferences: Reference[] = [
  {
    id: "ref-1",
    title: "Lung Cancer Screening: Recommendation Statement",
    authors: "US Preventive Services Task Force",
    journal: "JAMA",
    year: 2021,
    doi: "10.1001/jama.2021.1117",
    citationCount: 245,
  },
  {
    id: "ref-2",
    title: "Reduced Lung-Cancer Mortality with Volume CT Screening in a Randomized Trial",
    authors: "de Koning HJ, van der Aalst CM, de Jong PA, et al.",
    journal: "New England Journal of Medicine",
    year: 2020,
    doi: "10.1056/NEJMoa1911793",
    citationCount: 876,
  },
  {
    id: "ref-3",
    title: "Guidelines for Management of Incidental Pulmonary Nodules Detected on CT Images",
    authors: "MacMahon H, Naidich DP, Goo JM, et al.",
    journal: "Radiology",
    year: 2017,
    doi: "10.1148/radiol.2017161659",
    citationCount: 1243,
  },
  {
    id: "ref-4",
    title:
      "Diagnosis and Management of Lung Cancer, 3rd ed: American College of Chest Physicians Evidence-Based Clinical Practice Guidelines",
    authors: "Detterbeck FC, Lewis SZ, Diekemper R, et al.",
    journal: "Chest",
    year: 2013,
    doi: "10.1378/chest.12-2377",
    citationCount: 1876,
  },
  {
    id: "ref-5",
    title: "Evaluation of Individuals With Pulmonary Nodules: When Is It Lung Cancer?",
    authors: "Gould MK, Donington J, Lynch WR, et al.",
    journal: "Chest",
    year: 2013,
    doi: "10.1378/chest.12-2351",
    citationCount: 1054,
  },
  {
    id: "ref-6",
    title:
      "Subsolid Pulmonary Nodules and the Spectrum of Peripheral Adenocarcinomas of the Lung: Recommended Interim Guidelines for Assessment and Management",
    authors: "Naidich DP, Bankier AA, MacMahon H, et al.",
    journal: "Radiology",
    year: 2013,
    doi: "10.1148/radiol.12120628",
    citationCount: 789,
  },
  {
    id: "ref-7",
    title: "International Association for the Study of Lung Cancer Computed Tomography Screening Workshop 2011 Report",
    authors: "Field JK, Smith RA, Aberle DR, et al.",
    journal: "Journal of Thoracic Oncology",
    year: 2012,
    doi: "10.1097/JTO.0b013e31824baac4",
    citationCount: 321,
  },
  {
    id: "ref-8",
    title: "Guidelines for the Management of Pulmonary Nodules Detected by Low-dose CT Lung Cancer Screening",
    authors: "Callister ME, Baldwin DR, Akram AR, et al.",
    journal: "Thorax",
    year: 2015,
    doi: "10.1136/thoraxjnl-2015-207168",
    citationCount: 567,
  },
  {
    id: "ref-9",
    title: "Management of Pulmonary Nodules by Community Pulmonologists",
    authors: "Tanner NT, Aggarwal J, Gould MK, et al.",
    journal: "Chest",
    year: 2015,
    doi: "10.1378/chest.15-0630",
    citationCount: 198,
  },
  {
    id: "ref-10",
    title:
      "Recommendations for the Management of Subsolid Pulmonary Nodules Detected at CT: A Statement from the Fleischner Society",
    authors: "Naidich DP, Bankier AA, MacMahon H, et al.",
    journal: "Radiology",
    year: 2013,
    doi: "10.1148/radiol.13130806",
    citationCount: 876,
  },
]

// 模拟证据数据
const mockEvidences: Evidence[] = [
  {
    id: "evidence-1",
    description: "低剂量CT筛查可降低高危人群肺癌死亡率",
    level: "Ia",
    strength: "A",
    references: [mockReferences[0], mockReferences[1], mockReferences[6]],
  },
  {
    id: "evidence-2",
    description: "对于直径>8mm的实性结节，PET-CT有助于良恶性鉴别",
    level: "IIa",
    strength: "B",
    references: [mockReferences[2], mockReferences[4], mockReferences[8]],
  },
  {
    id: "evidence-3",
    description: "对于磨玻璃结节，随访观察是合理的管理策略",
    level: "IIa",
    strength: "B",
    references: [mockReferences[5], mockReferences[9]],
  },
  {
    id: "evidence-4",
    description: "对于高度怀疑恶性的肺结节，手术切除是首选治疗方式",
    level: "Ib",
    strength: "A",
    references: [mockReferences[3], mockReferences[7]],
  },
  {
    id: "evidence-5",
    description: "对于不适合手术的患者，立体定向放射治疗是一种有效的替代方案",
    level: "IIa",
    strength: "B",
    references: [mockReferences[3], mockReferences[4]],
  },
  {
    id: "evidence-6",
    description: "对于部分实性结节，其恶变风险高于纯磨玻璃结节",
    level: "IIa",
    strength: "B",
    references: [mockReferences[5], mockReferences[9]],
  },
  {
    id: "evidence-7",
    description: "肺结节的体积倍增时间是预测恶性的重要指标",
    level: "IIb",
    strength: "B",
    references: [mockReferences[2], mockReferences[8]],
  },
  {
    id: "evidence-8",
    description: "对于直径<6mm的孤立性结节，风险较低，可考虑不随访",
    level: "IIb",
    strength: "C",
    references: [mockReferences[2], mockReferences[7]],
  },
  {
    id: "evidence-9",
    description: "对于早期肺癌，解剖性肺叶切除和淋巴结清扫是标准治疗",
    level: "Ib",
    strength: "A",
    references: [mockReferences[3], mockReferences[4]],
  },
  {
    id: "evidence-10",
    description: "对于高龄或肺功能差的患者，亚肺叶切除可作为替代方案",
    level: "IIa",
    strength: "B",
    references: [mockReferences[3], mockReferences[4]],
  },
]

// 模拟决策建议数据
const mockRecommendations: Record<string, DecisionRecommendation[]> = {
  "case-1": [
    {
      id: "rec-1-1",
      type: "诊断建议",
      title: "进行PET-CT检查",
      description: "建议进行PET-CT检查，评估右肺上叶磨玻璃结节的代谢活性，有助于良恶性鉴别。",
      rationale:
        "对于直径>8mm的肺结节，特别是有恶性风险因素的患者，PET-CT可提供额外的诊断信息。该患者结节直径为1.2cm，且有肺癌家族史。",
      confidence: 0.85,
      evidences: [mockEvidences[1]],
      alternatives: [
        {
          title: "连续CT随访",
          description: "如果无法进行PET-CT，可选择3个月内复查胸部CT，评估结节变化。",
          conditions: "患者无法耐受PET-CT检查或检查不可及",
        },
      ],
      contraindications: ["妊娠", "血糖控制不佳的糖尿病患者"],
      warnings: ["PET-CT对于纯磨玻璃结节的敏感性较低"],
      relatedNodeIds: ["imaging-ground-glass", "exam-pet-ct"],
      relatedCaseIds: ["case-3"],
    },
    {
      id: "rec-1-2",
      type: "治疗方案",
      title: "胸腔镜手术切除",
      description: "建议行胸腔镜下肺叶切除术和系统性纵隔淋巴结清扫，是目前最适合的治疗方案。",
      rationale: "对于高度怀疑为早期肺癌的患者，手术切除是首选治疗方式，可提供确切的病理诊断和根治性治疗。",
      confidence: 0.9,
      evidences: [mockEvidences[3], mockEvidences[8]],
      alternatives: [
        {
          title: "亚肺叶切除",
          description: "对于肺功能受限的患者，可考虑楔形切除或肺段切除。",
          conditions: "患者肺功能受限或高龄",
        },
      ],
      contraindications: ["严重心肺功能不全", "广泛胸膜粘连"],
      warnings: ["术前需全面评估心肺功能"],
      relatedNodeIds: ["treatment-surgery", "disease-lung-cancer"],
      relatedCaseIds: [],
    },
    {
      id: "rec-1-3",
      type: "随访计划",
      title: "术后定期随访计划",
      description: "术后第一年每3个月随访一次，第二年每6个月随访一次，此后每年随访一次，包括胸部CT和肿瘤标志物检查。",
      rationale: "早期肺癌术后定期随访可及时发现复发或转移，提高长期生存率。",
      confidence: 0.95,
      evidences: [mockEvidences[3]],
      alternatives: [],
      contraindications: [],
      warnings: [],
      relatedNodeIds: ["treatment-follow-up"],
      relatedCaseIds: [],
    },
  ],
  "case-2": [
    {
      id: "rec-2-1",
      type: "诊断建议",
      title: "痰培养和药敏试验",
      description: "建议进行痰培养和药敏试验，明确病原菌及其对抗结核药物的敏感性。",
      rationale: "痰涂片阳性提示活动性肺结核，进一步的培养和药敏试验有助于指导个体化治疗方案。",
      confidence: 0.9,
      evidences: [],
      alternatives: [],
      contraindications: [],
      warnings: ["培养结果需要4-8周时间"],
      relatedNodeIds: ["disease-tuberculosis", "exam-culture"],
      relatedCaseIds: [],
    },
    {
      id: "rec-2-2",
      type: "治疗方案",
      title: "标准抗结核治疗",
      description:
        "建议采用2HRZE/4HR方案进行规范抗结核治疗，即强化期2个月使用异烟肼、利福平、吡嗪酰胺和乙胺丁醇四联，继续期4个月使用异烟肼和利福平。",
      rationale: "对于初治肺结核患者，标准的2HRZE/4HR方案是目前国内外指南推荐的一线治疗方案。",
      confidence: 0.95,
      evidences: [],
      alternatives: [
        {
          title: "延长治疗时间",
          description: "对于空洞型肺结核或治疗反应不佳的患者，可考虑延长继续期至7-9个月。",
          conditions: "存在空洞、广泛病变或治疗反应不佳",
        },
      ],
      contraindications: ["严重肝肾功能不全需调整剂量"],
      warnings: ["需定期监测肝功能和视力"],
      relatedNodeIds: ["disease-tuberculosis", "treatment-medication"],
      relatedCaseIds: [],
    },
    {
      id: "rec-2-3",
      type: "随访计划",
      title: "抗结核治疗期间监测计划",
      description: "治疗前2个月每2周随访一次，之后每月随访一次，包括症状评估、痰检查、肝功能和视力检查。",
      rationale: "规律随访可评估治疗效果，及时发现和处理药物不良反应。",
      confidence: 0.9,
      evidences: [],
      alternatives: [],
      contraindications: [],
      warnings: [],
      relatedNodeIds: ["treatment-follow-up", "disease-tuberculosis"],
      relatedCaseIds: [],
    },
  ],
  "case-3": [
    {
      id: "rec-3-1",
      type: "诊断建议",
      title: "进行PET-CT检查",
      description: "建议进行PET-CT检查，评估左肺下叶结节的代谢活性，有助于良恶性鉴别。",
      rationale:
        "对于直径>1cm且含实性成分的肺结节，PET-CT可提供额外的诊断信息。该患者结节直径为1.5cm，实性成分约60%，且有吸烟史和肺结节进展史。",
      confidence: 0.9,
      evidences: [mockEvidences[1]],
      alternatives: [],
      contraindications: ["妊娠", "血糖控制不佳的糖尿病患者"],
      warnings: [],
      relatedNodeIds: ["imaging-part-solid", "exam-pet-ct"],
      relatedCaseIds: ["case-1"],
    },
    {
      id: "rec-3-2",
      type: "治疗方案",
      title: "胸腔镜手术切除",
      description: "建议行胸腔镜下肺叶切除术和系统性纵隔淋巴结清扫。",
      rationale: "对于高度怀疑为肺癌的患者，特别是结节有明显进展的情况，手术切除是首选治疗方式。",
      confidence: 0.95,
      evidences: [mockEvidences[3], mockEvidences[8]],
      alternatives: [],
      contraindications: ["严重心肺功能不全"],
      warnings: ["术前需全面评估心肺功能"],
      relatedNodeIds: ["treatment-surgery", "disease-lung-cancer"],
      relatedCaseIds: ["case-1"],
    },
    {
      id: "rec-3-3",
      type: "风险评估",
      title: "术后辅助治疗风险评估",
      description: "建议术后根据病理分期和分子检测结果，评估是否需要辅助治疗。",
      rationale: "对于早期肺癌，如无高危因素，���不进行辅助治疗；但对于存在高危因素的患者，辅助化疗可改善预后。",
      confidence: 0.85,
      evidences: [],
      alternatives: [],
      contraindications: [],
      warnings: [],
      relatedNodeIds: ["treatment-chemotherapy", "disease-lung-cancer"],
      relatedCaseIds: [],
    },
  ],
}

// 临床决策支持服务
export const clinicalDecisionService = {
  // 获取决策支持结果
  getDecisionSupport(caseId: string): DecisionSupportResult | null {
    try {
      // 获取病例数据
      const caseData = caseLibraryService.getCaseById(caseId)
      if (!caseData) return null

      // 获取推荐建议
      const recommendations = mockRecommendations[caseId] || []

      // 构建鉴别诊断
      const differentialDiagnoses =
        caseData.diagnosis.differential?.map((diagnosis, index) => {
          return {
            diagnosis,
            probability: Math.max(0.1, 0.9 - index * 0.2), // 简单模拟概率递减
            keyFindings: this.generateKeyFindings(diagnosis, caseData),
          }
        }) || []

      // 构建风险因素
      const riskFactors = this.generateRiskFactors(caseData)

      // 构建决策支持结果
      const result: DecisionSupportResult = {
        patientId: caseData.patientInfo.patientId || caseData.id,
        caseId: caseData.id,
        timestamp: new Date().toISOString(),
        primaryDiagnosis: caseData.diagnosis.primary,
        recommendations,
        differentialDiagnoses,
        riskFactors,
        summary: this.generateSummary(caseData, recommendations),
      }

      return result
    } catch (err) {
      console.error("获取决策支持失败:", err)
      return null
    }
  },

  // 根据诊断和病例生成关键发现
  generateKeyFindings(diagnosis: string, caseData: ClinicalCase): string[] {
    const findings: string[] = []

    // 从主诉和现病史中提取关键信息
    const clinicalInfo = caseData.chiefComplaint + " " + caseData.presentIllness

    // 根据不同诊断添加相关发现
    if (diagnosis.includes("肺癌")) {
      if (clinicalInfo.includes("咳嗽")) findings.push("持续性咳嗽")
      if (clinicalInfo.includes("咯血")) findings.push("咯血")
      if (clinicalInfo.includes("胸痛")) findings.push("胸痛")
      if (clinicalInfo.includes("体重减轻")) findings.push("体重减轻")

      // 从影像中提取信息
      const hasNodule = caseData.images.some(
        (img) => img.description.includes("结节") || img.description.includes("肿块"),
      )
      if (hasNodule) findings.push("肺部结节/肿块")

      // 从实验室检查中提取信息
      const hasElevatedMarkers = caseData.labTests.some(
        (test) => (test.name.includes("CEA") || test.name.includes("CYFRA21-1")) && test.result.includes("升高"),
      )
      if (hasElevatedMarkers) findings.push("肿瘤标志物升高")
    } else if (diagnosis.includes("肺结核")) {
      if (clinicalInfo.includes("咳嗽")) findings.push("慢性咳嗽")
      if (clinicalInfo.includes("咯血")) findings.push("咯血")
      if (clinicalInfo.includes("盗汗")) findings.push("盗汗")
      if (clinicalInfo.includes("发热")) findings.push("低热")
      if (clinicalInfo.includes("体重减轻")) findings.push("体重减轻")

      // 从影像中提取信息
      const hasTBFindings = caseData.images.some(
        (img) =>
          img.description.includes("空洞") || img.description.includes("结核") || img.description.includes("钙化"),
      )
      if (hasTBFindings) findings.push("肺部空洞/钙化")

      // 从实验室检查中提取信息
      const hasTBTest = caseData.labTests.some(
        (test) => (test.name.includes("结核菌素试验") || test.name.includes("T-SPOT")) && test.result.includes("阳性"),
      )
      if (hasTBTest) findings.push("结核菌素试验/T-SPOT阳性")
    } else if (diagnosis.includes("肺炎")) {
      if (clinicalInfo.includes("咳嗽")) findings.push("急性咳嗽")
      if (clinicalInfo.includes("咳痰")) findings.push("咳痰")
      if (clinicalInfo.includes("发热")) findings.push("发热")
      if (clinicalInfo.includes("气促")) findings.push("气促")

      // 从影像中提取信息
      const hasPneumoniaFindings = caseData.images.some(
        (img) =>
          img.description.includes("炎症") || img.description.includes("渗出") || img.description.includes("实变"),
      )
      if (hasPneumoniaFindings) findings.push("肺部炎症/实变")

      // 从实验室检查中提取信息
      const hasElevatedWBC = caseData.labTests.some(
        (test) => test.name.includes("白细胞") && test.result.includes("升高"),
      )
      if (hasElevatedWBC) findings.push("白细胞计数升高")
    }

    // 如果没有找到特定发现，添加一些通用发现
    if (findings.length === 0) {
      if (clinicalInfo.includes("咳嗽")) findings.push("咳嗽")
      if (clinicalInfo.includes("胸痛")) findings.push("胸痛")
      if (clinicalInfo.includes("呼吸困难")) findings.push("呼吸困难")

      // 添加一个基于诊断的通用发现
      findings.push(`与${diagnosis}相关的临床表现`)
    }

    return findings
  },

  // 生成风险因素
  generateRiskFactors(caseData: ClinicalCase): { factor: string; level: "低" | "中" | "高"; description: string }[] {
    const riskFactors: { factor: string; level: "低" | "中" | "高"; description: string }[] = []

    // 从病史中提取风险因素
    const history = caseData.pastHistory + " " + caseData.familyHistory + " " + caseData.personalHistory

    // 吸烟史
    if (history.includes("吸烟")) {
      let level: "低" | "中" | "高" = "中"
      let description = "有吸烟史，增加肺部疾病风险"

      if (history.includes("重度吸烟") || history.includes(">20包年")) {
        level = "高"
        description = "重度吸烟史(>20包年)，显著增加肺癌和慢阻肺风险"
      } else if (history.includes("轻度吸烟") || history.includes("<10包年")) {
        level = "低"
        description = "轻度吸烟史(<10包年)，轻度增加肺部疾病风险"
      }

      riskFactors.push({
        factor: "吸烟史",
        level,
        description,
      })
    }

    // 职业暴露
    if (
      history.includes("职业暴露") ||
      history.includes("粉尘") ||
      history.includes("石棉") ||
      history.includes("放射性物质")
    ) {
      riskFactors.push({
        factor: "职业暴露",
        level: "高",
        description: "有职业性有害物质暴露史，增加相关肺部疾病风险",
      })
    }

    // 家族史
    if (history.includes("肺癌家族史")) {
      riskFactors.push({
        factor: "肺癌家族史",
        level: "高",
        description: "一级亲属中有肺癌患者，增加肺癌发病风险",
      })
    }

    // 既往肺部疾病
    if (
      history.includes("肺结核") ||
      history.includes("尘肺") ||
      history.includes("慢阻肺") ||
      history.includes("间质��肺疾病")
    ) {
      riskFactors.push({
        factor: "既往肺部疾病",
        level: "中",
        description: "有慢性肺部疾病史，可能增加并发症风险或影响治疗方案选择",
      })
    }

    // 年龄因素
    const ageMatch = caseData.patientInfo.age.match(/(\d+)/)
    if (ageMatch) {
      const age = Number.parseInt(ageMatch[1])
      if (age > 65) {
        riskFactors.push({
          factor: "高龄",
          level: "中",
          description: "年龄>65岁，可能影响治疗耐受性和预后",
        })
      }
    }

    // 如果没有找到特定风险因素，添加一个基于诊断的通用风险因素
    if (riskFactors.length === 0) {
      riskFactors.push({
        factor: "一般风险",
        level: "低",
        description: "未发现明显特定风险因素",
      })
    }

    return riskFactors
  },

  // 生成决策支持摘要
  generateSummary(caseData: ClinicalCase, recommendations: DecisionRecommendation[]): string {
    // 构建摘要开头
    let summary = `患者${caseData.patientInfo.gender}，${caseData.patientInfo.age}，`

    // 添加主诉
    if (caseData.chiefComplaint) {
      summary += `因"${caseData.chiefComplaint}"就诊。`
    } else {
      summary += "就诊。"
    }

    // 添加主要诊断
    summary += `诊断为${caseData.diagnosis.primary}。`

    // 添加主要建议
    if (recommendations.length > 0) {
      summary += "主要建议包括："

      // 获取前3个建议的标题
      const topRecommendations = recommendations.slice(0, 3).map((rec) => rec.title)
      summary += topRecommendations.join("、") + "。"

      // 添加最高置信度的建议的理由
      const highestConfidenceRec = [...recommendations].sort((a, b) => b.confidence - a.confidence)[0]
      if (highestConfidenceRec) {
        summary += `特别推荐${highestConfidenceRec.title}，因为${highestConfidenceRec.rationale}`
      }
    } else {
      summary += "目前暂无特定建议。"
    }

    // 添加注意事项
    const warnings = recommendations
      .flatMap((rec) => rec.warnings || [])
      .filter((warning, index, self) => self.indexOf(warning) === index) // 去重
      .slice(0, 3) // 最多取3个

    if (warnings.length > 0) {
      summary += "需注意：" + warnings.join("；") + "。"
    }

    return summary
  },

  // 获取特定类型的建议
  getRecommendationsByType(caseId: string, type: DecisionSupportType): DecisionRecommendation[] {
    const allRecommendations = mockRecommendations[caseId] || []
    return allRecommendations.filter((rec) => rec.type === type)
  },

  // 获取高置信度建议
  getHighConfidenceRecommendations(caseId: string, confidenceThreshold = 0.8): DecisionRecommendation[] {
    const allRecommendations = mockRecommendations[caseId] || []
    return allRecommendations
      .filter((rec) => rec.confidence >= confidenceThreshold)
      .sort((a, b) => b.confidence - a.confidence)
  },

  // 根据证据级别筛选建议
  getRecommendationsByEvidenceLevel(caseId: string, minLevel: EvidenceLevel): DecisionRecommendation[] {
    // 证据级别顺序
    const levelOrder: EvidenceLevel[] = ["Ia", "Ib", "IIa", "IIb", "III", "IV"]
    const minLevelIndex = levelOrder.indexOf(minLevel)

    const allRecommendations = mockRecommendations[caseId] || []
    return allRecommendations.filter((rec) => {
      // 检查是否有任何证据���到或超过最低级别
      return rec.evidences.some((evidence) => {
        const evidenceLevelIndex = levelOrder.indexOf(evidence.level)
        return evidenceLevelIndex <= minLevelIndex // 较小的索引表示更高的证据级别
      })
    })
  },

  // 获取相关病例的建议
  getRelatedCaseRecommendations(caseId: string): Record<string, DecisionRecommendation[]> {
    const result: Record<string, DecisionRecommendation[]> = {}

    // 获取当前病例的所有建议
    const currentRecommendations = mockRecommendations[caseId] || []

    // 从当前建议中提取相关病例ID
    const relatedCaseIds = new Set<string>()
    currentRecommendations.forEach((rec) => {
      rec.relatedCaseIds.forEach((id) => relatedCaseIds.add(id))
    })

    // 获取相关病例的建议
    relatedCaseIds.forEach((relatedId) => {
      if (mockRecommendations[relatedId]) {
        result[relatedId] = mockRecommendations[relatedId]
      }
    })

    return result
  },
}
