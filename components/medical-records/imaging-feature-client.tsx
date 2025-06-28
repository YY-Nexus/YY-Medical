"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layers, Waves, Scan, Activity, Microscope, Search, ImageIcon, Crosshair } from "lucide-react"
import { ImagingFeatureReference } from "./imaging-feature-reference"
import { InteractiveImageAnnotation } from "./interactive-image-annotation"
import type { ModalityType, AnatomicalRegion } from "../../types/imaging-features"

export function ImagingFeatureClient() {
  const [selectedModality, setSelectedModality] = useState<ModalityType>("CT")
  const [selectedRegion, setSelectedRegion] = useState<AnatomicalRegion>("肺部")
  const [selectedImage, setSelectedImage] = useState<string>("/examples/ct-lung.jpg")
  const [activeTab, setActiveTab] = useState("reference")
  const [searchQuery, setSearchQuery] = useState("")

  // 模拟图像列表
  const sampleImages = [
    { id: "img1", url: "/examples/ct-lung.jpg", modality: "CT", region: "肺部", description: "肺部CT示例图像" },
    { id: "img2", url: "/examples/mri-brain.jpg", modality: "MRI", region: "脑部", description: "脑部MRI示例图像" },
    { id: "img3", url: "/examples/xray-chest.jpg", modality: "X光", region: "胸部", description: "胸部X光示例图像" },
    {
      id: "img4",
      url: "/examples/us-thyroid.jpg",
      modality: "超声",
      region: "头部",
      description: "甲状腺超声示例图像",
    },
  ]

  // 获取模态图标
  const getModalityIcon = (modalityType: ModalityType) => {
    switch (modalityType) {
      case "CT":
        return <Layers className="h-5 w-5" />
      case "MRI":
        return <Waves className="h-5 w-5" />
      case "X光":
        return <Scan className="h-5 w-5" />
      case "超声":
        return <Activity className="h-5 w-5" />
      case "PET":
        return <Activity className="h-5 w-5" />
      case "内窥镜":
        return <Microscope className="h-5 w-5" />
      case "病理":
        return <Microscope className="h-5 w-5" />
      default:
        return <ImageIcon className="h-5 w-5" />
    }
  }

  // 处理图像选择
  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  // 处理搜索
  const handleSearch = () => {
    console.log("搜索:", searchQuery)
    // 实际应用中这里会调用搜索API
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">医学影像特征知识库</CardTitle>
          <CardDescription>浏览和标注医学影像特征，关联医学知识库</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block">影像模态</label>
              <Select value={selectedModality} onValueChange={(value) => setSelectedModality(value as ModalityType)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择影像模态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CT">CT (计算机断层扫描)</SelectItem>
                  <SelectItem value="MRI">MRI (磁共振成像)</SelectItem>
                  <SelectItem value="X光">X光 (X射线)</SelectItem>
                  <SelectItem value="超声">超声 (超声波)</SelectItem>
                  <SelectItem value="PET">PET (正电子发射断层扫描)</SelectItem>
                  <SelectItem value="内窥镜">内窥镜</SelectItem>
                  <SelectItem value="病理">病理</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">解剖区域</label>
              <Select value={selectedRegion} onValueChange={(value) => setSelectedRegion(value as AnatomicalRegion)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择解剖区域" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="头部">头部</SelectItem>
                  <SelectItem value="胸部">胸部</SelectItem>
                  <SelectItem value="腹部">腹部</SelectItem>
                  <SelectItem value="骨骼">骨骼</SelectItem>
                  <SelectItem value="心脏">心脏</SelectItem>
                  <SelectItem value="肺部">肺部</SelectItem>
                  <SelectItem value="肝脏">肝脏</SelectItem>
                  <SelectItem value="肾脏">肾脏</SelectItem>
                  <SelectItem value="脑部">脑部</SelectItem>
                  <SelectItem value="脊柱">脊柱</SelectItem>
                  <SelectItem value="关节">关节</SelectItem>
                  <SelectItem value="血管">血管</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">搜索特征</label>
              <div className="flex gap-2">
                <Input
                  placeholder="输入特征关键词..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button variant="outline" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {sampleImages.map((image) => (
              <div
                key={image.id}
                className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                  selectedImage === image.url ? "ring-2 ring-blue-500" : "hover:shadow-md"
                }`}
                onClick={() => handleImageSelect(image.url)}
              >
                <div className="aspect-video bg-gray-100 relative">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.description}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    {getModalityIcon(image.modality as ModalityType)}
                    <span className="font-medium">{image.modality}</span>
                  </div>
                  <p className="text-sm text-gray-500">{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="reference">
                <Search className="h-4 w-4 mr-2" />
                特征参考
              </TabsTrigger>
              <TabsTrigger value="annotation">
                <Crosshair className="h-4 w-4 mr-2" />
                交互式标注
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reference">
              <ImagingFeatureReference
                selectedImage={selectedImage}
                modality={selectedModality}
                anatomicalRegion={selectedRegion}
              />
            </TabsContent>

            <TabsContent value="annotation">
              <InteractiveImageAnnotation
                selectedImage={selectedImage}
                modality={selectedModality}
                anatomicalRegion={selectedRegion}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
