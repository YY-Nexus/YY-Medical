"use client"

import { useState, useRef, useEffect, useMemo, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  Grid,
  GizmoHelper,
  GizmoViewport,
  Bounds,
  useBounds,
  useGLTF,
  useTexture,
} from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import {
  CuboidIcon as Cube,
  Maximize,
  Minimize,
  Ruler,
  Pencil,
  Download,
  Scissors,
  Sliders,
  Crosshair,
  Boxes,
  Box,
  Scan,
  Brain,
  Heart,
  AirVentIcon as Lung,
  Bone,
} from "lucide-react"
import * as THREE from "three"

// 模拟3D医学影像数据
interface MedicalVolumeData {
  id: string
  name: string
  type: "CT" | "MRI" | "PET" | "3D模型"
  description: string
  dimensions: [number, number, number]
  spacing: [number, number, number]
  origin: [number, number, number]
  modality: string
  patientId: string
  studyDate: string
  url?: string
  modelUrl?: string
  textureUrl?: string
}

// 模拟数据
const mockVolumeData: MedicalVolumeData[] = [
  {
    id: "volume-1",
    name: "胸部CT",
    type: "CT",
    description: "胸部CT扫描，肺部结节",
    dimensions: [512, 512, 128],
    spacing: [0.7, 0.7, 1.5],
    origin: [0, 0, 0],
    modality: "CT",
    patientId: "P-20240428-001",
    studyDate: "2024-04-28",
    textureUrl: "/assets/3d/texture_earth.jpg", // 使用示例纹理
  },
  {
    id: "volume-2",
    name: "头部MRI",
    type: "MRI",
    description: "头部MRI扫描，脑部肿瘤",
    dimensions: [256, 256, 64],
    spacing: [1.0, 1.0, 2.0],
    origin: [0, 0, 0],
    modality: "MRI",
    patientId: "P-20240429-002",
    studyDate: "2024-04-29",
    textureUrl: "/assets/3d/texture_earth.jpg", // 使用示例纹理
  },
  {
    id: "volume-3",
    name: "3D肺部模型",
    type: "3D模型",
    description: "肺部3D模型",
    dimensions: [0, 0, 0],
    spacing: [0, 0, 0],
    origin: [0, 0, 0],
    modality: "3D",
    patientId: "P-20240430-003",
    studyDate: "2024-04-30",
    modelUrl: "/assets/3d/duck.glb", // 使用示例3D模型
  },
]

// 渲染模式
type RenderMode = "体积渲染" | "表面渲染" | "最大密度投影" | "切片" | "3D模型"

// 3D医学影像浏览器属性
interface MedicalViewer3DProps {
  volumeId?: string
  onClose?: () => void
}

// 主组件
export function MedicalViewer3D({ volumeId = "volume-1", onClose }: MedicalViewer3DProps) {
  const [volume, setVolume] = useState<MedicalVolumeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [renderMode, setRenderMode] = useState<RenderMode>("体积渲染")
  const [sliceIndex, setSliceIndex] = useState<[number, number, number]>([64, 64, 64])
  const [threshold, setThreshold] = useState<[number, number]>([0.3, 0.7])
  const [opacity, setOpacity] = useState(0.8)
  const [showGrid, setShowGrid] = useState(true)
  const [showAxes, setShowAxes] = useState(true)
  const [showBoundingBox, setShowBoundingBox] = useState(true)
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [activeTool, setActiveTool] = useState<"none" | "measure" | "annotate" | "crop">("none")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null)
  const [colorMap, setColorMap] = useState<string>("viridis")
  const [lightIntensity, setLightIntensity] = useState(1)
  const [rotationSpeed, setRotationSpeed] = useState(0)
  const [autoRotate, setAutoRotate] = useState(false)
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 5])
  const [annotations, setAnnotations] = useState<any[]>([])
  const [measurements, setMeasurements] = useState<any[]>([])
  const [viewMode, setViewMode] = useState<"single" | "multi">("single")
  const [selectedVolumes, setSelectedVolumes] = useState<string[]>([volumeId])
  const containerRef = useRef<HTMLDivElement>(null)

  // 加载体积数据
  useEffect(() => {
    setLoading(true)
    setError(null)

    try {
      // 模拟网络请求
      setTimeout(() => {
        const volumeData = mockVolumeData.find((v) => v.id === volumeId)
        if (volumeData) {
          setVolume(volumeData)
          setSelectedVolumes([volumeId])

          // 根据体积类型设置默认渲染模式
          if (volumeData.type === "3D模型") {
            setRenderMode("3D模型")
          } else if (volumeData.type === "CT") {
            setRenderMode("体积渲染")
          } else {
            setRenderMode("表面渲染")
          }
        } else {
          setError("未找到指定的体积数据")
        }
        setLoading(false)
      }, 1000)
    } catch (err) {
      console.error("加载体积数据失败:", err)
      setError("加载体积数据失败，请稍后重试")
      setLoading(false)
    }
  }, [volumeId])

  // 处理全屏切换
  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // 处理渲染模式变化
  const handleRenderModeChange = (mode: string) => {
    setRenderMode(mode as RenderMode)
  }

  // 处理阈值变化
  const handleThresholdChange = (values: number[]) => {
    setThreshold([values[0], values[1]])
  }

  // 处理不透明度变化
  const handleOpacityChange = (values: number[]) => {
    setOpacity(values[0])
  }

  // 处理切片索引变化
  const handleSliceIndexChange = (axis: number, value: number[]) => {
    const newSliceIndex = [...sliceIndex]
    newSliceIndex[axis] = value[0]
    setSliceIndex(newSliceIndex as [number, number, number])
  }

  // 处理光照强度变化
  const handleLightIntensityChange = (values: number[]) => {
    setLightIntensity(values[0])
  }

  // 处理旋转速度变化
  const handleRotationSpeedChange = (values: number[]) => {
    setRotationSpeed(values[0])
  }

  // 处理自动旋转切换
  const handleAutoRotateChange = (checked: boolean) => {
    setAutoRotate(checked)
  }

  // 处理器官选择
  const handleOrganSelect = (organ: string) => {
    setSelectedOrgan(organ === selectedOrgan ? null : organ)
  }

  // 处理颜色映射变化
  const handleColorMapChange = (value: string) => {
    setColorMap(value)
  }

  // 处理工具选择
  const handleToolSelect = (tool: "none" | "measure" | "annotate" | "crop") => {
    setActiveTool(tool)
  }

  // 处理视图模式变化
  const handleViewModeChange = (mode: "single" | "multi") => {
    setViewMode(mode)
  }

  // 处理体积选择
  const handleVolumeSelect = (volumeId: string) => {
    if (viewMode === "single") {
      setSelectedVolumes([volumeId])
      const volumeData = mockVolumeData.find((v) => v.id === volumeId)
      if (volumeData) {
        setVolume(volumeData)

        // 根据体积类型设置默认渲染模式
        if (volumeData.type === "3D模型") {
          setRenderMode("3D模型")
        } else if (volumeData.type === "CT") {
          setRenderMode("体积渲染")
        } else {
          setRenderMode("表面渲染")
        }
      }
    } else {
      // 多视图模式下，切换选择状态
      if (selectedVolumes.includes(volumeId)) {
        setSelectedVolumes(selectedVolumes.filter((id) => id !== volumeId))
      } else {
        setSelectedVolumes([...selectedVolumes, volumeId])
      }
    }
  }

  // 渲染加载状态
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="text-center">
          <LoadingSpinner className="h-12 w-12 mx-auto mb-4" />
          <p className="text-xl">加载3D医学影像...</p>
          <p className="text-gray-500 mt-2">请稍候，正在准备数据</p>
        </div>
      </div>
    )
  }

  // 渲染错误状态
  if (error || !volume) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="text-center text-red-500">
          <p className="text-xl mb-2">加载失败</p>
          <p>{error || "未找到体积数据"}</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            重试
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${isFullscreen ? "w-screen h-screen" : "w-full h-[700px]"} border rounded-md overflow-hidden bg-gray-900`}
    >
      {/* 顶部工具栏 */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gray-800 bg-opacity-80 p-2 flex justify-between items-center">
        <div className="flex items-center">
          <h3 className="text-white font-medium mr-4">{volume.name}</h3>
          <div className="flex items-center space-x-2">
            <Select value={renderMode} onValueChange={handleRenderModeChange}>
              <SelectTrigger className="w-[140px] h-8 bg-gray-700 text-white border-gray-600">
                <SelectValue placeholder="渲染模式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="体积渲染">体积渲染</SelectItem>
                <SelectItem value="表面渲染">表面渲染</SelectItem>
                <SelectItem value="最大密度投影">最大密度投影</SelectItem>
                <SelectItem value="切片">切片视图</SelectItem>
                {volume.type === "3D模型" && <SelectItem value="3D模型">3D模型</SelectItem>}
              </SelectContent>
            </Select>

            <Select value={colorMap} onValueChange={handleColorMapChange}>
              <SelectTrigger className="w-[120px] h-8 bg-gray-700 text-white border-gray-600">
                <SelectValue placeholder="颜色映射" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viridis">Viridis</SelectItem>
                <SelectItem value="jet">Jet</SelectItem>
                <SelectItem value="gray">灰度</SelectItem>
                <SelectItem value="hot">热力图</SelectItem>
                <SelectItem value="bone">骨骼</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-gray-700"
            onClick={() => handleToolSelect("none")}
            data-active={activeTool === "none"}
          >
            <Cube className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-gray-700"
            onClick={() => handleToolSelect("measure")}
            data-active={activeTool === "measure"}
          >
            <Ruler className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-gray-700"
            onClick={() => handleToolSelect("annotate")}
            data-active={activeTool === "annotate"}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-gray-700"
            onClick={() => handleToolSelect("crop")}
            data-active={activeTool === "crop"}
          >
            <Scissors className="h-4 w-4" />
          </Button>
          <div className="h-4 w-px bg-gray-600 mx-1"></div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-gray-700"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-gray-700" onClick={onClose}>
              <Crosshair className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* 左侧控制面板 */}
      <div className="absolute left-0 top-12 bottom-0 z-10 w-64 bg-gray-800 bg-opacity-80 p-3 overflow-y-auto">
        <Tabs defaultValue="render" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 bg-gray-700">
            <TabsTrigger value="render" className="text-xs">
              渲染
            </TabsTrigger>
            <TabsTrigger value="tools" className="text-xs">
              工具
            </TabsTrigger>
            <TabsTrigger value="data" className="text-xs">
              数据
            </TabsTrigger>
          </TabsList>

          {/* 渲染设置 */}
          <TabsContent value="render" className="mt-0">
            <div className="space-y-4">
              {/* 不透明度控制 */}
              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>不透明度</span>
                  <span>{Math.round(opacity * 100)}%</span>
                </div>
                <Slider
                  value={[opacity]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(values) => handleOpacityChange(values)}
                  className="[&_[role=slider]]:bg-blue-500"
                />
              </div>

              {/* 阈值控制 */}
              {(renderMode === "体积渲染" || renderMode === "表面渲染") && (
                <div>
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span>密度阈值</span>
                    <span>
                      {threshold[0].toFixed(2)} - {threshold[1].toFixed(2)}
                    </span>
                  </div>
                  <Slider
                    value={[threshold[0], threshold[1]]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={(values) => handleThresholdChange(values)}
                    className="[&_[role=slider]]:bg-blue-500"
                  />
                </div>
              )}

              {/* 切片控制 */}
              {renderMode === "切片" && (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-gray-300 mb-1">
                      <span>X轴切片</span>
                      <span>{sliceIndex[0]}</span>
                    </div>
                    <Slider
                      value={[sliceIndex[0]]}
                      min={0}
                      max={volume.dimensions[0] - 1}
                      step={1}
                      onValueChange={(values) => handleSliceIndexChange(0, values)}
                      className="[&_[role=slider]]:bg-red-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-300 mb-1">
                      <span>Y轴切片</span>
                      <span>{sliceIndex[1]}</span>
                    </div>
                    <Slider
                      value={[sliceIndex[1]]}
                      min={0}
                      max={volume.dimensions[1] - 1}
                      step={1}
                      onValueChange={(values) => handleSliceIndexChange(1, values)}
                      className="[&_[role=slider]]:bg-green-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-300 mb-1">
                      <span>Z轴切片</span>
                      <span>{sliceIndex[2]}</span>
                    </div>
                    <Slider
                      value={[sliceIndex[2]]}
                      min={0}
                      max={volume.dimensions[2] - 1}
                      step={1}
                      onValueChange={(values) => handleSliceIndexChange(2, values)}
                      className="[&_[role=slider]]:bg-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* 光照控制 */}
              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>光照强度</span>
                  <span>{lightIntensity.toFixed(1)}</span>
                </div>
                <Slider
                  value={[lightIntensity]}
                  min={0}
                  max={2}
                  step={0.1}
                  onValueChange={(values) => handleLightIntensityChange(values)}
                  className="[&_[role=slider]]:bg-yellow-500"
                />
              </div>

              {/* 旋转控制 */}
              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>旋转速度</span>
                  <span>{rotationSpeed.toFixed(1)}</span>
                </div>
                <Slider
                  value={[rotationSpeed]}
                  min={0}
                  max={5}
                  step={0.1}
                  onValueChange={(values) => handleRotationSpeedChange(values)}
                  className="[&_[role=slider]]:bg-purple-500"
                />
              </div>

              {/* 显示选项 */}
              <div className="space-y-2 pt-2 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-grid" className="text-sm text-gray-300">
                    显示网格
                  </Label>
                  <Switch id="show-grid" checked={showGrid} onCheckedChange={setShowGrid} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-axes" className="text-sm text-gray-300">
                    显示坐标轴
                  </Label>
                  <Switch id="show-axes" checked={showAxes} onCheckedChange={setShowAxes} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-bounding-box" className="text-sm text-gray-300">
                    显示边界框
                  </Label>
                  <Switch id="show-bounding-box" checked={showBoundingBox} onCheckedChange={setShowBoundingBox} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-annotations" className="text-sm text-gray-300">
                    显示标注
                  </Label>
                  <Switch id="show-annotations" checked={showAnnotations} onCheckedChange={setShowAnnotations} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-rotate" className="text-sm text-gray-300">
                    自动旋转
                  </Label>
                  <Switch id="auto-rotate" checked={autoRotate} onCheckedChange={handleAutoRotateChange} />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 工具设置 */}
          <TabsContent value="tools" className="mt-0">
            <div className="space-y-4">
              {/* 器官选择 */}
              <div>
                <h4 className="text-sm text-gray-300 mb-2">器官分割</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-8 text-xs ${selectedOrgan === "lung" ? "bg-blue-900 border-blue-500" : "bg-gray-700 border-gray-600"}`}
                    onClick={() => handleOrganSelect("lung")}
                  >
                    <Lung className="h-3 w-3 mr-1" />
                    肺部
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-8 text-xs ${selectedOrgan === "heart" ? "bg-blue-900 border-blue-500" : "bg-gray-700 border-gray-600"}`}
                    onClick={() => handleOrganSelect("heart")}
                  >
                    <Heart className="h-3 w-3 mr-1" />
                    心脏
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-8 text-xs ${selectedOrgan === "brain" ? "bg-blue-900 border-blue-500" : "bg-gray-700 border-gray-600"}`}
                    onClick={() => handleOrganSelect("brain")}
                  >
                    <Brain className="h-3 w-3 mr-1" />
                    大脑
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-8 text-xs ${selectedOrgan === "bone" ? "bg-blue-900 border-blue-500" : "bg-gray-700 border-gray-600"}`}
                    onClick={() => handleOrganSelect("bone")}
                  >
                    <Bone className="h-3 w-3 mr-1" />
                    骨骼
                  </Button>
                </div>
              </div>

              {/* 测量工具 */}
              {activeTool === "measure" && (
                <div>
                  <h4 className="text-sm text-gray-300 mb-2">测量工具</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-gray-700 border-gray-600">
                      <Ruler className="h-3 w-3 mr-1" />
                      测量距离
                    </Button>
                    <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-gray-700 border-gray-600">
                      <Sliders className="h-3 w-3 mr-1" />
                      测量角度
                    </Button>
                    <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-gray-700 border-gray-600">
                      <Box className="h-3 w-3 mr-1" />
                      测量体积
                    </Button>
                    {measurements.length > 0 && (
                      <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-red-900 border-red-700">
                        清除所有测量
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* 标注工具 */}
              {activeTool === "annotate" && (
                <div>
                  <h4 className="text-sm text-gray-300 mb-2">标注工具</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-gray-700 border-gray-600">
                      <Pencil className="h-3 w-3 mr-1" />
                      添加标记
                    </Button>
                    <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-gray-700 border-gray-600">
                      <Crosshair className="h-3 w-3 mr-1" />
                      添加标注点
                    </Button>
                    <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-gray-700 border-gray-600">
                      <Boxes className="h-3 w-3 mr-1" />
                      添加边界框
                    </Button>
                    {annotations.length > 0 && (
                      <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-red-900 border-red-700">
                        清除所有标注
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* 裁剪工具 */}
              {activeTool === "crop" && (
                <div>
                  <h4 className="text-sm text-gray-300 mb-2">裁剪工具</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-gray-700 border-gray-600">
                      <Scissors className="h-3 w-3 mr-1" />
                      设置裁剪区域
                    </Button>
                    <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-gray-700 border-gray-600">
                      应用裁剪
                    </Button>
                    <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-gray-700 border-gray-600">
                      重置裁剪
                    </Button>
                  </div>
                </div>
              )}

              {/* 视图控制 */}
              <div className="pt-2 border-t border-gray-700">
                <h4 className="text-sm text-gray-300 mb-2">视图控制</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs bg-gray-700 border-gray-600"
                    onClick={() => setCameraPosition([0, 0, 5])}
                  >
                    前视图
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs bg-gray-700 border-gray-600"
                    onClick={() => setCameraPosition([0, 0, -5])}
                  >
                    后视图
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs bg-gray-700 border-gray-600"
                    onClick={() => setCameraPosition([5, 0, 0])}
                  >
                    右视图
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs bg-gray-700 border-gray-600"
                    onClick={() => setCameraPosition([-5, 0, 0])}
                  >
                    左视图
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs bg-gray-700 border-gray-600"
                    onClick={() => setCameraPosition([0, 5, 0])}
                  >
                    顶视图
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs bg-gray-700 border-gray-600"
                    onClick={() => setCameraPosition([0, -5, 0])}
                  >
                    底视图
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 数据信息 */}
          <TabsContent value="data" className="mt-0">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-300 mb-2">体积信息</h4>
                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>类型:</span>
                    <span className="text-white">{volume.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>模态:</span>
                    <span className="text-white">{volume.modality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>尺寸:</span>
                    <span className="text-white">{volume.dimensions.join(" × ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>间距:</span>
                    <span className="text-white">{volume.spacing.map((s) => s.toFixed(1)).join(" × ")} mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>患者ID:</span>
                    <span className="text-white">{volume.patientId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>检查日期:</span>
                    <span className="text-white">{volume.studyDate}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-300 mb-2">可用数据集</h4>
                <div className="space-y-2">
                  {mockVolumeData.map((vol) => (
                    <Button
                      key={vol.id}
                      variant="outline"
                      size="sm"
                      className={`w-full h-auto py-2 text-xs text-left justify-start ${
                        selectedVolumes.includes(vol.id) ? "bg-blue-900 border-blue-500" : "bg-gray-700 border-gray-600"
                      }`}
                      onClick={() => handleVolumeSelect(vol.id)}
                    >
                      {vol.type === "CT" && <Scan className="h-3 w-3 mr-2 shrink-0" />}
                      {vol.type === "MRI" && <Brain className="h-3 w-3 mr-2 shrink-0" />}
                      {vol.type === "3D模型" && <Cube className="h-3 w-3 mr-2 shrink-0" />}
                      <div className="flex flex-col items-start">
                        <span>{vol.name}</span>
                        <span className="text-gray-400 text-[10px]">
                          {vol.type} - {vol.studyDate}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-300 mb-2">视图模式</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-8 text-xs ${viewMode === "single" ? "bg-blue-900 border-blue-500" : "bg-gray-700 border-gray-600"}`}
                    onClick={() => handleViewModeChange("single")}
                  >
                    单视图
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-8 text-xs ${viewMode === "multi" ? "bg-blue-900 border-blue-500" : "bg-gray-700 border-gray-600"}`}
                    onClick={() => handleViewModeChange("multi")}
                  >
                    多视图
                  </Button>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-700">
                <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-gray-700 border-gray-600">
                  <Download className="h-3 w-3 mr-1" />
                  导出当前视图
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 3D渲染区域 */}
      <div className="w-full h-full">
        <Canvas shadows>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={cameraPosition} />
            <OrbitControls
              autoRotate={autoRotate}
              autoRotateSpeed={rotationSpeed}
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            />

            {/* 环境光和方向光 */}
            <ambientLight intensity={0.5 * lightIntensity} />
            <directionalLight position={[5, 10, 5]} intensity={1 * lightIntensity} castShadow />

            {/* 环境 */}
            <Environment preset="studio" />

            {/* 坐标系和网格 */}
            {showAxes && <axesHelper args={[5]} />}
            {showGrid && <Grid infiniteGrid position={[0, -2, 0]} />}

            {/* 根据渲染模式显示不同内容 */}
            <Bounds fit clip observe margin={1.2}>
              {volume.type === "3D模型" && volume.modelUrl && renderMode === "3D模型" ? (
                <ModelViewer url={volume.modelUrl} opacity={opacity} showBoundingBox={showBoundingBox} />
              ) : (
                <VolumeRenderer
                  textureUrl={volume.textureUrl || "/placeholder.svg"}
                  renderMode={renderMode}
                  threshold={threshold}
                  opacity={opacity}
                  sliceIndex={sliceIndex}
                  dimensions={volume.dimensions}
                  showBoundingBox={showBoundingBox}
                  colorMap={colorMap}
                  selectedOrgan={selectedOrgan}
                />
              )}
            </Bounds>

            {/* 辅助控件 */}
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
              <GizmoViewport labelColor="white" axisColors={["red", "green", "blue"]} />
            </GizmoHelper>
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

// 3D模型查看器组件
function ModelViewer({ url, opacity, showBoundingBox }: { url: string; opacity: number; showBoundingBox: boolean }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null)
  const [boundingBox, setBoundingBox] = useState<THREE.Box3 | null>(null)

  useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current)
      setBoundingBox(box)
    }
  }, [scene])

  return (
    <group>
      <primitive ref={modelRef} object={scene.clone()} scale={1} />

      {showBoundingBox && boundingBox && <BoxHelper box={boundingBox} color="white" />}
    </group>
  )
}

// 边界框辅助组件
function BoxHelper({ box, color }: { box: THREE.Box3; color: string }) {
  const boxHelperRef = useRef<THREE.Box3Helper>(null)

  useEffect(() => {
    if (boxHelperRef.current) {
      boxHelperRef.current.box = box
      boxHelperRef.current.updateMatrixWorld(true)
    }
  }, [box])

  return <primitive ref={boxHelperRef} object={new THREE.Box3Helper(box, new THREE.Color(color))} />
}

// 体积渲染组件
function VolumeRenderer({
  textureUrl,
  renderMode,
  threshold,
  opacity,
  sliceIndex,
  dimensions,
  showBoundingBox,
  colorMap,
  selectedOrgan,
}: {
  textureUrl: string
  renderMode: RenderMode
  threshold: [number, number]
  opacity: number
  sliceIndex: [number, number, number]
  dimensions: [number, number, number]
  showBoundingBox: boolean
  colorMap: string
  selectedOrgan: string | null
}) {
  // 加载纹理
  const texture = useTexture(textureUrl)
  const bounds = useBounds()

  // 将颜色映射名称转换为索引
  const colorMapToIndex = (colorMap: string): number => {
    switch (colorMap) {
      case "viridis":
        return 0
      case "jet":
        return 1
      case "gray":
        return 2
      case "hot":
        return 3
      case "bone":
        return 4
      default:
        return 0
    }
  }

  // 将器官名称转换为索引
  const organTypeToIndex = (organ: string | null): number => {
    switch (organ) {
      case "lung":
        return 1
      case "heart":
        return 2
      case "brain":
        return 3
      case "bone":
        return 4
      default:
        return 0
    }
  }

  // 创建着色器材质
  const shaderMaterial = useMemo(() => {
    // 顶点着色器
    const vertexShader = `
      varying vec3 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = position.xyz + 0.5; // 将位置归一化到 [0, 1] 范围
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    // 片段着色器
    const fragmentShader = `
      uniform sampler2D volumeTexture;
      uniform vec3 dimensions;
      uniform vec2 threshold;
      uniform float opacity;
      uniform vec3 sliceIndex;
      uniform int colorMapType;
      uniform bool showSelectedOrgan;
      uniform int selectedOrganType;
      
      varying vec3 vUv;
      varying vec3 vNormal;
      
      // 颜色映射函数
      vec3 applyColorMap(float value) {
        if (colorMapType == 0) { // viridis
          return vec3(
            0.267004 + 0.004874 * value + 0.385607 * pow(value, 2.0) - 0.047804 * pow(value, 3.0),
            0.004874 + 0.808881 * value - 0.144238 * pow(value, 2.0) + 0.014560 * pow(value, 3.0),
            0.329415 + 1.442506 * value - 0.374402 * pow(value, 2.0) + 0.016667 * pow(value, 3.0)
          );
        } else if (colorMapType == 1) { // jet
          vec3 color;
          if (value < 0.125) {
            color = vec3(0.0, 0.0, 0.5 + 4.0 * value);
          } else if (value < 0.375) {
            color = vec3(0.0, 4.0 * (value - 0.125), 1.0);
          } else if (value < 0.625) {
            color = vec3(4.0 * (value - 0.375), 1.0, 1.0 - 4.0 * (value - 0.375));
          } else if (value < 0.875) {
            color = vec3(1.0, 1.0 - 4.0 * (value - 0.625), 0.0);
          } else {
            color = vec3(1.0 - 4.0 * (value - 0.875), 0.0, 0.0);
          }
          return color;
        } else if (colorMapType == 2) { // gray
          return vec3(value);
        } else if (colorMapType == 3) { // hot
          vec3 color;
          if (value < 0.33) {
            color = vec3(3.0 * value, 0.0, 0.0);
          } else if (value < 0.66) {
            color = vec3(1.0, 3.0 * (value - 0.33), 0.0);
          } else {
            color = vec3(1.0, 1.0, 3.0 * (value - 0.66));
          }
          return color;
        } else if (colorMapType == 4) { // bone
          return vec3(
            0.3 + 0.7 * value,
            0.3 + 0.6 * value,
            0.3 + 0.4 * value
          );
        }
        return vec3(value); // 默认灰度
      }
      
      void main() {
        // 采样体积纹理
        float value = texture2D(volumeTexture, vUv.xy).r;
        
        // 应用阈值
        if (value < threshold.x || value > threshold.y) {
          discard;
        }
        
        // 计算简单的光照
        vec3 normal = normalize(vNormal);
        vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
        float diff = max(dot(normal, lightDir), 0.0);
        vec3 diffuse = diff * vec3(1.0);
        
        // 应用颜色映射
        vec3 color = applyColorMap(value) * (0.3 + 0.7 * diffuse);
        
        // 如果启用了器官选择，应用特殊颜色
        if (showSelectedOrgan) {
          // 模拟器官分割，实际应用中应该使用分割结果
          if (selectedOrganType == 1) { // 肺部
            if (vUv.x > 0.3 && vUv.x < 0.7 && vUv.y > 0.3 && vUv.y < 0.7 && value > 0.2 && value < 0.5) {
              color = vec3(0.0, 0.5, 1.0) * (0.3 + 0.7 * diffuse); // 蓝色
            }
          } else if (selectedOrganType == 2) { // 心脏
            if (vUv.x > 0.4 && vUv.x < 0.6 && vUv.y > 0.4 && vUv.y < 0.6 && value > 0.5) {
              color = vec3(1.0, 0.2, 0.2) * (0.3 + 0.7 * diffuse); // 红色
            }
          } else if (selectedOrganType == 3) { // 大脑
            if (vUv.x > 0.3 && vUv.x < 0.7 && vUv.y > 0.6 && vUv.y < 0.9 && value > 0.4) {
              color = vec3(0.8, 0.6, 0.8) * (0.3 + 0.7 * diffuse); // 紫色
            }
          } else if (selectedOrganType == 4) { // 骨骼
            if (value > 0.7) {
              color = vec3(0.9, 0.9, 0.8) * (0.3 + 0.7 * diffuse); // 骨白色
            }
          }
        }
        
        gl_FragColor = vec4(color, opacity);
      }
    `

    return new THREE.ShaderMaterial({
      uniforms: {
        volumeTexture: { value: texture },
        dimensions: { value: new THREE.Vector3(...dimensions) },
        threshold: { value: new THREE.Vector2(...threshold) },
        opacity: { value: opacity },
        sliceIndex: { value: new THREE.Vector3(...sliceIndex) },
        colorMapType: { value: colorMapToIndex(colorMap) },
        showSelectedOrgan: { value: selectedOrgan !== null },
        selectedOrganType: { value: organTypeToIndex(selectedOrgan) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    })
  }, [texture, renderMode, threshold, opacity, sliceIndex, dimensions, colorMap, selectedOrgan])

  // 根据渲染模式创建不同的几何体
  const geometry = useMemo(() => {
    if (renderMode === "切片") {
      // 创建三个正交切片
      const xSlice = new THREE.PlaneGeometry(1, 1)
      xSlice.rotateY(Math.PI / 2)
      xSlice.translate(sliceIndex[0] / dimensions[0] - 0.5, 0, 0)

      const ySlice = new THREE.PlaneGeometry(1, 1)
      ySlice.rotateX(Math.PI / 2)
      ySlice.translate(0, sliceIndex[1] / dimensions[1] - 0.5, 0)

      const zSlice = new THREE.PlaneGeometry(1, 1)
      zSlice.translate(0, 0, sliceIndex[2] / dimensions[2] - 0.5)

      return { xSlice, ySlice, zSlice }
    } else {
      // 对于其他渲染模式，使用立方体
      return new THREE.BoxGeometry(1, 1, 1)
    }
  }, [renderMode, sliceIndex, dimensions])

  // 边界框
  const boundingBox = useMemo(() => {
    return new THREE.Box3(new THREE.Vector3(-0.5, -0.5, -0.5), new THREE.Vector3(0.5, 0.5, 0.5))
  }, [])

  useEffect(() => {
    // 自动适应边界
    bounds.refresh().clip().fit()
  }, [bounds, renderMode])

  // 渲染切片模式
  if (renderMode === "切片") {
    return (
      <group>
        <mesh geometry={geometry.xSlice} material={shaderMaterial} />
        <mesh geometry={geometry.ySlice} material={shaderMaterial} />
        <mesh geometry={geometry.zSlice} material={shaderMaterial} />

        {showBoundingBox && <BoxHelper box={boundingBox} color="white" />}
      </group>
    )
  }

  // 渲染其他模式
  return (
    <group>
      <mesh geometry={geometry} material={shaderMaterial} />

      {showBoundingBox && <BoxHelper box={boundingBox} color="white" />}
    </group>
  )
}
