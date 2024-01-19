import axios from 'axios'

export type Note = {
  id?: string
  name: string
  seq?: number
}

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export const api = axios.create({
  baseURL: 'https://api-portal.uryonym.com/api/v1/',
  headers: corsHeaders,
})

export const fetcher = (url: string) => api.get(url).then((res) => res.data)

export const createNote = (url: string, name: string) => {
  const data: Note = {
    name: name,
  }

  api.post(url, data)
}
