// AI模型相关类型定义
export interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  capabilities: ModelCapability[]
  pricing: ModelPricing
  limits: ModelLimits
  status: "active" | "inactive" | "maintenance"
  version: string
  supportedLanguages: string[]
  maxTokens: number
  contextWindow: number
}

export interface ModelCapability {
  type: "text-generation" | "image-analysis" | "code-generation" | "translation" | "medical-analysis"
  description: string
  supported: boolean
}

export interface ModelPricing {
  inputTokenPrice: number // 每1K tokens价格
  outputTokenPrice: number
  currency: string
  billingUnit: string
}

export interface ModelLimits {
  requestsPerMinute: number
  requestsPerDay: number
  tokensPerMinute: number
  tokensPerDay: number
}

export interface AIProvider {
  id: string
  name: string
  displayName: string
  description: string
  website: string
  apiBaseUrl: string
  authType: "api-key" | "oauth" | "bearer-token"
  requiredFields: ProviderField[]
  supportedModels: string[]
  isActive: boolean
  logo?: string
}

export interface ProviderField {
  key: string
  label: string
  type: "text" | "password" | "url" | "select"
  required: boolean
  placeholder?: string
  options?: { label: string; value: string }[]
}

export interface AIProviderConfig {
  id: string
  providerId: string
  name: string
  credentials: Record<string, string>
  settings: Record<string, any>
  isActive: boolean
  createdAt: string
  updatedAt: string
  lastTested?: string
  testStatus?: "success" | "failed" | "pending"
  testMessage?: string
}

export interface AIRequest {
  id: string
  providerId: string
  modelId: string
  prompt: string
  response?: string
  tokens: {
    input: number
    output: number
    total: number
  }
  cost: number
  duration: number
  status: "pending" | "success" | "failed" | "timeout"
  error?: string
  timestamp: string
  userId: string
  metadata?: Record<string, any>
}

export interface AIUsageStats {
  providerId: string
  modelId: string
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  totalTokens: number
  totalCost: number
  averageResponseTime: number
  period: string
}
