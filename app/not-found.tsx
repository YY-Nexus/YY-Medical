import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-muted-foreground" />
            <CardTitle>页面未找到</CardTitle>
          </div>
          <CardDescription>您请求的页面不存在</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            您尝试访问的页面可能已被移动、删除或不存在。请检查URL是否正确，或使用下面的按钮导航到其他页面。
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/search">
              <Search className="mr-2 h-4 w-4" />
              搜索
            </Link>
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
