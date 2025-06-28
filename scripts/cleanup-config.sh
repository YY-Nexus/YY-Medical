#!/bin/bash

echo "🧹 开始清理重复配置文件..."

# 删除重复的配置文件
files_to_remove=(
  "deployment-package.json"
  "package-node23.json"
  "next.config-node23.mjs"
  "simple-next.config.mjs"
  "vercel-simple.json"
)

for file in "${files_to_remove[@]}"; do
  if [ -f "$file" ]; then
    echo "🗑️ 删除: $file"
    rm "$file"
  else
    echo "✅ 已清理: $file"
  fi
done

echo "🎯 配置文件清理完成!"
echo "📋 保留的配置文件:"
echo "  ✅ package.json"
echo "  ✅ next.config.mjs"
echo "  ✅ vercel.json"
echo "  ✅ tsconfig.json"
echo "  ✅ tailwind.config.ts"
