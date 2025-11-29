'use client'
import { Button } from "@/components/ui/button";
import { getImagePath } from "@/lib/image-path";
const heroMotorHeader = getImagePath("/assets/hero-motor-header.png");
export const Hero = () => {
  return <section className="relative pt-16 pb-14 flex items-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-10 py-0 my-0" />
      
      <div className="container pl-6 pr-4 md:px-6 relative z-10 max-w-7xl mx-auto w-full">
        <div className="relative min-h-[500px] md:min-h-[400px] flex flex-col justify-center md:flex-row md:items-center md:justify-between">
          {/* 文字区域 */}
          <div 
            style={{ animationDelay: "0.2s" }} 
            className="relative z-10 space-y-6 animate-fade-in-up text-left max-w-full md:max-w-[50%] lg:max-w-[45%] xl:max-w-[47%]"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              PCB 线圈，智驱世界
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed">
              采用创新PCB定子技术，更轻、更高效、更可靠。适用于新能源汽车、工业自动化、航空航天等高端应用领域。引领新一代电机技术革命。
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
          
          {/* 图片区域 */}
          <div 
            className="mt-12 flex justify-center md:mt-0 md:flex-shrink-0 md:ml-4 lg:ml-0 lg:mr-[-2vw] xl:mr-[-3vw]"
            style={{ animationDelay: "0.4s" }}
          >
            <img 
              src={heroMotorHeader} 
              alt="PCB电机" 
              className="w-full max-w-[480px] md:max-w-[min(460px,50vw)] lg:max-w-[min(520px,50vw)] xl:max-w-[min(580px,48vw)] h-auto object-contain animate-float-tech animate-fade-in-up" 
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>;
};
