#!/bin/bash

echo "🚀 言语云³医疗AI系统 - Node.js 23.6.0 环境设置"
echo "================================================"

# 显示当前版本信息
echo "📋 当前环境信息:"
echo "Node.js版本: $(node -v)"
echo "npm版本: $(npm -v)"
echo "操作系统: $(uname -s)"

# 检查npm版本并升级（如果需要）
npm_version=$(npm -v)
echo "✅ npm版本: $npm_version"

# 设置npm配置优化
echo "⚙️ 优化npm配置..."
npm config set fund false
npm config set audit-level moderate
npm config set progress true

# 清理可能的缓存问题
echo "🧹 清理npm缓存..."
npm cache clean --force

# 删除旧的依赖
echo "🗑️ 清理旧依赖..."
rm -rf node_modules
rm -f package-lock.json

# 安装依赖（使用最新的npm特性）
echo "📦 安装项目依赖..."
npm install --legacy-peer-deps

# 检查安装结果
echo "🔍 验证安装..."
if [ -d "node_modules" ]; then
    echo "✅ 依赖安装成功"
else
    echo "❌ 依赖安装失败"
    exit 1
fi

# 创建环境变量文件
if [ ! -f .env.local ]; then
    echo "📝 创建环境变量文件..."
    cp .env.local.example .env.local
    echo "⚠️  请编辑 .env.local 文件，填入正确的配置值"
fi

# 运行类型检查
echo "🔍 TypeScript类型检查..."
npm run type-check

echo ""
echo "✅ Node.js 23.6.0 环境设置完成！"
echo ""
echo "🚀 启动开发服务器:"
echo "   npm run dev"
echo ""
echo "🎯 访问地址:"
echo "   http://localhost:3000"
