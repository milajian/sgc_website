<!-- c49f6c1f-bef6-4ace-a3a3-24120be216bc b4c5ca0c-a6fc-4272-8f41-b79672f9f143 -->
# 迁移到 Next.js 架构（优化版）

## 项目现状分析

- **当前架构**: Vite + React + react-router-dom
- **路由**: 仅 1 个页面（Index），Header 使用锚点滚动
- **组件**: 15+ 业务组件 + shadcn/ui 组件库（49个UI组件）
- **样式**: Tailwind CSS + 自定义 CSS（index.css + App.css）
- **部署**: GitHub Pages（输出到 dist/）
- **特殊依赖**: next-themes（需要 ThemeProvider）
- **工具库**: hooks/、lib/ 目录

## 迁移步骤

### 1. 安装 Next.js 依赖

**安装新依赖**：
```bash
npm install next@latest react@^18 react-dom@^18
```

**移除旧依赖**：
```bash
npm uninstall vite @vitejs/plugin-react-swc react-router-dom
```

**保留的依赖**：
- 所有 shadcn/ui 相关依赖（@radix-ui/*）
- framer-motion
- tailwindcss 及相关配置
- @tanstack/react-query
- next-themes（已安装，需要配置）
- 其他业务依赖

### 2. 创建 Next.js 项目结构

创建以下目录和文件：

- `app/layout.tsx` - 根布局（包含 Header、Footer、Providers）
- `app/page.tsx` - 首页（迁移 Index 组件内容）
- `app/not-found.tsx` - 404 页面（迁移 NotFound 组件）
- `app/globals.css` - 全局样式（迁移 index.css）
- `next.config.js` - Next.js 配置（设置 basePath 和静态导出）
- `next-env.d.ts` - Next.js 类型定义（自动生成）

**目录结构规划**：
```
app/
  layout.tsx
  page.tsx
  not-found.tsx
  globals.css
components/
  [所有业务组件]
  ui/
    [所有shadcn/ui组件]
hooks/
  [所有自定义hooks]
lib/
  [所有工具函数]
public/
  [静态资源]
src/assets/
  [图片资源，保持不变或迁移到public/]
```

### 3. 迁移组件

**组件迁移规则**：
- 业务组件：`src/components/*.tsx` → `components/*.tsx`（保持目录结构）
- UI 组件：`src/components/ui/*.tsx` → `components/ui/*.tsx`
- **所有组件文件顶部添加 `'use client'` 指令**（因为使用了动画、交互、hooks）

**特殊组件处理**：
- `src/components/NavLink.tsx`: **删除**（Next.js 使用内置 `Link` 组件，当前项目未使用）
- 所有使用 `framer-motion` 的组件：添加 `'use client'`
- 所有使用 `useState`、`useEffect` 等 hooks 的组件：添加 `'use client'`

### 4. 迁移 Providers 和全局配置

**迁移到 `app/layout.tsx`**：
- `QueryClientProvider`（@tanstack/react-query）
- `TooltipProvider`（shadcn/ui）
- `Toaster` 和 `Sonner`（toast 通知）
- `ThemeProvider`（next-themes，**新增**，因为项目中使用了 `useTheme`）

**移除**：
- `BrowserRouter`（Next.js 内置路由）
- `Routes`、`Route`（Next.js App Router）
- `react-router-dom` 相关代码

**示例结构**：
```tsx
// app/layout.tsx
'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
// ... 其他 providers
```

### 5. 迁移页面和布局

**`app/page.tsx`**：
- 迁移 `src/pages/Index.tsx` 的内容
- 移除路由相关导入
- 添加 `'use client'`（因为使用了交互组件）

**`app/not-found.tsx`**：
- 迁移 `src/pages/NotFound.tsx` 的内容
- 移除 `useLocation` hook（Next.js 不需要）
- 可以保留错误日志功能（使用 Next.js 的方式）

**`app/layout.tsx`**：
- 包含所有 Providers
- 包含 `<Header />` 和 `<Footer />`
- 设置 HTML 结构和 meta 标签（使用 Next.js Metadata API）

### 6. 迁移样式文件

**`app/globals.css`**：
- 迁移 `src/index.css` 的全部内容
- 保持所有 CSS 变量和 Tailwind 配置

**处理 `src/App.css`**：
- 检查是否有全局样式需要迁移到 `globals.css`
- 如果有组件特定样式，迁移到对应组件或删除

### 7. 迁移工具库和 Hooks

**`hooks/` 目录**：
- `src/hooks/*` → `hooks/*`（保持目录结构）
- 所有 hooks 文件保持不变（Next.js 支持）

**`lib/` 目录**：
- `src/lib/*` → `lib/*`（保持目录结构）
- `scroll.ts` 保持不变（客户端工具函数）
- `utils.ts` 保持不变

### 8. 迁移静态资源

**图片资源处理**：
- 选项1（推荐）：`src/assets/*` → `public/assets/*`（Next.js 推荐）
- 选项2：保持 `src/assets/*`，使用 Next.js 的 `import` 方式引用

**更新图片引用**：
- 如果迁移到 `public/`，更新所有组件中的图片路径
- 从 `@/assets/xxx.png` 改为 `/assets/xxx.png` 或使用 Next.js Image 组件

**`public/` 目录**：
- 保持不变，Next.js 会自动处理

### 9. 更新配置文件

**`next.config.js`（新建）**：
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静态导出，兼容 GitHub Pages
  basePath: '/sgc_website', // GitHub Pages 路径
  images: {
    unoptimized: true, // 静态导出需要禁用图片优化
  },
  // 保留路径别名配置
}

module.exports = nextConfig
```

**`tailwind.config.ts`**：
- 更新 `content` 路径：
  ```ts
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ]
  ```
- 移除 `./src/**/*.{ts,tsx}` 和 `./pages/**/*.{ts,tsx}`

**`tsconfig.json`**：
- 更新为 Next.js 推荐配置：
  ```json
  {
    "compilerOptions": {
      "target": "ES2017",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": false, // 保持当前设置
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "plugins": [
        {
          "name": "next"
        }
      ],
      "paths": {
        "@/*": ["./*"] // 更新路径别名指向根目录
      }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
  }
  ```

**`package.json`**：
- 更新 scripts：
  ```json
  {
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    }
  }
  ```

**`components.json`（shadcn/ui 配置）**：
- 更新 `rsc: false`（因为所有组件都是客户端组件）
- 更新 `tailwind.css` 路径为 `app/globals.css`
- 更新 `aliases` 中的路径（如果路径别名改变）

**移除文件**：
- `vite.config.ts`
- `src/vite-env.d.ts`
- `tsconfig.app.json`（合并到主 tsconfig.json）
- `tsconfig.node.json`（如果不再需要）

### 10. 更新 HTML 元数据

**迁移 `index.html` 中的 meta 标签到 `app/layout.tsx`**：

使用 Next.js Metadata API：
```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '明阳电路 PCB电机 | SGCircuits PCB Motor Technology',
  description: '明阳电路PCB电机采用创新PCB定子技术，更轻、更高效、更可靠。效率提升10-15%，重量减轻30-60%，引领新一代电机技术革命。',
  // ... 其他 meta 标签
}
```

**注意**：如果 layout.tsx 是客户端组件（'use client'），需要使用 `<head>` 标签或单独的 metadata.ts 文件。

### 11. 更新部署配置

**`.github/workflows/deploy.yml`**：
- 构建命令保持不变：`npm run build`
- **更新输出目录**：`path: './out'`（Next.js 静态导出默认输出到 `out/`）
- 其他配置保持不变

**关键更改**：
```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: './out'  # 从 './dist' 改为 './out'
```

### 12. 处理环境变量

**检查是否有 `.env` 文件**：
- 如果有，创建 `.env.local`（Next.js 使用）
- 更新环境变量引用方式（如果需要）
- 注意：静态导出不支持服务端环境变量

### 13. 更新导入路径

**批量更新路径别名引用**：
- 如果路径别名从 `@/*` 指向 `src/*` 改为指向根目录 `./*`
- 需要更新所有导入语句：
  - `@/components/*` → `@/components/*`（保持不变，因为组件迁移到根目录）
  - `@/lib/*` → `@/lib/*`（保持不变）
  - `@/hooks/*` → `@/hooks/*`（保持不变）
  - `@/assets/*` → `/assets/*` 或使用 Next.js Image（如果迁移到 public）

### 14. 测试和验证

**开发环境测试**：
1. 运行 `npm run dev`
2. 访问 `http://localhost:3000/sgc_website`（注意 basePath）
3. 验证所有组件正常渲染
4. 验证锚点滚动功能
5. 验证动画效果（framer-motion）
6. 验证交互功能（toast、tooltip 等）

**构建测试**：
1. 运行 `npm run build`
2. 检查 `out/` 目录是否生成
3. 运行 `npm run start` 测试生产构建（可选）
4. 验证静态文件是否正确生成

**功能验证清单**：
- [ ] Header 导航和锚点滚动
- [ ] 所有业务组件正常显示
- [ ] 图片资源正确加载
- [ ] 动画效果正常
- [ ] Toast 通知功能
- [ ] 响应式布局
- [ ] 404 页面
- [ ] SEO meta 标签

**部署验证**：
1. 推送到 GitHub 触发部署
2. 验证 GitHub Pages 站点正常访问
3. 验证所有资源路径正确（注意 basePath）

## 关键注意事项

1. **所有组件都是客户端组件**：因为使用了 framer-motion、useState、useEffect、next-themes 等
2. **ThemeProvider 配置**：需要在 layout.tsx 中添加 ThemeProvider（next-themes）
3. **锚点滚动保持不变**：Header 中的 `scrollToSection` 功能继续使用
4. **路径别名**：更新为 `@/*` 指向根目录 `./*`，而不是 `src/*`
5. **静态导出**：使用 `output: 'export'` 生成静态文件，兼容 GitHub Pages
6. **basePath**：设置为 `/sgc_website` 以匹配 GitHub Pages 路径
7. **图片优化**：静态导出需要设置 `images.unoptimized: true`
8. **开发服务器路径**：开发时访问 `http://localhost:3000/sgc_website`（不是根路径）

## 迁移顺序建议

1. ✅ 安装 Next.js 依赖，移除 Vite 相关依赖
2. ✅ 创建 Next.js 目录结构（app/、components/、hooks/、lib/）
3. ✅ 迁移全局样式和配置文件
4. ✅ 迁移 Providers 到 layout.tsx
5. ✅ 迁移页面组件（page.tsx、not-found.tsx）
6. ✅ 迁移所有业务组件（添加 'use client'）
7. ✅ 迁移 UI 组件（添加 'use client'）
8. ✅ 迁移 hooks 和 lib
9. ✅ 处理静态资源（图片）
10. ✅ 更新所有配置文件
11. ✅ 更新部署配置
12. ✅ 测试和验证

## 回滚计划

如果迁移过程中遇到问题，可以：
1. 保留 `vite.config.ts` 的备份
2. 使用 Git 分支进行迁移
3. 如果失败，切换回原分支即可

## 预期结果

- ✅ 项目结构转换为 Next.js App Router
- ✅ 所有功能和内容保持不变
- ✅ 支持静态导出和 GitHub Pages 部署
- ✅ 为未来多页面扩展做好准备
- ✅ 更好的 SEO 支持（Metadata API）
- ✅ 保持所有现有功能和交互

## To-dos

- [ ] 安装 Next.js 依赖，移除 Vite 相关依赖
- [ ] 创建 Next.js App Router 目录结构（app/layout.tsx, app/page.tsx, app/not-found.tsx, app/globals.css）
- [ ] 迁移所有组件到 components/ 目录，添加 'use client' 指令
- [ ] 迁移 Providers（QueryClientProvider、TooltipProvider、ThemeProvider 等）到 app/layout.tsx
- [ ] 迁移 hooks/ 和 lib/ 目录
- [ ] 处理静态资源（src/assets → public/assets 或保持原样）
- [ ] 更新配置文件（next.config.js, tailwind.config.ts, tsconfig.json, package.json, components.json）
- [ ] 更新 GitHub Actions 部署配置（输出目录改为 out）
- [ ] 迁移 HTML meta 标签到 Next.js Metadata API
- [ ] 更新所有导入路径（如果需要）
- [ ] 删除旧文件（vite.config.ts, vite-env.d.ts 等）
- [ ] 测试开发环境和构建流程
- [ ] 验证 GitHub Pages 部署

## 优化改进点（相比原计划）

1. ✅ **添加了 ThemeProvider 配置**（next-themes）
2. ✅ **明确了 hooks/ 和 lib/ 目录的迁移**
3. ✅ **详细说明了静态资源的两种处理方案**
4. ✅ **添加了 App.css 的处理说明**
5. ✅ **更详细的 tsconfig.json 配置**
6. ✅ **添加了 components.json 的更新说明**
7. ✅ **明确了路径别名的更新方式**
8. ✅ **添加了环境变量处理**
9. ✅ **更详细的测试验证清单**
10. ✅ **添加了迁移顺序建议**
11. ✅ **添加了回滚计划**
12. ✅ **明确了开发服务器的访问路径**

