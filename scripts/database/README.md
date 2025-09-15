# 言语云³医疗AI系统 - 数据库脚本

## 概述

本目录包含言语云³医疗AI系统的数据库初始化和维护脚本，用于创建数据库表结构、插入初始数据以及执行日常维护任务。

## 文件结构

\`\`\`
scripts/database/
├── create-tables.sql           # 数据库表结构创建脚本
├── insert-initial-data.sql     # 初始数据插入脚本
├── maintenance-procedures.sql  # 维护存储过程
├── run-sql-scripts.ts         # TypeScript脚本执行工具
├── init-database.sh           # Bash初始化脚本
├── package.json               # Node.js依赖配置
└── README.md                  # 本文档
\`\`\`

## 快速开始

### 1. 环境准备

确保系统已安装以下软件：
- Node.js (v16+)
- PostgreSQL (v12+)
- npm 或 yarn

### 2. 配置环境变量

在项目根目录创建 `.env` 文件：

\`\`\`bash
# 数据库配置
DB_HOST=localhost
DB_PORT=5432
DB_NAME=yyc3_med
DB_USER=postgres
DB_PASSWORD=your_password
DB_SSL=false
\`\`\`

### 3. 执行初始化

#### 方法一：使用 Bash 脚本（推荐）

\`\`\`bash
# 基本初始化
./init-database.sh

# 创建数据库并初始化
./init-database.sh --create-db

# 备份现有数据后初始化
./init-database.sh --backup --force

# 只创建表结构，跳过数据插入
./init-database.sh --skip-data
\`\`\`

#### 方法二：使用 Node.js 脚本

\`\`\`bash
# 安装依赖
npm install

# 执行初始化
npm run init

# 或直接运行
ts-node run-sql-scripts.ts
\`\`\`

## 数据库结构

### 核心表

| 表名 | 描述 | 主要字段 |
|------|------|----------|
| `users` | 用户表 | id, username, email, role, department |
| `patients` | 患者表 | id, patient_id, full_name, gender, date_of_birth |
| `medical_records` | 医疗记录表 | id, patient_id, doctor_id, diagnosis, treatment_plan |
| `ai_diagnosis_records` | AI诊断记录表 | id, medical_record_id, ai_model_name, diagnosis_result |
| `medical_images` | 医疗图像表 | id, medical_record_id, file_path, modality |
| `certifications` | 认证证书表 | id, user_id, certificate_type, verification_status |
| `medications` | 药物信息表 | id, drug_name, indications, contraindications |
| `prescriptions` | 处方表 | id, patient_id, doctor_id, medications |
| `appointments` | 预约表 | id, patient_id, doctor_id, appointment_date |
| `research_projects` | 研究项目表 | id, project_name, principal_investigator_id |

### 系统表

| 表名 | 描述 |
|------|------|
| `system_logs` | 系统操作日志 |
| `notifications` | 用户通知 |
| `system_settings` | 系统配置 |
| `maintenance_tasks` | 维护任务记录 |

## 维护存储过程

系统提供了多个维护存储过程：

### 数据清理
\`\`\`sql
SELECT cleanup_old_data();
\`\`\`
清理90天前的系统日志和30天前的已读通知。

### 性能优化
\`\`\`sql
SELECT optimize_database_performance();
\`\`\`
更新统计信息、重建索引、清理死元组。

### 数据完整性检查
\`\`\`sql
SELECT * FROM check_patient_data_integrity();
\`\`\`
检查患者数据、医疗记录、预约的完整性。

### AI诊断统计
\`\`\`sql
SELECT * FROM get_ai_diagnosis_statistics();
\`\`\`
获取AI诊断模型的准确性和性能统计。

### 用户活跃度统计
\`\`\`sql
SELECT * FROM get_user_activity_statistics(30);
\`\`\`
获取最近30天的用户活跃度统计。

### 数据库健康检查
\`\`\`sql
SELECT * FROM database_health_check();
\`\`\`
全面的数据库健康状态检查。

### 患者数据导出
\`\`\`sql
SELECT export_patient_data('patient-uuid-here');
\`\`\`
导出指定患者的完整医疗数据。

## 脚本参数

### init-database.sh 参数

| 参数 | 描述 |
|------|------|
| `--help` | 显示帮助信息 |
| `--create-db` | 如果数据库不存在则创建 |
| `--skip-data` | 跳过初始数据插入 |
| `--force` | 强制执行（跳过确认） |
| `--backup` | 执行前创建备份 |
| `--no-verify` | 跳过安装验证 |

### run-sql-scripts.ts 参数

| 参数 | 描述 |
|------|------|
| `--help` | 显示帮助信息 |
| `--create-db` | 创建数据库 |
| `--skip-data` | 跳过数据插入 |
| `--force` | 强制执行 |

## 使用示例

### 1. 全新安装

\`\`\`bash
# 创建数据库并完整初始化
./init-database.sh --create-db

# 验证安装
psql -h localhost -U postgres -d yyc3_med -c "SELECT COUNT(*) FROM users;"
\`\`\`

### 2. 开发环境重置

\`\`\`bash
# 备份现有数据
./init-database.sh --backup

# 重新初始化（保留数据库）
./init-database.sh --force
\`\`\`

### 3. 生产环境部署

\`\`\`bash
# 只创建表结构
./init-database.sh --skip-data --no-verify

# 手动导入生产数据
psql -h localhost -U postgres -d yyc3_med < production_data.sql
\`\`\`

### 4. 定期维护

\`\`\`bash
# 执行数据清理
psql -h localhost -U postgres -d yyc3_med -c "SELECT cleanup_old_data();"

# 性能优化
psql -h localhost -U postgres -d yyc3_med -c "SELECT optimize_database_performance();"

# 健康检查
psql -h localhost -U postgres -d yyc3_med -c "SELECT * FROM database_health_check();"
\`\`\`

## 故障排除

### 常见问题

1. **连接失败**
   \`\`\`
   错误: could not connect to server
   \`\`\`
   - 检查PostgreSQL服务是否运行
   - 验证连接参数（主机、端口、用户名、密码）
   - 检查防火墙设置

2. **权限不足**
   \`\`\`
   错误: permission denied for database
   \`\`\`
   - 确保数据库用户有足够权限
   - 使用超级用户执行初始化

3. **表已存在**
   \`\`\`
   错误: relation "users" already exists
   \`\`\`
   - 使用 `--force` 参数强制执行
   - 或手动删除现有表

4. **依赖缺失**
   \`\`\`
   错误: ts-node: command not found
   \`\`\`
   - 安装TypeScript和ts-node：`npm install -g typescript ts-node`
   - 或使用npx：`npx ts-node run-sql-scripts.ts`

### 日志查看

系统操作日志存储在 `system_logs` 表中：

\`\`\`sql
-- 查看最近的错误日志
SELECT * FROM system_logs 
WHERE status = 'failure' 
ORDER BY created_at DESC 
LIMIT 10;

-- 查看数据库操作日志
SELECT * FROM system_logs 
WHERE action LIKE '%database%' 
ORDER BY created_at DESC;
\`\`\`

## 备份和恢复

### 创建备份

\`\`\`bash
# 使用pg_dump创建备份
pg_dump -h localhost -U postgres yyc3_med > backup_$(date +%Y%m%d).sql

# 或使用脚本自动备份
./init-database.sh --backup
\`\`\`

### 恢复数据

\`\`\`bash
# 从备份恢复
psql -h localhost -U postgres yyc3_med < backup_20240115.sql
\`\`\`

## 性能调优

### 索引优化

系统已创建必要的索引，如需额外优化：

\`\`\`sql
-- 分析查询性能
EXPLAIN ANALYZE SELECT * FROM medical_records WHERE patient_id = 'uuid';

-- 创建复合索引
CREATE INDEX idx_medical_records_patient_date ON medical_records(patient_id, visit_date);
\`\`\`

### 分区表

对于大数据量场景，考虑对以下表进行分区：

- `system_logs` - 按时间分区
- `medical_images` - 按时间或大小分区
- `ai_diagnosis_records` - 按时间分区

## 安全注意事项

1. **密码安全**
   - 使用强密码
   - 定期更换数据库密码
   - 不要在代码中硬编码密码

2. **网络安全**
   - 限制数据库访问IP
   - 使用SSL连接
   - 配置防火墙规则

3. **权限控制**
   - 为不同角色创建专用数据库用户
   - 遵循最小权限原则
   - 定期审查用户权限

## 联系支持

如遇到问题，请联系：
- 技术支持：tech-support@yyc3med.com
- 开发团队：dev-team@yyc3med.com
- 文档反馈：docs@yyc3med.com

---

**言语云³医疗AI系统** - 让AI赋能医疗，让健康触手可及
\`\`\`

现在我已经完整创建了数据库相关的所有文件，并统一整理到 `scripts/database/` 目录中。让我更新主项目的 package.json 来添加数据库相关的脚本命令：

```json file="package.json"
[v0-no-op-code-block-prefix]{
  "name": "my-v0-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:init": "cd scripts/database && ./init-database.sh",
    "db:init:create": "cd scripts/database && ./init-database.sh --create-db",
    "db:init:schema": "cd scripts/database && ./init-database.sh --skip-data",
    "db:backup": "cd scripts/database && ./init-database.sh --backup",
    "db:maintenance": "cd scripts/database && npm run maintenance",
    "db:health-check": "cd scripts/database && npm run health-check",
    "db:install-deps": "cd scripts/database && npm install"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.9.1",
    "@radix-ui/react-accordion": "1.2.2",
    "@radix-ui/react-alert-dialog": "1.1.4",
    "@radix-ui/react-aspect-ratio": "1.1.1",
    "@radix-ui/react-avatar": "1.1.2",
    "@radix-ui/react-checkbox": "1.1.3",
    "@radix-ui/react-collapsible": "1.1.2",
    "@radix-ui/react-context-menu": "2.2.4",
    "@radix-ui/react-dialog": "1.1.4",
    "@radix-ui/react-dropdown-menu": "2.1.4",
    "@radix-ui/react-hover-card": "1.1.4",
    "@radix-ui/react-label": "2.1.1",
    "@radix-ui/react-menubar": "1.1.4",
    "@radix-ui/react-navigation-menu": "1.2.3",
    "@radix-ui/react-popover": "1.1.4",
    "@radix-ui/react-progress": "1.1.1",
    "@radix-ui/react-radio-group": "1.2.2",
    "@radix-ui/react-scroll-area": "1.2.2",
    "@radix-ui/react-select": "2.1.4",
    "@radix-ui/react-separator": "1.1.1",
    "@radix-ui/react-slider": "1.2.2",
    "@radix-ui/react-slot": "1.1.1",
    "@radix-ui/react-switch": "1.1.2",
    "@radix-ui/react-tabs": "1.1.2",
    "@radix-ui/react-toast": "1.2.4",
    "@radix-ui/react-toggle": "1.1.1",
    "@radix-ui/react-toggle-group": "1.1.1",
    "@radix-ui/react-tooltip": "1.1.6",
    "@vercel/analytics": "1.3.1",
    "autoprefixer": "^10.4.20",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "1.0.4",
    "date-fns": "4.1.0",
    "embla-carousel-react": "8.5.1",
    "geist": "^1.3.1",
    "input-otp": "1.4.1",
    "lucide-react": "^0.454.0",
    "next": "14.2.25",
    "next-themes": "^0.4.4",
    "react": "^19",
    "react-day-picker": "9.8.0",
    "react-dom": "^19",
    "react-hook-form": "^7.54.1",
    "react-resizable-panels": "^2.1.7",
    "recharts": "2.15.0",
    "sonner": "^1.7.1",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.6",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8.5",
    "tailwindcss": "^3.4.17",
    "typescript": "5.7.3"
  }
}
