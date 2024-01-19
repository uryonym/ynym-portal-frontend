import { FC } from 'react'
import BottomNavBar from './ui/BottomNavBar'

type NoteListDrawerProps = {
  isShow: Boolean
  onClose: () => void
}

const NoteListDrawer: FC<NoteListDrawerProps> = ({ isShow, onClose }) => {
  const notes = [
    { name: 'note1' },
    { name: 'note2' },
    { name: 'note3' },
    { name: 'note1' },
    { name: 'note2' },
    { name: 'note3' },
    { name: 'note1' },
    { name: 'note2' },
    { name: 'note3' },
    { name: 'note1' },
    { name: 'note2' },
    { name: 'note3' },
    { name: 'note1' },
    { name: 'note2' },
    { name: 'note3' },
    { name: 'note1' },
    { name: 'note2' },
    { name: 'note3' },
    { name: 'note1' },
    { name: 'note2' },
    { name: 'note3' },
    { name: 'note1' },
    { name: 'note2' },
    { name: 'note3' },
  ]

  return (
    <div
      className={`${
        isShow ? '' : 'hidden'
      } absolute top-0 left-0 h-screen w-screen bg-white`}
    >
      <div className="p-4">
        {notes.map((note, index) => (
          <div className="py-3 text-center" key={index}>
            <p>{note.name}</p>
          </div>
        ))}
      </div>
      <BottomNavBar>
        <button type="button" onClick={onClose}>
          ＋新規作成
        </button>
        <button type="button" onClick={onClose}>
          Ｘ
        </button>
      </BottomNavBar>
    </div>
  )
}

export default NoteListDrawer
