"use client"

export default function MinimalistColorPalette() {
  const colorSchemes = [
    {
      name: "单色方案",
      colors: [
        { hex: "#FFFFFF", name: "白色" },
        { hex: "#F5F5F5", name: "浅灰" },
        { hex: "#E0E0E0", name: "中灰" },
        { hex: "#9E9E9E", name: "深灰" },
        { hex: "#212121", name: "近黑" },
      ],
    },
    {
      name: "带强调色",
      colors: [
        { hex: "#FFFFFF", name: "白色" },
        { hex: "#F5F5F5", name: "浅灰" },
        { hex: "#E0E0E0", name: "中灰" },
        { hex: "#212121", name: "近黑" },
        { hex: "#2196F3", name: "强调色" },
      ],
    },
  ]

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-light mb-12 text-gray-900">极简主义色彩方案</h2>

      <div className="space-y-12">
        {colorSchemes.map((scheme, schemeIndex) => (
          <div key={schemeIndex}>
            <h3 className="text-xl font-light mb-6 text-gray-900">{scheme.name}</h3>
            <div className="grid grid-cols-5 gap-4">
              {scheme.colors.map((color, colorIndex) => (
                <div key={colorIndex} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full mb-2" style={{ backgroundColor: color.hex }}></div>
                  <span className="text-sm text-gray-600">{color.name}</span>
                  <span className="text-xs text-gray-500">{color.hex}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-light mb-4 text-gray-900">色彩使用建议</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• 主要使用中性色调（白色、灰色、黑色）</li>
          <li>• 可以添加一个强调色用于关键操作和重点内容</li>
          <li>• 保持色彩一致性，避免使用过多颜色</li>
          <li>• 确保文本与背景之间有足够的对比度</li>
          <li>• 使用微妙的色彩变化创造层次感</li>
        </ul>
      </div>
    </div>
  )
}
