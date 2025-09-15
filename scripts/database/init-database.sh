#!/bin/bash

# 言语云³医疗AI系统 - 数据库初始化脚本
# YYC³-Med Database Initialization Script
# 创建时间: 2024-01-15
# 版本: v1.0.0

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 显示横幅
show_banner() {
    echo -e "${BLUE}"
    echo "============================================================"
    echo "🏥 言语云³医疗AI系统 - 数据库初始化工具"
    echo "   YYC³-Med Database Initialization Tool"
    echo "============================================================"
    echo -e "${NC}"
}

# 检查依赖
check_dependencies() {
    log_info "检查系统依赖..."
    
    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js 未安装，请先安装 Node.js"
        exit 1
    fi
    
    # 检查 npm
    if ! command -v npm &> /dev/null; then
        log_error "npm 未安装，请先安装 npm"
        exit 1
    fi
    
    # 检查 PostgreSQL 客户端
    if ! command -v psql &> /dev/null; then
        log_warning "psql 未安装，建议安装 PostgreSQL 客户端工具"
    fi
    
    log_success "依赖检查完成"
}

# 加载环境变量
load_env() {
    log_info "加载环境变量..."
    
    # 检查 .env 文件
    if [ -f "../../.env" ]; then
        source ../../.env
        log_success "已加载 .env 文件"
    elif [ -f ".env" ]; then
        source .env
        log_success "已加载本地 .env 文件"
    else
        log_warning "未找到 .env 文件，使用默认配置"
    fi
    
    # 设置默认值
    export DB_HOST=${DB_HOST:-localhost}
    export DB_PORT=${DB_PORT:-5432}
    export DB_NAME=${DB_NAME:-yyc3_med}
    export DB_USER=${DB_USER:-postgres}
    export DB_PASSWORD=${DB_PASSWORD:-password}
    export DB_SSL=${DB_SSL:-false}
    
    log_info "数据库配置: ${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
}

# 测试数据库连接
test_connection() {
    log_info "测试数据库连接..."
    
    if command -v psql &> /dev/null; then
        export PGPASSWORD=$DB_PASSWORD
        if psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "SELECT version();" &> /dev/null; then
            log_success "数据库连接测试成功"
        else
            log_error "数据库连接失败，请检查配置"
            exit 1
        fi
    else
        log_warning "跳过连接测试（psql 未安装）"
    fi
}

# 安装依赖包
install_dependencies() {
    log_info "安装 Node.js 依赖包..."
    
    if [ -f "package.json" ]; then
        npm install
        log_success "依赖包安装完成"
    else
        log_warning "未找到 package.json，跳过依赖安装"
    fi
}

# 创建数据库备份
create_backup() {
    if [ "$1" = "--backup" ]; then
        log_info "创建数据库备份..."
        
        local backup_dir="./backups"
        local backup_file="${backup_dir}/backup_$(date +%Y%m%d_%H%M%S).sql"
        
        mkdir -p $backup_dir
        
        if command -v pg_dump &> /dev/null; then
            export PGPASSWORD=$DB_PASSWORD
            if pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME > $backup_file 2>/dev/null; then
                log_success "备份创建成功: $backup_file"
            else
                log_warning "备份创建失败（数据库可能不存在）"
            fi
        else
            log_warning "跳过备份（pg_dump 未安装）"
        fi
    fi
}

# 执行数据库脚本
run_database_scripts() {
    log_info "执行数据库初始化脚本..."
    
    local script_args=""
    
    # 处理命令行参数
    for arg in "$@"; do
        case $arg in
            --create-db)
                script_args="$script_args --create-db"
                ;;
            --skip-data)
                script_args="$script_args --skip-data"
                ;;
            --force)
                script_args="$script_args --force"
                ;;
        esac
    done
    
    # 执行 TypeScript 脚本
    if [ -f "run-sql-scripts.ts" ]; then
        if command -v ts-node &> /dev/null; then
            ts-node run-sql-scripts.ts $script_args
        elif command -v npx &> /dev/null; then
            npx ts-node run-sql-scripts.ts $script_args
        else
            log_error "ts-node 未安装，无法执行 TypeScript 脚本"
            exit 1
        fi
    else
        log_error "未找到 run-sql-scripts.ts 文件"
        exit 1
    fi
}

# 验证安装结果
verify_installation() {
    log_info "验证数据库安装结果..."
    
    if command -v psql &> /dev/null; then
        export PGPASSWORD=$DB_PASSWORD
        
        # 检查表数量
        local table_count=$(psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | xargs)
        
        if [ "$table_count" -gt 0 ]; then
            log_success "数据库初始化成功，创建了 $table_count 个表"
            
            # 显示主要表的记录数
            log_info "主要表记录统计:"
            psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "
                SELECT 
                    schemaname||'.'||tablename as table_name,
                    n_tup_ins - n_tup_del as row_count
                FROM pg_stat_user_tables 
                WHERE schemaname = 'public'
                ORDER BY n_tup_ins - n_tup_del DESC
                LIMIT 10;
            " 2>/dev/null || log_warning "无法获取表统计信息"
        else
            log_error "数据库初始化失败，未创建任何表"
            exit 1
        fi
    else
        log_warning "跳过验证（psql 未安装）"
    fi
}

# 显示帮助信息
show_help() {
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  --help          显示帮助信息"
    echo "  --create-db     如果数据库不存在则创建"
    echo "  --skip-data     跳过初始数据插入"
    echo "  --force         强制执行（跳过确认）"
    echo "  --backup        执行前创建备份"
    echo "  --no-verify     跳过安装验证"
    echo ""
    echo "环境变量:"
    echo "  DB_HOST         数据库主机 (默认: localhost)"
    echo "  DB_PORT         数据库端口 (默认: 5432)"
    echo "  DB_NAME         数据库名称 (默认: yyc3_med)"
    echo "  DB_USER         数据库用户 (默认: postgres)"
    echo "  DB_PASSWORD     数据库密码 (默认: password)"
    echo "  DB_SSL          是否使用SSL (默认: false)"
    echo ""
    echo "示例:"
    echo "  $0                    # 基本初始化"
    echo "  $0 --create-db        # 创建数据库并初始化"
    echo "  $0 --backup --force   # 备份后强制初始化"
}

# 主函数
main() {
    # 检查帮助参数
    for arg in "$@"; do
        if [ "$arg" = "--help" ] || [ "$arg" = "-h" ]; then
            show_help
            exit 0
        fi
    done
    
    show_banner
    
    # 执行初始化步骤
    check_dependencies
    load_env
    test_connection
    install_dependencies
    create_backup "$@"
    run_database_scripts "$@"
    
    # 检查是否跳过验证
    local skip_verify=false
    for arg in "$@"; do
        if [ "$arg" = "--no-verify" ]; then
            skip_verify=true
            break
        fi
    done
    
    if [ "$skip_verify" = false ]; then
        verify_installation
    fi
    
    log_success "数据库初始化完成！"
    echo ""
    echo -e "${GREEN}🎉 言语云³医疗AI系统数据库已准备就绪！${NC}"
    echo ""
    echo "下一步："
    echo "1. 启动应用服务器"
    echo "2. 访问管理界面进行系统配置"
    echo "3. 创建管理员账户"
    echo ""
}

# 错误处理
trap 'log_error "脚本执行过程中发生错误，请检查日志"; exit 1' ERR

# 执行主函数
main "$@"
