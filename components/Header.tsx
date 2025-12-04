'use client'
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'tech-center': false,
    'pcb-coil': false,
    'product-innovation': false,
    'product-lines': false,
    'axial-motor-stator': false,
  });
  const [productInnovationHover, setProductInnovationHover] = useState(false);
  const [productLinesHover, setProductLinesHover] = useState(false);
  const [axialMotorStatorHover, setAxialMotorStatorHover] = useState(false);

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
                  <NavigationMenuTrigger className="text-foreground hover:text-primary hover:bg-transparent bg-transparent text-xs lg:text-sm font-medium transition-colors px-2 lg:px-3 xl:px-4">
                    技术中心
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background/95 backdrop-blur-lg shadow-xl" style={{ borderWidth: '0.5px', borderStyle: 'solid', borderColor: 'hsl(210 55% 25% / 0.2)' }}>
                    <ul className="w-[220px] p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => router.push('/tech-center/history')}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            历史发展
                          </button>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => router.push('/tech-center/research-structure')}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            研发架构
                          </button>
                        </NavigationMenuLink>
                      </li>
                      <li 
                        className="relative"
                        onMouseEnter={() => setProductInnovationHover(true)}
                        onMouseLeave={() => setProductInnovationHover(false)}
                      >
                        <div
                          className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>产品创新</span>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${productInnovationHover ? 'rotate-180' : ''}`} />
                        </div>
                        {productInnovationHover && (
                          <ul className="absolute left-full top-0 -ml-1 w-[220px] bg-background/95 backdrop-blur-lg shadow-xl rounded-md p-2 z-50" style={{ borderWidth: '0.5px', borderStyle: 'solid', borderColor: 'hsl(210 55% 25% / 0.2)' }}>
                            <li>
                              <Link
                                href="/tech-center/product-innovation/incubation-achievements"
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                onClick={() => setProductInnovationHover(false)}
                              >
                                孵化成果
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/tech-center/product-innovation/simulation-design"
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                onClick={() => setProductInnovationHover(false)}
                              >
                                PCB电机定子设计与仿真
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/tech-center/product-innovation#production-technology"
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                onClick={() => setProductInnovationHover(false)}
                              >
                                生产技术与设备
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/tech-center/expert-list"
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
                  <NavigationMenuTrigger className="text-foreground hover:text-primary hover:bg-transparent bg-transparent text-xs lg:text-sm font-medium transition-colors px-2 lg:px-3 xl:px-4">
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
                          <span>五大产品线</span>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${productLinesHover ? 'rotate-180' : ''}`} />
                        </div>
                        {productLinesHover && (
                          <ul className="absolute left-full top-0 -ml-1 w-[220px] bg-background/95 backdrop-blur-lg shadow-xl rounded-md p-2 z-50" style={{ borderWidth: '0.5px', borderStyle: 'solid', borderColor: 'hsl(210 55% 25% / 0.2)' }}>
                            <li 
                              className="relative"
                              onMouseEnter={() => setAxialMotorStatorHover(true)}
                              onMouseLeave={() => setAxialMotorStatorHover(false)}
                            >
                              <div
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors cursor-pointer flex items-center justify-between"
                              >
                                <span>轴向磁通电机定子</span>
                                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${axialMotorStatorHover ? 'rotate-180' : ''}`} />
                              </div>
                              {axialMotorStatorHover && (
                                <ul className="absolute left-full top-0 -ml-1 w-[220px] bg-background/95 backdrop-blur-lg shadow-xl rounded-md p-2 z-50" style={{ borderWidth: '0.5px', borderStyle: 'solid', borderColor: 'hsl(210 55% 25% / 0.2)' }}>
                                  <li>
                                    <Link
                                      href="/pcb-coil-axial/pcb-motor-intro"
                                      className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                      onClick={() => {
                                        setAxialMotorStatorHover(false);
                                        setProductLinesHover(false);
                                      }}
                                    >
                                      PCB电机产品介绍
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/pcb-coil-axial/pcb-motor-advantages"
                                      className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                      onClick={() => {
                                        setAxialMotorStatorHover(false);
                                        setProductLinesHover(false);
                                      }}
                                    >
                                      PCB电机优势
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/pcb-coil-axial/application-scenes"
                                      className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                      onClick={() => {
                                        setAxialMotorStatorHover(false);
                                        setProductLinesHover(false);
                                      }}
                                    >
                                      应用场景
                                    </Link>
                                  </li>
                            <li>
                              <Link
                                      href="/pcb-coil-axial/case-study"
                                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                      onClick={() => {
                                        setAxialMotorStatorHover(false);
                                        setProductLinesHover(false);
                                      }}
                              >
                                      PCB电机案例分析
                              </Link>
                                  </li>
                                </ul>
                              )}
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
                      {/* 专精市场布局 */}
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/pcb-coil-market-layout"
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            专精市场布局
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {/* PCB电机产品历程 */}
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/pcb-coil-product-journey"
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            PCB电机产品历程
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
                    className="text-foreground hover:text-primary transition-colors text-xs lg:text-sm font-medium px-2 lg:px-3 xl:px-4 py-2"
                  >
                    PCB埋嵌
                  </Link>
                </NavigationMenuItem>

                {/* 玻璃基板 */}
                <NavigationMenuItem>
                  <Link 
                    href="/glass-substrate"
                    className="text-foreground hover:text-primary transition-colors text-xs lg:text-sm font-medium px-2 lg:px-3 xl:px-4 py-2"
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
                      <button
                        onClick={() => toggleMenu('tech-center')}
                        className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        <span className="flex-1 text-left">技术中心</span>
                        <ChevronDown className={`flex-shrink-0 ml-2 h-4 w-4 transition-transform duration-200 ${expandedMenus['tech-center'] ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedMenus['tech-center'] && (
                        <div className="space-y-1 pl-2">
                          <button
                            onClick={() => {
                              router.push('/tech-center/history');
                              setMobileMenuOpen(false);
                            }}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            历史发展
                          </button>
                          <button
                            onClick={() => {
                              router.push('/tech-center/research-structure');
                              setMobileMenuOpen(false);
                            }}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            研发架构
                          </button>
                          <button
                            onClick={() => toggleMenu('product-innovation')}
                            className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors px-3 py-1.5"
                          >
                            <span className="flex-1 text-left">产品创新</span>
                            <ChevronDown className={`flex-shrink-0 ml-2 h-4 w-4 transition-transform duration-200 ${expandedMenus['product-innovation'] ? 'rotate-180' : ''}`} />
                          </button>
                          {expandedMenus['product-innovation'] && (
                            <div className="space-y-1 pl-2">
                              <button
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  router.push('/tech-center/product-innovation/incubation-achievements');
                                }}
                                className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                              >
                                孵化成果
                              </button>
                              <button
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  router.push('/tech-center/product-innovation/simulation-design');
                                }}
                                className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                              >
                                PCB电机定子设计与仿真
                              </button>
                              <button
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  router.push('/tech-center/product-innovation#production-technology');
                                }}
                                className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                              >
                                生产技术与设备
                              </button>
                            </div>
                          )}
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              router.push('/tech-center/expert-list');
                            }}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            专家列表
                          </button>
                        </div>
                      )}
                    </div>

                    {/* PCB 线圈 */}
                    <div className="space-y-1.5">
                      <button
                        onClick={() => toggleMenu('pcb-coil')}
                        className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        <span className="flex-1 text-left">PCB线圈</span>
                        <ChevronDown className={`flex-shrink-0 ml-2 h-4 w-4 transition-transform duration-200 ${expandedMenus['pcb-coil'] ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedMenus['pcb-coil'] && (
                        <div className="space-y-1 pl-2">
                          {/* 五大产品线 */}
                          <button
                            onClick={() => toggleMenu('product-lines')}
                            className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors px-3 py-1.5"
                          >
                            <span className="flex-1 text-left">五大产品线</span>
                            <ChevronDown className={`flex-shrink-0 ml-2 h-4 w-4 transition-transform duration-200 ${expandedMenus['product-lines'] ? 'rotate-180' : ''}`} />
                          </button>
                          {expandedMenus['product-lines'] && (
                            <div className="space-y-1 pl-2">
                              <button
                                onClick={() => toggleMenu('axial-motor-stator')}
                                className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors px-3 py-1.5"
                              >
                                <span className="flex-1 text-left">轴向磁通电机定子</span>
                                <ChevronDown className={`flex-shrink-0 ml-2 h-4 w-4 transition-transform duration-200 ${expandedMenus['axial-motor-stator'] ? 'rotate-180' : ''}`} />
                              </button>
                              {expandedMenus['axial-motor-stator'] && (
                                <div className="space-y-1 pl-2">
                                  <button
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      router.push('/pcb-coil-axial/pcb-motor-intro');
                                    }}
                                    className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                  >
                                    PCB电机产品介绍
                                  </button>
                                  <button
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      router.push('/pcb-coil-axial/pcb-motor-advantages');
                                    }}
                                    className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                  >
                                    PCB电机优势
                                  </button>
                                  <button
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      router.push('/pcb-coil-axial/application-scenes');
                                    }}
                                    className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                  >
                                    应用场景
                                  </button>
                              <button
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                      router.push('/pcb-coil-axial/case-study');
                                }}
                                className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                              >
                                    PCB电机案例分析
                              </button>
                                </div>
                              )}
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
                          {/* 专精市场布局 */}
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              router.push('/pcb-coil-market-layout');
                            }}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            专精市场布局
                          </button>
                          {/* PCB电机产品历程 */}
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              router.push('/pcb-coil-product-journey');
                            }}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            PCB电机产品历程
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
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        PCB埋嵌
                      </h3>
                    </div>

                    {/* 玻璃基板 */}
                    <div className="space-y-1.5">
                      <h3 
                        onClick={() => {
                          setMobileMenuOpen(false);
                        }}
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
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
