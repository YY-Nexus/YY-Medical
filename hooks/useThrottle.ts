"use client"

import { useState, useEffect, useRef } from "react"

/**
 * 创建一个节流值，在指定时间内最多更新一次
 * @param value 要节流的值
 * @param limit 节流时间（毫秒）
 * @returns 节流后的值
 */
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastUpdated = useRef<number>(0)

  useEffect(() => {
    const now = Date.now()
    const timeElapsed = now - lastUpdated.current

    if (timeElapsed >= limit) {
      // 如果已经过了节流时间，立即更新
      setThrottledValue(value)
      lastUpdated.current = now
    } else {
      // 否则设置一个定时器在剩余时间后更新
      const timerId = setTimeout(() => {
        setThrottledValue(value)
        lastUpdated.current = Date.now()
      }, limit - timeElapsed)

      return () => {
        clearTimeout(timerId)
      }
    }
  }, [value, limit])

  return throttledValue
}
