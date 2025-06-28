import type { KnowledgeBaseUpdate } from "../types/knowledge-base"

// 模拟知识库更新记录
const knowledgeBaseUpdatesDatabase: KnowledgeBaseUpdate[] = [
  {
    id: "update-1",
    updateType: "修改",
    contentType: "treatment",
    contentId: "cardiomegaly-treatment-2",
    contentName: "心力衰竭标准药物治疗",
    updateSummary: "更新了心力衰竭治疗指南，加入SGLT2抑制剂作为一线治疗药物",
    updateDetails: "根据2023年欧洲心脏病学会(ESC)心力衰竭指南更新，SGLT2抑制剂（达格列净、恩格列）",
  },
]

// 5. 药物相互作用检查组件

// 创建药物相互作用检查组件：
