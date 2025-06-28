"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// 模拟应用截图
const screenshots = [
  {
    id: 1,
    title: "主页",
    description: "展示用户健康数据概览和重要提醒",
    image: "/modern-app-dashboard.png",
  },
  {
    id: 2,
    title: "健康记录",
    description: "查看和管理个人医疗记录和检查报告",
    image: "/digital-health-dashboard.png",
  },
  {
    id: 3,
    title: "AI问诊",
    description: "与AI医疗助手进行智能对话获取健康建议",
    image: "/ai-chat-interface.png",
  },
  {
    id: 4,
    title: "预约管理",
    description: "在线预约医生并管理预约日程",
    image: "/digital-appointment-booking.png",
  },
  {
    id: 5,
    title: "健康数据",
    description: "详细展示用户各项健康指标和趋势",
    image: "/connected-health-dashboard.png",
  },
]

export function MobileAppScreenshots() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + screenshots.length) % screenshots.length)
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>应用截图</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="flex justify-center items-center h-[500px] relative">
            {/* 使用Next.js的Image组件替代img标签 */}
            <Image
              src={screenshots[currentIndex].image || "/placeholder.svg"}
              alt={screenshots[currentIndex].title}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              priority={currentIndex === 0} // 只对第一张图片使用priority
              className="object-contain"
              quality={85}
            />
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          <div className="text-center mt-4">
            <h3 className="text-lg font-medium">{screenshots[currentIndex].title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{screenshots[currentIndex].description}</p>
          </div>

          <div className="flex justify-center mt-4 gap-1">
            {screenshots.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-emerald-500" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
