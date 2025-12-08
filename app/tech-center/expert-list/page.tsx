'use client'

import { ExpertTeam } from "@/components/ExpertTeam";
import { Expert } from "@/lib/types";
import { useEffect, useState } from "react";

export default function ExpertListPage() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从后端API获取专家数据
    const fetchExperts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        
        // 添加超时控制
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3秒超时
        
        try {
          const response = await fetch(`${apiUrl}/api/experts`, {
            signal: controller.signal,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          clearTimeout(timeoutId);
          
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
              setExperts(data);
            } else {
              // 如果返回空数组，使用默认数据
              setExperts(getDefaultExperts());
            }
          } else {
            // 如果API返回错误，使用默认数据
            setExperts(getDefaultExperts());
          }
        } catch (fetchError: any) {
          clearTimeout(timeoutId);
          // 如果是超时或网络错误，使用默认数据
          if (fetchError.name === 'AbortError') {
            console.warn('API请求超时，使用默认数据');
          } else {
            console.warn('无法连接到后端服务，使用默认数据');
          }
          setExperts(getDefaultExperts());
        }
      } catch (error) {
        // 其他错误，使用默认数据
        console.warn('获取专家数据失败，使用默认数据:', error);
        setExperts(getDefaultExperts());
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="pt-20">
        <ExpertTeam experts={experts} />
      </main>
    </div>
  );
}

// 默认专家数据（当后端不可用时使用）
function getDefaultExperts(): Expert[] {
  return [
    {
      id: '1',
      name: '回思樾',
      role: '定子设计、生产制造工程师',
      roleTitle: '定子设计 工程师',
      education: '桂林电子科技大学 硕士',
      achievements: '发表专利4篇,其中发明专利3篇,实用新型专利1篇',
      image: '/assets/expert-1.jpg'
    },
    {
      id: '2',
      name: '颜嘉豪',
      role: '仿真工程师、生产制造工程师',
      roleTitle: '热仿真 工程师',
      education: '陕西科技大学 硕士',
      achievements: '发表论文1篇,专利1篇',
      image: '/assets/expert-2.jpg'
    },
    {
      id: '3',
      name: '段李权',
      role: 'NPI主管,负责难度板跟进及交付',
      roleTitle: '制造 主管',
      education: '电子科技大学 本科',
      achievements: '具有15年厚铜生产经验,发表专利10余篇',
      image: '/assets/expert-3.jpg'
    },
    {
      id: '4',
      name: '刘伟',
      role: '电机专家,电机电磁仿真,结构设计',
      roleTitle: '电磁仿真 技术专家',
      education: '长沙理工大学 本科',
      achievements: '13年电机研发经验,实用新型专利4篇',
      image: '/assets/expert-4.jpg'
    }
  ];
}

