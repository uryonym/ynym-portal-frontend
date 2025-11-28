'use client'

import { Todo, CreateTodoInput, UpdateTodoInput } from '@/lib/types/todo'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Trash2, Calendar as CalendarIcon, X } from 'lucide-react'
import { format, parse } from 'date-fns'
import { ja } from 'date-fns/locale'

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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const titleInputRef = useRef<HTMLInputElement>(null)

  // 新規追加時はオートフォーカス、編集時はカーソルを最後に配置
  useEffect(() => {
    if (initialData && titleInputRef.current) {
      // 編集時: フォーカスを外す
      setTimeout(() => {
        titleInputRef.current?.blur()
      }, 0)
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      return
    }

    const data = {
      title: title.trim(),
      description: description.trim() || null,
      due_date: dueDate || null,
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
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              id="dueDate"
              variant="outline"
              className="w-full justify-start text-left font-normal h-10"
              disabled={isLoading}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate
                ? format(parse(dueDate, 'yyyy-MM-dd', new Date()), 'M月d日', {
                    locale: ja,
                  })
                : '期日を選択'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="flex flex-col">
              <Calendar
                mode="single"
                selected={
                  dueDate ? parse(dueDate, 'yyyy-MM-dd', new Date()) : undefined
                }
                onSelect={(date) => {
                  if (date) {
                    setDueDate(format(date, 'yyyy-MM-dd'))
                    setIsCalendarOpen(false)
                  }
                }}
                disabled={isLoading}
                locale={ja}
              />
              {dueDate && (
                <div className="border-t p-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-full gap-2 text-gray-600 hover:text-red-600"
                    onClick={() => {
                      setDueDate('')
                      setIsCalendarOpen(false)
                    }}
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                    期日をクリア
                  </Button>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
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
