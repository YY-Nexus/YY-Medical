import type { ApiKeyConfig, ProviderApiConfig } from "@/types/api-config"

// 模拟API配置数据
const mockApiConfigs: ProviderApiConfig[] = [
  {
    id: "nhc-api",
    providerId: "nhc",
    providerName: "国家卫健委医师资格认证中心",
    description: "国家卫健委官方医师资格认证API",
    baseUrl: "https://api.nhc.gov.cn",
    apiVersion: "v1",
    isActive: true,
    lastTested: "2025-05-14T08:30:00Z",
    testStatus: "success",
    testMessage: "连接成功",
    apiKeys: [
      {
        id: "nhc-prod-key",
        name: "生产环境密钥",
        key: "nhc_prod_xxxxxxxxxxxxx",
        secret: "sk_nhc_yyyyyyyyyyyyy",
        isActive: true,
        createdAt: "2025-01-15T00:00:00Z",
        expiresAt: "2026-01-15T00:00:00Z",
        environment: "production",
      },
      {
        id: "nhc-test-key",
        name: "测试环境密钥",
        key: "nhc_test_xxxxxxxxxxxxx",
        secret: "sk_nhc_test_yyyyyyyyy",
        isActive: true,
        createdAt: "2025-01-15T00:00:00Z",
        environment: "testing",
      },
    ],
    endpoints: [
      {
        id: "nhc-verify-endpoint",
        name: "资质验证",
        url: "/api/v1/certifications/verify",
        method: "POST",
        requiresAuth: true,
        timeout: 30000,
        retryCount: 2,
      },
      {
        id: "nhc-status-endpoint",
        name: "验证状态查询",
        url: "/api/v1/certifications/status",
        method: "GET",
        requiresAuth: true,
        timeout: 15000,
        retryCount: 1,
      },
    ],
  },
  {
    id: "cmda-api",
    providerId: "cmda",
    providerName: "中国医师协会认证中心",
    description: "中国医师协会官方认证API",
    baseUrl: "https://api.cmda.org.cn",
    apiVersion: "v2",
    isActive: true,
    lastTested: "2025-05-10T14:15:00Z",
    testStatus: "success",
    testMessage: "连接成功",
    apiKeys: [
      {
        id: "cmda-prod-key",
        name: "生产环境密钥",
        key: "cmda_prod_xxxxxxxxxxxxx",
        isActive: true,
        createdAt: "2025-02-20T00:00:00Z",
        environment: "production",
      },
    ],
    endpoints: [
      {
        id: "cmda-verify-endpoint",
        name: "资质验证",
        url: "/api/v2/verify",
        method: "POST",
        requiresAuth: true,
        timeout: 25000,
        retryCount: 2,
      },
    ],
  },
  {
    id: "medverify-api",
    providerId: "medverify",
    providerName: "医证通快速验证服务",
    description: "第三方快速医疗资质验证服务",
    baseUrl: "https://api.medverify.cn",
    apiVersion: "v3",
    isActive: false,
    lastTested: "2025-05-01T09:45:00Z",
    testStatus: "failed",
    testMessage: "API密钥已过期",
    apiKeys: [
      {
        id: "medverify-key",
        name: "API密钥",
        key: "mv_xxxxxxxxxxxxx",
        isActive: false,
        createdAt: "2024-11-01T00:00:00Z",
        expiresAt: "2025-05-01T00:00:00Z",
        environment: "production",
      },
    ],
    endpoints: [
      {
        id: "medverify-verify-endpoint",
        name: "快速验证",
        url: "/api/v3/fast-verify",
        method: "POST",
        requiresAuth: true,
        timeout: 10000,
        retryCount: 1,
      },
    ],
  },
]

export const apiConfigService = {
  // 获取所有API配置
  getAllApiConfigs: async (): Promise<ProviderApiConfig[]> => {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [...mockApiConfigs]
  },

  // 获取特定提供商的API配置
  getApiConfigByProviderId: async (providerId: string): Promise<ProviderApiConfig | null> => {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 300))
    const config = mockApiConfigs.find((config) => config.providerId === providerId)
    return config ? { ...config } : null
  },

  // 更新API配置
  updateApiConfig: async (config: ProviderApiConfig): Promise<ProviderApiConfig> => {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 800))

    // 在实际应用中，这里会调用后端API保存配置
    console.log("保存API配置:", config)

    return { ...config }
  },

  // 添加新的API密钥
  addApiKey: async (providerId: string, apiKey: Omit<ApiKeyConfig, "id">): Promise<ApiKeyConfig> => {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 600))

    // 生成新ID
    const newKey: ApiKeyConfig = {
      ...apiKey,
      id: `key-${Date.now()}`,
    }

    console.log("添加API密钥:", providerId, newKey)

    return newKey
  },

  // 删除API密钥
  deleteApiKey: async (providerId: string, keyId: string): Promise<boolean> => {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log("删除API密钥:", providerId, keyId)

    return true
  },

  // 测试API连接
  testApiConnection: async (
    providerId: string,
  ): Promise<{
    success: boolean
    message: string
    timestamp: string
  }> => {
    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 模拟测试结果 - 80%成功率
    const success = Math.random() > 0.2

    return {
      success,
      message: success ? "API连接测试成功" : "API连接失败，请检查配置",
      timestamp: new Date().toISOString(),
    }
  },
}
