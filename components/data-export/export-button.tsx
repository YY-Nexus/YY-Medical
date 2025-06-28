"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Download, FileSpreadsheet, FileJson, FileText } from "lucide-react"
import { DataExportService } from "@/services/data-export-service"
import { useTranslation } from "@/hooks/use-translation"

interface ExportButtonProps {
  data: any[]
  fileName: string
  disabled?: boolean
}

export function ExportButton({ data, fileName, disabled = false }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { t } = useTranslation()

  const handleExport = async (format: "csv" | "xlsx" | "json" | "pdf") => {
    if (!data.length) return

    setIsExporting(true)
    try {
      await DataExportService.exportData(data, {
        fileName,
        format,
        sheetName: fileName,
      })
    } catch (error) {
      console.error("导出失败:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || isExporting || !data.length}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          <span>{t("export")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleExport("csv")}>
          <FileText className="mr-2 h-4 w-4" />
          <span>CSV</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("xlsx")}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          <span>Excel (XLSX)</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleExport("json")}>
          <FileJson className="mr-2 h-4 w-4" />
          <span>JSON</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("pdf")}>
          <FileText className="mr-2 h-4 w-4" />
          <span>PDF</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
