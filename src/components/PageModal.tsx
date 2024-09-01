import { FormEventHandler, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ConfirmationModal from './ConfirmationModal'
import { Page } from '../models/Page'
import { createPage, deletePage, updatePage } from '../api/noteApi'

interface PageModalProps {
  show: boolean
  onClose: () => void
  noteId: string
  sectionId: string
  page?: Page
}

export default function PageModal({ show, onClose, noteId, sectionId, page }: PageModalProps) {
  // ステート管理
  const [confirmShow, setConfirmShow] = useState(false)

  const queryClient = useQueryClient()
  const createMutation = useMutation({
    mutationFn: createPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages', sectionId] })
    },
  })
  const updateMutation = useMutation({
    mutationFn: updatePage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages', sectionId] })
    },
  })
  const deleteMutation = useMutation({
    mutationFn: deletePage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages', sectionId] })
    },
  })

  const handleClickRegister: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const title = form.get('title') as string
    const content = form.get('content') as string
    const seq = parseInt(form.get('seq') as string)

    if (page?.id) {
      const updatePage: Page = { ...page, title, content, seq }
      updateMutation.mutate({ noteId, sectionId, page: updatePage })
    } else {
      const newPage: Page = { title, content, seq }
      createMutation.mutate({ noteId, sectionId, page: newPage })
    }

    onClose()
  }

  // 削除ボタンクリック時
  const handleClickDelete = (id: string) => {
    deleteMutation.mutate({ noteId, sectionId, id })
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
            <h2 className='text-2xl font-bold mb-2'>ページの{page ? '編集' : '新規作成'}</h2>
            <form onSubmit={handleClickRegister}>
              <div className='mb-2'>
                <div>
                  <label>名前</label>
                </div>
                <input type='text' name='title' defaultValue={page?.title} />
              </div>
              <div className='mb-2'>
                <div>
                  <label>内容</label>
                </div>
                <input type='text' name='content' defaultValue={page?.content} />
              </div>
              <div className='mb-2'>
                <div>
                  <label>Seq</label>
                </div>
                <input type='text' name='seq' defaultValue={page?.seq} />
              </div>
              <div className='flex justify-between'>
                <button className='px-4 py-2 bg-blue-500 text-white rounded underline' type='submit'>
                  登録
                </button>
                {page && (
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
                      onExec={() => handleClickDelete(page?.id!)}
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
