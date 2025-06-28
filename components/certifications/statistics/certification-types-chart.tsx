"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CertificationTypesChart() {
  // 模拟数据
  const certTypes = [
    { type: "医师执业证书", count: 450, percentage: 36 },
    { type: "护士执业证书", count: 320, percentage: 25.6 },
    { type: "药师资格证", count: 180, percentage: 14.4 },
    { type: "医学专业技术资格", count: 150, percentage: 12 },
    { type: "其他医疗资格证书", count: 148, percentage: 12 },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>认证类型分布</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart">图表</TabsTrigger>
            <TabsTrigger value="table">表格</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="pt-4">
            <div className="h-80 w-full bg-muted/20 rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">认证类型分布图表</p>
                <p className="text-xs text-muted-foreground mt-1">显示不同类型认证的数量分布</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="table" className="pt-4">
            <div className="rounded-md border">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">认证类型</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">数量</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">百分比</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {certTypes.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">{item.type}</td>
                      <td className="p-4 align-middle">{item.count}</td>
                      <td className="p-4 align-middle">{item.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>图表说明：此图表显示不同类型认证的数量和分布情况，帮助您了解系统中各类认证的占比。</p>
        </div>
      </CardContent>
    </Card>
  )
}
