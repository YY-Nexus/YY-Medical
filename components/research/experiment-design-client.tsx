"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Calendar, Users, Target } from "lucide-react"

const mockExperiments = [
  {
    id: "EXP001",
    title: "新药临床试验",
    status: "进行中",
    progress: 65,
    participants: 120,
    startDate: "2024-01-01",
    endDate: "2024-06-30",
  },
  {
    id: "EXP002",
    title: "基因治疗研究",
    status: "设计中",
    progress: 25,
    participants: 0,
    startDate: "2024-03-01",
    endDate: "2024-12-31",
  },
]

export function ExperimentDesignClient() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">实验设计</h1>
          <p className="text-muted-foreground">医学实验的设计和管理</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新建实验
        </Button>
      </div>

      <div className="grid gap-6">
        {mockExperiments.map((experiment) => (
          <Card key={experiment.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{experiment.title}</CardTitle>
                  <CardDescription>实验ID: {experiment.id}</CardDescription>
                </div>
                <Badge variant={experiment.status === "进行中" ? "default" : "secondary"}>{experiment.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>进度</span>
                    <span>{experiment.progress}%</span>
                  </div>
                  <Progress value={experiment.progress} />
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{experiment.participants} 参与者</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{experiment.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span>{experiment.endDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
