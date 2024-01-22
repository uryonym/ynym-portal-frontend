import axios from 'axios'
import useSWR from 'swr'

export type Note = {
  id?: string
  name: string
  seq?: number
}

export const useNotes = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data)

  const { data, error, isLoading, mutate } = useSWR<Note[], Error>(
    '/api/notes',
    fetcher,
  )

  const createNote = async (name: string) => {
    const newData: Note = {
      name: name,
    }
    await axios.post('/api/notes', newData)
    mutate()
  }

  const updateNote = async (note: Note, name: string) => {
    const updateData: Note = {
      id: note.id,
      name: name,
    }
    await axios.patch(`/api/notes/${note.id}`, updateData)
    mutate()
  }

  const removeNote = async (note: Note) => {
    await axios.delete(`/api/notes/${note.id}`)
    mutate()
  }

  return { data, error, isLoading, createNote, updateNote, removeNote }
}
