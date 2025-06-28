#!/bin/bash

echo "🔧 言语云³医疗AI系统 - 故障排除工具"
echo "=================================="

# 检查Node.js和npm
echo "1. 检查运行环境..."
echo "Node.js版本: $(node -v)"
echo "npm版本: $(npm -v)"
echo "操作系统: $(uname -s)"

# 检查项目文件
echo -e "\n2. 检查项目文件..."
files=("package.json" "next.config.mjs" "tailwind.config.ts" ".env.local")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file 存在"
    else
        echo "❌ $file 不存在"
    fi
done

# 检查依赖安装
echo -e "\n3. 检查依赖安装..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules 目录存在"
    
    # 检查关键包
    packages=("next" "react" "react-dom" "typescript")
    for package in "${packages[@]}"; do
        if [ -d "node_modules/$package" ]; then
            echo "✅ $package 已安装"
        else
            echo "❌ $package 未安装"
        fi
    done
else
    echo "❌ node_modules 目录不存在"
    echo "💡 运行: npm install"
fi

# 检查端口占用
echo -e "\n4. 检查端口占用..."
if lsof -i :3000 > /dev/null 2>&1; then
    echo "⚠️  端口3000被占用"
    echo "占用进程:"
    lsof -i :3000
    echo "💡 运行: kill -9 \$(lsof -t -i:3000)"
else
    echo "✅ 端口3000可用"
fi

# 检查磁盘空间
echo -e "\n5. 检查磁盘空间..."
df -h . | tail -1 | awk '{print "可用空间: " $4}'

# 检查内存使用
echo -e "\n6. 检查内存使用..."
if command -v free > /dev/null; then
    free -h | grep "Mem:" | awk '{print "内存使用: " $3 "/" $2}'
elif command -v vm_stat > /dev/null; then
    # macOS
    echo "内存信息:"
    vm_stat | head -5
fi

# 常见问题解决方案
echo -e "\n🔧 常见问题解决方案:"
echo "1. 依赖安装失败:"
echo "   rm -rf node_modules package-lock.json && npm install"
echo ""
echo "2. 端口被占用:"
echo "   kill -9 \$(lsof -t -i:3000)"
echo ""
echo "3. 构建失败:"
echo "   npm run clean && npm run build"
echo ""
echo "4. 类型错误:"
echo "   npm run type-check"
echo ""
echo "5. 重置开发环境:"
echo "   ./scripts/setup-dev.sh"

echo -e "\n✅ 故障排除完成"
