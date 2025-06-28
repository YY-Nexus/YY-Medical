import type { Locale } from "./translations"

export type MedicalTermKey =
  | "diagnosis.diabetes"
  | "diagnosis.hypertension"
  | "diagnosis.coronary_heart_disease"
  | "diagnosis.stroke"
  | "diagnosis.cancer"
  | "diagnosis.pneumonia"
  | "diagnosis.tuberculosis"
  | "diagnosis.hepatitis"
  | "diagnosis.gastritis"
  | "diagnosis.ulcer"
  | "symptom.fever"
  | "symptom.cough"
  | "symptom.headache"
  | "symptom.dizziness"
  | "symptom.nausea"
  | "symptom.vomiting"
  | "symptom.diarrhea"
  | "symptom.constipation"
  | "symptom.chest_pain"
  | "symptom.abdominal_pain"
  | "symptom.back_pain"
  | "symptom.joint_pain"
  | "symptom.muscle_pain"
  | "symptom.fatigue"
  | "symptom.weakness"
  | "symptom.insomnia"
  | "symptom.loss_of_appetite"
  | "symptom.weight_loss"
  | "symptom.weight_gain"
  | "treatment.medication"
  | "treatment.surgery"
  | "treatment.physical_therapy"
  | "treatment.radiation_therapy"
  | "treatment.chemotherapy"
  | "treatment.immunotherapy"
  | "treatment.hormone_therapy"
  | "treatment.gene_therapy"
  | "treatment.stem_cell_therapy"
  | "treatment.dialysis"
  | "treatment.transplantation"
  | "treatment.rehabilitation"
  | "test.blood_test"
  | "test.urine_test"
  | "test.stool_test"
  | "test.x_ray"
  | "test.ct_scan"
  | "test.mri"
  | "test.ultrasound"
  | "test.ecg"
  | "test.eeg"
  | "test.emg"
  | "test.endoscopy"
  | "test.biopsy"
  | "test.genetic_test"
  | "test.allergy_test"
  | "test.glucose_test"
  | "test.cholesterol_test"
  | "test.liver_function_test"
  | "test.kidney_function_test"
  | "test.thyroid_function_test"
  | "test.hormone_test"
  | "test.tumor_marker_test"
  | "test.pregnancy_test"
  | "test.hiv_test"
  | "test.hepatitis_test"
  | "test.tuberculosis_test"
  | "test.covid_test"
  | "medication.analgesic"
  | "medication.antibiotic"
  | "medication.antiviral"
  | "medication.antifungal"
  | "medication.antiparasitic"
  | "medication.antihistamine"
  | "medication.anti_inflammatory"
  | "medication.antipyretic"
  | "medication.antidepressant"
  | "medication.antipsychotic"
  | "medication.anxiolytic"
  | "medication.hypnotic"
  | "medication.antihypertensive"
  | "medication.diuretic"
  | "medication.anticoagulant"
  | "medication.antidiabetic"
  | "medication.antacid"
  | "medication.laxative"
  | "medication.antidiarrheal"
  | "medication.antiemetic"
  | "medication.bronchodilator"
  | "medication.decongestant"
  | "medication.expectorant"
  | "medication.antitussive"
  | "medication.corticosteroid"
  | "medication.hormone_replacement"
  | "medication.contraceptive"
  | "medication.vitamin"
  | "medication.mineral"
  | "medication.enzyme"
  | "medication.vaccine"
  | "medication.immunosuppressant"
  | "medication.antineoplastic"
  | "body_part.head"
  | "body_part.neck"
  | "body_part.shoulder"
  | "body_part.arm"
  | "body_part.elbow"
  | "body_part.wrist"
  | "body_part.hand"
  | "body_part.finger"
  | "body_part.chest"
  | "body_part.abdomen"
  | "body_part.back"
  | "body_part.hip"
  | "body_part.leg"
  | "body_part.knee"
  | "body_part.ankle"
  | "body_part.foot"
  | "body_part.toe"
  | "body_part.brain"
  | "body_part.heart"
  | "body_part.lung"
  | "body_part.liver"
  | "body_part.kidney"
  | "body_part.stomach"
  | "body_part.intestine"
  | "body_part.pancreas"
  | "body_part.spleen"
  | "body_part.gallbladder"
  | "body_part.bladder"
  | "body_part.uterus"
  | "body_part.ovary"
  | "body_part.prostate"
  | "body_part.testis"
  | "body_part.thyroid"
  | "body_part.adrenal"
  | "body_part.pituitary"
  | "body_part.eye"
  | "body_part.ear"
  | "body_part.nose"
  | "body_part.mouth"
  | "body_part.tongue"
  | "body_part.throat"
  | "body_part.skin"
  | "body_part.muscle"
  | "body_part.bone"
  | "body_part.joint"
  | "body_part.tendon"
  | "body_part.ligament"
  | "body_part.nerve"
  | "body_part.blood_vessel"
  | "body_part.lymph_node"
  | "specialty.cardiology"
  | "specialty.dermatology"
  | "specialty.endocrinology"
  | "specialty.gastroenterology"
  | "specialty.hematology"
  | "specialty.immunology"
  | "specialty.infectious_disease"
  | "specialty.nephrology"
  | "specialty.neurology"
  | "specialty.oncology"
  | "specialty.ophthalmology"
  | "specialty.orthopedics"
  | "specialty.otolaryngology"
  | "specialty.pediatrics"
  | "specialty.psychiatry"
  | "specialty.pulmonology"
  | "specialty.rheumatology"
  | "specialty.urology"
  | "specialty.gynecology"
  | "specialty.obstetrics"
  | "specialty.general_surgery"
  | "specialty.neurosurgery"
  | "specialty.cardiac_surgery"
  | "specialty.thoracic_surgery"
  | "specialty.vascular_surgery"
  | "specialty.plastic_surgery"
  | "specialty.colorectal_surgery"
  | "specialty.transplant_surgery"
  | "specialty.anesthesiology"
  | "specialty.emergency_medicine"
  | "specialty.family_medicine"
  | "specialty.internal_medicine"
  | "specialty.pathology"
  | "specialty.radiology"
  | "specialty.rehabilitation"
  | "specialty.sports_medicine"
  | "specialty.geriatrics"
  | "specialty.palliative_care"
  | "specialty.preventive_medicine"
  | "ai_model.classification"
  | "ai_model.regression"
  | "ai_model.clustering"
  | "ai_model.dimensionality_reduction"
  | "ai_model.neural_network"
  | "ai_model.deep_learning"
  | "ai_model.reinforcement_learning"
  | "ai_model.natural_language_processing"
  | "ai_model.computer_vision"
  | "ai_model.speech_recognition"
  | "ai_model.generative_model"
  | "ai_model.transformer"
  | "ai_model.cnn"
  | "ai_model.rnn"
  | "ai_model.lstm"
  | "ai_model.gru"
  | "ai_model.gan"
  | "ai_model.vae"
  | "ai_model.autoencoder"
  | "ai_model.bert"
  | "ai_model.gpt"
  | "ai_model.t5"
  | "ai_model.resnet"
  | "ai_model.vgg"
  | "ai_model.inception"
  | "ai_model.efficientnet"
  | "ai_model.yolo"
  | "ai_model.ssd"
  | "ai_model.faster_rcnn"
  | "ai_model.mask_rcnn"
  | "ai_model.unet"
  | "ai_model.segnet"
  | "ai_model.deeplabv3"
  | "ai_model.pix2pix"
  | "ai_model.cyclegan"
  | "ai_model.stylegan"
  | "ai_model.diffusion_model"
  | "ai_model.stable_diffusion"
  | "ai_model.dalle"
  | "ai_model.clip"
  | "ai_model.whisper"
  | "ai_model.wav2vec"
  | "ai_model.tacotron"
  | "ai_model.wavenet"
  | "ai_model.alphafold"
  | "ai_model.megatron"
  | "ai_model.palm"
  | "ai_model.llama"
  | "ai_model.mistral"
  | "ai_model.gemini"
  | "ai_model.claude"

export const medicalTerms: Record<Locale, Record<MedicalTermKey, string>> = {
  "zh-CN": {
    // 诊断
    "diagnosis.diabetes": "糖尿病",
    "diagnosis.hypertension": "高血压",
    "diagnosis.coronary_heart_disease": "冠心病",
    "diagnosis.stroke": "脑卒中",
    "diagnosis.cancer": "癌症",
    "diagnosis.pneumonia": "肺炎",
    "diagnosis.tuberculosis": "结核病",
    "diagnosis.hepatitis": "肝炎",
    "diagnosis.gastritis": "胃炎",
    "diagnosis.ulcer": "溃疡",

    // 症状
    "symptom.fever": "发热",
    "symptom.cough": "咳嗽",
    "symptom.headache": "头痛",
    "symptom.dizziness": "头晕",
    "symptom.nausea": "恶心",
    "symptom.vomiting": "呕吐",
    "symptom.diarrhea": "腹泻",
    "symptom.constipation": "便秘",
    "symptom.chest_pain": "胸痛",
    "symptom.abdominal_pain": "腹痛",
    "symptom.back_pain": "背痛",
    "symptom.joint_pain": "关节痛",
    "symptom.muscle_pain": "肌肉痛",
    "symptom.fatigue": "疲劳",
    "symptom.weakness": "乏力",
    "symptom.insomnia": "失眠",
    "symptom.loss_of_appetite": "食欲不振",
    "symptom.weight_loss": "体重减轻",
    "symptom.weight_gain": "体重增加",

    // 治疗
    "treatment.medication": "药物治疗",
    "treatment.surgery": "手术治疗",
    "treatment.physical_therapy": "物理治疗",
    "treatment.radiation_therapy": "放射治疗",
    "treatment.chemotherapy": "化学治疗",
    "treatment.immunotherapy": "免疫治疗",
    "treatment.hormone_therapy": "激素治疗",
    "treatment.gene_therapy": "基因治疗",
    "treatment.stem_cell_therapy": "干细胞治疗",
    "treatment.dialysis": "透析",
    "treatment.transplantation": "器官移植",
    "treatment.rehabilitation": "康复治疗",

    // 检查
    "test.blood_test": "血液检查",
    "test.urine_test": "尿液检查",
    "test.stool_test": "粪便检查",
    "test.x_ray": "X光检查",
    "test.ct_scan": "CT扫描",
    "test.mri": "核磁共振",
    "test.ultrasound": "超声波检查",
    "test.ecg": "心电图",
    "test.eeg": "脑电图",
    "test.emg": "肌电图",
    "test.endoscopy": "内窥镜检查",
    "test.biopsy": "活组织检查",
    "test.genetic_test": "基因检测",
    "test.allergy_test": "过敏原检测",
    "test.glucose_test": "血糖检测",
    "test.cholesterol_test": "胆固醇检测",
    "test.liver_function_test": "肝功能检测",
    "test.kidney_function_test": "肾功能检测",
    "test.thyroid_function_test": "甲状腺功能检测",
    "test.hormone_test": "激素检测",
    "test.tumor_marker_test": "肿瘤标志物检测",
    "test.pregnancy_test": "妊娠检测",
    "test.hiv_test": "艾滋病病毒检测",
    "test.hepatitis_test": "肝炎病毒检测",
    "test.tuberculosis_test": "结核菌检测",
    "test.covid_test": "新冠病毒检测",

    // 药物
    "medication.analgesic": "镇痛药",
    "medication.antibiotic": "抗生素",
    "medication.antiviral": "抗病毒药",
    "medication.antifungal": "抗真菌药",
    "medication.antiparasitic": "抗寄生虫药",
    "medication.antihistamine": "抗组胺药",
    "medication.anti_inflammatory": "抗炎药",
    "medication.antipyretic": "退热药",
    "medication.antidepressant": "抗抑郁药",
    "medication.antipsychotic": "抗精神病药",
    "medication.anxiolytic": "抗焦虑药",
    "medication.hypnotic": "催眠药",
    "medication.antihypertensive": "降压药",
    "medication.diuretic": "利尿药",
    "medication.anticoagulant": "抗凝血药",
    "medication.antidiabetic": "降糖药",
    "medication.antacid": "抗酸药",
    "medication.laxative": "泻药",
    "medication.antidiarrheal": "止泻药",
    "medication.antiemetic": "止吐药",
    "medication.bronchodilator": "支气管扩张药",
    "medication.decongestant": "减充血药",
    "medication.expectorant": "祛痰药",
    "medication.antitussive": "止咳药",
    "medication.corticosteroid": "皮质类固醇",
    "medication.hormone_replacement": "激素替代药",
    "medication.contraceptive": "避孕药",
    "medication.vitamin": "维生素",
    "medication.mineral": "矿物质",
    "medication.enzyme": "酶制剂",
    "medication.vaccine": "疫苗",
    "medication.immunosuppressant": "免疫抑制剂",
    "medication.antineoplastic": "抗肿瘤药",

    // 身体部位
    "body_part.head": "头部",
    "body_part.neck": "颈部",
    "body_part.shoulder": "肩部",
    "body_part.arm": "手臂",
    "body_part.elbow": "肘部",
    "body_part.wrist": "手腕",
    "body_part.hand": "手",
    "body_part.finger": "手指",
    "body_part.chest": "胸部",
    "body_part.abdomen": "腹部",
    "body_part.back": "背部",
    "body_part.hip": "臀部",
    "body_part.leg": "腿",
    "body_part.knee": "膝盖",
    "body_part.ankle": "踝部",
    "body_part.foot": "脚",
    "body_part.toe": "脚趾",
    "body_part.brain": "大脑",
    "body_part.heart": "心脏",
    "body_part.lung": "肺",
    "body_part.liver": "肝脏",
    "body_part.kidney": "肾脏",
    "body_part.stomach": "胃",
    "body_part.intestine": "肠",
    "body_part.pancreas": "胰腺",
    "body_part.spleen": "脾脏",
    "body_part.gallbladder": "胆囊",
    "body_part.bladder": "膀胱",
    "body_part.uterus": "子宫",
    "body_part.ovary": "卵巢",
    "body_part.prostate": "前列腺",
    "body_part.testis": "睾丸",
    "body_part.thyroid": "甲状腺",
    "body_part.adrenal": "肾上腺",
    "body_part.pituitary": "垂体",
    "body_part.eye": "眼睛",
    "body_part.ear": "耳朵",
    "body_part.nose": "鼻子",
    "body_part.mouth": "嘴",
    "body_part.tongue": "舌头",
    "body_part.throat": "喉咙",
    "body_part.skin": "皮肤",
    "body_part.muscle": "肌肉",
    "body_part.bone": "骨骼",
    "body_part.joint": "关节",
    "body_part.tendon": "肌腱",
    "body_part.ligament": "韧带",
    "body_part.nerve": "神经",
    "body_part.blood_vessel": "血管",
    "body_part.lymph_node": "淋巴结",

    // 专科
    "specialty.cardiology": "心脏科",
    "specialty.dermatology": "皮肤科",
    "specialty.endocrinology": "内分泌科",
    "specialty.gastroenterology": "消化科",
    "specialty.hematology": "血液科",
    "specialty.immunology": "免疫科",
    "specialty.infectious_disease": "感染科",
    "specialty.nephrology": "肾脏科",
    "specialty.neurology": "神经科",
    "specialty.oncology": "肿瘤科",
    "specialty.ophthalmology": "眼科",
    "specialty.orthopedics": "骨科",
    "specialty.otolaryngology": "耳鼻喉科",
    "specialty.pediatrics": "儿科",
    "specialty.psychiatry": "精神科",
    "specialty.pulmonology": "呼吸科",
    "specialty.rheumatology": "风湿科",
    "specialty.urology": "泌尿科",
    "specialty.gynecology": "妇科",
    "specialty.obstetrics": "产科",
    "specialty.general_surgery": "普通外科",
    "specialty.neurosurgery": "神经外科",
    "specialty.cardiac_surgery": "心脏外科",
    "specialty.thoracic_surgery": "胸外科",
    "specialty.vascular_surgery": "血管外科",
    "specialty.plastic_surgery": "整形外科",
    "specialty.colorectal_surgery": "结直肠外科",
    "specialty.transplant_surgery": "器官移植科",
    "specialty.anesthesiology": "麻醉科",
    "specialty.emergency_medicine": "急诊医学科",
    "specialty.family_medicine": "家庭医学科",
    "specialty.internal_medicine": "内科",
    "specialty.pathology": "病理科",
    "specialty.radiology": "放射科",
    "specialty.rehabilitation": "康复医学科",
    "specialty.sports_medicine": "运动医学科",
    "specialty.geriatrics": "老年医学科",
    "specialty.palliative_care": "姑息治疗科",
    "specialty.preventive_medicine": "预防医学科",

    // AI模型
    "ai_model.classification": "分类模型",
    "ai_model.regression": "回归模型",
    "ai_model.clustering": "聚类模型",
    "ai_model.dimensionality_reduction": "降维模型",
    "ai_model.neural_network": "神经网络",
    "ai_model.deep_learning": "深度学习",
    "ai_model.reinforcement_learning": "强化学习",
    "ai_model.natural_language_processing": "自然语言处理",
    "ai_model.computer_vision": "计算机视觉",
    "ai_model.speech_recognition": "语音识别",
    "ai_model.generative_model": "生成模型",
    "ai_model.transformer": "Transformer模型",
    "ai_model.cnn": "卷积神经网络",
    "ai_model.rnn": "循环神经网络",
    "ai_model.lstm": "长短期记忆网络",
    "ai_model.gru": "门控循环单元",
    "ai_model.gan": "生成对抗网络",
    "ai_model.vae": "变分自编码器",
    "ai_model.autoencoder": "自编码器",
    "ai_model.bert": "BERT模型",
    "ai_model.gpt": "GPT模型",
    "ai_model.t5": "T5模型",
    "ai_model.resnet": "ResNet模型",
    "ai_model.vgg": "VGG模型",
    "ai_model.inception": "Inception模型",
    "ai_model.efficientnet": "EfficientNet模型",
    "ai_model.yolo": "YOLO模型",
    "ai_model.ssd": "SSD模型",
    "ai_model.faster_rcnn": "Faster R-CNN模型",
    "ai_model.mask_rcnn": "Mask R-CNN模型",
    "ai_model.unet": "U-Net模型",
    "ai_model.segnet": "SegNet模型",
    "ai_model.deeplabv3": "DeepLabV3模型",
    "ai_model.pix2pix": "Pix2Pix模型",
    "ai_model.cyclegan": "CycleGAN模型",
    "ai_model.stylegan": "StyleGAN模型",
    "ai_model.diffusion_model": "扩散模型",
    "ai_model.stable_diffusion": "Stable Diffusion模型",
    "ai_model.dalle": "DALL-E模型",
    "ai_model.clip": "CLIP模型",
    "ai_model.whisper": "Whisper模型",
    "ai_model.wav2vec": "Wav2Vec模型",
    "ai_model.tacotron": "Tacotron模型",
    "ai_model.wavenet": "WaveNet模型",
    "ai_model.alphafold": "AlphaFold模型",
    "ai_model.megatron": "Megatron模型",
    "ai_model.palm": "PaLM模型",
    "ai_model.llama": "LLaMA模型",
    "ai_model.mistral": "Mistral模型",
    "ai_model.gemini": "Gemini模型",
    "ai_model.claude": "Claude模型",
  },
  "en-US": {
    // Diagnoses
    "diagnosis.diabetes": "Diabetes",
    "diagnosis.hypertension": "Hypertension",
    "diagnosis.coronary_heart_disease": "Coronary Heart Disease",
    "diagnosis.stroke": "Stroke",
    "diagnosis.cancer": "Cancer",
    "diagnosis.pneumonia": "Pneumonia",
    "diagnosis.tuberculosis": "Tuberculosis",
    "diagnosis.hepatitis": "Hepatitis",
    "diagnosis.gastritis": "Gastritis",
    "diagnosis.ulcer": "Ulcer",

    // Symptoms
    "symptom.fever": "Fever",
    "symptom.cough": "Cough",
    "symptom.headache": "Headache",
    "symptom.dizziness": "Dizziness",
    "symptom.nausea": "Nausea",
    "symptom.vomiting": "Vomiting",
    "symptom.diarrhea": "Diarrhea",
    "symptom.constipation": "Constipation",
    "symptom.chest_pain": "Chest Pain",
    "symptom.abdominal_pain": "Abdominal Pain",
    "symptom.back_pain": "Back Pain",
    "symptom.joint_pain": "Joint Pain",
    "symptom.muscle_pain": "Muscle Pain",
    "symptom.fatigue": "Fatigue",
    "symptom.weakness": "Weakness",
    "symptom.insomnia": "Insomnia",
    "symptom.loss_of_appetite": "Loss of Appetite",
    "symptom.weight_loss": "Weight Loss",
    "symptom.weight_gain": "Weight Gain",

    // Treatments
    "treatment.medication": "Medication",
    "treatment.surgery": "Surgery",
    "treatment.physical_therapy": "Physical Therapy",
    "treatment.radiation_therapy": "Radiation Therapy",
    "treatment.chemotherapy": "Chemotherapy",
    "treatment.immunotherapy": "Immunotherapy",
    "treatment.hormone_therapy": "Hormone Therapy",
    "treatment.gene_therapy": "Gene Therapy",
    "treatment.stem_cell_therapy": "Stem Cell Therapy",
    "treatment.dialysis": "Dialysis",
    "treatment.transplantation": "Transplantation",
    "treatment.rehabilitation": "Rehabilitation",

    // Tests
    "test.blood_test": "Blood Test",
    "test.urine_test": "Urine Test",
    "test.stool_test": "Stool Test",
    "test.x_ray": "X-Ray",
    "test.ct_scan": "CT Scan",
    "test.mri": "MRI",
    "test.ultrasound": "Ultrasound",
    "test.ecg": "ECG",
    "test.eeg": "EEG",
    "test.emg": "EMG",
    "test.endoscopy": "Endoscopy",
    "test.biopsy": "Biopsy",
    "test.genetic_test": "Genetic Test",
    "test.allergy_test": "Allergy Test",
    "test.glucose_test": "Glucose Test",
    "test.cholesterol_test": "Cholesterol Test",
    "test.liver_function_test": "Liver Function Test",
    "test.kidney_function_test": "Kidney Function Test",
    "test.thyroid_function_test": "Thyroid Function Test",
    "test.hormone_test": "Hormone Test",
    "test.tumor_marker_test": "Tumor Marker Test",
    "test.pregnancy_test": "Pregnancy Test",
    "test.hiv_test": "HIV Test",
    "test.hepatitis_test": "Hepatitis Test",
    "test.tuberculosis_test": "Tuberculosis Test",
    "test.covid_test": "COVID Test",

    // Medications
    "medication.analgesic": "Analgesic",
    "medication.antibiotic": "Antibiotic",
    "medication.antiviral": "Antiviral",
    "medication.antifungal": "Antifungal",
    "medication.antiparasitic": "Antiparasitic",
    "medication.antihistamine": "Antihistamine",
    "medication.anti_inflammatory": "Anti-inflammatory",
    "medication.antipyretic": "Antipyretic",
    "medication.antidepressant": "Antidepressant",
    "medication.antipsychotic": "Antipsychotic",
    "medication.anxiolytic": "Anxiolytic",
    "medication.hypnotic": "Hypnotic",
    "medication.antihypertensive": "Antihypertensive",
    "medication.diuretic": "Diuretic",
    "medication.anticoagulant": "Anticoagulant",
    "medication.antidiabetic": "Antidiabetic",
    "medication.antacid": "Antacid",
    "medication.laxative": "Laxative",
    "medication.antidiarrheal": "Antidiarrheal",
    "medication.antiemetic": "Antiemetic",
    "medication.bronchodilator": "Bronchodilator",
    "medication.decongestant": "Decongestant",
    "medication.expectorant": "Expectorant",
    "medication.antitussive": "Antitussive",
    "medication.corticosteroid": "Corticosteroid",
    "medication.hormone_replacement": "Hormone Replacement",
    "medication.contraceptive": "Contraceptive",
    "medication.vitamin": "Vitamin",
    "medication.mineral": "Mineral",
    "medication.enzyme": "Enzyme",
    "medication.vaccine": "Vaccine",
    "medication.immunosuppressant": "Immunosuppressant",
    "medication.antineoplastic": "Antineoplastic",

    // Body Parts
    "body_part.head": "Head",
    "body_part.neck": "Neck",
    "body_part.shoulder": "Shoulder",
    "body_part.arm": "Arm",
    "body_part.elbow": "Elbow",
    "body_part.wrist": "Wrist",
    "body_part.hand": "Hand",
    "body_part.finger": "Finger",
    "body_part.chest": "Chest",
    "body_part.abdomen": "Abdomen",
    "body_part.back": "Back",
    "body_part.hip": "Hip",
    "body_part.leg": "Leg",
    "body_part.knee": "Knee",
    "body_part.ankle": "Ankle",
    "body_part.foot": "Foot",
    "body_part.toe": "Toe",
    "body_part.brain": "Brain",
    "body_part.heart": "Heart",
    "body_part.lung": "Lung",
    "body_part.liver": "Liver",
    "body_part.kidney": "Kidney",
    "body_part.stomach": "Stomach",
    "body_part.intestine": "Intestine",
    "body_part.pancreas": "Pancreas",
    "body_part.spleen": "Spleen",
    "body_part.gallbladder": "Gallbladder",
    "body_part.bladder": "Bladder",
    "body_part.uterus": "Uterus",
    "body_part.ovary": "Ovary",
    "body_part.prostate": "Prostate",
    "body_part.testis": "Testis",
    "body_part.thyroid": "Thyroid",
    "body_part.adrenal": "Adrenal",
    "body_part.pituitary": "Pituitary",
    "body_part.eye": "Eye",
    "body_part.ear": "Ear",
    "body_part.nose": "Nose",
    "body_part.mouth": "Mouth",
    "body_part.tongue": "Tongue",
    "body_part.throat": "Throat",
    "body_part.skin": "Skin",
    "body_part.muscle": "Muscle",
    "body_part.bone": "Bone",
    "body_part.joint": "Joint",
    "body_part.tendon": "Tendon",
    "body_part.ligament": "Ligament",
    "body_part.nerve": "Nerve",
    "body_part.blood_vessel": "Blood Vessel",
    "body_part.lymph_node": "Lymph Node",

    // Specialties
    "specialty.cardiology": "Cardiology",
    "specialty.dermatology": "Dermatology",
    "specialty.endocrinology": "Endocrinology",
    "specialty.gastroenterology": "Gastroenterology",
    "specialty.hematology": "Hematology",
    "specialty.immunology": "Immunology",
    "specialty.infectious_disease": "Infectious Disease",
    "specialty.nephrology": "Nephrology",
    "specialty.neurology": "Neurology",
    "specialty.oncology": "Oncology",
    "specialty.ophthalmology": "Ophthalmology",
    "specialty.orthopedics": "Orthopedics",
    "specialty.otolaryngology": "Otolaryngology",
    "specialty.pediatrics": "Pediatrics",
    "specialty.psychiatry": "Psychiatry",
    "specialty.pulmonology": "Pulmonology",
    "specialty.rheumatology": "Rheumatology",
    "specialty.urology": "Urology",
    "specialty.gynecology": "Gynecology",
    "specialty.obstetrics": "Obstetrics",
    "specialty.general_surgery": "General Surgery",
    "specialty.neurosurgery": "Neurosurgery",
    "specialty.cardiac_surgery": "Cardiac Surgery",
    "specialty.thoracic_surgery": "Thoracic Surgery",
    "specialty.vascular_surgery": "Vascular Surgery",
    "specialty.plastic_surgery": "Plastic Surgery",
    "specialty.colorectal_surgery": "Colorectal Surgery",
    "specialty.transplant_surgery": "Transplant Surgery",
    "specialty.anesthesiology": "Anesthesiology",
    "specialty.emergency_medicine": "Emergency Medicine",
    "specialty.family_medicine": "Family Medicine",
    "specialty.internal_medicine": "Internal Medicine",
    "specialty.pathology": "Pathology",
    "specialty.radiology": "Radiology",
    "specialty.rehabilitation": "Rehabilitation",
    "specialty.sports_medicine": "Sports Medicine",
    "specialty.geriatrics": "Geriatrics",
    "specialty.palliative_care": "Palliative Care",
    "specialty.preventive_medicine": "Preventive Medicine",

    // AI Models
    "ai_model.classification": "Classification Model",
    "ai_model.regression": "Regression Model",
    "ai_model.clustering": "Clustering Model",
    "ai_model.dimensionality_reduction": "Dimensionality Reduction Model",
    "ai_model.neural_network": "Neural Network",
    "ai_model.deep_learning": "Deep Learning",
    "ai_model.reinforcement_learning": "Reinforcement Learning",
    "ai_model.natural_language_processing": "Natural Language Processing",
    "ai_model.computer_vision": "Computer Vision",
    "ai_model.speech_recognition": "Speech Recognition",
    "ai_model.generative_model": "Generative Model",
    "ai_model.transformer": "Transformer Model",
    "ai_model.cnn": "Convolutional Neural Network",
    "ai_model.rnn": "Recurrent Neural Network",
    "ai_model.lstm": "Long Short-Term Memory",
    "ai_model.gru": "Gated Recurrent Unit",
    "ai_model.gan": "Generative Adversarial Network",
    "ai_model.vae": "Variational Autoencoder",
    "ai_model.autoencoder": "Autoencoder",
    "ai_model.bert": "BERT Model",
    "ai_model.gpt": "GPT Model",
    "ai_model.t5": "T5 Model",
    "ai_model.resnet": "ResNet Model",
    "ai_model.vgg": "VGG Model",
    "ai_model.inception": "Inception Model",
    "ai_model.efficientnet": "EfficientNet Model",
    "ai_model.yolo": "YOLO Model",
    "ai_model.ssd": "SSD Model",
    "ai_model.faster_rcnn": "Faster R-CNN Model",
    "ai_model.mask_rcnn": "Mask R-CNN Model",
    "ai_model.unet": "U-Net Model",
    "ai_model.segnet": "SegNet Model",
    "ai_model.deeplabv3": "DeepLabV3 Model",
    "ai_model.pix2pix": "Pix2Pix Model",
    "ai_model.cyclegan": "CycleGAN Model",
    "ai_model.stylegan": "StyleGAN Model",
    "ai_model.diffusion_model": "Diffusion Model",
    "ai_model.stable_diffusion": "Stable Diffusion Model",
    "ai_model.dalle": "DALL-E Model",
    "ai_model.clip": "CLIP Model",
    "ai_model.whisper": "Whisper Model",
    "ai_model.wav2vec": "Wav2Vec Model",
    "ai_model.tacotron": "Tacotron Model",
    "ai_model.wavenet": "WaveNet Model",
    "ai_model.alphafold": "AlphaFold Model",
    "ai_model.megatron": "Megatron Model",
    "ai_model.palm": "PaLM Model",
    "ai_model.llama": "LLaMA Model",
    "ai_model.mistral": "Mistral Model",
    "ai_model.gemini": "Gemini Model",
    "ai_model.claude": "Claude Model",
  },
}
