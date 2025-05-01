import { NextResponse } from 'next/server'

const API_BASE_URL = 'http://43.198.89.173:8082'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { path, data } = body

    // 获取原始请求的 Token 头
    const token = request.headers.get('Token')

    // 构建请求头
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    // 如果有 Token，添加到请求头
    if (token) {
      headers['Token'] = token
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    )
  }
} 