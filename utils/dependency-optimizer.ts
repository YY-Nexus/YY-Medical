/**
 * 依赖项优化工具
 * 用于按需加载大型依赖项
 */

// 按需加载 recharts
export async function loadRecharts() {
  const [
    { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell },
    { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer },
  ] = await Promise.all([
    import("recharts").then((module) => ({
      LineChart: module.LineChart,
      Line: module.Line,
      AreaChart: module.AreaChart,
      Area: module.Area,
      BarChart: module.BarChart,
      Bar: module.Bar,
      PieChart: module.PieChart,
      Pie: module.Pie,
      Cell: module.Cell,
    })),
    import("recharts").then((module) => ({
      XAxis: module.XAxis,
      YAxis: module.YAxis,
      CartesianGrid: module.CartesianGrid,
      Tooltip: module.Tooltip,
      Legend: module.Legend,
      ResponsiveContainer: module.ResponsiveContainer,
    })),
  ])

  return {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  }
}

// 按需加载 lucide-react 图标
export async function loadIcons(...iconNames: string[]) {
  const icons = await Promise.all(
    iconNames.map((name) => import("lucide-react").then((module) => ({ [name]: module[name] }))),
  )

  return Object.assign({}, ...icons)
}

// 预加载关键路径组件
export function preloadComponents(paths: string[]) {
  if (typeof window === "undefined") return

  // 使用 requestIdleCallback 在浏览器空闲时预加载
  const preload = () => {
    paths.forEach((path) => {
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = path
      link.as = path.endsWith(".js") ? "script" : "style"
      document.head.appendChild(link)
    })
  }

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(preload)
  } else {
    setTimeout(preload, 2000)
  }
}
