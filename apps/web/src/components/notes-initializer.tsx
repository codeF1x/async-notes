// src/components/notes-initializer.tsx
import { useEffect, useRef, type ReactNode } from "react"
import { notesResource } from "@/api/notes-resource"
import { useNotesStore } from "@/store/notes-store"

type NotesInitializerProps = {
    children: ReactNode
}

export function NotesInitializer({ children }: NotesInitializerProps) {
    const setInitialNotes = useNotesStore((s) => s.setInitialNotes)
    const hydratedRef = useRef(false)

    // 这里会触发 Suspense：数据没来 → throw promise → 走 fallback
    const notes = notesResource.read()

    useEffect(() => {
        if (!hydratedRef.current) {
            setInitialNotes(notes)
            hydratedRef.current = true
        }
    }, [notes, setInitialNotes])

    return <>{children}</>
}
