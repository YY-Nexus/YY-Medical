// 检查是否在客户端环境
export const isClient = typeof window !== "undefined"

// 安全地访问window对象
export function safeWindow<T>(accessor: (w: Window) => T, fallback: T): T {
  if (isClient) {
    try {
      return accessor(window)
    } catch (error) {
      console.error("访问window对象时出错:", error)
      return fallback
    }
  }
  return fallback
}

// 安全地访问document对象
export function safeDocument<T>(accessor: (d: Document) => T, fallback: T): T {
  if (isClient) {
    try {
      return accessor(document)
    } catch (error) {
      console.error("访问document对象时出错:", error)
      return fallback
    }
  }
  return fallback
}

// 安全地添加事件监听器
export function safeAddEventListener(
  target: EventTarget | null,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
): () => void {
  if (!isClient || !target) return () => {}

  try {
    target.addEventListener(event, handler, options)
    return () => {
      target.removeEventListener(event, handler, options)
    }
  } catch (error) {
    console.error("添加事件监听器时出错:", error)
    return () => {}
  }
}
