import axios from 'axios'

export type Note = {
  id?: string
  name: string
  seq?: number
}

export const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export const createNote = (url: string, name: string) => {
  const data: Note = {
    name: name,
  }

  axios.post(url, data)
}
