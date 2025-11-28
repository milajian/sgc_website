# SGC Stator Website 技术文档

## 项目概述

| 项目信息 | 详情 |
|---------|------|
| **项目名称** | 明阳电路 PCB电机 / SGCircuits PCB Motor Technology |
| **项目类型** | 企业官网 / 产品展示网站 |
| **构建平台** | Lovable.dev |
| **项目版本** | v0.0.0 |
| **项目 URL** | https://lovable.dev/projects/dd940d0b-0005-4845-8461-cd0b16f6deaf |

---

## 技术栈总览

### 核心框架

| 技术 | 版本 | 说明 |
|------|------|------|
| **React** | ^18.3.1 | 前端 UI 框架 |
| **TypeScript** | ^5.8.3 | 类型安全的 JavaScript 超集 |
| **Vite** | ^5.4.19 | 下一代前端构建工具 |

### UI 与样式

| 技术 | 版本 | 说明 |
|------|------|------|
| **Tailwind CSS** | ^3.4.17 | 原子化 CSS 框架 |
| **shadcn/ui** | - | 基于 Radix UI 的组件库 |
| **tailwindcss-animate** | ^1.0.7 | Tailwind CSS 动画插件 |
| **@tailwindcss/typography** | ^0.5.16 | Tailwind 排版插件 |

### Radix UI 组件 (shadcn/ui 底层)

| 组件 | 版本 |
|------|------|
| @radix-ui/react-accordion | ^1.2.11 |
| @radix-ui/react-alert-dialog | ^1.1.14 |
| @radix-ui/react-aspect-ratio | ^1.1.7 |
| @radix-ui/react-avatar | ^1.1.10 |
| @radix-ui/react-checkbox | ^1.3.2 |
| @radix-ui/react-collapsible | ^1.1.11 |
| @radix-ui/react-context-menu | ^2.2.15 |
| @radix-ui/react-dialog | ^1.1.14 |
| @radix-ui/react-dropdown-menu | ^2.1.15 |
| @radix-ui/react-hover-card | ^1.1.14 |
| @radix-ui/react-label | ^2.1.7 |
| @radix-ui/react-menubar | ^1.1.15 |
| @radix-ui/react-navigation-menu | ^1.2.13 |
| @radix-ui/react-popover | ^1.1.14 |
| @radix-ui/react-progress | ^1.1.7 |
| @radix-ui/react-radio-group | ^1.3.7 |
| @radix-ui/react-scroll-area | ^1.2.9 |
| @radix-ui/react-select | ^2.2.5 |
| @radix-ui/react-separator | ^1.1.7 |
| @radix-ui/react-slider | ^1.3.5 |
| @radix-ui/react-slot | ^1.2.3 |
| @radix-ui/react-switch | ^1.2.5 |
| @radix-ui/react-tabs | ^1.1.12 |
| @radix-ui/react-toast | ^1.2.14 |
| @radix-ui/react-toggle | ^1.1.9 |
| @radix-ui/react-toggle-group | ^1.1.10 |
| @radix-ui/react-tooltip | ^1.2.7 |

### 路由与状态管理

| 技术 | 版本 | 说明 |
|------|------|------|
| **React Router DOM** | ^6.30.1 | 客户端路由 |
| **TanStack React Query** | ^5.83.0 | 服务端状态管理 & 数据获取 |

### 动画与交互

| 技术 | 版本 | 说明 |
|------|------|------|
| **Framer Motion** | ^12.23.24 | React 动画库 |
| **embla-carousel-react** | ^8.6.0 | 轮播图组件 |

### 表单与验证

| 技术 | 版本 | 说明 |
|------|------|------|
| **React Hook Form** | ^7.61.1 | 高性能表单库 |
| **@hookform/resolvers** | ^3.10.0 | 表单验证解析器 |
| **Zod** | ^3.25.76 | TypeScript 优先的 Schema 验证 |

### 工具库

| 技术 | 版本 | 说明 |
|------|------|------|
| **date-fns** | ^3.6.0 | 日期处理库 |
| **lucide-react** | ^0.462.0 | 图标库 |
| **clsx** | ^2.1.1 | className 工具 |
| **tailwind-merge** | ^2.6.0 | Tailwind class 合并 |
| **class-variance-authority** | ^0.7.1 | 组件变体管理 |
| **cmdk** | ^1.1.1 | 命令面板组件 |
| **recharts** | ^2.15.4 | 图表库 |
| **sonner** | ^1.7.4 | Toast 通知组件 |
| **vaul** | ^0.9.9 | Drawer 抽屉组件 |
| **react-day-picker** | ^8.10.1 | 日期选择器 |
| **react-resizable-panels** | ^2.1.9 | 可调整大小的面板 |
| **input-otp** | ^1.4.2 | OTP 输入组件 |
| **next-themes** | ^0.3.0 | 主题切换支持 |

---

## 开发依赖

| 技术 | 版本 | 说明 |
|------|------|------|
| **@vitejs/plugin-react-swc** | ^3.11.0 | Vite React SWC 插件 |
| **ESLint** | ^9.32.0 | 代码检查工具 |
| **typescript-eslint** | ^8.38.0 | TypeScript ESLint 规则 |
| **eslint-plugin-react-hooks** | ^5.2.0 | React Hooks 规则 |
| **eslint-plugin-react-refresh** | ^0.4.20 | React Refresh 规则 |
| **PostCSS** | ^8.5.6 | CSS 处理工具 |
| **Autoprefixer** | ^10.4.21 | CSS 前缀自动添加 |
| **@types/node** | ^22.16.5 | Node.js 类型定义 |
| **@types/react** | ^18.3.23 | React 类型定义 |
| **@types/react-dom** | ^18.3.7 | React DOM 类型定义 |
| **lovable-tagger** | ^1.1.11 | Lovable 开发工具 |
| **globals** | ^15.15.0 | 全局变量定义 |

---

## 项目结构

```
sunshine-core-showcase-main/
├── public/                          # 静态资源
│   ├── favicon.ico                  # 网站图标
│   ├── lovable-uploads/             # Lovable 上传的图片
│   ├── pcb-motor-product-intro.pdf  # PDF 文档
│   ├── robots.txt                   # 搜索引擎配置
│   └── SGCircuits.pdf               # 公司 PDF
│
├── src/
│   ├── assets/                      # 项目资源文件 (60+ 图片)
│   ├── components/                  # React 组件
│   │   ├── ui/                      # shadcn/ui 组件 (48 个)
│   │   ├── Header.tsx               # 导航头部
│   │   ├── Hero.tsx                 # 首页英雄区
│   │   ├── Features.tsx             # 功能特性
│   │   ├── Applications.tsx         # 应用场景
│   │   ├── CaseStudySlider.tsx      # 案例轮播
│   │   └── ...                      # 其他业务组件 (19 个)
│   │
│   ├── hooks/                       # 自定义 Hooks
│   │   ├── use-mobile.tsx           # 移动端检测
│   │   └── use-toast.ts             # Toast Hook
│   │
│   ├── lib/
│   │   └── utils.ts                 # 工具函数
│   │
│   ├── pages/                       # 页面组件
│   │   ├── Index.tsx                # 首页
│   │   └── NotFound.tsx             # 404 页面
│   │
│   ├── App.tsx                      # 应用入口
│   ├── App.css                      # 应用样式
│   ├── main.tsx                     # 渲染入口
│   ├── index.css                    # 全局样式 & CSS 变量
│   └── vite-env.d.ts               # Vite 类型声明
│
├── components.json                  # shadcn/ui 配置
├── tailwind.config.ts              # Tailwind 配置
├── tsconfig.json                   # TypeScript 配置
├── vite.config.ts                  # Vite 配置
├── postcss.config.js               # PostCSS 配置
├── eslint.config.js                # ESLint 配置
├── package.json                    # 项目依赖
├── bun.lockb                       # Bun 锁文件
└── package-lock.json               # npm 锁文件
```

---

## 配置详情

### Vite 配置

- **开发服务器端口**: 8080
- **路径别名**: `@` → `./src`
- **React 编译器**: SWC (性能优于 Babel)
- **开发插件**: lovable-tagger (仅开发环境)

### Tailwind CSS 配置

- **暗色模式**: class 策略
- **CSS 变量**: 启用 (HSL 颜色系统)
- **基础色**: slate
- **最大容器宽度**: 1400px
- **自定义动画**: accordion-down/up, float, fade-in-up
- **自定义渐变**: gradient-hero, gradient-accent

### TypeScript 配置

- **模块解析**: Bundler
- **目标版本**: ES2020
- **严格模式**: 部分启用
- **路径映射**: `@/*` → `./src/*`

---

## 脚本命令

```bash
# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 开发模式构建
npm run build:dev

# 代码检查
npm run lint

# 预览生产构建
npm run preview
```

---

## 页面路由

| 路径 | 组件 | 描述 |
|------|------|------|
| `/` | Index | 首页 |
| `*` | NotFound | 404 页面 |

---

## 业务组件清单

| 组件名 | 描述 |
|--------|------|
| Header | 网站头部导航 |
| NavLink | 导航链接 |
| Hero | 首页英雄区 |
| Features | 产品特性 |
| Applications | 应用场景 |
| ApplicationScenes | 应用场景详情 |
| CaseStudySlider | 案例研究轮播 |
| CompanyInfo | 公司信息 |
| IncubationAchievements | 孵化成果 |
| PCBMotorAdvantages | PCB 电机优势 |
| PCBMotorSlider | PCB 电机轮播 |
| PCBStatorProductionTech | PCB 定子生产技术 |
| ProductionTechnologySlider | 生产技术轮播 |
| ProductJourney | 产品历程 |
| ProductLines | 产品线 |
| ProtectionThermalSlider | 防护散热轮播 |
| SimulationTestSlider | 仿真测试轮播 |
| Specifications | 技术规格 |
| Footer | 网站底部 |

---

## 部署信息

- **部署方式**: Lovable 平台一键部署
- **自定义域名**: 支持 (通过 Project > Settings > Domains)

---

## 文档版本

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0 | 2025-11-28 | 初始版本 |

