"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, ChevronsUpDown, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { Card3d } from "./3d-card"
import { Button } from "@/components/ui/button"

type SortDirection = "asc" | "desc" | null

interface Column<T> {
  header: string
  accessorKey: keyof T
  cell?: (item: T) => React.ReactNode
  sortable?: boolean
}

interface ResponsiveTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (item: T) => void
  className?: string
  enableExport?: boolean
  exportFileName?: string
}

const exportToCSV = <T,>(data: T[], columns: Column<T>[], fileName = "export.csv") => {
  // 创建表头行
  const header = columns.map((col) => col.header).join(",")

  // 创建数据行
  const rows = data
    .map((item) => {
      return columns
        .map((col) => {
          const value = item[col.accessorKey]
          // 处理包含逗号的字符串，用引号包裹
          if (typeof value === "string" && value.includes(",")) {
            return `"${value}"`
          }
          return value
        })
        .join(",")
    })
    .join("\n")

  // 组合CSV内容
  const csv = `${header}\n${rows}`

  // 创建Blob对象
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })

  // 创建下载链接
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", fileName)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function ResponsiveTable<T>({
  data,
  columns,
  onRowClick,
  className,
  enableExport = false,
  exportFileName = "数据导出.csv",
}: ResponsiveTableProps<T>) {
  const isMobile = useIsMobile()
  const [sortColumn, setSortColumn] = React.useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortDirection(null)
        setSortColumn(null)
      } else {
        setSortDirection("asc")
      }
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedData = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (aValue === bValue) return 0

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : 1
      } else {
        return aValue > bValue ? -1 : 1
      }
    })
  }, [data, sortColumn, sortDirection])

  const getSortIcon = (column: keyof T) => {
    if (sortColumn !== column) return <ChevronsUpDown className="h-4 w-4 ml-1 opacity-50" />
    if (sortDirection === "asc") return <ChevronUp className="h-4 w-4 ml-1" />
    if (sortDirection === "desc") return <ChevronDown className="h-4 w-4 ml-1" />
    return <ChevronsUpDown className="h-4 w-4 ml-1 opacity-50" />
  }

  return (
    <div className={cn("space-y-4", className)}>
      {enableExport && data.length > 0 && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportToCSV(sortedData, columns, exportFileName)}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            <span>导出CSV</span>
          </Button>
        </div>
      )}

      {isMobile ? (
        <div className={cn("space-y-4", className)}>
          {sortedData.map((item, index) => (
            <Card3d
              key={index}
              className={cn("p-4", onRowClick && "cursor-pointer hover:bg-medical-50")}
              onClick={() => onRowClick && onRowClick(item)}
            >
              <div className="space-y-2">
                {columns.map((column) => (
                  <div key={String(column.accessorKey)} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-medical-600">{column.header}</span>
                    <span className="text-sm text-medical-900">
                      {column.cell ? column.cell(item) : String(item[column.accessorKey] || "")}
                    </span>
                  </div>
                ))}
              </div>
            </Card3d>
          ))}
        </div>
      ) : (
        <div className={cn("w-full overflow-auto", className)}>
          <table className="w-full caption-bottom text-sm">
            <thead className="border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                {columns.map((column) => (
                  <th
                    key={String(column.accessorKey)}
                    className={cn(
                      "h-12 px-4 text-left align-middle font-medium text-medical-500",
                      column.sortable && "cursor-pointer select-none",
                    )}
                    onClick={() => column.sortable && handleSort(column.accessorKey)}
                  >
                    <div className="flex items-center">
                      {column.header}
                      {column.sortable && getSortIcon(column.accessorKey)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr
                  key={index}
                  className={cn(
                    "border-b transition-colors hover:bg-medical-50/50 data-[state=selected]:bg-muted",
                    onRowClick && "cursor-pointer",
                  )}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((column) => (
                    <td key={String(column.accessorKey)} className="p-4 align-middle">
                      {column.cell ? column.cell(item) : String(item[column.accessorKey] || "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
