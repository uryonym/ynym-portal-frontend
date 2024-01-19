'use client'

import NoteListDrawer from '@/components/NoteListDrawer'
import PageEditor from '@/components/PageEditor'
import PageListDrawer from '@/components/PageListDrawer'
import BottomNavBar from '@/components/ui/BottomNavBar'
import Image from 'next/image'
import { useState } from 'react'

const Home = () => {
  const [isShowNoteList, setShowNoteList] = useState(false)
  const [isShowPageList, setShowPageList] = useState(false)

  return (
    <>
      <main className="flex-1 flex mb-14">
        <PageEditor />
      </main>
      <BottomNavBar>
        <button type="button" onClick={() => setShowNoteList(true)}>
          ノート
        </button>
        <button type="button" onClick={() => setShowPageList(true)}>
          <Image
            src="hamburger-menu.svg"
            width={32}
            height={32}
            alt="メニュー"
          />
        </button>
      </BottomNavBar>
      <NoteListDrawer
        isShow={isShowNoteList}
        onClose={() => setShowNoteList(false)}
      />
      <PageListDrawer
        isShow={isShowPageList}
        onClose={() => setShowPageList(false)}
      />
    </>
  )
}

export default Home
