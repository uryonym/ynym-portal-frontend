import { FormEventHandler, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ConfirmationModal from './ConfirmationModal'
import { Section } from '../models/Section'
import { createSection, deleteSection, updateSection } from '../api/noteApi'

interface SectionModalProps {
  show: boolean
  onClose: () => void
  noteId: string
  section?: Section
}

export default function SectionModal({ show, onClose, noteId, section }: SectionModalProps) {
  // ステート管理
  const [confirmShow, setConfirmShow] = useState(false)

  const queryClient = useQueryClient()
  const createMutation = useMutation({
    mutationFn: createSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections', noteId] })
    },
  })
  const updateMutation = useMutation({
    mutationFn: updateSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections', noteId] })
    },
  })
  const deleteMutation = useMutation({
    mutationFn: deleteSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections', noteId] })
    },
  })

  const handleClickRegister: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const name = form.get('name') as string
    const seq = parseInt(form.get('seq') as string)

    if (section?.id) {
      const updateSection: Section = { ...section, name, seq }
      updateMutation.mutate({ noteId, section: updateSection })
    } else {
      const newSection: Section = { name, seq }
      createMutation.mutate({ noteId, section: newSection })
    }

    onClose()
  }

  // 削除ボタンクリック時
  const handleClickDelete = (id: string) => {
    deleteMutation.mutate({ noteId, id })
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
            <h2 className='text-2xl font-bold mb-2'>セクションの{section ? '編集' : '新規作成'}</h2>
            <form onSubmit={handleClickRegister}>
              <div className='mb-2'>
                <div>
                  <label>名前</label>
                </div>
                <input type='text' name='name' defaultValue={section?.name} />
              </div>
              <div className='mb-2'>
                <div>
                  <label>Seq</label>
                </div>
                <input type='text' name='seq' defaultValue={section?.seq} />
              </div>
              <div className='flex justify-between'>
                <button className='px-4 py-2 bg-blue-500 text-white rounded underline' type='submit'>
                  登録
                </button>
                {section && (
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
                      onExec={() => handleClickDelete(section?.id!)}
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
