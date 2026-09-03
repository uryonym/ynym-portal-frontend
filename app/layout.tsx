import type { Metadata, Viewport } from 'next'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { AuthProvider } from '@/providers/AuthProvider'
import Header from '@/components/Header'
import { Toaster } from '@/components/ui/sonner'

import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

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
    <html lang="ja" className={cn('font-sans', inter.variable)}>
      <body className="font-sans">
        <AuthProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header />
              {children}
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
