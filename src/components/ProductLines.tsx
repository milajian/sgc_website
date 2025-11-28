import { Card } from "@/components/ui/card";
import { Zap, Layers, Workflow, Radio, Cpu } from "lucide-react";
const productLines = [{
  icon: Zap,
  nameCn: "高速",
  nameEn: "High-Speed",
  capacity: "36,000㎡",
  specs: ["层数：12-40层", "板厚：3.2-8.0mm", "厚径比：40:1", "阻抗控制精度：±7%", "背钻残桩：≤0.2mm", "压合次数：5-7次"],
  applications: "通讯基站、服务器、超算计算机等"
}, {
  icon: Layers,
  nameCn: "厚铜",
  nameEn: "Thick-Copper",
  capacity: "25,000㎡",
  specs: ["铜厚：3-12OZ", "层数：2-26层", "压合次数：1-3次", "电阻控制精度：<3%", "耐高压：2772V dc 60s"],
  applications: "电源、通讯、动力系统、工控安防等"
}, {
  icon: Workflow,
  nameCn: "刚挠",
  nameEn: "Rigid-Flex",
  capacity: "10,000㎡",
  specs: ["总层数：30层+", "软板层数：1-10层", "成品板厚：0.4-3.5mm", "最小线宽：3.5/3.5mil", "压合次数：1~3次", "结构：HDI(3阶或以上)+软硬结合"],
  applications: "汽车、医疗、航天、工控等"
}, {
  icon: Radio,
  nameCn: "高频",
  nameEn: "High-Frequency",
  capacity: "5,000㎡",
  specs: ["线宽精度：±0.6mil", "材料：碳氢、PPE、PTFE", "压合次数：1-4次", "埋嵌工艺：埋容、埋阻、埋/嵌铜块", "盲槽工艺：盲槽开盖(槽底图形)、槽壁金属化"],
  applications: "基站天线、汽车ADAS、射频模块等"
}, {
  icon: Cpu,
  nameCn: "半导体测试",
  nameEn: "Semiconductor Test",
  capacity: "1,000㎡",
  specs: ["层数：70层", "板厚：6.5mm", "纵横比：≥40:1", "Pitch(Min)：0.35mm", "表面处理：水硬金、沉金、镍钯金等", "阻抗控制精度：±7%"],
  applications: "IC测试"
}];
export const ProductLines = () => {
  return <section id="product-lines" className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 relative inline-block">
              专精市场布局
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </h2>
            <p className="text-xl text-muted-foreground">
              五大产品线，覆盖高端PCB制造全领域
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {productLines.map((product, index) => {
            const Icon = product.icon;
            return <Card key={index} className="p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/40 backdrop-blur-md border-border/50 flex flex-col overflow-hidden relative group">
                  {/* Gradient background - top to bottom fade */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-accent/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  <div className="flex flex-col items-center text-center flex-1 relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    
                    {/* Title */}
                    <div className="flex flex-col justify-center mb-4">
                      <h3 className="font-bold text-foreground leading-tight text-xl">
                        {product.nameCn}
                      </h3>
                    </div>
                    
                    {/* Capacity */}
                    <div className="w-full py-2 px-2 bg-primary/5 rounded-lg mb-3">
                      <p className="text-xs text-muted-foreground">月产能</p>
                      <p className="text-base font-bold text-primary">
                        {product.capacity}
                      </p>
                    </div>
                    
                    {/* Specs */}
                    <div className="w-full space-y-1.5 text-left mb-3 min-h-[160px]">
                      {product.specs.map((spec, idx) => <p key={idx} className="text-xs text-foreground flex items-start leading-snug">
                          <span className="text-primary mr-1.5">•</span>
                          <span>{spec}</span>
                        </p>)}
                    </div>
                    
                    {/* Applications */}
                    <div className="w-full pt-2 border-t border-border/50 mt-auto">
                      <p className="text-xs text-muted-foreground mb-1">应用领域</p>
                      <p className="text-xs text-foreground leading-snug">
                        {product.applications}
                      </p>
                    </div>
                    </div>
                </Card>;
          })}
          </div>
        </div>
      </div>
    </section>;
};