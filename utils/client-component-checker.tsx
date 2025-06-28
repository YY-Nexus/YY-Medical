"use client"

import type React from "react"

import { useEffect, useState } from "react"

/**
 * 组件水合错误检测工具
 * 用于检测React水合不匹配错误并提供调试信息
 */
export function HydrationErrorDetector({ children }: { children: React.ReactNode }) {
  const [hasHydrationError, setHasHydrationError] = useState(false)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)

  useEffect(() => {
    // 监听React水合错误
    const originalError = console.error
    console.error = (...args) => {
      const errorMessage = args.join(" ")
      if (
        errorMessage.includes("Hydration failed") ||
        errorMessage.includes("Text content did not match") ||
        errorMessage.includes("Expected server HTML")
      ) {
        setHasHydrationError(true)
        setErrorDetails(errorMessage)
      }
      originalError.apply(console, args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  if (hasHydrationError && process.env.NODE_ENV !== "production") {
    return (
      <div className="p-4 border-2 border-red-500 bg-red-50 rounded-md">
        <h3 className="text-lg font-bold text-red-700">检测到水合错误</h3>
        <p className="text-sm text-red-600 mt-2">
          可能是由于服务器渲染和客户端渲染内容不匹配导致。请检查以下组件是否缺少'use
          client'指令或包含依赖于客户端API的代码。
        </p>
        {errorDetails && (
          <pre className="mt-2 p-2 bg-red-100 text-xs overflow-auto max-h-40 rounded">{errorDetails}</pre>
        )}
      </div>
    )
  }

  return <>{children}</>
}

/**
 * 客户端组件检查器HOC
 * 用于包装可能需要'use client'指令的组件
 */
export function withClientCheck<P extends object>(Component: React.ComponentType<P>, componentName: string) {
  function ClientCheckedComponent(props: P) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
      setIsClient(true)
    }, [])

    // 在服务器端渲染时显示占位符
    if (!isClient) {
      return <div className="min-h-[50px] bg-gray-100 animate-pulse rounded"></div>
    }

    return <Component {...props} />
  }

  ClientCheckedComponent.displayName = `withClientCheck(${componentName})`
  return ClientCheckedComponent
}
