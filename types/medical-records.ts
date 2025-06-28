// 影像模态配置
export interface ModalityConfig {
  id: string
  name: string
  icon: string
  description: string
  supportedFormats: string[]
  isAvailable: boolean
}

// AI 模型
export interface AIModel {
  id: string
  name: string
  version: string
  modalities: string[]
  description: string
  accuracy: number
  lastUpdated: string
}

// 单模态分析结果
export interface ModalityAnalysisResult {
  modalityId: string
  modalityName: string
  findings: DiagnosticFinding[]
  processingTime: number
  modelId: string
  modelVersion: string
  timestamp: string
}

// 跨模态分析结果
export interface CrossModalAnalysisResult {
  id: string
  patientId: string | undefined
  modalityResults: ModalityAnalysisResult[]
  integratedFindings: DiagnosticFinding[]
  confidenceScore: number
  analysisDate: string
  clinicalContext: string
  recommendations: string[]
}

// 诊断发现
export interface DiagnosticFinding {
  id: string
  modality: string
  area: string
  finding: string
  size?: string
  confidence: number
  severity: "critical" | "severe" | "moderate" | "mild" | "normal"
  recommendation: string
  details?: string
  coordinates?: {
    x: number
    y: number
    width?: number
    height?: number
  }
}
