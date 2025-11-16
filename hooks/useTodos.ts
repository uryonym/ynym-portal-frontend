'use client'

import { useState, useCallback, useEffect } from 'react'
import { Todo, CreateTodoInput, UpdateTodoInput } from '@/lib/types/todo'
import { mockTodosResponse } from '@/lib/mocks/todos'
import { fetchTasks, createTask, updateTask, deleteTask } from '@/lib/api/todos'
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
  const addTodo = useCallback(async (data: CreateTodoInput) => {
    setIsLoading(true)
    try {
      const response = await createTask(data)
      setTodos((prev) => [response.data, ...prev])
      toast.success('タスクを作成しました')
    } catch (error) {
      console.error('Failed to create task:', error)
      toast.error('タスクの作成に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // 更新
  const updateTodo = useCallback(async (id: string, data: UpdateTodoInput) => {
    setIsLoading(true)
    try {
      const response = await updateTask(id, data)
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? response.data : todo)),
      )
      toast.success('タスクを更新しました')
    } catch (error) {
      console.error('Failed to update task:', error)
      toast.error('タスクの更新に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // 削除
  const deleteTodo = useCallback(async (id: string) => {
    setIsLoading(true)
    try {
      await deleteTask(id)
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
      toast.success('タスクを削除しました')
    } catch (error) {
      console.error('Failed to delete task:', error)
      toast.error('タスクの削除に失敗しました')
    } finally {
      setIsLoading(false)
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
