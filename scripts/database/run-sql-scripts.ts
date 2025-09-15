#!/usr/bin/env node

/**
 * 言语云³医疗AI系统 - 数据库脚本执行工具
 * YYC³-Med Database Script Runner
 * 创建时间: 2024-01-15
 * 版本: v1.0.0
 */

import { readFileSync, existsSync } from "fs"
import { join, resolve } from "path"
import { Client } from "pg"
import * as dotenv from "dotenv"

// 加载环境变量
dotenv.config()

interface DatabaseConfig {
  host: string
  port: number
  database: string
  user: string
  password: string
  ssl?: boolean
}

interface ScriptResult {
  filename: string
  success: boolean
  duration: number
  error?: string
  rowsAffected?: number
}

class DatabaseScriptRunner {
  private client: Client
  private config: DatabaseConfig

  constructor(config: DatabaseConfig) {
    this.config = config
    this.client = new Client({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: config.ssl ? { rejectUnauthorized: false } : false,
    })
  }

  /**
   * 连接到数据库
   */
  async connect(): Promise<void> {
    try {
      await this.client.connect()
      console.log("✅ 数据库连接成功")

      // 测试连接
      const result = await this.client.query("SELECT version()")
      console.log(`📊 PostgreSQL版本: ${result.rows[0].version.split(" ")[1]}`)
    } catch (error) {
      console.error("❌ 数据库连接失败:", error)
      throw error
    }
  }

  /**
   * 断开数据库连接
   */
  async disconnect(): Promise<void> {
    try {
      await this.client.end()
      console.log("✅ 数据库连接已关闭")
    } catch (error) {
      console.error("❌ 关闭数据库连接失败:", error)
    }
  }

  /**
   * 执行单个SQL脚本
   */
  async executeScript(scriptPath: string): Promise<ScriptResult> {
    const filename = scriptPath.split("/").pop() || scriptPath
    const startTime = Date.now()

    try {
      console.log(`🚀 开始执行脚本: ${filename}`)

      if (!existsSync(scriptPath)) {
        throw new Error(`脚本文件不存在: ${scriptPath}`)
      }

      const sqlContent = readFileSync(scriptPath, "utf-8")

      // 分割SQL语句（简单的分割，基于分号）
      const statements = sqlContent
        .split(";")
        .map((stmt) => stmt.trim())
        .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"))

      let totalRowsAffected = 0

      // 开始事务
      await this.client.query("BEGIN")

      try {
        for (const statement of statements) {
          if (statement.trim()) {
            const result = await this.client.query(statement)
            totalRowsAffected += result.rowCount || 0
          }
        }

        // 提交事务
        await this.client.query("COMMIT")

        const duration = Date.now() - startTime
        console.log(`✅ 脚本执行成功: ${filename} (${duration}ms, 影响行数: ${totalRowsAffected})`)

        return {
          filename,
          success: true,
          duration,
          rowsAffected: totalRowsAffected,
        }
      } catch (error) {
        // 回滚事务
        await this.client.query("ROLLBACK")
        throw error
      }
    } catch (error) {
      const duration = Date.now() - startTime
      const errorMessage = error instanceof Error ? error.message : String(error)

      console.error(`❌ 脚本执行失败: ${filename} (${duration}ms)`)
      console.error(`   错误信息: ${errorMessage}`)

      return {
        filename,
        success: false,
        duration,
        error: errorMessage,
      }
    }
  }

  /**
   * 批量执行SQL脚本
   */
  async executeScripts(scriptPaths: string[]): Promise<ScriptResult[]> {
    const results: ScriptResult[] = []

    console.log(`📋 准备执行 ${scriptPaths.length} 个脚本`)

    for (const scriptPath of scriptPaths) {
      const result = await this.executeScript(scriptPath)
      results.push(result)

      // 如果脚本执行失败，询问是否继续
      if (!result.success) {
        console.log("⚠️  脚本执行失败，是否继续执行剩余脚本？")
        // 在实际使用中，可以添加用户输入处理
        // 这里默认继续执行
      }
    }

    return results
  }

  /**
   * 检查数据库是否存在
   */
  async checkDatabaseExists(): Promise<boolean> {
    try {
      const result = await this.client.query("SELECT 1 FROM pg_database WHERE datname = $1", [this.config.database])
      return result.rows.length > 0
    } catch (error) {
      return false
    }
  }

  /**
   * 创建数据库（如果不存在）
   */
  async createDatabaseIfNotExists(): Promise<void> {
    // 连接到默认数据库来创建新数据库
    const defaultClient = new Client({
      ...this.config,
      database: "postgres",
    })

    try {
      await defaultClient.connect()

      const exists = await defaultClient.query("SELECT 1 FROM pg_database WHERE datname = $1", [this.config.database])

      if (exists.rows.length === 0) {
        console.log(`🔨 创建数据库: ${this.config.database}`)
        await defaultClient.query(`CREATE DATABASE "${this.config.database}"`)
        console.log(`✅ 数据库创建成功: ${this.config.database}`)
      } else {
        console.log(`📊 数据库已存在: ${this.config.database}`)
      }
    } catch (error) {
      console.error("❌ 创建数据库失败:", error)
      throw error
    } finally {
      await defaultClient.end()
    }
  }

  /**
   * 获取数据库表列表
   */
  async getTables(): Promise<string[]> {
    try {
      const result = await this.client.query(`
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
        ORDER BY tablename
      `)
      return result.rows.map((row) => row.tablename)
    } catch (error) {
      console.error("❌ 获取表列表失败:", error)
      return []
    }
  }

  /**
   * 检查表是否存在
   */
  async tableExists(tableName: string): Promise<boolean> {
    try {
      const result = await this.client.query(
        `
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = $1
      `,
        [tableName],
      )
      return result.rows.length > 0
    } catch (error) {
      return false
    }
  }

  /**
   * 获取表的行数
   */
  async getTableRowCount(tableName: string): Promise<number> {
    try {
      const result = await this.client.query(`SELECT COUNT(*) as count FROM "${tableName}"`)
      return Number.parseInt(result.rows[0].count)
    } catch (error) {
      return 0
    }
  }

  /**
   * 生成执行报告
   */
  generateReport(results: ScriptResult[]): void {
    console.log("\n📊 执行报告")
    console.log("=".repeat(50))

    const successful = results.filter((r) => r.success)
    const failed = results.filter((r) => !r.success)

    console.log(`✅ 成功: ${successful.length} 个脚本`)
    console.log(`❌ 失败: ${failed.length} 个脚本`)

    const totalDuration = results.reduce((sum, r) => sum + r.duration, 0)
    console.log(`⏱️  总耗时: ${totalDuration}ms`)

    const totalRowsAffected = results.reduce((sum, r) => sum + (r.rowsAffected || 0), 0)
    console.log(`📈 总影响行数: ${totalRowsAffected}`)

    if (failed.length > 0) {
      console.log("\n❌ 失败的脚本:")
      failed.forEach((result) => {
        console.log(`   - ${result.filename}: ${result.error}`)
      })
    }

    console.log("=".repeat(50))
  }
}

/**
 * 主执行函数
 */
async function main() {
  console.log("🏥 言语云³医疗AI系统 - 数据库初始化工具")
  console.log("=".repeat(60))

  // 从环境变量或默认值获取数据库配置
  const config: DatabaseConfig = {
    host: process.env.DB_HOST || "localhost",
    port: Number.parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME || "yyc3_med",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    ssl: process.env.DB_SSL === "true",
  }

  console.log(`🔗 连接配置: ${config.user}@${config.host}:${config.port}/${config.database}`)

  const runner = new DatabaseScriptRunner(config)

  try {
    // 连接数据库
    await runner.connect()

    // 获取脚本目录
    const scriptsDir = resolve(__dirname)
    const scriptFiles = ["create-tables.sql", "insert-initial-data.sql", "maintenance-procedures.sql"]

    // 检查脚本文件是否存在
    const existingScripts = scriptFiles.filter((file) => existsSync(join(scriptsDir, file)))

    if (existingScripts.length === 0) {
      console.log("⚠️  未找到SQL脚本文件")
      return
    }

    console.log(`📁 找到 ${existingScripts.length} 个脚本文件`)

    // 执行脚本
    const scriptPaths = existingScripts.map((file) => join(scriptsDir, file))
    const results = await runner.executeScripts(scriptPaths)

    // 生成报告
    runner.generateReport(results)

    // 显示数据库状态
    console.log("\n📊 数据库状态:")
    const tables = await runner.getTables()
    console.log(`📋 表数量: ${tables.length}`)

    for (const table of tables.slice(0, 10)) {
      // 只显示前10个表
      const count = await runner.getTableRowCount(table)
      console.log(`   - ${table}: ${count} 行`)
    }

    if (tables.length > 10) {
      console.log(`   ... 还有 ${tables.length - 10} 个表`)
    }
  } catch (error) {
    console.error("❌ 执行失败:", error)
    process.exit(1)
  } finally {
    await runner.disconnect()
  }
}

/**
 * 命令行参数处理
 */
function parseArguments() {
  const args = process.argv.slice(2)
  const options = {
    help: false,
    createDb: false,
    skipData: false,
    force: false,
  }

  for (const arg of args) {
    switch (arg) {
      case "--help":
      case "-h":
        options.help = true
        break
      case "--create-db":
        options.createDb = true
        break
      case "--skip-data":
        options.skipData = true
        break
      case "--force":
        options.force = true
        break
    }
  }

  return options
}

/**
 * 显示帮助信息
 */
function showHelp() {
  console.log(`
🏥 言语云³医疗AI系统 - 数据库脚本执行工具

用法: node run-sql-scripts.ts [选项]

选项:
  -h, --help        显示帮助信息
  --create-db       如果数据库不存在则创建
  --skip-data       跳过初始数据插入
  --force           强制执行（跳过确认）

环境变量:
  DB_HOST           数据库主机 (默认: localhost)
  DB_PORT           数据库端口 (默认: 5432)
  DB_NAME           数据库名称 (默认: yyc3_med)
  DB_USER           数据库用户 (默认: postgres)
  DB_PASSWORD       数据库密码 (默认: password)
  DB_SSL            是否使用SSL (默认: false)

示例:
  # 基本执行
  npm run db:init
  
  # 创建数据库并初始化
  npm run db:init -- --create-db
  
  # 只创建表结构，跳过数据
  npm run db:init -- --skip-data
  
  # 强制执行所有脚本
  npm run db:init -- --force
`)
}

// 如果直接运行此脚本
if (require.main === module) {
  const options = parseArguments()

  if (options.help) {
    showHelp()
    process.exit(0)
  }

  main().catch((error) => {
    console.error("💥 程序异常退出:", error)
    process.exit(1)
  })
}

export { DatabaseScriptRunner, type DatabaseConfig, type ScriptResult }
