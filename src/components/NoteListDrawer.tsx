import { FC, useState } from 'react'
import BottomNavBar from './ui/BottomNavBar'
import { Note, useNotes } from '@/hooks/useNotes'
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import IconButton from './ui/IconButton'

type NoteListDrawerProps = {
  isShow: Boolean
  onClose: () => void
}

const NoteListDrawer: FC<NoteListDrawerProps> = ({ isShow, onClose }) => {
  const [isShowNoteForm, setShowNoteForm] = useState<boolean>(false)
  const [noteName, setNoteName] = useState<string>('')
  const [currentNote, setCurrentNote] = useState<Note | undefined>()

  const { data, error, isLoading, createNote, updateNote, removeNote } =
    useNotes()

  const onClickNewEditButton = (note: Note | undefined) => {
    if (note) {
      setNoteName(note.name)
      setCurrentNote(note)
    }
    setShowNoteForm(true)
  }

  const onCloseNoteForm = () => {
    setNoteName('')
    setCurrentNote(undefined)
    setShowNoteForm(false)
  }

  const onClickCreateUpdateNote = () => {
    if (currentNote) {
      updateNote(currentNote, noteName)
    } else {
      createNote(noteName)
    }
    onCloseNoteForm()
  }

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) throw new Error()

  return (
    <div
      className={`${
        isShow ? '' : 'hidden'
      } absolute top-0 left-0 h-screen w-screen bg-white`}
    >
      <div className="py-4 px-8">
        {data.map((note) => (
          <div className="flex justify-between py-3 border-b" key={note.seq}>
            <p>{note.name}</p>
            <div>
              <IconButton
                icon={faPen}
                onClick={() => onClickNewEditButton(note)}
              />
              <IconButton icon={faXmark} onClick={() => removeNote(note)} />
            </div>
          </div>
        ))}
      </div>
      <BottomNavBar>
        <button type="button" onClick={() => onClickNewEditButton(undefined)}>
          ＋新規作成
        </button>
        <button type="button" onClick={onClose}>
          ✕
        </button>
      </BottomNavBar>
      <div
        className={`${
          isShowNoteForm ? '' : 'hidden'
        } absolute top-0 left-0 h-screen w-screen`}
      >
        <div
          className="h-full w-full bg-black opacity-50"
          onClick={onCloseNoteForm}
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
              onClick={onClickCreateUpdateNote}
            >
              {currentNote ? '更新' : '作成'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteListDrawer
