import type { Metadata, Viewport } from 'next'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { AuthProvider } from '@/providers/AuthProvider'
import Header from '@/components/Header'

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
        <AuthProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
