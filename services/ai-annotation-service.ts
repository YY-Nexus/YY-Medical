import type { AIAnnotationSuggestion } from "../types/knowledge-graph"
import type { ImageMarker } from "../types/imaging-features"

// 模拟AI标注建议数据
const mockAnnotationSuggestions: Record<string, AIAnnotationSuggestion[]> = {
  "image-001": [
    {
      id: "suggestion-001",
      imageId: "image-001",
      featureType: "磨玻璃影",
      confidence: 0.92,
      boundingBox: {
        x: 120,
        y: 80,
        width: 60,
        height: 40,
      },
      description: "右上肺磨玻璃结节，边界清晰",
      relatedNodeIds: ["imaging-ground-glass", "disease-lung-nodule"],
      createdAt: new Date().toISOString(),
    },
    {
      id: "suggestion-002",
      imageId: "image-001",
      featureType: "钙化",
      confidence: 0.85,
      boundingBox: {
        x: 200,
        y: 150,
        width: 30,
        height: 30,
      },
      description: "左下肺小钙化灶",
      relatedNodeIds: ["imaging-calcification"],
      createdAt: new Date().toISOString(),
    },
  ],
  "image-002": [
    {
      id: "suggestion-003",
      imageId: "image-002",
      featureType: "实性结节",
      confidence: 0.88,
      boundingBox: {
        x: 150,
        y: 120,
        width: 45,
        height: 45,
      },
      description: "右中肺实性结节，边缘毛刺",
      relatedNodeIds: ["imaging-solid-nodule", "imaging-spiculation"],
      createdAt: new Date().toISOString(),
    },
  ],
}

// AI标注服务
export const aiAnnotationService = {
  // 获取AI标注建议
  getAnnotationSuggestions: (imageId: string): Promise<AIAnnotationSuggestion[]> => {
    return new Promise((resolve) => {
      // 模拟网络延迟
      setTimeout(() => {
        resolve(mockAnnotationSuggestions[imageId] || [])
      }, 1000)
    })
  },

  // 生成AI标注建议
  generateAnnotations: (imageUrl: string, modality: string, region: string): Promise<AIAnnotationSuggestion[]> => {
    return new Promise((resolve) => {
      // 模拟AI处理延迟
      setTimeout(() => {
        // 生成随机标注建议
        const suggestions: AIAnnotationSuggestion[] = []
        const imageId = imageUrl.split("/").pop()?.split(".")[0] || "unknown"

        // 根据模态和区域生成不同的标注建议
        if (modality === "CT" && region === "肺部") {
          suggestions.push({
            id: `suggestion-${Date.now()}-1`,
            imageId,
            featureType: "磨玻璃影",
            confidence: 0.85 + Math.random() * 0.1,
            boundingBox: {
              x: 100 + Math.random() * 100,
              y: 100 + Math.random() * 100,
              width: 40 + Math.random() * 20,
              height: 40 + Math.random() * 20,
            },
            description: "疑似早期肺腺癌的磨玻璃结节",
            relatedNodeIds: ["imaging-ground-glass", "disease-lung-cancer"],
            createdAt: new Date().toISOString(),
          })

          if (Math.random() > 0.5) {
            suggestions.push({
              id: `suggestion-${Date.now()}-2`,
              imageId,
              featureType: Math.random() > 0.5 ? "钙化" : "实性结节",
              confidence: 0.75 + Math.random() * 0.15,
              boundingBox: {
                x: 200 + Math.random() * 100,
                y: 150 + Math.random() * 100,
                width: 30 + Math.random() * 15,
                height: 30 + Math.random() * 15,
              },
              description: Math.random() > 0.5 ? "钙化灶，可能为良性" : "实性结节，边缘不规则",
              relatedNodeIds: Math.random() > 0.5 ? ["imaging-calcification"] : ["imaging-solid-nodule"],
              createdAt: new Date().toISOString(),
            })
          }
        } else if (modality === "MRI" && region === "脑部") {
          suggestions.push({
            id: `suggestion-${Date.now()}-1`,
            imageId,
            featureType: "缺血灶",
            confidence: 0.8 + Math.random() * 0.15,
            boundingBox: {
              x: 150 + Math.random() * 80,
              y: 120 + Math.random() * 80,
              width: 35 + Math.random() * 15,
              height: 35 + Math.random() * 15,
            },
            description: "脑缺血灶，可能为缺血性脑卒中",
            relatedNodeIds: ["disease-ischemic-stroke"],
            createdAt: new Date().toISOString(),
          })
        }

        resolve(suggestions)
      }, 2000)
    })
  },

  // 将AI标注建议转换为图像标记
  convertToImageMarkers: (suggestions: AIAnnotationSuggestion[]): ImageMarker[] => {
    return suggestions.map((suggestion) => ({
      id: `marker-${suggestion.id}`,
      imageId: suggestion.imageId,
      featureId: suggestion.featureType,
      coordinates: suggestion.boundingBox,
      description: `${suggestion.featureType} (AI置信度: ${(suggestion.confidence * 100).toFixed(0)}%)`,
      createdBy: "ai",
      createdAt: suggestion.createdAt,
    }))
  },

  // 评估用户标注与AI标注的一致性
  evaluateAnnotationConsistency: (
    userMarkers: ImageMarker[],
    aiSuggestions: AIAnnotationSuggestion[],
  ): { score: number; feedback: string[] } => {
    const feedback: string[] = []
    let matchCount = 0

    // 简单的IoU计算函数
    const calculateIoU = (box1: any, box2: any) => {
      const x1 = Math.max(box1.x, box2.x)
      const y1 = Math.max(box1.y, box2.y)
      const x2 = Math.min(box1.x + box1.width, box2.x + box2.width)
      const y2 = Math.min(box1.y + box1.height, box2.y + box2.height)

      if (x2 < x1 || y2 < y1) return 0

      const intersection = (x2 - x1) * (y2 - y1)
      const box1Area = box1.width * box1.height
      const box2Area = box2.width * box2.height
      const union = box1Area + box2Area - intersection

      return intersection / union
    }

    // 检查每个AI建议是否有匹配的用户标注
    aiSuggestions.forEach((suggestion) => {
      const matchingMarkers = userMarkers.filter(
        (marker) => calculateIoU(marker.coordinates, suggestion.boundingBox) > 0.5,
      )

      if (matchingMarkers.length > 0) {
        matchCount++
        feedback.push(`✓ 成功标注了${suggestion.featureType}`)
      } else {
        feedback.push(
          `✗ 未标注${suggestion.featureType}，位于(${suggestion.boundingBox.x}, ${suggestion.boundingBox.y})`,
        )
      }
    })

    // 检查用户是否标注了AI未建议的区域
    userMarkers.forEach((marker) => {
      const matchingAI = aiSuggestions.some(
        (suggestion) => calculateIoU(marker.coordinates, suggestion.boundingBox) > 0.5,
      )

      if (!matchingAI) {
        feedback.push(`? 额外标注了(${marker.coordinates.x}, ${marker.coordinates.y})处的区域`)
      }
    })

    // 计算一致性得分
    const score = aiSuggestions.length > 0 ? matchCount / aiSuggestions.length : 1

    return {
      score,
      feedback,
    }
  },
}
