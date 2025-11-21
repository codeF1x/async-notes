# 🚀 Async Notes

<div align="center">

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=for-the-badge)

**基于 React 19 构建的现代化、Suspense 优先的笔记应用。**

[功能特性](#-功能特性) • [技术栈](#-技术栈) • [快速开始](#-快速开始) • [架构亮点](#-架构亮点)

</div>

---

## 📖 简介

**Async Notes** 展示了现代 React 架构模式，特别关注 **Concurrent React（并发 React）** 特性。它演示了如何使用 "Render-as-You-Fetch"（边渲染边获取）模式、优雅的错误处理和乐观 UI 更新来构建健壮的应用程序。

与传统的 "useEffect fetching" 应用不同，Async Notes 利用 **React Suspense** 和 **Error Boundaries** 声明式地处理加载和错误状态，从而带来更流畅、更可预测的用户体验。

## ✨ 功能特性

- **⚛️ React 19 Ready**：使用最新的 React 模式构建，包括用于数据获取的 Suspense。
- **🌊 Render-as-You-Fetch**：使用自定义资源加载器消除请求瀑布流。
- **🛡️ 健壮的错误处理**：细粒度的错误边界（Error Boundaries），支持网络故障重试机制。
- **💀 精致的加载状态**：模拟真实 UI 布局的骨架屏（Skeleton screens）。
- **🐻 Zustand 状态管理**：简单、可扩展的全局状态，用于笔记选择和更新。
- **🔍 即时搜索**：客户端搜索，支持实时关键词高亮显示。
- **🎨 现代 UI 设计**：使用 Tailwind CSS 和 Shadcn UI 组件打造的精美界面。
- **📱 响应式设计**：适配移动端的侧边栏布局。

## 🛠️ 技术栈

- **框架**：[React 19](https://react.dev/) (RC/Canary features)
- **构建工具**：[Vite](https://vitejs.dev/)
- **语言**：[TypeScript](https://www.typescriptlang.org/)
- **样式**：[Tailwind CSS](https://tailwindcss.com/)
- **UI 组件**：[Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **状态管理**：[Zustand](https://github.com/pmndrs/zustand)
- **包管理器**：[pnpm](https://pnpm.io/)

## 🚀 快速开始

### 前置要求

- Node.js 18+
- pnpm

### 安装步骤

1.  **克隆仓库**

    ```bash
    git clone https://github.com/codeF1x/async-notes.git
    cd async-notes
    ```

2.  **安装依赖**

    ```bash
    pnpm install
    ```

3.  **启动开发服务器**

    ```bash
    pnpm dev
    ```

4.  **打开浏览器**
    访问 `http://localhost:5173` 查看应用运行效果。

## 🏗️ 架构亮点

### 1. Suspense Resource 模式

我们没有使用 `useEffect`，而是使用自定义的 `createResource` 工具将 Promise 与 React Suspense 集成。

```typescript
// src/lib/createResource.ts
export function createResource<T>(promise: Promise<T>) {
  // ... 处理 pending/success/error 状态
  return {
    read() {
      if (status === "pending") throw suspender; // 挂起 (Suspend)!
      if (status === "error") throw result; // 抛出错误 (Error Boundary)!
      return result; // 渲染数据!
    },
  };
}
```

### 2. 初始化组件 (Initializer Component)

我们使用 `NotesInitializer` 组件将数据预加载到 Zustand store 中，同时触发 Suspense 边界。

```tsx
// src/components/notes-initializer.tsx
export function NotesInitializer({ children }) {
  // 如果数据未就绪，触发 Suspense
  const notes = notesResource.read();

  // 一旦数据可用，同步到 store
  useEffect(() => {
    setInitialNotes(notes);
  }, [notes]);

  return <>{children}</>;
}
```

### 3. 声明式应用结构

主 `App` 组件结构清晰、声明式，明确展示了处理程序的层级关系。

```tsx
<ErrorBoundary>
  <Suspense fallback={<AppSkeleton />}>
    <NotesInitializer>
      <AppLayout />
    </NotesInitializer>
  </Suspense>
</ErrorBoundary>
```

## 🤝 贡献

欢迎提交 Pull Request！

1.  Fork 本项目
2.  创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3.  提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4.  推送到分支 (`git push origin feature/AmazingFeature`)
5.  提交 Pull Request

## 📄 许可证

本项目基于 MIT 许可证分发。详情请参阅 `LICENSE` 文件。

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/codeF1x">codeF1x</a></sub>
</div>
