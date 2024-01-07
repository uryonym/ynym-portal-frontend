import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ynym Portal',
  description: 'Portal Site for Ynym family',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
