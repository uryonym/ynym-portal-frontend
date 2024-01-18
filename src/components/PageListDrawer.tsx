import { FC } from 'react'

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
        <ul className="list-disc list-inside">
          <Section />
          <Section />
          <Section />
          <Section />
          <Section />
          <Section />
        </ul>
      </div>
      <div className="fixed bottom-0 h-14 w-full bg-white">
        <div className="flex justify-end items-center h-full px-4">
          <button type="button" onClick={onClose}>
            Ｘ
          </button>
        </div>
      </div>
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
