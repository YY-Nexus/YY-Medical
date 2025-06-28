"use client"

import type React from "react"

import { Suspense, lazy, type ComponentType, useState, useEffect } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface LazyComponentProps {
  component: () => Promise<{ default: ComponentType<any> }>
  props?: any
  fallback?: React.ReactNode
  onLoad?: () => void
}

export function LazyComponent({
  component,
  props = {},
  fallback = (
    <div className="w-full h-40 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ),
  onLoad,
}: LazyComponentProps) {
  const [Component, setComponent] = useState<ComponentType<any> | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadComponent = async () => {
      try {
        const module = await component()
        if (isMounted) {
          setComponent(() => module.default)
          onLoad?.()
        }
      } catch (error) {
        console.error("组件加载失败:", error)
      }
    }

    loadComponent()

    return () => {
      isMounted = false
    }
  }, [component, onLoad])

  if (!Component) {
    return <>{fallback}</>
  }

  return <Component {...props} />
}

/**
 * 创建懒加载组件
 * @param importFunc 组件导入函数
 * @param fallback 加载中显示的内容
 */
export function createLazyComponent<T>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  fallback?: React.ReactNode,
) {
  const LazyLoadedComponent = lazy(importFunc)

  return function LazyWrapper(props: T) {
    return (
      <Suspense
        fallback={
          fallback || (
            <div className="w-full h-40 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )
        }
      >
        <LazyLoadedComponent {...props} />
      </Suspense>
    )
  }
}
