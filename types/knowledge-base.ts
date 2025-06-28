// 扩展医学知识库的数据类型

// 疾病分类
export type DiseaseCategory =
  | "心血管疾病"
  | "呼吸系统疾病"
  | "消化系统疾病"
  | "神经系统疾病"
  | "内分泌疾病"
  | "肿瘤"
  | "传染病"
  | "精神疾病"
  | "血液疾病"
  | "免疫系统疾病"
  | "泌尿系统疾病"
  | "骨科疾病"
  | "皮肤疾病"
  | "眼科疾病"
  | "耳鼻喉科疾病"
  | "妇产科疾病"
  | "儿科疾病"
  | "老年医学"
  | "急诊医学"
  | "其他"

// 扩展疾病参考信息
export interface ExtendedDiseaseReference {
  id: string
  name: string
  description: string
  symptoms: string[]
  causes: string[]
  riskFactors: string[]
  complications: string[]
  diagnosticCriteria: string[]
  differentialDiagnosis: string[]
  prevalence?: string
  icd10Code?: string
  category: DiseaseCategory
  subCategory?: string
  pathophysiology?: string
  epidemiology?: string
  geneticFactors?: string[]
  environmentalFactors?: string[]
  screeningMethods?: string[]
  preventionStrategies?: string[]
  prognosisFactors?: string[]
  comorbidities?: string[]
  pediatricConsiderations?: string
  geriatricConsiderations?: string
  pregnancyConsiderations?: string
  lastUpdated: string // ISO日期字符串
  updateSource?: string
  relatedDiseases?: string[] // 相关疾病的ID
  commonlyPrescribedMedications?: string[] // 常用药物ID
}

// 扩展治疗指南
export interface ExtendedTreatmentGuideline {
  id: string
  diseaseId: string
  title: string
  recommendationLevel: "强烈推荐" | "推荐" | "可考虑" | "谨慎使用" | "不推荐"
  evidenceLevel: "A" | "B" | "C" | "D" | "E" // A最高，E最低
  description: string
  details: string
  contraindications?: string[]
  sideEffects?: string[]
  specialPopulations?: {
    population: string
    recommendations: string
  }[]
  firstLineTherapy?: boolean
  secondLineTherapy?: boolean
  combinationTherapy?: boolean
  therapyDuration?: string
  followUpRecommendations?: string
  costConsiderations?: string
  qualityOfLifeImpact?: string
  guidelineOrganization?: string
  guidelineYear?: string
  lastUpdated: string // ISO日期字符串
  updateSource?: string
  relatedGuidelines?: string[] // 相关指南的ID
}

// 扩展医学参考文献
export interface ExtendedMedicalReference {
  id: string
  title: string
  authors: string[]
  journal?: string
  publicationDate: string
  doi?: string
  url?: string
  abstract?: string
  diseaseIds: string[]
  treatmentIds: string[]
  citationCount?: number
  impactFactor?: number
  fullTextAvailable?: boolean
  keywords?: string[]
  studyType?:
    | "随机对照试验"
    | "队列研究"
    | "病例对照研究"
    | "系统评价"
    | "荟萃分析"
    | "指南"
    | "专家共识"
    | "病例报告"
    | "基础研究"
    | "其他"
  evidenceLevel?: "A" | "B" | "C" | "D" | "E"
  sampleSize?: number
  studyDuration?: string
  fundingSource?: string
  conflictsOfInterest?: string
  lastUpdated: string // ISO日期字符串
}

// 药物信息
export interface Medication {
  id: string
  name: string
  genericName: string
  brandNames?: string[]
  drugClass: string
  description: string
  indications: string[]
  contraindications: string[]
  sideEffects: {
    common: string[]
    serious: string[]
    rare: string[]
  }
  dosageAndAdministration: string
  mechanismOfAction: string
  pharmacokinetics?: {
    absorption?: string
    distribution?: string
    metabolism?: string
    elimination?: string
    halfLife?: string
  }
  pregnancyCategory?: "A" | "B" | "C" | "D" | "X"
  breastfeedingSafety?: "安全" | "谨慎使用" | "不推荐"
  pediatricUse?: string
  geriatricUse?: string
  interactions: {
    drugInteractions: DrugInteraction[]
    foodInteractions?: string[]
    diseaseInteractions?: string[]
  }
  storage?: string
  approvalDate?: string
  lastUpdated: string // ISO日期字符串
}

// 药物相互作用
export interface DrugInteraction {
  drugId: string
  drugName: string
  interactionEffect: string
  severity: "轻微" | "中度" | "严重" | "禁忌"
  mechanism?: string
  managementRecommendations?: string
}

// 医生笔记/评论
export interface DoctorNote {
  id: string
  doctorId: string
  doctorName: string
  doctorSpecialty: string
  targetType: "disease" | "treatment" | "reference" | "medication"
  targetId: string
  content: string
  rating?: 1 | 2 | 3 | 4 | 5
  tags?: string[]
  createdAt: string
  updatedAt?: string
  upvotes: number
  downvotes: number
  replies?: DoctorNoteReply[]
  isPrivate: boolean
}

// 医生笔记回复
export interface DoctorNoteReply {
  id: string
  doctorId: string
  doctorName: string
  content: string
  createdAt: string
  updatedAt?: string
  upvotes: number
  downvotes: number
}

// 医生个人资料
export interface DoctorProfile {
  id: string
  name: string
  specialty: string
  subspecialties?: string[]
  hospital?: string
  department?: string
  position?: string
  interests: string[]
  recentSearches: {
    term: string
    timestamp: string
    type: "disease" | "treatment" | "medication" | "general"
  }[]
  savedItems: {
    id: string
    type: "disease" | "treatment" | "reference" | "medication" | "note"
    savedAt: string
  }[]
  preferences: {
    preferredEvidenceLevel?: "A" | "B" | "C" | "D" | "E"
    preferredLanguage?: string
    notificationSettings?: {
      newResearch: boolean
      guidelineUpdates: boolean
      colleagueNotes: boolean
    }
    displaySettings?: {
      darkMode: boolean
      fontSize: "small" | "medium" | "large"
      compactView: boolean
    }
  }
  contributionStats?: {
    notesAdded: number
    repliesAdded: number
    upvotesReceived: number
  }
}

// 知识库更新记录
export interface KnowledgeBaseUpdate {
  id: string
  updateType: "新增" | "修改" | "删除"
  contentType: "disease" | "treatment" | "reference" | "medication"
  contentId: string
  contentName: string
  updateSummary: string
  updateDetails?: string
  source?: string
  updatedAt: string
  updatedBy?: string
  importance: "低" | "中" | "高" | "紧急"
  specialtyRelevance?: string[]
}
