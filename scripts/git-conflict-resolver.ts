#!/usr/bin/env node

import { execSync } from "child_process"
import fs from "fs"
import path from "path"

class GitConflictResolver {
  private projectRoot: string

  constructor() {
    this.projectRoot = process.cwd()
  }

  async resolveConflicts(): Promise<void> {
    console.log("🔧 开始解决Git操作冲突...")

    try {
      // 检查Git状态
      const gitStatus = this.getGitStatus()
      console.log("📊 Git状态:", gitStatus)

      // 清理Git锁文件
      await this.cleanGitLocks()

      // 重置Git状态
      await this.resetGitState()

      // 清理工作区
      await this.cleanWorkspace()

      console.log("✅ Git冲突解决完成!")
    } catch (error) {
      console.error("❌ Git冲突解决失败:", error)
      throw error
    }
  }

  private getGitStatus(): string {
    try {
      return execSync("git status --porcelain", { encoding: "utf8" })
    } catch (error) {
      return "Git状态检查失败"
    }
  }

  private async cleanGitLocks(): Promise<void> {
    const lockFiles = [
      ".git/index.lock",
      ".git/HEAD.lock",
      ".git/config.lock",
      ".git/refs/heads/main.lock",
      ".git/refs/heads/master.lock",
    ]

    for (const lockFile of lockFiles) {
      const lockPath = path.join(this.projectRoot, lockFile)
      if (fs.existsSync(lockPath)) {
        console.log(`🗑️ 删除锁文件: ${lockFile}`)
        fs.unlinkSync(lockPath)
      }
    }
  }

  private async resetGitState(): Promise<void> {
    try {
      // 中止任何进行中的操作
      try {
        execSync("git merge --abort", { stdio: "ignore" })
      } catch {}

      try {
        execSync("git rebase --abort", { stdio: "ignore" })
      } catch {}

      try {
        execSync("git cherry-pick --abort", { stdio: "ignore" })
      } catch {}

      // 清理暂存区
      execSync("git reset HEAD", { stdio: "ignore" })

      console.log("🔄 Git状态重置完成")
    } catch (error) {
      console.warn("⚠️ Git状态重置部分失败，继续执行...")
    }
  }

  private async cleanWorkspace(): Promise<void> {
    try {
      // 清理未跟踪的文件
      execSync("git clean -fd", { stdio: "ignore" })
      console.log("🧹 工作区清理完成")
    } catch (error) {
      console.warn("⚠️ 工作区清理失败，继续执行...")
    }
  }
}

// 执行Git冲突解决
if (require.main === module) {
  const resolver = new GitConflictResolver()
  resolver.resolveConflicts().catch(console.error)
}

export { GitConflictResolver }
