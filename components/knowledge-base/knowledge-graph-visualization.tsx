"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RelatedCasesPanel } from "../knowledge-graph/related-cases-panel"
import {
  Network,
  Share2,
  ZoomIn,
  ZoomOut,
  Search,
  Filter,
  Download,
  RefreshCw,
  Info,
  X,
  ChevronRight,
  ChevronLeft,
  Maximize,
  Minimize,
} from "lucide-react"
import { knowledgeGraphService } from "../../services/knowledge-graph-service"
import type {
  KnowledgeGraph,
  GraphNode,
  GraphRelation,
  NodeType,
  RelationType,
  GraphFilterOptions,
  GraphLayoutOptions,
} from "../../types/knowledge-graph"

// 导入D3.js
import * as d3 from "d3"

interface KnowledgeGraphVisualizationProps {
  graphId: string
  initialFocusNodeId?: string
  height?: number
  showControls?: boolean
  onNodeClick?: (node: GraphNode) => void
  onRelationClick?: (relation: GraphRelation) => void
}

export function KnowledgeGraphVisualization({
  graphId,
  initialFocusNodeId,
  height = 600,
  showControls = true,
  onNodeClick,
  onRelationClick,
}: KnowledgeGraphVisualizationProps) {
  const router = useRouter()
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [graph, setGraph] = useState<KnowledgeGraph | null>(null)
  const [filteredGraph, setFilteredGraph] = useState<KnowledgeGraph | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const [selectedRelation, setSelectedRelation] = useState<GraphRelation | null>(null)
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [showInfoPanel, setShowInfoPanel] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [focusNodeId, setFocusNodeId] = useState<string | undefined>(initialFocusNodeId)
  const [maxDistance, setMaxDistance] = useState(2)
  const [minImportance, setMinImportance] = useState(0)
  const [minStrength, setMinStrength] = useState(0)
  const [selectedNodeTypes, setSelectedNodeTypes] = useState<NodeType[]>([])
  const [selectedRelationTypes, setSelectedRelationTypes] = useState<RelationType[]>([])
  const [layoutOptions, setLayoutOptions] = useState<GraphLayoutOptions>({
    layout: "force",
    nodeSize: "importance",
    nodeSizeRange: [5, 20],
    linkWidth: "strength",
    linkWidthRange: [1, 5],
    nodeSpacing: 100,
    groupClusters: true,
    showLabels: true,
    colorScheme: "category10",
  })
  const [zoomLevel, setZoomLevel] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)

  // 获取图谱数据
  useEffect(() => {
    setLoading(true)
    setError(null)

    try {
      const graphData = knowledgeGraphService.getGraphById(graphId)
      if (graphData) {
        setGraph(graphData)
        applyFilters(graphData)
      } else {
        setError("未找到指定的知识图谱")
      }
    } catch (err) {
      console.error("获取知识图谱失败:", err)
      setError("获取知识图谱数据失败")
    } finally {
      setLoading(false)
    }
  }, [graphId])

  // 应用过滤器
  const applyFilters = useCallback(
    (sourceGraph: KnowledgeGraph) => {
      const filterOptions: GraphFilterOptions = {
        nodeTypes: selectedNodeTypes.length > 0 ? selectedNodeTypes : undefined,
        relationTypes: selectedRelationTypes.length > 0 ? selectedRelationTypes : undefined,
        minImportance: minImportance > 0 ? minImportance : undefined,
        minStrength: minStrength > 0 ? minStrength : undefined,
        searchQuery: searchQuery || undefined,
        focusNodeId: focusNodeId,
        maxDistance: maxDistance,
      }

      const filtered = knowledgeGraphService.getFilteredGraph(sourceGraph.id, filterOptions)
      setFilteredGraph(filtered)
    },
    [selectedNodeTypes, selectedRelationTypes, minImportance, minStrength, searchQuery, focusNodeId, maxDistance],
  )

  // 当过滤条件变化时重新应用过滤器
  useEffect(() => {
    if (graph) {
      applyFilters(graph)
    }
  }, [
    graph,
    selectedNodeTypes,
    selectedRelationTypes,
    minImportance,
    minStrength,
    searchQuery,
    focusNodeId,
    maxDistance,
    applyFilters,
  ])

  // 渲染图谱
  useEffect(() => {
    if (!filteredGraph || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = containerRef.current?.clientWidth || 800
    const svgHeight = height

    // 清除之前的内容
    svg.selectAll("*").remove()

    // 创建缩放行为
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform)
        setZoomLevel(event.transform.k)
      })

    svg.call(zoom as any)

    // 创建主容器
    const g = svg.append("g")

    // 设置力导向模拟
    const simulation = d3
      .forceSimulation(filteredGraph.nodes as any)
      .force(
        "link",
        d3
          .forceLink(filteredGraph.relations as any)
          .id((d: any) => d.id)
          .distance(layoutOptions.nodeSpacing),
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, svgHeight / 2))
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(svgHeight / 2).strength(0.1))

    // 如果启用了分组聚类
    if (layoutOptions.groupClusters) {
      simulation.force(
        "cluster",
        forceCluster()
          .centers((d: any) => {
            // 根据节点类型分组
            switch (d.type) {
              case "疾病":
                return { x: width * 0.5, y: svgHeight * 0.3 }
              case "症状":
                return { x: width * 0.3, y: svgHeight * 0.5 }
              case "检查":
                return { x: width * 0.7, y: svgHeight * 0.5 }
              case "治疗":
                return { x: width * 0.5, y: svgHeight * 0.7 }
              case "风险因素":
                return { x: width * 0.2, y: svgHeight * 0.3 }
              case "影像特征":
                return { x: width * 0.8, y: svgHeight * 0.3 }
              default:
                return { x: width * 0.5, y: svgHeight * 0.5 }
            }
          })
          .strength(0.5),
      )
    }

    // 创建箭头标记
    svg
      .append("defs")
      .selectAll("marker")
      .data(["end"]) // 为每种关系类型创建不同的箭头
      .enter()
      .append("marker")
      .attr("id", (d) => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25) // 调整箭头位置
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", "#999")
      .attr("d", "M0,-5L10,0L0,5")

    // 定义颜色比例尺
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

    // 绘制连接线
    const link = g
      .append("g")
      .attr("class", "links")
      .selectAll("path")
      .data(filteredGraph.relations)
      .enter()
      .append("path")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("fill", "none")
      .attr("marker-end", "url(#arrow-end)")
      .attr("stroke-width", (d) => {
        if (layoutOptions.linkWidth === "strength") {
          const [min, max] = layoutOptions.linkWidthRange
          return min + ((d.strength - 1) / 9) * (max - min)
        }
        return layoutOptions.linkWidthRange[0]
      })
      .on("click", (event, d) => {
        event.stopPropagation()
        setSelectedRelation(d)
        setSelectedNode(null)
        if (onRelationClick) onRelationClick(d)
      })
      .on("mouseover", function () {
        d3.select(this)
          .attr("stroke", "#0066cc")
          .attr("stroke-width", (d: any) => {
            const width =
              layoutOptions.linkWidth === "strength"
                ? layoutOptions.linkWidthRange[0] +
                  ((d.strength - 1) / 9) * (layoutOptions.linkWidthRange[1] - layoutOptions.linkWidthRange[0])
                : layoutOptions.linkWidthRange[0]
            return width + 1
          })
      })
      .on("mouseout", function () {
        d3.select(this)
          .attr("stroke", "#999")
          .attr("stroke-width", (d: any) => {
            if (layoutOptions.linkWidth === "strength") {
              const [min, max] = layoutOptions.linkWidthRange
              return min + ((d.strength - 1) / 9) * (max - min)
            }
            return layoutOptions.linkWidthRange[0]
          })
      })

    // 绘制关系标签
    const linkLabel = g
      .append("g")
      .attr("class", "link-labels")
      .selectAll("text")
      .data(filteredGraph.relations)
      .enter()
      .append("text")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .attr("dy", -5)
      .attr("fill", "#666")
      .text((d) => d.type)
      .style("pointer-events", "none") // 防止标签干扰鼠标事件
      .style("display", layoutOptions.showLabels ? "block" : "none")

    // 创建节点组
    const node = g
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(filteredGraph.nodes)
      .enter()
      .append("g")
      .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended) as any)
      .on("click", (event, d) => {
        event.stopPropagation()
        setSelectedNode(d)
        setSelectedRelation(null)
        if (onNodeClick) onNodeClick(d)
      })

    // 添加节点圆圈
    node
      .append("circle")
      .attr("r", (d) => {
        if (layoutOptions.nodeSize === "importance") {
          const [min, max] = layoutOptions.nodeSizeRange
          return min + ((d.importance - 1) / 9) * (max - min)
        }
        return layoutOptions.nodeSizeRange[0]
      })
      .attr("fill", (d) => colorScale(d.type))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .on("mouseover", function () {
        d3.select(this).attr("stroke", "#0066cc").attr("stroke-width", 2)
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", "#fff").attr("stroke-width", 1.5)
      })

    // 添加节点标签
    node
      .append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .attr("font-size", 12)
      .text((d) => d.name)
      .style("display", layoutOptions.showLabels ? "block" : "none")

    // 添加节点类型标签
    node
      .append("text")
      .attr("dx", 12)
      .attr("dy", "1.2em")
      .attr("font-size", 10)
      .attr("fill", "#666")
      .text((d) => d.type)
      .style("display", layoutOptions.showLabels ? "block" : "none")

    // 更新模拟
    simulation.on("tick", () => {
      // 更新连接线路径
      link.attr("d", (d: any) => {
        const dx = d.target.x - d.source.x
        const dy = d.target.y - d.source.y
        const dr = Math.sqrt(dx * dx + dy * dy)
        // 使用曲线路径以便更好地显示方向和避免重叠
        return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`
      })

      // 更新关系标签位置
      linkLabel.attr("transform", (d: any) => {
        const dx = d.target.x - d.source.x
        const dy = d.target.y - d.source.y
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)
        const midX = (d.source.x + d.target.x) / 2
        const midY = (d.source.y + d.target.y) / 2
        return `translate(${midX},${midY}) rotate(${angle})`
      })

      // 更新节点位置
      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`)
    })

    // 拖拽函数
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: any) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    // 自定义力函数，用于按类型聚类
    function forceCluster() {
      let nodes: any[] = []
      let strength = 0.1
      let centers: ((d: any) => { x: number; y: number }) | null = null

      function force(alpha: number) {
        // 对每个节点应用力
        nodes.forEach((d) => {
          if (centers) {
            const center = centers(d)
            d.vx += (center.x - d.x) * strength * alpha
            d.vy += (center.y - d.y) * strength * alpha
          }
        })
      }

      force.initialize = (_nodes: any[]) => {
        nodes = _nodes
      }

      force.strength = (_strength: number) => {
        strength = _strength
        return force
      }

      force.centers = (_centers: ((d: any) => { x: number; y: number }) | null) => {
        centers = _centers
        return force
      }

      return force
    }

    // 清理函数
    return () => {
      simulation.stop()
    }
  }, [filteredGraph, height, layoutOptions, onNodeClick, onRelationClick])

  // 重置缩放
  const resetZoom = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current)
      svg
        .transition()
        .duration(750)
        .call(
          (d3.zoom() as any).transform,
          d3.zoomIdentity.translate((containerRef.current?.clientWidth || 800) / 2, height / 2).scale(1),
        )
    }
  }

  // 放大
  const zoomIn = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current)
      svg
        .transition()
        .duration(300)
        .call((d3.zoom() as any).scaleBy, 1.2)
    }
  }

  // 缩小
  const zoomOut = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current)
      svg
        .transition()
        .duration(300)
        .call((d3.zoom() as any).scaleBy, 0.8)
    }
  }

  // 处理搜索
  const handleSearch = () => {
    // 搜索逻辑已经在过滤器中实现
  }

  // 重置过滤器
  const resetFilters = () => {
    setSelectedNodeTypes([])
    setSelectedRelationTypes([])
    setMinImportance(0)
    setMinStrength(0)
    setSearchQuery("")
    setFocusNodeId(undefined)
    setMaxDistance(2)
  }

  // 导出图谱为PNG
  const exportAsPNG = () => {
    if (!svgRef.current) return

    const svgElement = svgRef.current
    const svgData = new XMLSerializer().serializeToString(svgElement)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    canvas.width = svgElement.clientWidth
    canvas.height = svgElement.clientHeight

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        const pngData = canvas.toDataURL("image/png")
        const downloadLink = document.createElement("a")
        downloadLink.href = pngData
        downloadLink.download = `${graph?.name || "knowledge-graph"}.png`
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
      }
    }

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
  }

  // 切换全屏模式
  const toggleFullscreen = () => {
    setFullscreen(!fullscreen)
  }

  // 获取所有可用的节点类型
  const availableNodeTypes = graph ? Array.from(new Set(graph.nodes.map((node) => node.type))) : []

  // 获取所有可用的关系类型
  const availableRelationTypes = graph ? Array.from(new Set(graph.relations.map((relation) => relation.type))) : []

  // 处理节点类型选择变化
  const handleNodeTypeChange = (type: NodeType, checked: boolean) => {
    if (checked) {
      setSelectedNodeTypes([...selectedNodeTypes, type])
    } else {
      setSelectedNodeTypes(selectedNodeTypes.filter((t) => t !== type))
    }
  }

  // 处理关系类型选择变化
  const handleRelationTypeChange = (type: RelationType, checked: boolean) => {
    if (checked) {
      setSelectedRelationTypes([...selectedRelationTypes, type])
    } else {
      setSelectedRelationTypes(selectedRelationTypes.filter((t) => t !== type))
    }
  }

  // 渲染加载状态
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">正在加载知识图谱...</p>
        </div>
      </div>
    )
  }

  // 渲染错误状态
  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-center text-red-500">
          <p className="text-xl mb-2">加载失败</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${fullscreen ? "fixed inset-0 z-50 bg-white p-4 overflow-auto" : "w-full"}`}>
      <Card className="w-full shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
                <Network className="h-6 w-6 text-blue-600" />
                {graph?.name || "医学知识图谱"}
              </CardTitle>
              <CardDescription>{graph?.description}</CardDescription>
            </div>
            {showControls && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowFilterPanel(!showFilterPanel)}>
                  <Filter className="h-4 w-4 mr-1" />
                  {showFilterPanel ? "隐藏过滤器" : "显示过滤器"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowInfoPanel(!showInfoPanel)}>
                  <Info className="h-4 w-4 mr-1" />
                  {showInfoPanel ? "隐藏信息" : "显示信息"}
                </Button>
                <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                  {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* 过滤器面板 */}
            {showFilterPanel && (
              <div className="w-full md:w-64 border-r border-gray-200 p-4">
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">过滤选项</h3>
                  <div className="flex items-center mb-4">
                    <Input
                      placeholder="搜索节点..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="mr-2"
                    />
                    <Button variant="outline" size="icon" onClick={handleSearch} className="shrink-0">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {/* 节点类型过滤 */}
                    <div>
                      <h4 className="font-medium mb-2">节点类型</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {availableNodeTypes.map((type) => (
                          <div key={type} className="flex items-center">
                            <Checkbox
                              id={`node-type-${type}`}
                              checked={selectedNodeTypes.includes(type as NodeType)}
                              onCheckedChange={(checked) => handleNodeTypeChange(type as NodeType, checked as boolean)}
                            />
                            <Label htmlFor={`node-type-${type}`} className="ml-2">
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 关系类型过滤 */}
                    <div>
                      <h4 className="font-medium mb-2">关系类型</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {availableRelationTypes.map((type) => (
                          <div key={type} className="flex items-center">
                            <Checkbox
                              id={`relation-type-${type}`}
                              checked={selectedRelationTypes.includes(type as RelationType)}
                              onCheckedChange={(checked) =>
                                handleRelationTypeChange(type as RelationType, checked as boolean)
                              }
                            />
                            <Label htmlFor={`relation-type-${type}`} className="ml-2">
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 重要性过滤 */}
                    <div>
                      <h4 className="font-medium mb-2">最小节点重要性: {minImportance}</h4>
                      <Slider
                        value={[minImportance]}
                        min={0}
                        max={10}
                        step={1}
                        onValueChange={(value) => setMinImportance(value[0])}
                      />
                    </div>

                    {/* 关系强度过滤 */}
                    <div>
                      <h4 className="font-medium mb-2">最小关系强度: {minStrength}</h4>
                      <Slider
                        value={[minStrength]}
                        min={0}
                        max={10}
                        step={1}
                        onValueChange={(value) => setMinStrength(value[0])}
                      />
                    </div>

                    {/* 焦点节点设置 */}
                    <div>
                      <h4 className="font-medium mb-2">焦点节点</h4>
                      <Select value={focusNodeId} onValueChange={setFocusNodeId}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择焦点节点" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={undefined as any}>无焦点</SelectItem>
                          {graph?.nodes.map((node) => (
                            <SelectItem key={node.id} value={node.id}>
                              {node.name} ({node.type})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 最大距离设置 */}
                    {focusNodeId && (
                      <div>
                        <h4 className="font-medium mb-2">最大距离: {maxDistance}</h4>
                        <Slider
                          value={[maxDistance]}
                          min={1}
                          max={5}
                          step={1}
                          onValueChange={(value) => setMaxDistance(value[0])}
                        />
                      </div>
                    )}

                    {/* 布局设置 */}
                    <div>
                      <h4 className="font-medium mb-2">布局设置</h4>
                      <div className="space-y-2">
                        <div>
                          <Label htmlFor="layout-type" className="text-sm">
                            布局类型
                          </Label>
                          <Select
                            value={layoutOptions.layout}
                            onValueChange={(value) => setLayoutOptions({ ...layoutOptions, layout: value as any })}
                          >
                            <SelectTrigger id="layout-type">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="force">力导向布局</SelectItem>
                              <SelectItem value="radial">放射状布局</SelectItem>
                              <SelectItem value="hierarchical">层次布局</SelectItem>
                              <SelectItem value="circular">环形布局</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center">
                          <Checkbox
                            id="show-labels"
                            checked={layoutOptions.showLabels}
                            onCheckedChange={(checked) =>
                              setLayoutOptions({ ...layoutOptions, showLabels: checked as boolean })
                            }
                          />
                          <Label htmlFor="show-labels" className="ml-2">
                            显示标签
                          </Label>
                        </div>

                        <div className="flex items-center">
                          <Checkbox
                            id="group-clusters"
                            checked={layoutOptions.groupClusters}
                            onCheckedChange={(checked) =>
                              setLayoutOptions({ ...layoutOptions, groupClusters: checked as boolean })
                            }
                          />
                          <Label htmlFor="group-clusters" className="ml-2">
                            按类型分组
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button variant="outline" size="sm" onClick={resetFilters} className="w-full">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        重置过滤器
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 主图谱区域 */}
            <div className="flex-1 flex flex-col">
              {/* 工具栏 */}
              {showControls && (
                <div className="flex justify-between items-center p-2 border-b">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={zoomIn} title="放大">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={zoomOut} title="缩小">
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={resetZoom} title="重置视图">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-gray-500 ml-2">缩放: {Math.round(zoomLevel * 100)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={exportAsPNG}>
                      <Download className="h-4 w-4 mr-2" />
                      导出为PNG
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      分享
                    </Button>
                  </div>
                </div>
              )}

              {/* 图谱容器 */}
              <div className="relative flex-1" ref={containerRef}>
                <svg
                  ref={svgRef}
                  width="100%"
                  height={height}
                  className="bg-white"
                  onClick={() => {
                    setSelectedNode(null)
                    setSelectedRelation(null)
                  }}
                ></svg>

                {/* 图例 */}
                <div className="absolute top-4 right-4 bg-white p-2 rounded-md shadow-md text-sm">
                  <h4 className="font-medium mb-1">图例</h4>
                  <div className="space-y-1">
                    {availableNodeTypes.slice(0, 6).map((type) => (
                      <div key={type} className="flex items-center">
                        <span
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: d3.schemeCategory10[availableNodeTypes.indexOf(type) % 10] }}
                        ></span>
                        <span>{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 统计信息 */}
                <div className="absolute bottom-4 left-4 bg-white p-2 rounded-md shadow-md text-xs">
                  <p>节点: {filteredGraph?.nodes.length || 0}</p>
                  <p>关系: {filteredGraph?.relations.length || 0}</p>
                </div>
              </div>
            </div>

            {/* 信息面板 */}
            {showInfoPanel && (selectedNode || selectedRelation) && (
              <div className="w-full md:w-72 border-l border-gray-200 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">详细信息</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedNode(null)
                      setSelectedRelation(null)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {selectedNode && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-bold">{selectedNode.name}</h4>
                      <Badge className="mt-1">{selectedNode.type}</Badge>
                    </div>

                    {selectedNode.description && (
                      <div>
                        <h5 className="font-medium text-gray-700">描述</h5>
                        <p className="text-sm text-gray-600">{selectedNode.description}</p>
                      </div>
                    )}

                    <div>
                      <h5 className="font-medium text-gray-700">重要性</h5>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${(selectedNode.importance / 10) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-right mt-1">{selectedNode.importance}/10</p>
                    </div>

                    {/* 相关节点 */}
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">相关节点</h5>
                      <ScrollArea className="h-40">
                        {graph &&
                          knowledgeGraphService.getRelatedNodes(graph.id, selectedNode.id).map((relatedNode) => (
                            <div
                              key={relatedNode.id}
                              className="p-2 hover:bg-gray-100 rounded cursor-pointer mb-1"
                              onClick={() => {
                                setSelectedNode(relatedNode)
                                setFocusNodeId(relatedNode.id)
                              }}
                            >
                              <div className="flex items-center">
                                <span
                                  className="w-3 h-3 rounded-full mr-2"
                                  style={{
                                    backgroundColor:
                                      d3.schemeCategory10[availableNodeTypes.indexOf(relatedNode.type) % 10],
                                  }}
                                ></span>
                                <span className="font-medium">{relatedNode.name}</span>
                              </div>
                              <p className="text-xs text-gray-500 ml-5">{relatedNode.type}</p>
                            </div>
                          ))}
                      </ScrollArea>
                    </div>

                    {/* 设为焦点按钮 */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setFocusNodeId(selectedNode.id)}
                    >
                      <Maximize className="h-4 w-4 mr-2" />
                      设为焦点节点
                    </Button>

                    {/* 相关病例 */}
                    {selectedNode && (
                      <div className="mt-6">
                        <RelatedCasesPanel
                          node={selectedNode}
                          onCaseSelect={(caseId) => router.push(`/case-library/${caseId}`)}
                        />
                      </div>
                    )}
                  </div>
                )}

                {selectedRelation && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-bold">{selectedRelation.type}</h4>
                      <div className="flex items-center text-sm mt-1">
                        <span className="font-medium">
                          {graph?.nodes.find((n) => n.id === selectedRelation.source)?.name}
                        </span>
                        <ChevronRight className="h-4 w-4 mx-1" />
                        <span className="font-medium">
                          {graph?.nodes.find((n) => n.id === selectedRelation.target)?.name}
                        </span>
                      </div>
                    </div>

                    {selectedRelation.description && (
                      <div>
                        <h5 className="font-medium text-gray-700">描述</h5>
                        <p className="text-sm text-gray-600">{selectedRelation.description}</p>
                      </div>
                    )}

                    <div>
                      <h5 className="font-medium text-gray-700">关系强度</h5>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${(selectedRelation.strength / 10) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-right mt-1">{selectedRelation.strength}/10</p>
                    </div>

                    {/* 查看源节点和目标节点的按钮 */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          const sourceNode = graph?.nodes.find((n) => n.id === selectedRelation.source)
                          if (sourceNode) {
                            setSelectedNode(sourceNode)
                            setSelectedRelation(null)
                          }
                        }}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        查看源节点
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          const targetNode = graph?.nodes.find((n) => n.id === selectedRelation.target)
                          if (targetNode) {
                            setSelectedNode(targetNode)
                            setSelectedRelation(null)
                          }
                        }}
                      >
                        查看目标节点
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
