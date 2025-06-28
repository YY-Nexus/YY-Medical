import { PageHeader } from "@/components/page-header"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "服务条款 - MediNexus³",
  description: "MediNexus³ 智能诊疗系统服务条款",
}

export default function TermsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <PageHeader title="服务条款" description="请仔细阅读以下条款，使用我们的服务即表示您同意这些条款" />

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="prose max-w-none">
          <h2>1. 服务使用条款</h2>
          <p>
            欢迎使用MediNexus³智能诊疗系统（以下简称"本系统"）。本系统由言语云科技有限公司（以下简称"我们"）提供。通过访问或使用我们的服务，您同意受本服务条款的约束。
          </p>

          <h2>2. 账户注册与安全</h2>
          <p>2.1 您必须年满18周岁或具有完全民事行为能力才能使用本系统。</p>
          <p>2.2 您需要注册账户才能使用本系统的某些功能。您同意提供准确、完整的注册信息，并及时更新这些信息。</p>
          <p>2.3 您负责维护账户的保密性，并对发生在您账户下的所有活动负责。</p>

          <h2>3. 医疗信息与建议</h2>
          <p>3.1 本系统提供的信息仅供参考，不构成医疗建议、诊断或治疗。</p>
          <p>3.2 本系统不能替代专业医疗人员的诊断和治疗。在做出任何医疗决定前，请咨询合格的医疗专业人员。</p>

          <h2>4. 数据隐私与安全</h2>
          <p>
            4.1 我们重视您的隐私。我们如何收集、使用和保护您的个人信息，请参阅我们的
            <Link href="/privacy" className="text-blue-600 hover:underline">
              隐私政策
            </Link>
            。
          </p>
          <p>4.2 您同意我们按照隐私政策收集和使用您的信息。</p>

          <h2>5. 知识产权</h2>
          <p>
            5.1
            本系统及其内容（包括但不限于文本、图形、徽标、图标、图像、音频剪辑、数据和软件）受知识产权法保护，归我们或我们的许可方所有。
          </p>
          <p>
            5.2
            未经我们明确书面许可，您不得复制、修改、创建衍生作品、公开展示、表演、重新发布、下载、存储或传输本系统的任何内容。
          </p>

          <h2>6. 禁止行为</h2>
          <p>使用本系统时，您不得：</p>
          <ul>
            <li>违反任何适用的法律法规</li>
            <li>侵犯他人的知识产权或其他权利</li>
            <li>干扰或破坏本系统的安全性</li>
            <li>传播恶意软件或有害数据</li>
            <li>未经授权访问本系统或相关系统</li>
          </ul>

          <h2>7. 免责声明</h2>
          <p>7.1 本系统按"现状"和"可用"的基础提供，不提供任何明示或暗示的保证。</p>
          <p>7.2 我们不保证本系统将不间断、及时、安全或无错误，也不保证缺陷将被纠正。</p>

          <h2>8. 责任限制</h2>
          <p>
            在法律允许的最大范围内，我们对因使用或无法使用本系统而导致的任何直接、间接、附带、特殊、惩罚性或后果性损害不承担责任。
          </p>

          <h2>9. 条款修改</h2>
          <p>
            我们可能会不时修改本服务条款。修改后的条款将在本页面上发布，并在发布时立即生效。继续使用本系统即表示您接受修改后的条款。
          </p>

          <h2>10. 适用法律</h2>
          <p>本服务条款受中华人民共和国法律管辖，并按其解释。</p>

          <h2>11. 联系我们</h2>
          <p>如果您对本服务条款有任何疑问，请联系我们：support@yanyucloud.com</p>

          <p className="text-sm text-gray-500 mt-8">最后更新日期：2025年5月15日</p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link href="/login" className="text-blue-600 hover:underline">
          返回登录
        </Link>
      </div>
    </div>
  )
}
