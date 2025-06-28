"use client"

import { useState, useEffect, useRef } from "react"

type DataUpdateCallback<T> = (data: T) => void
type DataFetchFunction<T> = () => Promise<T>

interface UseRealTimeDataOptions {
  interval?: number
  enabled?: boolean
  onError?: (error: Error) => void
  retryCount?: number
  retryDelay?: number
}

export function useRealTimeData<T>(
  fetchFunction: DataFetchFunction<T>,
  initialData: T,
  options: UseRealTimeDataOptions = {},
) {
  const { interval = 5000, enabled = true, onError, retryCount = 3, retryDelay = 1000 } = options

  const [data, setData] = useState<T>(initialData)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const retryCountRef = useRef(0)
  const isMountedRef = useRef(true)

  const fetchData = async () => {
    if (!enabled || !isMountedRef.current) return

    setIsLoading(true)

    try {
      const newData = await fetchFunction()

      if (isMountedRef.current) {
        setData(newData)
        setError(null)
        setLastUpdated(new Date())
        retryCountRef.current = 0
      }
    } catch (err) {
      if (isMountedRef.current) {
        const error = err instanceof Error ? err : new Error("未知错误")
        setError(error)

        if (onError) {
          onError(error)
        }

        // 重试逻辑
        if (retryCountRef.current < retryCount) {
          retryCountRef.current += 1
          setTimeout(fetchData, retryDelay)
        }
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    isMountedRef.current = true

    // 初始加载
    fetchData()

    // 设置定时器
    const timerId = setInterval(fetchData, interval)

    return () => {
      isMountedRef.current = false
      clearInterval(timerId)
    }
  }, [interval, enabled])

  const refresh = () => {
    fetchData()
  }

  const updateData = (updater: DataUpdateCallback<T>) => {
    setData((currentData) => {
      const newData = updater(currentData)
      return newData
    })
  }

  return {
    data,
    isLoading,
    error,
    lastUpdated,
    refresh,
    updateData,
  }
}
