"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, FileSpreadsheet, FileIcon as FilePdf } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function DiagnosisExport() {
  const { toast } = useToast()
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [exportFormat, setExportFormat] = useState("csv")
  const [isExporting, setIsExporting] = useState(false)
  const [selectedFields, setSelectedFields] = useState({
    patientInfo: true,
    diagnosisResult: true,
    confidence: true,
    differentials: true,
    recommendations: true,
    doctorFeedback: false,
    followupData: false,
  })

  const handleExport = () => {
    setIsExporting(true)

    // 模拟导出过程
    setTimeout(() => {
      setIsExporting(false)
      toast({
        title: "导出成功",
        description: `诊断记录已成功导出为${exportFormat.toUpperCase()}格式`,
      })
    }, 2000)
  }

  const toggleField = (field: keyof typeof selectedFields) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">导出设置</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>时间范围</Label>
                <div className="flex gap-2 mt-1.5">
                  <DatePicker placeholder="开始日期" value={startDate} onChange={setStartDate} />
                  <DatePicker placeholder="结束日期" value={endDate} onChange={setEndDate} />
                </div>
              </div>

              <div>
                <Label htmlFor="export-format">导出格式</Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger id="export-format" className="mt-1.5">
                    <SelectValue placeholder="选择导出格式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV格式</SelectItem>
                    <SelectItem value="excel">Excel格式</SelectItem>
                    <SelectItem value="pdf">PDF报告</SelectItem>
                    <SelectItem value="json">JSON格式</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>导出字段</Label>
              <div className="space-y-2 mt-1.5">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="patientInfo"
                    checked={selectedFields.patientInfo}
                    onCheckedChange={() => toggleField("patientInfo")}
                  />
                  <label htmlFor="patientInfo" className="text-sm">
                    患者基本信息
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="diagnosisResult"
                    checked={selectedFields.diagnosisResult}
                    onCheckedChange={() => toggleField("diagnosisResult")}
                  />
                  <label htmlFor="diagnosisResult" className="text-sm">
                    诊断结果
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="confidence"
                    checked={selectedFields.confidence}
                    onCheckedChange={() => toggleField("confidence")}
                  />
                  <label htmlFor="confidence" className="text-sm">
                    置信度
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="differentials"
                    checked={selectedFields.differentials}
                    onCheckedChange={() => toggleField("differentials")}
                  />
                  <label htmlFor="differentials" className="text-sm">
                    鉴别诊断
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recommendations"
                    checked={selectedFields.recommendations}
                    onCheckedChange={() => toggleField("recommendations")}
                  />
                  <label htmlFor="recommendations" className="text-sm">
                    治疗建议
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="doctorFeedback"
                    checked={selectedFields.doctorFeedback}
                    onCheckedChange={() => toggleField("doctorFeedback")}
                  />
                  <label htmlFor="doctorFeedback" className="text-sm">
                    医生反馈
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="followupData"
                    checked={selectedFields.followupData}
                    onCheckedChange={() => toggleField("followupData")}
                  />
                  <label htmlFor="followupData" className="text-sm">
                    随访数据
                  </label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
          onClick={handleExport}
          disabled={isExporting}
        >
          <FileText className="h-4 w-4" />
          <span>预览数据</span>
        </Button>

        <Button size="lg" className="flex items-center gap-2" onClick={handleExport} disabled={isExporting}>
          {isExporting ? (
            <>
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              <span>导出中...</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>导出数据</span>
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <FileSpreadsheet className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <h4 className="font-medium">CSV/Excel格式</h4>
                <p className="text-sm text-gray-600">适合数据分析和二次处理</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600">
              <Download className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <FilePdf className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <h4 className="font-medium">PDF报告</h4>
                <p className="text-sm text-gray-600">适合打印和正式文档</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-green-600">
              <Download className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <h4 className="font-medium">JSON格式</h4>
                <p className="text-sm text-gray-600">适合系统集成和API调用</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-purple-600">
              <Download className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
