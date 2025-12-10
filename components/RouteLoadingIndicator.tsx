'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useRouteLoading } from '@/lib/route-loading-context'

export function RouteLoadingIndicator() {
  const pathname = usePathname()
  const { isLoading: contextLoading, stopLoading } = useRouteLoading()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // 如果上下文中有加载状态，立即显示
    if (contextLoading) {
      setLoading(true)
    }
  }, [contextLoading])

  useEffect(() => {
    // 路由变化时立即显示加载指示器
    setLoading(true)
    
    // 使用双重延迟策略：
    // 1. 快速页面：至少显示200ms以提供视觉反馈
    // 2. 慢速页面：最多显示600ms后自动隐藏
    const minTimer = setTimeout(() => {
      // 检查路径是否已匹配（页面可能已加载完成）
      const currentPath = window.location.pathname.replace(/\/$/, '')
      const targetPath = pathname.replace(/\/$/, '')
      
      if (currentPath === targetPath) {
        // 路径已匹配，再等待一小段时间确保内容渲染完成
        setTimeout(() => {
          setLoading(false)
          stopLoading()
        }, 100)
      } else {
        // 路径未匹配，继续等待
        setTimeout(() => {
          setLoading(false)
          stopLoading()
        }, 400)
      }
    }, 200)

    // 最大显示时间保护
    const maxTimer = setTimeout(() => {
      setLoading(false)
      stopLoading()
    }, 600)

    return () => {
      clearTimeout(minTimer)
      clearTimeout(maxTimer)
      // 清理时立即隐藏，确保新路由切换时能立即响应
      setLoading(false)
      stopLoading()
    }
  }, [pathname, stopLoading])

  if (!loading) return null

  return (
    // 只保留顶部进度条，移除全屏遮罩
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-primary/10 pointer-events-none">
      <div className="h-full w-full bg-gradient-to-r from-primary via-accent to-primary animate-shimmer" />
    </div>
  )
}

