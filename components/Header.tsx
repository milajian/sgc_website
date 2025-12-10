'use client'
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, ChevronDown } from "lucide-react";
import { getImagePath } from "@/lib/image-path";
import { scrollToSection, jumpToSection } from "@/lib/scroll";
import { useRouteLoading } from "@/lib/route-loading-context";
const logo = getImagePath("/assets/logo.png");

export const Header = () => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'tech-center': false,
    'pcb-coil': false,
    'product-lines': false,
  });
  const [productLinesHover, setProductLinesHover] = useState(false);

  // 获取当前路径（兼容静态导出模式）
  const [pathUpdateTrigger, setPathUpdateTrigger] = useState(0);
  
  // 添加状态来存储 activeMenuKey，确保页面加载后立即正确计算
  const [activeMenuKey, setActiveMenuKey] = useState<string | null>(null);
  
  // 标记是否正在导航中（用于防止 updatePath 覆盖手动设置的选中状态）
  const [isNavigating, setIsNavigating] = useState(false);
  
  // 获取路由加载状态管理
  const { startLoading, stopLoading } = useRouteLoading();
  
  // Next.js 路由
  const router = useRouter();
  const pathname = usePathname();

  // 根据当前路径判断激活的菜单项
  const getActiveMenuKey = useCallback((): string | null => {
    // 直接从 window.location 获取路径，确保获取到最新值
    // 这样可以避免 currentPath 状态更新延迟的问题
    if (typeof window === 'undefined') {
      return null;
    }
    
    let activePath = window.location.pathname;
    
    // 移除 basePath 前缀
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    if (basePath && activePath.startsWith(basePath)) {
      const pathAfterBase = activePath.slice(basePath.length);
      // 如果移除 basePath 后是空字符串，说明路径就是 basePath 本身，应该视为根路径
      activePath = pathAfterBase || '/';
    }
    
    // 特殊处理：在生产环境中，如果路径是 /sgc_website 或 /sgc_website/，也应该视为根路径
    // 如果路径以 /sgc_website/ 开头，移除该前缀
    // 这是因为 IP 地址部署时，NEXT_PUBLIC_BASE_PATH 是空字符串，但实际路径包含 /sgc_website
    // 这种情况发生在服务器配置将 /sgc_website 作为应用根路径时
    if (activePath === '/sgc_website' || activePath === '/sgc_website/') {
      activePath = '/';
    } else if (activePath.startsWith('/sgc_website/')) {
      // 移除 /sgc_website 前缀，保留后面的路径
      activePath = activePath.slice('/sgc_website'.length) || '/';
    }
    
    if (!activePath) return null;
    
    // 标准化路径：移除尾部斜杠（除了根路径）
    const normalizedPath = activePath === '/' ? '/' : activePath.replace(/\/$/, '');
    
    // 按从具体到一般的顺序判断，确保只返回一个匹配项
    // 每个条件都必须 return，避免多个条件同时满足
    
    // 1. PCB埋嵌 - 精确匹配，避免与其他路径冲突
    if (normalizedPath === '/pcb-embedded' || normalizedPath.startsWith('/pcb-embedded/')) {
      return 'pcb-embedded';
    }
    
    // 2. 玻璃基板 - 精确匹配
    if (normalizedPath === '/glass-substrate' || normalizedPath.startsWith('/glass-substrate/')) {
      return 'glass-substrate';
    }
    
    // 3. PCB线圈：路径包含 /pcb-coil（但不能是 /pcb-embedded）
    // 包括 /pcb-coil-product-lines、/pcb-coil-axial 等所有 PCB 线圈相关路径
    if (normalizedPath.includes('/pcb-coil') && !normalizedPath.includes('/pcb-embedded')) {
      return 'pcb-coil';
    }
    
    // 4. 技术中心：路径包含 /tech-center
    if (normalizedPath.includes('/tech-center')) {
      return 'tech-center';
    }
    
    // 5. 根路径 / 也激活技术中心菜单（因为点击技术中心会跳转到根路径）
    // 这是最后匹配的条件，确保只有在真正是根路径时才激活技术中心
    if (normalizedPath === '/') {
      return 'tech-center';
    }
    
    return null;
  }, []); // 移除 pathUpdateTrigger 依赖，因为函数内部直接从 window.location 读取

  useEffect(() => {
    // 在客户端获取实际路径
    const updatePath = () => {
      if (typeof window !== 'undefined') {
        const actualPath = window.location.pathname;
        // 移除 basePath 前缀（如果存在），以便路径匹配逻辑正常工作
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        let pathWithoutBasePath = actualPath;
        if (basePath && actualPath.startsWith(basePath)) {
          pathWithoutBasePath = actualPath.slice(basePath.length) || '/';
        }
        setCurrentPath(pathWithoutBasePath);
        
        // 只有在非导航状态时才更新 activeMenuKey
        // 如果正在导航，说明我们刚刚手动设置了选中状态，不要覆盖它
        if (!isNavigating) {
          // 更新 activeMenuKey
          const menuKey = getActiveMenuKey();
          setActiveMenuKey(menuKey);
        }
        
        // 触发组件重新渲染
        setPathUpdateTrigger(prev => prev + 1);
      }
    };

    // 立即执行一次，确保初始路径正确
    updatePath();
    
    // 使用 requestAnimationFrame 作为补充，确保在浏览器完成渲染后再次更新
    // 这对于使用 window.location.href 跳转后的页面加载特别重要
    requestAnimationFrame(() => {
      updatePath();
    });
    
    // 使用 setTimeout 作为额外保障，确保在页面完全加载后更新
    setTimeout(() => {
      updatePath();
    }, 0);

    // 监听路径变化（用于浏览器前进/后退）
    window.addEventListener('popstate', updatePath);
    
    // 监听 hashchange（用于锚点导航）
    window.addEventListener('hashchange', updatePath);

    // 定期检查路径变化（作为后备方案，确保路径状态同步）
    // 使用较短的间隔，确保在页面加载后能快速更新选中状态
    const intervalId = setInterval(updatePath, 100);

    return () => {
      window.removeEventListener('popstate', updatePath);
      window.removeEventListener('hashchange', updatePath);
      clearInterval(intervalId);
    };
  }, [getActiveMenuKey, isNavigating]); // 添加 isNavigating 依赖

  // 监听路由变化，处理 hash 导航和停止加载状态
  useEffect(() => {
    // 检查 URL 中是否有 hash
    const hash = window.location.hash.substring(1); // 移除 # 号
    
    if (hash) {
      // 等待页面渲染完成后滚动到 hash 位置
      const scrollToHash = () => {
        const element = document.getElementById(hash);
        if (element) {
          // 使用 jumpToSection 进行跨页面导航（无滚动动画）
          jumpToSection(hash);
        }
      };
      
      // 使用 requestAnimationFrame 确保 DOM 已渲染
      requestAnimationFrame(() => {
        scrollToHash();
        // 如果第一次尝试失败，再试一次
        setTimeout(scrollToHash, 100);
      });
    }
    
    // 停止加载状态
    stopLoading();
    
    // 路由完成后，清除导航标记并更新菜单选中状态（确保与 URL 一致）
    setIsNavigating(false);
    const menuKey = getActiveMenuKey();
    setActiveMenuKey(menuKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, stopLoading]); // getActiveMenuKey 不依赖于任何会变化的值，它直接从 window.location 读取

  const toggleMenu = useCallback((menuKey: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  }, []);

  const handleMobileNavClick = useCallback((sectionId: string) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
    // 延迟返回焦点，确保菜单已关闭
    setTimeout(() => {
      menuButtonRef.current?.focus();
    }, 100);
  }, []);

  // 根据路径计算应该激活的菜单项（用于立即更新选中状态）
  const calculateMenuKeyFromPath = useCallback((path: string): string | null => {
    // 标准化路径（移除尾部斜杠，除了根路径）
    const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '');
    
    // 按从具体到一般的顺序判断，确保只返回一个匹配项
    // 1. PCB埋嵌 - 精确匹配，避免与其他路径冲突
    if (normalizedPath === '/pcb-embedded' || normalizedPath.startsWith('/pcb-embedded/')) {
      return 'pcb-embedded';
    }
    
    // 2. 玻璃基板 - 精确匹配
    if (normalizedPath === '/glass-substrate' || normalizedPath.startsWith('/glass-substrate/')) {
      return 'glass-substrate';
    }
    
    // 3. PCB线圈：路径包含 /pcb-coil（但不能是 /pcb-embedded）
    if (normalizedPath.includes('/pcb-coil') && !normalizedPath.includes('/pcb-embedded')) {
      return 'pcb-coil';
    }
    
    // 4. 技术中心：路径包含 /tech-center
    if (normalizedPath.includes('/tech-center')) {
      return 'tech-center';
    }
    
    // 5. 根路径 / 也激活技术中心菜单
    if (normalizedPath === '/') {
      return 'tech-center';
    }
    
    return null;
  }, []);

  // 创建统一的导航处理函数
  const handleNavigation = useCallback((targetPath: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // 分离路径和 hash
    const [path, hash] = targetPath.split('#');
    
    // 标准化路径（移除尾部斜杠，除了根路径）
    const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '');
    const currentPathNormalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
    
    // 检查是否是同页面 hash 导航
    if (hash && currentPathNormalized === normalizedPath) {
      // 同页面 hash 导航，直接滚动到目标位置
      scrollToSection(hash);
      return;
    }
    
    // 跨页面导航
    // 标记正在导航中，防止 updatePath 覆盖我们设置的选中状态
    setIsNavigating(true);
    
    // 立即更新菜单选中状态（在路由完成前）
    const newMenuKey = calculateMenuKeyFromPath(normalizedPath);
    if (newMenuKey !== null) {
      setActiveMenuKey(newMenuKey);
    }
    
    // 立即显示加载状态
    startLoading();
    
    // 使用 Next.js 客户端路由
    const targetUrl = normalizedPath + (hash ? `#${hash}` : '');
    router.push(targetUrl);
    
    // 如果带 hash，在路由完成后滚动（通过 useEffect 监听路由变化处理）
  }, [startLoading, router, pathname, calculateMenuKeyFromPath]);

  const handleTechCenterClick = useCallback((e?: React.MouseEvent) => {
    handleNavigation('/', e);
  }, [handleNavigation]);

  const handlePCBCoilClick = useCallback((e?: React.MouseEvent) => {
    handleNavigation('/pcb-coil-product-lines', e);
  }, [handleNavigation]);


  // Esc 键关闭移动端菜单
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // 根据当前路径自动展开移动端菜单
  useEffect(() => {
    // 根据当前激活的菜单项自动展开对应的移动端菜单
    // 直接在 effect 内部计算 menuKey，避免依赖数组大小变化的问题
    let menuKey: string | null = null;
    
    if (typeof window !== 'undefined') {
      let activePath: string | null = window.location.pathname;
      // 移除 basePath 前缀
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
      if (basePath && activePath.startsWith(basePath)) {
        activePath = activePath.slice(basePath.length) || '/';
      }
      
      if (activePath) {
        // 标准化路径：移除尾部斜杠（除了根路径）
        const normalizedPath = activePath === '/' ? '/' : activePath.replace(/\/$/, '');
        
        // 优先判断更具体的路径，避免冲突
        if (normalizedPath === '/pcb-embedded' || normalizedPath.startsWith('/pcb-embedded/')) {
          menuKey = 'pcb-embedded';
        } else if (normalizedPath === '/glass-substrate' || normalizedPath.startsWith('/glass-substrate/')) {
          menuKey = 'glass-substrate';
        } else if (normalizedPath.includes('/pcb-coil') && !normalizedPath.includes('/pcb-embedded')) {
          menuKey = 'pcb-coil';
        } else if (normalizedPath.includes('/tech-center') || normalizedPath === '/') {
          menuKey = 'tech-center';
        }
      }
    }
    
    // 如果 window.location 获取失败，使用 currentPath 作为后备
    if (!menuKey && currentPath) {
      const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');
      if (normalizedPath === '/pcb-embedded' || normalizedPath.startsWith('/pcb-embedded/')) {
        menuKey = 'pcb-embedded';
      } else if (normalizedPath === '/glass-substrate' || normalizedPath.startsWith('/glass-substrate/')) {
        menuKey = 'glass-substrate';
      } else if (normalizedPath.includes('/pcb-coil') && !normalizedPath.includes('/pcb-embedded')) {
        menuKey = 'pcb-coil';
      } else if (normalizedPath.includes('/tech-center') || normalizedPath === '/') {
        menuKey = 'tech-center';
      }
    }
    
    setExpandedMenus(prev => {
      const newState = { ...prev };
      
      // 如果当前激活的是技术中心，自动展开技术中心菜单
      if (menuKey === 'tech-center') {
        newState['tech-center'] = true;
      }
      
      // 如果当前激活的是PCB线圈，自动展开PCB线圈菜单
      if (menuKey === 'pcb-coil') {
        newState['pcb-coil'] = true;
        // 如果路径包含 product-lines 或 pcb-coil-axial，也展开五大产品线子菜单
        const pathToCheck = typeof window !== 'undefined' ? window.location.pathname : currentPath;
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        let pathWithoutBasePath = pathToCheck;
        if (basePath && pathToCheck.startsWith(basePath)) {
          pathWithoutBasePath = pathToCheck.slice(basePath.length) || '/';
        }
        if (pathWithoutBasePath.includes('product-lines') || 
            pathWithoutBasePath.includes('pcb-coil-axial') ||
            pathWithoutBasePath.includes('pcb-coil-linear-winding') ||
            pathWithoutBasePath.includes('pcb-coil-planar-transformer') ||
            pathWithoutBasePath.includes('pcb-coil-planar-winding') ||
            pathWithoutBasePath.includes('pcb-coil-hollow-cup-stator')) {
          newState['product-lines'] = true;
        }
      }
      
      return newState;
    });
  }, [currentPath]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-primary/20 shadow-lg shadow-primary/5">
      <nav className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="cursor-pointer">
              <img 
                alt="SGCircuits" 
                src={logo} 
                className="h-10 md:h-12 object-contain hover:scale-105 transition-transform duration-300" 
                loading="eager"
              />
            </Link>
          </div>
          
          {/* Navigation Menu - Desktop */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu aria-label="主导航菜单" id="main-navigation-menu">
              <NavigationMenuList className="gap-0 lg:gap-0.5 xl:gap-1">
                {/* 技术中心 */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    onClick={(e) => {
                      // 阻止默认行为，避免 NavigationMenuTrigger 的默认跳转
                      e.preventDefault();
                      e.stopPropagation();
                      // 如果点击的是触发器本身（不是下拉菜单），则跳转
                      if (e.target === e.currentTarget || (e.target as HTMLElement).textContent === '技术中心') {
                        handleTechCenterClick(e);
                      }
                    }}
                    className={`text-foreground hover:text-primary hover:bg-transparent bg-transparent text-xs lg:text-sm font-medium transition-all duration-300 px-2 lg:px-3 xl:px-4 cursor-pointer ${
                      activeMenuKey === 'tech-center' ? 'pcb-active-glow' : ''
                    }`}>
                    技术中心
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background/95 backdrop-blur-lg shadow-xl" style={{ borderWidth: '0.5px', borderStyle: 'solid', borderColor: 'hsl(210 55% 25% / 0.2)' }}>
                    <ul className="w-[220px] p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/#partners"
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            研发方向
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/#research-structure"
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            研发架构
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/#incubation-achievements"
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            产品创新
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* PCB 线圈 */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    onClick={(e) => {
                      // 阻止默认行为，避免 NavigationMenuTrigger 的默认跳转
                      e.preventDefault();
                      e.stopPropagation();
                      // 如果点击的是触发器本身（不是下拉菜单），则跳转
                      if (e.target === e.currentTarget || (e.target as HTMLElement).textContent === 'PCB线圈') {
                        handlePCBCoilClick(e);
                      }
                    }}
                    className={`text-foreground hover:text-primary hover:bg-transparent bg-transparent text-xs lg:text-sm font-medium transition-all duration-300 px-2 lg:px-3 xl:px-4 cursor-pointer ${
                      activeMenuKey === 'pcb-coil' ? 'pcb-active-glow' : ''
                    }`}>
                    PCB线圈
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background/95 backdrop-blur-lg shadow-xl" style={{ borderWidth: '0.5px', borderStyle: 'solid', borderColor: 'hsl(210 55% 25% / 0.2)' }}>
                    <ul className="w-[220px] p-2">
                      {/* 五大产品线 */}
                      <li 
                        className="relative"
                        onMouseEnter={() => setProductLinesHover(true)}
                        onMouseLeave={() => setProductLinesHover(false)}
                      >
                        <div
                          className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <Link
                            href="/pcb-coil-product-lines#product-lines"
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation(); // 阻止事件冒泡到父元素，避免hover状态干扰
                              e.preventDefault(); // 阻止默认链接行为
                              setProductLinesHover(false);
                              handleNavigation('/pcb-coil-product-lines#product-lines', e);
                            }}
                          >
                            五大产品线
                          </Link>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${productLinesHover ? 'rotate-180' : ''}`} />
                        </div>
                        {productLinesHover && (
                          <ul className="absolute left-full top-0 -ml-1 w-[220px] bg-background/95 backdrop-blur-lg shadow-xl rounded-md p-2 z-50" style={{ borderWidth: '0.5px', borderStyle: 'solid', borderColor: 'hsl(210 55% 25% / 0.2)' }}>
                            <li>
                              <button
                                onClick={(e) => {
                                  handleNavigation('/pcb-coil-axial', e);
                                }}
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                              >
                                轴向磁通电机定子
                              </button>
                            </li>
                            <li>
                              <Link
                                href="/pcb-coil-linear-winding"
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setProductLinesHover(false);
                                  handleNavigation('/pcb-coil-linear-winding', e);
                                }}
                              >
                                直线电机绕组
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/pcb-coil-planar-transformer"
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setProductLinesHover(false);
                                  handleNavigation('/pcb-coil-planar-transformer', e);
                                }}
                              >
                                平面变压器
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/pcb-coil-planar-winding"
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setProductLinesHover(false);
                                  handleNavigation('/pcb-coil-planar-winding', e);
                                }}
                              >
                                平面电机绕组
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/pcb-coil-hollow-cup-stator"
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setProductLinesHover(false);
                                  handleNavigation('/pcb-coil-hollow-cup-stator', e);
                                }}
                              >
                                空心杯电机定子
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      {/* 生产技术 */}
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/pcb-coil-product-lines#pcb-stator-production-tech"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation('/pcb-coil-product-lines#pcb-stator-production-tech', e);
                            }}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            生产技术
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {/* 生产设备 */}
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/pcb-coil-product-lines#production-technology"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation('/pcb-coil-product-lines#production-technology', e);
                            }}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            生产设备
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* PCB 埋嵌 */}
                <NavigationMenuItem>
                  <Link 
                    href="/pcb-embedded"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('/pcb-embedded', e);
                    }}
                    className={`text-foreground hover:text-primary transition-all duration-300 text-xs lg:text-sm font-medium px-2 lg:px-3 xl:px-4 py-2 ${
                      activeMenuKey === 'pcb-embedded' ? 'pcb-active-glow' : ''
                    }`}
                  >
                    PCB埋嵌
                  </Link>
                </NavigationMenuItem>

                {/* 玻璃基板 */}
                <NavigationMenuItem>
                  <Link 
                    href="/glass-substrate"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('/glass-substrate', e);
                    }}
                    className={`text-foreground hover:text-primary transition-all duration-300 text-xs lg:text-sm font-medium px-2 lg:px-3 xl:px-4 py-2 ${
                      activeMenuKey === 'glass-substrate' ? 'pcb-active-glow' : ''
                    }`}
                  >
                    玻璃基板
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-2 lg:gap-3 xl:gap-4">
            <span className="hidden xl:inline text-xs lg:text-sm text-muted-foreground font-medium whitespace-nowrap">股票代码: 300739</span>
            <Button 
              variant="default" 
              size="sm"
              className="hidden sm:flex shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-accent hover:shadow-primary/30 transition-all duration-300 text-xs lg:text-sm px-2 lg:px-3 xl:px-4" 
              asChild
            >
              <a 
                href="https://sunshinepcb.com/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                了解更多
              </a>
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button ref={menuButtonRef} variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">打开菜单</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[200px] sm:w-[220px]">
                <ScrollArea className="h-[calc(100vh-4rem)] mt-8">
                  <div className="flex flex-col space-y-5 pb-8 pr-4">
                    <SheetTitle className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">导航菜单</SheetTitle>
                    
                    {/* 技术中心 */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleTechCenterClick(e);
                            setMobileMenuOpen(false);
                          }}
                          className={`flex-1 text-left text-sm font-semibold text-foreground hover:text-primary transition-all duration-300 px-3 py-2 ${
                            activeMenuKey === 'tech-center' ? 'pcb-active-glow' : ''
                          }`}
                        >
                          技术中心
                        </button>
                        <button
                          onClick={() => toggleMenu('tech-center')}
                          className="flex-shrink-0 px-2 py-2"
                          aria-label="展开/收起技术中心菜单"
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedMenus['tech-center'] ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      {expandedMenus['tech-center'] && (
                        <div className="space-y-1 pl-2">
                          <Link
                            href="/#partners"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            研发方向
                          </Link>
                          <Link
                            href="/#research-structure"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            研发架构
                          </Link>
                          <Link
                            href="/#incubation-achievements"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            产品创新
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* PCB 线圈 */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handlePCBCoilClick(e);
                            setMobileMenuOpen(false);
                          }}
                          className={`flex-1 text-left text-sm font-semibold text-foreground hover:text-primary transition-all duration-300 px-3 py-2 ${
                            activeMenuKey === 'pcb-coil' ? 'pcb-active-glow' : ''
                          }`}
                        >
                          PCB线圈
                        </button>
                        <button
                          onClick={() => toggleMenu('pcb-coil')}
                          className="flex-shrink-0 px-2 py-2"
                          aria-label="展开/收起PCB线圈菜单"
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedMenus['pcb-coil'] ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      {expandedMenus['pcb-coil'] && (
                        <div className="space-y-1 pl-2">
                          {/* 五大产品线 */}
                          <div className="flex items-center justify-between w-full">
                            <button
                              onClick={(e) => {
                                setMobileMenuOpen(false);
                                handleNavigation('/pcb-coil-product-lines#product-lines', e);
                              }}
                              className="flex-1 text-left text-sm font-semibold text-foreground hover:text-primary transition-colors px-3 py-1.5"
                            >
                              五大产品线
                            </button>
                            <button
                              onClick={() => toggleMenu('product-lines')}
                              className="flex-shrink-0 px-2 py-1.5"
                            >
                              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedMenus['product-lines'] ? 'rotate-180' : ''}`} />
                            </button>
                          </div>
                          {expandedMenus['product-lines'] && (
                            <div className="space-y-1 pl-2">
                              <button
                                onClick={(e) => {
                                  setMobileMenuOpen(false);
                                  handleNavigation('/pcb-coil-axial', e);
                                }}
                                className="block w-full text-left px-3 py-1.5 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                              >
                                轴向磁通电机定子
                              </button>
                              <button
                                onClick={(e) => {
                                  setMobileMenuOpen(false);
                                  handleNavigation('/pcb-coil-linear-winding', e);
                                }}
                                className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                              >
                                直线电机绕组
                              </button>
                              <button
                                onClick={(e) => {
                                  setMobileMenuOpen(false);
                                  handleNavigation('/pcb-coil-planar-transformer', e);
                                }}
                                className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                              >
                                平面变压器
                              </button>
                              <button
                                onClick={(e) => {
                                  setMobileMenuOpen(false);
                                  handleNavigation('/pcb-coil-planar-winding', e);
                                }}
                                className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                              >
                                平面电机绕组
                              </button>
                              <button
                                onClick={(e) => {
                                  setMobileMenuOpen(false);
                                  handleNavigation('/pcb-coil-hollow-cup-stator', e);
                                }}
                                className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                              >
                                空心杯电机定子
                              </button>
                            </div>
                          )}
                          {/* 生产技术 */}
                          <button
                            onClick={(e) => {
                              setMobileMenuOpen(false);
                              handleNavigation('/pcb-coil-product-lines#pcb-stator-production-tech', e);
                            }}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            生产技术
                          </button>
                          {/* 生产设备 */}
                          <button
                            onClick={(e) => {
                              setMobileMenuOpen(false);
                              handleNavigation('/pcb-coil-product-lines#production-technology', e);
                            }}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            生产设备
                          </button>
                        </div>
                      )}
                    </div>

                    {/* PCB 埋嵌 */}
                    <div className="space-y-1.5">
                      <h3 
                        onClick={(e) => {
                          setMobileMenuOpen(false);
                          handleNavigation('/pcb-embedded', e);
                        }}
                        className={`text-sm font-semibold text-foreground hover:text-primary transition-all duration-300 cursor-pointer px-3 py-2 ${
                          activeMenuKey === 'pcb-embedded' ? 'pcb-active-glow' : ''
                        }`}
                      >
                        PCB埋嵌
                      </h3>
                    </div>

                    {/* 玻璃基板 */}
                    <div className="space-y-1.5">
                      <h3 
                        onClick={(e) => {
                          setMobileMenuOpen(false);
                          handleNavigation('/glass-substrate', e);
                        }}
                        className={`text-sm font-semibold text-foreground hover:text-primary transition-all duration-300 cursor-pointer px-3 py-2 ${
                          activeMenuKey === 'glass-substrate' ? 'pcb-active-glow' : ''
                        }`}
                      >
                        玻璃基板
                      </h3>
                    </div>

                    {/* Mobile Actions */}
                    <div className="pt-4 border-t space-y-3">
                      <div className="text-sm text-muted-foreground">股票代码: 300739</div>
                      <Button 
                        variant="default" 
                        className="w-full shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-accent hover:shadow-primary/30 transition-all duration-300" 
                        asChild
                      >
                        <a 
                          href="https://sunshinepcb.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          了解更多
                        </a>
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
