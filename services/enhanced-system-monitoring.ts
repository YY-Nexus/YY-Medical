// 增强系统监控服务
export interface SystemMetrics {
  timestamp: string
  cpu: {
    usage: number
    cores: number
    temperature?: number
  }
  memory: {
    used: number
    total: number
    usage: number
    swap?: {
      used: number
      total: number
    }
  }
  disk: {
    used: number
    total: number
    usage: number
    iops?: number
  }
  network: {
    bytesIn: number
    bytesOut: number
    packetsIn: number
    packetsOut: number
    latency?: number
  }
  database: {
    connections: number
    maxConnections: number
    queryTime: number
    lockWaits: number
  }
  application: {
    activeUsers: number
    requestsPerSecond: number
    responseTime: number
    errorRate: number
  }
}

export interface AlertRule {
  id: string
  name: string
  description: string
  metric: string
  condition: ">" | "<" | "=" | ">=" | "<="
  threshold: number
  severity: "low" | "medium" | "high" | "critical"
  enabled: boolean
  notifications: {
    email: string[]
    sms: string[]
    webhook?: string
  }
  cooldown: number // 分钟
  lastTriggered?: string
}

export interface SystemAlert {
  id: string
  ruleId: string
  ruleName: string
  severity: "low" | "medium" | "high" | "critical"
  message: string
  value: number
  threshold: number
  timestamp: string
  status: "active" | "resolved" | "acknowledged"
  acknowledgedBy?: string
  acknowledgedAt?: string
  resolvedAt?: string
}

export interface PerformanceBaseline {
  metric: string
  period: "hour" | "day" | "week" | "month"
  baseline: number
  variance: number
  confidence: number
  lastUpdated: string
}

// 模拟系统指标数据
const generateMockMetrics = (): SystemMetrics => ({
  timestamp: new Date().toISOString(),
  cpu: {
    usage: Math.random() * 100,
    cores: 8,
    temperature: 45 + Math.random() * 20,
  },
  memory: {
    used: 8 + Math.random() * 8,
    total: 32,
    usage: ((8 + Math.random() * 8) / 32) * 100,
    swap: {
      used: Math.random() * 2,
      total: 4,
    },
  },
  disk: {
    used: 500 + Math.random() * 300,
    total: 1000,
    usage: ((500 + Math.random() * 300) / 1000) * 100,
    iops: Math.floor(Math.random() * 1000),
  },
  network: {
    bytesIn: Math.floor(Math.random() * 1000000),
    bytesOut: Math.floor(Math.random() * 1000000),
    packetsIn: Math.floor(Math.random() * 1000),
    packetsOut: Math.floor(Math.random() * 1000),
    latency: Math.random() * 50,
  },
  database: {
    connections: Math.floor(Math.random() * 100),
    maxConnections: 200,
    queryTime: Math.random() * 10,
    lockWaits: Math.floor(Math.random() * 5),
  },
  application: {
    activeUsers: Math.floor(Math.random() * 500),
    requestsPerSecond: Math.random() * 100,
    responseTime: Math.random() * 0.5,
    errorRate: Math.random() * 0.01,
  },
})

// 模拟告警规则数据
const mockAlertRules: AlertRule[] = [
  {
    id: "1",
    name: "CPU Usage High",
    description: "CPU 使用率超过 80%",
    metric: "cpu.usage",
    condition: ">",
    threshold: 80,
    severity: "high",
    enabled: true,
    notifications: {
      email: ["admin@example.com"],
      sms: ["1234567890"],
    },
    cooldown: 5,
    lastTriggered: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 小时前
  },
  {
    id: "2",
    name: "Memory Usage High",
    description: "内存使用率超过 90%",
    metric: "memory.usage",
    condition: ">",
    threshold: 90,
    severity: "medium",
    enabled: true,
    notifications: {
      email: ["admin@example.com"],
      sms: [],
    },
    cooldown: 10,
  },
  {
    id: "3",
    name: "Database Connections Approaching Limit",
    description: "数据库连接数接近最大连接数",
    metric: "database.connections",
    condition: ">=",
    threshold: 150,
    severity: "medium",
    enabled: true,
    notifications: {
      email: ["dba@example.com"],
      sms: [],
    },
    cooldown: 15,
  },
]

// 模拟性能基线数据
const mockPerformanceBaselines: PerformanceBaseline[] = [
  {
    metric: "cpu.usage",
    period: "hour",
    baseline: 50,
    variance: 10,
    confidence: 0.95,
    lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 天前
  },
  {
    metric: "memory.usage",
    period: "day",
    baseline: 70,
    variance: 15,
    confidence: 0.9,
    lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 周前
  },
]

// 模拟系统告警数据
const mockSystemAlerts: SystemAlert[] = [
  {
    id: "alert-1",
    ruleId: "1",
    ruleName: "CPU Usage High",
    severity: "high",
    message: "CPU 使用率已超过 80%",
    value: 85,
    threshold: 80,
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 分钟前
    status: "active",
  },
  {
    id: "alert-2",
    ruleId: "2",
    ruleName: "Memory Usage High",
    severity: "medium",
    message: "内存使用率已超过 90%",
    value: 92,
    threshold: 90,
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 分钟前
    status: "active",
  },
]

// 服务：获取系统指标
export const getSystemMetrics = (): SystemMetrics => {
  return generateMockMetrics()
}

// 服务：获取所有告警规则
export const getAllAlertRules = (): AlertRule[] => {
  return mockAlertRules
}

// 服务：根据 ID 获取告警规则
export const getAlertRuleById = (id: string): AlertRule | undefined => {
  return mockAlertRules.find((rule) => rule.id === id)
}

// 服务：创建告警规则
export const createAlertRule = (rule: AlertRule): AlertRule => {
  const newRule = { ...rule, id: Math.random().toString(36).substring(2, 15) }
  mockAlertRules.push(newRule)
  return newRule
}

// 服务：更新告警规则
export const updateAlertRule = (id: string, rule: AlertRule): AlertRule | undefined => {
  const index = mockAlertRules.findIndex((rule) => rule.id === id)
  if (index !== -1) {
    mockAlertRules[index] = { ...rule, id }
    return mockAlertRules[index]
  }
  return undefined
}

// 服务：删除告警规则
export const deleteAlertRule = (id: string): boolean => {
  const index = mockAlertRules.findIndex((rule) => rule.id === id)
  if (index !== -1) {
    mockAlertRules.splice(index, 1)
    return true
  }
  return false
}

// 服务：获取所有系统告警
export const getAllSystemAlerts = (): SystemAlert[] => {
  return mockSystemAlerts
}

// 服务：根据 ID 获取系统告警
export const getSystemAlertById = (id: string): SystemAlert | undefined => {
  return mockSystemAlerts.find((alert) => alert.id === id)
}

// 服务：更新系统告警状态
export const updateSystemAlertStatus = (
  id: string,
  status: SystemAlert["status"],
  user?: string,
): SystemAlert | undefined => {
  const alertIndex = mockSystemAlerts.findIndex((alert) => alert.id === id)
  if (alertIndex !== -1) {
    const alert = mockSystemAlerts[alertIndex]
    alert.status = status
    if (status === "acknowledged") {
      alert.acknowledgedBy = user
      alert.acknowledgedAt = new Date().toISOString()
    } else if (status === "resolved") {
      alert.resolvedAt = new Date().toISOString()
    }
    mockSystemAlerts[alertIndex] = alert
    return alert
  }
  return undefined
}

// 服务：获取性能基线
export const getPerformanceBaselines = (): PerformanceBaseline[] => {
  return mockPerformanceBaselines
}

// 服务：根据指标获取性能基线
export const getPerformanceBaselineByMetric = (metric: string): PerformanceBaseline | undefined => {
  return mockPerformanceBaselines.find((baseline) => baseline.metric === metric)
}

// 创建systemMonitoringService对象
export const systemMonitoringService = {
  getSystemMetrics,
  getAllAlertRules,
  getAlertRuleById,
  createAlertRule,
  updateAlertRule,
  deleteAlertRule,
  getAllSystemAlerts,
  getSystemAlertById,
  updateSystemAlertStatus,
  getPerformanceBaselines,
  getPerformanceBaselineByMetric,
}
