"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Circle, Clock, ArrowRight, BookOpen, Settings, Shield, Monitor } from "lucide-react"
import { AdminGuideService } from "@/services/admin-guide-service"
import type { AdminGuideStep } from "@/types/admin-guide"
import Link from "next/link"

export function AdminGuideWizard() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [currentCategory, setCurrentCategory] = useState<AdminGuideStep["category"]>("setup")

  const allSteps = AdminGuideService.getGuideSteps()
  const nextSteps = AdminGuideService.getNextSteps(completedSteps)
  const progress = (completedSteps.length / allSteps.length) * 100

  const categories = [
    { id: "setup", label: "初始设置", icon: Settings, color: "bg-blue-500" },
    { id: "configuration", label: "系统配置", icon: Settings, color: "bg-green-500" },
    { id: "monitoring", label: "监控告警", icon: Monitor, color: "bg-yellow-500" },
    { id: "management", label: "运维管理", icon: BookOpen, color: "bg-purple-500" },
    { id: "troubleshooting", label: "故障排除", icon: Shield, color: "bg-red-500" },
  ] as const

  const getDifficultyColor = (difficulty: AdminGuideStep["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
    }
  }

  const markStepCompleted = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  return (
    <div className="space-y-6">
      {/* 总体进度 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            管理后台使用指南
          </CardTitle>
          <CardDescription>完成以下步骤，快速掌握言语云³医疗AI系统的管理和配置</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>总体进度</span>
              <span>
                {completedSteps.length}/{allSteps.length} 步骤完成
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>预计总时间: {allSteps.reduce((sum, step) => sum + step.estimatedTime, 0)} 分钟</span>
              <span>•</span>
              <span>剩余时间: {nextSteps.reduce((sum, step) => sum + step.estimatedTime, 0)} 分钟</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 分类步骤 */}
      <Tabs value={currentCategory} onValueChange={(value) => setCurrentCategory(value as AdminGuideStep["category"])}>
        <TabsList className="grid w-full grid-cols-5">
          {categories.map((category) => {
            const categorySteps = AdminGuideService.getStepsByCategory(category.id)
            const completedInCategory = categorySteps.filter((step) => completedSteps.includes(step.id)).length
            const Icon = category.icon

            return (
              <TabsTrigger key={category.id} value={category.id} className="flex flex-col gap-1">
                <Icon className="h-4 w-4" />
                <span className="text-xs">{category.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {completedInCategory}/{categorySteps.length}
                </Badge>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="grid gap-4">
              {AdminGuideService.getStepsByCategory(category.id).map((step) => {
                const isCompleted = completedSteps.includes(step.id)
                const canStart =
                  !step.prerequisites || step.prerequisites.every((prereq) => completedSteps.includes(prereq))

                return (
                  <Card
                    key={step.id}
                    className={`transition-all ${
                      isCompleted ? "bg-green-50 border-green-200" : canStart ? "hover:shadow-md" : "opacity-60"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-400 mt-0.5" />
                          )}
                          <div className="space-y-1">
                            <CardTitle className="text-base">{step.title}</CardTitle>
                            <CardDescription>{step.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getDifficultyColor(step.difficulty)}>
                            {step.difficulty === "beginner"
                              ? "初级"
                              : step.difficulty === "intermediate"
                                ? "中级"
                                : "高级"}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {step.estimatedTime}分钟
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          {step.prerequisites && step.prerequisites.length > 0 && (
                            <div className="text-xs text-muted-foreground">
                              前置条件:{" "}
                              {step.prerequisites
                                .map((prereq) => {
                                  const prereqStep = allSteps.find((s) => s.id === prereq)
                                  return prereqStep?.title
                                })
                                .join(", ")}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {step.route && (
                            <Button
                              variant={isCompleted ? "secondary" : "default"}
                              size="sm"
                              disabled={!canStart}
                              asChild
                            >
                              <Link href={step.route}>
                                {isCompleted ? "重新查看" : "开始"}
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          )}
                          {!isCompleted && canStart && (
                            <Button variant="outline" size="sm" onClick={() => markStepCompleted(step.id)}>
                              标记完成
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* 下一步建议 */}
      {nextSteps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">建议下一步</CardTitle>
            <CardDescription>根据您的进度，建议优先完成以下步骤</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {nextSteps.slice(0, 3).map((step) => (
                <div key={step.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Circle className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="font-medium">{step.title}</div>
                      <div className="text-sm text-muted-foreground">{step.description}</div>
                    </div>
                  </div>
                  {step.route && (
                    <Button size="sm" asChild>
                      <Link href={step.route}>
                        开始
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
