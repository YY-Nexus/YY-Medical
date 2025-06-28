import { LoadingSpinner } from "./loading-spinner"

interface LoadingFallbackProps {
  message?: string
  height?: string
}

export function LoadingFallback({ message = "加载中...", height = "400px" }: LoadingFallbackProps) {
  return (
    <div className={`flex flex-col items-center justify-center`} style={{ height }}>
      <LoadingSpinner />
      {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
    </div>
  )
}
