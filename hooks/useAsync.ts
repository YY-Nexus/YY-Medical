"use client"

import { useState, useCallback, useEffect } from "react"

/**
 * 异步函数的状态和结果
 */
interface AsyncState<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

/**
 * 异步函数的 Hook 返回值
 */
interface UseAsyncReturn<T, P extends any[]> extends AsyncState<T> {
  execute: (...params: P) => Promise<T>
  reset: () => void
}

/**
 * 管理异步函数的 Hook
 * @param asyncFunction 异步函数
 * @param immediate 是否立即执行
 * @param initialParams 初始参数
 * @returns 异步状态和控制函数
 */
export function useAsync<T, P extends any[]>(
  asyncFunction: (...params: P) => Promise<T>,
  immediate = false,
  initialParams?: P,
): UseAsyncReturn<T, P> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: immediate,
    isSuccess: false,
    isError: false,
  })

  // 重置状态
  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    })
  }, [])

  // 执行异步函数
  const execute = useCallback(
    async (...params: P) => {
      setState({
        data: null,
        error: null,
        isLoading: true,
        isSuccess: false,
        isError: false,
      })

      try {
        const data = await asyncFunction(...params)
        setState({
          data,
          error: null,
          isLoading: false,
          isSuccess: true,
          isError: false,
        })
        return data
      } catch (error) {
        setState({
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
          isLoading: false,
          isSuccess: false,
          isError: true,
        })
        throw error
      }
    },
    [asyncFunction],
  )

  // 如果 immediate 为 true，立即执行
  useEffect(() => {
    if (immediate) {
      execute(...(initialParams || ([] as unknown as P)))
    }
  }, [execute, immediate, initialParams])

  return {
    ...state,
    execute,
    reset,
  }
}
