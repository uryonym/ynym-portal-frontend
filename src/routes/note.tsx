import { useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { type Note } from '../models/Note'
import { getNotes } from '../api/noteApi'
import NoteModal from '../components/NoteModal'

export const Route = createFileRoute('/note')({
  component: Note,
})

function Note() {
  const { data } = useSuspenseQuery({ queryKey: ['notes'], queryFn: getNotes })
  const [openModal, setOpenModal] = useState(false)
  const [currentNote, setCurrentNote] = useState<Note>()

  // 新規作成ボタンクリック時
  const handleClickCreate = () => {
    setCurrentNote(undefined)
    setOpenModal(true)
  }

  // 編集ボタンクリック時
  const handleClickEdit = (note: Note) => {
    setCurrentNote(note)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setCurrentNote(undefined)
    setOpenModal(false)
  }

  return (
    <div className='flex-1 flex flex-col gap-3 p-2'>
      <div>
        <button className='underline' type='button' onClick={handleClickCreate}>
          新規作成
        </button>
      </div>
      <ul>
        {data &&
          data.map((note) => (
            <li className='flex gap-3 items-center p-2 border-b-2' onClick={() => handleClickEdit(note)}>
              <div>
                <p>{note.name}</p>
                <p>seq: {note.seq}</p>
              </div>
            </li>
          ))}
      </ul>
      <NoteModal show={openModal} onClose={handleCloseModal} note={currentNote} />
    </div>
  )
}
