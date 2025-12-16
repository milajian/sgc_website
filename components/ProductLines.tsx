'use client'
import { Card } from "@/components/ui/card";
import { Cog, MoveHorizontal, Layers, LayoutGrid, Circle, Target } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getImagePath } from "@/lib/image-path";
import { preloadImages } from "@/lib/image-preload";

const productLines = [{
  icon: Cog,
  nameCn: "轴向磁通电机定子",
  nameEn: "Axial Flux Motor Stator",
  path: "/pcb-coil-axial",
  businessModel: "定子设计 + 仿真 + 生产",
  specs: [
    "功率等级：覆盖约 0.5–50 kW 轴向磁通电机平台",
    "外径范围：约 100–450 mm，可按整车/系统空间定制",
    "极对数：支持 4–24 极等多种拓扑",
    "最高转速：可按需求设计至 3,000–12,000 rpm",
    "效率指标：峰值效率可达 96% 以上（视工况与材料）",
    "转矩密度：面向高转矩密度盘式电机优化设计",
    "冷却方案：支持自然风冷 / 强制风冷 / 液冷一体化设计",
    "反馈接口：兼容编码器、霍尔、无感 FOC 等多种控制方案"
  ],
  applications: "新能源汽车驱动电机、轮毂电机、风电变桨系统、机器人与 AGV、工业伺服等"
}, {
  icon: MoveHorizontal,
  nameCn: "直线电机绕组",
  nameEn: "Linear Motor Winding",
  path: "/pcb-coil-linear-winding",
  businessModel: "绕组设计 + 仿真 + 生产",
  specs: [
    "推力范围：从几十牛到数千牛的直线电机平台",
    "行程形式：支持短行程精密定位与长行程直线驱动",
    "极距 / 极数：多种极距与多段组合绕组可选",
    "线速度：可按需求设计至 5–10 m/s 级应用",
    "加速度：支持 >10 m/s² 的高动态响应场景",
    "力波动：通过电磁仿真与绕组优化降低推力波动",
    "冷却方式：自然冷却 / 水冷 / 冷板一体化设计",
    "反馈方案：兼容光栅尺、磁栅、直线编码器等测量系统"
  ],
  applications: "半导体设备、精密机床、直线伺服平台、电子制造产线、工业自动化生产线等"
}, {
  icon: Layers,
  nameCn: "平面变压器",
  nameEn: "Planar Transformer",
  path: "/pcb-coil-planar-transformer",
  businessModel: "变压器设计 + 仿真 + 生产",
  specs: [
    "功率范围：从几十瓦到数千瓦平面变压器平台",
    "工作频率：适配约 50 kHz–1 MHz 高频拓扑",
    "拓扑兼容：LLC、PSFB、移相全桥等主流拓扑结构",
    "效率指标：峰值效率可达 98% 左右（视应用与设计）",
    "电压等级：支持宽输入 / 多输出电压组合",
    "绝缘与安全：按车规 / 工业安规设计爬电距离与电气间隙",
    "电磁性能：漏感、耦合系数等参数按应用场景精确优化",
    "热设计：支持与散热器、冷板、壳体的一体化热管理方案"
  ],
  applications: "车载 OBC / DC-DC、电信电源、服务器电源、光伏与储能逆变器、工业电源模块等"
}, {
  icon: LayoutGrid,
  nameCn: "平面电机绕组",
  nameEn: "Planar Motor Winding",
  path: "/pcb-coil-planar-winding",
  businessModel: "绕组生产",
  specs: [
    "电机类型：适配平面直驱电机、X-Y 平面电机等结构",
    "推力 / 转矩：覆盖从小型平台到高推力直驱应用的绕组需求",
    "相数 / 极数：支持多相、多极高推力密度方案",
    "节距精度：平面绕组节距误差可控制在约 ±0.05 mm 级（设计能力）",
    "动态性能：面向高加速度、高响应定位工况优化绕组布局",
    "热管理：支持与金属基座、冷板、散热模块一体化贴合",
    "驱动兼容：兼容常见伺服驱动及专用运动控制器",
    "封装方式：可提供裸绕组、灌封模组、结构件一体化等形式"
  ],
  applications: "平面电机平台、半导体搬运与曝光设备、精密运动控制系统、高精度检测与测量平台等"
}, {
  icon: Circle,
  nameCn: "空心杯电机定子",
  nameEn: "Coreless Motor Stator",
  path: "/pcb-coil-hollow-cup-stator",
  businessModel: "定子生产",
  specs: [
    "适配尺寸：典型外径约 10–60 mm 微型 / 小型电机",
    "电机结构：空心杯 / 无铁芯绕组拓扑，极低转子惯量",
    "最高转速：可覆盖数万 rpm 的高速应用需求",
    "动态响应：启停响应快，适合频繁启停与小步距控制",
    "转矩特性：齿槽转矩极小，低转速运行更平滑",
    "噪声与振动：通过电磁与结构优化降低噪声与振动",
    "驱动方式：适配无刷直流、伺服等多种驱动方案",
    "集成能力：支持与减速器、编码器、小型泵等机构一体化设计"
  ],
  applications: "医疗设备、精密泵浦、无人机云台、光学调节机构、智能锁与微型执行器等"
}];

export const ProductLines = () => {
  const router = useRouter();
  const prefetchedPaths = useRef<Set<string>>(new Set());
  const prefetchedImages = useRef<Set<string>>(new Set());
  const firstCardRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // 第一张卡片（轴向磁通电机定子）目标页面的首屏关键图片
  const firstCardCriticalImages = [
    "/assets/pcbdingzi1.png",
    "/assets/pcbdingzi2.png",
    "/assets/pcbdingzi3.png",
    "/assets/pcb-motor-intro.png"
  ].map(path => getImagePath(path));

  // 每张卡片的关键资源
  const cardCriticalResources: Record<string, { images?: string[] }> = {
    '/pcb-coil-linear-winding': {
      images: [
        '/assets/磁悬浮.png',
        '/assets/医疗.png',
        '/assets/平面电机.png'
      ]
    }
  };

  // 预取页面资源的辅助函数
  const prefetchPage = (path: string) => {
    if (typeof window === 'undefined' || prefetchedPaths.current.has(path)) {
      return;
    }

    try {
      // 尝试使用 Next.js router.prefetch（开发环境可能有效）
      router.prefetch(path);
    } catch (e) {
      // 静态导出模式下可能不支持，使用 fallback
    }

    // 使用 link prefetch（兼容静态导出模式）
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const targetPath = basePath + path;
    const fullUrl = `${window.location.origin}${targetPath}`;
    
    // 检查是否已经存在 prefetch link
    const existingLink = document.querySelector(`link[rel="prefetch"][href="${fullUrl}"]`);
    if (existingLink) {
      prefetchedPaths.current.add(path);
      return;
    }
    
    // 创建 prefetch link
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = fullUrl;
    link.as = 'document';
    document.head.appendChild(link);
    
    prefetchedPaths.current.add(path);
  };

  // 预取页面和图片的统一函数
  const prefetchPageWithImages = (path: string, index: number) => {
    // 如果已经预取过，跳过
    if (prefetchedPaths.current.has(path)) {
      return;
    }
    
    // 预取页面 HTML
    prefetchPage(path);
    
    // 预加载关键图片（如果有）
    const resources = cardCriticalResources[path];
    if (resources?.images) {
      const imagesToPreload = resources.images
        .map(img => getImagePath(img))
        .filter(img => !prefetchedImages.current.has(img));
      
      if (imagesToPreload.length > 0) {
        imagesToPreload.forEach(img => prefetchedImages.current.add(img));
        preloadImages(imagesToPreload, { maxConcurrent: 3 }).catch(() => {
          // 预加载失败不影响正常显示，静默处理
        });
      }
    }
  };

  // Intersection Observer：只在第一张卡片进入视口时预取
  useEffect(() => {
    if (typeof window === 'undefined' || !firstCardRef.current) {
      return;
    }

    // 检查浏览器是否支持 Intersection Observer
    if (!('IntersectionObserver' in window)) {
      // 不支持 Intersection Observer，直接预取
      const firstCard = productLines[0];
      if (firstCard) {
        prefetchPage(firstCard.path);
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 第一张卡片进入视口，预取页面和图片
            const firstCard = productLines[0];
            if (firstCard && !prefetchedPaths.current.has(firstCard.path)) {
              prefetchPage(firstCard.path);
              
              // 预加载首屏关键图片
              const imagesToPreload = firstCardCriticalImages.filter(
                img => !prefetchedImages.current.has(img)
              );
              if (imagesToPreload.length > 0) {
                imagesToPreload.forEach(img => prefetchedImages.current.add(img));
                preloadImages(imagesToPreload, { maxConcurrent: 4 }).catch(() => {
                  // 预加载失败不影响正常显示，静默处理
                });
              }
              
              // 预取完成后断开观察
              observer.disconnect();
            }
          }
        });
      },
      {
        rootMargin: '50px', // 提前 50px 开始预取
        threshold: 0.1,
      }
    );

    observer.observe(firstCardRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 组件挂载时延迟预取第一张卡片（作为 Intersection Observer 的补充）
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const firstCard = productLines[0];
    if (!firstCard) {
      return;
    }

    // 延迟 100ms 执行，避免阻塞首屏渲染
    const timeoutId = setTimeout(() => {
      // 如果 Intersection Observer 还没有触发预取，则在这里预取
      if (!prefetchedPaths.current.has(firstCard.path)) {
        prefetchPage(firstCard.path);
        
        // 预加载首屏关键图片
        const imagesToPreload = firstCardCriticalImages.filter(
          img => !prefetchedImages.current.has(img)
        );
        if (imagesToPreload.length > 0) {
          imagesToPreload.forEach(img => prefetchedImages.current.add(img));
          preloadImages(imagesToPreload, { maxConcurrent: 4 }).catch(() => {
            // 预加载失败不影响正常显示，静默处理
          });
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // 统一的 Intersection Observer：观察所有卡片（除第一张）
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // 检查浏览器是否支持 Intersection Observer
    if (!('IntersectionObserver' in window)) {
      // 不支持 Intersection Observer，降级处理
      // 第一张卡片已有延迟预取逻辑，其他卡片依赖鼠标悬停
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 找到对应的卡片索引
            const cardIndex = cardRefs.current.findIndex(ref => ref === entry.target);
            if (cardIndex === -1) return;
            
            const product = productLines[cardIndex];
            if (!product) return;
            
            // 第一张卡片：使用现有逻辑（已有专门的预取逻辑）
            if (cardIndex === 0) {
              // 第一张卡片的预取逻辑已在其他 useEffect 中处理
              return;
            }
            
            // 其他卡片：预取页面和图片
            if (!prefetchedPaths.current.has(product.path)) {
              prefetchPageWithImages(product.path, cardIndex);
            }
            
            // 预取完成后断开该卡片的观察（避免重复预取）
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // 提前 50px 开始预取
        threshold: 0.1,
      }
    );

    // 延迟观察，确保所有 ref 都已设置
    const timeoutId = setTimeout(() => {
      // 观察所有卡片（除了第一张，第一张已有专门的 observer）
      cardRefs.current.forEach((ref, index) => {
        if (ref && index > 0) {
          observer.observe(ref);
        }
      });
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return <section id="product-lines" className="py-20 bg-background section-fade-bottom">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                专精市场布局
              </h2>
            </motion.div>
            <motion.p 
              className="text-xl text-muted-foreground max-w-4xl mx-auto mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              五大产品线，覆盖PCB电机与平面变压器全领域
            </motion.p>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {productLines.map((product, index) => {
            const Icon = product.icon;
            const isFirstCard = index === 0;
            return <motion.div
                key={index}
                ref={(el) => {
                  if (isFirstCard) {
                    firstCardRef.current = el;
                  }
                  cardRefs.current[index] = el;
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={product.path} 
                  className="block h-full"
                  prefetch={isFirstCard ? true : undefined}
                  onMouseEnter={() => {
                    // 鼠标悬停时预取页面资源（非第一张卡片）
                    if (!isFirstCard) {
                      prefetchPageWithImages(product.path, index);
                    }
                  }}
                >
                  <Card className="p-4 h-full hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-muted/30 border-primary/20 hover:border-accent/40 flex flex-col overflow-hidden relative group cursor-pointer">
                    {/* Gradient background - top to bottom fade */}
                    <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-primary/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="flex flex-col items-center text-center flex-1 relative z-10">
                      {/* Icon - 渐变背景 + 阴影光晕 */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      
                      {/* Title - 固定最小高度确保对齐 */}
                      <div className="flex flex-col justify-center mb-4 min-h-[3.5rem] relative">
                        <h3 className="font-bold text-foreground leading-tight text-xl group-hover:text-accent transition-colors relative inline-block">
                          {product.nameCn}
                          {/* 下划线动画 - 从中间向两边展开 */}
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out"></span>
                        </h3>
                      </div>
                    
                    {/* Business Model - 增强视觉效果 */}
                    <div className="w-full py-2 px-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg mb-3 min-h-[4rem] flex flex-col justify-center border border-primary/10">
                      <p className="text-xs text-muted-foreground">业务模式</p>
                      <p className="text-sm font-bold text-accent">
                        {product.businessModel}
                      </p>
                    </div>
                    
                    {/* Specs - flex-1 让此区域自动填充空间 */}
                    <div className="w-full space-y-1.5 text-left mb-3 flex-1">
                      {product.specs.map((spec, idx) => <p key={idx} className="text-xs text-foreground flex items-start leading-snug">
                          <span className="text-accent mr-1.5">•</span>
                          <span>{spec}</span>
                        </p>)}
                    </div>
                    
                    {/* Applications - 固定在底部，青色高亮 */}
                    <div className="w-full pt-2 border-t border-accent/20">
                      <p className="text-xs text-accent font-medium mb-1">应用领域</p>
                      <p className="text-xs text-muted-foreground leading-snug">
                        {product.applications}
                      </p>
                    </div>
                  </div>
                </Card>
                </Link>
              </motion.div>;
          })}
          </div>
        </div>
      </div>
    </section>;
};
