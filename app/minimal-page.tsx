export default function MinimalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">言语云³医疗AI系统</h1>
          <p className="text-xl text-gray-600 mb-8">智能诊疗 • 精准医疗 • 安全可信</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">🏥 智能诊疗</h3>
            <p className="text-gray-600">AI辅助诊断，提高诊疗准确性</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">🔬 精准医疗</h3>
            <p className="text-gray-600">个性化治疗方案推荐</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">🛡️ 安全可信</h3>
            <p className="text-gray-600">医疗级数据安全保障</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">🚀 部署状态</h3>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">系统正常运行</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">部署成功</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
