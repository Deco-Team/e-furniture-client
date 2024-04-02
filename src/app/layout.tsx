import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@app/globals.css'
import { ThemeProvider } from '@app/theme.provider'
import Toastify from '@components/common/Toastify'
import Footer from '@components/footer/Footer'
import NavigationBar from '@components/navbar/NavigationBar'
import AuthProvider from '@src/contexts/AuthContext'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.furnique.tech'),
  title: 'Furnique - Elegant Home & Office Furniture | Shop Online',
  description: `Discover Furnique's premium range of home and office furniture. Explore our stylish sofas, ergonomic chairs, decorative items, and more. Exceptional quality at great prices.`
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
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8968731383405809'
          crossOrigin='anonymous'
        ></script>
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <NavigationBar />
            {children}
            <Footer />
          </ThemeProvider>
        </AuthProvider>
        <Toastify />
        <Analytics />
      </body>
    </html>
  )
}
