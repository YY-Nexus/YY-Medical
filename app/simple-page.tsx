export default function SimplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">言语云³医疗AI系统</h1>
        <p className="text-blue-700 text-lg mb-8">智能诊疗 · 精准医疗 · 安全可信</p>
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">系统状态</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>系统版本:</span>
              <span className="text-green-600">v1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>部署状态:</span>
              <span className="text-green-600">正常</span>
            </div>
            <div className="flex justify-between">
              <span>最后更新:</span>
              <span className="text-gray-600">{new Date().toLocaleDateString("zh-CN")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
