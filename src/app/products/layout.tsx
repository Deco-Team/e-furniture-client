import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Furnique | Khám Phá Bộ Sưu Tập Nội Thất Tinh Tế',
  description: `Duyệt qua lựa chọn nội thất nhà và văn phòng thanh lịch của chúng tôi. Khám phá sofa, ghế, bàn, và nhiều hơn nữa. Furnique cung cấp chất lượng xuất sắc và thiết kế vượt thời gian.`
}

export default function ProductPageLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
