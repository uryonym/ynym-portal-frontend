import { FC, useState } from 'react'
import BottomNavBar from './ui/BottomNavBar'
import useSWR from 'swr'
import { createNote, fetcher } from '@/app/api'

type NoteListDrawerProps = {
  isShow: Boolean
  onClose: () => void
}

const NoteListDrawer: FC<NoteListDrawerProps> = ({ isShow, onClose }) => {
  const [isShowCreate, setShowCreate] = useState(false)
  const [noteName, setNoteName] = useState('')

  const { data, isLoading } = useSWR('/api/notes', fetcher)

  if (isLoading) return <div>Loading...</div>
  if (!data) throw new Error()

  const onClickCreateNote = () => {
    setShowCreate(false)
    createNote('/api/notes', noteName)
  }

  return (
    <div
      className={`${
        isShow ? '' : 'hidden'
      } absolute top-0 left-0 h-screen w-screen bg-white`}
    >
      <div className="p-4">
        {data.map((note: any, index: number) => (
          <div className="py-3 text-center" key={index}>
            <p>{note.name}</p>
          </div>
        ))}
      </div>
      <BottomNavBar>
        <button type="button" onClick={() => setShowCreate(true)}>
          ＋新規作成
        </button>
        <button type="button" onClick={onClose}>
          Ｘ
        </button>
      </BottomNavBar>
      <div
        className={`${
          isShowCreate ? '' : 'hidden'
        } absolute top-0 left-0 h-screen w-screen`}
      >
        <div
          className="h-full w-full bg-black opacity-50"
          onClick={() => setShowCreate(false)}
        />
        <div className="absolute bottom-0 left-0 h-1/3 w-full p-4 bg-white">
          <div className="flex">
            <input
              type="text"
              className="flex-1"
              placeholder="note name"
              value={noteName}
              onChange={(e) => setNoteName(e.target.value)}
            ></input>
            <button
              type="button"
              className="ms-2 p-2 border border-gray-500"
              onClick={onClickCreateNote}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteListDrawer
