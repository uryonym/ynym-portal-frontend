'use client'

import { Todo } from '@/lib/types/todo'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Trash2, Pencil, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface TodoItemProps {
  todo: Todo
  onToggleComplete: (id: string) => void
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
}

export function TodoItem({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}: TodoItemProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    try {
      return format(new Date(dateString), 'MM月dd日', { locale: ja })
    } catch {
      return dateString
    }
  }

  return (
    <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <Checkbox
        checked={todo.is_completed}
        onCheckedChange={() => onToggleComplete(todo.id)}
        className="mt-1"
        aria-label="タスク完了状態"
      />

      <div className="flex-1 min-w-0">
        <h3
          className={`text-base font-medium break-words ${
            todo.is_completed ? 'line-through text-gray-400' : 'text-gray-900'
          }`}
        >
          {todo.title}
        </h3>

        {todo.description && (
          <p className="text-sm text-gray-600 mt-1 break-words">
            {todo.description}
          </p>
        )}

        {todo.due_date && (
          <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(todo.due_date)}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(todo)}
          className="h-10 w-10 p-0"
          aria-label="編集"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(todo.id)}
          className="h-10 w-10 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          aria-label="削除"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
