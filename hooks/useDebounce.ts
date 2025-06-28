"use client"

import { useState, useEffect } from "react"

/**
 * 创建一个防抖值，在指定延迟后更新
 * @param value 要防抖的值
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的值
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // 设置延迟更新防抖值的定时器
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // 在下一次 effect 运行前清除定时器
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
