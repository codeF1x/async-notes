import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNotesStore } from "@/store/notes-store"

// 小工具：在标题里高亮搜索关键词
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <span className="truncate">{text}</span>

  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()

  const parts: React.ReactNode[] = []
  let currentIndex = 0
  let matchIndex = lowerText.indexOf(lowerQuery)

  while (matchIndex !== -1) {
    if (matchIndex > currentIndex) {
      parts.push(
        <span key={currentIndex}>{text.slice(currentIndex, matchIndex)}</span>
      )
    }

    const matchEnd = matchIndex + query.length
    parts.push(
      <span
        key={matchIndex}
        className="bg-yellow-200 dark:bg-yellow-600/60 rounded-sm px-0.5"
      >
        {text.slice(matchIndex, matchEnd)}
      </span>
    )

    currentIndex = matchEnd
    matchIndex = lowerText.indexOf(lowerQuery, currentIndex)
  }

  if (currentIndex < text.length) {
    parts.push(
      <span key={currentIndex}>{text.slice(currentIndex)}</span>
    )
  }

  return <span className="truncate">{parts}</span>
}

export default function Sidebar() {
  const [search, setSearch] = useState("")
  const notes = useNotesStore((s) => s.notes)
  const selectedId = useNotesStore((s) => s.selectedId)
  const select = useNotesStore((s) => s.select)

  const query = search.trim()
  const filteredNotes =
    query === ""
      ? notes
      : notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase())
      )

  return (
    <div className="flex flex-col h-full">
      {/* 头部：标题 + 搜索框 */}
      <div className="p-4 space-y-2">
        <div className="font-bold text-xl">Notes</div>
        <Input
          placeholder="搜索笔记标题…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 text-sm"
        />
      </div>

      <Separator />

      {/* 列表区域，可滚动 */}
      <ScrollArea className="flex-1 px-2 pb-4">
        <div className="space-y-2 mt-4">
          {filteredNotes.length === 0 ? (
            <p className="px-2 text-xs text-muted-foreground">
              未找到匹配的笔记
            </p>
          ) : (
            filteredNotes.map((note) => (
              <Button
                key={note.id}
                variant={note.id === selectedId ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => select(note.id)}
              >
                <Highlight text={note.title} query={query} />
              </Button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
