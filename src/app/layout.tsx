import type { Metadata } from 'next'
import './globals.css'
import { NextUIProviders, OAuthProviders } from './providers'

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
    <OAuthProviders>
      <html lang='en'>
        <head>
          <link rel='stylesheet' href='https://web.nvnstatic.net/tp/T0295/fonts/font.css?v=24' type='text/css' />
        </head>
        <body>
          <NextUIProviders>{children}</NextUIProviders>
        </body>
      </html>
    </OAuthProviders>
  )
}
