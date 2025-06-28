#!/usr/bin/env node

const currentNodeVersion = process.versions.node
const semver = currentNodeVersion.split(".")
const major = Number.parseInt(semver[0], 10)

if (major < 22) {
  console.error(
    "您正在使用 Node.js " +
      currentNodeVersion +
      ".\n" +
      "此项目需要 Node.js 22 或更高版本。\n" +
      "请更新您的 Node.js 版本。\n",
  )
  process.exit(1)
}
