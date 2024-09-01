import { BASE_API_URL } from '../libs/constants'
import { supabase } from '../libs/supabase'
import { Note } from '../models/Note'
import { Section } from '../models/Section'

export const getNotes = async (): Promise<Note[]> => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/notes`, {
    method: 'GET',
    headers,
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }

  const rawData = await response.json()
  const data: Note[] = rawData.map((note: any) => ({
    ...note,
    createdAt: new Date(note.createdAt),
    updatedAt: new Date(note.updatedAt),
  }))

  return data
}

export const getSections = async (noteId: string): Promise<Section[]> => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/notes/${noteId}/sections`, {
    method: 'GET',
    headers,
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }

  const rawData = await response.json()
  const data: Section[] = rawData.map((section: any) => ({
    ...section,
    createdAt: new Date(section.createdAt),
    updatedAt: new Date(section.updatedAt),
  }))

  return data
}


export const createNote = async (note: Note) => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/notes`, {
    method: 'POST',
    headers,
    body: JSON.stringify(note),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
}

export const createSection = async (params: { noteId: string, section: Section }) => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/notes/${params.noteId}/sections`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params.section),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
}

export const updateNote = async (note: Note) => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/notes/${note.id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(note),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
}

export const updateSection = async (params: { noteId: string, section: Section }) => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/notes/${params.noteId}/sections/${params.section.id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(params.section),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
}

export const deleteNote = async (id: string) => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/notes/${id}`, {
    method: 'DELETE',
    headers,
  })

  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
}

export const deleteSection = async (params: {noteId:string, id: string}) => {
  const headers = await tokenHeaders()
  const response = await fetch(`${BASE_API_URL}/notes/${params.noteId}/sections/${params.id}`, {
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

export const formatDate = (date: Date | undefined) => {
  if (date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}
