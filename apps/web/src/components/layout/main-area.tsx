import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useNotesStore } from "@/store/notes-store"

export default function MainArea() {
  const notes = useNotesStore((s) => s.notes)
  const selectedId = useNotesStore((s) => s.selectedId)
  const updateNote = useNotesStore((s) => s.updateNote)

  const selectedNote = notes.find((n) => n.id === selectedId)

  return (
    <ScrollArea className="h-full">
      <div className="p-8 space-y-6">
        <h1 className="text-3xl font-bold">Note Details</h1>

        {!selectedNote ? (
          <p className="text-muted-foreground">
            请选择左侧的一条笔记进行查看和编辑。
          </p>
        ) : (
          <Card>
            <CardContent className="p-4 space-y-4">
              <Input
                value={selectedNote.title}
                onChange={(e) =>
                  updateNote(selectedNote.id, { title: e.target.value })
                }
              />

              <Textarea
                className="min-h-[200px]"
                value={selectedNote.content}
                onChange={(e) =>
                  updateNote(selectedNote.id, { content: e.target.value })
                }
              />

              <p className="text-xs text-muted-foreground">
                Last updated: {selectedNote.updatedAt}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  )
}

