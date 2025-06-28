// 典型病例库数据类型定义

// 病例严重程度
export type CaseSeverity = "轻度" | "中度" | "重度" | "危重"

// 病例状态
export type CaseStatus = "进行中" | "已完成" | "已归档"

// 病例类型
export type CaseType = "典型病例" | "疑难病例" | "教学病例" | "研究病例"

// 病例标签
export interface CaseTag {
  id: string
  name: string
  color: string
}

// 病例图像
export interface CaseImage {
  id: string
  url: string
  type: "CT" | "MRI" | "X光" | "超声" | "病理" | "内窥镜" | "其他"
  description: string
  findings: string[]
  annotationIds?: string[] // 关联的标注ID
  date: string
}

// 病例实验室检查
export interface CaseLab {
  id: string
  name: string
  value: string
  unit: string
  referenceRange: string
  isAbnormal: boolean
  date: string
}

// 病例治疗方案
export interface CaseTreatment {
  id: string
  type: "药物" | "手术" | "放疗" | "化疗" | "免疫治疗" | "其他"
  name: string
  description: string
  dosage?: string
  duration?: string
  outcome: string
  sideEffects?: string[]
  startDate: string
  endDate?: string
}

// 病例随访记录
export interface CaseFollowUp {
  id: string
  date: string
  status: "改善" | "稳定" | "恶化" | "复发" | "痊愈"
  description: string
  findings: string[]
  recommendations: string[]
}

// 病例知识点
export interface CaseKnowledgePoint {
  id: string
  title: string
  description: string
  importance: number // 1-10
  relatedNodeIds: string[] // 关联的知识图谱节点ID
}

// 病例评论
export interface CaseComment {
  id: string
  userId: string
  userName: string
  userRole: string
  content: string
  timestamp: string
  attachments?: {
    id: string
    type: string
    url: string
    name: string
  }[]
  replies?: {
    id: string
    userId: string
    userName: string
    userRole: string
    content: string
    timestamp: string
  }[]
}

// 典型病例
export interface ClinicalCase {
  id: string
  title: string
  patientInfo: {
    age: number
    gender: "男" | "女" | "其他"
    occupation?: string
    medicalHistory?: string[]
    familyHistory?: string[]
    allergies?: string[]
    lifestyle?: string[]
  }
  chiefComplaint: string
  presentIllness: string
  physicalExamination: string[]
  diagnosis: {
    primary: string
    differential: string[]
    icd10Code?: string
  }
  images: CaseImage[]
  labTests: CaseLab[]
  treatments: CaseTreatment[]
  followUps: CaseFollowUp[]
  outcome: string
  knowledgePoints: CaseKnowledgePoint[]
  tags: CaseTag[]
  type: CaseType
  severity: CaseSeverity
  status: CaseStatus
  createdBy: {
    id: string
    name: string
    role: string
  }
  createdAt: string
  updatedAt: string
  viewCount: number
  saveCount: number
  comments: CaseComment[]
  relatedCaseIds: string[]
  relatedNodeIds: string[] // 关联的知识图谱节点ID
}

// 病例库过滤选项
export interface CaseLibraryFilterOptions {
  searchQuery?: string
  tags?: string[]
  type?: CaseType[]
  severity?: CaseSeverity[]
  status?: CaseStatus[]
  dateRange?: {
    start: string
    end: string
  }
  createdBy?: string[]
  relatedNodeIds?: string[] // 关联的知识图谱节点ID
}

// 病例库排序选项
export type CaseLibrarySortOption = "最新添加" | "最多查看" | "最多保存" | "最新更新" | "严重程度" | "相关性"
