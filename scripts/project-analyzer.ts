interface ProjectStats {
  totalFiles: number
  pages: number
  components: number
  services: number
  hooks: number
  types: number
  configs: number
}

export function analyzeProject(): ProjectStats {
  const stats: ProjectStats = {
    totalFiles: 0,
    pages: 0,
    components: 0,
    services: 0,
    hooks: 0,
    types: 0,
    configs: 0,
  }

  // 统计各类文件
  const fileCategories = {
    "app/**/page.tsx": "pages",
    "app/**/layout.tsx": "pages",
    "components/**/*.tsx": "components",
    "services/**/*.ts": "services",
    "hooks/**/*.ts": "hooks",
    "types/**/*.ts": "types",
    "*.config.*": "configs",
  }

  return stats
}

// 项目文件清单
export const PROJECT_MANIFEST = {
  // 配置文件 (8个)
  configs: [
    "package.json",
    "next.config.mjs",
    "tsconfig.json",
    "tailwind.config.ts",
    "postcss.config.mjs",
    "vercel.json",
    ".eslintrc.json",
    "prettier.config.js",
  ],

  // 核心页面 (45个)
  pages: [
    "app/page.tsx",
    "app/layout.tsx",
    "app/RootLayoutClient.tsx",
    "app/(auth)/login/page.tsx",
    "app/(auth)/register/page.tsx",
    "app/(auth)/forgot-password/page.tsx",
    "app/(auth)/reset-password/page.tsx",
    "app/(auth)/layout.tsx",
    "app/admin/page.tsx",
    "app/admin/layout.tsx",
    "app/admin/users/page.tsx",
    "app/admin/roles/page.tsx",
    "app/admin/settings/page.tsx",
    "app/admin/logs/page.tsx",
    "app/admin/backup/page.tsx",
    "app/admin/notifications/page.tsx",
    "app/admin/deployment-check/page.tsx",
    "app/admin/certifications/page.tsx",
    "app/admin/api-config/page.tsx",
    "app/admin/api-usage/page.tsx",
    "app/admin/tasks/page.tsx",
    "app/admin/monitoring/page.tsx",
    "app/admin/guide/page.tsx",
    "app/admin/ai-models/page.tsx",
    "app/admin/ai-models/test/page.tsx",
    "app/admin/translations/page.tsx",
    "app/patients/page.tsx",
    "app/patients/[id]/page.tsx",
    "app/patients/records/page.tsx",
    "app/patients/followup/page.tsx",
    "app/patients/groups/page.tsx",
    "app/ai-diagnosis/page.tsx",
    "app/ai-diagnosis/records/page.tsx",
    "app/ai-model/page.tsx",
    "app/ai-model/training/page.tsx",
    "app/ai-model/performance/page.tsx",
    "app/ai-model/deployment/page.tsx",
    "app/clinical-decision/page.tsx",
    "app/clinical-decision/treatments/page.tsx",
    "app/clinical-decision/guidelines/page.tsx",
    "app/clinical-decision/medications/page.tsx",
    "app/medications/page.tsx",
    "app/medications/prescriptions/page.tsx",
    "app/medications/interactions/page.tsx",
    "app/medications/inventory/page.tsx",
  ],

  // 组件文件 (180+个)
  components: [
    // UI基础组件 (40+个)
    "components/ui/button.tsx",
    "components/ui/card.tsx",
    "components/ui/input.tsx",
    "components/ui/dialog.tsx",
    "components/ui/dropdown-menu.tsx",
    "components/ui/tabs.tsx",
    "components/ui/table.tsx",
    "components/ui/form.tsx",
    "components/ui/select.tsx",
    "components/ui/checkbox.tsx",
    // ... 更多UI组件

    // 业务组件 (140+个)
    "components/auth/LoginForm.tsx",
    "components/auth/RegisterForm.tsx",
    "components/patients/PatientList.tsx",
    "components/ai-diagnosis/DiagnosisForm.tsx",
    "components/admin/AdminDashboard.tsx",
    // ... 更多业务组件
  ],

  // 服务文件 (25+个)
  services: [
    "services/auth-service.ts",
    "services/patient-service.ts",
    "services/ai-service.ts",
    "services/medical-service.ts",
    // ... 更多服务
  ],

  // 工具和钩子 (30+个)
  hooks: [
    "hooks/use-auth.ts",
    "hooks/use-mobile.tsx",
    "hooks/use-toast.ts",
    // ... 更多钩子
  ],

  // 类型定义 (20+个)
  types: [
    "types/auth.ts",
    "types/patient.ts",
    "types/medical.ts",
    // ... 更多类型
  ],
}
