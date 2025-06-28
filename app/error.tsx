"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 可以在这里记录错误到错误报告服务
    console.error("应用错误:", error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle>出现错误</CardTitle>
          </div>
          <CardDescription>应用程序遇到了意外问题</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            我们已经记录了这个错误，并将尽快修复。您可以尝试重新加载页面或返回首页。
          </p>
          {error.message && (
            <div className="bg-muted p-3 rounded-md">
              <p className="text-xs font-mono">{error.message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={reset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            重试
          </Button>
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              返回首页
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
