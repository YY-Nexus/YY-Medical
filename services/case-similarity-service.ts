import type { ClinicalCase } from "../types/case-library"
import { caseLibraryService } from "./case-library-service"

// 相似度分析配置
export interface SimilarityConfig {
  // 各特征权重
  weights: {
    diagnosis: number
    symptoms: number
    demographics: number
    tags: number
    findings: number
    treatments: number
    labResults: number
  }
  // 最大返回结果数
  maxResults: number
  // 最小相似度阈值 (0-1)
  minSimilarity: number
}

// 默认配置
const defaultConfig: SimilarityConfig = {
  weights: {
    diagnosis: 0.25,
    symptoms: 0.2,
    demographics: 0.1,
    tags: 0.15,
    findings: 0.15,
    treatments: 0.1,
    labResults: 0.05,
  },
  maxResults: 5,
  minSimilarity: 0.3,
}

// 相似病例结果
export interface SimilarCaseResult {
  case: ClinicalCase
  similarity: number
  matchedFeatures: {
    category: string
    items: string[]
  }[]
}

export const caseSimilarityService = {
  // 获取与指定病例相似的病例
  getSimilarCases(caseId: string, config: Partial<SimilarityConfig> = {}): SimilarCaseResult[] {
    // 合并配置
    const finalConfig = { ...defaultConfig, ...config }

    // 获取目标病例
    const targetCase = caseLibraryService.getCaseById(caseId)
    if (!targetCase) return []

    // 获取所有其他病例
    const allCases = caseLibraryService.getAllCases().filter((c) => c.id !== caseId)

    // 计算每个病例与目标病例的相似度
    const similarCases = allCases.map((currentCase) => {
      // 计算诊断相似度
      const diagnosisSimilarity = this.calculateDiagnosisSimilarity(targetCase, currentCase)

      // 计算症状相似度
      const symptomsSimilarity = this.calculateSymptomsSimilarity(targetCase, currentCase)

      // 计算人口统计学相似度
      const demographicsSimilarity = this.calculateDemographicsSimilarity(targetCase, currentCase)

      // 计算标签相似度
      const tagsSimilarity = this.calculateTagsSimilarity(targetCase, currentCase)

      // 计算影像发现相似度
      const findingsSimilarity = this.calculateFindingsSimilarity(targetCase, currentCase)

      // 计算治疗方案相似度
      const treatmentsSimilarity = this.calculateTreatmentsSimilarity(targetCase, currentCase)

      // 计算实验室检查相似度
      const labResultsSimilarity = this.calculateLabResultsSimilarity(targetCase, currentCase)

      // 计算加权总相似度
      const totalSimilarity =
        diagnosisSimilarity * finalConfig.weights.diagnosis +
        symptomsSimilarity * finalConfig.weights.symptoms +
        demographicsSimilarity * finalConfig.weights.demographics +
        tagsSimilarity * finalConfig.weights.tags +
        findingsSimilarity * finalConfig.weights.findings +
        treatmentsSimilarity * finalConfig.weights.treatments +
        labResultsSimilarity * finalConfig.weights.labResults

      // 收集匹配的特征
      const matchedFeatures = []

      if (diagnosisSimilarity > 0.7) {
        matchedFeatures.push({
          category: "诊断",
          items: [currentCase.diagnosis.primary],
        })
      }

      if (tagsSimilarity > 0.5) {
        const commonTags = currentCase.tags
          .filter((tag) => targetCase.tags.some((t) => t.id === tag.id))
          .map((tag) => tag.name)

        if (commonTags.length > 0) {
          matchedFeatures.push({
            category: "标签",
            items: commonTags,
          })
        }
      }

      if (findingsSimilarity > 0.5) {
        const allFindings = currentCase.images.flatMap((img) => img.findings || [])
        const sampleFindings = allFindings.slice(0, 2)

        if (sampleFindings.length > 0) {
          matchedFeatures.push({
            category: "影像发现",
            items: sampleFindings,
          })
        }
      }

      return {
        case: currentCase,
        similarity: totalSimilarity,
        matchedFeatures,
      }
    })

    // 过滤、排序并限制结果数量
    return similarCases
      .filter((result) => result.similarity >= finalConfig.minSimilarity)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, finalConfig.maxResults)
  },

  // 计算诊断相似度
  calculateDiagnosisSimilarity(case1: ClinicalCase, case2: ClinicalCase): number {
    // 主要诊断完全匹配
    if (case1.diagnosis.primary === case2.diagnosis.primary) {
      return 1.0
    }

    // 检查ICD-10编码
    if (case1.diagnosis.icd10Code && case2.diagnosis.icd10Code) {
      // 前三位相同（疾病大类相同）
      if (case1.diagnosis.icd10Code.substring(0, 3) === case2.diagnosis.icd10Code.substring(0, 3)) {
        return 0.8
      }

      // 前一位相同（系统相同）
      if (case1.diagnosis.icd10Code[0] === case2.diagnosis.icd10Code[0]) {
        return 0.4
      }
    }

    // 检查鉴别诊断
    if (case1.diagnosis.differential && case2.diagnosis.differential) {
      // 如果主要诊断出现在对方的鉴别诊断中
      if (
        case1.diagnosis.differential.includes(case2.diagnosis.primary) ||
        case2.diagnosis.differential.includes(case1.diagnosis.primary)
      ) {
        return 0.6
      }

      // 检查鉴别诊断的重叠
      const commonDifferentials = case1.diagnosis.differential.filter((d) => case2.diagnosis.differential?.includes(d))

      if (commonDifferentials.length > 0) {
        return (
          0.3 +
          (0.3 * commonDifferentials.length) /
            Math.max(case1.diagnosis.differential.length, case2.diagnosis.differential.length || 1)
        )
      }
    }

    // 使用简单的文本相似度（实际应用中可以使用更复杂的NLP方法）
    const words1 = case1.diagnosis.primary.toLowerCase().split(/\s+/)
    const words2 = case2.diagnosis.primary.toLowerCase().split(/\s+/)
    const commonWords = words1.filter((w) => words2.includes(w))

    if (commonWords.length > 0) {
      return 0.2 + (0.3 * commonWords.length) / Math.max(words1.length, words2.length)
    }

    return 0.1 // 基础相似度
  },

  // 计算症状相似度
  calculateSymptomsSimilarity(case1: ClinicalCase, case2: ClinicalCase): number {
    // 主诉和现病史的简单文本比较
    const symptoms1 = (case1.chiefComplaint + " " + case1.presentIllness).toLowerCase()
    const symptoms2 = (case2.chiefComplaint + " " + case2.presentIllness).toLowerCase()

    // 关键症状词列表（实际应用中可以使用更复杂的NLP方法提取症状）
    const symptomKeywords = [
      "咳嗽",
      "发热",
      "胸痛",
      "呼吸困难",
      "头痛",
      "恶心",
      "呕吐",
      "腹痛",
      "腹泻",
      "便秘",
      "乏力",
      "疲劳",
      "体重减轻",
      "食欲不振",
      "出汗",
      "盗汗",
      "咯血",
      "咯痰",
      "胸闷",
      "心悸",
      "水肿",
      "黄疸",
      "瘙痒",
      "皮疹",
    ]

    // 计算两个病例中出现的共同症状
    const symptoms1Count = symptomKeywords.filter((keyword) => symptoms1.includes(keyword)).length
    const symptoms2Count = symptomKeywords.filter((keyword) => symptoms2.includes(keyword)).length
    const commonSymptomsCount = symptomKeywords.filter(
      (keyword) => symptoms1.includes(keyword) && symptoms2.includes(keyword),
    ).length

    if (symptoms1Count === 0 && symptoms2Count === 0) return 0.5 // 都没有明确症状
    if (symptoms1Count === 0 || symptoms2Count === 0) return 0.1 // 一方没有明确症状

    // 计算Jaccard相似度
    return commonSymptomsCount / (symptoms1Count + symptoms2Count - commonSymptomsCount)
  },

  // 计算人口统计学相似度
  calculateDemographicsSimilarity(case1: ClinicalCase, case2: ClinicalCase): number {
    let similarity = 0
    let factorCount = 0

    // 年龄相似度（10岁以内算相似）
    const ageDiff = Math.abs(case1.patientInfo.age - case2.patientInfo.age)
    if (ageDiff <= 5) {
      similarity += 1.0
    } else if (ageDiff <= 10) {
      similarity += 0.8
    } else if (ageDiff <= 20) {
      similarity += 0.4
    } else {
      similarity += 0.1
    }
    factorCount++

    // 性别相似度
    if (case1.patientInfo.gender === case2.patientInfo.gender) {
      similarity += 1.0
    } else {
      similarity += 0.1 // 不同性别基础相似度
    }
    factorCount++

    // 职业相似度
    if (case1.patientInfo.occupation && case2.patientInfo.occupation) {
      if (case1.patientInfo.occupation === case2.patientInfo.occupation) {
        similarity += 1.0
      } else {
        similarity += 0.3 // 不同职业基础相似度
      }
      factorCount++
    }

    // 生活方式相似度
    if (
      case1.patientInfo.lifestyle &&
      case2.patientInfo.lifestyle &&
      case1.patientInfo.lifestyle.length > 0 &&
      case2.patientInfo.lifestyle.length > 0
    ) {
      const lifestyle1 = case1.patientInfo.lifestyle
      const lifestyle2 = case2.patientInfo.lifestyle

      // 检查吸烟状态
      const smoking1 = lifestyle1.find((item) => item.includes("吸烟"))
      const smoking2 = lifestyle2.find((item) => item.includes("吸烟"))

      if (smoking1 && smoking2) {
        if (
          (smoking1.includes("不") && smoking2.includes("不")) ||
          (!smoking1.includes("不") && !smoking2.includes("不"))
        ) {
          similarity += 1.0
        } else {
          similarity += 0.2
        }
        factorCount++
      }

      // 检查饮酒状态
      const drinking1 = lifestyle1.find((item) => item.includes("饮酒"))
      const drinking2 = lifestyle2.find((item) => item.includes("饮酒"))

      if (drinking1 && drinking2) {
        if (
          (drinking1.includes("不") && drinking2.includes("不")) ||
          (!drinking1.includes("不") && !drinking2.includes("不"))
        ) {
          similarity += 1.0
        } else {
          similarity += 0.2
        }
        factorCount++
      }
    }

    return factorCount > 0 ? similarity / factorCount : 0.5
  },

  // 计算标签相似度
  calculateTagsSimilarity(case1: ClinicalCase, case2: ClinicalCase): number {
    const tags1 = case1.tags.map((tag) => tag.id)
    const tags2 = case2.tags.map((tag) => tag.id)

    if (tags1.length === 0 && tags2.length === 0) return 0.5 // 都没有标签
    if (tags1.length === 0 || tags2.length === 0) return 0.1 // 一方没有标签

    // 计算共同标签数
    const commonTags = tags1.filter((tag) => tags2.includes(tag))

    // 计算Jaccard相似度
    return commonTags.length / (tags1.length + tags2.length - commonTags.length)
  },

  // 计算影像发现相似度
  calculateFindingsSimilarity(case1: ClinicalCase, case2: ClinicalCase): number {
    // 提取所有影像发现
    const findings1 = case1.images.flatMap((img) => img.findings || [])
    const findings2 = case2.images.flatMap((img) => img.findings || [])

    if (findings1.length === 0 && findings2.length === 0) return 0.5 // 都没有发现
    if (findings1.length === 0 || findings2.length === 0) return 0.1 // 一方没有发现

    // 关键发现词列表
    const findingKeywords = [
      "结节",
      "肿块",
      "磨玻璃",
      "实性",
      "空洞",
      "钙化",
      "胸腔积液",
      "肺气肿",
      "肺不张",
      "支气管扩张",
      "间质性",
      "肺纹理",
      "胸膜",
      "纵隔",
      "肺门",
      "淋巴结",
      "肺炎",
      "浸润",
      "肺水肿",
      "肺栓塞",
    ]

    // 计算每个病例中出现的关键发现词
    const findings1Keywords = findingKeywords.filter((keyword) =>
      findings1.some((finding) => finding.includes(keyword)),
    )

    const findings2Keywords = findingKeywords.filter((keyword) =>
      findings2.some((finding) => finding.includes(keyword)),
    )

    // 计算共同关键发现词
    const commonKeywords = findings1Keywords.filter((keyword) => findings2Keywords.includes(keyword))

    if (findings1Keywords.length === 0 && findings2Keywords.length === 0) return 0.3 // 都没有关键发现词
    if (findings1Keywords.length === 0 || findings2Keywords.length === 0) return 0.1 // 一方没有关键发现词

    // 计算Jaccard相似度
    return commonKeywords.length / (findings1Keywords.length + findings2Keywords.length - commonKeywords.length)
  },

  // 计算治疗方案相似度
  calculateTreatmentsSimilarity(case1: ClinicalCase, case2: ClinicalCase): number {
    if (!case1.treatments || !case2.treatments || case1.treatments.length === 0 || case2.treatments.length === 0) {
      return 0.1 // 一方没有治疗方案
    }

    // 按类型分组治疗方案
    const getTypeGroups = (treatments: any[]) => {
      const groups: Record<string, any[]> = {}
      treatments.forEach((treatment) => {
        if (!groups[treatment.type]) {
          groups[treatment.type] = []
        }
        groups[treatment.type].push(treatment)
      })
      return groups
    }

    const typeGroups1 = getTypeGroups(case1.treatments)
    const typeGroups2 = getTypeGroups(case2.treatments)

    // 计算治疗类型的重叠
    const allTypes = [...new Set([...Object.keys(typeGroups1), ...Object.keys(typeGroups2)])]
    const commonTypes = Object.keys(typeGroups1).filter((type) => typeGroups2[type])

    // 基础相似度基于治疗类型的重叠
    const baseSimilarity = commonTypes.length / allTypes.length

    // 对于共同的治疗类型，进一步比较治疗细节
    let detailedSimilarity = 0

    if (commonTypes.length > 0) {
      commonTypes.forEach((type) => {
        const treatments1 = typeGroups1[type]
        const treatments2 = typeGroups2[type]

        // 简单的名称匹配
        const names1 = treatments1.map((t) => t.name.toLowerCase())
        const names2 = treatments2.map((t) => t.name.toLowerCase())

        let nameMatches = 0
        names1.forEach((name1) => {
          names2.forEach((name2) => {
            // 检查名称是否相似
            const words1 = name1.split(/\s+/)
            const words2 = name2.split(/\s+/)
            const commonWords = words1.filter((w) => words2.includes(w))

            if (commonWords.length > 0) {
              nameMatches += commonWords.length / Math.max(words1.length, words2.length)
            }
          })
        })

        const maxPossibleMatches = names1.length * names2.length
        detailedSimilarity += maxPossibleMatches > 0 ? nameMatches / maxPossibleMatches : 0
      })

      detailedSimilarity /= commonTypes.length
    }

    // 最终相似度是基础相似度和详细相似度的加权平均
    return baseSimilarity * 0.6 + detailedSimilarity * 0.4
  },

  // 计算实验室检查相似度
  calculateLabResultsSimilarity(case1: ClinicalCase, case2: ClinicalCase): number {
    if (!case1.labTests || !case2.labTests || case1.labTests.length === 0 || case2.labTests.length === 0) {
      return 0.1 // 一方没有实验室检查
    }

    // 获取共同的检查项目
    const tests1 = case1.labTests.map((test) => test.name)
    const tests2 = case2.labTests.map((test) => test.name)

    const commonTests = tests1.filter((test) => tests2.includes(test))

    if (commonTests.length === 0) return 0.2 // 没有共同的检查项目

    // 计算共同检查项目的异常状态相似度
    let abnormalSimilarity = 0

    commonTests.forEach((testName) => {
      const test1 = case1.labTests.find((test) => test.name === testName)
      const test2 = case2.labTests.find((test) => test.name === testName)

      if (test1 && test2) {
        // 异常状态相同
        if (test1.isAbnormal === test2.isAbnormal) {
          abnormalSimilarity += 1.0
        } else {
          abnormalSimilarity += 0.2 // 异常状态不同
        }
      }
    })

    abnormalSimilarity /= commonTests.length

    // 最终相似度是共同检查项目比例和异常状态相似度的加权平均
    const coverageSimilarity = commonTests.length / Math.max(tests1.length, tests2.length)

    return coverageSimilarity * 0.4 + abnormalSimilarity * 0.6
  },
}
