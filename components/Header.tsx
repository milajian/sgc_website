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
import { scrollToSection } from "@/lib/scroll";
const logo = getImagePath("/assets/logo.png");

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'tech-center': false,
    'pcb-coil': false,
    'product-lines': false,
  });
  const [productLinesHover, setProductLinesHover] = useState(false);

  // 根据当前路径判断激活的菜单项
  const getActiveMenuKey = useCallback((): string | null => {
    if (!pathname) return null;
    
    // 技术中心：路径包含 /tech-center 或主页的特定 section
    if (pathname.includes('/tech-center') || pathname === '/') {
      return 'tech-center';
    }
    
    // PCB线圈：路径包含 /pcb-coil
    if (pathname.includes('/pcb-coil')) {
      return 'pcb-coil';
    }
    
    // PCB埋嵌
    if (pathname === '/pcb-embedded' || pathname.includes('/pcb-embedded')) {
      return 'pcb-embedded';
    }
    
    // 玻璃基板
    if (pathname === '/glass-substrate' || pathname.includes('/glass-substrate')) {
      return 'glass-substrate';
    }
    
    return null;
  }, [pathname]);

  const activeMenuKey = getActiveMenuKey();

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


  const handleTechCenterClick = useCallback(() => {
    // 导航到首页
    router.push('/');
  }, [router]);

  const handlePCBCoilClick = useCallback(() => {
    // 导航到PCB线圈产品线页面
    router.push('/pcb-coil-product-lines');
  }, [router]);


  // 预取常用页面，提升跳转速度
  useEffect(() => {
    router.prefetch('/');
    router.prefetch('/pcb-coil-product-lines');
  }, [router]);

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
                      // 如果点击的是触发器本身（不是下拉菜单），则跳转
                      if (e.target === e.currentTarget || (e.target as HTMLElement).textContent === '技术中心') {
                        handleTechCenterClick();
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
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/#expert-team"
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            专家列表
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
                      // 如果点击的是触发器本身（不是下拉菜单），则跳转
                      if (e.target === e.currentTarget || (e.target as HTMLElement).textContent === 'PCB线圈') {
                        handlePCBCoilClick();
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
                            onClick={() => setProductLinesHover(false)}
                          >
                            五大产品线
                          </Link>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${productLinesHover ? 'rotate-180' : ''}`} />
                        </div>
                        {productLinesHover && (
                          <ul className="absolute left-full top-0 -ml-1 w-[220px] bg-background/95 backdrop-blur-lg shadow-xl rounded-md p-2 z-50" style={{ borderWidth: '0.5px', borderStyle: 'solid', borderColor: 'hsl(210 55% 25% / 0.2)' }}>
                            <li>
                              <button
                                onClick={() => {
                                  router.push('/pcb-coil-axial');
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
                                onClick={() => setProductLinesHover(false)}
                              >
                                直线电机绕组
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/pcb-coil-planar-transformer"
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                onClick={() => setProductLinesHover(false)}
                              >
                                平面变压器
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/pcb-coil-planar-winding"
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                onClick={() => setProductLinesHover(false)}
                              >
                                平面电机绕组
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/pcb-coil-hollow-cup-stator"
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                onClick={() => setProductLinesHover(false)}
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
                          onClick={() => {
                            handleTechCenterClick();
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
                          <Link
                            href="/#expert-team"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            专家列表
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* PCB 线圈 */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            handlePCBCoilClick();
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
                              onClick={() => {
                                setMobileMenuOpen(false);
                                router.push('/pcb-coil-product-lines#product-lines');
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
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  router.push('/pcb-coil-axial');
                                }}
                                className="block w-full text-left px-3 py-1.5 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                              >
                                轴向磁通电机定子
                              </button>
                              <button
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  router.push('/pcb-coil-linear-winding');
                                }}
                                className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                              >
                                直线电机绕组
                              </button>
                              <button
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  router.push('/pcb-coil-planar-transformer');
                                }}
                                className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                              >
                                平面变压器
                              </button>
                              <button
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  router.push('/pcb-coil-planar-winding');
                                }}
                                className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                              >
                                平面电机绕组
                              </button>
                              <button
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  router.push('/pcb-coil-hollow-cup-stator');
                                }}
                                className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                              >
                                空心杯电机定子
                              </button>
                            </div>
                          )}
                          {/* 生产技术 */}
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              router.push('/pcb-coil-product-lines#pcb-stator-production-tech');
                            }}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            生产技术
                          </button>
                          {/* 生产设备 */}
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              router.push('/pcb-coil-product-lines#production-technology');
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
                        onClick={() => {
                          setMobileMenuOpen(false);
                          router.push('/pcb-embedded');
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
                        onClick={() => {
                          setMobileMenuOpen(false);
                          router.push('/glass-substrate');
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
