"use client"

import * as React from "react"
import { LineChart, BarChart } from "recharts"

import { cn } from "@/lib/utils"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({ children, config, className, ...props }: ChartContainerProps) {
  // 创建CSS变量
  const style = React.useMemo(() => {
    return Object.entries(config).reduce(
      (acc, [key, value]) => {
        acc[`--color-${key}`] = value.color
        return acc
      },
      {} as Record<string, string>,
    )
  }, [config])

  return (
    <div className={cn("w-full h-full", className)} style={style} {...props}>
      {children}
    </div>
  )
}

interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
  content?: React.ReactNode
}

export function ChartTooltip({ content, ...props }: ChartTooltipProps) {
  if (!content) return null
  return React.cloneElement(content as React.ReactElement, props)
}

export function ChartTooltipContent({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="font-medium">{label}</div>
        <div className="font-medium text-right"></div>
        {payload.map((entry, index) => (
          <React.Fragment key={`item-${index}`}>
            <div className="flex items-center gap-1 text-sm" style={{ color: entry.color }}>
              <div className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
              <span>{entry.name}</span>
            </div>
            <div className="text-sm text-right font-medium" style={{ color: entry.color }}>
              {entry.value}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export { BarChart, LineChart }
