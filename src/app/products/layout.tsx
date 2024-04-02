import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Furnique | Explore Our Exquisite Furniture Collection',
  description: `Browse our curated selection of elegant home and office furniture. Discover sofas, chairs, tables, and more. Furnique offers exceptional quality and timeless designs.`
}

export default function ProductPageLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
