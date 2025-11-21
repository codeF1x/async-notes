import { createResource } from "@/lib/createResource"
import { fetchNotes, type Note } from "./notes"

// 只在模块初始化时创建一次，不要在组件里 new
export const notesResource = createResource<Note[]>(fetchNotes())
