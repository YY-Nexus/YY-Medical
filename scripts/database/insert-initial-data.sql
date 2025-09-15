-- 言语云³医疗AI系统 - 初始数据插入脚本
-- YYC³-Med Initial Data Insertion Script
-- 创建时间: 2024-01-15
-- 版本: v1.0.0

-- 插入系统管理员用户
INSERT INTO users (id, username, email, password_hash, full_name, role, department, is_active, is_verified) VALUES
('00000000-0000-0000-0000-000000000001', 'admin', 'admin@yyc3med.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSn9Vu', '系统管理员', 'admin', 'IT部门', true, true),
('00000000-0000-0000-0000-000000000002', 'demo_doctor', 'doctor@yyc3med.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSn9Vu', '张医生', 'doctor', '内科', true, true),
('00000000-0000-0000-0000-000000000003', 'demo_nurse', 'nurse@yyc3med.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSn9Vu', '李护士', 'nurse', '内科', true, true),
('00000000-0000-0000-0000-000000000004', 'demo_researcher', 'researcher@yyc3med.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSn9Vu', '王研究员', 'researcher', '科研部', true, true);

-- 插入示例患者数据
INSERT INTO patients (id, patient_id, full_name, gender, date_of_birth, phone, email, address, blood_type, created_by) VALUES
('10000000-0000-0000-0000-000000000001', 'P2024001', '陈小明', 'male', '1985-03-15', '13800138001', 'chen.xiaoming@email.com', '北京市朝阳区建国路1号', 'A+', '00000000-0000-0000-0000-000000000002'),
('10000000-0000-0000-0000-000000000002', 'P2024002', '李小红', 'female', '1990-07-22', '13800138002', 'li.xiaohong@email.com', '上海市浦东新区陆家嘴路100号', 'B+', '00000000-0000-0000-0000-000000000002'),
('10000000-0000-0000-0000-000000000003', 'P2024003', '王大伟', 'male', '1978-12-08', '13800138003', 'wang.dawei@email.com', '广州市天河区珠江新城路200号', 'O+', '00000000-0000-0000-0000-000000000002'),
('10000000-0000-0000-0000-000000000004', 'P2024004', '赵小芳', 'female', '1995-05-30', '13800138004', 'zhao.xiaofang@email.com', '深圳市南山区科技园路300号', 'AB+', '00000000-0000-0000-0000-000000000002');

-- 插入示例医疗记录
INSERT INTO medical_records (id, patient_id, doctor_id, record_type, title, description, symptoms, diagnosis, treatment_plan, status) VALUES
('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'consultation', '常规体检', '年度健康检查', '无明显症状', '健康状况良好', '建议定期复查', 'completed'),
('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'diagnosis', '感冒诊断', '患者出现感冒症状', '发热、咳嗽、流鼻涕', '普通感冒', '多休息，多喝水，服用感冒药', 'completed'),
('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'consultation', '高血压随访', '高血压患者定期随访', '偶有头晕', '高血压（控制良好）', '继续服用降压药，注意饮食', 'active'),
('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 'diagnosis', '胃炎诊断', '患者胃部不适', '胃痛、恶心', '慢性胃炎', '服用胃药，调整饮食习惯', 'active');

-- 插入常用药物信息
INSERT INTO medications (id, drug_name, generic_name, brand_names, drug_class, dosage_forms, strength_options, indications, contraindications, side_effects) VALUES
('30000000-0000-0000-0000-000000000001', '阿莫西林', 'Amoxicillin', ARRAY['阿莫仙', '安必仙'], '青霉素类抗生素', ARRAY['胶囊', '颗粒', '注射剂'], ARRAY['250mg', '500mg'], '用于敏感菌引起的各种感染', '对青霉素过敏者禁用', '可能出现过敏反应、胃肠道反应'),
('30000000-0000-0000-0000-000000000002', '布洛芬', 'Ibuprofen', ARRAY['芬必得', '美林'], '非甾体抗炎药', ARRAY['片剂', '胶囊', '糖浆'], ARRAY['200mg', '400mg'], '解热镇痛抗炎', '消化性溃疡患者禁用', '可能出现胃肠道不适、头痛'),
('30000000-0000-0000-0000-000000000003', '氨氯地平', 'Amlodipine', ARRAY['络活喜', '安内真'], '钙通道阻滞剂', ARRAY['片剂'], ARRAY['5mg', '10mg'], '高血压、心绞痛', '严重低血压患者禁用', '可能出现踝部水肿、头痛'),
('30000000-0000-0000-0000-000000000004', '奥美拉唑', 'Omeprazole', ARRAY['洛赛克', '奥克'], '质子泵抑制剂', ARRAY['胶囊', '注射剂'], ARRAY['20mg', '40mg'], '胃溃疡、十二指肠溃疡', '对本品过敏者禁用', '可能出现头痛、腹泻、恶心');

-- 插入示例处方
INSERT INTO prescriptions (id, medical_record_id, patient_id, doctor_id, prescription_number, medications, instructions, status) VALUES
('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'RX2024001', 
'[{"drug_id": "30000000-0000-0000-0000-000000000001", "drug_name": "阿莫西林", "dosage": "500mg", "frequency": "每日3次", "duration": "7天", "quantity": 21}]', 
'饭后服用，多喝水', 'active'),
('40000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'RX2024002', 
'[{"drug_id": "30000000-0000-0000-0000-000000000003", "drug_name": "氨氯地平", "dosage": "5mg", "frequency": "每日1次", "duration": "30天", "quantity": 30}]', 
'晨起服用，定期监测血压', 'active');

-- 插入示例预约
INSERT INTO appointments (id, patient_id, doctor_id, appointment_type, appointment_date, duration_minutes, status, notes) VALUES
('50000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'consultation', '2024-01-20 09:00:00+08', 30, 'scheduled', '年度体检复查'),
('50000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'follow_up', '2024-01-22 14:30:00+08', 20, 'scheduled', '感冒复查'),
('50000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'consultation', '2024-01-25 10:15:00+08', 30, 'scheduled', '高血压随访'),
('50000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 'telemedicine', '2024-01-28 16:00:00+08', 25, 'scheduled', '在线咨询');

-- 插入示例认证证书
INSERT INTO certifications (id, user_id, certificate_type, certificate_number, issuing_authority, issue_date, expiry_date, verification_status) VALUES
('60000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', '医师执业证书', 'MD2020001234', '国家卫生健康委员会', '2020-06-15', '2025-06-15', 'verified'),
('60000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', '内科专科医师证书', 'SP2021005678', '中华医学会', '2021-03-20', '2026-03-20', 'verified'),
('60000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', '护士执业证书', 'RN2019009876', '国家卫生健康委员会', '2019-08-10', '2024-08-10', 'verified'),
('60000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', '医学研究员证书', 'RS2022001111', '中国医学科学院', '2022-01-15', '2027-01-15', 'verified');

-- 插入示例研究项目
INSERT INTO research_projects (id, project_name, project_code, principal_investigator_id, description, status, start_date, end_date, participant_count) VALUES
('70000000-0000-0000-0000-000000000001', 'AI辅助肺癌早期诊断研究', 'PROJ2024001', '00000000-0000-0000-0000-000000000004', '利用深度学习技术提高肺癌早期诊断准确率', 'active', '2024-01-01', '2024-12-31', 100),
('70000000-0000-0000-0000-000000000002', '慢性病管理智能化平台研究', 'PROJ2024002', '00000000-0000-0000-0000-000000000004', '开发智能化慢性病管理平台，提高患者依从性', 'planning', '2024-03-01', '2025-02-28', 0);

-- 插入系统配置
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('system_name', '"言语云³医疗AI系统"', 'string', '系统名称', true),
('system_version', '"1.0.0"', 'string', '系统版本', true),
('max_file_upload_size', '104857600', 'number', '最大文件上传大小(字节)', false),
('session_timeout', '3600', 'number', '会话超时时间(秒)', false),
('enable_ai_diagnosis', 'true', 'boolean', '是否启用AI诊断功能', false),
('default_language', '"zh-CN"', 'string', '默认语言', true),
('support_languages', '["zh-CN", "en-US"]', 'json', '支持的语言列表', true),
('ai_models_config', '{"default_model": "gpt-4", "available_models": ["gpt-4", "gpt-3.5-turbo", "claude-3"]}', 'json', 'AI模型配置', false),
('notification_settings', '{"email_enabled": true, "sms_enabled": false, "push_enabled": true}', 'json', '通知设置', false),
('backup_settings', '{"auto_backup": true, "backup_interval": "daily", "retention_days": 30}', 'json', '备份设置', false);

-- 插入示例通知
INSERT INTO notifications (id, user_id, title, message, type, priority) VALUES
('80000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', '新患者预约', '患者陈小明预约了明天上午9点的门诊', 'appointment', 'normal'),
('80000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'AI诊断完成', '患者李小红的胸部X光AI分析已完成', 'diagnosis', 'high'),
('80000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '系统维护通知', '系统将于今晚23:00-01:00进行维护升级', 'system', 'high'),
('80000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', '研究项目进展', 'AI辅助肺癌早期诊断研究项目已完成50%', 'system', 'normal');

-- 插入示例AI诊断记录
INSERT INTO ai_diagnosis_records (id, medical_record_id, ai_model_name, ai_model_version, input_data, diagnosis_result, confidence_score, processing_time, human_review_status) VALUES
('90000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'YYC3-Med-Diagnosis-v1', '1.0.0', 
'{"symptoms": ["发热", "咳嗽", "流鼻涕"], "vital_signs": {"temperature": 38.2, "blood_pressure": "120/80"}}', 
'{"primary_diagnosis": "普通感冒", "confidence": 0.92, "differential_diagnosis": ["流感", "上呼吸道感染"], "recommendations": ["多休息", "多喝水", "对症治疗"]}', 
0.92, 1500, 'approved'),
('90000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000004', 'YYC3-Med-Diagnosis-v1', '1.0.0', 
'{"symptoms": ["胃痛", "恶心"], "medical_history": ["慢性胃炎"]}', 
'{"primary_diagnosis": "慢性胃炎急性发作", "confidence": 0.85, "differential_diagnosis": ["胃溃疡", "功能性消化不良"], "recommendations": ["胃镜检查", "调整饮食", "药物治疗"]}', 
0.85, 1200, 'pending');

-- 创建一些示例系统日志
INSERT INTO system_logs (id, user_id, action, resource_type, resource_id, details, ip_address, status) VALUES
('a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'login', 'user', '00000000-0000-0000-0000-000000000001', '{"login_method": "password"}', '192.168.1.100', 'success'),
('a0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'create_patient', 'patient', '10000000-0000-0000-0000-000000000001', '{"patient_name": "陈小明"}', '192.168.1.101', 'success'),
('a0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'ai_diagnosis', 'medical_record', '20000000-0000-0000-0000-000000000002', '{"model": "YYC3-Med-Diagnosis-v1", "confidence": 0.92}', '192.168.1.101', 'success'),
('a0000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'system_backup', 'system', null, '{"backup_type": "full", "size": "2.5GB"}', '192.168.1.100', 'success');

-- 数据插入完成提示
SELECT 'YYC³-Med 初始数据插入完成！' as message,
       (SELECT COUNT(*) FROM users) as users_count,
       (SELECT COUNT(*) FROM patients) as patients_count,
       (SELECT COUNT(*) FROM medical_records) as medical_records_count,
       (SELECT COUNT(*) FROM medications) as medications_count,
       (SELECT COUNT(*) FROM appointments) as appointments_count;
