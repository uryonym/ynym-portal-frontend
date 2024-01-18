'use client'

import PageEditor from '@/components/PageEditor'
import PageListDrawer from '@/components/PageListDrawer'
import Image from 'next/image'
import { useState } from 'react'

const Home = () => {
  const [isShowDrawer, setShowDrawer] = useState(false)

  return (
    <>
      <main className="flex-1 flex">
        <PageEditor />
      </main>
      <footer className="flex justify-end items-center h-14 px-4">
        <button type="button" onClick={() => setShowDrawer(true)}>
          <Image
            src="hamburger-menu.svg"
            width={32}
            height={32}
            alt="メニュー"
          />
        </button>
      </footer>
      <PageListDrawer
        isShow={isShowDrawer}
        onClose={() => setShowDrawer(false)}
      />
    </>
  )
}

export default Home
