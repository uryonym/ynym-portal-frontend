import axios from 'axios'
import useSWR from 'swr'

export type Section = {
  id?: string
  name: string
  seq?: number
}

export const useSections = (noteId: string) => {
  const fetcher = (url: string, noteId: string) =>
    axios.get(`${url}?id=${noteId}`).then((res) => res.data)

  const { data, error, isLoading, mutate } = useSWR<
    Section[],
    Error,
    [string, string]
  >(['/api/sections', noteId], ([url, noteId]) => fetcher(url, noteId))

  // const createSection = async (name: string) => {
  //   const newData: Note = {
  //     name: name,
  //   }
  //   await axios.post('/api/notes', newData)
  //   mutate()
  // }

  // const updateNote = async (note: Note, name: string) => {
  //   const updateData: Note = {
  //     id: note.id,
  //     name: name,
  //   }
  //   await axios.patch(`/api/notes/${note.id}`, updateData)
  //   mutate()
  // }

  // const removeNote = async (note: Note) => {
  //   await axios.delete(`/api/notes/${note.id}`)
  //   mutate()
  // }

  return { data, error, isLoading }
}
