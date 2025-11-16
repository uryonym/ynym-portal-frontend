'use client'

import { Todo } from '@/lib/types/todo'
import { useCallback, useRef, useEffect, useState } from 'react'
import { TodoItem } from './TodoItem'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface TodoListProps {
  todos: Todo[]
  onToggleComplete: (id: string) => void
  onEdit: (todo: Todo) => void
  onAddNew: () => void
}

export function TodoList({
  todos,
  onToggleComplete,
  onEdit,
  onAddNew,
}: TodoListProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [displayedCount, setDisplayedCount] = useState(10)
  const observerTarget = useRef<HTMLDivElement>(null)

  // フィルタリング
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.is_completed
    if (filter === 'completed') return todo.is_completed
    return true
  })

  // 表示するアイテム
  const displayedTodos = filteredTodos.slice(0, displayedCount)
  const hasMore = displayedCount < filteredTodos.length

  // 無限スクロール実装
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setDisplayedCount((prev) => prev + 10)
        }
      },
      { threshold: 0.1 },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [hasMore])

  // フィルタ変更時は表示数をリセット
  useEffect(() => {
    setDisplayedCount(10)
  }, [filter])

  return (
    <div className="space-y-4">
      {/* ヘッダー */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">タスク一覧</h1>
        <Button onClick={onAddNew} className="h-10 gap-2 w-full sm:w-auto">
          <Plus className="h-5 w-5" />
          新規タスク
        </Button>
      </div>

      {/* フィルタボタン */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'active', 'completed'] as const).map((filterType) => (
          <Button
            key={filterType}
            variant={filter === filterType ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(filterType)}
            className="h-9"
          >
            {filterType === 'all' && 'すべて'}
            {filterType === 'active' &&
              `進行中 (${todos.filter((t) => !t.is_completed).length})`}
            {filterType === 'completed' &&
              `完了 (${todos.filter((t) => t.is_completed).length})`}
          </Button>
        ))}
      </div>

      {/* Todoアイテムリスト */}
      <div className="space-y-3">
        {displayedTodos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {filter === 'completed' && 'まだ完了したタスクがありません'}
              {filter === 'active' && 'すべてのタスクが完了しました！'}
              {filter === 'all' && 'タスクがありません。新規作成してください'}
            </p>
          </div>
        ) : (
          <>
            {displayedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
              />
            ))}

            {/* 無限スクロール用のセンチネル */}
            {hasMore && (
              <div ref={observerTarget} className="flex justify-center py-6">
                <div className="h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </>
        )}
      </div>

      {/* 統計 */}
      {displayedTodos.length > 0 && (
        <div className="text-center text-sm text-gray-500 pt-4">
          {filter === 'all' &&
            `全 ${filteredTodos.length} 件中 ${displayedCount} 件を表示`}
        </div>
      )}
    </div>
  )
}
