import { FormEventHandler, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ConfirmationModal from './ConfirmationModal'
import { Note } from '../models/Note'
import { createNote, deleteNote, updateNote } from '../api/noteApi'

interface NoteModalProps {
  show: boolean
  onClose: () => void
  note?: Note
}

export default function NoteModal({ show, onClose, note }: NoteModalProps) {
  // ステート管理
  const [confirmShow, setConfirmShow] = useState(false)

  const queryClient = useQueryClient()
  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
  const updateMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  const handleClickRegister: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const name = form.get('name') as string
    const seq = parseInt(form.get('seq') as string)

    if (note?.id) {
      const updateNote: Note = { ...note, name, seq }
      updateMutation.mutate(updateNote)
    } else {
      const newNote: Note = { name, seq }
      createMutation.mutate(newNote)
    }

    onClose()
  }

  // 削除ボタンクリック時
  const handleClickDelete = (id: string) => {
    deleteMutation.mutate(id)
    setConfirmShow(false)
    onClose()
  }

  if (show) {
    return (
      <>
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-4 rounded max-w-sm w-full'>
            <div className='text-right'>
              <button className='underline' type='button' onClick={onClose}>
                閉じる
              </button>
            </div>
            <h2 className='text-2xl font-bold mb-2'>ノートの{note ? '編集' : '新規作成'}</h2>
            <form onSubmit={handleClickRegister}>
              <div className='mb-2'>
                <div>
                  <label>名前</label>
                </div>
                <input type='text' name='name' defaultValue={note?.name} />
              </div>
              <div className='mb-2'>
                <div>
                  <label>Seq</label>
                </div>
                <input type='text' name='seq' defaultValue={note?.seq} />
              </div>
              <div className='flex justify-between'>
                <button className='px-4 py-2 bg-blue-500 text-white rounded underline' type='submit'>
                  登録
                </button>
                {note && (
                  <>
                    <button
                      className='px-4 py-2 bg-red-500 text-white rounded underline'
                      type='button'
                      onClick={() => setConfirmShow(true)}
                    >
                      削除
                    </button>
                    <ConfirmationModal
                      show={confirmShow}
                      onExec={() => handleClickDelete(note?.id!)}
                      onClose={() => setConfirmShow(false)}
                    />
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </>
    )
  } else {
    return
  }
}
