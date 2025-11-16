import type { Metadata, Viewport } from 'next'
import { SidebarProvider } from '@/components/ui/sidebar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ynym Portal',
  description: 'Ynym Family Portal Site.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="font-sans">
        <SidebarProvider>{children}</SidebarProvider>
      </body>
    </html>
  )
}
