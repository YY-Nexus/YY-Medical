/**
 * 错误模拟工具
 * 用于模拟各种类型的错误，以测试应用的错误处理机制
 */

// 错误类型枚举
export enum ErrorType {
  JAVASCRIPT = "javascript",
  PROMISE = "promise",
  NETWORK = "network",
  API = "api",
  AUTHENTICATION = "authentication",
  AUTHORIZATION = "authorization",
  VALIDATION = "validation",
  NOT_FOUND = "not_found",
  TIMEOUT = "timeout",
  MEMORY = "memory",
  RENDERING = "rendering",
  HYDRATION = "hydration",
}

// 错误模拟选项
export interface ErrorSimulationOptions {
  message?: string
  delay?: number
  status?: number
  code?: string
}

/**
 * 模拟JavaScript错误
 * @param options 错误模拟选项
 */
export function simulateJavaScriptError(options: ErrorSimulationOptions = {}): void {
  const message = options.message || "模拟的JavaScript错误"
  throw new Error(message)
}

/**
 * 模拟Promise错误
 * @param options 错误模拟选项
 * @returns 被拒绝的Promise
 */
export function simulatePromiseError(options: ErrorSimulationOptions = {}): Promise<never> {
  const message = options.message || "模拟的Promise错误"
  const delay = options.delay || 0

  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(message))
    }, delay)
  })
}

/**
 * 模拟网络错误
 * @param options 错误模拟选项
 * @returns 被拒绝的Promise
 */
export function simulateNetworkError(options: ErrorSimulationOptions = {}): Promise<never> {
  const message = options.message || "网络连接失败"
  const delay = options.delay || 0

  return new Promise((_, reject) => {
    setTimeout(() => {
      const error = new Error(message)
      error.name = "NetworkError"
      reject(error)
    }, delay)
  })
}

/**
 * 模拟API错误
 * @param options 错误模拟选项
 * @returns 被拒绝的Promise
 */
export function simulateApiError(options: ErrorSimulationOptions = {}): Promise<never> {
  const status = options.status || 500
  const message = options.message || `API错误: ${status}`
  const code = options.code || "API_ERROR"
  const delay = options.delay || 0

  return new Promise((_, reject) => {
    setTimeout(() => {
      const error = new Error(message)
      error.name = "ApiError"
      // @ts-ignore - 添加自定义属性
      error.status = status
      // @ts-ignore - 添加自定义属性
      error.code = code
      reject(error)
    }, delay)
  })
}

/**
 * 模拟认证错误
 * @param options 错误模拟选项
 * @returns 被拒绝的Promise
 */
export function simulateAuthenticationError(options: ErrorSimulationOptions = {}): Promise<never> {
  const message = options.message || "认证失败: 会话已过期"
  const delay = options.delay || 0

  return new Promise((_, reject) => {
    setTimeout(() => {
      const error = new Error(message)
      error.name = "AuthenticationError"
      // @ts-ignore - 添加自定义属性
      error.status = 401
      reject(error)
    }, delay)
  })
}

/**
 * 模拟授权错误
 * @param options 错误模拟选项
 * @returns 被拒绝的Promise
 */
export function simulateAuthorizationError(options: ErrorSimulationOptions = {}): Promise<never> {
  const message = options.message || "授权失败: 权限不足"
  const delay = options.delay || 0

  return new Promise((_, reject) => {
    setTimeout(() => {
      const error = new Error(message)
      error.name = "AuthorizationError"
      // @ts-ignore - 添加自定义属性
      error.status = 403
      reject(error)
    }, delay)
  })
}

/**
 * 模拟资源未找到错误
 * @param options 错误模拟选项
 * @returns 被拒绝的Promise
 */
export function simulateNotFoundError(options: ErrorSimulationOptions = {}): Promise<never> {
  const resource = options.message || "请求的资源"
  const message = `未找到: ${resource}`
  const delay = options.delay || 0

  return new Promise((_, reject) => {
    setTimeout(() => {
      const error = new Error(message)
      error.name = "NotFoundError"
      // @ts-ignore - 添加自定义属性
      error.status = 404
      reject(error)
    }, delay)
  })
}

/**
 * 模拟超时错误
 * @param options 错误模拟选项
 * @returns 被拒绝的Promise
 */
export function simulateTimeoutError(options: ErrorSimulationOptions = {}): Promise<never> {
  const message = options.message || "请求超时"
  const delay = options.delay || 5000 // 默认5秒超时

  return new Promise((_, reject) => {
    setTimeout(() => {
      const error = new Error(message)
      error.name = "TimeoutError"
      reject(error)
    }, delay)
  })
}

/**
 * 模拟内存溢出错误
 * 警告: 此函数可能导致浏览器崩溃，仅用于受控测试环境
 * @param options 错误模拟选项
 */
export function simulateMemoryError(options: ErrorSimulationOptions = {}): void {
  const message = options.message || "内存溢出错误"

  try {
    const arr: any[] = []
    while (true) {
      arr.push(new Array(1000000).fill("x"))
    }
  } catch (error) {
    if (error instanceof Error) {
      error.message = message
    }
    throw error
  }
}

/**
 * 模拟渲染错误
 * @param options 错误模拟选项
 */
export function simulateRenderingError(options: ErrorSimulationOptions = {}): void {
  const message = options.message || "渲染错误"

  // 创建一个无效的React元素状态
  // 这通常会在渲染时导致错误
  throw new Error(message)
}

/**
 * 模拟水合错误
 * 注意: 这个函数主要用于文档目的，实际水合错误需要在服务器和客户端渲染不匹配时才会发生
 * @param options 错误模拟选项
 */
export function simulateHydrationError(options: ErrorSimulationOptions = {}): void {
  const message = options.message || "水合错误: 服务器和客户端渲染不匹配"

  // 在实际应用中，这通常是由于服务器和客户端渲染的内容不同导致的
  console.error(message)
  // 实际的水合错误会由React自动抛出
}

/**
 * 根据错误类型模拟错误
 * @param type 错误类型
 * @param options 错误模拟选项
 * @returns Promise或void，取决于错误类型
 */
export function simulateError(type: ErrorType, options: ErrorSimulationOptions = {}): Promise<never> | void {
  switch (type) {
    case ErrorType.JAVASCRIPT:
      return simulateJavaScriptError(options)
    case ErrorType.PROMISE:
      return simulatePromiseError(options)
    case ErrorType.NETWORK:
      return simulateNetworkError(options)
    case ErrorType.API:
      return simulateApiError(options)
    case ErrorType.AUTHENTICATION:
      return simulateAuthenticationError(options)
    case ErrorType.AUTHORIZATION:
      return simulateAuthorizationError(options)
    case ErrorType.NOT_FOUND:
      return simulateNotFoundError(options)
    case ErrorType.TIMEOUT:
      return simulateTimeoutError(options)
    case ErrorType.MEMORY:
      return simulateMemoryError(options)
    case ErrorType.RENDERING:
      return simulateRenderingError(options)
    case ErrorType.HYDRATION:
      return simulateHydrationError(options)
    default:
      throw new Error(`未知的错误类型: ${type}`)
  }
}
