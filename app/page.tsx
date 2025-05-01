"use client"

import dynamic from 'next/dynamic'

// 动态导入 MainContent 组件并自动添加 Suspense
const DynamicMainContent = dynamic(
  () => import('@/app/MainContent').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => <div>Loading...</div>
  }
)

export default function Home() {
  return <DynamicMainContent />
}
