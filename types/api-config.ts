// API配置类型定义
export interface ApiKeyConfig {
  id: string
  name: string
  key: string
  secret?: string
  isActive: boolean
  createdAt: string
  expiresAt?: string
  environment: "production" | "testing" | "development"
}

export interface ApiEndpointConfig {
  id: string
  name: string
  url: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  headers?: Record<string, string>
  parameters?: Record<string, string>
  requiresAuth: boolean
  timeout: number
  retryCount: number
}

export interface ProviderApiConfig {
  id: string
  providerId: string
  providerName: string
  description: string
  baseUrl: string
  apiVersion: string
  apiKeys: ApiKeyConfig[]
  endpoints: ApiEndpointConfig[]
  isActive: boolean
  lastTested?: string
  testStatus?: "success" | "failed" | "pending"
  testMessage?: string
}
