'use client'
import { useState, useRef, useCallback, useEffect } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'product-intro': false,
    'market-scenes': false,
    'motor-advantages': false,
    'test-design': false,
    'production-tech': false,
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
            <img 
              alt="SGCircuits" 
              src={logo} 
              className="h-10 md:h-12 object-contain hover:scale-105 transition-transform duration-300" 
              loading="eager"
            />
          </div>
          
          {/* Navigation Menu - Desktop */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu aria-label="主导航菜单" id="main-navigation-menu">
              <NavigationMenuList className="gap-0 lg:gap-0.5 xl:gap-1">
                {/* 产品介绍 */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary hover:bg-transparent bg-transparent text-xs lg:text-sm font-medium transition-colors px-2 lg:px-3 xl:px-4">
                    产品介绍
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background/95 backdrop-blur-lg border border-primary/20 shadow-xl">
                    <ul className="w-[220px] p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => scrollToSection('incubation-achievements')}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            技术中心孵化成果
                          </button>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => scrollToSection('pcb-motor-intro')}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            PCB电机产品介绍
                          </button>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 市场布局和场景 */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary hover:bg-transparent bg-transparent text-xs lg:text-sm font-medium transition-colors px-2 lg:px-3 xl:px-4">
                    市场布局和场景
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background/95 backdrop-blur-lg border border-primary/20 shadow-xl">
                    <ul className="w-[220px] p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => scrollToSection('product-lines')}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            专精市场布局
                          </button>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => scrollToSection('application-scenes')}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            应用场景
                          </button>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 电机优势与案例分析 */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary hover:bg-transparent bg-transparent text-xs lg:text-sm font-medium transition-colors px-2 lg:px-3 xl:px-4">
                    电机优势与案例
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background/95 backdrop-blur-lg border border-primary/20 shadow-xl">
                    <ul className="w-[220px] p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => scrollToSection('pcb-motor-advantages')}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            PCB电机优势
                          </button>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => scrollToSection('case-study')}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            PCB电机案例分析
                          </button>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 产品历程 */}
                <NavigationMenuItem>
                  <button 
                    onClick={() => scrollToSection('product-journey')}
                    className="text-foreground hover:text-primary transition-colors text-xs lg:text-sm font-medium px-2 lg:px-3 xl:px-4 py-2"
                  >
                    产品历程
                  </button>
                </NavigationMenuItem>

                {/* 产品测试与设计 */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary hover:bg-transparent bg-transparent text-xs lg:text-sm font-medium transition-colors px-2 lg:px-3 xl:px-4">
                    测试与设计
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background/95 backdrop-blur-lg border border-primary/20 shadow-xl">
                    <ul className="w-[220px] p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => scrollToSection('simulation-test')}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            仿真测试
                          </button>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => scrollToSection('protection-thermal')}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            防护与散热设计
                          </button>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 生产技术与设备 */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary hover:bg-transparent bg-transparent text-xs lg:text-sm font-medium transition-colors px-2 lg:px-3 xl:px-4">
                    生产技术
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background/95 backdrop-blur-lg border border-primary/20 shadow-xl">
                    <ul className="w-[220px] p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => scrollToSection('pcb-stator-production-tech')}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            PCB定子生产技术
                          </button>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => scrollToSection('production-technology')}
                            className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            PCB定子生产设备
                          </button>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 关于我们 */}
                <NavigationMenuItem>
                  <button 
                    onClick={() => scrollToSection('company')}
                    className="text-foreground hover:text-primary transition-colors text-xs lg:text-sm font-medium px-2 lg:px-3 xl:px-4 py-2"
                  >
                    关于我们
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
                    
                    {/* 产品介绍 */}
                    <div className="space-y-1.5">
                      <button
                        onClick={() => toggleMenu('product-intro')}
                        className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        <span className="flex-1 text-left">产品介绍</span>
                        <ChevronDown className={`flex-shrink-0 ml-2 h-4 w-4 transition-transform duration-200 ${expandedMenus['product-intro'] ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedMenus['product-intro'] && (
                        <div className="space-y-1 pl-2">
                          <button
                            onClick={() => handleMobileNavClick('incubation-achievements')}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            技术中心孵化成果
                          </button>
                          <button
                            onClick={() => handleMobileNavClick('pcb-motor-intro')}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            PCB电机产品介绍
                          </button>
                        </div>
                      )}
                    </div>

                    {/* 市场布局和场景 */}
                    <div className="space-y-1.5">
                      <button
                        onClick={() => toggleMenu('market-scenes')}
                        className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        <span className="flex-1 text-left">市场布局和场景</span>
                        <ChevronDown className={`flex-shrink-0 ml-2 h-4 w-4 transition-transform duration-200 ${expandedMenus['market-scenes'] ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedMenus['market-scenes'] && (
                        <div className="space-y-1 pl-2">
                          <button
                            onClick={() => handleMobileNavClick('product-lines')}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            专精市场布局
                          </button>
                          <button
                            onClick={() => handleMobileNavClick('application-scenes')}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            应用场景
                          </button>
                        </div>
                      )}
                    </div>

                    {/* 电机优势与案例分析 */}
                    <div className="space-y-1.5">
                      <button
                        onClick={() => toggleMenu('motor-advantages')}
                        className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        <span className="flex-1 text-left">电机优势与案例分析</span>
                        <ChevronDown className={`flex-shrink-0 ml-2 h-4 w-4 transition-transform duration-200 ${expandedMenus['motor-advantages'] ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedMenus['motor-advantages'] && (
                        <div className="space-y-1 pl-2">
                          <button
                            onClick={() => handleMobileNavClick('pcb-motor-advantages')}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            PCB电机优势
                          </button>
                          <button
                            onClick={() => handleMobileNavClick('case-study')}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            PCB电机案例分析
                          </button>
                        </div>
                      )}
                    </div>

                    {/* 产品历程 */}
                    <div className="space-y-1.5">
                      <h3 
                        onClick={() => handleMobileNavClick('product-journey')}
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        产品历程
                      </h3>
                    </div>

                    {/* 产品测试与设计 */}
                    <div className="space-y-1.5">
                      <button
                        onClick={() => toggleMenu('test-design')}
                        className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        <span className="flex-1 text-left">产品测试与设计</span>
                        <ChevronDown className={`flex-shrink-0 ml-2 h-4 w-4 transition-transform duration-200 ${expandedMenus['test-design'] ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedMenus['test-design'] && (
                        <div className="space-y-1 pl-2">
                          <button
                            onClick={() => handleMobileNavClick('simulation-test')}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            仿真测试
                          </button>
                          <button
                            onClick={() => handleMobileNavClick('protection-thermal')}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            防护与散热设计
                          </button>
                        </div>
                      )}
                    </div>

                    {/* 生产技术与设备 */}
                    <div className="space-y-1.5">
                      <button
                        onClick={() => toggleMenu('production-tech')}
                        className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        <span className="flex-1 text-left">生产技术与设备</span>
                        <ChevronDown className={`flex-shrink-0 ml-2 h-4 w-4 transition-transform duration-200 ${expandedMenus['production-tech'] ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedMenus['production-tech'] && (
                        <div className="space-y-1 pl-2">
                          <button
                            onClick={() => handleMobileNavClick('pcb-stator-production-tech')}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            PCB定子生产技术
                          </button>
                          <button
                            onClick={() => handleMobileNavClick('production-technology')}
                            className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                          >
                            PCB定子生产设备
                          </button>
                        </div>
                      )}
                    </div>

                    {/* 关于我们 */}
                    <div className="space-y-1.5">
                      <h3 
                        onClick={() => handleMobileNavClick('company')}
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        关于我们
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
