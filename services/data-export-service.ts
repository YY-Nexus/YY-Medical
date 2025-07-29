import { saveAs } from "file-saver"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import "jspdf-autotable"

type ExportFormat = "csv" | "xlsx" | "json" | "pdf" | "xml"

interface ExportOptions {
  fileName: string
  format: ExportFormat
  sheetName?: string
  title?: string
  subtitle?: string
  includeTimestamp?: boolean
  customHeaders?: Record<string, string>
}

interface ExportColumn {
  key: string
  label: string
  width?: number
  format?: (value: any) => string
}

export class DataExportService {
  static async exportData(data: any[], columns: ExportColumn[], options: ExportOptions): Promise<void> {
    const { fileName, format, includeTimestamp = true } = options

    // Add timestamp to filename if requested
    const finalFileName = includeTimestamp
      ? `${fileName}_${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}`
      : fileName

    switch (format) {
      case "csv":
        return this.exportCSV(data, columns, finalFileName)
      case "xlsx":
        return this.exportXLSX(data, columns, finalFileName, options)
      case "json":
        return this.exportJSON(data, columns, finalFileName, options)
      case "pdf":
        return this.exportPDF(data, columns, finalFileName, options)
      case "xml":
        return this.exportXML(data, columns, finalFileName, options)
      default:
        throw new Error(`不支持的导出格式: ${format}`)
    }
  }

  private static async exportCSV(data: any[], columns: ExportColumn[], fileName: string): Promise<void> {
    // Create header row
    const headers = columns.map((col) => col.label)

    // Create data rows
    const rows = data.map((item) =>
      columns.map((col) => {
        const value = item[col.key]
        const formattedValue = col.format ? col.format(value) : value

        // Handle CSV escaping
        if (
          typeof formattedValue === "string" &&
          (formattedValue.includes(",") || formattedValue.includes('"') || formattedValue.includes("\n"))
        ) {
          return `"${formattedValue.replace(/"/g, '""')}"`
        }
        return formattedValue || ""
      }),
    )

    // Combine headers and rows
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")

    // Add BOM for proper UTF-8 encoding in Excel
    const BOM = "\uFEFF"
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8;",
    })

    saveAs(blob, `${fileName}.csv`)
  }

  private static async exportXLSX(
    data: any[],
    columns: ExportColumn[],
    fileName: string,
    options: ExportOptions,
  ): Promise<void> {
    const { sheetName = "数据", title, subtitle } = options

    // Prepare data for Excel
    const excelData = data.map((item) => {
      const row: Record<string, any> = {}
      columns.forEach((col) => {
        const value = item[col.key]
        row[col.label] = col.format ? col.format(value) : value
      })
      return row
    })

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(excelData)

    // Set column widths
    const columnWidths = columns.map((col) => ({
      wch: col.width || 15,
    }))
    worksheet["!cols"] = columnWidths

    // Add title and subtitle if provided
    if (title || subtitle) {
      const titleRows: any[] = []
      if (title) {
        titleRows.push({ [columns[0].label]: title })
      }
      if (subtitle) {
        titleRows.push({ [columns[0].label]: subtitle })
      }
      titleRows.push({}) // Empty row

      // Insert title rows at the beginning
      XLSX.utils.sheet_add_json(worksheet, titleRows, {
        origin: "A1",
        skipHeader: true,
      })

      // Add data starting from the appropriate row
      XLSX.utils.sheet_add_json(worksheet, excelData, {
        origin: `A${titleRows.length + 1}`,
      })
    }

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    })

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

    saveAs(blob, `${fileName}.xlsx`)
  }

  private static async exportJSON(
    data: any[],
    columns: ExportColumn[],
    fileName: string,
    options: ExportOptions,
  ): Promise<void> {
    const { title, subtitle, customHeaders } = options

    // Format data according to columns
    const formattedData = data.map((item) => {
      const formatted: Record<string, any> = {}
      columns.forEach((col) => {
        const value = item[col.key]
        formatted[col.key] = col.format ? col.format(value) : value
      })
      return formatted
    })

    // Create export object
    const exportObject = {
      metadata: {
        title: title || "数据导出",
        subtitle,
        exportDate: new Date().toISOString(),
        totalRecords: data.length,
        columns: columns.map((col) => ({
          key: col.key,
          label: col.label,
        })),
        ...customHeaders,
      },
      data: formattedData,
    }

    const jsonString = JSON.stringify(exportObject, null, 2)
    const blob = new Blob([jsonString], {
      type: "application/json;charset=utf-8;",
    })

    saveAs(blob, `${fileName}.json`)
  }

  private static async exportPDF(
    data: any[],
    columns: ExportColumn[],
    fileName: string,
    options: ExportOptions,
  ): Promise<void> {
    const { title = "数据报告", subtitle } = options

    // Create PDF document
    const doc = new jsPDF()

    // Set Chinese font (you may need to add font files)
    doc.setFont("helvetica")

    // Add title
    doc.setFontSize(18)
    doc.text(title, 20, 20)

    // Add subtitle
    if (subtitle) {
      doc.setFontSize(12)
      doc.text(subtitle, 20, 30)
    }

    // Add export date
    doc.setFontSize(10)
    doc.text(`导出时间: ${new Date().toLocaleString("zh-CN")}`, 20, subtitle ? 40 : 30)

    // Prepare table data
    const tableHeaders = columns.map((col) => col.label)
    const tableData = data.map((item) =>
      columns.map((col) => {
        const value = item[col.key]
        const formatted = col.format ? col.format(value) : value
        return String(formatted || "")
      }),
    )

    // Add table
    ;(doc as any).autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: subtitle ? 50 : 40,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [37, 99, 235], // Medical blue
        textColor: 255,
      },
      alternateRowStyles: {
        fillColor: [239, 246, 255], // Light medical blue
      },
    })

    // Save PDF
    doc.save(`${fileName}.pdf`)
  }

  private static async exportXML(
    data: any[],
    columns: ExportColumn[],
    fileName: string,
    options: ExportOptions,
  ): Promise<void> {
    const { title = "数据导出", customHeaders } = options

    // Create XML content
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xmlContent += `<export>\n`
    xmlContent += `  <metadata>\n`
    xmlContent += `    <title>${this.escapeXml(title)}</title>\n`
    xmlContent += `    <exportDate>${new Date().toISOString()}</exportDate>\n`
    xmlContent += `    <totalRecords>${data.length}</totalRecords>\n`

    if (customHeaders) {
      Object.entries(customHeaders).forEach(([key, value]) => {
        xmlContent += `    <${key}>${this.escapeXml(String(value))}</${key}>\n`
      })
    }

    xmlContent += `  </metadata>\n`
    xmlContent += `  <columns>\n`

    columns.forEach((col) => {
      xmlContent += `    <column key="${col.key}" label="${this.escapeXml(col.label)}" />\n`
    })

    xmlContent += `  </columns>\n`
    xmlContent += `  <data>\n`

    data.forEach((item) => {
      xmlContent += `    <record>\n`
      columns.forEach((col) => {
        const value = item[col.key]
        const formatted = col.format ? col.format(value) : value
        xmlContent += `      <${col.key}>${this.escapeXml(String(formatted || ""))}</${col.key}>\n`
      })
      xmlContent += `    </record>\n`
    })

    xmlContent += `  </data>\n`
    xmlContent += `</export>`

    const blob = new Blob([xmlContent], {
      type: "application/xml;charset=utf-8;",
    })

    saveAs(blob, `${fileName}.xml`)
  }

  private static escapeXml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")
  }

  // Batch export multiple datasets
  static async exportMultipleDatasets(
    datasets: Array<{
      name: string
      data: any[]
      columns: ExportColumn[]
    }>,
    options: ExportOptions,
  ): Promise<void> {
    const { format, fileName } = options

    if (format === "xlsx") {
      // Create workbook with multiple sheets
      const workbook = XLSX.utils.book_new()

      datasets.forEach((dataset) => {
        const excelData = dataset.data.map((item) => {
          const row: Record<string, any> = {}
          dataset.columns.forEach((col) => {
            const value = item[col.key]
            row[col.label] = col.format ? col.format(value) : value
          })
          return row
        })

        const worksheet = XLSX.utils.json_to_sheet(excelData)
        XLSX.utils.book_append_sheet(workbook, worksheet, dataset.name)
      })

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      })

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })

      saveAs(blob, `${fileName}.xlsx`)
    } else {
      // Export each dataset separately
      for (const dataset of datasets) {
        await this.exportData(dataset.data, dataset.columns, {
          ...options,
          fileName: `${fileName}_${dataset.name}`,
        })
      }
    }
  }
}
