# 言语「医枢³」智能诊疗系统 - 开发者技术文档

## 目录
1. [系统概述](#系统概述)
2. [技术栈](#技术栈)
3. [核心功能模块](#核心功能模块)
4. [项目架构](#项目架构)
5. [环境变量配置](#环境变量配置)
6. [文件结构](#文件结构)
7. [API 接口](#api-接口)
8. [数据库设计](#数据库设计)
9. [部署指南](#部署指南)
10. [开发规范](#开发规范)

## 系统概述

言语「医枢³」智能诊疗系统是一个基于 Next.js 14 的现代化医疗AI管理平台，集成了智能诊断、患者管理、临床决策支持、医学研究等多个核心功能模块。

### 核心特性
- 🤖 AI驱动的智能诊断系统
- 👥 全面的患者管理功能
- 🏥 临床决策支持系统
- 🔬 医学研究与数据分析
- 📱 移动端适配与PWA支持
- 🔐 企业级安全与权限管理
- 🌐 多语言国际化支持
- 📊 实时数据可视化

## 技术栈

### 前端技术栈
\`\`\`json
{
  "framework": "Next.js 14.0.4",
  "runtime": "React 18.2.0",
  "language": "TypeScript 5.2.2",
  "styling": "Tailwind CSS 3.3.5",
  "ui_components": "Radix UI + shadcn/ui",
  "icons": "Lucide React 0.294.0",
  "charts": "Recharts 2.9.0",
  "animations": "tailwindcss-animate 1.0.7",
  "themes": "next-themes 0.2.1"
}
\`\`\`

### 后端技术栈
\`\`\`json
{
  "runtime": "Node.js >=22.0.0",
  "api": "Next.js API Routes",
  "authentication": "JWT (jose 5.1.3)",
  "validation": "Custom validation utilities",
  "middleware": "Next.js Middleware",
  "storage": "IndexedDB + LocalStorage"
}
\`\`\`

### 开发工具
\`\`\`json
{
  "package_manager": "npm >=10.0.0",
  "linting": "ESLint 8.53.0",
  "bundler": "Next.js SWC",
  "css_processor": "PostCSS 8.4.31",
  "date_handling": "date-fns 2.30.0"
}
\`\`\`

## 核心功能模块

### 1. 智能诊断模块 (AI Diagnosis)
\`\`\`typescript
// 核心功能
interface AIDiagnosisModule {
  diagnosisCenter: string;      // 诊断中心
  modelManagement: string;      // 模型管理
  diagnosisRecords: string;     // 诊断记录
  modelTraining: string;        // 模型训练
  performanceAnalysis: string;  // 性能分析
  modelDeployment: string;      // 模型部署
}

// 路径配置
const aiDiagnosisPaths = {
  main: "/ai-diagnosis",
  records: "/ai-diagnosis/records",
  models: "/ai-model",
  training: "/ai-model/training",
  performance: "/ai-model/performance",
  deployment: "/ai-model/deployment"
};
\`\`\`

### 2. 患者管理模块 (Patient Management)
\`\`\`typescript
interface PatientManagementModule {
  patientList: string;          // 患者列表
  medicalRecords: string;       // 病历管理
  followupPlans: string;        // 随访计划
  patientGroups: string;        // 患者分组
}

const patientPaths = {
  main: "/patients",
  records: "/patients/records",
  followup: "/patients/followup",
  groups: "/patients/groups"
};
\`\`\`

### 3. 临床决策模块 (Clinical Decision)
\`\`\`typescript
interface ClinicalDecisionModule {
  decisionSupport: string;      // 决策支持
  treatmentPlans: string;       // 治疗方案
  clinicalGuidelines: string;   // 临床指南
  drugReference: string;        // 药物参考
}

const clinicalPaths = {
  main: "/clinical-decision",
  treatments: "/clinical-decision/treatments",
  guidelines: "/clinical-decision/guidelines",
  medications: "/clinical-decision/medications"
};
\`\`\`

### 4. 药物管理模块 (Medication Management)
\`\`\`typescript
interface MedicationModule {
  drugCatalog: string;          // 药品目录
  prescriptionMgmt: string;     // 处方管理
  drugInteractions: string;     // 药物互作
  inventoryMgmt: string;        // 库存管理
}
\`\`\`

### 5. 健康数据模块 (Health Data)
\`\`\`typescript
interface HealthDataModule {
  vitalSigns: string;           // 生命体征
  testResults: string;          // 检测结果
  trendAnalysis: string;        // 趋势分析
  dataImport: string;           // 数据导入
}
\`\`\`

### 6. 医学研究模块 (Medical Research)
\`\`\`typescript
interface ResearchModule {
  researchProjects: string;     // 研究项目
  dataAnalysis: string;         // 数据分析
  sampleManagement: string;     // 样本管理
  trialDesign: string;          // 试验设计
}
\`\`\`

### 7. 资质验证模块 (Certification)
\`\`\`typescript
interface CertificationModule {
  overview: string;             // 资质概览
  upload: string;               // 资质上传
  status: string;               // 验证状态
  management: string;           // 资质管理
  providers: string;            // 验证机构
  statistics: string;           // 验证统计
}
\`\`\`

### 8. 数据安全模块 (Security)
\`\`\`typescript
interface SecurityModule {
  overview: string;             // 安全概览
  accessControl: string;        // 访问控制
  auditLogs: string;            // 审计日志
  compliance: string;           // 合规管理
  accountSecurity: string;      // 账户安全
}
\`\`\`

## 项目架构

### 整体架构图
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    前端层 (Frontend)                        │
├─────────────────────────────────────────────────────────────┤
│  Next.js 14 + React 18 + TypeScript + Tailwind CSS        │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   页面组件   │ │   UI组件库   │ │   业务组件   │           │
│  │   (Pages)   │ │ (shadcn/ui) │ │ (Business)  │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│                    中间件层 (Middleware)                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   认证中间件  │ │   权限中间件  │ │   审计中间件  │           │
│  │    (Auth)   │ │ (Permission)│ │   (Audit)   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│                    API层 (API Routes)                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   用户API   │ │   数据API   │ │   AI模型API  │           │
│  │   (Users)   │ │   (Data)    │ │   (Models)  │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│                    服务层 (Services)                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   AI服务    │ │   数据服务   │ │   通知服务   │           │
│  │ (AI Service)│ │(Data Service)││(Notification)│           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│                    数据层 (Data Layer)                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │  IndexedDB  │ │ LocalStorage│ │   外部API   │           │
│  │  (本地数据)  │ │  (用户设置)  │ │ (Third-party)│           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### 组件架构
\`\`\`
components/
├── ui/                     # 基础UI组件
│   ├── button.tsx         # 按钮组件
│   ├── card.tsx           # 卡片组件
│   ├── input.tsx          # 输入组件
│   └── ...
├── layout/                # 布局组件
│   ├── app-header.tsx     # 应用头部
│   ├── sidebar.tsx        # 侧边栏
│   └── ...
├── business/              # 业务组件
│   ├── ai-diagnosis/      # AI诊断相关
│   ├── patients/          # 患者管理相关
│   ├── clinical-decision/ # 临床决策相关
│   └── ...
└── shared/                # 共享组件
    ├── error-boundary.tsx # 错误边界
    ├── loading-spinner.tsx# 加载动画
    └── ...
\`\`\`

## 环境变量配置

### 开发环境 (.env.local)
\`\`\`bash
# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_NAME="YanYu MediNexus³"

# API配置
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
API_SECRET_KEY=your-secret-key-here

# AI服务配置
DEEPSEEK_API_KEY=your-deepseek-api-key
DEEPSEEK_BASE_URL=https://api.deepseek.com
OPENAI_API_KEY=your-openai-api-key

# 认证配置
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_EXPIRES_IN=30d

# 数据库配置
DATABASE_URL=your-database-url
REDIS_URL=your-redis-url

# 文件存储配置
UPLOAD_MAX_SIZE=10485760  # 10MB
ALLOWED_FILE_TYPES=jpg,jpeg,png,pdf,doc,docx

# 邮件服务配置
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-email-password

# 第三方服务配置
SENTRY_DSN=your-sentry-dsn
ANALYTICS_ID=your-analytics-id

# 功能开关
FEATURE_AI_DIAGNOSIS=true
FEATURE_TELEMEDICINE=true
FEATURE_RESEARCH_MODULE=true
\`\`\`

### 生产环境 (.env.production)
\`\`\`bash
# 应用配置
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=production

# 安全配置
SECURE_COOKIES=true
CSRF_PROTECTION=true
RATE_LIMIT_ENABLED=true

# 性能配置
CACHE_TTL=3600
CDN_URL=https://cdn.your-domain.com

# 监控配置
LOG_LEVEL=error
MONITORING_ENABLED=true
\`\`\`

## 文件结构

### 完整目录结构
\`\`\`
ai-medical-system/
├── app/                           # Next.js 14 App Router
│   ├── (auth)/                   # 认证路由组
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── admin/                    # 管理员路由
│   │   ├── users/
│   │   ├── settings/
│   │   ├── logs/
│   │   └── layout.tsx
│   ├── ai-diagnosis/             # AI诊断模块
│   │   ├── records/
│   │   └── page.tsx
│   ├── ai-model/                 # AI模型管理
│   │   ├── training/
│   │   ├── performance/
│   │   ├── deployment/
│   │   └── page.tsx
│   ├── patients/                 # 患者管理
│   │   ├── [id]/
│   │   ├── records/
│   │   ├── followup/
│   │   ├── groups/
│   │   └── page.tsx
│   ├── clinical-decision/        # 临床决策
│   │   ├── treatments/
│   │   ├── guidelines/
│   │   ├── medications/
│   │   └── page.tsx
│   ├── medications/              # 药物管理
│   │   ├── prescriptions/
│   │   ├── interactions/
│   │   ├── inventory/
│   │   └── page.tsx
│   ├── health-data/              # 健康数据
│   │   ├── vitals/
│   │   ├── tests/
│   │   ├── trends/
│   │   ├── import/
│   │   └── page.tsx
│   ├── research/                 # 医学研究
│   │   ├── analysis/
│   │   ├── samples/
│   │   ├── trials/
│   │   └── page.tsx
│   ├── certifications/           # 资质验证
│   │   ├── upload/
│   │   ├── status/
│   │   ├── management/
│   │   ├── providers/
│   │   ├── statistics/
│   │   └── page.tsx
│   ├── security/                 # 数据安全
│   │   ├── access/
│   │   ├── audit/
│   │   ├── compliance/
│   │   ├── account/
│   │   └── page.tsx
│   ├── mobile-app/               # 移动应用
│   │   ├── features/
│   │   ├── feedback/
│   │   ├── releases/
│   │   └── page.tsx
│   ├── ehr-integration/          # 电子病历集成
│   │   ├── mapping/
│   │   ├── sync/
│   │   ├── connections/
│   │   ├── settings/
│   │   └── page.tsx
│   ├── teleconsultation/         # 远程会诊
│   │   ├── schedule/
│   │   ├── experts/
│   │   ├── records/
│   │   └── page.tsx
│   ├── analytics/                # 统计分析
│   │   ├── trends/
│   │   ├── distribution/
│   │   ├── prediction/
│   │   └── page.tsx
│   ├── api/                      # API路由
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── register/route.ts
│   │   │   ├── refresh/route.ts
│   │   │   └── reset-password/route.ts
│   │   ├── admin/
│   │   │   ├── checks/
│   │   │   └── users/
│   │   ├── patients/route.ts
│   │   ├── diagnoses/route.ts
│   │   ├── models/route.ts
│   │   ├── translate/
│   │   │   ├── route.ts
│   │   │   └── batch/route.ts
│   │   └── avatar/
│   │       └── generate/route.ts
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 首页
│   ├── loading.tsx               # 全局加载页
│   ├── error.tsx                 # 全局错误页
│   ├── not-found.tsx             # 404页面
│   ├── providers.tsx             # 全局Provider
│   └── dashboard-layout.tsx      # 仪表板布局
├── components/                   # 组件目录
│   ├── ui/                      # 基础UI组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── checkbox.tsx
│   │   ├── calendar.tsx
│   │   ├── popover.tsx
│   │   ├── dialog.tsx
│   │   ├── tabs.tsx
│   │   ├── progress.tsx
│   │   ├── chart.tsx
│   │   ├── loading-spinner.tsx
│   │   ├── medical-button.tsx
│   │   ├── medical-card.tsx
│   │   ├── responsive-medical-card.tsx
│   │   ├── advanced-search.tsx
│   │   ├── date-picker.tsx
│   │   ├── responsive-table.tsx
│   │   ├── 3d-button.tsx
│   │   ├── enhanced-form.tsx
│   │   ├── 3d-card.tsx
│   │   ├── interactive-card.tsx
│   │   ├── page-transition.tsx
│   │   ├── dynamic-loading.tsx
│   │   ├── lazy-load.tsx
│   │   └── slider.tsx
│   ├── layout/                  # 布局组件
│   │   ├── app-header.tsx
│   │   ├── app-shell.tsx
│   │   ├── sidebar.tsx
│   │   ├── sidebar-nav.tsx
│   │   ├── page-breadcrumb.tsx
│   │   └── keyboard-shortcuts-dialog.tsx
│   ├── auth/                    # 认证组件
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── ResetPasswordForm.tsx
│   │   ├── AuthGuard.tsx
│   │   ├── login-client.tsx
│   │   └── TermsFooter.tsx
│   ├── ai-diagnosis/            # AI诊断组件
│   │   ├── ai-diagnosis-client.tsx
│   │   ├── diagnosis-form.tsx
│   │   ├── diagnosis-history.tsx
│   │   ├── diagnosis-explainer.tsx
│   │   ├── diagnosis-records-client.tsx
│   │   ├── diagnosis-statistics.tsx
│   │   ├── diagnosis-export.tsx
│   │   ├── diagnosis-classification.tsx
│   │   ├── diagnosis-review.tsx
│   │   ├── diagnosis-batch.tsx
│   │   ├── diagnosis-model-integration.tsx
│   │   └── diagnosis-comparison.tsx
│   ├── ai-model/                # AI模型组件
│   │   ├── ai-model-client.tsx
│   │   ├── model-overview.tsx
│   │   ├── model-performance.tsx
│   │   ├── model-integration.tsx
│   │   ├── model-performance-client.tsx
│   │   ├── model-management.tsx
│   │   ├── model-version-history.tsx
│   │   ├── model-deployment.tsx
│   │   ├── model-monitoring.tsx
│   │   ├── model-navigation.tsx
│   │   └── model-deployment-dashboard.tsx
│   ├── patients/                # 患者管理组件
│   │   ├── patient-list.tsx
│   │   ├── PatientList.tsx
│   │   ├── patient-details.tsx
│   │   ├── add-patient-dialog.tsx
│   │   ├── patient-groups-client.tsx
│   │   ├── followup-client.tsx
│   │   └── medical-records-client.tsx
│   ├── clinical-decision/       # 临床决策组件
│   │   ├── dashboard.tsx
│   │   ├── treatment-recommendations.tsx
│   │   ├── recent-cases.tsx
│   │   ├── decision-support-panel.tsx
│   │   ├── clinical-pathways-client.tsx
│   │   ├── diagnostic-tools-client.tsx
│   │   ├── clinical-guidelines-client.tsx
│   │   ├── clinical-treatments-client.tsx
│   │   └── drug-reference-client.tsx
│   ├── medications/             # 药物管理组件
│   │   ├── medication-catalog.tsx
│   │   ├── medication-catalog-client.tsx
│   │   ├── prescription-management.tsx
│   │   ├── prescription-management-client.tsx
│   │   ├── medication-interactions.tsx
│   │   ├── medication-interactions-client.tsx
│   │   ├── medication-inventory.tsx
│   │   ├── medication-inventory-client.tsx
│   │   └── popular-medications.tsx
│   ├── health-data/             # 健康数据组件
│   │   ├── dashboard.tsx
│   │   ├── health-data-client.tsx
│   │   ├── data-trends-analysis.tsx
│   │   ├── data-import.tsx
│   │   ├── data-import-client.tsx
│   │   ├── vital-signs.tsx
│   │   ├── vital-signs-client.tsx
│   │   ├── test-results.tsx
│   │   ├── test-results-client.tsx
│   │   ├── trends-analysis.tsx
│   │   ├── trends-analysis-client.tsx
│   │   └── patient-data-viewer.tsx
│   ├── research/                # 医学研究组件
│   │   ├── research-client.tsx
│   │   ├── projects-dashboard.tsx
│   │   ├── data-analysis-overview.tsx
│   │   ├── active-projects.tsx
│   │   ├── project-details.tsx
│   │   ├── sample-management.tsx
│   │   ├── experiment-design.tsx
│   │   └── research-analysis-client.tsx
│   ├── certifications/          # 资质验证组件
│   │   ├── certifications-client.tsx
│   │   ├── certification-upload-client.tsx
│   │   ├── certification-status-client.tsx
│   │   ├── certification-management-client.tsx
│   │   ├── verification-providers-client.tsx
│   │   ├── verification-providers-list.tsx
│   │   ├── verification-process-guide.tsx
│   │   ├── verification-provider-settings.tsx
│   │   ├── certification-detail-view.tsx
│   │   ├── bulk-import-dialog.tsx
│   │   └── statistics/
│   │       ├── verification-statistics-client.tsx
│   │       ├── overview-stats.tsx
│   │       ├── provider-comparison-chart.tsx
│   │       ├── result-distribution-chart.tsx
│   │       ├── failure-reasons-chart.tsx
│   │       ├── certification-types-chart.tsx
│   │       ├── time-range-stats-chart.tsx
│   │       └── api-usage-chart.tsx
│   ├── security/                # 数据安全组件
│   │   ├── security-client.tsx
│   │   ├── access-control-client.tsx
│   │   ├── audit-log-client.tsx
│   │   ├── compliance-client.tsx
│   │   ├── compliance-management.tsx
│   │   ├── account-security-client.tsx
│   │   ├── password-change-form.tsx
│   │   ├── two-factor-auth.tsx
│   │   ├── login-history.tsx
│   │   ├── login-devices.tsx
│   │   ├── device-icon.tsx
│   │   ├── device-details.tsx
│   │   ├── secure-input.tsx
│   │   ├── secure-form.tsx
│   │   ├── confirmation-dialog.tsx
│   │   ├── secure-action-button.tsx
│   │   ├── sensitive-action-wrapper.tsx
│   │   └── permission-guard.tsx
│   ├── mobile-app/              # 移动应用组件
│   │   ├── mobile-app-client.tsx
│   │   ├── features-client.tsx
│   │   ├── feedback-client.tsx
│   │   ├── releases-client.tsx
│   │   ├── mobile-app-preview.tsx
│   │   ├── mobile-app-features.tsx
│   │   ├── mobile-app-screenshots.tsx
│   │   ├── mobile-app-feedback.tsx
│   │   └── mobile-app-releases.tsx
│   ├── ehr/                     # 电子病历集成组件
│   │   ├── ehr-integration-client.tsx
│   │   ├── ehr-mapping-client.tsx
│   │   ├── ehr-sync-client.tsx
│   │   ├── ehr-connections-client.tsx
│   │   ├── ehr-settings-client.tsx
│   │   ├── ehr-dashboard.tsx
│   │   ├── ehr-integration-status.tsx
│   │   └── ehr-data-mapping.tsx
│   ├── teleconsultation/        # 远程会诊组件
│   │   ├── teleconsultation-client.tsx
│   │   ├── schedule-client.tsx
│   │   ├── experts-client.tsx
│   │   ├── records-client.tsx
│   │   ├── teleconsultation-dashboard.tsx
│   │   └── consultation-room.tsx
│   ├── analytics/               # 统计分析组件
│   │   ├── analytics-client.tsx
│   │   ├── dashboard.tsx
│   │   ├── dashboard-component.tsx
│   │   ├── interactive-charts.tsx
│   │   ├── advanced-charts.tsx
│   │   ├── data-comparison.tsx
│   │   ├── trend-reports.tsx
│   │   ├── trend-reports-client.tsx
│   │   ├── prediction-models.tsx
│   │   ├── prediction-models-client.tsx
│   │   ├── distribution-analysis.tsx
│   │   ├── distribution-analysis-client.tsx
│   │   └── prediction-tool.tsx
│   ├── admin/                   # 管理员组件
│   │   ├── admin-sidebar.tsx
│   │   ├── admin-header.tsx
│   │   ├── admin-dashboard.tsx
│   │   ├── admin-system-status.tsx
│   │   ├── admin-user-stats.tsx
│   │   ├── admin-recent-activities.tsx
│   │   ├── admin-resource-usage.tsx
│   │   ├── user-management.tsx
│   │   ├── certification-dashboard.tsx
│   │   ├── api-config/
│   │   │   ├── api-config-client.tsx
│   │   │   ├── api-key-manager.tsx
│   │   │   └── endpoint-config.tsx
│   │   ├── api-usage/
│   │   │   └── api-usage-monitor-client.tsx
│   │   ├── logs/
│   │   │   ├── logs-client.tsx
│   │   │   ├── logs-list.tsx
│   │   │   ├── logs-filter.tsx
│   │   │   ├── logs-chart.tsx
│   │   │   └── logs-export.tsx
│   │   ├── roles/
│   │   │   ├── roles-client.tsx
│   │   │   ├── roles-list.tsx
│   │   │   ├── permissions-list.tsx
│   │   │   ├── role-permission-matrix.tsx
│   │   │   ├── create-role-dialog.tsx
│   │   │   ├── edit-role-dialog.tsx
│   │   │   ├── create-permission-dialog.tsx
│   │   │   └── edit-permission-dialog.tsx
│   │   ├── settings/
│   │   │   ├── settings-client.tsx
│   │   │   ├── general-settings.tsx
│   │   │   ├── security-settings.tsx
│   │   │   ├── appearance-settings.tsx
│   │   │   ├── integration-settings.tsx
│   │   │   ├── notification-settings.tsx
│   │   │   ├── backup-settings.tsx
│   │   │   ├── api-settings.tsx
│   │   │   ├── storage-settings.tsx
│   │   │   └── performance-settings.tsx
│   │   ├── backup/
│   │   │   ├── backup-client.tsx
│   │   │   ├── backup-dashboard.tsx
│   │   │   ├── backup-list.tsx
│   │   │   ├── backup-schedule.tsx
│   │   │   └── restore-panel.tsx
│   │   ├── notifications/
│   │   │   ├── notifications-client.tsx
│   │   │   ├── notifications-dashboard.tsx
│   │   │   ├── notification-templates.tsx
│   │   │   ├── notification-rules.tsx
│   │   │   ├── notification-history.tsx
│   │   │   └── notification-channels.tsx
│   │   ├── tasks/
│   │   │   ├── tasks-client.tsx
│   │   │   ├── tasks-list.tsx
│   │   │   ├── task-scheduler.tsx
│   │   │   ├── task-history.tsx
│   │   │   ├── task-monitor.tsx
│   │   │   ├── create-task-dialog.tsx
│   │   │   └── edit-task-dialog.tsx
│   │   ├── deployment-check/
│   │   │   ├── deployment-check-client.tsx
│   │   │   ├── system-check.tsx
│   │   │   ├── performance-check.tsx
│   │   │   ├── security-check.tsx
│   │   │   ├── compatibility-check.tsx
│   │   │   ├── configuration-check.tsx
│   │   │   ├── database-check.tsx
│   │   │   ├── api-check.tsx
│   │   │   ├── ui-check.tsx
│   │   │   └── deployment-report.tsx
│   │   └── certifications/
│   │       ├── admin-certification-client.tsx
│   │       └── certification-dashboard.tsx
│   ├── medical-records/         # 医疗记录组件
│   │   ├── medical-records-client.tsx
│   │   ├── medical-imaging-uploader.tsx
│   │   ├── prescription-uploader.tsx
│   │   ├── batch-processor.tsx
│   │   ├── ai-model-selector.tsx
│   │   ├── multi-modal-ai-diagnosis.tsx
│   │   ├── modality-specific-analysis.tsx
│   │   ├── cross-modal-analysis.tsx
│   │   ├── knowledge-integration.tsx
│   │   ├── knowledge-button.tsx
│   │   ├── knowledge-base-client.tsx
│   │   ├── imaging-feature-reference.tsx
│   │   ├── interactive-image-annotation.tsx
│   │   ├── imaging-feature-client.tsx
│   │   ├── ai-assisted-annotation.tsx
│   │   ├── 3d-medical-viewer.tsx
│   │   ├── dicom-viewer.tsx
│   │   ├── ai-diagnosis.tsx
│   │   ├── record-association.tsx
│   │   └── ocr-service.tsx
│   ├── case-library/            # 病例库组件
│   │   ├── case-browser.tsx
│   │   ├── case-detail.tsx
│   │   ├── case-image-viewer.tsx
│   │   ├── case-lab-results.tsx
│   │   ├── case-treatment-timeline.tsx
│   │   ├── case-knowledge-points.tsx
│   │   ├── case-comments.tsx
│   │   └── similar-cases.tsx
│   ├── knowledge-graph/         # 知识图谱组件
│   │   ├── related-cases-panel.tsx
│   │   └── knowledge-graph-visualization.tsx
│   ├── ai-model-training/       # AI模型训练组件
│   │   ├── model-training-client.tsx
│   │   ├── model-training-jobs.tsx
│   │   ├── model-evaluation.tsx
│   │   └── model-deployment.tsx
│   ├── model-deployment/        # 模型部署组件
│   │   └── ModelDeployment.tsx
│   ├── profile/                 # 用户配置组件
│   │   ├── profile-client.tsx
│   │   ├── avatar-cropper.tsx
│   │   ├── avatar-preset-selector.tsx
│   │   ├── ai-avatar-generator.tsx
│   │   ├── avatar-editor.tsx
│   │   ├── avatar-upload.tsx
│   │   └── certifications/
│   │       ├── certification-list.tsx
│   │       ├── certification-status-badge.tsx
│   │       ├── expiration-reminder.tsx
│   │       ├── file-upload.tsx
│   │       └── certification-upload-form.tsx
│   ├── settings/                # 设置组件
│   │   ├── settings-client.tsx
│   │   └── SettingsPanel.tsx
│   ├── help/                    # 帮助组件
│   │   └── help-client.tsx
│   ├── notifications/           # 通知组件
│   │   └── notifications-client.tsx
│   ├── brand/                   # 品牌组件
│   │   ├── logo.tsx
│   │   ├── formula.tsx
│   │   ├── slogan.tsx
│   │   ├── color-system.tsx
│   │   ├── icon-system.tsx
│   │   ├── voice-system.tsx
│   │   ├── story-system.tsx
│   │   ├── ux-consistency.tsx
│   │   ├── asset-management.tsx
│   │   ├── logo-showcase.tsx
│   │   ├── animated-logo.tsx
│   │   ├── illustration-system.tsx
│   │   ├── shield-logo.tsx
│   │   └── cloud-logo.tsx
│   ├── translation/             # 翻译组件
│   │   ├── translation-progress.tsx
│   │   └── translation-loader.tsx
│   ├── navigation/              # 导航组件
│   │   ├── top-nav.tsx
│   │   ├── main-nav.tsx
│   │   ├── mobile-nav.tsx
│   │   ├── global-navigation.tsx
│   │   ├── home-button.tsx
│   │   ├── configurable-home-button.tsx
│   │   └── global-home-button.tsx
│   ├── error-boundary/          # 错误边界组件
│   │   ├── global-error-boundary.tsx
│   │   └── network-error-handler.tsx
│   ├── performance/             # 性能监控组件
│   │   ├── performance-monitor.tsx
│   │   ├── simple-performance-monitor.tsx
│   │   └── event-tracker.tsx
│   ├── dev/                     # 开发工具组件
│   │   ├── navigation-tester.tsx
│   │   ├── error-tester.tsx
│   │   └── performance-dashboard.tsx
│   ├── dashboard/               # 仪表板组件
│   │   └── lazy-dashboard.tsx
│   ├── data-export/             # 数据导出组件
│   │   └── export-button.tsx
│   ├── data-filter/             # 数据过滤组件
│   │   └── data-filter.tsx
│   ├── command/                 # 命令面板组件
│   │   └── command-palette.tsx
│   ├── preview/                 # 预览组件
│   │   ├── preview-modal.tsx
│   │   ├── preview-button.tsx
│   │   ├── preview-sidebar.tsx
│   │   └── preview-sidebar-button.tsx
│   ├── messages/                # 消息组件
│   │   └── message-panel.tsx
│   ├── accessibility/           # 无障碍组件
│   │   ├── keyboard-navigation-manager.tsx
│   │   ├── accessible-menu.tsx
│   │   ├── focus-trap.tsx
│   │   ├── accessible-table.tsx
│   │   ├── accessible-tabs.tsx
│   │   ├── accessible-notifications.tsx
│   │   ├── contrast-theme-switcher.tsx
│   │   ├── accessibility-toolbar.tsx
│   │   └── accessibility-checker.tsx
│   ├── utils/                   # 工具组件
│   │   ├── optimize-render.tsx
│   │   ├── lazy-component.tsx
│   │   └── client-component-checker.tsx
│   ├── shared/                  # 共享组件
│   │   ├── error-boundary.tsx
│   │   ├── global-error-handler.tsx
│   │   ├── floating-ai-doctor.tsx
│   │   ├── upcoming-consultations.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── page-header.tsx
│   │   ├── keyboard-shortcuts-help.tsx
│   │   ├── navigation-tester.tsx
│   │   ├── offline-notification.tsx
│   │   ├── splash-screen.tsx
│   │   ├── user-avatar-menu.tsx
│   │   ├── sidebar.tsx
│   │   ├── language-switcher.tsx
│   │   ├── enhanced-language-switcher.tsx
│   │   ├── translation-demo.tsx
│   │   ├── translation-management.tsx
│   │   ├── auto-translated-text.tsx
│   │   ├── example-translated-component.tsx
│   │   ├── medical-terms-example.tsx
│   │   ├── patient-card.tsx
│   │   └── date-display.tsx
│   ├── experiment/              # 实验相关组件
│   │   ├── experiment-filter-tags.tsx
│   │   ├── quick-filter-menu.tsx
│   │   ├── experiment-filter-drawer.tsx
│   │   ├── experiment-template-manager.tsx
│   │   ├── save-as-template-dialog.tsx
│   │   ├── experiment-design.tsx
│   │   ├── ethics-template-manager.tsx
│   │   ├── ethics-application-form.tsx
│   │   └── ethics-application-integration.tsx
│   ├── specialized-templates/   # 专业模板组件
│   │   ├── template-catalog.tsx
│   │   ├── template-detail.tsx
│   │   └── template-manager.tsx
│   ├── collaboration/           # 协作组件
│   │   ├── collaborators-panel.tsx
│   │   ├── version-history.tsx
│   │   └── collaboration-dashboard.tsx
│   ├── ethics/                  # 伦理组件
│   │   └── ethics-application-form.tsx
│   └── index.ts                 # 组件导出文件
├── lib/                         # 工具库
│   ├── utils.ts                 # 通用工具函数
│   ├── auth/                    # 认证相关
│   │   └── jwt.ts
│   ├── api/                     # API相关
│   │   ├── client.ts
│   │   └── endpoints.ts
│   ├── storage/                 # 存储相关
│   │   ├── indexedDB.ts
│   │   └── localStorage.ts
│   ├── utils/                   # 工具函数
│   │   ├── date.ts
│   │   ├── string.ts
│   │   ├── number.ts
│   │   ├── validation.ts
│   │   ├── array.ts
│   │   └── object.ts
│   └── env.ts                   # 环境变量
├── hooks/                       # 自定义Hook
│   ├── useApi.ts
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   ├── useThrottle.ts
│   ├── useMediaQuery.ts
│   ├── useOnClickOutside.ts
│   ├── useAsync.ts
│   ├── usePagination.ts
│   ├── useIndexedDB.ts
│   ├── useLocalStorage.ts
│   ├── use-offline-status.ts
│   ├── use-mobile.tsx
│   ├── use-translation.ts
│   ├── use-auto-translation.ts
│   ├── use-medical-terms.ts
│   ├── use-form-validation.ts
│   ├── use-permissions.ts
│   ├── use-enhanced-permissions.ts
│   ├── use-cached-api.ts
│   ├── use-real-time-data.ts
│   └── use-toast.ts
├── store/                       # 状态管理
│   ├── index.ts
│   ├── useAuthStore.ts
│   ├── usePatientStore.ts
│   ├── useSettingsStore.ts
│   └── useNotificationStore.ts
├── contexts/                    # React Context
│   ├── loading-context.tsx
│   ├── language-context.tsx
│   ├── auto-translation-context.tsx
│   ├── user-avatar-context.tsx
│   └── feedback-context.tsx
├── services/                    # 服务层
│   ├── patientService.ts
│   ├── multi-modal-ai-service.ts
│   ├── medical-knowledge-service.ts
│   ├── medication-interaction-service.ts
│   ├── personalized-recommendation-service.ts
│   ├── collaboration-service.ts
│   ├── knowledge-update-service.ts
│   ├── imaging-feature-service.ts
│   ├── knowledge-graph-service.ts
│   ├── ai-annotation-service.ts
│   ├── case-library-service.ts
│   ├── case-similarity-service.ts
│   ├── clinical-decision-service.ts
│   ├── data-export-service.ts
│   ├── certification-verification-service.ts
│   ├── api-config-service.ts
│   ├── verification-statistics-service.ts
│   ├── translation-service.ts
│   ├── ai-avatar-service.ts
│   ├── performance-monitoring-service.ts
│   ├── error-handling-service.ts
│   ├── deployment-check-service.ts
│   ├── cache-service.ts
│   └── medical-knowledge-service.ts
├── types/                       # TypeScript类型定义
│   ├── medical-records.ts
│   ├── knowledge-base.ts
│   ├── imaging-features.ts
│   ├── knowledge-graph.ts
│   ├── case-library.ts
│   ├── certifications.ts
│   ├── api-config.ts
│   ├── verification-statistics.ts
│   ├── avatar-presets.ts
│   └── permissions.ts
├── middleware/                  # 中间件
│   ├── audit-middleware.ts
│   └── permission-audit-middleware.ts
├── utils/                       # 工具函数
│   ├── client-utils.ts
│   ├── client-component-checker.tsx
│   ├── dependency-optimizer.ts
│   ├── navigation-tester.ts
│   ├── error-simulator.ts
│   ├── security-utils.ts
│   ├── security-analyzer.ts
│   └── input-validation.ts
├── config/                      # 配置文件
│   └── navigation.ts
├── i18n/                        # 国际化
│   ├── translations.ts
│   └── medical-terms.ts
├── styles/                      # 样式文件
│   └── accessibility-themes.css
├── public/                      # 静态资源
│   ├── images/                  # 图片资源
│   ├── avatars/                 # 头像资源
│   ├── icons/                   # 图标资源
│   ├── sw.js                    # Service Worker
│   ├── offline.html             # 离线页面
│   └── manifest.json            # PWA配置
├── docs/                        # 文档
│   ├── developer-guide.md       # 开发者指南
│   ├── api-documentation.md     # API文档
│   ├── deployment-guide.md      # 部署指南
│   └── naming-conventions.md    # 命名规范
├── scripts/                     # 脚本文件
│   └── check-node-version.js
├── middleware.ts                # Next.js中间件
├── next.config.mjs              # Next.js配置
├── tailwind.config.ts           # Tailwind配置
├── tsconfig.json                # TypeScript配置
├── package.json                 # 项目依赖
├── vercel.json                  # Vercel部署配置
├── .env                         # 环境变量
├── .env.production              # 生产环境变量
├── .env.local.example           # 环境变量示例
├── .gitignore                   # Git忽略文件
├── .nvmrc                       # Node版本
├── .node-version                # Node版本
├── .npmrc                       # npm配置
├── .babelrc                     # Babel配置
├── .yarnrc                      # Yarn配置
├── .npmignore                   # npm忽略文件
└── README.md                    # 项目说明
\`\`\`

## API 接口

### 认证相关API
\`\`\`typescript
// 用户登录
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// 用户注册
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "name": "用户名",
  "role": "doctor"
}

// 刷新Token
POST /api/auth/refresh
{
  "refreshToken": "refresh_token_here"
}

// 重置密码
POST /api/auth/reset-password
{
  "email": "user@example.com",
  "newPassword": "newpassword123",
  "resetToken": "reset_token_here"
}
\`\`\`

### 患者管理API
\`\`\`typescript
// 获取患者列表
GET /api/patients?page=1&limit=10&search=关键词

// 获取患者详情
GET /api/patients/[id]

// 创建患者
POST /api/patients
{
  "name": "患者姓名",
  "age": 30,
  "gender": "male",
  "phone": "13800138000",
  "email": "patient@example.com"
}

// 更新患者信息
PUT /api/patients/[id]
{
  "name": "更新后的姓名",
  "phone": "新的电话号码"
}

// 删除患者
DELETE /api/patients/[id]
\`\`\`

### AI诊断API
\`\`\`typescript
// 创建诊断
POST /api/diagnoses
{
  "patientId": "patient_id",
  "symptoms": ["症状1", "症状2"],
  "medicalHistory": "病史信息",
  "images": ["image_url1", "image_url2"]
}

// 获取诊断结果
GET /api/diagnoses/[id]

// 获取诊断列表
GET /api/diagnoses?patientId=patient_id&page=1&limit=10
\`\`\`

### AI模型管理API
\`\`\`typescript
// 获取模型列表
GET /api/models

// 获取模型详情
GET /api/models/[id]

// 训练模型
POST /api/models/train
{
  "modelType": "classification",
  "trainingData": "training_data_url",
  "parameters": {
    "epochs": 100,
    "batchSize": 32
  }
}

// 部署模型
POST /api/models/[id]/deploy
{
  "environment": "production",
  "version": "1.0.0"
}
\`\`\`

### 翻译API
\`\`\`typescript
// 单个文本翻译
POST /api/translate
{
  "text": "需要翻译的文本",
  "from": "en",
  "to": "zh"
}

// 批量翻译
POST /api/translate/batch
{
  "texts": ["text1", "text2", "text3"],
  "from": "en",
  "to": "zh"
}
\`\`\`

### 系统检查API
\`\`\`typescript
// 系统整体检查
GET /api/admin/checks

// 系统状态检查
GET /api/admin/checks/system

// 性能检查
GET /api/admin/checks/performance

// 安全检查
GET /api/admin/checks/security
\`\`\`

## 数据库设计

### 用户表 (users)
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  avatar_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### 患者表 (patients)
\`\`\`sql
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  age INTEGER,
  gender VARCHAR(10),
  phone VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  medical_history TEXT,
  allergies TEXT[],
  emergency_contact JSONB,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### 诊断记录表 (diagnoses)
\`\`\`sql
CREATE TABLE diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  doctor_id UUID REFERENCES users(id),
  symptoms TEXT[],
  diagnosis_result JSONB,
  confidence_score DECIMAL(3,2),
  model_version VARCHAR(50),
  images TEXT[],
  notes TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### AI模型表 (ai_models)
\`\`\`sql
CREATE TABLE ai_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  version VARCHAR(20) NOT NULL,
  description TEXT,
  model_url VARCHAR(500),
  accuracy DECIMAL(5,4),
  training_data_info JSONB,
  parameters JSONB,
  status VARCHAR(20) DEFAULT 'training',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### 权限表 (permissions)
\`\`\`sql
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  resource VARCHAR(100) NOT NULL,
  action VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### 角色表 (roles)
\`\`\`sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  description TEXT,
  permissions UUID[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### 用户角色关联表 (user_roles)
\`\`\`sql
CREATE TABLE user_roles (
  user_id UUID REFERENCES users(id),
  role_id UUID REFERENCES roles(id),
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, role_id)
);
\`\`\`

### 审计日志表 (audit_logs)
\`\`\`sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50),
  resource_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

## 部署指南

### 本地开发环境
\`\`\`bash
# 1. 克隆项目
git clone <repository-url>
cd ai-medical-system

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.local.example .env.local
# 编辑 .env.local 文件，填入相应的配置

# 4. 启动开发服务器
npm run dev

# 5. 访问应用
# 打开浏览器访问 http://localhost:3000
\`\`\`

### Vercel部署
\`\`\`bash
# 1. 安装Vercel CLI
npm i -g vercel

# 2. 登录Vercel
vercel login

# 3. 部署项目
vercel

# 4. 配置环境变量
# 在Vercel Dashboard中配置生产环境变量

# 5. 自动部署
# 推送到main分支会自动触发部署
git push origin main
\`\`\`

### Docker部署
\`\`\`dockerfile
# Dockerfile
FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
\`\`\`

\`\`\`yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=medical_system
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
\`\`\`

### 生产环境配置
\`\`\`bash
# 1. 服务器配置
# 确保服务器满足以下要求：
# - Node.js >= 22.0.0
# - npm >= 10.0.0
# - 至少 2GB RAM
# - 至少 10GB 存储空间

# 2. 环境变量配置
# 配置生产环境的环境变量
export NODE_ENV=production
export DATABASE_URL="postgresql://user:password@localhost:5432/medical_system"
export JWT_SECRET="your-production-jwt-secret"
export REDIS_URL="redis://localhost:6379"

# 3. 构建应用
npm run build

# 4. 启动应用
npm start

# 5. 使用PM2管理进程
npm install -g pm2
pm2 start npm --name "medical-system" -- start
pm2 startup
pm2 save
\`\`\`

## 开发规范

### 代码规范
\`\`\`typescript
// 1. 文件命名规范
// - 组件文件使用 PascalCase: UserProfile.tsx
// - 工具文件使用 camelCase: dateUtils.ts
// - 页面文件使用 kebab-case: user-profile.tsx
// - 常量文件使用 UPPER_CASE: API_ENDPOINTS.ts

// 2. 组件规范
interface ComponentProps {
  // Props接口定义
  title: string;
  isVisible?: boolean;
  onClose?: () => void;
}

export function ComponentName({ title, isVisible = false, onClose }: ComponentProps) {
  // 组件实现
  return (
    <div className="component-container">
      {/* JSX内容 */}
    </div>
  );
}

// 3. Hook规范
export function useCustomHook(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  
  const updateValue = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);
  
  return { value, updateValue };
}

// 4. 类型定义规范
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'admin' | 'doctor' | 'nurse' | 'patient';

// 5. API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
\`\`\`

### Git提交规范
\`\`\`bash
# 提交信息格式
<type>(<scope>): <subject>

# 类型说明
feat:     新功能
fix:      修复bug
docs:     文档更新
style:    代码格式调整
refactor: 代码重构
test:     测试相关
chore:    构建过程或辅助工具的变动

# 示 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动

# 示例
feat(auth): 添加用户登录功能
fix(ui): 修复按钮样式问题
docs(api): 更新API文档
refactor(components): 重构患者列表组件
test(utils): 添加日期工具函数测试
chore(deps): 更新依赖包版本
\`\`\`

### CSS/样式规范
\`\`\`css
/* 1. 使用Tailwind CSS类名 */
.medical-card {
  @apply bg-white rounded-lg shadow-md p-6 border border-gray-200;
}

/* 2. 自定义CSS变量 */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}

/* 3. 响应式设计 */
.responsive-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
}

/* 4. 动画效果 */
.fade-in {
  @apply opacity-0 animate-in fade-in duration-300;
}

.slide-up {
  @apply translate-y-4 animate-in slide-in-from-bottom duration-300;
}
\`\`\`

### 测试规范
\`\`\`typescript
// 1. 单元测试示例
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders button with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// 2. 集成测试示例
describe('Patient Management', () => {
  it('should create a new patient', async () => {
    const patientData = {
      name: '张三',
      age: 30,
      gender: 'male',
      phone: '13800138000'
    };

    const response = await fetch('/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData)
    });

    expect(response.status).toBe(201);
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data.name).toBe('张三');
  });
});

// 3. E2E测试示例 (Playwright)
import { test, expect } from '@playwright/test';

test('user can login and access dashboard', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('[data-testid="email"]', 'test@example.com');
  await page.fill('[data-testid="password"]', 'password123');
  await page.click('[data-testid="login-button"]');
  
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('h1')).toContainText('仪表板');
});
\`\`\`

### 性能优化规范
\`\`\`typescript
// 1. 组件懒加载
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent />
    </Suspense>
  );
}

// 2. 图片优化
import Image from 'next/image';

function OptimizedImage() {
  return (
    <Image
      src="/images/medical-scan.jpg"
      alt="医学扫描图像"
      width={800}
      height={600}
      priority={false}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}

// 3. 数据缓存
import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ data }: { data: any[] }) {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: heavyCalculation(item)
    }));
  }, [data]);

  const handleClick = useCallback((id: string) => {
    // 处理点击事件
  }, []);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

// 4. API请求优化
import { useQuery } from '@tanstack/react-query';

function usePatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: () => fetch('/api/patients').then(res => res.json()),
    staleTime: 5 * 60 * 1000, // 5分钟
    cacheTime: 10 * 60 * 1000, // 10分钟
  });
}
\`\`\`

### 安全规范
\`\`\`typescript
// 1. 输入验证
import { z } from 'zod';

const PatientSchema = z.object({
  name: z.string().min(1).max(100),
  age: z.number().min(0).max(150),
  email: z.string().email().optional(),
  phone: z.string().regex(/^1[3-9]\d{9}$/).optional(),
});

function validatePatientData(data: unknown) {
  try {
    return PatientSchema.parse(data);
  } catch (error) {
    throw new Error('Invalid patient data');
  }
}

// 2. XSS防护
import DOMPurify from 'dompurify';

function sanitizeHTML(html: string) {
  return DOMPurify.sanitize(html);
}

// 3. CSRF防护
import { getCsrfToken } from 'next-auth/react';

async function secureApiCall(data: any) {
  const csrfToken = await getCsrfToken();
  
  return fetch('/api/secure-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    body: JSON.stringify(data),
  });
}

// 4. 权限检查
function requirePermission(permission: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      if (!hasPermission(permission)) {
        throw new Error('Insufficient permissions');
      }
      return originalMethod.apply(this, args);
    };
  };
}

class PatientService {
  @requirePermission('patient:read')
  async getPatients() {
    // 获取患者列表
  }
  
  @requirePermission('patient:write')
  async createPatient(data: PatientData) {
    // 创建患者
  }
}
\`\`\`

### 错误处理规范
\`\`\`typescript
// 1. 全局错误边界
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div className="error-container">
      <h2>出现了错误</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>重试</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo);
        // 发送错误报告到监控服务
      }}
    >
      <MainApp />
    </ErrorBoundary>
  );
}

// 2. API错误处理
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiCall(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new ApiError(
        `API call failed: ${response.statusText}`,
        response.status
      );
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError('Network error', 0);
  }
}

// 3. 用户友好的错误提示
import { toast } from '@/hooks/use-toast';

function handleError(error: Error) {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        toast({
          title: '认证失败',
          description: '请重新登录',
          variant: 'destructive',
        });
        break;
      case 403:
        toast({
          title: '权限不足',
          description: '您没有执行此操作的权限',
          variant: 'destructive',
        });
        break;
      case 500:
        toast({
          title: '服务器错误',
          description: '请稍后重试或联系管理员',
          variant: 'destructive',
        });
        break;
      default:
        toast({
          title: '操作失败',
          description: error.message,
          variant: 'destructive',
        });
    }
  } else {
    toast({
      title: '未知错误',
      description: '请刷新页面重试',
      variant: 'destructive',
    });
  }
}
\`\`\`

### 国际化规范
\`\`\`typescript
// 1. 翻译文件结构
// i18n/zh-CN.json
{
  "common": {
    "save": "保存",
    "cancel": "取消",
    "delete": "删除",
    "edit": "编辑",
    "loading": "加载中..."
  },
  "auth": {
    "login": "登录",
    "logout": "退出登录",
    "register": "注册",
    "email": "邮箱",
    "password": "密码"
  },
  "patients": {
    "title": "患者管理",
    "add": "添加患者",
    "list": "患者列表",
    "details": "患者详情"
  }
}

// 2. 翻译Hook使用
import { useTranslation } from '@/hooks/use-translation';

function PatientList() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('patients.title')}</h1>
      <button>{t('patients.add')}</button>
    </div>
  );
}

// 3. 动态翻译
function DynamicMessage({ count }: { count: number }) {
  const { t } = useTranslation();
  
  return (
    <p>
      {t('patients.count', { count })}
      {/* 输出: "共有 5 位患者" */}
    </p>
  );
}
\`\`\`

### 监控和日志规范
\`\`\`typescript
// 1. 性能监控
import { performance } from 'perf_hooks';

function measurePerformance(name: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const start = performance.now();
      
      try {
        const result = await originalMethod.apply(this, args);
        const end = performance.now();
        
        console.log(`${name} took ${end - start} milliseconds`);
        
        // 发送性能数据到监控服务
        sendMetrics({
          name,
          duration: end - start,
          timestamp: Date.now(),
        });
        
        return result;
      } catch (error) {
        const end = performance.now();
        
        console.error(`${name} failed after ${end - start} milliseconds`, error);
        
        // 发送错误数据到监控服务
        sendError({
          name,
          error: error.message,
          duration: end - start,
          timestamp: Date.now(),
        });
        
        throw error;
      }
    };
  };
}

// 2. 结构化日志
interface LogEntry {
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  timestamp: string;
  userId?: string;
  requestId?: string;
  metadata?: Record<string, any>;
}

class Logger {
  private createLogEntry(
    level: LogEntry['level'],
    message: string,
    metadata?: Record<string, any>
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      userId: getCurrentUserId(),
      requestId: getCurrentRequestId(),
      metadata,
    };
  }
  
  info(message: string, metadata?: Record<string, any>) {
    const entry = this.createLogEntry('info', message, metadata);
    console.log(JSON.stringify(entry));
    this.sendToLogService(entry);
  }
  
  error(message: string, error?: Error, metadata?: Record<string, any>) {
    const entry = this.createLogEntry('error', message, {
      ...metadata,
      error: error?.message,
      stack: error?.stack,
    });
    console.error(JSON.stringify(entry));
    this.sendToLogService(entry);
  }
  
  private sendToLogService(entry: LogEntry) {
    // 发送日志到外部服务
  }
}

export const logger = new Logger();

// 3. 用户行为追踪
function trackUserAction(action: string, metadata?: Record<string, any>) {
  const event = {
    action,
    userId: getCurrentUserId(),
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    metadata,
  };
  
  // 发送到分析服务
  analytics.track(event);
}

// 使用示例
function PatientForm() {
  const handleSubmit = (data: PatientData) => {
    trackUserAction('patient_created', {
      patientId: data.id,
      source: 'form',
    });
    
    logger.info('Patient created successfully', {
      patientId: data.id,
      patientName: data.name,
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* 表单内容 */}
    </form>
  );
}
\`\`\`

## 总结

本技术文档涵盖了言语「医枢³」智能诊疗系统的完整技术架构，包括：

1. **系统概述**: 明确了系统的核心定位和特性
2. **技术栈**: 详细列出了前后端技术选型
3. **核心功能模块**: 完整描述了8大核心业务模块
4. **项目架构**: 展示了系统的整体架构设计
5. **环境变量配置**: 提供了开发和生产环境的配置指南
6. **文件结构**: 详细的目录结构和文件组织方式
7. **API接口**: 核心API的设计和使用方法
8. **数据库设计**: 主要数据表的结构设计
9. **部署指南**: 多种部署方式的详细说明
10. **开发规范**: 完整的代码规范和最佳实践

该系统采用现代化的技术栈，具备良好的可扩展性、安全性和用户体验，为医疗行业提供了一个完整的AI驱动的智能诊疗解决方案。
