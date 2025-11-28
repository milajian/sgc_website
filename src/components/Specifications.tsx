import { Card } from "@/components/ui/card";

const specs = [
  { label: "外径范围", value: "87.5mm - 200mm" },
  { label: "长度", value: "87.5mm - 200mm" },
  { label: "重量", value: "11kg - 20kg" },
  { label: "防护等级", value: "IP68" },
  { label: "效率提升", value: "10-15%" },
  { label: "体积减少", value: "35-60%" },
  { label: "重量减轻", value: "30-60%" },
  { label: "铜材节省", value: "66%" },
];

export const Specifications = () => {
  return (
    <section className="py-[38px] bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            技术规格
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            专业级性能参数
          </p>
        </div>

        <Card className="max-w-5xl mx-auto p-8 md:p-12 border-2 border-primary/10 bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specs.map((spec, index) => (
              <div 
                key={index}
                className="space-y-2 p-4 rounded-lg hover:bg-gradient-accent transition-all duration-300"
              >
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  {spec.label}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-border">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-primary mb-2">93%+</p>
                <p className="text-muted-foreground">系统效率</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary mb-2">10x</p>
                <p className="text-muted-foreground">可靠性提升</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary mb-2">IE4/IE5</p>
                <p className="text-muted-foreground">能效标准</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
