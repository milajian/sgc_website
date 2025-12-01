'use client'
import { Card } from "@/components/ui/card";
import { Cog, MoveHorizontal, Layers, LayoutGrid, Circle, Target } from "lucide-react";
import { motion } from "framer-motion";

const productLines = [{
  icon: Cog,
  nameCn: "轴向磁通电机定子",
  nameEn: "Axial Flux Motor Stator",
  businessModel: "定子设计 + 仿真 + 生产",
  specs: [
    "功率等级：覆盖约 0.5–50 kW 轴向磁通电机平台",
    "外径范围：约 100–450 mm，可按整车/系统空间定制",
    "极对数：支持 4–24 极等多种拓扑",
    "最高转速：可按需求设计至 3,000–12,000 rpm",
    "效率指标：峰值效率可达 96% 以上（视工况与材料）",
    "转矩密度：面向高转矩密度盘式电机优化设计",
    "冷却方案：支持自然风冷 / 强制风冷 / 液冷一体化设计",
    "反馈接口：兼容编码器、霍尔、无感 FOC 等多种控制方案"
  ],
  applications: "新能源汽车驱动电机、轮毂电机、风电变桨系统、机器人与 AGV、工业伺服等"
}, {
  icon: MoveHorizontal,
  nameCn: "直线电机绕组",
  nameEn: "Linear Motor Winding",
  businessModel: "绕组设计 + 仿真 + 生产",
  specs: [
    "推力范围：从几十牛到数千牛的直线电机平台",
    "行程形式：支持短行程精密定位与长行程直线驱动",
    "极距 / 极数：多种极距与多段组合绕组可选",
    "线速度：可按需求设计至 5–10 m/s 级应用",
    "加速度：支持 >10 m/s² 的高动态响应场景",
    "力波动：通过电磁仿真与绕组优化降低推力波动",
    "冷却方式：自然冷却 / 水冷 / 冷板一体化设计",
    "反馈方案：兼容光栅尺、磁栅、直线编码器等测量系统"
  ],
  applications: "半导体设备、精密机床、直线伺服平台、电子制造产线、工业自动化生产线等"
}, {
  icon: Layers,
  nameCn: "平面变压器",
  nameEn: "Planar Transformer",
  businessModel: "变压器设计 + 仿真 + 生产",
  specs: [
    "功率范围：从几十瓦到数千瓦平面变压器平台",
    "工作频率：适配约 50 kHz–1 MHz 高频拓扑",
    "拓扑兼容：LLC、PSFB、移相全桥等主流拓扑结构",
    "效率指标：峰值效率可达 98% 左右（视应用与设计）",
    "电压等级：支持宽输入 / 多输出电压组合",
    "绝缘与安全：按车规 / 工业安规设计爬电距离与电气间隙",
    "电磁性能：漏感、耦合系数等参数按应用场景精确优化",
    "热设计：支持与散热器、冷板、壳体的一体化热管理方案"
  ],
  applications: "车载 OBC / DC-DC、电信电源、服务器电源、光伏与储能逆变器、工业电源模块等"
}, {
  icon: LayoutGrid,
  nameCn: "平面电机绕组",
  nameEn: "Planar Motor Winding",
  businessModel: "绕组生产",
  specs: [
    "电机类型：适配平面直驱电机、X-Y 平面电机等结构",
    "推力 / 转矩：覆盖从小型平台到高推力直驱应用的绕组需求",
    "相数 / 极数：支持多相、多极高推力密度方案",
    "节距精度：平面绕组节距误差可控制在约 ±0.05 mm 级（设计能力）",
    "动态性能：面向高加速度、高响应定位工况优化绕组布局",
    "热管理：支持与金属基座、冷板、散热模块一体化贴合",
    "驱动兼容：兼容常见伺服驱动及专用运动控制器",
    "封装方式：可提供裸绕组、灌封模组、结构件一体化等形式"
  ],
  applications: "平面电机平台、半导体搬运与曝光设备、精密运动控制系统、高精度检测与测量平台等"
}, {
  icon: Circle,
  nameCn: "空心杯电机定子",
  nameEn: "Coreless Motor Stator",
  businessModel: "定子生产",
  specs: [
    "适配尺寸：典型外径约 10–60 mm 微型 / 小型电机",
    "电机结构：空心杯 / 无铁芯绕组拓扑，极低转子惯量",
    "最高转速：可覆盖数万 rpm 的高速应用需求",
    "动态响应：启停响应快，适合频繁启停与小步距控制",
    "转矩特性：齿槽转矩极小，低转速运行更平滑",
    "噪声与振动：通过电磁与结构优化降低噪声与振动",
    "驱动方式：适配无刷直流、伺服等多种驱动方案",
    "集成能力：支持与减速器、编码器、小型泵等机构一体化设计"
  ],
  applications: "医疗设备、精密泵浦、无人机云台、光学调节机构、智能锁与微型执行器等"
}];
export const ProductLines = () => {
  return <section id="product-lines" className="py-20 bg-background section-fade-bottom">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                专精市场布局
              </h2>
            </motion.div>
            <motion.p 
              className="text-xl text-muted-foreground max-w-4xl mx-auto mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              五大产品线，覆盖PCB电机与平面变压器全领域
            </motion.p>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {productLines.map((product, index) => {
            const Icon = product.icon;
            return <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-4 h-full hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-muted/30 border-primary/20 hover:border-accent/40 flex flex-col overflow-hidden relative group">
                  {/* Gradient background - top to bottom fade */}
                  <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-primary/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex flex-col items-center text-center flex-1 relative z-10">
                    {/* Icon - 渐变背景 + 阴影光晕 */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Title - 固定最小高度确保对齐 */}
                    <div className="flex flex-col justify-center mb-4 min-h-[3.5rem]">
                      <h3 className="font-bold text-foreground leading-tight text-xl">
                        {product.nameCn}
                      </h3>
                    </div>
                    
                    {/* Business Model - 增强视觉效果 */}
                    <div className="w-full py-2 px-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg mb-3 min-h-[4rem] flex flex-col justify-center border border-primary/10">
                      <p className="text-xs text-muted-foreground">业务模式</p>
                      <p className="text-sm font-bold text-accent">
                        {product.businessModel}
                      </p>
                    </div>
                    
                    {/* Specs - flex-1 让此区域自动填充空间 */}
                    <div className="w-full space-y-1.5 text-left mb-3 flex-1">
                      {product.specs.map((spec, idx) => <p key={idx} className="text-xs text-foreground flex items-start leading-snug">
                          <span className="text-accent mr-1.5">•</span>
                          <span>{spec}</span>
                        </p>)}
                    </div>
                    
                    {/* Applications - 固定在底部，青色高亮 */}
                    <div className="w-full pt-2 border-t border-accent/20">
                      <p className="text-xs text-accent font-medium mb-1">应用领域</p>
                      <p className="text-xs text-muted-foreground leading-snug">
                        {product.applications}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>;
          })}
          </div>
        </div>
      </div>
    </section>;
};
