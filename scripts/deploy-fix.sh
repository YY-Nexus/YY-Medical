#!/bin/bash

# 部署修复脚本
echo "🔧 开始修复部署问题..."

# 1. 清理缓存
echo "📦 清理缓存..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .vercel

# 2. 重新安装依赖
echo "📥 重新安装依赖..."
npm install --legacy-peer-deps

# 3. 运行修复脚本
echo "🛠️ 运行修复脚本..."
npx ts-node scripts/fix-deployment.ts

# 4. 测试构建
echo "🏗️ 测试构建..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    echo "🚀 现在可以部署到Vercel了"
    echo ""
    echo "部署命令："
    echo "vercel --prod"
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi
