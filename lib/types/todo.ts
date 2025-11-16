export interface Todo {
  id: string
  user_id: string
  title: string
  description: string | null
  is_completed: boolean
  completed_at: string | null
  due_date: string | null
  order: number
  created_at: string
  updated_at: string
}

export interface TodosResponse {
  data: Todo[]
  message: string
}

export interface CreateTodoInput {
  title: string
  description?: string
  due_date?: string
}

export interface UpdateTodoInput {
  title?: string
  description?: string
  is_completed?: boolean
  due_date?: string
}
