import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Furnique | Contact Us for Furniture Inquiries',
  description: `Have questions or need assistance? Reach out to Furnique's friendly team. We're here to help with furniture recommendations, orders, and more.`
}

export default function ContactPageLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
