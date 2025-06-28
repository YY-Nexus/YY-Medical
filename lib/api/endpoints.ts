// 集中管理 API 端点
export const API_ENDPOINTS = {
  // 认证相关
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
  },

  // 用户相关
  USERS: {
    ME: "/users/me",
    LIST: "/users",
    DETAIL: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },

  // 患者相关
  PATIENTS: {
    LIST: "/patients",
    DETAIL: (id: string) => `/patients/${id}`,
    CREATE: "/patients",
    UPDATE: (id: string) => `/patients/${id}`,
    DELETE: (id: string) => `/patients/${id}`,
    MEDICAL_RECORDS: (id: string) => `/patients/${id}/medical-records`,
    APPOINTMENTS: (id: string) => `/patients/${id}/appointments`,
  },

  // 医疗记录相关
  MEDICAL_RECORDS: {
    LIST: "/medical-records",
    DETAIL: (id: string) => `/medical-records/${id}`,
    CREATE: "/medical-records",
    UPDATE: (id: string) => `/medical-records/${id}`,
    DELETE: (id: string) => `/medical-records/${id}`,
    UPLOAD_IMAGE: "/medical-records/upload-image",
  },

  // AI 诊断相关
  AI_DIAGNOSIS: {
    ANALYZE: "/ai/analyze",
    MODELS: "/ai/models",
    HISTORY: "/ai/diagnosis-history",
    FEEDBACK: "/ai/feedback",
  },

  // 研究项目相关
  RESEARCH: {
    PROJECTS: "/research/projects",
    PROJECT_DETAIL: (id: string) => `/research/projects/${id}`,
    TEMPLATES: "/research/templates",
    TEMPLATE_DETAIL: (id: string) => `/research/templates/${id}`,
    ETHICS_APPLICATIONS: "/research/ethics-applications",
  },

  // 知识库相关
  KNOWLEDGE_BASE: {
    SEARCH: "/knowledge-base/search",
    CATEGORIES: "/knowledge-base/categories",
    ARTICLES: "/knowledge-base/articles",
    ARTICLE_DETAIL: (id: string) => `/knowledge-base/articles/${id}`,
  },

  // 统计与分析
  ANALYTICS: {
    DASHBOARD: "/analytics/dashboard",
    PATIENT_STATS: "/analytics/patient-stats",
    DIAGNOSIS_STATS: "/analytics/diagnosis-stats",
    RESEARCH_STATS: "/analytics/research-stats",
  },

  // 资质认证相关
  CERTIFICATIONS: {
    LIST: "/certifications",
    DETAIL: (id: string) => `/certifications/${id}`,
    CREATE: "/certifications",
    UPDATE: (id: string) => `/certifications/${id}`,
    DELETE: (id: string) => `/certifications/${id}`,
    UPLOAD: "/certifications/upload",
    REVIEW: (id: string) => `/certifications/${id}/review`,
    APPROVE: (id: string) => `/certifications/${id}/approve`,
    REJECT: (id: string) => `/certifications/${id}/reject`,
    REQUEST_CHANGES: (id: string) => `/certifications/${id}/request-changes`,
    MY_CERTIFICATIONS: "/certifications/my",
    PENDING_REVIEW: "/certifications/pending-review",
    STATISTICS: "/certifications/statistics",
  },

  // AI模型管理相关
  AI_MODELS: {
    PROVIDERS: "/ai/providers",
    PROVIDER_DETAIL: (id: string) => `/ai/providers/${id}`,
    MODELS: "/ai/models",
    MODEL_DETAIL: (id: string) => `/ai/models/${id}`,
    CONFIGS: "/ai/configs",
    CONFIG_DETAIL: (id: string) => `/ai/configs/${id}`,
    TEST_CONNECTION: (id: string) => `/ai/configs/${id}/test`,
    CHAT: "/ai/chat",
    BATCH_CHAT: "/ai/batch-chat",
    STREAM_CHAT: "/ai/stream-chat",
    USAGE_STATS: "/ai/usage-stats",
    COST_ANALYSIS: "/ai/cost-analysis",
  },
}
