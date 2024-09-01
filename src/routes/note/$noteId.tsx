import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { getSections } from '../../api/noteApi'
import SectionModal from '../../components/SectionModal'
import { useState } from 'react'
import { type Section } from '../../models/Section'

export const Route = createFileRoute('/note/$noteId')({
  component: Section
})

function Section() {
  const { noteId } = Route.useParams()
  const { data } = useSuspenseQuery({ queryKey: ['sections', noteId], queryFn: () => getSections(noteId) })
  const [openModal, setOpenModal] = useState(false)
  const [currentSection, setCurrentSection] = useState<Section>()

  // 新規作成ボタンクリック時
  const handleClickCreate = () => {
    setCurrentSection(undefined)
    setOpenModal(true)
  }

  // 編集ボタンクリック時
  const handleClickEdit = (section: Section) => {
    setCurrentSection(section)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setCurrentSection(undefined)
    setOpenModal(false)
  }

  return (
    <div className='flex-1 flex flex-col gap-3 p-2'>
      <div>Hello Note ID: {noteId}</div>
      <div>
        <button className='underline' type='button' onClick={handleClickCreate}>
          新規作成
        </button>
      </div>
      <ul>
        {data &&
          data.map((section) => (
            <li className='flex gap-3 items-center p-2 border-b-2'>
              <div>
                <p><Link to={`/note/${noteId}/${section.id}`}>{section.name}</Link></p>
                <p>seq: {section.seq}</p>
                <button className='underline' type="button" onClick={() => handleClickEdit(section)}>編集</button>
              </div>
            </li>
          ))}
      </ul>
      <SectionModal show={openModal} onClose={handleCloseModal} noteId={noteId} section={currentSection} />
    </div>
  )
}