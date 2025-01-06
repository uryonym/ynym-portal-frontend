import { useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getPages } from '../../../api/noteApi'
import { type Page } from '../../../models/Page'
import PageModal from '../../../components/PageModal'

export const Route = createFileRoute('/note_/$noteId/$sectionId')({
  component: Page,
})

function Page() {
  const { noteId, sectionId } = Route.useParams()
  const { data } = useSuspenseQuery({
    queryKey: ['pages', sectionId],
    queryFn: () => getPages({ noteId, sectionId }),
  })
  const [openModal, setOpenModal] = useState(false)
  const [currentPage, setCurrentPage] = useState<Page>()

  // 新規作成ボタンクリック時
  const handleClickCreate = () => {
    setCurrentPage(undefined)
    setOpenModal(true)
  }

  // 編集ボタンクリック時
  const handleClickEdit = (page: Page) => {
    setCurrentPage(page)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setCurrentPage(undefined)
    setOpenModal(false)
  }

  return (
    <div className="flex-1 flex flex-col gap-3 p-2">
      <div>Hello Note ID: {noteId}</div>
      <div>Hello Section ID: {sectionId}</div>
      <div>
        <button className="underline" type="button" onClick={handleClickCreate}>
          新規作成
        </button>
      </div>
      <ul>
        {data &&
          data.map((page) => (
            <li
              className="flex gap-3 items-center p-2 border-b-2"
              key={page.id}
            >
              <div>
                <p>{page.title}</p>
                <p>seq: {page.seq}</p>
                <button
                  className="underline"
                  type="button"
                  onClick={() => handleClickEdit(page)}
                >
                  編集
                </button>
              </div>
            </li>
          ))}
      </ul>
      <PageModal
        show={openModal}
        onClose={handleCloseModal}
        noteId={noteId}
        sectionId={sectionId}
        page={currentPage}
      />
    </div>
  )
}
