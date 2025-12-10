'use client'
import { getImagePath } from "@/lib/image-path";
const heroMotorHeader = getImagePath("/assets/hero-motor-header.png");
export const Hero = () => {
  return <section className="relative pt-20 pb-20 bg-gradient-hero overflow-x-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="relative min-h-[500px] md:min-h-[500px] lg:min-h-[600px] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 lg:gap-8">
          {/* 文字区域 */}
          <div 
            style={{ animationDelay: "0.2s" }} 
            className="relative z-10 space-y-6 animate-fade-in-up text-left w-full md:w-[48%] lg:w-[45%] flex-shrink-0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              PCB 线圈，智驱世界
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed">
              采用创新PCB定子技术，更轻、更高效、更可靠。适用于新能源汽车、工业自动化、航空航天等高端应用领域。引领新一代电机技术革命。
            </p>
          </div>
          
          {/* 图片区域 */}
          <div 
            className="relative flex items-center justify-center w-full md:w-[48%] lg:w-[50%] flex-shrink-0"
            style={{ animationDelay: "0.4s" }}
          >
            <img 
              src={heroMotorHeader} 
              alt="PCB电机" 
              className="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] xl:max-w-[600px] h-auto object-contain animate-float-tech animate-fade-in-up" 
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>;
};
