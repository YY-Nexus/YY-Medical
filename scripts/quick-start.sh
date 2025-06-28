#!/bin/bash

echo "⚡ 快速启动 - Node.js 23.6.0"
echo "============================="

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 首次运行，安装依赖..."
    npm install --legacy-peer-deps
fi

# 检查环境变量文件
if [ ! -f ".env.local" ]; then
    echo "📝 创建环境变量文件..."
    cp .env.local.example .env.local
    echo "⚠️  请编辑 .env.local 文件"
fi

# 启动开发服务器
echo "🚀 启动开发服务器..."
npm run dev
