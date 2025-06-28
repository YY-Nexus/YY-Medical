// 知识图谱数据类型定义

// 节点类型
export type NodeType =
  | "疾病"
  | "症状"
  | "检查"
  | "治疗"
  | "药物"
  | "风险因素"
  | "并发症"
  | "解剖结构"
  | "病理生理"
  | "影像特征"

// 关系类型
export type RelationType =
  | "表现为"
  | "诊断依据"
  | "治疗方法"
  | "用药"
  | "导致"
  | "风险增加"
  | "并发"
  | "位于"
  | "影响"
  | "相关性"
  | "鉴别诊断"
  | "预防"

// 图谱节点
export interface GraphNode {
  id: string
  name: string
  type: NodeType
  description?: string
  importance: number // 1-10，表示重要性
  confidence?: number // 0-1，表示确信度
  properties?: Record<string, any> // 额外属性
  imageUrl?: string // 相关图像URL
  referenceIds?: string[] // 参考文献ID
}

// 图谱关系
export interface GraphRelation {
  id: string
  source: string // 源节点ID
  target: string // 目标节点ID
  type: RelationType
  description?: string
  strength: number // 1-10，表示关系强度
  evidence?: string // 证据描述
  referenceIds?: string[] // 支持该关系的参考文献ID
}

// 知识图谱
export interface KnowledgeGraph {
  id: string
  name: string
  description: string
  nodes: GraphNode[]
  relations: GraphRelation[]
  createdAt: string
  updatedAt: string
  version: string
  category?: string
  tags?: string[]
}

// 图谱过滤选项
export interface GraphFilterOptions {
  nodeTypes?: NodeType[]
  relationTypes?: RelationType[]
  minImportance?: number
  minStrength?: number
  searchQuery?: string
  focusNodeId?: string
  maxDistance?: number // 与焦点节点的最大距离
}

// 图谱布局选项
export interface GraphLayoutOptions {
  layout: "force" | "radial" | "hierarchical" | "circular"
  nodeSize: "fixed" | "importance" | "connections"
  nodeSizeRange: [number, number]
  linkWidth: "fixed" | "strength"
  linkWidthRange: [number, number]
  nodeSpacing: number
  groupClusters: boolean
  showLabels: boolean
  colorScheme: string
}

// 图谱交互事件
export interface GraphInteractionEvent {
  type: "nodeClick" | "nodeHover" | "relationClick" | "backgroundClick" | "zoom" | "pan"
  nodeId?: string
  relationId?: string
  position?: { x: number; y: number }
  scale?: number
}

// 图谱导出格式
export type GraphExportFormat = "PNG" | "SVG" | "JSON" | "CSV" | "PDF"

// AI辅助标注类型
export interface AIAnnotationSuggestion {
  id: string
  imageId: string
  featureType: string
  confidence: number
  boundingBox: {
    x: number
    y: number
    width: number
    height: number
  }
  description: string
  relatedNodeIds: string[] // 关联的知识图谱节点ID
  createdAt: string
}

// 协作标注类型
export interface CollaborativeAnnotation {
  id: string
  imageId: string
  userId: string
  userName: string
  featureType: string
  boundingBox: {
    x: number
    y: number
    width: number
    height: number
  }
  description: string
  createdAt: string
  updatedAt: string
  status: "pending" | "approved" | "rejected" | "discussed"
  comments: {
    userId: string
    userName: string
    content: string
    timestamp: string
  }[]
}

// 3D影像标注类型
export interface Annotation3D {
  id: string
  volumeId: string
  annotationType: "point" | "bbox" | "segmentation"
  coordinates: number[][] // 3D坐标点集合
  sliceIndices?: number[] // 相关切片索引
  description: string
  featureType: string
  confidence?: number
  createdBy: string
  createdAt: string
}
