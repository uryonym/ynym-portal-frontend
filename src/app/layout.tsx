import type { Metadata } from 'next'
import '@mantine/core/styles.css'
import './globals.css'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'

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
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  )
}
