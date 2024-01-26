import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'eFurnitures',
  description: 'App providing furniture for your home'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='dark'>
      <head>
        <link href='https://fonts.cdnfonts.com/css/helvetica-neue-55' rel='stylesheet' />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
