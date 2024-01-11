'use client'

import PageEditor from '@/components/PageEditor'
import PageList from '@/components/PageList'
import { Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Image from 'next/image'

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between h-14 px-4">
        <span className="text-xl/4 font-semibold">uryonote</span>
        <button type="button" onClick={open}>
          <Image
            src="hamburger-menu.svg"
            width={32}
            height={32}
            alt="メニュー"
          />
        </button>
      </header>
      <Drawer opened={opened} onClose={close} size="100%">
        <PageList />
      </Drawer>
      <main className="flex-1 flex">
        <PageEditor />
      </main>
    </div>
  )
}
