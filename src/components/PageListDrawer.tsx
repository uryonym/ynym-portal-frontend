import { FC } from 'react'
import BottomNavBar from './ui/BottomNavBar'

type PageListDrawerProps = {
  isShow: Boolean
  onClose: () => void
}

const PageListDrawer: FC<PageListDrawerProps> = ({ isShow, onClose }) => {
  return (
    <div
      className={`${
        isShow ? '' : 'hidden'
      } absolute top-0 left-0 h-screen w-screen bg-white`}
    >
      <div className="p-4">
        <ul className="list-disc list-inside mb-14">
          <Section />
          <Section />
          <Section />
          <Section />
          <Section />
          <Section />
        </ul>
      </div>
      <BottomNavBar>
        <div></div>
        <button type="button" onClick={onClose}>
          Ｘ
        </button>
      </BottomNavBar>
    </div>
  )
}

function Section() {
  return (
    <li className="pt-2">
      sections
      <ul className="ps-5 list-disc list-inside">
        <li className="py-2">pages</li>
        <li className="py-2">pages</li>
        <li className="py-2">pages</li>
        <li className="py-2">pages</li>
        <li className="py-2">pages</li>
      </ul>
    </li>
  )
}

export default PageListDrawer
