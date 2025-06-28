import type { AIProvider, AIProviderConfig, AIModel, AIRequest, AIUsageStats } from "@/types/ai-models"

// 预定义的AI提供商配置
const PREDEFINED_PROVIDERS: AIProvider[] = [
  {
    id: "openai",
    name: "openai",
    displayName: "OpenAI",
    description: "OpenAI GPT系列模型，包括GPT-4、GPT-3.5等",
    website: "https://openai.com",
    apiBaseUrl: "https://api.openai.com/v1",
    authType: "api-key",
    requiredFields: [
      {
        key: "apiKey",
        label: "API密钥",
        type: "password",
        required: true,
        placeholder: "sk-...",
      },
      {
        key: "organization",
        label: "组织ID（可选）",
        type: "text",
        required: false,
        placeholder: "org-...",
      },
    ],
    supportedModels: ["gpt-4", "gpt-4-turbo", "gpt-3.5-turbo", "gpt-4o"],
    isActive: true,
    logo: "/logos/openai.svg",
  },
  {
    id: "deepseek",
    name: "deepseek",
    displayName: "DeepSeek",
    description: "DeepSeek深度求索AI模型",
    website: "https://www.deepseek.com",
    apiBaseUrl: "https://api.deepseek.com",
    authType: "api-key",
    requiredFields: [
      {
        key: "apiKey",
        label: "API密钥",
        type: "password",
        required: true,
        placeholder: "sk-...",
      },
    ],
    supportedModels: ["deepseek-chat", "deepseek-coder"],
    isActive: true,
    logo: "/logos/deepseek.svg",
  },
  {
    id: "anthropic",
    name: "anthropic",
    displayName: "Anthropic Claude",
    description: "Anthropic Claude系列模型",
    website: "https://www.anthropic.com",
    apiBaseUrl: "https://api.anthropic.com",
    authType: "api-key",
    requiredFields: [
      {
        key: "apiKey",
        label: "API密钥",
        type: "password",
        required: true,
        placeholder: "sk-ant-...",
      },
    ],
    supportedModels: ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"],
    isActive: true,
    logo: "/logos/anthropic.svg",
  },
  {
    id: "baidu",
    name: "baidu",
    displayName: "百度文心一言",
    description: "百度文心一言大模型",
    website: "https://cloud.baidu.com",
    apiBaseUrl: "https://aip.baidubce.com",
    authType: "api-key",
    requiredFields: [
      {
        key: "apiKey",
        label: "API Key",
        type: "password",
        required: true,
      },
      {
        key: "secretKey",
        label: "Secret Key",
        type: "password",
        required: true,
      },
    ],
    supportedModels: ["ernie-bot", "ernie-bot-turbo", "ernie-bot-4"],
    isActive: true,
    logo: "/logos/baidu.svg",
  },
  {
    id: "alibaba",
    name: "alibaba",
    displayName: "阿里通义千问",
    description: "阿里巴巴通义千问大模型",
    website: "https://tongyi.aliyun.com",
    apiBaseUrl: "https://dashscope.aliyuncs.com",
    authType: "api-key",
    requiredFields: [
      {
        key: "apiKey",
        label: "API密钥",
        type: "password",
        required: true,
        placeholder: "sk-...",
      },
    ],
    supportedModels: ["qwen-turbo", "qwen-plus", "qwen-max"],
    isActive: true,
    logo: "/logos/alibaba.svg",
  },
  {
    id: "tencent",
    name: "tencent",
    displayName: "腾讯混元",
    description: "腾讯混元大模型",
    website: "https://cloud.tencent.com",
    apiBaseUrl: "https://hunyuan.tencentcloudapi.com",
    authType: "api-key",
    requiredFields: [
      {
        key: "secretId",
        label: "Secret ID",
        type: "text",
        required: true,
      },
      {
        key: "secretKey",
        label: "Secret Key",
        type: "password",
        required: true,
      },
      {
        key: "region",
        label: "地域",
        type: "select",
        required: true,
        options: [
          { label: "北京", value: "ap-beijing" },
          { label: "上海", value: "ap-shanghai" },
          { label: "广州", value: "ap-guangzhou" },
        ],
      },
    ],
    supportedModels: ["hunyuan-lite", "hunyuan-standard", "hunyuan-pro"],
    isActive: true,
    logo: "/logos/tencent.svg",
  },
  {
    id: "zhipu",
    name: "zhipu",
    displayName: "智谱AI",
    description: "智谱AI GLM系列模型",
    website: "https://www.zhipuai.cn",
    apiBaseUrl: "https://open.bigmodel.cn/api/paas/v4",
    authType: "api-key",
    requiredFields: [
      {
        key: "apiKey",
        label: "API密钥",
        type: "password",
        required: true,
      },
    ],
    supportedModels: ["glm-4", "glm-3-turbo", "chatglm3-6b"],
    isActive: true,
    logo: "/logos/zhipu.svg",
  },
  {
    id: "moonshot",
    name: "moonshot",
    displayName: "月之暗面 Kimi",
    description: "月之暗面 Kimi 大模型",
    website: "https://www.moonshot.cn",
    apiBaseUrl: "https://api.moonshot.cn/v1",
    authType: "api-key",
    requiredFields: [
      {
        key: "apiKey",
        label: "API密钥",
        type: "password",
        required: true,
        placeholder: "sk-...",
      },
    ],
    supportedModels: ["moonshot-v1-8k", "moonshot-v1-32k", "moonshot-v1-128k"],
    isActive: true,
    logo: "/logos/moonshot.svg",
  },
]

// 预定义的AI模型配置
const PREDEFINED_MODELS: AIModel[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    provider: "openai",
    description: "OpenAI最先进的大语言模型",
    capabilities: [
      { type: "text-generation", description: "文本生成", supported: true },
      { type: "code-generation", description: "代码生成", supported: true },
      { type: "translation", description: "翻译", supported: true },
      { type: "medical-analysis", description: "医疗分析", supported: true },
    ],
    pricing: {
      inputTokenPrice: 0.03,
      outputTokenPrice: 0.06,
      currency: "USD",
      billingUnit: "1K tokens",
    },
    limits: {
      requestsPerMinute: 500,
      requestsPerDay: 10000,
      tokensPerMinute: 150000,
      tokensPerDay: 1000000,
    },
    status: "active",
    version: "gpt-4-0613",
    supportedLanguages: ["zh-CN", "en-US", "ja-JP", "ko-KR"],
    maxTokens: 8192,
    contextWindow: 8192,
  },
  {
    id: "deepseek-chat",
    name: "DeepSeek Chat",
    provider: "deepseek",
    description: "DeepSeek对话模型",
    capabilities: [
      { type: "text-generation", description: "文本生成", supported: true },
      { type: "code-generation", description: "代码生成", supported: true },
      { type: "medical-analysis", description: "医疗分析", supported: true },
    ],
    pricing: {
      inputTokenPrice: 0.0014,
      outputTokenPrice: 0.0028,
      currency: "USD",
      billingUnit: "1K tokens",
    },
    limits: {
      requestsPerMinute: 300,
      requestsPerDay: 5000,
      tokensPerMinute: 100000,
      tokensPerDay: 500000,
    },
    status: "active",
    version: "deepseek-chat",
    supportedLanguages: ["zh-CN", "en-US"],
    maxTokens: 4096,
    contextWindow: 32768,
  },
  // 可以继续添加更多模型...
]

export const aiProviderService = {
  // 获取所有预定义提供商
  getAllProviders: async (): Promise<AIProvider[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...PREDEFINED_PROVIDERS]
  },

  // 获取特定提供商
  getProvider: async (providerId: string): Promise<AIProvider | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return PREDEFINED_PROVIDERS.find((p) => p.id === providerId) || null
  },

  // 获取所有模型
  getAllModels: async (): Promise<AIModel[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...PREDEFINED_MODELS]
  },

  // 获取特定提供商的模型
  getModelsByProvider: async (providerId: string): Promise<AIModel[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return PREDEFINED_MODELS.filter((m) => m.provider === providerId)
  },

  // 保存提供商配置
  saveProviderConfig: async (
    config: Omit<AIProviderConfig, "id" | "createdAt" | "updatedAt">,
  ): Promise<AIProviderConfig> => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newConfig: AIProviderConfig = {
      ...config,
      id: `config-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    console.log("保存AI提供商配置:", newConfig)
    return newConfig
  },

  // 测试提供商连接
  testProviderConnection: async (
    config: AIProviderConfig,
  ): Promise<{
    success: boolean
    message: string
    latency?: number
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 模拟测试结果
    const success = Math.random() > 0.2 // 80%成功率

    return {
      success,
      message: success ? "连接测试成功" : "连接失败，请检查API密钥",
      latency: success ? Math.floor(Math.random() * 500) + 100 : undefined,
    }
  },

  // 获取使用统计
  getUsageStats: async (providerId?: string, period = "7d"): Promise<AIUsageStats[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    // 模拟统计数据
    const mockStats: AIUsageStats[] = [
      {
        providerId: "openai",
        modelId: "gpt-4",
        totalRequests: 1250,
        successfulRequests: 1200,
        failedRequests: 50,
        totalTokens: 125000,
        totalCost: 15.75,
        averageResponseTime: 850,
        period,
      },
      {
        providerId: "deepseek",
        modelId: "deepseek-chat",
        totalRequests: 800,
        successfulRequests: 790,
        failedRequests: 10,
        totalTokens: 80000,
        totalCost: 2.24,
        averageResponseTime: 650,
        period,
      },
    ]

    return providerId ? mockStats.filter((s) => s.providerId === providerId) : mockStats
  },

  // 发送AI请求
  sendRequest: async (request: {
    providerId: string
    modelId: string
    prompt: string
    options?: Record<string, any>
  }): Promise<AIRequest> => {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 模拟AI响应
    const mockResponse = `这是来自${request.providerId}模型${request.modelId}的响应：\n\n针对您的问题"${request.prompt}"，我的回答是...`

    const aiRequest: AIRequest = {
      id: `req-${Date.now()}`,
      providerId: request.providerId,
      modelId: request.modelId,
      prompt: request.prompt,
      response: mockResponse,
      tokens: {
        input: Math.floor(request.prompt.length / 4),
        output: Math.floor(mockResponse.length / 4),
        total: Math.floor((request.prompt.length + mockResponse.length) / 4),
      },
      cost: 0.05,
      duration: 1200,
      status: "success",
      timestamp: new Date().toISOString(),
      userId: "current-user",
      metadata: request.options,
    }

    return aiRequest
  },
}
