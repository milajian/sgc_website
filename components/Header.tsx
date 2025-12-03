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
  });

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
                  <NavigationMenuContent className="bg-background/95 backdrop-blur-lg border border-primary/20 shadow-xl">
                    <ul className="w-[220px] p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => {}}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            历史发展
                          </button>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => {}}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            研发架构
                          </button>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => {}}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            产品创新
                          </button>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => {}}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            专家列表
                          </button>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* PCB 线圈 */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary hover:bg-transparent bg-transparent text-xs lg:text-sm font-medium transition-colors px-2 lg:px-3 xl:px-4">
                    PCB 线圈
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background/95 backdrop-blur-lg border border-primary/20 shadow-xl">
                    <ul className="w-[220px] p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/pcb-coil-axial"
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            轴向磁通电机定子
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/pcb-coil-linear-winding"
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            直线电机绕组
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/pcb-coil-planar-transformer"
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            平面变压器
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/pcb-coil-planar-winding"
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            平面电机绕组
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/pcb-coil-hollow-cup-stator"
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            空心杯电机定子
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
                    PCB 埋嵌
                  </Link>
                </NavigationMenuItem>

                {/* 玻璃基板 */}
                <NavigationMenuItem>
                  <button 
                    onClick={() => {}}
                    className="text-foreground hover:text-primary transition-colors text-xs lg:text-sm font-medium px-2 lg:px-3 xl:px-4 py-2"
                  >
                    玻璃基板
                  </button>
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
                href="/sgc_website/SGCircuits.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  // 使用window.open强制在新标签页打开
                  const newWindow = window.open('/sgc_website/SGCircuits.pdf', '_blank', 'noopener,noreferrer');
                  // 如果弹窗被阻止，fallback到默认行为
                  if (!newWindow) {
                    window.location.href = '/sgc_website/SGCircuits.pdf';
                  }
                }}
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
                              setMobileMenuOpen(false);
                            }}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            历史发展
                          </button>
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                            }}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            研发架构
                          </button>
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                            }}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            产品创新
                          </button>
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
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
                        <span className="flex-1 text-left">PCB 线圈</span>
                        <ChevronDown className={`flex-shrink-0 ml-2 h-4 w-4 transition-transform duration-200 ${expandedMenus['pcb-coil'] ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedMenus['pcb-coil'] && (
                        <div className="space-y-1 pl-2">
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              router.push('/pcb-coil-axial');
                            }}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
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
                        PCB 埋嵌
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
                          href="/sgc_website/SGCircuits.pdf" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.preventDefault();
                            // 使用window.open强制在新标签页打开
                            const newWindow = window.open('/sgc_website/SGCircuits.pdf', '_blank', 'noopener,noreferrer');
                            // 如果弹窗被阻止，fallback到默认行为
                            if (!newWindow) {
                              window.location.href = '/sgc_website/SGCircuits.pdf';
                            }
                          }}
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
