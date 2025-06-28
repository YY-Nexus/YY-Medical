import type {
  DoctorProfile,
  ExtendedDiseaseReference,
  ExtendedTreatmentGuideline,
  ExtendedMedicalReference,
  Medication,
} from "../types/knowledge-base"

// 模拟医生个人资料数据
const doctorProfilesDatabase: DoctorProfile[] = [
  {
    id: "doctor-1",
    name: "张医生",
    specialty: "心血管内科",
    subspecialties: ["介入心脏病学", "心力衰竭"],
    hospital: "协和医院",
    department: "心内科",
    position: "主任医师",
    interests: ["冠心病", "心力衰竭", "高血压", "心律失常"],
    recentSearches: [
      {
        term: "心力衰竭",
        timestamp: "2023-09-15T10:30:00Z",
        type: "disease",
      },
      {
        term: "SGLT2抑制剂",
        timestamp: "2023-09-14T14:20:00Z",
        type: "medication",
      },
      {
        term: "心房颤动抗凝治疗",
        timestamp: "2023-09-12T09:15:00Z",
        type: "treatment",
      },
    ],
    savedItems: [
      {
        id: "cardiomegaly",
        type: "disease",
        savedAt: "2023-08-20T11:30:00Z",
      },
      {
        id: "cardiomegaly-treatment-2",
        type: "treatment",
        savedAt: "2023-08-20T11:35:00Z",
      },
    ],
    preferences: {
      preferredEvidenceLevel: "A",
      preferredLanguage: "zh-CN",
      notificationSettings: {
        newResearch: true,
        guidelineUpdates: true,
        colleagueNotes: true,
      },
      displaySettings: {
        darkMode: false,
        fontSize: "medium",
        compactView: false,
      },
    },
    contributionStats: {
      notesAdded: 15,
      repliesAdded: 27,
      upvotesReceived: 42,
    },
  },
  {
    id: "doctor-2",
    name: "李医生",
    specialty: "呼吸内科",
    subspecialties: ["肺部感染", "慢性阻塞性肺疾病"],
    hospital: "华西医院",
    department: "呼吸内科",
    position: "副主任医师",
    interests: ["肺炎", "哮喘", "COPD", "肺癌"],
    recentSearches: [
      {
        term: "新型冠状病毒肺炎",
        timestamp: "2023-09-16T08:45:00Z",
        type: "disease",
      },
      {
        term: "吸入性糖皮质激素",
        timestamp: "2023-09-15T16:30:00Z",
        type: "medication",
      },
    ],
    savedItems: [
      {
        id: "pneumonia",
        type: "disease",
        savedAt: "2023-09-01T10:20:00Z",
      },
      {
        id: "emphysema",
        type: "disease",
        savedAt: "2023-08-25T14:15:00Z",
      },
    ],
    preferences: {
      preferredEvidenceLevel: "B",
      preferredLanguage: "zh-CN",
      notificationSettings: {
        newResearch: true,
        guidelineUpdates: true,
        colleagueNotes: false,
      },
      displaySettings: {
        darkMode: true,
        fontSize: "large",
        compactView: true,
      },
    },
    contributionStats: {
      notesAdded: 8,
      repliesAdded: 12,
      upvotesReceived: 25,
    },
  },
]

// 个性化推荐服务
export const personalizedRecommendationService = {
  // 获取医生个人资料
  getDoctorProfile: (doctorId: string) => {
    return doctorProfilesDatabase.find((profile) => profile.id === doctorId)
  },

  // 更新医生个人资料
  updateDoctorProfile: (doctorId: string, updates: Partial<DoctorProfile>) => {
    const index = doctorProfilesDatabase.findIndex((profile) => profile.id === doctorId)
    if (index === -1) return false

    doctorProfilesDatabase[index] = { ...doctorProfilesDatabase[index], ...updates }
    return true
  },

  // 添加最近搜索
  addRecentSearch: (doctorId: string, term: string, type: "disease" | "treatment" | "medication" | "general") => {
    const profile = doctorProfilesDatabase.find((profile) => profile.id === doctorId)
    if (!profile) return false

    profile.recentSearches.unshift({
      term,
      timestamp: new Date().toISOString(),
      type,
    })

    // 保留最近的20条搜索记录
    if (profile.recentSearches.length > 20) {
      profile.recentSearches = profile.recentSearches.slice(0, 20)
    }

    return true
  },

  // 添加保存的项目
  addSavedItem: (
    doctorId: string,
    itemId: string,
    type: "disease" | "treatment" | "reference" | "medication" | "note",
  ) => {
    const profile = doctorProfilesDatabase.find((profile) => profile.id === doctorId)
    if (!profile) return false

    // 检查是否已经保存
    const existingItem = profile.savedItems.find((item) => item.id === itemId && item.type === type)
    if (existingItem) return true

    profile.savedItems.push({
      id: itemId,
      type,
      savedAt: new Date().toISOString(),
    })

    return true
  },

  // 移除保存的项目
  removeSavedItem: (
    doctorId: string,
    itemId: string,
    type: "disease" | "treatment" | "reference" | "medication" | "note",
  ) => {
    const profile = doctorProfilesDatabase.find((profile) => profile.id === doctorId)
    if (!profile) return false

    const index = profile.savedItems.findIndex((item) => item.id === itemId && item.type === type)
    if (index === -1) return false

    profile.savedItems.splice(index, 1)
    return true
  },

  // 基于医生专业和兴趣推荐疾病
  recommendDiseases: (doctorId: string, diseasesDatabase: ExtendedDiseaseReference[], limit = 5) => {
    const profile = doctorProfilesDatabase.find((profile) => profile.id === doctorId)
    if (!profile) return []

    // 根据专业和兴趣计算疾病相关性分数
    const scoredDiseases = diseasesDatabase.map((disease) => {
      let score = 0

      // 专业相关性
      if (disease.category === profile.specialty) {
        score += 10
      }

      // 兴趣相关性
      profile.interests.forEach((interest) => {
        if (disease.name.includes(interest) || disease.description.includes(interest)) {
          score += 5
        }
      })

      // 最近搜索相关性
      profile.recentSearches.forEach((search, index) => {
        const recency = 1 / (index + 1) // 越近的搜索权重越高
        if (disease.name.includes(search.term) || disease.description.includes(search.term)) {
          score += 3 * recency
        }
      })

      // 已保存项目相关性
      const isSaved = profile.savedItems.some((item) => item.id === disease.id && item.type === "disease")
      if (isSaved) {
        score += 2
      }

      return { disease, score }
    })

    // 按分数排序并返回前N个
    return scoredDiseases
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.disease)
  },

  // 基于医生专业和兴趣推荐治疗指南
  recommendTreatmentGuidelines: (
    doctorId: string,
    guidelinesDatabase: ExtendedTreatmentGuideline[],
    diseasesDatabase: ExtendedDiseaseReference[],
    limit = 5,
  ) => {
    const profile = doctorProfilesDatabase.find((profile) => profile.id === doctorId)
    if (!profile) return []

    // 根据专业和兴趣计算治疗指南相关性分数
    const scoredGuidelines = guidelinesDatabase.map((guideline) => {
      let score = 0

      // 找到对应的疾病
      const relatedDisease = diseasesDatabase.find((disease) => disease.id === guideline.diseaseId)
      if (!relatedDisease) return { guideline, score: 0 }

      // 专业相关性
      if (relatedDisease.category === profile.specialty) {
        score += 10
      }

      // 兴趣相关性
      profile.interests.forEach((interest) => {
        if (guideline.title.includes(interest) || relatedDisease.name.includes(interest)) {
          score += 5
        }
      })

      // 证据级别相关性
      if (profile.preferences?.preferredEvidenceLevel === guideline.evidenceLevel) {
        score += 3
      }

      // 最近搜索相关性
      profile.recentSearches.forEach((search, index) => {
        const recency = 1 / (index + 1) // 越近的搜索权重越高
        if (guideline.title.includes(search.term) || relatedDisease.name.includes(search.term)) {
          score += 3 * recency
        }
      })

      // 已保存项目相关性
      const isSaved = profile.savedItems.some((item) => item.id === guideline.id && item.type === "treatment")
      if (isSaved) {
        score += 2
      }

      return { guideline, score }
    })

    // 按分数排序并返回前N个
    return scoredGuidelines
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.guideline)
  },

  // 基于医生专业和兴趣推荐参考文献
  recommendReferences: (
    doctorId: string,
    referencesDatabase: ExtendedMedicalReference[],
    diseasesDatabase: ExtendedDiseaseReference[],
    limit = 5,
  ) => {
    const profile = doctorProfilesDatabase.find((profile) => profile.id === doctorId)
    if (!profile) return []

    // 根据专业和兴趣计算参考文献相关性分数
    const scoredReferences = referencesDatabase.map((reference) => {
      let score = 0

      // 找到相关疾病
      const relatedDiseases = reference.diseaseIds
        .map((id) => diseasesDatabase.find((disease) => disease.id === id))
        .filter(Boolean) as ExtendedDiseaseReference[]

      // 专业相关性
      if (relatedDiseases.some((disease) => disease.category === profile.specialty)) {
        score += 10
      }

      // 兴趣相关性
      profile.interests.forEach((interest) => {
        if (
          reference.title.includes(interest) ||
          reference.abstract?.includes(interest) ||
          relatedDiseases.some((disease) => disease.name.includes(interest))
        ) {
          score += 5
        }
      })

      // 证据级别相关性
      if (profile.preferences?.preferredEvidenceLevel === reference.evidenceLevel) {
        score += 3
      }

      // 最近搜索相关性
      profile.recentSearches.forEach((search, index) => {
        const recency = 1 / (index + 1) // 越近的搜索权重越高
        if (reference.title.includes(search.term) || reference.abstract?.includes(search.term)) {
          score += 3 * recency
        }
      })

      // 已保存项目相关性
      const isSaved = profile.savedItems.some((item) => item.id === reference.id && item.type === "reference")
      if (isSaved) {
        score += 2
      }

      // 引用次数和影响因子
      if (reference.citationCount) {
        score += Math.min(reference.citationCount / 100, 5) // 最多加5分
      }
      if (reference.impactFactor) {
        score += Math.min(reference.impactFactor, 5) // 最多加5分
      }

      return { reference, score }
    })

    // 按分数排序并返回前N个
    return scoredReferences
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.reference)
  },

  // 基于医生专业和兴趣推荐药物
  recommendMedications: (doctorId: string, medicationsDatabase: Medication[], limit = 5) => {
    const profile = doctorProfilesDatabase.find((profile) => profile.id === doctorId)
    if (!profile) return []

    // 根据专业和兴趣计算药物相关性分数
    const scoredMedications = medicationsDatabase.map((medication) => {
      let score = 0

      // 专业相关性（基于适应症）
      const specialtyRelated = medication.indications.some((indication) =>
        profile.interests.some((interest) => indication.includes(interest)),
      )
      if (specialtyRelated) {
        score += 10
      }

      // 兴趣相关性
      profile.interests.forEach((interest) => {
        if (
          medication.name.includes(interest) ||
          medication.description.includes(interest) ||
          medication.indications.some((indication) => indication.includes(interest))
        ) {
          score += 5
        }
      })

      // 最近搜索相关性
      profile.recentSearches.forEach((search, index) => {
        const recency = 1 / (index + 1) // 越近的搜索权重越高
        if (
          medication.name.includes(search.term) ||
          medication.genericName.includes(search.term) ||
          medication.description.includes(search.term)
        ) {
          score += 3 * recency
        }
      })

      // 已保存项目相关性
      const isSaved = profile.savedItems.some((item) => item.id === medication.id && item.type === "medication")
      if (isSaved) {
        score += 2
      }

      return { medication, score }
    })

    // 按分数排序并返回前N个
    return scoredMedications
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.medication)
  },

  // 获取医生的使用统计数据
  getDoctorUsageStats: (doctorId: string) => {
    const profile = doctorProfilesDatabase.find((profile) => profile.id === doctorId)
    if (!profile) return null

    // 计算搜索类型分布
    const searchTypeDistribution = profile.recentSearches.reduce(
      (acc, search) => {
        acc[search.type] = (acc[search.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // 计算保存项目类型分布
    const savedItemTypeDistribution = profile.savedItems.reduce(
      (acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      totalSearches: profile.recentSearches.length,
      totalSavedItems: profile.savedItems.length,
      searchTypeDistribution,
      savedItemTypeDistribution,
      contributionStats: profile.contributionStats || { notesAdded: 0, repliesAdded: 0, upvotesReceived: 0 },
    }
  },
}
