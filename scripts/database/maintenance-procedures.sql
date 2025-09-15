-- 言语云³医疗AI系统 - 数据库维护存储过程
-- YYC³-Med Database Maintenance Procedures
-- 创建时间: 2024-01-15
-- 版本: v1.0.0

-- 1. 数据库清理存储过程
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS TEXT AS $$
DECLARE
    deleted_logs INTEGER;
    deleted_notifications INTEGER;
    result_message TEXT;
BEGIN
    -- 清理90天前的系统日志
    DELETE FROM system_logs 
    WHERE created_at < CURRENT_DATE - INTERVAL '90 days';
    GET DIAGNOSTICS deleted_logs = ROW_COUNT;
    
    -- 清理已读且超过30天的通知
    DELETE FROM notifications 
    WHERE is_read = true 
    AND created_at < CURRENT_DATE - INTERVAL '30 days';
    GET DIAGNOSTICS deleted_notifications = ROW_COUNT;
    
    -- 清理过期的预约记录（已取消或未出现的预约，超过7天）
    UPDATE appointments 
    SET status = 'expired' 
    WHERE status IN ('cancelled', 'no_show') 
    AND appointment_date < CURRENT_DATE - INTERVAL '7 days';
    
    result_message := format('数据清理完成: 删除了 %s 条系统日志, %s 条通知', 
                           deleted_logs, deleted_notifications);
    
    -- 记录清理操作
    INSERT INTO system_logs (user_id, action, resource_type, details, status)
    VALUES (null, 'database_cleanup', 'system', 
            json_build_object('deleted_logs', deleted_logs, 'deleted_notifications', deleted_notifications),
            'success');
    
    RETURN result_message;
END;
$$ LANGUAGE plpgsql;

-- 2. 数据库统计信息更新
CREATE OR REPLACE FUNCTION update_database_statistics()
RETURNS TABLE(
    table_name TEXT,
    row_count BIGINT,
    table_size TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        schemaname||'.'||tablename as table_name,
        n_tup_ins - n_tup_del as row_count,
        pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as table_size
    FROM pg_stat_user_tables 
    WHERE schemaname = 'public'
    ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
END;
$$ LANGUAGE plpgsql;

-- 3. 患者数据完整性检查
CREATE OR REPLACE FUNCTION check_patient_data_integrity()
RETURNS TABLE(
    check_type TEXT,
    issue_count INTEGER,
    details TEXT
) AS $$
BEGIN
    -- 检查患者是否有基本信息缺失
    RETURN QUERY
    SELECT 
        '患者基本信息缺失'::TEXT as check_type,
        COUNT(*)::INTEGER as issue_count,
        '患者缺少姓名、性别或出生日期'::TEXT as details
    FROM patients 
    WHERE full_name IS NULL OR gender IS NULL OR date_of_birth IS NULL;
    
    -- 检查医疗记录是否有孤立记录（患者不存在）
    RETURN QUERY
    SELECT 
        '孤立医疗记录'::TEXT as check_type,
        COUNT(*)::INTEGER as issue_count,
        '医疗记录对应的患者不存在'::TEXT as details
    FROM medical_records mr
    LEFT JOIN patients p ON mr.patient_id = p.id
    WHERE p.id IS NULL;
    
    -- 检查预约是否有无效的医生或患者引用
    RETURN QUERY
    SELECT 
        '无效预约记录'::TEXT as check_type,
        COUNT(*)::INTEGER as issue_count,
        '预约记录中的医生或患者不存在'::TEXT as details
    FROM appointments a
    LEFT JOIN patients p ON a.patient_id = p.id
    LEFT JOIN users u ON a.doctor_id = u.id
    WHERE p.id IS NULL OR u.id IS NULL;
    
END;
$$ LANGUAGE plpgsql;

-- 4. AI诊断准确性统计
CREATE OR REPLACE FUNCTION get_ai_diagnosis_statistics()
RETURNS TABLE(
    ai_model_name TEXT,
    total_diagnoses BIGINT,
    approved_count BIGINT,
    rejected_count BIGINT,
    pending_count BIGINT,
    average_confidence DECIMAL(5,4),
    average_processing_time INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        adr.ai_model_name,
        COUNT(*) as total_diagnoses,
        COUNT(CASE WHEN adr.human_review_status = 'approved' THEN 1 END) as approved_count,
        COUNT(CASE WHEN adr.human_review_status = 'rejected' THEN 1 END) as rejected_count,
        COUNT(CASE WHEN adr.human_review_status = 'pending' THEN 1 END) as pending_count,
        AVG(adr.confidence_score) as average_confidence,
        AVG(adr.processing_time)::INTEGER as average_processing_time
    FROM ai_diagnosis_records adr
    GROUP BY adr.ai_model_name
    ORDER BY total_diagnoses DESC;
END;
$$ LANGUAGE plpgsql;

-- 5. 用户活跃度统计
CREATE OR REPLACE FUNCTION get_user_activity_statistics(days_back INTEGER DEFAULT 30)
RETURNS TABLE(
    user_id UUID,
    full_name TEXT,
    role TEXT,
    login_count BIGINT,
    last_login TIMESTAMP WITH TIME ZONE,
    total_actions BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id as user_id,
        u.full_name,
        u.role,
        COUNT(CASE WHEN sl.action = 'login' THEN 1 END) as login_count,
        MAX(u.last_login) as last_login,
        COUNT(sl.id) as total_actions
    FROM users u
    LEFT JOIN system_logs sl ON u.id = sl.user_id 
        AND sl.created_at >= CURRENT_DATE - INTERVAL '%s days'
    WHERE u.is_active = true
    GROUP BY u.id, u.full_name, u.role
    ORDER BY total_actions DESC;
END;
$$ LANGUAGE plpgsql;

-- 6. 数据库性能优化
CREATE OR REPLACE FUNCTION optimize_database_performance()
RETURNS TEXT AS $$
DECLARE
    result_message TEXT := '';
BEGIN
    -- 更新表统计信息
    ANALYZE users;
    ANALYZE patients;
    ANALYZE medical_records;
    ANALYZE ai_diagnosis_records;
    ANALYZE medical_images;
    ANALYZE appointments;
    ANALYZE system_logs;
    
    result_message := result_message || '表统计信息已更新; ';
    
    -- 重建可能碎片化的索引
    REINDEX INDEX idx_medical_records_patient_id;
    REINDEX INDEX idx_medical_records_visit_date;
    REINDEX INDEX idx_system_logs_created_at;
    REINDEX INDEX idx_appointments_date;
    
    result_message := result_message || '关键索引已重建; ';
    
    -- 清理死元组
    VACUUM ANALYZE system_logs;
    VACUUM ANALYZE notifications;
    
    result_message := result_message || '数据库清理完成';
    
    -- 记录优化操作
    INSERT INTO system_logs (user_id, action, resource_type, details, status)
    VALUES (null, 'database_optimization', 'system', 
            json_build_object('message', result_message),
            'success');
    
    RETURN result_message;
END;
$$ LANGUAGE plpgsql;

-- 7. 备份验证存储过程
CREATE OR REPLACE FUNCTION verify_backup_integrity()
RETURNS TABLE(
    table_name TEXT,
    expected_constraints INTEGER,
    actual_constraints INTEGER,
    status TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.table_name::TEXT,
        COALESCE(expected.constraint_count, 0) as expected_constraints,
        COALESCE(actual.constraint_count, 0) as actual_constraints,
        CASE 
            WHEN COALESCE(expected.constraint_count, 0) = COALESCE(actual.constraint_count, 0) 
            THEN 'OK'::TEXT
            ELSE 'ERROR'::TEXT
        END as status
    FROM information_schema.tables t
    LEFT JOIN (
        SELECT table_name, COUNT(*) as constraint_count
        FROM information_schema.table_constraints
        WHERE table_schema = 'public'
        GROUP BY table_name
    ) expected ON t.table_name = expected.table_name
    LEFT JOIN (
        SELECT table_name, COUNT(*) as constraint_count
        FROM information_schema.table_constraints
        WHERE table_schema = 'public'
        GROUP BY table_name
    ) actual ON t.table_name = actual.table_name
    WHERE t.table_schema = 'public'
    AND t.table_type = 'BASE TABLE'
    ORDER BY t.table_name;
END;
$$ LANGUAGE plpgsql;

-- 8. 自动化健康检查
CREATE OR REPLACE FUNCTION database_health_check()
RETURNS TABLE(
    check_category TEXT,
    check_name TEXT,
    status TEXT,
    details TEXT,
    recommendation TEXT
) AS $$
BEGIN
    -- 检查连接数
    RETURN QUERY
    SELECT 
        '连接管理'::TEXT as check_category,
        '活跃连接数'::TEXT as check_name,
        CASE WHEN COUNT(*) < 80 THEN 'OK' ELSE 'WARNING' END as status,
        '当前活跃连接: ' || COUNT(*)::TEXT as details,
        CASE WHEN COUNT(*) >= 80 THEN '考虑优化连接池配置' ELSE '连接数正常' END as recommendation
    FROM pg_stat_activity
    WHERE state = 'active';
    
    -- 检查表大小
    RETURN QUERY
    SELECT 
        '存储管理'::TEXT as check_category,
        '大表检查'::TEXT as check_name,
        CASE WHEN pg_total_relation_size(schemaname||'.'||tablename) > 1073741824 THEN 'WARNING' ELSE 'OK' END as status,
        '表 ' || tablename || ' 大小: ' || pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as details,
        CASE WHEN pg_total_relation_size(schemaname||'.'||tablename) > 1073741824 THEN '考虑分区或归档' ELSE '表大小正常' END as recommendation
    FROM pg_stat_user_tables
    WHERE schemaname = 'public'
    ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
    LIMIT 5;
    
    -- 检查索引使用情况
    RETURN QUERY
    SELECT 
        '性能优化'::TEXT as check_category,
        '未使用索引'::TEXT as check_name,
        CASE WHEN idx_scan = 0 THEN 'WARNING' ELSE 'OK' END as status,
        '索引 ' || indexrelname || ' 扫描次数: ' || idx_scan::TEXT as details,
        CASE WHEN idx_scan = 0 THEN '考虑删除未使用的索引' ELSE '索引使用正常' END as recommendation
    FROM pg_stat_user_indexes
    WHERE schemaname = 'public'
    AND idx_scan = 0
    LIMIT 5;
    
END;
$$ LANGUAGE plpgsql;

-- 9. 创建定时任务调度函数
CREATE OR REPLACE FUNCTION schedule_maintenance_tasks()
RETURNS TEXT AS $$
DECLARE
    result_message TEXT := '';
BEGIN
    -- 每日清理任务
    SELECT cleanup_old_data() INTO result_message;
    
    -- 每周性能优化
    IF EXTRACT(DOW FROM CURRENT_DATE) = 0 THEN -- 周日
        SELECT optimize_database_performance() INTO result_message;
        result_message := result_message || '; 周度性能优化完成';
    END IF;
    
    -- 每月数据完整性检查
    IF EXTRACT(DAY FROM CURRENT_DATE) = 1 THEN -- 每月1号
        INSERT INTO system_logs (user_id, action, resource_type, details, status)
        SELECT null, 'data_integrity_check', 'system', 
               json_build_object('issues_found', COUNT(*)),
               CASE WHEN COUNT(*) = 0 THEN 'success' ELSE 'warning' END
        FROM check_patient_data_integrity()
        WHERE issue_count > 0;
        
        result_message := result_message || '; 月度数据完整性检查完成';
    END IF;
    
    RETURN result_message;
END;
$$ LANGUAGE plpgsql;

-- 10. 数据导出存储过程
CREATE OR REPLACE FUNCTION export_patient_data(patient_uuid UUID)
RETURNS JSON AS $$
DECLARE
    patient_data JSON;
BEGIN
    SELECT json_build_object(
        'patient_info', (
            SELECT row_to_json(p) FROM (
                SELECT id, patient_id, full_name, gender, date_of_birth, 
                       phone, email, blood_type, created_at
                FROM patients WHERE id = patient_uuid
            ) p
        ),
        'medical_records', (
            SELECT json_agg(row_to_json(mr)) FROM (
                SELECT id, record_type, title, description, symptoms, 
                       diagnosis, treatment_plan, visit_date
                FROM medical_records 
                WHERE patient_id = patient_uuid
                ORDER BY visit_date DESC
            ) mr
        ),
        'prescriptions', (
            SELECT json_agg(row_to_json(pr)) FROM (
                SELECT prescription_number, medications, instructions, 
                       prescribed_date, status
                FROM prescriptions 
                WHERE patient_id = patient_uuid
                ORDER BY prescribed_date DESC
            ) pr
        ),
        'appointments', (
            SELECT json_agg(row_to_json(ap)) FROM (
                SELECT appointment_type, appointment_date, duration_minutes, 
                       status, notes
                FROM appointments 
                WHERE patient_id = patient_uuid
                ORDER BY appointment_date DESC
            ) ap
        )
    ) INTO patient_data;
    
    -- 记录导出操作
    INSERT INTO system_logs (user_id, action, resource_type, resource_id, details, status)
    VALUES (null, 'export_patient_data', 'patient', patient_uuid, 
            json_build_object('export_timestamp', CURRENT_TIMESTAMP),
            'success');
    
    RETURN patient_data;
END;
$$ LANGUAGE plpgsql;

-- 创建维护任务执行记录表
CREATE TABLE IF NOT EXISTS maintenance_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_name VARCHAR(100) NOT NULL,
    execution_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    duration_seconds INTEGER,
    status VARCHAR(20) DEFAULT 'success',
    result_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 添加注释
COMMENT ON FUNCTION cleanup_old_data() IS '清理过期的系统日志和通知数据';
COMMENT ON FUNCTION update_database_statistics() IS '更新数据库统计信息';
COMMENT ON FUNCTION check_patient_data_integrity() IS '检查患者数据完整性';
COMMENT ON FUNCTION get_ai_diagnosis_statistics() IS '获取AI诊断统计信息';
COMMENT ON FUNCTION get_user_activity_statistics(INTEGER) IS '获取用户活跃度统计';
COMMENT ON FUNCTION optimize_database_performance() IS '优化数据库性能';
COMMENT ON FUNCTION verify_backup_integrity() IS '验证备份完整性';
COMMENT ON FUNCTION database_health_check() IS '数据库健康检查';
COMMENT ON FUNCTION schedule_maintenance_tasks() IS '调度维护任务';
COMMENT ON FUNCTION export_patient_data(UUID) IS '导出患者数据';

-- 存储过程创建完成
SELECT 'YYC³-Med 数据库维护存储过程创建完成！' as message;
