-- 言语云³医疗AI系统 - 数据库表结构创建脚本
-- YYC³-Med Database Schema Creation Script
-- 创建时间: 2024-01-15
-- 版本: v1.0.0

-- 启用UUID扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 用户表 (Users)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'doctor' CHECK (role IN ('admin', 'doctor', 'nurse', 'researcher', 'patient')),
    department VARCHAR(100),
    license_number VARCHAR(50),
    phone VARCHAR(20),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 患者表 (Patients)
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id VARCHAR(20) UNIQUE NOT NULL, -- 患者编号
    full_name VARCHAR(100) NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    date_of_birth DATE,
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    blood_type VARCHAR(5),
    allergies TEXT,
    medical_history TEXT,
    insurance_info JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 医疗记录表 (Medical Records)
CREATE TABLE IF NOT EXISTS medical_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES users(id),
    record_type VARCHAR(50) NOT NULL, -- 'consultation', 'diagnosis', 'treatment', 'test_result'
    title VARCHAR(200) NOT NULL,
    description TEXT,
    symptoms TEXT,
    diagnosis TEXT,
    treatment_plan TEXT,
    medications JSONB,
    test_results JSONB,
    images JSONB, -- 存储图像文件路径和元数据
    ai_analysis JSONB, -- AI分析结果
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
    visit_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AI诊断记录表 (AI Diagnosis Records)
CREATE TABLE IF NOT EXISTS ai_diagnosis_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medical_record_id UUID REFERENCES medical_records(id) ON DELETE CASCADE,
    ai_model_name VARCHAR(100) NOT NULL,
    ai_model_version VARCHAR(20),
    input_data JSONB NOT NULL, -- 输入的症状、图像等数据
    diagnosis_result JSONB NOT NULL, -- AI诊断结果
    confidence_score DECIMAL(5,4), -- 置信度分数 0-1
    processing_time INTEGER, -- 处理时间(毫秒)
    human_review_status VARCHAR(20) DEFAULT 'pending' CHECK (human_review_status IN ('pending', 'approved', 'rejected', 'modified')),
    human_reviewer_id UUID REFERENCES users(id),
    human_review_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 医疗图像表 (Medical Images)
CREATE TABLE IF NOT EXISTS medical_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medical_record_id UUID REFERENCES medical_records(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT,
    file_type VARCHAR(50), -- 'DICOM', 'JPEG', 'PNG', 'TIFF'
    modality VARCHAR(20), -- 'CT', 'MRI', 'X-Ray', 'Ultrasound', 'Endoscopy'
    body_part VARCHAR(50),
    image_metadata JSONB, -- DICOM标签等元数据
    ai_annotations JSONB, -- AI标注结果
    manual_annotations JSONB, -- 人工标注结果
    upload_status VARCHAR(20) DEFAULT 'processing' CHECK (upload_status IN ('processing', 'completed', 'failed')),
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 认证证书表 (Certifications)
CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    certificate_type VARCHAR(100) NOT NULL, -- '医师执业证书', '专科医师证书', '继续教育证书'
    certificate_number VARCHAR(100) UNIQUE NOT NULL,
    issuing_authority VARCHAR(200) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    certificate_file_path TEXT,
    verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'expired')),
    verification_provider VARCHAR(50), -- 'manual', 'api_provider_1', 'api_provider_2'
    verification_date TIMESTAMP WITH TIME ZONE,
    verification_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 药物信息表 (Medications)
CREATE TABLE IF NOT EXISTS medications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    drug_name VARCHAR(200) NOT NULL,
    generic_name VARCHAR(200),
    brand_names TEXT[], -- 商品名数组
    drug_class VARCHAR(100),
    dosage_forms TEXT[], -- 剂型数组
    strength_options TEXT[], -- 规格选项
    indications TEXT, -- 适应症
    contraindications TEXT, -- 禁忌症
    side_effects TEXT, -- 副作用
    interactions JSONB, -- 药物相互作用
    dosage_guidelines JSONB, -- 用药指南
    pregnancy_category VARCHAR(10),
    is_prescription BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 处方表 (Prescriptions)
CREATE TABLE IF NOT EXISTS prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medical_record_id UUID REFERENCES medical_records(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id),
    doctor_id UUID REFERENCES users(id),
    prescription_number VARCHAR(50) UNIQUE NOT NULL,
    medications JSONB NOT NULL, -- 处方药物详情
    instructions TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'dispensed', 'cancelled', 'expired')),
    prescribed_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expiry_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 预约表 (Appointments)
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id),
    doctor_id UUID REFERENCES users(id),
    appointment_type VARCHAR(50) NOT NULL, -- 'consultation', 'follow_up', 'emergency', 'telemedicine'
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
    notes TEXT,
    telemedicine_link TEXT,
    reminder_sent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 研究项目表 (Research Projects)
CREATE TABLE IF NOT EXISTS research_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_name VARCHAR(200) NOT NULL,
    project_code VARCHAR(50) UNIQUE NOT NULL,
    principal_investigator_id UUID REFERENCES users(id),
    description TEXT,
    objectives TEXT,
    methodology TEXT,
    status VARCHAR(20) DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'paused', 'completed', 'cancelled')),
    start_date DATE,
    end_date DATE,
    budget DECIMAL(15,2),
    funding_source VARCHAR(200),
    ethics_approval_number VARCHAR(100),
    ethics_approval_date DATE,
    participant_count INTEGER DEFAULT 0,
    data_collection_status VARCHAR(20) DEFAULT 'not_started',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 研究数据表 (Research Data)
CREATE TABLE IF NOT EXISTS research_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES research_projects(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id),
    data_type VARCHAR(50) NOT NULL, -- 'clinical', 'imaging', 'laboratory', 'survey'
    data_content JSONB NOT NULL,
    collection_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    collected_by UUID REFERENCES users(id),
    quality_score DECIMAL(3,2), -- 数据质量评分 0-1
    is_anonymized BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 系统日志表 (System Logs)
CREATE TABLE IF NOT EXISTS system_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50), -- 'patient', 'medical_record', 'image', 'user'
    resource_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    status VARCHAR(20) DEFAULT 'success' CHECK (status IN ('success', 'failure', 'warning')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 通知表 (Notifications)
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'appointment', 'diagnosis', 'system', 'reminder'
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    is_read BOOLEAN DEFAULT false,
    action_url TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 系统配置表 (System Settings)
CREATE TABLE IF NOT EXISTS system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    setting_type VARCHAR(50) NOT NULL, -- 'string', 'number', 'boolean', 'json'
    description TEXT,
    is_public BOOLEAN DEFAULT false, -- 是否可以被前端访问
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_patients_patient_id ON patients(patient_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_patient_id ON medical_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_doctor_id ON medical_records(doctor_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_visit_date ON medical_records(visit_date);
CREATE INDEX IF NOT EXISTS idx_ai_diagnosis_records_medical_record_id ON ai_diagnosis_records(medical_record_id);
CREATE INDEX IF NOT EXISTS idx_medical_images_medical_record_id ON medical_images(medical_record_id);
CREATE INDEX IF NOT EXISTS idx_certifications_user_id ON certifications(user_id);
CREATE INDEX IF NOT EXISTS idx_certifications_verification_status ON certifications(verification_status);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_research_data_project_id ON research_data(project_id);
CREATE INDEX IF NOT EXISTS idx_system_logs_user_id ON system_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON system_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为需要的表添加更新时间触发器
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_medical_records_updated_at BEFORE UPDATE ON medical_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_medications_updated_at BEFORE UPDATE ON medications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_research_projects_updated_at BEFORE UPDATE ON research_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 创建视图以简化常用查询
CREATE OR REPLACE VIEW patient_summary AS
SELECT 
    p.id,
    p.patient_id,
    p.full_name,
    p.gender,
    p.date_of_birth,
    EXTRACT(YEAR FROM AGE(p.date_of_birth)) as age,
    p.phone,
    p.email,
    COUNT(mr.id) as total_records,
    MAX(mr.visit_date) as last_visit,
    p.created_at
FROM patients p
LEFT JOIN medical_records mr ON p.id = mr.patient_id
GROUP BY p.id, p.patient_id, p.full_name, p.gender, p.date_of_birth, p.phone, p.email, p.created_at;

CREATE OR REPLACE VIEW doctor_workload AS
SELECT 
    u.id,
    u.full_name,
    u.department,
    COUNT(DISTINCT mr.id) as total_records,
    COUNT(DISTINCT a.id) as total_appointments,
    COUNT(DISTINCT CASE WHEN a.appointment_date >= CURRENT_DATE THEN a.id END) as upcoming_appointments
FROM users u
LEFT JOIN medical_records mr ON u.id = mr.doctor_id
LEFT JOIN appointments a ON u.id = a.doctor_id
WHERE u.role IN ('doctor', 'nurse')
GROUP BY u.id, u.full_name, u.department;

-- 添加注释
COMMENT ON TABLE users IS '用户表 - 存储系统中所有用户信息';
COMMENT ON TABLE patients IS '患者表 - 存储患者基本信息';
COMMENT ON TABLE medical_records IS '医疗记录表 - 存储患者的医疗记录';
COMMENT ON TABLE ai_diagnosis_records IS 'AI诊断记录表 - 存储AI诊断结果';
COMMENT ON TABLE medical_images IS '医疗图像表 - 存储医疗影像文件信息';
COMMENT ON TABLE certifications IS '认证证书表 - 存储医护人员的资质证书';
COMMENT ON TABLE medications IS '药物信息表 - 存储药物基础信息';
COMMENT ON TABLE prescriptions IS '处方表 - 存储处方信息';
COMMENT ON TABLE appointments IS '预约表 - 存储预约信息';
COMMENT ON TABLE research_projects IS '研究项目表 - 存储科研项目信息';
COMMENT ON TABLE research_data IS '研究数据表 - 存储科研数据';
COMMENT ON TABLE system_logs IS '系统日志表 - 存储系统操作日志';
COMMENT ON TABLE notifications IS '通知表 - 存储用户通知';
COMMENT ON TABLE system_settings IS '系统配置表 - 存储系统配置信息';

-- 数据库创建完成
SELECT 'YYC³-Med 数据库表结构创建完成！' as message;
