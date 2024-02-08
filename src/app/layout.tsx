import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@app/globals.css'
import { NextUIProviders } from '@app/providers'

export const metadata: Metadata = {
  title: 'eFurniture',
  description: 'App providing furniture for your home'
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={inter.className}>
      <head>
        {/* <link rel='stylesheet' href='https://web.nvnstatic.net/tp/T0295/fonts/font.css?v=24' type='text/css' /> */}
      </head>
      <body>
        <NextUIProviders>{children}</NextUIProviders>
      </body>
    </html>
  )
}
