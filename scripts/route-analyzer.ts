import fs from "fs"
import path from "path"

interface RouteInfo {
  path: string
  type: "page" | "layout" | "route" | "loading" | "error"
  fullPath: string
}

interface RouteConflict {
  route: string
  conflicts: RouteInfo[]
  severity: "high" | "medium" | "low"
  description: string
}

export class RouteAnalyzer {
  private routes: RouteInfo[] = []
  private conflicts: RouteConflict[] = []

  constructor(private appDir = "app") {}

  analyze(): { routes: RouteInfo[]; conflicts: RouteConflict[] } {
    this.routes = []
    this.conflicts = []

    this.scanDirectory(this.appDir)
    this.detectConflicts()

    return {
      routes: this.routes,
      conflicts: this.conflicts,
    }
  }

  private scanDirectory(dir: string, routePath = "") {
    const fullPath = path.join(process.cwd(), dir)

    if (!fs.existsSync(fullPath)) return

    const items = fs.readdirSync(fullPath)

    for (const item of items) {
      const itemPath = path.join(fullPath, item)
      const stat = fs.statSync(itemPath)

      if (stat.isDirectory()) {
        // 处理路由组 (group) 和动态路由
        let newRoutePath = routePath

        if (item.startsWith("(") && item.endsWith(")")) {
          // 路由组，不影响URL路径
          newRoutePath = routePath
        } else if (item.startsWith("[") && item.endsWith("]")) {
          // 动态路由
          newRoutePath = `${routePath}/${item}`
        } else {
          // 普通路由段
          newRoutePath = `${routePath}/${item}`
        }

        this.scanDirectory(path.join(dir, item), newRoutePath)
      } else if (stat.isFile()) {
        const ext = path.extname(item)
        const name = path.basename(item, ext)

        if ((ext === ".tsx" || ext === ".ts") && this.isRouteFile(name)) {
          this.routes.push({
            path: routePath || "/",
            type: this.getRouteType(name),
            fullPath: path.join(dir, item),
          })
        }
      }
    }
  }

  private isRouteFile(name: string): boolean {
    return ["page", "layout", "loading", "error", "not-found", "route"].includes(name)
  }

  private getRouteType(name: string): RouteInfo["type"] {
    switch (name) {
      case "page":
        return "page"
      case "layout":
        return "layout"
      case "route":
        return "route"
      case "loading":
        return "loading"
      case "error":
        return "error"
      default:
        return "page"
    }
  }

  private detectConflicts() {
    // 检测同一路径下的多个page文件
    const pageRoutes = this.routes.filter((r) => r.type === "page")
    const routeGroups = new Map<string, RouteInfo[]>()

    pageRoutes.forEach((route) => {
      const key = route.path
      if (!routeGroups.has(key)) {
        routeGroups.set(key, [])
      }
      routeGroups.get(key)!.push(route)
    })

    // 检测冲突
    routeGroups.forEach((routes, routePath) => {
      if (routes.length > 1) {
        this.conflicts.push({
          route: routePath,
          conflicts: routes,
          severity: "high",
          description: `Multiple page.tsx files found for route: ${routePath}`,
        })
      }
    })

    // 检测动态路由与静态路由冲突
    this.detectDynamicStaticConflicts()

    // 检测缺少layout的嵌套路由
    this.detectMissingLayouts()
  }

  private detectDynamicStaticConflicts() {
    const pageRoutes = this.routes.filter((r) => r.type === "page")

    pageRoutes.forEach((route) => {
      const segments = route.path.split("/").filter(Boolean)

      pageRoutes.forEach((otherRoute) => {
        if (route === otherRoute) return

        const otherSegments = otherRoute.path.split("/").filter(Boolean)

        if (segments.length === otherSegments.length) {
          let hasConflict = true

          for (let i = 0; i < segments.length; i++) {
            const segment = segments[i]
            const otherSegment = otherSegments[i]

            const isDynamic = segment.startsWith("[") && segment.endsWith("]")
            const isOtherDynamic = otherSegment.startsWith("[") && otherSegment.endsWith("]")

            if (!isDynamic && !isOtherDynamic && segment !== otherSegment) {
              hasConflict = false
              break
            }
          }

          if (hasConflict && route.path !== otherRoute.path) {
            this.conflicts.push({
              route: `${route.path} vs ${otherRoute.path}`,
              conflicts: [route, otherRoute],
              severity: "medium",
              description: `Potential dynamic/static route conflict between ${route.path} and ${otherRoute.path}`,
            })
          }
        }
      })
    })
  }

  private detectMissingLayouts() {
    const pageRoutes = this.routes.filter((r) => r.type === "page")
    const layoutRoutes = this.routes.filter((r) => r.type === "layout")

    pageRoutes.forEach((page) => {
      const segments = page.path.split("/").filter(Boolean)

      if (segments.length > 1) {
        // 检查是否有对应的layout
        const parentPath = "/" + segments.slice(0, -1).join("/")
        const hasLayout = layoutRoutes.some((layout) => layout.path === parentPath)

        if (!hasLayout) {
          this.conflicts.push({
            route: page.path,
            conflicts: [page],
            severity: "low",
            description: `Missing layout.tsx for nested route: ${page.path}`,
          })
        }
      }
    })
  }

  generateReport(): string {
    const { routes, conflicts } = this.analyze()

    let report = "# Route Analysis Report\n\n"

    report += `## Summary\n`
    report += `- Total routes found: ${routes.length}\n`
    report += `- Conflicts detected: ${conflicts.length}\n\n`

    if (conflicts.length > 0) {
      report += `## Conflicts\n\n`

      conflicts.forEach((conflict, index) => {
        report += `### ${index + 1}. ${conflict.route} (${conflict.severity})\n`
        report += `**Description:** ${conflict.description}\n\n`
        report += `**Affected files:**\n`
        conflict.conflicts.forEach((c) => {
          report += `- ${c.fullPath}\n`
        })
        report += "\n"
      })
    }

    report += `## All Routes\n\n`
    routes.forEach((route) => {
      report += `- **${route.path}** (${route.type}) - ${route.fullPath}\n`
    })

    return report
  }
}

// 运行分析
if (require.main === module) {
  const analyzer = new RouteAnalyzer()
  const report = analyzer.generateReport()
  console.log(report)

  // 保存报告到文件
  fs.writeFileSync("route-analysis-report.md", report)
  console.log("\nReport saved to route-analysis-report.md")
}
