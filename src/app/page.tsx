import PageEditor from '@/components/PageEditor'
import PageList from '@/components/PageList'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between h-14 px-4">
        <span className="text-xl/4 font-semibold">uryonote</span>
        <button type="button">
          <Image
            src="hamburger-menu.svg"
            width={32}
            height={32}
            alt="メニュー"
          />
        </button>
      </header>
      <main className="flex-1 flex">
        <PageList />
        <PageEditor />
      </main>
    </div>
  )
}
