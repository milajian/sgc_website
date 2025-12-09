'use client'

import { CompanyInfo } from "@/components/CompanyInfo";
import { ResearchStructure, ResearchStructureData } from "@/components/ResearchStructure";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { jumpToSection } from "@/lib/scroll";

export default function Home() {
  const [researchData, setResearchData] = useState<ResearchStructureData | null>(null);
  const [loadingResearch, setLoadingResearch] = useState(true);
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 从后端API获取数据
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        
        // 添加超时控制
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3秒超时
        
        try {
          const response = await fetch(`${apiUrl}/api/research-structure`, {
            signal: controller.signal,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          clearTimeout(timeoutId);
          
          if (response.ok) {
            const fetchedData = await response.json();
            if (fetchedData && fetchedData.center) {
              setResearchData(fetchedData);
            } else {
              // 如果返回数据格式不正确，使用默认数据
              setResearchData(getDefaultData());
            }
          } else {
            // 如果API返回错误，使用默认数据
            setResearchData(getDefaultData());
          }
        } catch (fetchError: any) {
          clearTimeout(timeoutId);
          // 如果是超时或网络错误，使用默认数据
          if (fetchError.name === 'AbortError') {
            console.warn('API请求超时，使用默认数据');
          } else {
            console.warn('无法连接到后端服务，使用默认数据');
          }
          setResearchData(getDefaultData());
        }
      } catch (error) {
        // 其他错误，使用默认数据
        console.warn('获取组织架构数据失败，使用默认数据:', error);
        setResearchData(getDefaultData());
      } finally {
        setLoadingResearch(false);
      }
    };

    fetchData();
  }, []);

  // 立即检查hash并隐藏内容（避免显示顶部内容）
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && mainRef.current) {
      // 立即隐藏内容，避免显示顶部内容
      mainRef.current.style.visibility = 'hidden';
    }
  }, []);

  // 处理 hash 导航（跨页面导航时使用）
  useEffect(() => {
    // 等待页面内容加载完成
    if (loadingResearch) return;

    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.substring(1); // 移除 # 号
        // 等待 DOM 渲染完成后再跳转
        const tryScroll = (retries: number = 10) => {
          const element = document.getElementById(sectionId);
          if (element) {
            // 元素存在，执行直接跳转（无滚动动画）
            jumpToSection(sectionId);
            // 显示内容
            if (mainRef.current) {
              mainRef.current.style.visibility = 'visible';
            }
          } else if (retries > 0) {
            // 元素不存在，重试
            setTimeout(() => {
              tryScroll(retries - 1);
            }, 50);
          } else {
            // 达到最大重试次数，仍然显示内容
            if (mainRef.current) {
              mainRef.current.style.visibility = 'visible';
            }
          }
        };
        
        // 立即开始尝试，不延迟
        tryScroll();
      } else {
        // 没有hash，显示内容
        if (mainRef.current) {
          mainRef.current.style.visibility = 'visible';
        }
      }
    };

    // 初始检查
    handleHashNavigation();

    // 监听 hashchange 事件（用于浏览器前进/后退）
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, [loadingResearch, pathname]);

  return (
    <div className="min-h-screen">
      <main ref={mainRef} className="pt-20">
        <CompanyInfo />
        {!loadingResearch && researchData && (
          <ResearchStructure data={researchData} />
        )}
      </main>
    </div>
  );
}

// 默认数据（当后端不可用时使用）
function getDefaultData(): ResearchStructureData {
  return {
    center: {
      title: "技术中心 SGC Labs"
    },
    leadership: [
      { name: "总工程师" },
      { name: "技术委员会" }
    ],
    departments: [
      {
        id: "rnd",
        name: "技术研发部",
        icon: "network",
        groups: [
          "材料研究小组",
          "基础技术小组",
          "仿真小组"
        ]
      },
      {
        id: "product",
        name: "产品研发部",
        icon: "gear",
        groups: [
          "高频高速组",
          "刚挠结合组",
          "光模块小组",
          "ATE小组"
        ]
      },
      {
        id: "project",
        name: "项目管理部",
        icon: "squares",
        functions: [
          "项目流程管理",
          "知识产权管理",
          "重大专项申报",
          "项目评审组织"
        ]
      },
      {
        id: "lab",
        name: "中央实验室",
        icon: "flask",
        functions: [
          "建立研发平台并开放资源",
          "进行研发质量控制",
          "电子产品的失效分析与可靠性研究",
          "半导体集成电路先进封装测试工艺研究实验室"
        ]
      }
    ],
    partners: [
      {
        id: "1",
        name: "南方科技大学",
        logo: ""
      },
      {
        id: "2",
        name: "中国科学院深圳先进技术研究院",
        logo: ""
      },
      {
        id: "3",
        name: "中原工学院",
        logo: ""
      },
      {
        id: "4",
        name: "桂林航天工業學院",
        logo: ""
      }
    ]
  };
}

