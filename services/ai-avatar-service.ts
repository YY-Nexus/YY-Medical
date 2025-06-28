import { DEEPSEEK_API_KEY, DEEPSEEK_BASE_URL } from "@/lib/env"

export interface AvatarGenerationParams {
  gender?: "male" | "female" | "other"
  ageRange?: "young" | "middle" | "senior"
  specialty?: string
  style?: "realistic" | "cartoon" | "artistic" | "minimalist"
  accessories?: string[]
  hairColor?: string
  hairStyle?: string
  facialFeatures?: string[]
  medicalAttire?: string
  backgroundColor?: string
  additionalPrompt?: string
}

export interface AvatarGenerationResult {
  success: boolean
  imageUrl?: string
  error?: string
}

export async function generateAIAvatar(params: AvatarGenerationParams): Promise<AvatarGenerationResult> {
  try {
    if (!DEEPSEEK_API_KEY || !DEEPSEEK_BASE_URL) {
      throw new Error("AI服务配置缺失")
    }

    // 构建提示词
    const prompt = buildAvatarPrompt(params)

    // 调用DeepSeek API生成图像
    const response = await fetch(`${DEEPSEEK_BASE_URL}/v1/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-image",
        prompt: prompt,
        n: 1,
        size: "512x512",
        response_format: "url",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "图像生成失败")
    }

    const data = await response.json()

    if (!data.data || data.data.length === 0 || !data.data[0].url) {
      throw new Error("未返回有效图像")
    }

    return {
      success: true,
      imageUrl: data.data[0].url,
    }
  } catch (error) {
    console.error("AI头像生成错误:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "未知错误",
    }
  }
}

function buildAvatarPrompt(params: AvatarGenerationParams): string {
  const {
    gender,
    ageRange,
    specialty,
    style,
    accessories,
    hairColor,
    hairStyle,
    facialFeatures,
    medicalAttire,
    backgroundColor,
    additionalPrompt,
  } = params

  // 基础提示词
  let prompt = "Generate a professional medical avatar portrait"

  // 性别
  if (gender) {
    const genderMap = {
      male: "male",
      female: "female",
      other: "gender-neutral",
    }
    prompt += ` of a ${genderMap[gender]} healthcare professional`
  }

  // 年龄段
  if (ageRange) {
    const ageMap = {
      young: "young (25-35 years)",
      middle: "middle-aged (35-50 years)",
      senior: "senior (50-65 years)",
    }
    prompt += `, ${ageMap[ageRange]}`
  }

  // 专业领域
  if (specialty) {
    prompt += `, specializing in ${specialty}`
  }

  // 医疗服装
  if (medicalAttire) {
    prompt += `, wearing ${medicalAttire}`
  }

  // 发型和发色
  if (hairStyle || hairColor) {
    prompt += `, with`
    if (hairColor) prompt += ` ${hairColor}`
    if (hairStyle) prompt += ` ${hairStyle} hair`
  }

  // 面部特征
  if (facialFeatures && facialFeatures.length > 0) {
    prompt += `, with ${facialFeatures.join(", ")}`
  }

  // 配饰
  if (accessories && accessories.length > 0) {
    prompt += `, wearing ${accessories.join(", ")}`
  }

  // 背景颜色
  if (backgroundColor) {
    prompt += `, with a ${backgroundColor} background`
  }

  // 风格
  if (style) {
    const styleMap = {
      realistic: "photorealistic",
      cartoon: "cartoon style",
      artistic: "artistic painting style",
      minimalist: "minimalist design",
    }
    prompt += `, in a ${styleMap[style]} style`
  }

  // 附加提示词
  if (additionalPrompt) {
    prompt += `. ${additionalPrompt}`
  }

  // 质量和细节提示词
  prompt += `. Professional headshot, high quality, detailed, suitable for a medical professional profile picture.`

  return prompt
}

// 模拟生成，用于开发和测试
export async function mockGenerateAIAvatar(params: AvatarGenerationParams): Promise<AvatarGenerationResult> {
  // 模拟API延迟
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // 根据参数选择不同的模拟图像
  let imageUrl = "/avatars/ai-generated-default.png"

  if (params.gender === "female") {
    imageUrl = "/avatars/ai-generated-female.png"
  } else if (params.gender === "male") {
    imageUrl = "/avatars/ai-generated-male.png"
  }

  if (params.style === "cartoon") {
    imageUrl = "/avatars/ai-generated-cartoon.png"
  } else if (params.style === "artistic") {
    imageUrl = "/avatars/ai-generated-artistic.png"
  }

  return {
    success: true,
    imageUrl,
  }
}
