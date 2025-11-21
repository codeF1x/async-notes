import Sidebar from "./sidebar"
import MainArea from "./main-area"

export default function AppLayout() {
  return (
    <div className="w-full h-screen flex bg-background text-foreground overflow-hidden">
      {/* 左侧栏 */}
      <aside className="w-72 border-r border-border h-full">
        <Sidebar />
      </aside>

      {/* 右侧主区域 */}
      <main className="flex-1 h-full">
        <MainArea />
      </main>
    </div>
  )
}
