"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, Download, Upload } from "lucide-react"

// 模拟模型列表
const modelsList = [
  {
    id: "model-001",
    name: "通用疾病诊断模型 v1.2",
    type: "Transformer",
    accuracy: 0.93,
    lastUpdated: "2025-04-15",
    status: "active",
    diseases: ["心脏病", "糖尿病", "肺炎", "高血压", "骨折", "皮肤病"],
  },
  {
    id: "model-002",
    name: "心脏病专用模型 v2.0",
    type: "ResNet-50",
    accuracy: 0.95,
    lastUpdated: "2025-04-10",
    status: "inactive",
    diseases: ["心脏病"],
  },
  {
    id: "model-003",
    name: "肺部疾病模型 v1.5",
    type: "DenseNet-121",
    accuracy: 0.94,
    lastUpdated: "2025-04-05",
    status: "inactive",
    diseases: ["肺炎", "肺癌", "肺结核"],
  },
  {
    id: "model-004",
    name: "����肤病诊断模型 v1.0",
    type: "CNN",
    accuracy: 0.91,
    lastUpdated: "2025-03-28",
    status: "inactive",
    diseases: ["皮肤癌", "湿疹", "牛皮癣", "痤疮"],
  },
]

export function ModelSelectionPanel() {
  const [activeModel, setActiveModel] = useState("model-001")

  const activateModel = (modelId) => {
    setActiveModel(modelId)
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>可用模型</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {modelsList.map((model) => (
            <Card key={model.id} className={`border ${model.id === activeModel ? "border-emerald-500" : ""}`}>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{model.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{model.type}</Badge>
                      {model.id === activeModel && <Badge className="bg-emerald-500">当前使用</Badge>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">准确率: {(model.accuracy * 100).toFixed(0)}%</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-end mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {model.lastUpdated}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">适用疾病: </span>
                  {model.diseases.map((disease, index) => (
                    <span key={disease}>
                      {disease}
                      {index < model.diseases.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                {model.id === activeModel ? (
                  <Button variant="outline" size="sm" disabled>
                    <Check className="w-4 h-4 mr-2" />
                    已激活
                  </Button>
                ) : (
                  <Button variant="default" size="sm" onClick={() => activateModel(model.id)}>
                    激活模型
                  </Button>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">上传新模型</Button>
      </CardFooter>
    </Card>
  )
}
