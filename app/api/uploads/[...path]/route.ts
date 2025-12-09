import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = false;

// 静态导出时需要提供 generateStaticParams
// 对于 catch-all 路由 [...path]，返回一个占位符路径以避免构建错误
export async function generateStaticParams() {
  // 返回一个占位符路径，实际在静态导出时不会被使用
  return [{ path: ['_'] }];
}

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // 等待params解析（Next.js 15+）
    const resolvedParams = await params;
    // 构建图片路径
    const imagePath = resolvedParams.path.join('/');
    const imageUrl = `${BACKEND_URL}/uploads/${imagePath}`;
    
    // 从后端获取图片
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }
    
    // 获取图片内容和类型
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    // 返回图片，设置正确的Content-Type
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}

