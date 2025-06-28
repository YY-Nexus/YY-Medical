import { saveAs } from "file-saver"
import * as XLSX from "xlsx"

type ExportFormat = "csv" | "xlsx" | "json" | "pdf"

interface ExportOptions {
  fileName: string
  format: ExportFormat
  sheetName?: string
}

export class DataExportService {
  static async exportData(data: any[], options: ExportOptions): Promise<void> {
    const { fileName, format, sheetName = "Sheet1" } = options

    switch (format) {
      case "csv":
        return this.exportCSV(data, fileName)
      case "xlsx":
        return this.exportXLSX(data, fileName, sheetName)
      case "json":
        return this.exportJSON(data, fileName)
      case "pdf":
        return this.exportPDF(data, fileName)
      default:
        throw new Error(`不支持的导出格式: ${format}`)
    }
  }

  private static async exportCSV(data: any[], fileName: string): Promise<void> {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const csv = XLSX.utils.sheet_to_csv(worksheet)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, `${fileName}.csv`)
  }

  private static async exportXLSX(data: any[], fileName: string, sheetName: string): Promise<void> {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    saveAs(blob, `${fileName}.xlsx`)
  }

  private static async exportJSON(data: any[], fileName: string): Promise<void> {
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    saveAs(blob, `${fileName}.json`)
  }

  private static async exportPDF(data: any[], fileName: string): Promise<void> {
    // 这里需要集成PDF生成库，如jsPDF
    // 由于复杂性，这里只是一个占位实现
    console.log("PDF导出功能需要集成jsPDF库")

    // 模拟PDF导出
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: "application/pdf" })
    saveAs(blob, `${fileName}.pdf`)
  }
}
