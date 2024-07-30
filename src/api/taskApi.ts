import { BASE_API_URL } from '../libs/constants'
import { supabase } from '../libs/supabase'
import { Task } from '../models/Task'

export const getTasks = async (): Promise<Task[]> => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/tasks`, {
    method: 'GET',
    headers,
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }

  const rawData = await response.json()
  const data: Task[] = rawData.map((task: any) => ({
    ...task,
    deadLine: task.deadLine ? new Date(task.deadLine) : undefined,
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt),
  }))

  return data
}

export const createTask = async (task: Task) => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/tasks`, {
    method: 'POST',
    headers,
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
}

export const updateTask = async (task: Task) => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/tasks/${task.id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
}

export const deleteTask = async (id: string) => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers,
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
}

const tokenHeaders = async (): Promise<HeadersInit> => {
  const { data } = await supabase.auth.getSession()

  const headers: HeadersInit = {
    Authorization: `Bearer ${data.session?.access_token}`,
    'Content-Type': 'application/json',
  }

  return headers
}
