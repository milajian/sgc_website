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
import { Menu } from "lucide-react";
import { getImagePath } from "@/lib/image-path";
import { scrollToSection } from "@/lib/scroll";
const logo = getImagePath("/assets/logo.png");

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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
            <NavigationMenu aria-label="主导航菜单">
              <NavigationMenuList className="gap-0 lg:gap-0.5 xl:gap-1">
                {/* 产品介绍 */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <button
                      onClick={() => scrollToSection('pcb-motor-intro')}
                      className="text-foreground hover:text-primary hover:bg-transparent bg-transparent text-xs lg:text-sm font-medium transition-colors px-2 lg:px-3 xl:px-4"
                    >
                      产品介绍
                    </button>
                  </NavigationMenuLink>
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
              <a href="/SGCircuits.pdf" download="SGCircuits.pdf">
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
                <div className="flex flex-col space-y-4 mt-8 overflow-y-auto max-h-[calc(100vh-4rem)] pb-8">
                  <SheetTitle className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">导航菜单</SheetTitle>
                  
                  {/* 产品介绍 */}
                  <button
                    onClick={() => handleMobileNavClick('pcb-motor-intro')}
                    className="text-sm font-semibold text-foreground hover:text-primary transition-colors text-left"
                  >
                    产品介绍
                  </button>

                  {/* 市场布局和场景 */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">市场布局和场景</h3>
                    <button
                      onClick={() => handleMobileNavClick('product-lines')}
                      className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                    >
                      专精市场布局
                    </button>
                    <button
                      onClick={() => handleMobileNavClick('application-scenes')}
                      className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                    >
                      应用场景
                    </button>
                  </div>

                  {/* 电机优势与案例分析 */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">电机优势与案例分析</h3>
                    <button
                      onClick={() => handleMobileNavClick('pcb-motor-advantages')}
                      className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                    >
                      PCB电机优势
                    </button>
                    <button
                      onClick={() => handleMobileNavClick('case-study')}
                      className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                    >
                      PCB电机案例分析
                    </button>
                  </div>

                  {/* 产品历程 */}
                  <button
                    onClick={() => handleMobileNavClick('product-journey')}
                    className="block w-full text-left px-4 py-2 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                  >
                    产品历程
                  </button>

                  {/* 产品测试与设计 */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">产品测试与设计</h3>
                    <button
                      onClick={() => handleMobileNavClick('simulation-test')}
                      className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                    >
                      仿真测试
                    </button>
                    <button
                      onClick={() => handleMobileNavClick('protection-thermal')}
                      className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                    >
                      防护与散热设计
                    </button>
                  </div>

                  {/* 生产技术与设备 */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">生产技术与设备</h3>
                    <button
                      onClick={() => handleMobileNavClick('pcb-stator-production-tech')}
                      className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                    >
                      PCB定子生产技术
                    </button>
                    <button
                      onClick={() => handleMobileNavClick('production-technology')}
                      className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                    >
                      PCB定子生产设备
                    </button>
                  </div>

                  {/* 关于我们 */}
                  <button
                    onClick={() => handleMobileNavClick('company')}
                    className="block w-full text-left px-4 py-2 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                  >
                    关于我们
                  </button>

                  {/* Mobile Actions */}
                  <div className="pt-4 border-t space-y-3">
                    <div className="text-sm text-muted-foreground">股票代码: 300739</div>
                    <Button 
                      variant="default" 
                      className="w-full shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-accent hover:shadow-primary/30 transition-all duration-300" 
                      asChild
                    >
                      <a href="/SGCircuits.pdf" download="SGCircuits.pdf">
                        了解更多
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};
