'use client'
import { getImagePath } from "@/lib/image-path";

const logo = getImagePath("/assets/logo.png");

export const Footer = () => {
  return <footer className="bg-secondary text-secondary-foreground py-20 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              {/* Logo容器：添加浅色背景和滤镜增强可见性 */}
              <div className="bg-card/95 px-3 py-2 rounded-lg">
                <img 
                  alt="SGCircuits" 
                  className="h-10 object-contain brightness-110 contrast-110" 
                  src={logo} 
                  loading="eager" 
                />
              </div>
              <span className="text-sm lg:text-base text-muted-foreground font-medium whitespace-nowrap">股票代码: 300739</span>
            </div>
            <p className="text-secondary-foreground/80 max-w-md">
              明阳电路 - PCB Group for excellent customer solutions
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">联系方式</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>邮箱: info@sunshinepcb.com</li>
              <li>网站: <a href="https://sunshinepcb.com/" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4 hover:text-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary transition-colors">sunshinepcb.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-secondary-foreground/60">
          <p>&copy; 2024 明阳电路 (300739). All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
