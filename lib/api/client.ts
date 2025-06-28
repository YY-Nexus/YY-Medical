import { useAuthStore } from "@/store"

// API 请求配置类型
export interface ApiRequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>
  requiresAuth?: boolean
  cache?: RequestCache
  revalidate?: number
}

// API 响应类型
export interface ApiResponse<T = any> {
  data: T | null
  error: string | null
  status: number
}

// API 错误类型
export class ApiError extends Error {
  status: number
  data: any

  constructor(message: string, status: number, data?: any) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.data = data
  }
}

// API 基础 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api"

// 构建完整 URL（包含查询参数）
function buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`

  if (!params) return url

  const queryParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value))
    }
  })

  const queryString = queryParams.toString()
  return queryString ? `${url}?${queryString}` : url
}

// 主要 API 客户端函数
export async function apiClient<T = any>(
  endpoint: string,
  { params, requiresAuth = true, ...config }: ApiRequestConfig = {},
): Promise<ApiResponse<T>> {
  try {
    // 构建请求 URL
    const url = buildUrl(endpoint, params)

    // 准备请求头
    const headers = new Headers(config.headers)

    // 如果未指定内容类型且是 POST/PUT/PATCH 请求，默认设置为 JSON
    if (!headers.has("Content-Type") && ["POST", "PUT", "PATCH"].includes(config.method?.toUpperCase() || "")) {
      headers.set("Content-Type", "application/json")
    }

    // 如果需要认证，添加 Authorization 头
    if (requiresAuth) {
      const token = useAuthStore.getState().token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      } else {
        // 如果需要认证但没有 token，抛出错误
        throw new ApiError("未授权访问", 401)
      }
    }

    // 执行请求
    const response = await fetch(url, {
      ...config,
      headers,
    })

    // 处理 HTTP 错误
    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch (e) {
        errorData = { message: "请求失败" }
      }

      const errorMessage = errorData.message || `请求失败: ${response.status} ${response.statusText}`

      // 处理 401 错误（未授权）
      if (response.status === 401 && requiresAuth) {
        // 尝试刷新 token
        const refreshed = await useAuthStore.getState().refreshToken()

        // 如果刷新成功，重试请求
        if (refreshed) {
          return apiClient<T>(endpoint, { params, requiresAuth, ...config })
        }

        // 如果刷新失败，登出用户
        useAuthStore.getState().logout()
      }

      throw new ApiError(errorMessage, response.status, errorData)
    }

    // 解析响应数据
    let data: T

    // 检查响应是否为空
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      data = await response.json()
    } else {
      // 对于非 JSON 响应，返回原始响应
      data = response as unknown as T
    }

    return {
      data,
      error: null,
      status: response.status,
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        data: null,
        error: error.message,
        status: error.status,
      }
    }

    // 处理网络错误等
    return {
      data: null,
      error: error instanceof Error ? error.message : "发生未知错误",
      status: 0,
    }
  }
}

// 便捷方法
export const api = {
  get: <T = any>(endpoint: string, config?: ApiRequestConfig) => apiClient<T>(endpoint, { ...config, method: "GET" }),

  post: <T = any>(endpoint: string, data?: any, config?: ApiRequestConfig) =>
    apiClient<T>(endpoint, {
      ...config,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T = any>(endpoint: string, data?: any, config?: ApiRequestConfig) =>
    apiClient<T>(endpoint, {
      ...config,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T = any>(endpoint: string, data?: any, config?: ApiRequestConfig) =>
    apiClient<T>(endpoint, {
      ...config,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T = any>(endpoint: string, config?: ApiRequestConfig) =>
    apiClient<T>(endpoint, { ...config, method: "DELETE" }),
}
