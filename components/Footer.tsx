'use client'
import { scrollToSection } from "@/lib/scroll";
import { getImagePath } from "@/lib/image-path";
const logo = getImagePath("/assets/logo.png");

export const Footer = () => {
  return <footer className="bg-secondary text-secondary-foreground py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img alt="SGCircuits" className="h-10 object-contain" src="/lovable-uploads/6322eec3-ea48-49ca-99b9-2a0b5c2a6e5f.png" loading="eager" />
              <span className="text-xl font-bold">SGCircuits</span>
            </div>
            <p className="text-secondary-foreground/80 max-w-md">
              明阳电路 - PCB Group for excellent customer solutions
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">产品</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><button onClick={() => scrollToSection('pcb-motor-intro')} className="hover:text-primary transition-colors text-left">PCB电机</button></li>
              <li><button onClick={() => scrollToSection('product-lines')} className="hover:text-primary transition-colors text-left">刚挠板</button></li>
              <li><button onClick={() => scrollToSection('product-lines')} className="hover:text-primary transition-colors text-left">IC载板</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">联系方式</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              
              <li>邮箱: info@sunshinepcb.com</li>
              <li>网站: www.sunshinepcb.com</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-secondary-foreground/60">
          <p>&copy; 2024 SGCircuits. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
