"use client"

import { useState, useCallback } from "react"
import { api, type ApiRequestConfig, type ApiResponse } from "@/lib/api/client"

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: string, status: number) => void
  initialData?: T | null
}

export function useApi<T = any>(options: UseApiOptions<T> = {}) {
  const [data, setData] = useState<T | null>(options.initialData || null)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const request = useCallback(
    async <R = T>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<R>> => {
      setIsLoading(true)
      setError(null)

      try {
        const method = config?.method?.toUpperCase() || "GET"
        let response: ApiResponse<R>

        switch (method) {
          case "GET":
            response = await api.get<R>(endpoint, config)
            break
          case "POST":
            response = await api.post<R>(endpoint, config?.body, config)
            break
          case "PUT":
            response = await api.put<R>(endpoint, config?.body, config)
            break
          case "PATCH":
            response = await api.patch<R>(endpoint, config?.body, config)
            break
          case "DELETE":
            response = await api.delete<R>(endpoint, config)
            break
          default:
            response = await api.get<R>(endpoint, config)
        }

        setStatus(response.status)

        if (response.error) {
          setError(response.error)
          options.onError?.(response.error, response.status)
        } else if (response.data) {
          setData(response.data as unknown as T)
          options.onSuccess?.(response.data as unknown as T)
        }

        return response
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "请求过程中发生错误"
        setError(errorMessage)
        setStatus(0)
        options.onError?.(errorMessage, 0)

        return {
          data: null,
          error: errorMessage,
          status: 0,
        }
      } finally {
        setIsLoading(false)
      }
    },
    [options],
  )

  const get = useCallback(
    <R = T>(endpoint: string, config?: Omit<ApiRequestConfig, "method">) => {
      return request<R>(endpoint, { ...config, method: "GET" })
    },
    [request],
  )

  const post = useCallback(
    <R = T>(endpoint: string, data?: any, config?: Omit<ApiRequestConfig, "method" | "body">) => {
      return request<R>(endpoint, { ...config, method: "POST", body: data })
    },
    [request],
  )

  const put = useCallback(
    <R = T>(endpoint: string, data?: any, config?: Omit<ApiRequestConfig, "method" | "body">) => {
      return request<R>(endpoint, { ...config, method: "PUT", body: data })
    },
    [request],
  )

  const patch = useCallback(
    <R = T>(endpoint: string, data?: any, config?: Omit<ApiRequestConfig, "method" | "body">) => {
      return request<R>(endpoint, { ...config, method: "PATCH", body: data })
    },
    [request],
  )

  const del = useCallback(
    <R = T>(endpoint: string, config?: Omit<ApiRequestConfig, "method">) => {
      return request<R>(endpoint, { ...config, method: "DELETE" })
    },
    [request],
  )

  const reset = useCallback(() => {
    setData(options.initialData || null)
    setError(null)
    setStatus(null)
    setIsLoading(false)
  }, [options.initialData])

  return {
    data,
    error,
    status,
    isLoading,
    request,
    get,
    post,
    put,
    patch,
    delete: del,
    reset,
  }
}
