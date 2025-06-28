import type { GuideStep, ChatMessage, KnowledgeItem, QuickQuestion } from "@/types/admin-guide"

export class AdminGuideService {
  private guideSteps: GuideStep[] = [
    {
      id: "system-overview",
      title: "系统概览",
      description: "了解言语云³医疗AI系统的整体架构和核心功能",
      duration: "5分钟",
      difficulty: "beginner",
      category: "初始设置",
      completed: false,
      actions: [
        {
          type: "navigate",
          label: "查看系统仪表板",
          url: "/admin",
          description: "访问管理后台主页，了解系统状态",
        },
        {
          type: "navigate",
          label: "浏览功能模块",
          url: "/admin/modules",
          description: "查看所有可用的功能模块",
        },
      ],
    },
    {
      id: "environment-check",
      title: "环境检查",
      description: "验证系统运行环境和依赖服务状态",
      duration: "5分钟",
      difficulty: "beginner",
      category: "初始设置",
      completed: false,
      actions: [
        {
          type: "navigate",
          label: "系统状态检查",
          url: "/admin/deployment-check",
          description: "运行系统健康检查",
        },
        {
          type: "verify",
          label: "验证服务连接",
          description: "确认所有外部服务连接正常",
        },
      ],
    },
    {
      id: "user-management",
      title: "用户管理",
      description: "配置用户角色、权限和访问控制",
      duration: "10分钟",
      difficulty: "beginner",
      category: "初始设置",
      completed: false,
      prerequisites: ["environment-check"],
      actions: [
        {
          type: "navigate",
          label: "用户管理",
          url: "/admin/users",
          description: "管理系统用户账户",
        },
        {
          type: "navigate",
          label: "角色权限",
          url: "/admin/roles",
          description: "配置用户角色和权限",
        },
      ],
    },
    {
      id: "ai-model-config",
      title: "AI模型配置",
      description: "接入和配置多个AI模型提供商",
      duration: "20分钟",
      difficulty: "intermediate",
      category: "核心配置",
      completed: false,
      prerequisites: ["user-management"],
      actions: [
        {
          type: "navigate",
          label: "AI模型管理",
          url: "/admin/ai-models",
          description: "配置AI提供商和模型",
        },
        {
          type: "test",
          label: "测试AI连接",
          url: "/admin/ai-models/test",
          description: "验证AI模型连接和响应",
        },
      ],
    },
    {
      id: "api-integration",
      title: "API接口配置",
      description: "配置外部服务API密钥和接口参数",
      duration: "15分钟",
      difficulty: "intermediate",
      category: "核心配置",
      completed: false,
      prerequisites: ["ai-model-config"],
      actions: [
        {
          type: "navigate",
          label: "API配置",
          url: "/admin/api-config",
          description: "管理API密钥和配置",
        },
        {
          type: "test",
          label: "API连接测试",
          description: "测试所有API接口连接",
        },
      ],
    },
    {
      id: "security-setup",
      title: "安全策略配置",
      description: "设置访问控制、审计日志和安全策略",
      duration: "25分钟",
      difficulty: "intermediate",
      category: "核心配置",
      completed: false,
      prerequisites: ["api-integration"],
      actions: [
        {
          type: "navigate",
          label: "安全设置",
          url: "/admin/settings",
          description: "配置系统安全策略",
        },
        {
          type: "navigate",
          label: "审计日志",
          url: "/admin/logs",
          description: "查看和配置审计日志",
        },
      ],
    },
    {
      id: "backup-strategy",
      title: "备份策略",
      description: "配置数据备份和恢复策略",
      duration: "15分钟",
      difficulty: "intermediate",
      category: "运维管理",
      completed: false,
      prerequisites: ["security-setup"],
      actions: [
        {
          type: "navigate",
          label: "备份管理",
          url: "/admin/backup",
          description: "配置自动备份策略",
        },
        {
          type: "test",
          label: "备份测试",
          description: "执行备份和恢复测试",
        },
      ],
    },
    {
      id: "monitoring-alerts",
      title: "监控告警",
      description: "设置系统监控和告警通知",
      duration: "20分钟",
      difficulty: "advanced",
      category: "运维管理",
      completed: false,
      prerequisites: ["backup-strategy"],
      actions: [
        {
          type: "navigate",
          label: "系统监控",
          url: "/admin/monitoring",
          description: "配置系统性能监控",
        },
        {
          type: "navigate",
          label: "通知设置",
          url: "/admin/notifications",
          description: "设置告警通知规则",
        },
      ],
    },
    {
      id: "daily-operations",
      title: "日常运维",
      description: "学习系统日常维护和管理操作",
      duration: "10分钟",
      difficulty: "intermediate",
      category: "运维管理",
      completed: false,
      prerequisites: ["monitoring-alerts"],
      actions: [
        {
          type: "navigate",
          label: "任务管理",
          url: "/admin/tasks",
          description: "管理系统维护任务",
        },
        {
          type: "navigate",
          label: "性能优化",
          url: "/admin/performance",
          description: "监控和优化系统性能",
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "故障排除",
      description: "掌握常见问题的诊断和解决方法",
      duration: "25分钟",
      difficulty: "advanced",
      category: "故障处理",
      completed: false,
      prerequisites: ["daily-operations"],
      actions: [
        {
          type: "navigate",
          label: "故障诊断",
          url: "/admin/deployment-check",
          description: "运行系统诊断工具",
        },
        {
          type: "navigate",
          label: "日志分析",
          url: "/admin/logs",
          description: "分析系统日志和错误",
        },
      ],
    },
  ]

  private quickQuestions: QuickQuestion[] = [
    {
      id: "what-is-medical-ai",
      question: "什么是医疗AI？",
      category: "基础概念",
      answer:
        "医疗AI是人工智能在医疗健康领域的应用，包括疾病诊断、治疗方案推荐、药物研发、医学影像分析等。我们的系统集成了多种AI模型，可以辅助医生进行临床决策，提高诊疗效率和准确性。",
      relatedGuides: ["system-overview", "ai-model-config"],
    },
    {
      id: "ai-accuracy",
      question: "AI诊断的准确率如何？",
      category: "技术原理",
      answer:
        "AI诊断的准确率取决于多个因素：训练数据质量、模型算法、应用场景等。在某些特定领域（如医学影像识别），AI的准确率可以达到甚至超过专业医生的水平。但AI始终是辅助工具，最终诊断决策需要医生综合判断。",
      relatedGuides: ["ai-model-config", "troubleshooting"],
    },
    {
      id: "data-privacy",
      question: "患者数据如何保护？",
      category: "数据安全",
      answer:
        "我们采用多层安全防护：数据加密存储、访问权限控制、审计日志记录、合规性检查等。所有患者数据都经过脱敏处理，严格遵守医疗数据保护法规，确保患者隐私安全。",
      relatedGuides: ["security-setup", "backup-strategy"],
    },
    {
      id: "system-integration",
      question: "如何与现有HIS系统集成？",
      category: "系统集成",
      answer:
        "系统提供标准的HL7 FHIR接口，支持与主流HIS、EMR系统集成。通过API接口可以实现数据同步、工作流集成等功能。我们也提供定制化集成服务。",
      relatedGuides: ["api-integration", "daily-operations"],
    },
    {
      id: "model-selection",
      question: "如何选择合适的AI模型？",
      category: "模型选择",
      answer:
        "选择AI模型需要考虑：应用场景（诊断、治疗、预测等）、数据类型（文本、图像、结构化数据）、准确率要求、响应时间、成本等因素。系统支持多模型对比测试，帮助您找到最适合的模型。",
      relatedGuides: ["ai-model-config", "troubleshooting"],
    },
  ]

  private knowledgeBase: KnowledgeItem[] = [
    {
      id: "medical-ai-overview",
      title: "医疗AI技术概述",
      content: `
# 医疗AI技术概述

## 什么是医疗AI？
医疗人工智能（Medical AI）是将人工智能技术应用于医疗健康领域的综合性技术体系。它通过机器学习、深度学习、自然语言处理等技术，帮助医疗工作者提高诊疗效率和准确性。

## 主要应用领域

### 1. 医学影像分析
- **CT/MRI图像识别**：自动识别病灶、测量病变大小
- **X光片分析**：检测骨折、肺部疾病等
- **病理切片分析**：辅助病理医生进行组织学诊断

### 2. 临床决策支持
- **诊断辅助**：基于症状和检查结果提供诊断建议
- **治疗方案推荐**：根据患者情况推荐个性化治疗方案
- **药物相互作用检查**：预防用药风险

### 3. 健康管理
- **疾病风险预测**：基于历史数据预测疾病发生风险
- **健康监测**：实时监测生命体征变化
- **康复指导**：提供个性化康复建议

## 技术优势
1. **提高效率**：自动化处理减少人工工作量
2. **提升准确性**：减少人为错误和遗漏
3. **标准化诊疗**：确保诊疗流程的一致性
4. **24/7服务**：提供全天候医疗支持

## 应用挑战
1. **数据质量**：需要高质量的训练数据
2. **法规合规**：需要符合医疗法规要求
3. **医生接受度**：需要医生理解和信任AI系统
4. **技术更新**：需要持续更新和优化模型
      `,
      category: "基础概念",
      tags: ["医疗AI", "人工智能", "医疗技术"],
      difficulty: "basic",
      relatedItems: ["ai-diagnosis-principles", "data-security"],
      lastUpdated: new Date(),
    },
    {
      id: "ai-diagnosis-principles",
      title: "AI诊断原理与流程",
      content: `
# AI诊断原理与流程

## 诊断流程

### 1. 数据收集
- **患者基本信息**：年龄、性别、病史等
- **症状描述**：主诉、现病史、既往史
- **检查结果**：实验室检查、影像学检查等
- **生命体征**：血压、心率、体温等

### 2. 数据预处理
- **数据清洗**：去除噪声和异常值
- **标准化**：统一数据格式和单位
- **特征提取**：提取关键诊断特征
- **数据融合**：整合多源数据信息

### 3. 模型推理
- **特征匹配**：与训练数据进行模式匹配
- **概率计算**：计算各种疾病的可能性
- **置信度评估**：评估诊断结果的可信度
- **结果排序**：按概率高低排列诊断结果

### 4. 结果输出
- **诊断建议**：提供最可能的诊断结果
- **置信度**：显示诊断的可信程度
- **依据说明**：解释诊断的关键依据
- **进一步检查建议**：推荐额外的检查项目

## 技术原理

### 机器学习算法
- **监督学习**：基于标注数据训练模型
- **无监督学习**：发现数据中的隐藏模式
- **强化学习**：通过反馈优化决策策略

### 深度学习网络
- **卷积神经网络（CNN）**：用于医学影像分析
- **循环神经网络（RNN）**：处理时序医疗数据
- **Transformer**：处理自然语言医疗文本

### 知识图谱
- **医学知识库**：整合医学专业知识
- **疾病关联**：建立疾病间的关联关系
- **症状映射**：建立症状与疾病的映射关系

## 质量保证

### 模型验证
- **交叉验证**：使用多个数据集验证模型性能
- **临床试验**：在真实临床环境中测试
- **专家评估**：医学专家对结果进行评估

### 持续优化
- **在线学习**：根据新数据持续更新模型
- **反馈机制**：收集医生和患者的反馈
- **版本管理**：管理模型的不同版本
      `,
      category: "技术原理",
      tags: ["AI诊断", "机器学习", "深度学习"],
      difficulty: "intermediate",
      relatedItems: ["medical-ai-overview", "model-training"],
      lastUpdated: new Date(),
    },
  ]

  getGuideSteps(): GuideStep[] {
    return this.guideSteps
  }

  getStepsByCategory(category: string): GuideStep[] {
    return this.guideSteps.filter((step) => step.category === category)
  }

  getQuickQuestions(): QuickQuestion[] {
    return this.quickQuestions
  }

  getKnowledgeBase(): KnowledgeItem[] {
    return this.knowledgeBase
  }

  searchKnowledge(query: string): KnowledgeItem[] {
    const lowercaseQuery = query.toLowerCase()
    return this.knowledgeBase.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercaseQuery) ||
        item.content.toLowerCase().includes(lowercaseQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
    )
  }

  async processUserQuestion(question: string): Promise<ChatMessage> {
    // 简单的关键词匹配逻辑
    const keywords = question.toLowerCase()
    let response = ""
    let relatedGuides: string[] = []

    if (keywords.includes("ai") || keywords.includes("人工智能")) {
      response =
        "医疗AI是人工智能在医疗领域的应用，可以辅助诊断、治疗决策和健康管理。我们的系统集成了多种先进的AI模型，为医疗工作者提供智能化支持。"
      relatedGuides = ["system-overview", "ai-model-config"]
    } else if (keywords.includes("配置") || keywords.includes("设置")) {
      response =
        "系统配置包括AI模型配置、API接口设置、安全策略等。建议按照使用向导的步骤逐步完成配置。需要我为您介绍具体的配置步骤吗？"
      relatedGuides = ["ai-model-config", "api-integration", "security-setup"]
    } else if (keywords.includes("安全") || keywords.includes("隐私")) {
      response =
        "我们非常重视数据安全和患者隐私保护。系统采用多层安全防护，包括数据加密、访问控制、审计日志等。所有操作都符合医疗数据保护法规。"
      relatedGuides = ["security-setup", "backup-strategy"]
    } else if (keywords.includes("问题") || keywords.includes("错误") || keywords.includes("故障")) {
      response =
        "遇到问题时，建议先查看系统状态检查页面，然后查看相关日志。我们提供了完整的故障排除指南，可以帮助您快速定位和解决问题。"
      relatedGuides = ["troubleshooting", "daily-operations"]
    } else {
      response =
        "感谢您的提问！我是言语云³医疗AI系统的智能助手，可以为您解答系统使用、医疗AI科普等相关问题。您可以选择下方的快捷问题，或者直接描述您想了解的内容。"
      relatedGuides = ["system-overview"]
    }

    return {
      id: Date.now().toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
      type: "text",
      metadata: {
        confidence: 0.8,
        category: "general",
      },
    }
  }

  markStepCompleted(stepId: string): void {
    const step = this.guideSteps.find((s) => s.id === stepId)
    if (step) {
      step.completed = true
    }
  }

  getProgress(): { completed: number; total: number; percentage: number } {
    const completed = this.guideSteps.filter((step) => step.completed).length
    const total = this.guideSteps.length
    const percentage = Math.round((completed / total) * 100)
    return { completed, total, percentage }
  }
}

// 创建单例实例并导出
export const adminGuideService = new AdminGuideService()

// 默认导出
export default AdminGuideService
