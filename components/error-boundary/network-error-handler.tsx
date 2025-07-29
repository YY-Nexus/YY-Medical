"use client"

import { Component, type ReactNode } from "react"
import { AlertTriangle, RefreshCw, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  isOnline: boolean
}

export class NetworkErrorHandler extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      isOnline: typeof window !== "undefined" ? navigator.onLine : true,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("online", this.handleOnline)
      window.addEventListener("offline", this.handleOffline)
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("online", this.handleOnline)
      window.removeEventListener("offline", this.handleOffline)
    }
  }

  handleOnline = () => {
    this.setState({ isOnline: true })
  }

  handleOffline = () => {
    this.setState({ isOnline: false })
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload()
    }
  }

  render(): ReactNode {
    if (!this.state.isOnline) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <WifiOff className="h-8 w-8 text-orange-500" />
              </div>
              <CardTitle>网络连接中断</CardTitle>
              <CardDescription>请检查您的网络连接，然后重试</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={this.handleRetry} className="w-full">
                <Wifi className="mr-2 h-4 w-4" />
                重新连接
              </Button>
              <Button variant="outline" onClick={this.handleReload} className="w-full bg-transparent">
                <RefreshCw className="mr-2 h-4 w-4" />
                刷新页面
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              <CardTitle>网络请求失败</CardTitle>
              <CardDescription>请求过程中发生错误，请稍后重试</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={this.handleRetry} className="w-full">
                重试
              </Button>
              <Button variant="outline" onClick={this.handleReload} className="w-full bg-transparent">
                <RefreshCw className="mr-2 h-4 w-4" />
                刷新页面
              </Button>
              {process.env.NODE_ENV === "development" && this.state.error && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md text-left overflow-auto max-h-40">
                  <p className="font-mono text-sm text-red-600">{this.state.error.toString()}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
