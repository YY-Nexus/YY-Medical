# MediNexus³ 命名规范

## 文件命名

1. **组件文件**: 使用 PascalCase (大驼峰命名法)
   - 例如: `Button.tsx`, `PatientList.tsx`, `MedicalRecordViewer.tsx`

2. **非组件 TypeScript 文件**: 使用 camelCase (小驼峰命名法)
   - 例如: `apiClient.ts`, `useAuth.ts`, `patientService.ts`

3. **常量和配置文件**: 使用 kebab-case (短横线命名法)
   - 例如: `api-endpoints.ts`, `route-constants.ts`

4. **类型定义文件**: 使用 PascalCase 并以 `.types.ts` 结尾
   - 例如: `Patient.types.ts`, `MedicalRecord.types.ts`

## 组件命名

1. **组件名称**: 使用 PascalCase，名称应当清晰描述组件功能
   - 例如: `PatientCard`, `MedicalHistoryTimeline`, `DiagnosisForm`

2. **页面组件**: 使用 PascalCase，以 `Page` 结尾
   - 例如: `DashboardPage`, `PatientDetailsPage`, `SettingsPage`

3. **布局组件**: 使用 PascalCase，以 `Layout` 结尾
   - 例如: `MainLayout`, `DashboardLayout`, `AuthLayout`

4. **HOC (高阶组件)**: 使用 PascalCase，以 `with` 开头
   - 例如: `withAuth`, `withErrorBoundary`, `withAnalytics`

## 导出规范

1. **默认导出**: 每个文件只应有一个默认导出，且导出名称应与文件名匹配
   \`\`\`tsx
   // Button.tsx
   export default function Button() { ... }
   \`\`\`

2. **命名导出**: 组件库或工具函数集合应使用命名导出
   \`\`\`tsx
   // buttons.tsx
   export function PrimaryButton() { ... }
   export function SecondaryButton() { ... }
   \`\`\`

3. **类型导出**: 类型应使用命名导出
   \`\`\`tsx
   // Patient.types.ts
   export interface Patient { ... }
   export type PatientStatus = 'active' | 'inactive' | 'archived';
   \`\`\`

4. **重导出**: 使用桶文件 (barrel files) 简化导入
   \`\`\`tsx
   // components/index.ts
   export * from './Button';
   export * from './Card';
   export * from './Input';
   \`\`\`

## 导入规范

1. **导入顺序**:
   - 第三方库导入
   - 绝对路径导入 (如 `@/components`)
   - 相对路径导入
   - 类型导入
   - CSS/SCSS 导入

2. **分组导入**:
   \`\`\`tsx
   // 第三方库
   import { useState, useEffect } from 'react';
   import { useRouter } from 'next/router';
   
   // 绝对路径导入
   import { Button } from '@/components/ui';
   import { useAuth } from '@/hooks';
   
   // 相对路径导入
   import { PatientCard } from '../PatientCard';
   
   // 类型导入
   import type { Patient } from '@/types';
   
   // 样式导入
   import './styles.css';
   \`\`\`

## 修复现有问题的步骤

1. 确保组件文件名与默认导出的组件名称一致
2. 使用 ESLint 规则强制执行命名约定
3. 创建桶文件简化导入路径
4. 重构不一致的组件名称和导出
