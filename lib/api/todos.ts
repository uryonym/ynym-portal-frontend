import {
  TodosResponse,
  TodoResponse,
  CreateTodoInput,
  UpdateTodoInput,
} from '../types/todo'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'

export async function fetchTasks(): Promise<TodosResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data: TodosResponse = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
    throw error
  }
}

export async function createTask(
  input: CreateTodoInput,
): Promise<TodoResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data: TodoResponse = await response.json()
    return data
  } catch (error) {
    console.error('Failed to create task:', error)
    throw error
  }
}

export async function updateTask(
  id: string,
  input: UpdateTodoInput,
): Promise<TodoResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data: TodoResponse = await response.json()
    return data
  } catch (error) {
    console.error('Failed to update task:', error)
    throw error
  }
}

export async function deleteTask(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.error('Failed to delete task:', error)
    throw error
  }
}
