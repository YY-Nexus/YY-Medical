#!/bin/bash

echo "🚀 言语云³医疗AI系统 - 开发环境设置"
echo "========================================"

# 检查Node.js版本
echo "📋 检查系统要求..."
node_version=$(node -v | cut -d'v' -f2)
required_version="18.17.0"

if [ "$(printf '%s\n' "$required_version" "$node_version" | sort -V | head -n1)" = "$required_version" ]; then 
    echo "✅ Node.js版本: $node_version (满足要求)"
else
    echo "❌ Node.js版本过低: $node_version (需要 >= $required_version)"
    echo "请升级Node.js: https://nodejs.org/"
    exit 1
fi

# 检查npm版本
npm_version=$(npm -v)
echo "✅ npm版本: $npm_version"

# 清理旧的依赖
echo "🧹 清理旧的依赖..."
rm -rf node_modules
rm -f package-lock.json

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 复制环境变量文件
if [ ! -f .env.local ]; then
    echo "📝 创建环境变量文件..."
    cp .env.local.example .env.local
    echo "⚠️  请编辑 .env.local 文件，填入正确的配置值"
fi

# 创建必要的目录
echo "📁 创建项目目录..."
mkdir -p public/uploads
mkdir -p logs
mkdir -p temp
mkdir -p docs

# 设置Git hooks
echo "🔧 设置Git hooks..."
if [ -d .git ]; then
    echo "#!/bin/sh\nnpm run lint:fix\nnpm run type-check" > .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
fi

# 生成类型定义
echo "🔍 生成TypeScript类型..."
npm run type-check

echo ""
echo "✅ 开发环境设置完成！"
echo ""
echo "🚀 启动开发服务器:"
echo "   npm run dev"
echo ""
echo "🔧 其他有用命令:"
echo "   npm run build     - 构建生产版本"
echo "   npm run lint      - 代码检查"
echo "   npm run test      - 运行测试"
echo "   npm run storybook - 启动组件文档"
echo ""
echo "📖 请查看 README.md 获取更多信息"
