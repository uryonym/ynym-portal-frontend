'use client'

import { Todo, CreateTodoInput, UpdateTodoInput } from '@/lib/types/todo'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Trash2 } from 'lucide-react'

interface TodoFormProps {
  initialData?: Todo | null
  onSubmit: (data: CreateTodoInput | UpdateTodoInput) => void
  onCancel: () => void
  onDelete?: (id: string) => void
  isLoading?: boolean
}

export function TodoForm({
  initialData,
  onSubmit,
  onCancel,
  onDelete,
  isLoading = false,
}: TodoFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [description, setDescription] = useState(initialData?.description ?? '')
  const [dueDate, setDueDate] = useState(initialData?.due_date ?? '')
  const titleInputRef = useRef<HTMLInputElement>(null)

  // 編集時、タイトル入力にフォーカスを当て、カーソルを最後に配置
  useEffect(() => {
    if (initialData && titleInputRef.current) {
      setTimeout(() => {
        titleInputRef.current?.focus()
        titleInputRef.current?.setSelectionRange(title.length, title.length)
      }, 0)
    }
  }, [initialData, title.length])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      return
    }

    const data = {
      title: title.trim(),
      ...(description && { description: description.trim() }),
      ...(dueDate && { due_date: dueDate }),
    }

    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          タイトル <span className="text-red-500">*</span>
        </label>
        <Input
          ref={titleInputRef}
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タスクのタイトルを入力"
          disabled={isLoading}
          required
          className="h-10"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          説明
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="タスクの詳細説明（任意）"
          disabled={isLoading}
          className="min-h-24 resize-none"
        />
      </div>

      <div>
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          期日
        </label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={isLoading}
          className="h-10"
        />
      </div>

      <div className="space-y-3 pt-4">
        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="h-10"
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !title.trim()}
            className="h-10"
          >
            {isLoading ? '保存中...' : '保存'}
          </Button>
        </div>

        {initialData && onDelete && (
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              onDelete(initialData.id)
              onCancel()
            }}
            disabled={isLoading}
            className="w-full h-10 gap-2"
          >
            <Trash2 className="h-4 w-4" />
            このタスクを削除
          </Button>
        )}
      </div>
    </form>
  )
}
