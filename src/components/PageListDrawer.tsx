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
      } absolute top-0 left-0 h-screen w-screen p-4 bg-white overflow-y-auto`}
    >
      <div className="text-right">
        <button type="button" onClick={onClose}>
          Ｘ
        </button>
      </div>
      <ul className="list-disc list-inside">
        <Section />
        <Section />
        <Section />
        <Section />
        <Section />
        <Section />
      </ul>
    </div>
  )
}

function Section() {
  return (
    <li>
      sections
      <ul className="ps-5 list-disc list-inside">
        <li>pages</li>
        <li>pages</li>
        <li>pages</li>
        <li>pages</li>
        <li>pages</li>
      </ul>
    </li>
  )
}

export default PageListDrawer
