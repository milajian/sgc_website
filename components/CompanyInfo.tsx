'use client'
import { Card } from "@/components/ui/card";
import { getImagePath } from "@/lib/image-path";
import { Award, DollarSign, Users, Factory as FactoryIcon, Ship } from "lucide-react";
const logo = getImagePath("/assets/logo.png");
const stats = [{
  icon: FactoryIcon,
  value: "8",
  label: "国际基地",
  suffix: "个"
}, {
  icon: DollarSign,
  value: "15.59",
  label: "销售收入",
  suffix: "亿"
}, {
  icon: Users,
  value: "30+",
  label: "服务年限",
  suffix: "年"
}, {
  icon: Ship,
  value: "85",
  label: "国际市场",
  suffix: "%"
}, {
  icon: Award,
  value: "ISO",
  label: "质量认证",
  suffix: ""
}];
export const CompanyInfo = () => {
  return <section id="company" className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              明阳电路 SGCircuits
            </h2>
            <p className="text-lg md:text-xl text-secondary-foreground/90 max-w-3xl mx-auto leading-relaxed px-4">
              专注PCB制造30余年，为全球客户提供卓越的PCB解决方案。我们的PCB电机技术代表着电机行业的未来发展方向。
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

          <div id="partners" className="mt-12 md:mt-20">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4 text-center text-blue-50">全球合作伙伴</h3>
            <p className="text-center text-secondary-foreground/90 mb-8 md:mb-12 max-w-3xl mx-auto px-4 text-sm sm:text-base">
              我们与全球领先企业建立长期合作关系，共同推动PCB电机技术的创新与应用
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {[{
              name: 'EATON',
              logo: 'https://logo.clearbit.com/eaton.com'
            }, {
              name: 'Siemens',
              logo: 'https://logo.clearbit.com/siemens.com'
            }, {
              name: 'ABB',
              logo: 'https://logo.clearbit.com/abb.com'
            }, {
              name: 'Lenze',
              logo: 'https://logo.clearbit.com/lenze.com'
            }, {
              name: 'Qualcomm',
              logo: 'https://logo.clearbit.com/qualcomm.com'
            }, {
              name: 'John Deere',
              logo: 'https://logo.clearbit.com/deere.com'
            }, {
              name: 'Caterpillar',
              logo: 'https://logo.clearbit.com/cat.com'
            }, {
              name: 'Infinitum',
              logo: 'https://logo.clearbit.com/goinfinitum.com'
            }].map((partner, index) => <Card key={index} className="p-4 sm:p-6 bg-white/95 backdrop-blur-sm border-white/20 hover:bg-white hover:scale-105 transition-all flex flex-col items-center justify-center group min-h-[120px]">
                  <div className="h-12 sm:h-16 flex items-center justify-center mb-2 sm:mb-3 w-full">
                    <img src={partner.logo} alt={`${partner.name} Logo`} className="max-h-10 sm:max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all" loading="lazy" onError={e => {
                  // Fallback to text if logo fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `<span class="text-sm sm:text-lg font-bold text-gray-700">${partner.name}</span>`;
                }} />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 text-center">{partner.name}</p>
                </Card>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
