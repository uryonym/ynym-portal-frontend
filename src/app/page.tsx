'use client'

import PageEditor from '@/components/PageEditor'
import PageListDrawer from '@/components/PageListDrawer'
import Image from 'next/image'
import { useState } from 'react'

const Home = () => {
  const [isShowDrawer, setShowDrawer] = useState(false)

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between h-14 px-4">
        <span className="text-xl/4 font-semibold">uryonote</span>
        <button type="button" onClick={() => setShowDrawer(true)}>
          <Image
            src="hamburger-menu.svg"
            width={32}
            height={32}
            alt="メニュー"
          />
        </button>
        <PageListDrawer
          isShow={isShowDrawer}
          onClose={() => setShowDrawer(false)}
        />
      </header>
      <main className="flex-1 flex">
        <PageEditor />
      </main>
    </div>
  )
}

export default Home
