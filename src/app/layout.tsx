import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@app/globals.css'
import { NextUIProviders } from '@app/providers'
import Toastify from '@components/common/Toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from '@components/navbar/NavBar'
import Footer from '@components/footer/Footer'

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
        <meta name='google-adsense-account' content='ca-pub-8968731383405809'></meta>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8968731383405809" crossorigin="anonymous"></script>
      </head>
      <body>
        <Toastify>
          <NextUIProviders>
            <NavBar />
            {children}
            <Footer />
          </NextUIProviders>
        </Toastify>
      </body>
    </html>
  )
}
