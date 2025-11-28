import { Button } from "@/components/ui/button";
import heroMotorTransparent from "@/assets/hero-motor-transparent.png";
export const Hero = () => {
  return <section className="relative py-[38px] flex items-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-10 py-0 my-0" />
      
      <div className="container px-4 md:px-6 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr,1fr] gap-8 md:gap-12 items-center">
          <div style={{
          animationDelay: "0.2s"
        }} className="space-y-6 animate-fade-in-up text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              明阳电路PCB电机<br />
              <span className="text-3xl md:text-4xl lg:text-5xl">革新动力的未来</span>
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed max-w-xl">
              采用创新PCB定子技术，更轻、更高效、更可靠。<br />
              适用于新能源汽车、工业自动化、航空航天等高端应用领域。<br />
              引领新一代电机技术革命。
            </p>
            <div className="flex flex-wrap gap-4 items-center pt-2">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-base md:text-lg"
                onClick={() => {
                  const element = document.getElementById('pcb-motor-intro');
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth"
                    });
                  }
                }}
              >
                了解更多产品
              </Button>
            </div>
          </div>
          
          <div className="relative flex items-center justify-center lg:justify-end mt-6" style={{
          animationDelay: "0.4s"
        }}>
            <img 
              src={heroMotorTransparent} 
              alt="PCB电机" 
              className="w-full max-w-md lg:max-w-lg animate-float-tech animate-fade-in-up" 
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>;
};