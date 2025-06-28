"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useTranslation } from "@/hooks/use-translation"

// 模拟预测数据
const generatePredictionData = (months: number, trend: "up" | "down" | "stable", volatility: number) => {
  const data = []
  let value = 100

  for (let i = 0; i < months; i++) {
    // 添加趋势
    if (trend === "up") {
      value += 5 + Math.random() * 3
    } else if (trend === "down") {
      value -= 5 + Math.random() * 3
    } else {
      value += Math.random() * 2 - 1
    }

    // 添加波动
    value += (Math.random() * 2 - 1) * volatility

    // 确保值不为负
    value = Math.max(value, 0)

    const date = new Date()
    date.setMonth(date.getMonth() + i)

    data.push({
      date: date.toISOString().slice(0, 7),
      value: Math.round(value * 100) / 100,
      prediction: true,
    })
  }

  return data
}

// 模拟历史数据
const historicalData = [
  { date: "2023-01", value: 85 },
  { date: "2023-02", value: 88 },
  { date: "2023-03", value: 92 },
  { date: "2023-04", value: 90 },
  { date: "2023-05", value: 95 },
  { date: "2023-06", value: 99 },
  { date: "2023-07", value: 102 },
  { date: "2023-08", value: 100 },
  { date: "2023-09", value: 105 },
  { date: "2023-10", value: 108 },
  { date: "2023-11", value: 112 },
  { date: "2023-12", value: 110 },
]

interface PredictionToolProps {
  className?: string
}

export function PredictionTool({ className = "" }: PredictionToolProps) {
  const [predictionMonths, setPredictionMonths] = useState<number>(6)
  const [predictionTrend, setPredictionTrend] = useState<"up" | "down" | "stable">("up")
  const [volatility, setVolatility] = useState<number>(5)
  const [predictionData, setPredictionData] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<string>("chart")
  const { t } = useTranslation()

  const generatePrediction = () => {
    const newPredictionData = generatePredictionData(predictionMonths, predictionTrend, volatility)
    setPredictionData(newPredictionData)
  }

  const combinedData = [...historicalData, ...predictionData]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t("predictionAnalysis")}</CardTitle>
        <CardDescription>{t("predictionAnalysisDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart">{t("chart")}</TabsTrigger>
            <TabsTrigger value="settings">{t("settings")}</TabsTrigger>
          </TabsList>
          <TabsContent value="chart" className="space-y-4">
            <div className="h-[300px] mt-4">
              {combinedData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={combinedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [`${value}`, t("value")]}
                      labelFormatter={(label) => `${t("date")}: ${label}`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name={t("value")}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">{t("generatePredictionPrompt")}</p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div>
                {predictionData.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {t("predictionGeneratedFor")} {predictionMonths} {t("months")}
                  </p>
                )}
              </div>
              <Button onClick={() => setActiveTab("settings")}>{t("adjustSettings")}</Button>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="months">{t("predictionMonths")}</Label>
                <Input
                  id="months"
                  type="number"
                  min="1"
                  max="24"
                  value={predictionMonths}
                  onChange={(e) => setPredictionMonths(Number.parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="trend">{t("trend")}</Label>
                <Select value={predictionTrend} onValueChange={(value: any) => setPredictionTrend(value)}>
                  <SelectTrigger id="trend">
                    <SelectValue placeholder={t("selectTrend")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="up">{t("upward")}</SelectItem>
                    <SelectItem value="stable">{t("stable")}</SelectItem>
                    <SelectItem value="down">{t("downward")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="volatility">{t("volatility")}</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="volatility"
                    type="range"
                    min="1"
                    max="20"
                    value={volatility}
                    onChange={(e) => setVolatility(Number.parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-12 text-center">{volatility}</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setActiveTab("chart")}>
          {t("viewChart")}
        </Button>
        <Button onClick={generatePrediction}>{t("generatePrediction")}</Button>
      </CardFooter>
    </Card>
  )
}
