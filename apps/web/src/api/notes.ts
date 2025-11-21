
export type Note = {
    id: string
    title: string
    content: string
    updatedAt: string
}

// 模拟异步接口请求
export async function fetchNotes(): Promise<Note[]> {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 模拟偶尔失败（测试 ErrorBoundary），如果不想失败就注释掉
    if (Math.random() < 0.2) {
        throw new Error("获取笔记列表失败（模拟网络错误）")
    }

    // 模拟返回数据
    return [
        {
            id: "1",
            title: "First Note",
            content: "This is the first note content.",
            updatedAt: "2025-11-20 10:00",
        },
        {
            id: "2",
            title: "Second Note",
            content: "Another note with some text.",
            updatedAt: "2025-11-20 11:20",
        },
        {
            id: "3",
            title: "Third Note",
            content: "Yet another example note.",
            updatedAt: "2025-11-20 12:45",
        },
    ]
}
