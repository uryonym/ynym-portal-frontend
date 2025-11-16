'use client'

import { useState, useCallback, useEffect } from 'react'
import { Todo, CreateTodoInput, UpdateTodoInput } from '@/lib/types/todo'
import { mockTodosResponse } from '@/lib/mocks/todos'
import { fetchTasks } from '@/lib/api/todos'
import { toast } from 'sonner'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  // 初期化時にタスク一覧を取得
  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true)
      try {
        const response = await fetchTasks()
        setTodos(response.data)
      } catch {
        console.error('Failed to load tasks, using mock data')
        // エラー時はモックデータにフォールバック
        setTodos(mockTodosResponse.data)
        toast.error('タスク一覧の取得に失敗しました')
      } finally {
        setIsLoading(false)
      }
    }

    loadTasks()
  }, [])

  // 新規追加
  const addTodo = useCallback((data: CreateTodoInput) => {
    setIsLoading(true)
    try {
      // モックAPI呼び出し
      const newTodo: Todo = {
        id: `todo-${Date.now()}`,
        user_id: '550e8400-e29b-41d4-a716-446655440000',
        title: data.title,
        description: data.description ?? null,
        is_completed: false,
        completed_at: null,
        due_date: data.due_date ?? null,
        order: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      setTodos((prev) => [newTodo, ...prev])
      toast.success('タスクを作成しました')
    } catch {
      toast.error('タスクの作成に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // 更新
  const updateTodo = useCallback((id: string, data: UpdateTodoInput) => {
    setIsLoading(true)
    try {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                ...data,
                updated_at: new Date().toISOString(),
                completed_at:
                  data.is_completed === true
                    ? new Date().toISOString()
                    : data.is_completed === false
                      ? null
                      : todo.completed_at,
              }
            : todo,
        ),
      )
      toast.success('タスクを更新しました')
    } catch {
      toast.error('タスクの更新に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // 削除
  const deleteTodo = useCallback((id: string) => {
    try {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
      toast.success('タスクを削除しました')
    } catch {
      toast.error('タスクの削除に失敗しました')
    }
  }, [])

  // 完了状態をトグル
  const toggleComplete = useCallback(
    (id: string) => {
      const todo = todos.find((t) => t.id === id)
      if (todo) {
        updateTodo(id, { is_completed: !todo.is_completed })
      }
    },
    [todos, updateTodo],
  )

  return {
    todos,
    isLoading,
    editingTodo,
    setEditingTodo,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  }
}
