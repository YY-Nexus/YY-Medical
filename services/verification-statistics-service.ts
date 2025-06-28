import type {
  VerificationStatistics,
  ProviderUsageStats,
  ApiUsageAlertConfig,
  ApiUsageAlertRecord,
  ApiUsageData,
} from "@/types/verification-statistics"

// 生成随机统计数据的辅助函数
const generateRandomStats = (): VerificationStatistics => {
  // 验证机构数据
  const providers = [
    { id: "nhc", name: "国家卫健委医师资格认证中心" },
    { id: "cmda", name: "中国医师协会认证中心" },
    { id: "medverify", name: "医证通快速验证服务" },
    { id: "healthcert", name: "健康证书验证联盟" },
  ]

  // 生成提供商统计数据
  const providerStats: ProviderUsageStats[] = providers.map((provider) => {
    const totalVerifications = Math.floor(Math.random() * 1000) + 100
    const successCount = Math.floor(totalVerifications * (0.7 + Math.random() * 0.25))
    const failedCount = Math.floor((totalVerifications - successCount) * 0.8)
    const pendingCount = totalVerifications - successCount - failedCount

    return {
      providerId: provider.id,
      providerName: provider.name,
      totalVerifications,
      successCount,
      failedCount,
      pendingCount,
      successRate: successCount / totalVerifications,
      averageResponseTime: Math.random() * 5 + 0.5, // 0.5-5.5秒
      costTotal: totalVerifications * (Math.random() * 2 + 0.5), // 0.5-2.5元每次
      lastUsed: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(), // 最近7天内
    }
  })

  // 计算总体统计数据
  const totalVerifications = providerStats.reduce((sum, provider) => sum + provider.totalVerifications, 0)
  const totalSuccessCount = providerStats.reduce((sum, provider) => sum + provider.successCount, 0)
  const totalCost = providerStats.reduce((sum, provider) => sum + provider.costTotal, 0)
  const averageResponseTime =
    providerStats.reduce((sum, provider) => sum + provider.averageResponseTime, 0) / providers.length

  // 生成结果分布
  const resultDistribution = [
    {
      label: "验证成功",
      value: totalSuccessCount,
      percentage: totalSuccessCount / totalVerifications,
    },
    {
      label: "验证失败",
      value: providerStats.reduce((sum, provider) => sum + provider.failedCount, 0),
      percentage: providerStats.reduce((sum, provider) => sum + provider.failedCount, 0) / totalVerifications,
    },
    {
      label: "验证中",
      value: providerStats.reduce((sum, provider) => sum + provider.pendingCount, 0),
      percentage: providerStats.reduce((sum, provider) => sum + provider.pendingCount, 0) / totalVerifications,
    },
  ]

  // 生成失败原因分布
  const totalFailures = providerStats.reduce((sum, provider) => sum + provider.failedCount, 0)
  const failureReasons = [
    {
      reason: "证书编号无效",
      count: Math.floor(totalFailures * (0.3 + Math.random() * 0.2)),
      percentage: 0, // 将在下面计算
    },
    {
      reason: "证书已过期",
      count: Math.floor(totalFailures * (0.2 + Math.random() * 0.15)),
      percentage: 0,
    },
    {
      reason: "证书信息不匹配",
      count: Math.floor(totalFailures * (0.15 + Math.random() * 0.1)),
      percentage: 0,
    },
    {
      reason: "验证超时",
      count: Math.floor(totalFailures * (0.05 + Math.random() * 0.1)),
      percentage: 0,
    },
    {
      reason: "其他原因",
      count: 0, // 将在下面计算
      percentage: 0,
    },
  ]

  // 计算"其他原因"的数量和所有原因的百分比
  const countedFailures = failureReasons.reduce((sum, reason) => sum + reason.count, 0)
  failureReasons[4].count = totalFailures - countedFailures
  failureReasons.forEach((reason) => {
    reason.percentage = reason.count / totalFailures
  })

  // 生成证书类型分布
  const certTypes = [
    { type: "执业医师资格证", id: "doctor-license" },
    { type: "专科医师资格证", id: "specialist-certificate" },
    { type: "医疗机构执业许可证", id: "practice-permit" },
    { type: "继续教育证书", id: "continuing-education" },
    { type: "其他证书", id: "other" },
  ]

  const certificationTypes = certTypes.map((cert) => {
    const count = Math.floor(totalVerifications * (0.1 + Math.random() * 0.3))
    return {
      type: cert.type,
      count,
      percentage: count / totalVerifications,
    }
  })

  // 调整百分比，确保总和为1
  const totalCertCount = certificationTypes.reduce((sum, cert) => sum + cert.count, 0)
  certificationTypes.forEach((cert) => {
    cert.count = Math.floor((cert.count / totalCertCount) * totalVerifications)
    cert.percentage = cert.count / totalVerifications
  })
  // 确保总数正确
  const currentTotal = certificationTypes.reduce((sum, cert) => sum + cert.count, 0)
  certificationTypes[0].count += totalVerifications - currentTotal

  // 生成时间段统计
  const timeRanges = ["今日", "昨日", "本周", "上周", "本月", "上月"]
  const timeRangeStats = timeRanges.map((range) => {
    const rangeVerifications = Math.floor(Math.random() * 500) + 50
    return {
      timeRange: range,
      totalVerifications: rangeVerifications,
      successRate: 0.7 + Math.random() * 0.25,
      averageResponseTime: Math.random() * 5 + 0.5,
      costTotal: rangeVerifications * (Math.random() * 2 + 0.5),
    }
  })

  // 生成API使用趋势数据
  const apiUsageTrend: ApiUsageData[] = []
  const now = new Date()
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split("T")[0]

    // 为每个提供商生成数据
    providers.forEach((provider) => {
      const calls = Math.floor(Math.random() * 50) + 5
      apiUsageTrend.push({
        date: dateStr,
        calls,
        cost: calls * (Math.random() * 0.5 + 0.5),
        provider: provider.id,
      })
    })
  }

  // 生成警报记录
  const alertRecords: ApiUsageAlertRecord[] = []
  for (let i = 0; i < 3; i++) {
    const provider = providers[Math.floor(Math.random() * providers.length)]
    const metricType = Math.random() > 0.5 ? "calls" : "cost"
    const threshold =
      metricType === "calls" ? 100 + Math.floor(Math.random() * 900) : 50 + Math.floor(Math.random() * 450)
    const actualValue = threshold + Math.floor(Math.random() * 100)

    alertRecords.push({
      id: `alert-${i + 1}`,
      alertConfigId: `config-${i + 1}`,
      providerId: provider.id,
      providerName: provider.name,
      metricType,
      threshold,
      actualValue,
      triggeredAt: new Date(Date.now() - Math.random() * 86400000 * 14).toISOString(),
      notifiedTo: ["admin@example.com", "manager@example.com"],
    })
  }

  // 返回完整的统计数据
  return {
    timeRange: {
      start: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
      end: now.toISOString(),
    },
    overview: {
      totalVerifications,
      successRate: totalSuccessCount / totalVerifications,
      averageResponseTime,
      totalCost,
      activeProviders: providers.length,
    },
    providerStats,
    resultDistribution,
    failureReasons,
    certificationTypes,
    timeRangeStats,
    apiUsageTrend,
    alerts: {
      activeAlerts: 5,
      triggeredAlerts: alertRecords,
    },
  }
}

// 验证统计服务
export const verificationStatisticsService = {
  // 获取验证统计数据
  getStatistics: async (
    timeRange?: { start: string; end: string },
    providerId?: string,
  ): Promise<VerificationStatistics> => {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 800))

    // 生成随机统计数据
    const stats = generateRandomStats()

    // 如果指定了提供商ID，过滤数据
    if (providerId) {
      stats.providerStats = stats.providerStats.filter((provider) => provider.providerId === providerId)
      // 重新计算总体统计
      if (stats.providerStats.length > 0) {
        const provider = stats.providerStats[0]
        stats.overview.totalVerifications = provider.totalVerifications
        stats.overview.successRate = provider.successRate
        stats.overview.averageResponseTime = provider.averageResponseTime
        stats.overview.totalCost = provider.costTotal
        stats.overview.activeProviders = 1
      }
    }

    // 如果指定了时间范围，更新时间范围
    if (timeRange) {
      stats.timeRange = timeRange
    }

    return stats
  },

  // 获取API使用量警报配置
  getApiUsageAlerts: async (): Promise<ApiUsageAlertConfig[]> => {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 500))

    // 返回模拟的警报配置
    return [
      {
        id: "alert-1",
        providerId: "nhc",
        metricType: "calls",
        threshold: 1000,
        period: "monthly",
        isActive: true,
        notifyEmail: ["admin@example.com"],
        lastTriggered: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
      {
        id: "alert-2",
        providerId: "medverify",
        metricType: "cost",
        threshold: 500,
        period: "monthly",
        isActive: true,
        notifyEmail: ["admin@example.com", "finance@example.com"],
      },
      {
        id: "alert-3",
        providerId: "cmda",
        metricType: "calls",
        threshold: 100,
        period: "daily",
        isActive: false,
        notifyEmail: ["admin@example.com"],
        lastTriggered: new Date(Date.now() - 86400000 * 15).toISOString(),
      },
    ]
  },

  // 创建或更新API使用量警报配置
  saveApiUsageAlert: async (alert: ApiUsageAlertConfig): Promise<ApiUsageAlertConfig> => {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 600))

    // 模拟保存操作
    console.log("保存API使用量警报配置:", alert)

    // 返回保存的配置（添加ID如果是新配置）
    if (!alert.id) {
      alert.id = `alert-${Date.now()}`
    }

    return alert
  },

  // 删除API使用量警报配置
  deleteApiUsageAlert: async (alertId: string): Promise<boolean> => {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 400))

    // 模拟删除操作
    console.log("删除API使用量警报配置:", alertId)

    return true
  },

  // 获取API使用量详细数据
  getDetailedApiUsage: async (
    providerId?: string,
    timeRange?: { start: string; end: string },
    groupBy: "day" | "week" | "month" = "day",
  ): Promise<ApiUsageData[]> => {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 700))

    // 生成随机统计数据
    const stats = generateRandomStats()

    // 过滤并返回API使用趋势数据
    let filteredData = stats.apiUsageTrend

    if (providerId) {
      filteredData = filteredData.filter((item) => item.provider === providerId)
    }

    // 根据时间范围过滤
    if (timeRange) {
      const startDate = new Date(timeRange.start).getTime()
      const endDate = new Date(timeRange.end).getTime()
      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.date).getTime()
        return itemDate >= startDate && itemDate <= endDate
      })
    }

    return filteredData
  },
}
