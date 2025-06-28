"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ImageIcon,
  Scan,
  Layers,
  Waves,
  Activity,
  Microscope,
  AlertTriangle,
  Info,
  Search,
  Stethoscope,
  BookOpen,
  Crosshair,
  ZoomIn,
  ZoomOut,
  RotateCw,
  PanelLeft,
  PanelRight,
} from "lucide-react"
import { imagingFeatureService } from "../../services/imaging-feature-service"
import type {
  ImagingFeature,
  ModalityType,
  AnatomicalRegion,
  CTFeature,
  MRIFeature,
  XRayFeature,
  UltrasoundFeature,
} from "../../types/imaging-features"
import type { DiagnosticFinding } from "../../types/medical-records"

interface ImagingFeatureReferenceProps {
  selectedImage?: string
  modality?: ModalityType
  anatomicalRegion?: AnatomicalRegion
  findings?: DiagnosticFinding[]
  patientId?: string
}

export function ImagingFeatureReference({
  selectedImage,
  modality = "CT",
  anatomicalRegion = "肺部",
  findings = [],
  patientId,
}: ImagingFeatureReferenceProps) {
  const [features, setFeatures] = useState<ImagingFeature[]>([])
  const [selectedFeature, setSelectedFeature] = useState<ImagingFeature | null>(null)
  const [relatedDiseases, setRelatedDiseases] = useState<{ disease: any; confidence: number }[]>([])
  const [activeTab, setActiveTab] = useState("features")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showSideBySide, setShowSideBySide] = useState(false)

  // 加载特征数据
  useEffect(() => {
    if (modality && anatomicalRegion) {
      loadFeatures()
    }
  }, [modality, anatomicalRegion])

  // 从诊断结果中提取特征
  useEffect(() => {
    if (findings.length > 0) {
      // 这里可以根据诊断结果中的特征描述匹配相应的影像特征
      // 简化实现，仅根据模态和解剖区域加载特征
      loadFeatures()
    }
  }, [findings])

  // 加载特征数据
  const loadFeatures = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // 获取特定模态和解剖区域的特征
      const modalityFeatures = imagingFeatureService.getFeaturesByModalityAndRegion(modality, anatomicalRegion)
      setFeatures(modalityFeatures)

      // 如果有特征，默认选择第一个
      if (modalityFeatures.length > 0) {
        setSelectedFeature(modalityFeatures[0])
        loadRelatedDiseases(modalityFeatures[0].id)
      }
    } catch (err) {
      console.error("加载影像特征失败:", err)
      setError("加载影像特征数据时发生错误，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }

  // 加载相关疾病
  const loadRelatedDiseases = (featureId: string) => {
    try {
      const diseases = imagingFeatureService.getAssociatedDiseasesByFeatureId(featureId)
      setRelatedDiseases(diseases)
    } catch (err) {
      console.error("加载相关疾病失败:", err)
      setError("加载相关疾病数据时发生错误")
    }
  }

  // 处理特征选择
  const handleFeatureSelect = (feature: ImagingFeature) => {
    setSelectedFeature(feature)
    loadRelatedDiseases(feature.id)
  }

  // 处理搜索
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      loadFeatures()
      return
    }

    try {
      const searchResults = imagingFeatureService.searchFeatures(searchQuery)
      // 过滤当前模态和解剖区域的结果
      const filteredResults = searchResults.filter(
        (feature) => feature.modalities.includes(modality) && feature.anatomicalRegions.includes(anatomicalRegion),
      )
      setFeatures(filteredResults)

      if (filteredResults.length > 0) {
        setSelectedFeature(filteredResults[0])
        loadRelatedDiseases(filteredResults[0].id)
      }
    } catch (err) {
      console.error("搜索特征失败:", err)
      setError("搜索特征时发生错误")
    }
  }

  // 获取模态图标
  const getModalityIcon = (modalityType: ModalityType) => {
    switch (modalityType) {
      case "CT":
        return <Layers className="h-5 w-5 text-blue-600" />
      case "MRI":
        return <Waves className="h-5 w-5 text-purple-600" />
      case "X光":
        return <Scan className="h-5 w-5 text-gray-600" />
      case "超声":
        return <Activity className="h-5 w-5 text-teal-600" />
      case "PET":
        return <Activity className="h-5 w-5 text-red-600" />
      case "内窥镜":
        return <Stethoscope className="h-5 w-5 text-amber-600" />
      case "病理":
        return <Microscope className="h-5 w-5 text-green-600" />
      default:
        return <ImageIcon className="h-5 w-5 text-blue-600" />
    }
  }

  // 渲染CT特征详情
  const renderCTFeatureDetails = (feature: CTFeature) => {
    return (
      <div className="grid grid-cols-2 gap-4 mt-4">
        {feature.density && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">密度</p>
            <p className="font-medium">{feature.density}</p>
          </div>
        )}
        {feature.enhancement && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">强化方式</p>
            <p className="font-medium">{feature.enhancement}</p>
          </div>
        )}
        {feature.calcification && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">钙化</p>
            <p className="font-medium">{feature.calcification}</p>
          </div>
        )}
        {feature.border && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">边界</p>
            <p className="font-medium">{feature.border}</p>
          </div>
        )}
        {feature.shape && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">形态</p>
            <p className="font-medium">{feature.shape}</p>
          </div>
        )}
        {feature.hounsfield && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">CT值范围 (HU)</p>
            <p className="font-medium">
              {feature.hounsfield.min} ~ {feature.hounsfield.max}
            </p>
          </div>
        )}
      </div>
    )
  }

  // 渲染MRI特征详情
  const renderMRIFeatureDetails = (feature: MRIFeature) => {
    return (
      <div className="grid grid-cols-2 gap-4 mt-4">
        {feature.t1Signal && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">T1信号</p>
            <p className="font-medium">{feature.t1Signal}</p>
          </div>
        )}
        {feature.t2Signal && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">T2信号</p>
            <p className="font-medium">{feature.t2Signal}</p>
          </div>
        )}
        {feature.diffusionRestriction !== undefined && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">弥散受限</p>
            <p className="font-medium">{feature.diffusionRestriction ? "是" : "否"}</p>
          </div>
        )}
        {feature.enhancement && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">强化方式</p>
            <p className="font-medium">{feature.enhancement}</p>
          </div>
        )}
        {feature.border && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">边界</p>
            <p className="font-medium">{feature.border}</p>
          </div>
        )}
        {feature.shape && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">形态</p>
            <p className="font-medium">{feature.shape}</p>
          </div>
        )}
      </div>
    )
  }

  // 渲染X光特征详情
  const renderXRayFeatureDetails = (feature: XRayFeature) => {
    return (
      <div className="grid grid-cols-2 gap-4 mt-4">
        {feature.opacity && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">密度</p>
            <p className="font-medium">{feature.opacity}</p>
          </div>
        )}
        {feature.border && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">边界</p>
            <p className="font-medium">{feature.border}</p>
          </div>
        )}
        {feature.shape && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">形态</p>
            <p className="font-medium">{feature.shape}</p>
          </div>
        )}
        {feature.silhouetteSign !== undefined && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">轮廓征</p>
            <p className="font-medium">{feature.silhouetteSign ? "阳性" : "阴性"}</p>
          </div>
        )}
        {feature.airBronchogram !== undefined && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">支气管充气征</p>
            <p className="font-medium">{feature.airBronchogram ? "阳性" : "阴性"}</p>
          </div>
        )}
      </div>
    )
  }

  // 渲染超声特征详情
  const renderUltrasoundFeatureDetails = (feature: UltrasoundFeature) => {
    return (
      <div className="grid grid-cols-2 gap-4 mt-4">
        {feature.echogenicity && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">回声</p>
            <p className="font-medium">{feature.echogenicity}</p>
          </div>
        )}
        {feature.border && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">边界</p>
            <p className="font-medium">{feature.border}</p>
          </div>
        )}
        {feature.shape && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">形态</p>
            <p className="font-medium">{feature.shape}</p>
          </div>
        )}
        {feature.vascularity && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">血流信号</p>
            <p className="font-medium">{feature.vascularity}</p>
          </div>
        )}
        {feature.posteriorAcoustic && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-1">后方回声</p>
            <p className="font-medium">{feature.posteriorAcoustic}</p>
          </div>
        )}
      </div>
    )
  }

  // 渲染特征详情
  const renderFeatureDetails = (feature: ImagingFeature) => {
    if (!feature) return null

    switch (feature.modalities[0]) {
      case "CT":
        return renderCTFeatureDetails(feature as CTFeature)
      case "MRI":
        return renderMRIFeatureDetails(feature as MRIFeature)
      case "X光":
        return renderXRayFeatureDetails(feature as XRayFeature)
      case "超声":
        return renderUltrasoundFeatureDetails(feature as UltrasoundFeature)
      default:
        return null
    }
  }

  // 渲染错误提示
  const renderError = () => {
    if (!error) return null

    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>加载失败</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  // 渲染图像查看器
  const renderImageViewer = () => {
    if (!selectedImage && !selectedFeature?.imageExamples?.length) {
      return (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-md">
          <p className="text-gray-500">无可用图像</p>
        </div>
      )
    }

    const imageUrl = selectedImage || selectedFeature?.imageExamples?.[0] || ""

    return (
      <div className="relative">
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <Button variant="outline" size="icon" onClick={() => setZoomLevel(Math.min(zoomLevel + 0.1, 2))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setZoomLevel(Math.max(zoomLevel - 0.1, 0.5))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setZoomLevel(1)}>
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setShowSideBySide(!showSideBySide)}>
            {showSideBySide ? <PanelLeft className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
          </Button>
        </div>
        <div
          className="overflow-hidden bg-black rounded-md"
          style={{ height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={selectedFeature?.name || "医学影像"}
            style={{
              transform: `scale(${zoomLevel})`,
              transition: "transform 0.2s ease-in-out",
              maxHeight: "100%",
              maxWidth: "100%",
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
          {getModalityIcon(modality)}
          影像特征参考
        </CardTitle>
        <CardDescription>提供{modality}影像特征与疾病知识库的关联参考</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {renderError()}

        <div className={`grid grid-cols-1 ${showSideBySide ? "md:grid-cols-2" : "md:grid-cols-4"}`}>
          {/* 左侧特征列表 */}
          {!showSideBySide && (
            <div className="border-r border-gray-200 p-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">影像特征</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {modality}影像中{anatomicalRegion}的常见特征
                </p>

                {/* 添加搜索功能 */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="搜索特征..."
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <Button variant="outline" size="sm" onClick={handleSearch}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : features.length > 0 ? (
                <ScrollArea className="h-[calc(100vh-350px)] pr-4">
                  <div className="space-y-2">
                    {features.map((feature) => (
                      <div
                        key={feature.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedFeature?.id === feature.id
                            ? "bg-blue-100 border-l-4 border-blue-500"
                            : "hover:bg-gray-100 border-l-4 border-transparent"
                        }`}
                        onClick={() => handleFeatureSelect(feature)}
                      >
                        <h4 className="font-medium">{feature.name}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2 mt-1">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Search className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>未找到相关影像特征</p>
                  <p className="text-sm mt-2">尝试使用搜索功能查找特定特征</p>
                </div>
              )}
            </div>
          )}

          {/* 右侧详细信息 */}
          <div className={showSideBySide ? "col-span-1" : "col-span-3"}>
            {selectedFeature ? (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b">
                  <TabsList className="p-0 bg-transparent h-12">
                    <TabsTrigger
                      value="features"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none h-12 px-4"
                    >
                      <Crosshair className="h-4 w-4 mr-2" />
                      特征详情
                    </TabsTrigger>
                    <TabsTrigger
                      value="diseases"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none h-12 px-4"
                    >
                      <Stethoscope className="h-4 w-4 mr-2" />
                      相关疾病
                      {relatedDiseases.length > 0 && (
                        <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                          {relatedDiseases.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="image"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none h-12 px-4"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      影像示例
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="features" className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-bold text-blue-800">{selectedFeature.name}</h2>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {selectedFeature.modalities.join(", ")}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-4">{selectedFeature.description}</p>
                    </div>

                    {/* 特征详情 */}
                    {renderFeatureDetails(selectedFeature)}

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">关键特征</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {selectedFeature.keyCharacteristics.map((char, index) => (
                          <li key={index} className="text-gray-700">
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">鉴别要点</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {selectedFeature.differentialFeatures.map((feature, index) => (
                          <li key={index} className="text-gray-700">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="diseases" className="p-6">
                  {relatedDiseases.length > 0 ? (
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold text-blue-800 mb-4">相关疾病</h2>

                      <div className="space-y-4">
                        {relatedDiseases.map(({ disease, confidence }) => (
                          <Card key={disease.id} className="overflow-hidden">
                            <CardHeader className="bg-gray-50 p-4">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{disease.name}</CardTitle>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                  相关度: {Math.round(confidence * 100)}%
                                </Badge>
                              </div>
                              {disease.icd10Code && <CardDescription>ICD-10: {disease.icd10Code}</CardDescription>}
                            </CardHeader>
                            <CardContent className="p-4">
                              <p className="text-gray-700 mb-4">{disease.description}</p>

                              <div className="mt-4">
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                                  典型症状
                                </h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {disease.symptoms.slice(0, 3).map((symptom, index) => (
                                    <li key={index} className="text-gray-700">
                                      {symptom}
                                    </li>
                                  ))}
                                  {disease.symptoms.length > 3 && (
                                    <li className="text-blue-600 cursor-pointer">查看更多...</li>
                                  )}
                                </ul>
                              </div>

                              <div className="mt-4">
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                  <Info className="h-4 w-4 text-blue-500" />
                                  鉴别诊断
                                </h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {disease.differentialDiagnosis.slice(0, 3).map((diagnosis, index) => (
                                    <li key={index} className="text-gray-700">
                                      {diagnosis}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="mt-4 flex justify-end">
                                <Button variant="outline" size="sm" className="text-blue-600">
                                  <BookOpen className="h-4 w-4 mr-2" />
                                  查看完整疾病信息
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Stethoscope className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-medium mb-2">暂无相关疾病</p>
                      <p>当前特征在知识库中没有关联的疾病信息</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="image" className="p-6">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-blue-800 mb-4">{selectedFeature.name}影像示例</h2>

                    {renderImageViewer()}

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">影像解析</h3>
                      <p className="text-gray-700">{selectedFeature.description}</p>

                      <div className="mt-4 bg-blue-50 p-4 rounded-md">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Info className="h-4 w-4 text-blue-600" />
                          观察要点
                        </h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedFeature.keyCharacteristics.map((char, index) => (
                            <li key={index} className="text-gray-700">
                              {char}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex items-center justify-center h-full py-16 text-center text-gray-500">
                <div>
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">请选择一个影像特征</p>
                  <p>从左侧列表中选择一个特征以查看详细信息</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
