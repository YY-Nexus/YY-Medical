import type { KnowledgeGraph, NodeType, RelationType, GraphFilterOptions } from "../types/knowledge-graph"

// 模拟肺结节相关知识图谱数据
const lungNoduleGraph: KnowledgeGraph = {
  id: "lung-nodule-graph",
  name: "肺结节知识图谱",
  description: "肺结节相关的疾病、症状、诊断和治疗知识图谱",
  nodes: [
    {
      id: "disease-lung-nodule",
      name: "肺结节",
      type: "疾病",
      description: "肺部的小型圆形病变，直径通常小于3厘米",
      importance: 10,
    },
    {
      id: "disease-lung-cancer",
      name: "肺癌",
      type: "疾病",
      description: "起源于肺部的恶性肿瘤",
      importance: 9,
    },
    {
      id: "disease-tuberculosis",
      name: "肺结核",
      type: "疾病",
      description: "由结核杆菌引起的慢性传染病",
      importance: 8,
    },
    {
      id: "disease-hamartoma",
      name: "肺错构瘤",
      type: "疾病",
      description: "肺部最常见的良性肿瘤",
      importance: 7,
    },
    {
      id: "symptom-cough",
      name: "咳嗽",
      type: "症状",
      description: "肺部疾病常见症状",
      importance: 6,
    },
    {
      id: "symptom-hemoptysis",
      name: "咯血",
      type: "症状",
      description: "咳出含有血液的痰液",
      importance: 7,
    },
    {
      id: "symptom-chest-pain",
      name: "胸痛",
      type: "症状",
      description: "胸部疼痛感",
      importance: 6,
    },
    {
      id: "symptom-dyspnea",
      name: "呼吸困难",
      type: "症状",
      description: "感觉呼吸费力或不适",
      importance: 7,
    },
    {
      id: "exam-ct",
      name: "CT检查",
      type: "检查",
      description: "计算机断层扫描，用于肺结节的发现和评估",
      importance: 9,
    },
    {
      id: "exam-pet-ct",
      name: "PET-CT",
      type: "检查",
      description: "结合功能和解剖成像的检查方法",
      importance: 8,
    },
    {
      id: "exam-biopsy",
      name: "活检",
      type: "检查",
      description: "获取组织样本进行病理学检查",
      importance: 8,
    },
    {
      id: "treatment-surgery",
      name: "手术切除",
      type: "治疗",
      description: "通过手术切除肺结节",
      importance: 8,
    },
    {
      id: "treatment-follow-up",
      name: "定期随访",
      type: "治疗",
      description: "对低风险肺结节进行定期影像学随访",
      importance: 7,
    },
    {
      id: "treatment-radiation",
      name: "放射治疗",
      type: "治疗",
      description: "使用高能射线杀死癌细胞",
      importance: 7,
    },
    {
      id: "treatment-chemotherapy",
      name: "化学治疗",
      type: "治疗",
      description: "使用药物杀死癌细胞",
      importance: 7,
    },
    {
      id: "risk-smoking",
      name: "吸烟",
      type: "风险因素",
      description: "肺癌的主要风险因素",
      importance: 8,
    },
    {
      id: "risk-radon",
      name: "氡暴露",
      type: "风险因素",
      description: "第二大肺癌风险因素",
      importance: 6,
    },
    {
      id: "risk-asbestos",
      name: "石棉暴露",
      type: "风险因素",
      description: "增加肺癌风险的职业暴露",
      importance: 6,
    },
    {
      id: "risk-family-history",
      name: "家族史",
      type: "风险因素",
      description: "肺癌家族史增加患病风险",
      importance: 5,
    },
    {
      id: "anatomy-lung",
      name: "肺",
      type: "解剖结构",
      description: "人体主要呼吸器官",
      importance: 8,
    },
    {
      id: "anatomy-bronchus",
      name: "支气管",
      type: "解剖结构",
      description: "连接气管和肺泡的管道",
      importance: 7,
    },
    {
      id: "anatomy-pleura",
      name: "胸膜",
      type: "解剖结构",
      description: "包裹肺部的膜",
      importance: 6,
    },
    {
      id: "pathophysiology-inflammation",
      name: "炎症",
      type: "病理生理",
      description: "组织对有害刺激的保护性反应",
      importance: 6,
    },
    {
      id: "pathophysiology-fibrosis",
      name: "纤维化",
      type: "病理生理",
      description: "组织修复过程中纤维组织的形成",
      importance: 5,
    },
    {
      id: "pathophysiology-metastasis",
      name: "转移",
      type: "病理生理",
      description: "癌细胞从原发部位扩散到身体其他部位",
      importance: 7,
    },
    {
      id: "imaging-ground-glass",
      name: "磨玻璃影",
      type: "影像特征",
      description: "CT上表现为密度增高但不掩盖血管和支气管轮廓的病变",
      importance: 8,
    },
    {
      id: "imaging-solid-nodule",
      name: "实性结节",
      type: "影像特征",
      description: "CT上表现为完全实性的结节",
      importance: 8,
    },
    {
      id: "imaging-part-solid",
      name: "部分实性结节",
      type: "影像特征",
      description: "CT上表现为部分实性部分磨玻璃样的结节",
      importance: 8,
    },
    {
      id: "imaging-calcification",
      name: "钙化",
      type: "影像特征",
      description: "结节内的钙化沉积",
      importance: 7,
    },
    {
      id: "imaging-spiculation",
      name: "毛刺征",
      type: "影像特征",
      description: "结节边缘呈放射状毛刺",
      importance: 7,
    },
  ],
  relations: [
    {
      id: "rel-1",
      source: "disease-lung-nodule",
      target: "disease-lung-cancer",
      type: "相关性",
      description: "肺结节可能是肺癌的早期表现",
      strength: 8,
    },
    {
      id: "rel-2",
      source: "disease-lung-nodule",
      target: "disease-tuberculosis",
      type: "鉴别诊断",
      description: "肺结核可表现为肺结节",
      strength: 7,
    },
    {
      id: "rel-3",
      source: "disease-lung-nodule",
      target: "disease-hamartoma",
      type: "鉴别诊断",
      description: "肺错构瘤是常见的良性肺结节",
      strength: 7,
    },
    {
      id: "rel-4",
      source: "disease-lung-nodule",
      target: "symptom-cough",
      type: "表现为",
      description: "肺结节可能导致咳嗽",
      strength: 5,
    },
    {
      id: "rel-5",
      source: "disease-lung-cancer",
      target: "symptom-hemoptysis",
      type: "表现为",
      description: "肺癌可能导致咯血",
      strength: 7,
    },
    {
      id: "rel-6",
      source: "disease-lung-cancer",
      target: "symptom-chest-pain",
      type: "表现为",
      description: "肺癌可能导致胸痛",
      strength: 6,
    },
    {
      id: "rel-7",
      source: "disease-lung-cancer",
      target: "symptom-dyspnea",
      type: "表现为",
      description: "肺癌可能导致呼吸困难",
      strength: 6,
    },
    {
      id: "rel-8",
      source: "disease-lung-nodule",
      target: "exam-ct",
      type: "诊断依据",
      description: "CT是发现和评估肺结节的主要方法",
      strength: 9,
    },
    {
      id: "rel-9",
      source: "disease-lung-nodule",
      target: "exam-pet-ct",
      type: "诊断依据",
      description: "PET-CT可评估肺结节的代谢活性",
      strength: 8,
    },
    {
      id: "rel-10",
      source: "disease-lung-nodule",
      target: "exam-biopsy",
      type: "诊断依据",
      description: "活检可确定肺结节的性质",
      strength: 9,
    },
    {
      id: "rel-11",
      source: "disease-lung-nodule",
      target: "treatment-surgery",
      type: "治疗方法",
      description: "对可疑恶性的肺结节进行手术切除",
      strength: 8,
    },
    {
      id: "rel-12",
      source: "disease-lung-nodule",
      target: "treatment-follow-up",
      type: "治疗方法",
      description: "对低风险肺结节进行定期随访",
      strength: 7,
    },
    {
      id: "rel-13",
      source: "disease-lung-cancer",
      target: "treatment-radiation",
      type: "治疗方法",
      description: "放射治疗是肺癌的治疗选择之一",
      strength: 7,
    },
    {
      id: "rel-14",
      source: "disease-lung-cancer",
      target: "treatment-chemotherapy",
      type: "治疗方法",
      description: "化疗是肺癌的治疗选择之一",
      strength: 7,
    },
    {
      id: "rel-15",
      source: "risk-smoking",
      target: "disease-lung-cancer",
      type: "风险增加",
      description: "吸烟显著增加肺癌风险",
      strength: 9,
    },
    {
      id: "rel-16",
      source: "risk-radon",
      target: "disease-lung-cancer",
      type: "风险增加",
      description: "氡暴露增加肺癌风险",
      strength: 7,
    },
    {
      id: "rel-17",
      source: "risk-asbestos",
      target: "disease-lung-cancer",
      type: "风险增加",
      description: "石棉暴露增加肺癌风险",
      strength: 7,
    },
    {
      id: "rel-18",
      source: "risk-family-history",
      target: "disease-lung-cancer",
      type: "风险增加",
      description: "肺癌家族史增加患病风险",
      strength: 6,
    },
    {
      id: "rel-19",
      source: "disease-lung-nodule",
      target: "anatomy-lung",
      type: "位于",
      description: "肺结节位于肺组织内",
      strength: 8,
    },
    {
      id: "rel-20",
      source: "disease-lung-cancer",
      target: "pathophysiology-metastasis",
      type: "导致",
      description: "肺癌可发生转移",
      strength: 8,
    },
    {
      id: "rel-21",
      source: "disease-tuberculosis",
      target: "pathophysiology-inflammation",
      type: "导致",
      description: "结核病引起炎症反应",
      strength: 7,
    },
    {
      id: "rel-22",
      source: "disease-tuberculosis",
      target: "pathophysiology-fibrosis",
      type: "导致",
      description: "结核病可导致肺纤维化",
      strength: 6,
    },
    {
      id: "rel-23",
      source: "imaging-ground-glass",
      target: "disease-lung-cancer",
      type: "诊断依据",
      description: "磨玻璃影可能提示早期肺腺癌",
      strength: 7,
    },
    {
      id: "rel-24",
      source: "imaging-solid-nodule",
      target: "disease-lung-nodule",
      type: "诊断依据",
      description: "实性结节是肺结节的常见表现",
      strength: 8,
    },
    {
      id: "rel-25",
      source: "imaging-part-solid",
      target: "disease-lung-cancer",
      type: "诊断依据",
      description: "部分实性结节恶性风险较高",
      strength: 8,
    },
    {
      id: "rel-26",
      source: "imaging-calcification",
      target: "disease-tuberculosis",
      type: "诊断依据",
      description: "钙化常见于结核结节",
      strength: 7,
    },
    {
      id: "rel-27",
      source: "imaging-spiculation",
      target: "disease-lung-cancer",
      type: "诊断依据",
      description: "毛刺征提示恶性可能",
      strength: 8,
    },
  ],
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-05-20T10:30:00Z",
  version: "1.2.0",
  category: "呼吸系统疾病",
  tags: ["肺结节", "肺癌", "影像学", "诊断", "治疗"],
}

// 模拟脑卒中相关知识图谱数据
const strokeGraph: KnowledgeGraph = {
  id: "stroke-graph",
  name: "脑卒中知识图谱",
  description: "脑卒中相关的疾病、症状、诊断和治疗知识图谱",
  nodes: [
    {
      id: "disease-stroke",
      name: "脑卒中",
      type: "疾病",
      description: "由于脑部血管阻塞或破裂导致的急性神经功能障碍",
      importance: 10,
    },
    {
      id: "disease-ischemic-stroke",
      name: "缺血性脑卒中",
      type: "疾病",
      description: "由于脑动脉阻塞导致的脑组织缺血坏死",
      importance: 9,
    },
    {
      id: "disease-hemorrhagic-stroke",
      name: "出血性脑卒中",
      type: "疾病",
      description: "由于脑血管破裂导致的脑出血",
      importance: 9,
    },
    {
      id: "disease-tia",
      name: "短暂性脑缺血发作",
      type: "疾病",
      description: "短暂的神经功能障碍，通常持续不超过24小时",
      importance: 8,
    },
    // 更多节点...
  ],
  relations: [
    {
      id: "rel-s1",
      source: "disease-stroke",
      target: "disease-ischemic-stroke",
      type: "相关性",
      description: "缺血性脑卒中是脑卒中的主要类型",
      strength: 9,
    },
    {
      id: "rel-s2",
      source: "disease-stroke",
      target: "disease-hemorrhagic-stroke",
      type: "相关性",
      description: "出血性脑卒中是脑卒中的一种类型",
      strength: 9,
    },
    {
      id: "rel-s3",
      source: "disease-tia",
      target: "disease-ischemic-stroke",
      type: "风险增加",
      description: "TIA增加缺血性脑卒中的风险",
      strength: 8,
    },
    // 更多关系...
  ],
  createdAt: "2023-02-10T09:15:00Z",
  updatedAt: "2023-06-05T14:20:00Z",
  version: "1.1.0",
  category: "神经系统疾病",
  tags: ["脑卒中", "缺血", "出血", "神经", "血管"],
}

// 模拟冠心病相关知识图谱数据
const coronaryHeartDiseaseGraph: KnowledgeGraph = {
  id: "chd-graph",
  name: "冠心病知识图谱",
  description: "冠心病相关的疾病、症状、诊断和治疗知识图谱",
  nodes: [
    {
      id: "disease-chd",
      name: "冠心病",
      type: "疾病",
      description: "冠状动脉粥样硬化导致的心脏疾病",
      importance: 10,
    },
    // 更多节点...
  ],
  relations: [
    // 关系数据...
  ],
  createdAt: "2023-03-05T11:30:00Z",
  updatedAt: "2023-07-12T16:45:00Z",
  version: "1.0.5",
  category: "心血管疾病",
  tags: ["冠心病", "心肌梗死", "心绞痛", "动脉粥样硬化"],
}

// 所有知识图谱集合
const knowledgeGraphs: KnowledgeGraph[] = [lungNoduleGraph, strokeGraph, coronaryHeartDiseaseGraph]

// 知识图谱服务
export const knowledgeGraphService = {
  // 获取所有知识图谱
  getAllGraphs: () => {
    return knowledgeGraphs
  },

  // 根据ID获取特定知识图谱
  getGraphById: (graphId: string) => {
    return knowledgeGraphs.find((graph) => graph.id === graphId)
  },

  // 根据疾病ID获取相关知识图谱
  getGraphByDiseaseId: (diseaseId: string) => {
    return knowledgeGraphs.find((graph) =>
      graph.nodes.some((node) => node.id === diseaseId || node.id.includes(diseaseId.replace("disease-", ""))),
    )
  },

  // 根据过滤条件获取过滤后的知识图谱
  getFilteredGraph: (graphId: string, options: GraphFilterOptions) => {
    const graph = knowledgeGraphs.find((g) => g.id === graphId)
    if (!graph) return null

    let filteredNodes = [...graph.nodes]
    let filteredRelations = [...graph.relations]

    // 按节点类型过滤
    if (options.nodeTypes && options.nodeTypes.length > 0) {
      filteredNodes = filteredNodes.filter((node) => options.nodeTypes?.includes(node.type))
    }

    // 按最小重要性过滤
    if (options.minImportance !== undefined) {
      filteredNodes = filteredNodes.filter((node) => node.importance >= options.minImportance!)
    }

    // 按搜索查询过滤
    if (options.searchQuery) {
      const query = options.searchQuery.toLowerCase()
      filteredNodes = filteredNodes.filter(
        (node) => node.name.toLowerCase().includes(query) || (node.description?.toLowerCase().includes(query) ?? false),
      )
    }

    // 获取过滤后节点的ID集合
    const filteredNodeIds = new Set(filteredNodes.map((node) => node.id))

    // 按关系类型过滤
    if (options.relationTypes && options.relationTypes.length > 0) {
      filteredRelations = filteredRelations.filter((relation) => options.relationTypes?.includes(relation.type))
    }

    // 按最小强度过滤
    if (options.minStrength !== undefined) {
      filteredRelations = filteredRelations.filter((relation) => relation.strength >= options.minStrength!)
    }

    // 只保留连接过滤后节点的关系
    filteredRelations = filteredRelations.filter(
      (relation) => filteredNodeIds.has(relation.source) && filteredNodeIds.has(relation.target),
    )

    // 如果指定了焦点节点，只保留与焦点节点相关的节点和关系
    if (options.focusNodeId) {
      const connectedNodeIds = new Set<string>([options.focusNodeId])
      const maxDistance = options.maxDistance || 2

      // 广度优先搜索找出所有在最大距离内的节点
      const queue: { id: string; distance: number }[] = [{ id: options.focusNodeId, distance: 0 }]
      const visited = new Set<string>([options.focusNodeId])

      while (queue.length > 0) {
        const { id, distance } = queue.shift()!

        if (distance < maxDistance) {
          // 找出所有与当前节点直接相连的节点
          filteredRelations.forEach((relation) => {
            let connectedId: string | null = null

            if (relation.source === id) {
              connectedId = relation.target
            } else if (relation.target === id) {
              connectedId = relation.source
            }

            if (connectedId && !visited.has(connectedId)) {
              connectedNodeIds.add(connectedId)
              visited.add(connectedId)
              queue.push({ id: connectedId, distance: distance + 1 })
            }
          })
        }
      }

      // 过滤节点和关系
      filteredNodes = filteredNodes.filter((node) => connectedNodeIds.has(node.id))
      filteredRelations = filteredRelations.filter(
        (relation) => connectedNodeIds.has(relation.source) && connectedNodeIds.has(relation.target),
      )
    }

    return {
      ...graph,
      nodes: filteredNodes,
      relations: filteredRelations,
    }
  },

  // 根据节点ID获取相关节点
  getRelatedNodes: (graphId: string, nodeId: string, maxDistance = 1) => {
    const graph = knowledgeGraphs.find((g) => g.id === graphId)
    if (!graph) return []

    const relatedNodeIds = new Set<string>()
    const queue: { id: string; distance: number }[] = [{ id: nodeId, distance: 0 }]
    const visited = new Set<string>([nodeId])

    while (queue.length > 0) {
      const { id, distance } = queue.shift()!

      if (distance < maxDistance) {
        // 找出所有与当前节点直接相连的节点
        graph.relations.forEach((relation) => {
          let connectedId: string | null = null

          if (relation.source === id) {
            connectedId = relation.target
          } else if (relation.target === id) {
            connectedId = relation.source
          }

          if (connectedId && !visited.has(connectedId)) {
            relatedNodeIds.add(connectedId)
            visited.add(connectedId)
            queue.push({ id: connectedId, distance: distance + 1 })
          }
        })
      }
    }

    return graph.nodes.filter((node) => relatedNodeIds.has(node.id))
  },

  // 根据节点ID获取相关关系
  getRelationsByNodeId: (graphId: string, nodeId: string) => {
    const graph = knowledgeGraphs.find((g) => g.id === graphId)
    if (!graph) return []

    return graph.relations.filter((relation) => relation.source === nodeId || relation.target === nodeId)
  },

  // 根据节点类型获取节点
  getNodesByType: (graphId: string, nodeType: NodeType) => {
    const graph = knowledgeGraphs.find((g) => g.id === graphId)
    if (!graph) return []

    return graph.nodes.filter((node) => node.type === nodeType)
  },

  // 根据关系类型获取关系
  getRelationsByType: (graphId: string, relationType: RelationType) => {
    const graph = knowledgeGraphs.find((g) => g.id === graphId)
    if (!graph) return []

    return graph.relations.filter((relation) => relation.type === relationType)
  },

  // 搜索知识图谱
  searchGraph: (graphId: string, query: string) => {
    const graph = knowledgeGraphs.find((g) => g.id === graphId)
    if (!graph) return { nodes: [], relations: [] }

    const normalizedQuery = query.toLowerCase()

    // 搜索节点
    const matchedNodes = graph.nodes.filter(
      (node) =>
        node.name.toLowerCase().includes(normalizedQuery) ||
        (node.description?.toLowerCase().includes(normalizedQuery) ?? false),
    )

    const matchedNodeIds = new Set(matchedNodes.map((node) => node.id))

    // 搜索关系
    const matchedRelations = graph.relations.filter(
      (relation) =>
        relation.type.toLowerCase().includes(normalizedQuery) ||
        (relation.description?.toLowerCase().includes(normalizedQuery) ?? false) ||
        matchedNodeIds.has(relation.source) ||
        matchedNodeIds.has(relation.target),
    )

    // 添加与匹配关系相关的节点
    matchedRelations.forEach((relation) => {
      matchedNodeIds.add(relation.source)
      matchedNodeIds.add(relation.target)
    })

    const allMatchedNodes = graph.nodes.filter((node) => matchedNodeIds.has(node.id))

    return {
      nodes: allMatchedNodes,
      relations: matchedRelations,
    }
  },

  // 获取知识图谱统计信息
  getGraphStats: (graphId: string) => {
    const graph = knowledgeGraphs.find((g) => g.id === graphId)
    if (!graph) return null

    // 节点类型统计
    const nodeTypeStats: Record<string, number> = {}
    graph.nodes.forEach((node) => {
      nodeTypeStats[node.type] = (nodeTypeStats[node.type] || 0) + 1
    })

    // 关系类型统计
    const relationTypeStats: Record<string, number> = {}
    graph.relations.forEach((relation) => {
      relationTypeStats[relation.type] = (relationTypeStats[relation.type] || 0) + 1
    })

    // 节点连接度统计
    const nodeDegrees: Record<string, { in: number; out: number; total: number }> = {}
    graph.nodes.forEach((node) => {
      nodeDegrees[node.id] = { in: 0, out: 0, total: 0 }
    })

    graph.relations.forEach((relation) => {
      if (nodeDegrees[relation.source]) {
        nodeDegrees[relation.source].out += 1
        nodeDegrees[relation.source].total += 1
      }
      if (nodeDegrees[relation.target]) {
        nodeDegrees[relation.target].in += 1
        nodeDegrees[relation.target].total += 1
      }
    })

    // 找出连接度最高的节点
    const mostConnectedNodes = Object.entries(nodeDegrees)
      .map(([id, degree]) => ({
        id,
        name: graph.nodes.find((node) => node.id === id)?.name || "",
        degree: degree.total,
      }))
      .sort((a, b) => b.degree - a.degree)
      .slice(0, 5)

    return {
      totalNodes: graph.nodes.length,
      totalRelations: graph.relations.length,
      nodeTypeStats,
      relationTypeStats,
      mostConnectedNodes,
      lastUpdated: graph.updatedAt,
      version: graph.version,
    }
  },
}
