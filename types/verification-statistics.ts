// 验证结果类型
export type VerificationResultType = "success" | "failed" | "pending" | "expired"

// 验证机构使用统计
export interface ProviderUsageStats {
  providerId: string
  providerName: string
  totalVerifications: number
  successCount: number
  failedCount: number
  pendingCount: number
  successRate: number
  averageResponseTime: number
  costTotal: number
  lastUsed: string
}

// 验证结果分布
export interface ResultDistribution {
  label: string
  value: number
  percentage: number
}

// 失败原因分布
export interface FailureReasonDistribution {
  reason: string
  count: number
  percentage: number
}

// 验证类型分布
export interface CertificationTypeDistribution {
  type: string
  count: number
  percentage: number
}

// 时间段统计
export interface TimeRangeStats {
  timeRange: string
  totalVerifications: number
  successRate: number
  averageResponseTime: number
  costTotal: number
}

// API使用量数据
export interface ApiUsageData {
  date: string
  calls: number
  cost: number
  provider: string
}

// API使用量警报配置
export interface ApiUsageAlertConfig {
  id: string
  providerId: string
  metricType: "calls" | "cost"
  threshold: number
  period: "daily" | "weekly" | "monthly"
  isActive: boolean
  notifyEmail: string[]
  lastTriggered?: string
}

// API使用量警报记录
export interface ApiUsageAlertRecord {
  id: string
  alertConfigId: string
  providerId: string
  providerName: string
  metricType: "calls" | "cost"
  threshold: number
  actualValue: number
  triggeredAt: string
  notifiedTo: string[]
}

// 综合统计数据
export interface VerificationStatistics {
  timeRange: {
    start: string
    end: string
  }
  overview: {
    totalVerifications: number
    successRate: number
    averageResponseTime: number
    totalCost: number
    activeProviders: number
  }
  providerStats: ProviderUsageStats[]
  resultDistribution: ResultDistribution[]
  failureReasons: FailureReasonDistribution[]
  certificationTypes: CertificationTypeDistribution[]
  timeRangeStats: TimeRangeStats[]
  apiUsageTrend: ApiUsageData[]
  alerts: {
    activeAlerts: number
    triggeredAlerts: ApiUsageAlertRecord[]
  }
}
