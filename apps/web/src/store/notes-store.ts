// src/store/notes-store.ts
import { create } from "zustand"
import type { Note } from "@/api/notes"

type NotesState = {
    notes: Note[]
    selectedId: string | null
    select: (id: string) => void
    updateNote: (
        id: string,
        patch: Partial<Pick<Note, "title" | "content">>
    ) => void
    setInitialNotes: (notes: Note[]) => void
}

export const useNotesStore = create<NotesState>((set) => ({
    notes: [],
    selectedId: null,

    setInitialNotes: (notes) =>
        set(() => ({
            notes,
            selectedId: notes[0]?.id ?? null,
        })),

    select: (id) =>
        set({
            selectedId: id,
        }),

    updateNote: (id, patch) =>
        set((state) => ({
            notes: state.notes.map((note) =>
                note.id === id
                    ? {
                        ...note,
                        ...patch,
                        updatedAt: new Date().toLocaleString(),
                    }
                    : note
            ),
        })),
}))
