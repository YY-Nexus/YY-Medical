# 言语云³医疗AI系统

> 智能诊疗、精准医疗、安全可信的医疗AI平台

## 🚀 快速开始

### 系统要求

- Node.js >= 18.17.0
- npm >= 9.0.0
- Git >= 2.30.0

### 安装步骤

1. **克隆项目**
\`\`\`bash
git clone <repository-url>
cd yanyu-medical-ai-system
\`\`\`

2. **运行设置脚本**
\`\`\`bash
chmod +x scripts/setup-dev.sh
./scripts/setup-dev.sh
\`\`\`

3. **配置环境变量**
\`\`\`bash
cp .env.local.example .env.local

# 编辑 .env.local 文件，填入正确的配置值

\`\`\`

4. **启动开发服务器**
\`\`\`bash
npm run dev
\`\`\`

### 手动安装

如果自动脚本失败，可以手动执行：

\`\`\`bash

# 安装依赖

npm install

# 检查依赖

node scripts/check-dependencies.js

# 类型检查

npm run type-check

# 启动开发服务器

npm run dev
\`\`\`

## 📁 项目结构

\`\`\`
yanyu-medical-ai-system/
├── app/                    # Next.js 13+ App Router
│   ├── (auth)/            # 认证相关页面
│   ├── admin/             # 管理后台
│   ├── api/               # API路由
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React组件
│   ├── ui/                # 基础UI组件
│   ├── auth/              # 认证组件
│   ├── medical-records/   # 医疗记录组件
│   └── ...
├── lib/                   # 工具库
├── hooks/                 # 自定义Hooks
├── services/              # 服务层
├── store/                 # 状态管理
├── types/                 # TypeScript类型定义
├── utils/                 # 工具函数
├── public/                # 静态资源
└── scripts/               # 脚本文件
\`\`\`

## 🛠️ 开发命令

\`\`\`bash

# 开发

npm run dev              # 启动开发服务器
npm run build            # 构建生产版本
npm run start            # 启动生产服务器

# 代码质量

npm run lint             # 代码检查
npm run lint:fix         # 自动修复代码问题
npm run type-check       # TypeScript类型检查

# 测试

npm run test             # 运行测试
npm run test:watch       # 监听模式运行测试

# 文档

npm run storybook        # 启动组件文档
npm run build-storybook  # 构建组件文档

# 工具

npm run clean            # 清理缓存
npm run install:clean    # 重新安装依赖
npm run analyze          # 分析打包大小
\`\`\`

## 🔧 配置说明

### 环境变量

主要环境变量说明：

- `NEXT_PUBLIC_APP_URL`: 应用访问地址
- `DATABASE_URL`: 数据库连接字符串
- `JWT_SECRET`: JWT密钥
- `OPENAI_API_KEY`: OpenAI API密钥
- `DEEPSEEK_API_KEY`: DeepSeek API密钥

### 数据库设置

1. 安装PostgreSQL
2. 创建数据库：`yanyu_medical`
3. 配置 `DATABASE_URL` 环境变量
4. 运行数据库迁移（如果有）

### Redis设置（可选）

1. 安装Redis
2. 配置 `REDIS_URL` 环境变量
3. 用于缓存和会话存储

## 🏥 功能模块

### 核心功能

- 🔐 用户认证与授权
- 📋 医疗记录管理
- 🤖 AI智能诊断
- 📊 数据分析与报告
- 👥 患者管理
- 💊 药物管理

### 高级功能

- 🔒 安全与合规
- 📱 移动端支持
- 🌐 多语言支持
- 📈 性能监控
- 🔄 数据同步
- 📋 审计日志

## 🔒 安全特性

- HIPAA合规
- 端到端加密
- 角色权限控制
- 审计日志
- 安全认证
- 数据备份

## 📱 移动端支持

- 响应式设计
- PWA支持
- 离线功能
- 推送通知
- 生物识别认证

## 🌐 国际化

支持多语言：

- 中文（简体）
- 英文
- 自动翻译功能

## 📊 监控与分析

- 性能监控
- 错误追踪
- 用户行为分析
- 系统健康检查

## 🚀 部署

### Vercel部署

1. 连接GitHub仓库
2. 配置环境变量
3. 自动部署

### 手动部署

\`\`\`bash

# 构建

npm run build

# 启动

npm run start
\`\`\`

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

MIT License

## 📞 支持

如有问题，请联系：

- 邮箱: <admin@0379.email>
- 文档: [项目文档](./docs/)
- Issues: [GitHub Issues](./issues)
