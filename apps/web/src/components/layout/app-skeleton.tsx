// src/components/layout/app-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"

export function AppSkeleton() {
    return (
        <div className="w-full h-screen flex bg-background text-foreground overflow-hidden">
            {/* 左侧 skeleton */}
            <aside className="w-72 border-r border-border h-full">
                <div className="flex flex-col h-full">
                    <div className="p-4">
                        <Skeleton className="h-6 w-24" />
                    </div>
                    <Separator />
                    <ScrollArea className="flex-1 px-2 pb-4">
                        <div className="space-y-2 mt-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} className="h-10 w-full" />
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </aside>

            {/* 右侧 skeleton */}
            <main className="flex-1 h-full">
                <ScrollArea className="h-full">
                    <div className="p-8 space-y-6">
                        <Skeleton className="h-8 w-40" />
                        <Card>
                            <CardContent className="p-4 space-y-4">
                                <Skeleton className="h-10 w-1/2" />
                                <Skeleton className="h-24 w-full" />
                                <Skeleton className="h-4 w-32" />
                            </CardContent>
                        </Card>
                    </div>
                </ScrollArea>
            </main>
        </div>
    )
}
