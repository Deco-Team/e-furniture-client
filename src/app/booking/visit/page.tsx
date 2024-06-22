import { getCategories } from '@actions/categories/categories.actions'
import BookingVisit from '@components/booking/BookingVisit'
import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Furnique | Đặt Lịch Tham Quan Showroom',
  description: `Chuẩn bị trải nghiệm tuyệt vời tại showroom của chúng tôi bằng cách đặt lịch hẹn trước. Điền thông tin và chọn thời gian bạn muốn ghé thăm.`,
  keywords: 'đặt lịch hẹn, showroom, trải nghiệm, thời gian ghé thăm'
}

const getData = async () => {
  const categories = await getCategories(1, 100, '')
  return { categories: categories ? categories.docs : [] }
}

const BookingVisitPage = async () => {
  const { categories } = await getData()

  return <BookingVisit categories={categories} />
}
export default BookingVisitPage
