import type { Metadata } from 'next'
import { SidebarProvider } from '@/components/ui/sidebar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ynym Portal',
  description: 'Ynym Family Portal Site.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>
        <SidebarProvider>{children}</SidebarProvider>
      </body>
    </html>
  )
}
