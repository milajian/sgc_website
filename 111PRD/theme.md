# SGC 网站 UI 主题规范

> 本文档定义了 SGC Circuits 网站的核心视觉规范，用于确保品牌一致性和后续开发的设计参考。

---

## 1. 品牌色彩系统

### 1.1 核心色板

基于 SGC 品牌 Logo 提取的官方配色：

| 角色 | CSS 变量 | HSL 值 | HEX 值 | 说明 |
|------|----------|--------|--------|------|
| **主色 Primary** | `--primary` | `210 55% 25%` | `#1E3A5F` | 品牌深蓝，用于标题、主要按钮、重要元素 |
| **主色亮** | `--primary-light` | `210 50% 35%` | `#2D5280` | hover 状态、次要信息 |
| **主色暗** | `--primary-dark` | `210 60% 18%` | `#142942` | 深色背景、强调区块 |
| **点缀色 Accent** | `--accent` | `175 60% 40%` | `#2AA19B` | CTA 按钮、链接、高亮标记 |
| **点缀色亮** | `--accent-light` | `175 55% 55%` | `#4DC4BE` | hover 状态、装饰性元素 |
| **点缀色暗** | `--accent-dark` | `175 65% 30%` | `#1B7A75` | 点击/激活状态 |

### 1.2 中性色

| 角色 | CSS 变量 | HSL 值 | 用途 |
|------|----------|--------|------|
| **背景色** | `--background` | `210 20% 98%` | 页面主背景（略带蓝调的白色） |
| **前景色** | `--foreground` | `210 55% 20%` | 主要文字颜色 |
| **卡片背景** | `--card` | `0 0% 100%` | 卡片、弹窗背景 |
| **边框色** | `--border` | `210 30% 90%` | 分割线、边框 |
| **弱化文字** | `--muted-foreground` | `210 20% 50%` | 辅助说明、placeholder |

### 1.3 功能色

| 角色 | HSL 值 | 用途 |
|------|--------|------|
| **成功** | `160 60% 45%` | 成功状态、确认提示 |
| **警告** | `45 90% 50%` | 警告提示 |
| **错误** | `0 70% 55%` | 错误状态、删除操作 |
| **信息** | `210 80% 55%` | 信息提示 |

---

## 2. 亮色/暗色模式

### 2.1 亮色模式 (Light Mode)

```css
:root {
  /* 背景与前景 */
  --background: 210 20% 98%;
  --foreground: 210 55% 20%;
  
  /* 主色系 */
  --primary: 210 55% 25%;
  --primary-foreground: 0 0% 100%;
  
  /* 点缀色系 */
  --accent: 175 60% 40%;
  --accent-foreground: 0 0% 100%;
  
  /* 卡片 */
  --card: 0 0% 100%;
  --card-foreground: 210 55% 20%;
  
  /* 弱化元素 */
  --muted: 210 30% 96%;
  --muted-foreground: 210 20% 50%;
  
  /* 边框与输入 */
  --border: 210 30% 90%;
  --input: 210 30% 90%;
  --ring: 175 60% 40%;
}
```

### 2.2 暗色模式 (Dark Mode)

```css
.dark {
  /* 背景与前景 */
  --background: 210 40% 8%;
  --foreground: 210 20% 95%;
  
  /* 主色系 */
  --primary: 210 50% 45%;
  --primary-foreground: 0 0% 100%;
  
  /* 点缀色系 */
  --accent: 175 55% 50%;
  --accent-foreground: 210 40% 8%;
  
  /* 卡片 */
  --card: 210 35% 12%;
  --card-foreground: 210 20% 95%;
  
  /* 弱化元素 */
  --muted: 210 30% 18%;
  --muted-foreground: 210 20% 60%;
  
  /* 边框与输入 */
  --border: 210 30% 20%;
  --input: 210 30% 20%;
  --ring: 175 55% 50%;
}
```

---

## 3. 渐变规范

### 3.1 主要渐变

| 名称 | CSS 定义 | 用途 |
|------|----------|------|
| **Hero 渐变** | `linear-gradient(135deg, hsl(210 55% 25%) 0%, hsl(175 60% 40%) 100%)` | 英雄区背景、大型 CTA |
| **按钮渐变** | `linear-gradient(135deg, hsl(175 60% 40%) 0%, hsl(175 65% 30%) 100%)` | 主要按钮背景 |
| **卡片光晕** | `linear-gradient(180deg, hsl(175 60% 40% / 0.1) 0%, hsl(210 55% 25% / 0.05) 100%)` | 卡片悬浮效果 |
| **背景纹理** | `radial-gradient(circle at 20% 80%, hsl(175 60% 40% / 0.08) 0%, transparent 50%)` | 页面背景装饰 |

### 3.2 渐变使用示例

```css
/* Hero 区域 */
.hero-section {
  background: var(--gradient-hero);
}

/* CTA 按钮 */
.btn-primary {
  background: linear-gradient(135deg, hsl(175 60% 40%) 0%, hsl(175 65% 30%) 100%);
}

/* 卡片悬浮 */
.card:hover {
  background: var(--gradient-accent);
}
```

---

## 4. 阴影系统

| 名称 | CSS 定义 | 用途 |
|------|----------|------|
| **小阴影 sm** | `0 2px 8px hsl(210 55% 20% / 0.06)` | 按钮、小型卡片 |
| **中阴影 md** | `0 4px 16px hsl(210 55% 20% / 0.08)` | 普通卡片、下拉菜单 |
| **大阴影 lg** | `0 10px 40px hsl(210 55% 20% / 0.12)` | 模态框、悬浮卡片 |
| **光晕效果** | `0 0 40px hsl(175 60% 40% / 0.15)` | 高亮元素、重要按钮 |

---

## 5. 圆角规范

| 名称 | 尺寸 | 用途 |
|------|------|------|
| **sm** | `0.375rem` (6px) | 小型元素、标签 |
| **md** | `0.5rem` (8px) | 输入框、小按钮 |
| **lg** | `0.75rem` (12px) | 卡片、大按钮 |
| **xl** | `1rem` (16px) | 大型卡片、模态框 |
| **2xl** | `1.5rem` (24px) | 特殊装饰元素 |
| **full** | `9999px` | 圆形、胶囊形按钮 |

---

## 6. 字体规范

### 6.1 字体家族

```css
:root {
  --font-sans: "Inter", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;
}
```

### 6.2 字号层级

| 名称 | 尺寸 | 行高 | 用途 |
|------|------|------|------|
| **xs** | 0.75rem (12px) | 1.5 | 标签、辅助文字 |
| **sm** | 0.875rem (14px) | 1.5 | 小型正文、说明 |
| **base** | 1rem (16px) | 1.6 | 正文内容 |
| **lg** | 1.125rem (18px) | 1.6 | 强调正文 |
| **xl** | 1.25rem (20px) | 1.5 | 小标题 |
| **2xl** | 1.5rem (24px) | 1.4 | 卡片标题 |
| **3xl** | 1.875rem (30px) | 1.3 | 区块标题 |
| **4xl** | 2.25rem (36px) | 1.2 | 页面标题 |
| **5xl** | 3rem (48px) | 1.1 | Hero 标题 |
| **6xl** | 3.75rem (60px) | 1.1 | 超大标题 |

### 6.3 字重

| 名称 | 值 | 用途 |
|------|------|------|
| **normal** | 400 | 正文 |
| **medium** | 500 | 强调文字、按钮 |
| **semibold** | 600 | 小标题 |
| **bold** | 700 | 大标题、重要信息 |

---

## 7. 间距系统

基于 4px 基准单位：

| 名称 | 尺寸 | 用途 |
|------|------|------|
| **1** | 0.25rem (4px) | 最小间距 |
| **2** | 0.5rem (8px) | 紧凑元素间距 |
| **3** | 0.75rem (12px) | 小间距 |
| **4** | 1rem (16px) | 标准间距 |
| **6** | 1.5rem (24px) | 中等间距 |
| **8** | 2rem (32px) | 区块内间距 |
| **12** | 3rem (48px) | 区块间距 |
| **16** | 4rem (64px) | 大区块间距 |
| **20** | 5rem (80px) | Section 间距 |
| **24** | 6rem (96px) | 页面级间距 |

---

## 8. 动效规范

### 8.1 过渡时间

| 名称 | 时长 | 用途 |
|------|------|------|
| **fast** | 150ms | 小型交互（hover、toggle） |
| **normal** | 300ms | 标准过渡 |
| **slow** | 500ms | 页面切换、大型动画 |

### 8.2 缓动函数

```css
:root {
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 8.3 常用动画

```css
/* 淡入上移 */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 悬浮效果 */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* 脉冲光晕 */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px hsl(175 60% 40% / 0.2); }
  50% { box-shadow: 0 0 40px hsl(175 60% 40% / 0.4); }
}
```

---

## 9. 组件样式参考

### 9.1 按钮

```css
/* 主要按钮 */
.btn-primary {
  background: hsl(175 60% 40%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 0.3s var(--ease-default);
}

.btn-primary:hover {
  background: hsl(175 65% 30%);
  box-shadow: 0 0 20px hsl(175 60% 40% / 0.3);
}

/* 次要按钮 */
.btn-secondary {
  background: transparent;
  color: hsl(210 55% 25%);
  border: 2px solid hsl(210 55% 25%);
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
}

.btn-secondary:hover {
  background: hsl(210 55% 25%);
  color: white;
}
```

### 9.2 卡片

```css
.card {
  background: hsl(0 0% 100%);
  border: 1px solid hsl(210 30% 90%);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 16px hsl(210 55% 20% / 0.08);
  transition: all 0.3s var(--ease-default);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 40px hsl(210 55% 20% / 0.12);
  border-color: hsl(175 60% 40% / 0.3);
}
```

### 9.3 输入框

```css
.input {
  background: hsl(0 0% 100%);
  border: 1px solid hsl(210 30% 90%);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  outline: none;
  border-color: hsl(175 60% 40%);
  box-shadow: 0 0 0 3px hsl(175 60% 40% / 0.1);
}
```

---

## 10. 使用指南

### 10.1 颜色使用原则

1. **主色（深蓝）** 用于品牌识别、重要标题、导航
2. **点缀色（青色）** 用于交互元素、CTA、链接、高亮
3. **比例建议**: 主色 60%、中性色 30%、点缀色 10%

### 10.2 对比度要求

- 正文文字与背景对比度 ≥ 4.5:1
- 大号文字与背景对比度 ≥ 3:1
- 交互元素需有明显的视觉反馈

### 10.3 响应式断点

| 名称 | 尺寸 | 说明 |
|------|------|------|
| **sm** | 640px | 大手机 |
| **md** | 768px | 平板竖屏 |
| **lg** | 1024px | 平板横屏/小笔记本 |
| **xl** | 1280px | 桌面显示器 |
| **2xl** | 1400px | 大屏显示器 |

---

## 更新日志

| 版本 | 日期 | 说明 |
|------|------|------|
| 1.0.0 | 2025-11-29 | 初始版本，基于 Logo 配色建立规范 |

