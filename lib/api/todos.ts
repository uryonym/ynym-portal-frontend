import { TodosResponse } from '../types/todo'

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
