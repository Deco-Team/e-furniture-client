import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Furnique | Liên Hệ Chúng Tôi Để Đặt Câu Hỏi Về Nội Thất',
  description: `Bạn có câu hỏi hoặc cần hỗ trợ? Hãy liên hệ với đội ngũ thân thiện của Furnique. Chúng tôi ở đây để giúp đỡ với các gợi ý nội thất, đơn hàng, và nhiều hơn nữa.`
}

export default function ContactPageLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
