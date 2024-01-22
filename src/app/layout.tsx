import type { Metadata } from 'next'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './globals.css'

config.autoAddCss = false

export const metadata: Metadata = {
  title: 'uryonote',
  description: 'markdown editor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="text-black bg-white">
        <div className="flex h-screen flex-col">
          <header className="flex items-center justify-between h-8 px-4 bg-amber-300">
            <span className="text-lg font-semibold">uryonote</span>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
