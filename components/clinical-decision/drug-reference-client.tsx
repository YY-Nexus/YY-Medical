"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Pill,
  Filter,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Clock,
  Bookmark,
  FileText,
  Plus,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// 模拟药物数据
const drugs = [
  {
    id: "D001",
    name: "二甲双胍",
    englishName: "Metformin",
    category: "口服降糖药",
    subcategory: "双胍类",
    commonBrands: ["格华止", "达美康"],
    approvalStatus: "已批准",
    prescriptionType: "处方药",
    formulations: ["片剂", "缓释片"],
    strengths: ["0.25g", "0.5g", "0.85g"],
    indications: ["2型糖尿病"],
    contraindications: [
      "肾功能不全（eGFR < 30 ml/min/1.73m²）",
      "急性或慢性代谢性酸中毒",
      "严重感染",
      "严重创伤",
      "手术前后",
      "严重肝功能不全",
      "酗酒",
      "休克",
      "心力衰竭",
      "严重缺氧状态",
    ],
    adverseEffects: [
      { name: "胃肠道反应", severity: "常见", description: "恶心、呕吐、腹泻、腹痛、食欲减退" },
      { name: "乳酸性酸中毒", severity: "罕见", description: "严重不良反应，可能危及生命" },
      { name: "维生素B12缺乏", severity: "少见", description: "长期使用可能导致维生素B12吸收减少" },
    ],
    dosageAndAdministration: [
      {
        population: "成人",
        initialDose: "从0.5g，每日1-2次开始",
        maintenanceDose: "1.5-2.0g/日，分2-3次服用",
        maxDose: "2.0g/日",
        adjustments: "肾功能不全患者需调整剂量或避免使用",
      },
      {
        population: "老年患者",
        initialDose: "从0.5g，每日1次开始",
        maintenanceDose: "根据耐受性和肾功能逐渐调整",
        maxDose: "通常低于成人最大剂量",
        adjustments: "需定期评估肾功能",
      },
    ],
    pharmacokinetics: {
      absorption: "口服吸收，主要在小肠，生物利用度约50-60%",
      distribution: "血浆蛋白结合率低，分布容积约654±358L",
      metabolism: "不经肝脏代谢",
      elimination: "原形从尿中排泄，半衰期约6.2小时",
    },
    mechanismOfAction: "降低肝脏葡萄糖输出，增加外周组织对葡萄糖的摄取和利用，改善胰岛素敏感性",
    drugInteractions: [
      {
        drug: "碘造影剂",
        severity: "严重",
        effect: "增加乳酸性酸中毒风险",
        recommendation: "检查前48小时停药，检查后至少重新评估肾功能再恢复用药",
      },
      {
        drug: "醋氨酚胺",
        severity: "中度",
        effect: "可能增加二甲双胍血药浓度",
        recommendation: "联合使用时监测血糖",
      },
      {
        drug: "西咪替丁",
        severity: "中度",
        effect: "可能增加二甲双胍血药浓度",
        recommendation: "联合使用时监测血糖",
      },
    ],
    specialPopulations: {
      pregnancy: "FDA妊娠分级B类，仅在潜在获益大于风险时使用",
      breastfeeding: "分泌入乳汁，哺乳期使用需谨慎",
      pediatric: "10岁以上儿童可使用，需专科医生指导",
      geriatric: "老年患者需从小剂量开始，根据肾功能调整",
      renalImpairment: "轻中度肾功能不全需调整剂量，重度禁用",
      hepaticImpairment: "严重肝功能不全禁用",
    },
    patientCounseling: [
      "随餐或餐后服用，以减少胃肠道反应",
      "定期监测肾功能和维生素B12水平",
      "注意乳酸性酸中毒的早期症状（如不明原因的肌肉痛、呼吸困难、嗜睡、腹痛等）",
      "手术前暂停使用",
      "避免过量饮酒",
    ],
    clinicalTrials: [
      {
        name: "UKPDS",
        findings: "长期使用二甲双胍可降低2型糖尿病患者的心血管事件和死亡风险",
        reference: "UK Prospective Diabetes Study (UKPDS) Group. Lancet. 1998;352:854-865",
      },
      {
        name: "ADOPT",
        findings: "与磺脲类药物和噻唑烷二酮类药物相比，二甲双胍的持久性更好",
        reference: "Kahn SE, et al. N Engl J Med. 2006;355:2427-2443",
      },
    ],
    references: [
      "中国2型糖尿病防治指南(2020年版)",
      "美国糖尿病协会(ADA)指南(2023年版)",
      "国家药品监督管理局批准说明书",
    ],
  },
  {
    id: "D002",
    name: "阿托伐他汀",
    englishName: "Atorvastatin",
    category: "调脂药",
    subcategory: "他汀类",
    commonBrands: ["立普妥", "阿乐"],
    approvalStatus: "已批准",
    prescriptionType: "处方药",
    formulations: ["片剂"],
    strengths: ["10mg", "20mg", "40mg"],
    indications: ["高胆固醇血症", "混合型高脂血症", "纯合子家族性高胆固醇血症", "心血管疾病一级和二级预防"],
    contraindications: ["活动性肝病", "原因不明的持续性血清转氨酶升高", "对本品任何成分过敏", "妊娠和哺乳期"],
    adverseEffects: [
      { name: "肌肉症状", severity: "常见", description: "肌痛、肌无力、肌酸激酶升高" },
      { name: "肝功能异常", severity: "少见", description: "转氨酶升高" },
      { name: "消化道症状", severity: "常见", description: "便秘、腹胀、消化不良" },
      { name: "横纹肌溶解", severity: "罕见", description: "严重不良反应，可能危及生命" },
    ],
    dosageAndAdministration: [
      {
        population: "成人",
        initialDose: "10mg，每日1次",
        maintenanceDose: "10-80mg/日，每日1次",
        maxDose: "80mg/日",
        adjustments: "根据血脂水平和耐受性调整",
      },
      {
        population: "老年患者",
        initialDose: "10mg，每日1次",
        maintenanceDose: "根据耐受性和疗效调整",
        maxDose: "80mg/日",
        adjustments: "通常无需特殊调整",
      },
    ],
    pharmacokinetics: {
      absorption: "口服吸收，受首过效应影响，绝对生物利用度约14%",
      distribution: "血浆蛋白结合率>98%",
      metabolism: "主要经CYP3A4代谢",
      elimination: "主要经胆汁排泄，半衰期约14小时",
    },
    mechanismOfAction: "抑制HMG-CoA还原酶，减少胆固醇合成，增加LDL受体表达，降低血浆LDL-C水平",
    drugInteractions: [
      {
        drug: "环孢素",
        severity: "严重",
        effect: "增加阿托伐他汀血药浓度和肌病风险",
        recommendation: "避免联合使用",
      },
      {
        drug: "红霉素",
        severity: "中度",
        effect: "增加阿托伐他汀血药浓度",
        recommendation: "联合使用时减少阿托伐他汀剂量",
      },
      {
        drug: "地尔硫卓",
        severity: "中度",
        effect: "增加阿托伐他汀血药浓度",
        recommendation: "联合使用时监测不良反应",
      },
    ],
    specialPopulations: {
      pregnancy: "FDA妊娠分级X类，禁用",
      breastfeeding: "禁用",
      pediatric: "10岁以上儿童可使用，需专科医生指导",
      geriatric: "通常无需特殊调整",
      renalImpairment: "无需调整剂量",
      hepaticImpairment: "活动性肝病禁用，肝功能不全患者慎用",
    },
    patientCounseling: [
      "可在一天中任何时间服用，不受食物影响",
      "定期监测肝功能和肌酸激酶",
      "报告任何不明原因的肌肉疼痛、压痛或无力",
      "避免大量饮酒",
      "妊娠期间禁用，育龄期妇女应采取适当避孕措施",
    ],
    clinicalTrials: [
      {
        name: "ASCOT-LLA",
        findings: "阿托伐他汀显著降低高血压患者的心血管事件风险",
        reference: "Sever PS, et al. Lancet. 2003;361:1149-1158",
      },
      {
        name: "PROVE IT-TIMI 22",
        findings: "高剂量阿托伐他汀治疗优于标准剂量普伐他汀治疗",
        reference: "Cannon CP, et al. N Engl J Med. 2004;350:1495-1504",
      },
    ],
    references: [
      "中国成人血脂异常防治指南(2016年修订版)",
      "美国心脏协会(AHA)/美国心脏病学会(ACC)血脂管理指南(2018年版)",
      "国家药品监督管理局批准说明书",
    ],
  },
  {
    id: "D003",
    name: "氯吡格雷",
    englishName: "Clopidogrel",
    category: "抗血小板药",
    subcategory: "噻吩并吡啶类",
    commonBrands: ["波立维", "帅信"],
    approvalStatus: "已批准",
    prescriptionType: "处方药",
    formulations: ["片剂"],
    strengths: ["25mg", "75mg"],
    indications: [
      "急性冠脉综合征",
      "经皮冠状动脉介入治疗(PCI)后",
      "缺血性卒中",
      "外周动脉疾病",
      "心房颤动(不能使用华法林的患者)",
    ],
    contraindications: ["活动性出血", "严重肝功能不全", "对本品任何成分过敏"],
    adverseEffects: [
      { name: "出血", severity: "常见", description: "瘀斑、鼻出血、胃肠道出血、血尿" },
      { name: "血液系统异常", severity: "少见", description: "中性粒细胞减少、血小板减少" },
      { name: "胃肠道反应", severity: "常见", description: "腹痛、消化不良、腹泻" },
      { name: "皮疹", severity: "少见", description: "瘙痒、荨麻疹" },
      { name: "血栓性血小板减少性紫癜", severity: "罕见", description: "严重不良反应，可能危及生命" },
    ],
    dosageAndAdministration: [
      {
        population: "成人",
        initialDose: "负荷剂量300-600mg",
        maintenanceDose: "75mg，每日1次",
        maxDose: "75mg/日",
        adjustments: "通常无需调整",
      },
      {
        population: "老年患者",
        initialDose: "同成人",
        maintenanceDose: "同成人",
        maxDose: "同成人",
        adjustments: "通常无需特殊调整",
      },
    ],
    pharmacokinetics: {
      absorption: "口服吸收迅速",
      distribution: "血浆蛋白结合率94-98%",
      metabolism: "经肝脏CYP450酶系统代谢，主要是CYP2C19",
      elimination: "约50%从尿中排泄，约46%从粪便排泄，半衰期约8小时",
    },
    mechanismOfAction: "不可逆性抑制血小板表面的ADP受体(P2Y12)，抑制血小板聚集",
    drugInteractions: [
      {
        drug: "奥美拉唑",
        severity: "中度",
        effect: "可能降低氯吡格雷的抗血小板作用",
        recommendation: "考虑使用泮托拉唑等替代药物",
      },
      {
        drug: "阿司匹林",
        severity: "轻度",
        effect: "增加出血风险",
        recommendation: "监测出血征象",
      },
      {
        drug: "华法林",
        severity: "中度",
        effect: "增加出血风险",
        recommendation: "监测INR和出血征象",
      },
    ],
    specialPopulations: {
      pregnancy: "FDA妊娠分级B类，仅在潜在获益大于风险时使用",
      breastfeeding: "谨慎使用",
      pediatric: "安全性和有效性尚未确立",
      geriatric: "通常无需特殊调整",
      renalImpairment: "无需调整剂量",
      hepaticImpairment: "重度肝功能不全患者禁用",
    },
    patientCounseling: [
      "按医嘱规律服药，不要擅自停药",
      "报告任何异常出血征象",
      "手术或牙科操作前告知医生正在使用氯吡格雷",
      "避免参与有外伤风险的活动",
      "随身携带药物信息卡",
    ],
    clinicalTrials: [
      {
        name: "CAPRIE",
        findings: "与阿司匹林相比，氯吡格雷在降低心血管事件风险方面略有优势",
        reference: "CAPRIE Steering Committee. Lancet. 1996;348:1329-1339",
      },
      {
        name: "CURE",
        findings: "氯吡格雷加阿司匹林显著降低急性冠脉综合征患者的心血管事件风险",
        reference: "Yusuf S, et al. N Engl J Med. 2001;345:494-502",
      },
    ],
    references: [
      "中国经皮冠状动脉介入治疗指南(2016)",
      "美国心脏病学会(ACC)/美国心脏协会(AHA)指南",
      "国家药品监督管理局批准说明书",
    ],
  },
]

// 模拟药物相互作用数据
const drugInteractions = [
  {
    id: "I001",
    drug1: "阿托伐他汀",
    drug2: "环孢素",
    severity: "严重",
    evidence: "A",
    mechanism: "环孢素抑制OATP1B1转运蛋白和CYP3A4酶，减少阿托伐他汀的肝脏摄取和代谢，显著增加阿托伐他汀的血浆浓度",
    effect: "显著增加阿托伐他汀血浆浓度，增加肌病和横纹肌溶解症风险",
    management: "避免联合使用。如必须联合使用，应使用最低剂量的阿托伐他汀，并密切监测肌肉症状和肌酸激酶水平",
    references: [
      "Lemahieu WP, et al. Am J Transplant. 2005;5:2560-2566",
      "Neuvonen PJ, et al. Clin Pharmacol Ther. 2006;80:522-530",
    ],
  },
  {
    id: "I002",
    drug1: "氯吡格雷",
    drug2: "奥美拉唑",
    severity: "中度",
    evidence: "B",
    mechanism: "奥美拉唑抑制CYP2C19酶，减少氯吡格雷向活性代谢物的转化",
    effect: "降低氯吡格雷的抗血小板作用，可能增加心血管事件风险",
    management: "考虑使用泮托拉唑等对CYP2C19影响较小的质子泵抑制剂替代奥美拉唑，或使用H2受体拮抗剂",
    references: ["Gilard M, et al. J Am Coll Cardiol. 2008;51:256-260", "Ho PM, et al. JAMA. 2009;301:937-944"],
  },
  {
    id: "I003",
    drug1: "二甲双胍",
    drug2: "碘造影剂",
    severity: "严重",
    evidence: "A",
    mechanism: "碘造影剂可能导致肾功能暂时性下降，减少二甲双胍的肾脏清除，增加乳酸性酸中毒风险",
    effect: "增加乳酸性酸中毒风险，可能危及生命",
    management: "碘造影检查前48小时停用二甲双胍，检查后至少重新评估肾功能再恢复用药",
    references: [
      "Goergen SK, et al. Australas Radiol. 2010;54:454-461",
      "Thomsen HS, et al. Eur Radiol. 2011;21:2527-2541",
    ],
  },
  {
    id: "I004",
    drug1: "华法林",
    drug2: "阿司匹林",
    severity: "中度",
    evidence: "A",
    mechanism: "阿司匹林抑制血小板功能并可能对胃肠道黏膜产生直接刺激作用",
    effect: "增加出血风险，特别是胃肠道出血",
    management: "如必须联合使用，应使用最低有效剂量的阿司匹林，密切监测INR和出血征象，考虑使用质子泵抑制剂保护胃黏膜",
    references: [
      "Shorr RI, et al. Ann Intern Med. 1993;118:511-516",
      "Battistella M, et al. Pharmacotherapy. 2005;25:1639-1646",
    ],
  },
  {
    id: "I005",
    drug1: "阿托伐他汀",
    drug2: "红霉素",
    severity: "中度",
    evidence: "B",
    mechanism: "红霉素抑制CYP3A4酶，减少阿托伐他汀的代谢",
    effect: "增加阿托伐他汀血浆浓度，增加肌病风险",
    management: "联合使用期间减少阿托伐他汀剂量，监测肌肉症状和肌酸激酶水平",
    references: [
      "Kantola T, et al. Clin Pharmacol Ther. 1998;64:58-65",
      "Siedlik PH, et al. J Clin Pharmacol. 1999;39:501-504",
    ],
  },
]

// 模拟用药指导数据
const medicationGuidelines = [
  {
    id: "G001",
    title: "他汀类药物使用指南",
    category: "调脂药",
    lastUpdated: "2023-12-10",
    source: "中国成人血脂异常防治指南(2016年修订版)",
    recommendations: [
      {
        title: "适应症",
        content: "高胆固醇血症、混合型高脂血症、动脉粥样硬化性心血管疾病一级和二级预防",
      },
      {
        title: "治疗目标",
        content:
          "根据心血管疾病风险分层确定LDL-C目标值：极高危患者<1.8mmol/L，高危患者<2.6mmol/L，中危患者<3.4mmol/L，低危患者<4.1mmol/L",
      },
      {
        title: "药物选择",
        content:
          "首选他汀类药物，根据降脂幅度需求选择不同强度的他汀：高强度(阿托伐他汀40-80mg，瑞舒伐他汀20-40mg)，中强度(阿托伐他汀10-20mg，瑞舒伐他汀5-10mg，辛伐他汀20-40mg)，低强度(辛伐他汀10mg，普伐他汀10-20mg)",
      },
      {
        title: "联合用药",
        content: "对于单用他汀未达标的患者，可考虑联合依折麦布、胆酸螯合剂或PCSK9抑制剂",
      },
      {
        title: "特殊人群",
        content: "老年患者从小剂量开始，逐渐调整；肝功能异常患者慎用；妊娠和哺乳期禁用",
      },
      {
        title: "监测建议",
        content:
          "开始治疗前检查基线肝功能和肌酸激酶；治疗4-12周后复查血脂和肝功能，之后每3-12个月复查一次；出现肌肉症状时检查肌酸激酶",
      },
      {
        title: "不良反应处理",
        content:
          "肌肉症状：评估症状严重程度和肌酸激酶水平，必要时减量或停药；肝功能异常：转氨酶>3倍正常上限持续存在时考虑减量或停药",
      },
    ],
    evidenceLevels: [
      {
        statement: "他汀类药物能有效降低心血管事件和全因死亡风险",
        level: "A",
        references: ["Cholesterol Treatment Trialists' (CTT) Collaboration. Lancet. 2010;376:1670-1681"],
      },
      {
        statement: "高强度他汀较中低强度他汀更能降低心血管事件风险",
        level: "B",
        references: ["Stone NJ, et al. J Am Coll Cardiol. 2014;63:2889-2934"],
      },
    ],
  },
  {
    id: "G002",
    title: "口服抗凝药物使用指南",
    category: "抗凝药",
    lastUpdated: "2023-10-15",
    source: "中国心房颤动患者抗栓治疗指南(2021)",
    recommendations: [
      {
        title: "适应症",
        content: "非瓣膜性心房颤动、深静脉血栓形成、肺栓塞、机械瓣膜置换(仅华法林)",
      },
      {
        title: "风险评估",
        content: "使用CHA₂DS₂-VASc评分评估卒中风险，使用HAS-BLED评分评估出血风险",
      },
      {
        title: "药物选择",
        content:
          "非瓣膜性心房颤动患者可选择华法林或直接口服抗凝药(DOACs)，包括达比加群、利伐沙班、阿哌沙班和依度沙班；机械瓣膜置换患者仅推荐华法林",
      },
      {
        title: "剂量调整",
        content: "华法林根据INR调整剂量，目标INR通常为2.0-3.0；DOACs根据年龄、体重、肾功能等因素调整剂量",
      },
      {
        title: "特殊人群",
        content:
          "肾功能不全患者需调整DOACs剂量或选择华法林；老年患者(>75岁)使用DOACs时考虑减量；肝功能不全患者慎用抗凝药",
      },
      {
        title: "监测建议",
        content: "华法林需定期监测INR；DOACs通常不需要常规凝血监测，但需定期评估肾功能、肝功能和出血风险",
      },
      {
        title: "围手术期管理",
        content:
          "根据手术出血风险和患者血栓风险，制定个体化的围手术期抗凝方案；小手术可考虑不停药或短暂停药，大手术通常需停药并考虑桥接治疗",
      },
      {
        title: "出血处理",
        content:
          "轻微出血：可考虑暂停抗凝药物；严重出血：停用抗凝药物，给予拮抗剂(华法林使用维生素K和凝血酶原复合物，达比加群使用特异性拮抗剂艾达赛珠单抗)",
      },
    ],
    evidenceLevels: [
      {
        statement: "对于CHA₂DS₂-VASc评分≥2分(男性)或≥3分(女性)的非瓣膜性心房颤动患者，推荐口服抗凝治疗",
        level: "A",
        references: ["Hindricks G, et al. Eur Heart J. 2021;42:373-498"],
      },
      {
        statement: "与华法林相比，DOACs降低卒中、颅内出血和死亡风险",
        level: "A",
        references: ["Ruff CT, et al. Lancet. 2014;383:955-962"],
      },
    ],
  },
  {
    id: "G003",
    title: "2型糖尿病药物治疗指南",
    category: "降糖药",
    lastUpdated: "2024-01-20",
    source: "中国2型糖尿病防治指南(2020年版)",
    recommendations: [
      {
        title: "治疗目标",
        content:
          "个体化血糖控制目标：一般成人糖化血红蛋白<7.0%，无并发症的年轻患者<6.5%，老年或有严重并发症患者<7.5%或<8.0%",
      },
      {
        title: "生活方式干预",
        content: "所有2型糖尿病患者均应进行生活方式干预，包括医学营养治疗、运动治疗和糖尿病教育",
      },
      {
        title: "药物选择",
        content:
          "无动脉粥样硬化性心血管疾病(ASCVD)的患者：二甲双胍为首选；有ASCVD的患者：优先考虑具有心血管获益的SGLT-2抑制剂或GLP-1受体激动剂",
      },
      {
        title: "联合用药",
        content: "单药治疗3个月未达标，考虑二联或三联治疗；联合用药应考虑药物作用机制互补、不良反应互补和成本效益",
      },
      {
        title: "胰岛素治疗",
        content:
          "口服药物治疗失败或特殊情况(如急性并发症、手术、妊娠等)时考虑胰岛素治疗；可选择基础胰岛素、预混胰岛素或基础-餐时胰岛素方案",
      },
      {
        title: "特殊人群",
        content:
          "老年患者：避免低血糖，从小剂量开始；肾功能不全：根据eGFR调整药物选择和剂量；肝功能不全：慎用可能加重肝损伤的药物",
      },
      {
        title: "监测建议",
        content: "自我血糖监测：根据治疗方案和病情确定频率；糖化血红蛋白：每3个月检测一次；定期筛查并发症",
      },
    ],
    evidenceLevels: [
      {
        statement: "二甲双胍是大多数2型糖尿病患者的首选药物",
        level: "A",
        references: ["American Diabetes Association. Diabetes Care. 2020;43(Suppl 1):S98-S110"],
      },
      {
        statement: "SGLT-2抑制剂和GLP-1受体激动剂可降低ASCVD患者的心血管事件风险",
        level: "A",
        references: ["Zelniker TA, et al. Lancet. 2019;393:31-39"],
      },
    ],
  },
]

// 模拟临床治疗数据
const clinical = [
  {
    id: "CT001",
    name: "高血压治疗",
    description: "高血压的诊断、评估和管理",
    category: "心血管",
    lastUpdated: "2024-02-20",
    source: "中国高血压防治指南(2018年修订版)",
  },
  {
    id: "CT002",
    name: "2型糖尿病治疗",
    description: "2型糖尿病的综合管理",
    category: "内分泌",
    lastUpdated: "2024-01-20",
    source: "中国2型糖尿病防治指南(2020年版)",
  },
  {
    id: "CT003",
    name: "冠心病治疗",
    description: "冠心病的诊断和治疗策略",
    category: "心血管",
    lastUpdated: "2023-12-15",
    source: "中国冠心病诊断治疗指南(2019)",
  },
]

// 模拟临床决策数据
const decision = [
  {
    id: "CD001",
    name: "高血压药物选择",
    description: "根据患者情况选择合适的降压药物",
    category: "心血管",
    lastUpdated: "2024-02-20",
    source: "中国高血压防治指南(2018年修订版)",
  },
  {
    id: "CD002",
    name: "2型糖尿病药物选择",
    description: "根据患者情况选择合适的降糖药物",
    category: "内分泌",
    lastUpdated: "2024-01-20",
    source: "中国2型糖尿病防治指南(2020年版)",
  },
  {
    id: "CD003",
    name: "心房颤动抗凝治疗",
    description: "根据患者CHA2DS2-VASc评分选择抗凝方案",
    category: "心血管",
    lastUpdated: "2023-12-15",
    source: "中国心房颤动患者抗栓治疗指南(2021)",
  },
]

// 模拟治疗方案数据
const treatments = [
  {
    id: "T001",
    name: "高血压初始治疗方案",
    description: "高血压患者的初始药物治疗建议",
    category: "心血管",
    lastUpdated: "2024-02-20",
    source: "中国高血压防治指南(2018年修订版)",
  },
  {
    id: "T002",
    name: "2型糖尿病生活方式干预",
    description: "2型糖尿病患者的生活方式干预建议",
    category: "内分泌",
    lastUpdated: "2024-01-20",
    source: "中国2型糖尿病防治指南(2020年版)",
  },
  {
    id: "T003",
    name: "冠心病二级预防方案",
    description: "冠心病患者的二级预防药物治疗建议",
    category: "心血管",
    lastUpdated: "2023-12-15",
    source: "中国冠心病诊断治疗指南(2019)",
  },
]

// 模拟药物数据
const medications = [
  {
    id: "M001",
    name: "厄贝沙坦",
    description: "血管紧张素II受体拮抗剂，用于治疗高血压",
    category: "心血管",
    lastUpdated: "2024-02-20",
    source: "国家药品监督管理局批准说明书",
  },
  {
    id: "M002",
    name: "二甲双胍",
    description: "双胍类降糖药，用于治疗2型糖尿病",
    category: "内分泌",
    lastUpdated: "2024-01-20",
    source: "国家药品监督管理局批准说明书",
  },
  {
    id: "M003",
    name: "阿司匹林",
    description: "抗血小板药，用于预防心血管事件",
    category: "心血管",
    lastUpdated: "2023-12-15",
    source: "国家药品监督管理局批准说明书",
  },
]

// 客户端组件，用于展示临床治疗数据
function ClinicalTreatmentsClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // 获取所有类别
  const allCategories = Array.from(new Set(clinical.map((item) => item.category)))

  // 过滤数据
  const filteredData = clinical.filter(
    (item) =>
      (searchTerm === "" ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "all" || item.category === selectedCategory),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>临床治疗</CardTitle>
              <CardDescription>查询临床治疗信息</CardDescription>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索名称或描述..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择类别" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类别</SelectItem>
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">未找到匹配的临床治疗</h3>
              <p className="text-muted-foreground max-w-md">
                尝试使用不同的搜索词或筛选条件，或者清除筛选条件查看所有临床治疗
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredData.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm text-muted-foreground mb-3">来源: {item.source}</div>
                    <div className="text-sm text-muted-foreground">更新于: {item.lastUpdated}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function DrugReferenceClient() {
  const [activeTab, setActiveTab] = useState("drugs")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDrug, setSelectedDrug] = useState<(typeof drugs)[0] | null>(null)
  const [selectedInteraction, setSelectedInteraction] = useState<(typeof drugInteractions)[0] | null>(null)
  const [selectedGuideline, setSelectedGuideline] = useState<(typeof medicationGuidelines)[0] | null>(null)
  const [showInteractionDetails, setShowInteractionDetails] = useState(false)

  // 获取所有药物类别
  const allCategories = Array.from(new Set(drugs.map((drug) => drug.category)))

  // 过滤药物
  const filteredDrugs = drugs.filter(
    (drug) =>
      (searchTerm === "" ||
        drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "all" || drug.category === selectedCategory),
  )

  // 过滤药物相互作用
  const filteredInteractions = drugInteractions.filter(
    (interaction) =>
      searchTerm === "" ||
      interaction.drug1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interaction.drug2.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 过滤用药指导
  const filteredGuidelines = medicationGuidelines.filter(
    (guideline) =>
      searchTerm === "" ||
      guideline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guideline.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 获取严重程度标签颜色
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "严重":
        return "bg-red-100 text-red-800"
      case "中度":
        return "bg-yellow-100 text-yellow-800"
      case "轻度":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取证据级别标签颜色
  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case "A":
        return "bg-green-100 text-green-800"
      case "B":
        return "bg-blue-100 text-blue-800"
      case "C":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>药物参考</CardTitle>
              <CardDescription>查询药物信息、相互作用和用药指导</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-1" />
                最近查询
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-1" />
                收藏药物
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索药物名称、类别或适应症..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择药物类别" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类别</SelectItem>
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              高级筛选
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="drugs">药物信息</TabsTrigger>
              <TabsTrigger value="interactions">药物相互作用</TabsTrigger>
              <TabsTrigger value="guidelines">用药指导</TabsTrigger>
            </TabsList>

            <TabsContent value="drugs" className="space-y-4">
              {filteredDrugs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Pill className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">未找到匹配的药物</h3>
                  <p className="text-muted-foreground max-w-md">
                    尝试使用不同的搜索词或筛选条件，或者清除筛选条件查看所有药物
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredDrugs.map((drug) => (
                    <Card key={drug.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{drug.name}</CardTitle>
                            <CardDescription>{drug.englishName}</CardDescription>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {drug.prescriptionType}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary">{drug.category}</Badge>
                          <Badge variant="secondary">{drug.subcategory}</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">适应症：</span>
                            <span className="text-muted-foreground">{drug.indications.join("、")}</span>
                          </div>
                          <div>
                            <span className="font-medium">常用规格：</span>
                            <span className="text-muted-foreground">{drug.strengths.join("、")}</span>
                          </div>
                          <div>
                            <span className="font-medium">常见品牌：</span>
                            <span className="text-muted-foreground">{drug.commonBrands.join("、")}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2 flex justify-end">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedDrug(drug)}>
                          查看详情
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="interactions" className="space-y-4">
              {filteredInteractions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <AlertTriangle className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">未找到匹配的药物相互作用</h3>
                  <p className="text-muted-foreground max-w-md">
                    尝试使用不同的搜索词，或者清除搜索条件查看所有药物相互作用
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredInteractions.map((interaction) => (
                    <Card key={interaction.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium">
                                {interaction.drug1} + {interaction.drug2}
                              </h3>
                              <Badge className={getSeverityColor(interaction.severity)}>{interaction.severity}</Badge>
                              <Badge className={getEvidenceLevelColor(interaction.evidence)}>
                                证据级别: {interaction.evidence}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{interaction.effect}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedInteraction(interaction)
                              setShowInteractionDetails(true)
                            }}
                          >
                            查看详情
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="flex justify-center mt-6">
                <Button>
                  <Plus className="h-4 w-4 mr-1" />
                  药物相互作用检查
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="guidelines" className="space-y-4">
              {filteredGuidelines.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">未找到匹配的用药指导</h3>
                  <p className="text-muted-foreground max-w-md">
                    尝试使用不同的搜索词，或者清除搜索条件查看所有用药指导
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredGuidelines.map((guideline) => (
                    <Card key={guideline.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{guideline.title}</CardTitle>
                            <CardDescription>
                              {guideline.category} · 更新于 {guideline.lastUpdated}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground mb-3">来源: {guideline.source}</p>
                        <div className="space-y-2">
                          {guideline.recommendations.slice(0, 2).map((rec, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium">{rec.title}：</span>
                              <span className="text-muted-foreground line-clamp-1">{rec.content}</span>
                            </div>
                          ))}
                          {guideline.recommendations.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              还有 {guideline.recommendations.length - 2} 项建议...
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2 flex justify-end">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedGuideline(guideline)}>
                          查看详情
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 药物详情 */}
      {selectedDrug && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">
                  {selectedDrug.name} ({selectedDrug.englishName})
                </CardTitle>
                <CardDescription>
                  {selectedDrug.category} · {selectedDrug.subcategory} · {selectedDrug.prescriptionType}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-1" />
                  收藏
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  查看说明书
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">批准状态</div>
                <div className="font-medium">{selectedDrug.approvalStatus}</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">剂型</div>
                <div className="font-medium">{selectedDrug.formulations.join("、")}</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">规格</div>
                <div className="font-medium">{selectedDrug.strengths.join("、")}</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">常用品牌</div>
                <div className="font-medium">{selectedDrug.commonBrands.join("、")}</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">适应症</h3>
              <ul className="list-disc list-inside space-y-1">
                {selectedDrug.indications.map((indication, index) => (
                  <li key={index} className="text-sm">
                    {indication}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">禁忌症</h3>
              <ul className="list-disc list-inside space-y-1">
                {selectedDrug.contraindications.map((contraindication, index) => (
                  <li key={index} className="text-sm">
                    {contraindication}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">用法用量</h3>
              <div className="space-y-4">
                {selectedDrug.dosageAndAdministration.map((dosage, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{dosage.population}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">初始剂量：</span>
                          <span>{dosage.initialDose}</span>
                        </div>
                        <div>
                          <span className="font-medium">维持剂量：</span>
                          <span>{dosage.maintenanceDose}</span>
                        </div>
                        <div>
                          <span className="font-medium">最大剂量：</span>
                          <span>{dosage.maxDose}</span>
                        </div>
                        <div>
                          <span className="font-medium">调整建议：</span>
                          <span>{dosage.adjustments}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">不良反应</h3>
              <div className="space-y-2">
                {selectedDrug.adverseEffects.map((effect, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Badge
                      className={
                        effect.severity === "常见"
                          ? "bg-yellow-100 text-yellow-800"
                          : effect.severity === "少见"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {effect.severity}
                    </Badge>
                    <div>
                      <div className="font-medium">{effect.name}</div>
                      <div className="text-sm text-muted-foreground">{effect.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">作用机制</h3>
              <p className="text-sm">{selectedDrug.mechanismOfAction}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">药代动力学</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium mb-1">吸收</div>
                  <div className="text-sm">{selectedDrug.pharmacokinetics.absorption}</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium mb-1">分布</div>
                  <div className="text-sm">{selectedDrug.pharmacokinetics.distribution}</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium mb-1">代谢</div>
                  <div className="text-sm">{selectedDrug.pharmacokinetics.metabolism}</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium mb-1">排泄</div>
                  <div className="text-sm">{selectedDrug.pharmacokinetics.elimination}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">药物相互作用</h3>
              <div className="space-y-3">
                {selectedDrug.drugInteractions.map((interaction, index) => (
                  <Card key={index}>
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{interaction.drug}</h4>
                            <Badge className={getSeverityColor(interaction.severity)}>{interaction.severity}</Badge>
                          </div>
                          <p className="text-sm mt-1">{interaction.effect}</p>
                          <p className="text-sm text-muted-foreground mt-1">建议: {interaction.recommendation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">特殊人群</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium mb-1">妊娠期</div>
                  <div className="text-sm">{selectedDrug.specialPopulations.pregnancy}</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium mb-1">哺乳期</div>
                  <div className="text-sm">{selectedDrug.specialPopulations.breastfeeding}</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium mb-1">儿童</div>
                  <div className="text-sm">{selectedDrug.specialPopulations.pediatric}</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium mb-1">老年人</div>
                  <div className="text-sm">{selectedDrug.specialPopulations.geriatric}</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium mb-1">肾功能不全</div>
                  <div className="text-sm">{selectedDrug.specialPopulations.renalImpairment}</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium mb-1">肝功能不全</div>
                  <div className="text-sm">{selectedDrug.specialPopulations.hepaticImpairment}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">患者教育</h3>
              <ul className="list-disc list-inside space-y-1">
                {selectedDrug.patientCounseling.map((counseling, index) => (
                  <li key={index} className="text-sm">
                    {counseling}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">临床试验</h3>
              <div className="space-y-3">
                {selectedDrug.clinicalTrials.map((trial, index) => (
                  <Card key={index}>
                    <CardContent className="p-3">
                      <h4 className="font-medium">{trial.name}</h4>
                      <p className="text-sm mt-1">{trial.findings}</p>
                      <p className="text-sm text-muted-foreground mt-1">参考: {trial.reference}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">参考文献</h3>
              <ul className="list-disc list-inside space-y-1">
                {selectedDrug.references.map((reference, index) => (
                  <li key={index} className="text-sm">
                    {reference}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setSelectedDrug(null)}>
                关闭详情
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 用药指导详情 */}
      {selectedGuideline && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{selectedGuideline.title}</CardTitle>
                <CardDescription>
                  {selectedGuideline.category} · 更新于 {selectedGuideline.lastUpdated}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-1" />
                  收藏
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  查看原文
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">来源</h3>
              <p className="text-sm">{selectedGuideline.source}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">推荐建议</h3>
              <div className="space-y-4">
                {selectedGuideline.recommendations.map((recommendation, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{recommendation.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{recommendation.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">证据级别</h3>
              <div className="space-y-3">
                {selectedGuideline.evidenceLevels.map((evidence, index) => (
                  <Card key={index}>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <Badge className={getEvidenceLevelColor(evidence.level)}>证据级别: {evidence.level}</Badge>
                        <p className="text-sm">{evidence.statement}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">参考: {evidence.references.join(", ")}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setSelectedGuideline(null)}>
                关闭详情
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 药物相互作用详情 */}
      {showInteractionDetails && selectedInteraction && (
        <Dialog open={showInteractionDetails} onOpenChange={setShowInteractionDetails}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>药物相互作用详情</DialogTitle>
              <DialogDescription>
                {selectedInteraction.drug1} + {selectedInteraction.drug2}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">药物1</div>
                  <div className="text-sm">{selectedInteraction.drug1}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">药物2</div>
                  <div className="text-sm">{selectedInteraction.drug2}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">严重程度</div>
                  <Badge className={getSeverityColor(selectedInteraction.severity)}>
                    {selectedInteraction.severity}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">证据级别</div>
                  <Badge className={getEvidenceLevelColor(selectedInteraction.evidence)}>
                    证据级别: {selectedInteraction.evidence}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">机制</div>
                <div className="text-sm">{selectedInteraction.mechanism}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">影响</div>
                <div className="text-sm">{selectedInteraction.effect}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">管理</div>
                <div className="text-sm">{selectedInteraction.management}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">参考文献</div>
                <ul className="list-disc list-inside space-y-1">
                  {selectedInteraction.references.map((reference, index) => (
                    <li key={index} className="text-sm">
                      {reference}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowInteractionDetails(false)}>
                关闭
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
