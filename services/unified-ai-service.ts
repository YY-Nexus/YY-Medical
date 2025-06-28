// 统一AI服务接口
import type { AIProviderConfig } from "@/types/ai-models"

export interface UnifiedAIRequest {
  provider: string
  model: string
  messages: Array<{
    role: "system" | "user" | "assistant"
    content: string
  }>
  options?: {
    temperature?: number
    maxTokens?: number
    topP?: number
    stream?: boolean
  }
}

export interface UnifiedAIResponse {
  id: string
  content: string
  usage: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
  model: string
  provider: string
  finishReason: string
  cost: number
  duration: number
}

// 统一AI调用服务
export class UnifiedAIService {
  private configs: Map<string, AIProviderConfig> = new Map()

  // 注册提供商配置
  registerProvider(config: AIProviderConfig) {
    this.configs.set(config.providerId, config)
  }

  // 统一调用接口
  async chat(request: UnifiedAIRequest): Promise<UnifiedAIResponse> {
    const config = this.configs.get(request.provider)
    if (!config) {
      throw new Error(`未找到提供商配置: ${request.provider}`)
    }

    const startTime = Date.now()

    try {
      // 根据不同提供商调用相应的API
      const response = await this.callProviderAPI(request, config)
      const duration = Date.now() - startTime

      return {
        ...response,
        duration,
        provider: request.provider,
      }
    } catch (error) {
      throw new Error(`AI调用失败: ${error instanceof Error ? error.message : "未知错误"}`)
    }
  }

  // 调用具体提供商API
  private async callProviderAPI(
    request: UnifiedAIRequest,
    config: AIProviderConfig,
  ): Promise<Omit<UnifiedAIResponse, "duration" | "provider">> {
    switch (config.providerId) {
      case "openai":
        return this.callOpenAI(request, config)
      case "deepseek":
        return this.callDeepSeek(request, config)
      case "anthropic":
        return this.callAnthropic(request, config)
      case "baidu":
        return this.callBaidu(request, config)
      case "alibaba":
        return this.callAlibaba(request, config)
      default:
        throw new Error(`不支持的提供商: ${config.providerId}`)
    }
  }

  // OpenAI API调用
  private async callOpenAI(
    request: UnifiedAIRequest,
    config: AIProviderConfig,
  ): Promise<Omit<UnifiedAIResponse, "duration" | "provider">> {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.credentials.apiKey}`,
        "Content-Type": "application/json",
        ...(config.credentials.organization && {
          "OpenAI-Organization": config.credentials.organization,
        }),
      },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        temperature: request.options?.temperature || 0.7,
        max_tokens: request.options?.maxTokens || 1000,
        top_p: request.options?.topP || 1,
        stream: request.options?.stream || false,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API错误: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    return {
      id: data.id,
      content: data.choices[0].message.content,
      usage: {
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
        totalTokens: data.usage.total_tokens,
      },
      model: data.model,
      finishReason: data.choices[0].finish_reason,
      cost: this.calculateCost("openai", request.model, data.usage.total_tokens),
    }
  }

  // DeepSeek API调用
  private async callDeepSeek(
    request: UnifiedAIRequest,
    config: AIProviderConfig,
  ): Promise<Omit<UnifiedAIResponse, "duration" | "provider">> {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.credentials.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        temperature: request.options?.temperature || 0.7,
        max_tokens: request.options?.maxTokens || 1000,
        stream: request.options?.stream || false,
      }),
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API错误: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    return {
      id: data.id || `deepseek-${Date.now()}`,
      content: data.choices[0].message.content,
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0,
      },
      model: data.model || request.model,
      finishReason: data.choices[0].finish_reason || "stop",
      cost: this.calculateCost("deepseek", request.model, data.usage?.total_tokens || 0),
    }
  }

  // Anthropic Claude API调用
  private async callAnthropic(
    request: UnifiedAIRequest,
    config: AIProviderConfig,
  ): Promise<Omit<UnifiedAIResponse, "duration" | "provider">> {
    // 转换消息格式
    const systemMessage = request.messages.find((m) => m.role === "system")
    const userMessages = request.messages.filter((m) => m.role !== "system")

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": config.credentials.apiKey,
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: request.model,
        max_tokens: request.options?.maxTokens || 1000,
        temperature: request.options?.temperature || 0.7,
        system: systemMessage?.content,
        messages: userMessages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      }),
    })

    if (!response.ok) {
      throw new Error(`Anthropic API错误: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    return {
      id: data.id,
      content: data.content[0].text,
      usage: {
        promptTokens: data.usage.input_tokens,
        completionTokens: data.usage.output_tokens,
        totalTokens: data.usage.input_tokens + data.usage.output_tokens,
      },
      model: data.model,
      finishReason: data.stop_reason,
      cost: this.calculateCost("anthropic", request.model, data.usage.input_tokens + data.usage.output_tokens),
    }
  }

  // 百度文心一言API调用
  private async callBaidu(
    request: UnifiedAIRequest,
    config: AIProviderConfig,
  ): Promise<Omit<UnifiedAIResponse, "duration" | "provider">> {
    // 首先获取access_token
    const tokenResponse = await fetch(
      `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${config.credentials.apiKey}&client_secret=${config.credentials.secretKey}`,
      {
        method: "POST",
      },
    )

    if (!tokenResponse.ok) {
      throw new Error("获取百度access_token失败")
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // 调用文心一言API
    const response = await fetch(
      `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/${request.model}?access_token=${accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: request.messages,
          temperature: request.options?.temperature || 0.7,
          top_p: request.options?.topP || 0.8,
          penalty_score: 1.0,
          stream: request.options?.stream || false,
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`百度API错误: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    return {
      id: data.id || `baidu-${Date.now()}`,
      content: data.result,
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0,
      },
      model: request.model,
      finishReason: data.finish_reason || "normal",
      cost: this.calculateCost("baidu", request.model, data.usage?.total_tokens || 0),
    }
  }

  // 阿里通义千问API调用
  private async callAlibaba(
    request: UnifiedAIRequest,
    config: AIProviderConfig,
  ): Promise<Omit<UnifiedAIResponse, "duration" | "provider">> {
    const response = await fetch("https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.credentials.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: request.model,
        input: {
          messages: request.messages,
        },
        parameters: {
          temperature: request.options?.temperature || 0.7,
          top_p: request.options?.topP || 0.8,
          max_tokens: request.options?.maxTokens || 1000,
          stream: request.options?.stream || false,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`阿里API错误: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    return {
      id: data.request_id,
      content: data.output.text,
      usage: {
        promptTokens: data.usage.input_tokens,
        completionTokens: data.usage.output_tokens,
        totalTokens: data.usage.total_tokens,
      },
      model: request.model,
      finishReason: data.output.finish_reason,
      cost: this.calculateCost("alibaba", request.model, data.usage.total_tokens),
    }
  }

  // 计算费用
  private calculateCost(provider: string, model: string, tokens: number): number {
    // 简化的费用计算，实际应该根据具体的定价策略
    const pricePerToken = {
      openai: { "gpt-4": 0.00003, "gpt-3.5-turbo": 0.000002 },
      deepseek: { "deepseek-chat": 0.0000014 },
      anthropic: { "claude-3-opus": 0.000015, "claude-3-sonnet": 0.000003 },
      baidu: { "ernie-bot": 0.000001 },
      alibaba: { "qwen-turbo": 0.000002 },
    }

    const providerPrices = pricePerToken[provider as keyof typeof pricePerToken]
    if (!providerPrices) return 0

    const modelPrice = providerPrices[model as keyof typeof providerPrices]
    return modelPrice ? tokens * modelPrice : 0
  }

  // 批量调用
  async batchChat(requests: UnifiedAIRequest[]): Promise<UnifiedAIResponse[]> {
    const promises = requests.map((request) => this.chat(request))
    return Promise.all(promises)
  }

  // 流式调用（简化版）
  async streamChat(request: UnifiedAIRequest, onChunk: (chunk: string) => void): Promise<UnifiedAIResponse> {
    // 这里应该实现真正的流式调用
    // 为了演示，我们模拟流式响应
    const response = await this.chat({ ...request, options: { ...request.options, stream: false } })

    // 模拟流式输出
    const words = response.content.split(" ")
    for (let i = 0; i < words.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50))
      onChunk(words[i] + (i < words.length - 1 ? " " : ""))
    }

    return response
  }
}

// 导出单例实例
export const unifiedAIService = new UnifiedAIService()
