import type { Medication, DrugInteraction } from "../types/knowledge-base"

// 模拟药物数据库
const medicationsDatabase: Medication[] = [
  {
    id: "med-1",
    name: "阿司匹林",
    genericName: "乙酰水杨酸",
    brandNames: ["拜阿司匹灵", "阿斯匹林"],
    drugClass: "非甾体抗炎药",
    description: "阿司匹林是一种常用的非甾体抗炎药，具有解热、镇痛和抗炎作用，也可用于预防心血管疾病。",
    indications: ["发热", "疼痛", "炎症", "预防心血管疾病"],
    contraindications: ["活动性消化道溃疡", "出血性疾病", "对水杨酸盐过敏"],
    sideEffects: {
      common: ["胃部不适", "恶心", "消化不良"],
      serious: ["胃肠道出血", "过敏反应"],
      rare: ["雷诺现象", "肝功能异常"],
    },
    dosageAndAdministration: "成人常规剂量为每次0.3-0.6g，每日3-4次，饭后服用。",
    mechanismOfAction: "通过抑制环氧合酶(COX)活性，减少前列腺素的合成。",
    pharmacokinetics: {
      absorption: "口服后在胃肠道迅速吸收",
      distribution: "广泛分布于体液和组织中",
      metabolism: "主要在肝脏代谢",
      elimination: "主要通过肾脏排泄",
      halfLife: "15-20分钟",
    },
    pregnancyCategory: "D",
    breastfeedingSafety: "谨慎使用",
    pediatricUse: "不推荐用于14岁以下儿童，可能增加瑞氏综合征风险。",
    geriatricUse: "老年患者应减量使用，密切监测不良反应。",
    interactions: {
      drugInteractions: [
        {
          drugId: "med-2",
          drugName: "华法林",
          interactionEffect: "增加出血风险",
          severity: "严重",
          mechanism: "两种药物均影响凝血功能，联合使用可能导致出血风险显著增加。",
          managementRecommendations: "避免联合使用，如必须使用，需密切监测凝血功能。",
        },
        {
          drugId: "med-3",
          drugName: "氯吡格雷",
          interactionEffect: "增加出血风险",
          severity: "中度",
          mechanism: "两种药物均影响血小板功能，联合使用可能增加出血风险。",
          managementRecommendations: "谨慎联合使用，密切监测出血征象。",
        },
        {
          drugId: "med-4",
          drugName: "布洛芬",
          interactionEffect: "降低阿司匹林的心血管保护作用",
          severity: "中度",
          mechanism: "布洛芬可能竞争性抑制阿司匹林对血小板COX-1的不可逆抑制作用。",
          managementRecommendations: "如需联合使用，应先服用阿司匹林，至少30分钟后再服用布洛芬。",
        },
      ],
      foodInteractions: ["酒精可增加胃肠道出血风险"],
      diseaseInteractions: ["胃溃疡", "肝功能不全", "肾功能不全"],
    },
    storage: "密封保存，避光，置于儿童接触不到的地方。",
    approvalDate: "1965-01-01",
    lastUpdated: "2023-05-15",
  },
  {
    id: "med-2",
    name: "华法林",
    genericName: "华法林钠",
    brandNames: ["可迈丁", "华法令"],
    drugClass: "香���素类口服抗凝药",
    description: "华法林是一种口服抗凝血药，通过抑制维生素K依赖的凝血因子的合成来发挥作用。",
    indications: ["预防和治疗血栓栓塞性疾病", "心房颤动", "人工心脏瓣膜"],
    contraindications: ["活动性出血", "严重肝病", "妊娠", "出血倾向"],
    sideEffects: {
      common: ["出血", "瘀斑"],
      serious: ["严重出血", "坏死性皮炎"],
      rare: ["紫色脚趾综合征", "过敏反应"],
    },
    dosageAndAdministration: "个体化给药，根据INR调整剂量，通常起始剂量为2-5mg/日。",
    mechanismOfAction: "抑制维生素K环氧化物还原酶，干扰维生素K依赖的凝血因子(II, VII, IX, X)的合成。",
    pharmacokinetics: {
      absorption: "口服后完全吸收",
      distribution: "99%与血浆蛋白结合",
      metabolism: "主要在肝脏通过CYP2C9代谢",
      elimination: "主要通过胆汁排泄",
      halfLife: "20-60小时",
    },
    pregnancyCategory: "X",
    breastfeedingSafety: "谨慎使用",
    pediatricUse: "儿童用药需谨慎，剂量应个体化。",
    geriatricUse: "老年患者对华法林更敏感，应从低剂量开始，密切监测INR。",
    interactions: {
      drugInteractions: [
        {
          drugId: "med-1",
          drugName: "阿司匹林",
          interactionEffect: "增加出血风险",
          severity: "严重",
          mechanism: "两种药物均影响凝血功能，联合使用可能导致出血风险显著增加。",
          managementRecommendations: "避免联合使用，如必须使用，需密切监测凝血功能。",
        },
        {
          drugId: "med-5",
          drugName: "环丙沙星",
          interactionEffect: "增强华法林抗凝作用",
          severity: "严重",
          mechanism: "环丙沙星抑制华法林的肝脏代谢，导致华法林血药浓度升高。",
          managementRecommendations: "联合使用时需减少华法林剂量，频繁监测INR。",
        },
      ],
      foodInteractions: ["富含维生素K的食物（如绿叶蔬菜）可能降低华法林效果", "葡萄柚汁可能增强华法林效果"],
      diseaseInteractions: ["肝功能不全", "肾功能不全", "甲状腺功能亢进或低下"],
    },
    storage: "室温保存，避光，置于儿童接触不到的地方。",
    approvalDate: "1954-01-01",
    lastUpdated: "2023-06-20",
  },
  {
    id: "med-3",
    name: "氯吡格雷",
    genericName: "氯吡格雷硫酸氢盐",
    brandNames: ["波立维"],
    drugClass: "血小板聚集抑制剂",
    description: "氯吡格雷是一种血小板聚集抑制剂，用于预防动脉粥样硬化性疾病中的血栓形成。",
    indications: ["急性冠脉综合征", "缺血性脑卒中", "外周动脉疾病"],
    contraindications: ["活动性出血", "严重肝损伤"],
    sideEffects: {
      common: ["瘀斑", "轻度出血"],
      serious: ["严重出血", "血细胞减少"],
      rare: ["血栓性血小板减少性紫癜", "过敏反应"],
    },
    dosageAndAdministration: "常规剂量为75mg，每日一次。急性冠脉综合征可先负荷剂量300-600mg。",
    mechanismOfAction: "通过不可逆地抑制血小板表面的ADP受体，阻止血小板聚集。",
    pharmacokinetics: {
      absorption: "口服后迅速吸收",
      distribution: "广泛分布于组织中",
      metabolism: "主要在肝脏通过CYP2C19代谢为活性代谢物",
      elimination: "约50%从尿液排出，约46%从粪便排出",
      halfLife: "活性代谢物半衰期约8小时",
    },
    pregnancyCategory: "B",
    breastfeedingSafety: "谨慎使用",
    pediatricUse: "儿童安全性和有效性尚未确立。",
    geriatricUse: "老年患者无需调整剂量，但应注意出血风险。",
    interactions: {
      drugInteractions: [
        {
          drugId: "med-1",
          drugName: "阿司匹林",
          interactionEffect: "增加出血风险",
          severity: "中度",
          mechanism: "两种药物均影响血小板功能，联合使用可能增加出血风险。",
          managementRecommendations: "谨慎联合使用，密切监测出血征象。",
        },
        {
          drugId: "med-6",
          drugName: "奥美拉唑",
          interactionEffect: "可能降低氯吡格雷的疗效",
          severity: "中度",
          mechanism: "奥美拉唑抑制CYP2C19，减少氯吡格雷转化为活性代谢物。",
          managementRecommendations: "考虑使用泮托拉唑等替代质子泵抑制剂。",
        },
      ],
      foodInteractions: ["葡萄柚汁可能影响药物代谢"],
      diseaseInteractions: ["肝功能不全", "出血性疾病"],
    },
    storage: "室温保存，避光，置于儿童接触不到的地方。",
    approvalDate: "1997-11-17",
    lastUpdated: "2023-04-10",
  },
  {
    id: "med-4",
    name: "布洛芬",
    genericName: "布洛芬",
    brandNames: ["芬必得", "美林"],
    drugClass: "非甾体抗炎药",
    description: "布洛芬是一种常用的非甾体抗炎药，具有解热、镇痛和抗炎作用。",
    indications: ["疼痛", "发热", "炎症", "风湿性关节炎", "骨关节炎"],
    contraindications: ["对布洛芬过敏", "活动性消化道溃疡或出血", "严重心力衰竭"],
    sideEffects: {
      common: ["胃部不适", "恶心", "头痛"],
      serious: ["胃肠道出血", "肾损伤", "心血管事件"],
      rare: ["肝功能异常", "过敏反应", "哮喘发作"],
    },
    dosageAndAdministration: "成人常规剂量为每次200-400mg，每日3-4次，饭后服用。",
    mechanismOfAction: "通过抑制环氧合酶(COX)活性，减少前列腺素的合成。",
    pharmacokinetics: {
      absorption: "口服后迅速完全吸收",
      distribution: "99%与血浆蛋白结合",
      metabolism: "主要在肝脏代谢",
      elimination: "90%通过肾脏排泄",
      halfLife: "1.8-2小时",
    },
    pregnancyCategory: "C",
    breastfeedingSafety: "谨慎使用",
    pediatricUse: "6个月以上儿童可用于退热，剂量按体重计算。",
    geriatricUse: "老年患者应减量使用，密切监测不良反应。",
    interactions: {
      drugInteractions: [
        {
          drugId: "med-1",
          drugName: "阿司匹林",
          interactionEffect: "降低阿司匹林的心血管保护作用",
          severity: "中度",
          mechanism: "布洛芬可能竞争性抑制阿司匹林对血小板COX-1的不可逆抑制作用。",
          managementRecommendations: "如需联合使用，应先服用阿司匹林，至少30分钟后再服用布洛芬。",
        },
        {
          drugId: "med-7",
          drugName: "利尿剂",
          interactionEffect: "可能降低利尿剂效果并增加肾毒性",
          severity: "中度",
          mechanism: "布洛芬抑制肾脏前列腺素合成，影响肾血流和钠排泄。",
          managementRecommendations: "监测血压和肾功能，必要时调整利尿剂剂量。",
        },
      ],
      foodInteractions: ["酒精可增加胃肠道刺激和出血风险"],
      diseaseInteractions: ["胃溃疡", "肝功能不全", "肾功能不全", "心力衰竭", "高血压"],
    },
    storage: "室温保存，避光，置于儿童接触不到的地方。",
    approvalDate: "1974-01-01",
    lastUpdated: "2023-03-05",
  },
  {
    id: "med-5",
    name: "环丙沙星",
    genericName: "环丙沙星",
    brandNames: ["环丙沙星", "西普乐"],
    drugClass: "氟喹诺酮类抗生素",
    description: "环丙沙星是一种广谱氟喹诺酮类抗生素，对多种革兰阴性和阳性菌有效。",
    indications: ["尿路感染", "呼吸道感染", "胃肠道感染", "皮肤软组织感染"],
    contraindications: ["对喹诺酮类��物过敏", "妊娠", "18岁以下青少年"],
    sideEffects: {
      common: ["恶心", "腹泻", "头痛", "头晕"],
      serious: ["肌腱炎和肌腱断裂", "QT间期延长", "中枢神经系统毒性"],
      rare: ["光敏反应", "过敏反应", "肝毒性"],
    },
    dosageAndAdministration: "成人常规剂量为每次250-750mg，每日2次，疗程根据感染类型决定。",
    mechanismOfAction: "通过抑制细菌DNA旋转酶和拓扑异构酶IV，阻断DNA复制。",
    pharmacokinetics: {
      absorption: "口服后迅速吸收，生物利用度约70-80%",
      distribution: "广泛分布于组织和体液中",
      metabolism: "部分在肝脏代谢",
      elimination: "主要通过肾脏排泄",
      halfLife: "3-5小时",
    },
    pregnancyCategory: "C",
    breastfeedingSafety: "不推荐",
    pediatricUse: "一般不推荐用于18岁以下患者，可能影响骨骼发育。",
    geriatricUse: "肾功能减退的老年患者需减量。",
    interactions: {
      drugInteractions: [
        {
          drugId: "med-2",
          drugName: "华法林",
          interactionEffect: "增强华法林抗凝作用",
          severity: "严重",
          mechanism: "环丙沙星抑制华法林的肝脏代谢，导致华法林血药浓度升高。",
          managementRecommendations: "联合使用时需减少华法林剂量，频繁监测INR。",
        },
        {
          drugId: "med-8",
          drugName: "茶碱",
          interactionEffect: "增加茶碱血药浓度和毒性",
          severity: "严重",
          mechanism: "环丙沙星抑制茶碱的肝脏代谢。",
          managementRecommendations: "联合使用时需减少茶碱剂量，监测茶碱血药浓度。",
        },
      ],
      foodInteractions: ["含钙、铁、锌、镁的食物或补充剂可降低环丙沙星吸收"],
      diseaseInteractions: ["癫痫", "QT间期延长", "肌腱病", "重症肌无力"],
    },
    storage: "室温保存，避光，置于儿童接触不到的地方。",
    approvalDate: "1987-10-22",
    lastUpdated: "2023-07-12",
  },
]

// 药物相互作用检查服务
export const medicationInteractionService = {
  // 获取所有药物
  getAllMedications: () => {
    return medicationsDatabase
  },

  // 根据ID获取药物
  getMedicationById: (id: string) => {
    return medicationsDatabase.find((med) => med.id === id)
  },

  // 根据名称搜索药物
  searchMedicationsByName: (query: string) => {
    const normalizedQuery = query.toLowerCase()
    return medicationsDatabase.filter(
      (med) =>
        med.name.toLowerCase().includes(normalizedQuery) ||
        med.genericName.toLowerCase().includes(normalizedQuery) ||
        (med.brandNames && med.brandNames.some((brand) => brand.toLowerCase().includes(normalizedQuery))),
    )
  },

  // 检查两种药物之间的相互作用
  checkInteractionBetweenTwo: (medicationId1: string, medicationId2: string) => {
    const medication1 = medicationsDatabase.find((med) => med.id === medicationId1)
    const medication2 = medicationsDatabase.find((med) => med.id === medicationId2)

    if (!medication1 || !medication2) {
      return null
    }

    // 检查第一种药物与第二种药物的相互作用
    const interaction1 = medication1.interactions.drugInteractions.find(
      (interaction) => interaction.drugId === medicationId2,
    )

    // 检查第二种药物与第一种药物的相互作用
    const interaction2 = medication2.interactions.drugInteractions.find(
      (interaction) => interaction.drugId === medicationId1,
    )

    return interaction1 || interaction2 || null
  },

  // 检查多种药物之间的相互作用
  checkInteractionsAmongMultiple: (medicationIds: string[]) => {
    const interactions: {
      medication1: Medication
      medication2: Medication
      interaction: DrugInteraction
    }[] = []

    // 检查每对药物之间的相互作用
    for (let i = 0; i < medicationIds.length; i++) {
      for (let j = i + 1; j < medicationIds.length; j++) {
        const med1 = medicationsDatabase.find((med) => med.id === medicationIds[i])
        const med2 = medicationsDatabase.find((med) => med.id === medicationIds[j])

        if (!med1 || !med2) continue

        // 检查第一种药物与第二种药物的相互作用
        const interaction1 = med1.interactions.drugInteractions.find((interaction) => interaction.drugId === med2.id)

        // 检查第二种药物与第一种药物的相互作用
        const interaction2 = med2.interactions.drugInteractions.find((interaction) => interaction.drugId === med1.id)

        if (interaction1) {
          interactions.push({
            medication1: med1,
            medication2: med2,
            interaction: interaction1,
          })
        } else if (interaction2) {
          interactions.push({
            medication1: med2,
            medication2: med1,
            interaction: interaction2,
          })
        }
      }
    }

    return interactions
  },

  // 获取药物的所有相互作用
  getAllInteractionsForMedication: (medicationId: string) => {
    const medication = medicationsDatabase.find((med) => med.id === medicationId)
    if (!medication) return []

    const interactions: {
      medication1: Medication
      medication2: Medication
      interaction: DrugInteraction
    }[] = []

    // 获取该药物与其他药物的相互作用
    medication.interactions.drugInteractions.forEach((interaction) => {
      const interactingMed = medicationsDatabase.find((med) => med.id === interaction.drugId)
      if (interactingMed) {
        interactions.push({
          medication1: medication,
          medication2: interactingMed,
          interaction,
        })
      }
    })

    // 获取其他药物与该药物的相互作用
    medicationsDatabase.forEach((med) => {
      if (med.id !== medicationId) {
        const interaction = med.interactions.drugInteractions.find((interaction) => interaction.drugId === medicationId)
        if (interaction) {
          interactions.push({
            medication1: med,
            medication2: medication,
            interaction,
          })
        }
      }
    })

    return interactions
  },

  // 根据严重程度过滤相互作用
  filterInteractionsBySeverity: (interactions: DrugInteraction[], severity: "轻微" | "中度" | "严重" | "禁忌") => {
    return interactions.filter((interaction) => interaction.severity === severity)
  },

  // 检查药物与疾病的相互作用
  checkMedicationDiseaseInteractions: (medicationId: string, diseaseNames: string[]) => {
    const medication = medicationsDatabase.find((med) => med.id === medicationId)
    if (!medication || !medication.interactions.diseaseInteractions) return []

    return diseaseNames.filter((disease) =>
      medication.interactions.diseaseInteractions?.some(
        (diseaseInteraction) => diseaseInteraction.toLowerCase() === disease.toLowerCase(),
      ),
    )
  },

  // 检查药物与食物的相互作用
  checkMedicationFoodInteractions: (medicationId: string) => {
    const medication = medicationsDatabase.find((med) => med.id === medicationId)
    return medication?.interactions.foodInteractions || []
  },
}
