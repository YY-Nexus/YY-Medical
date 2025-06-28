"use client"

import { useState, useEffect, useCallback } from "react"

/**
 * 使用媒体查询的 Hook
 * @param query 媒体查询字符串
 * @returns 媒体查询是否匹配
 */
export function useMediaQuery(query: string): boolean {
  // 初始化状态
  const getMatches = useCallback((): boolean => {
    // 在服务器端渲染时，始终返回 false
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches
    }
    return false
  }, [query])

  const [matches, setMatches] = useState<boolean>(getMatches())

  // 监听媒体查询变化
  useEffect(() => {
    if (typeof window === "undefined") return undefined

    const mediaQuery = window.matchMedia(query)

    // 处理媒体查询变化
    const handleChange = () => {
      setMatches(mediaQuery.matches)
    }

    // 添加事件监听器
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
    } else {
      // 兼容旧版浏览器
      mediaQuery.addListener(handleChange)
    }

    // 初始检查
    handleChange()

    // 清理函数
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange)
      } else {
        // 兼容旧版浏览器
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [query, getMatches])

  return matches
}

// 预定义的断点
export const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
}

// 便捷的断点 hooks
export const useIsMobile = () => {
  return useMediaQuery(breakpoints.md) === false
}

export const useIsTablet = () => {
  return useMediaQuery(breakpoints.md) && useMediaQuery(breakpoints.lg) === false
}

export const useIsDesktop = () => {
  return useMediaQuery(breakpoints.lg)
}

export const useIsLargeDesktop = () => {
  return useMediaQuery(breakpoints.xl)
}
