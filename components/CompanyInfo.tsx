'use client'
import { Card } from "@/components/ui/card";
import { getImagePath } from "@/lib/image-path";
import { Rocket, Handshake, FileText, TrendingUp, FlaskConical } from "lucide-react";
const logo = getImagePath("/assets/logo.png");
const stats = [{
  icon: Rocket,
  value: "3",
  label: "国家重点研发项目",
  suffix: "个"
}, {
  icon: Handshake,
  value: "6",
  label: "校企联合",
  suffix: "个"
}, {
  icon: FileText,
  value: "200+",
  label: "专利",
  suffix: ""
}, {
  icon: TrendingUp,
  value: "2",
  label: "产值创造",
  suffix: "亿"
}, {
  icon: FlaskConical,
  value: "CNAS",
  label: "中央实验室",
  suffix: ""
}];
export const CompanyInfo = () => {
  return <section id="company" className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              明阳电路技术中心
            </h2>
            <p className="text-lg md:text-xl text-secondary-foreground/90 max-w-3xl mx-auto leading-relaxed px-4">
              PCB工艺基础研究、PCB应用产品研发及半导体领域技术运用
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mb-12 md:mb-16">
            {stats.map((stat, index) => <Card key={index} className="p-4 sm:p-6 md:p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all text-center flex flex-col items-center justify-center min-h-[160px] sm:min-h-[180px]">
                <div className="flex justify-center mb-4 sm:mb-5 md:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-accent/30 backdrop-blur-sm flex items-center justify-center border border-accent/40">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center w-full">
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-blue-50 leading-tight">
                    {stat.value}{stat.suffix}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-secondary-foreground/90 font-medium">
                    {stat.label}
                  </p>
                </div>
              </Card>)}
          </div>

          <div className="mt-12 md:mt-20 text-center">
            <h2 id="partners" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">产品研发方向</h2>
            <p className="text-lg md:text-xl text-secondary-foreground/90 max-w-3xl mx-auto leading-relaxed px-4 mb-8 md:mb-12">
              我们专注于多个前沿技术领域的研发，持续推动PCB及相关技术的创新与应用
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {[{
              name: 'ATE 探针卡',
              image: getImagePath('/assets/ate-probe-card.svg')
            }, {
              name: 'PCB线圈',
              image: getImagePath('/assets/pcb-coil.svg')
            }, {
              name: '增材制造',
              image: getImagePath('/assets/additive-manufacturing.svg')
            }, {
              name: '软硬结合板',
              image: getImagePath('/assets/rigid-flex-pcb.svg')
            }, {
              name: '玻璃基板',
              image: getImagePath('/assets/glass-substrate.svg')
            }, {
              name: 'SiC埋嵌',
              image: getImagePath('/assets/sic-embedded.svg')
            }, {
              name: '铜浆烧结',
              image: getImagePath('/assets/copper-paste-sintering.svg')
            }, {
              name: '机器人',
              image: getImagePath('/assets/robot.svg')
            }].map((product, index) => <Card key={index} className="p-4 sm:p-6 bg-white/95 backdrop-blur-sm border-white/20 hover:bg-white hover:scale-105 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 flex flex-col items-center justify-center group min-h-[120px] relative overflow-hidden">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent shimmer-effect" />
                  </div>

                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl blur-xl group-hover:scale-110 transition-transform duration-500 opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'radial-gradient(circle at center, transparent 0%, transparent 30%, hsl(var(--primary) / 0.12) 50%, hsl(var(--primary) / 0.28) 70%, hsl(var(--primary) / 0.45) 90%, hsl(var(--primary) / 0.65) 100%)'
                    }}
                  />
                  
                  <div className="h-20 sm:h-24 md:h-28 lg:h-32 flex items-center justify-center mb-2 sm:mb-3 w-full relative z-10">
                    <img src={product.image} alt={product.name} className="h-full w-full max-h-24 sm:max-h-28 md:max-h-32 lg:max-h-36 max-w-full object-contain transition-all" loading="lazy" onError={e => {
                  // Fallback to text if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `<span class="text-sm sm:text-lg font-bold text-gray-700">${product.name}</span>`;
                }} />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 text-center relative z-10">{product.name}</p>
                </Card>)}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .shimmer-effect {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </section>;
};
