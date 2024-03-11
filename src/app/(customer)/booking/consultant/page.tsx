import { getConsultantList } from '@actions/booking/bookingConsultant.action'
import { getCategories } from '@actions/categories/categories.actions'
import { getMe } from '@actions/customers/customer.actions'
import BookingConsultant from '@components/booking/BookingConsultant'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const getData = async () => {
  const [categories, me, consultants] = await Promise.all([
    getCategories(1, 100, ''),
    getMe(),
    getConsultantList(1, 100)
  ])
  return { categories: categories ? categories.docs : [], me, consultants: consultants ? consultants.docs : [] }
}

const BookingConsultantPage = async () => {
  const token = cookies().get('accessToken')
  if (!token) redirect('/')

  const { categories, me, consultants } = await getData()

  return <BookingConsultant categories={categories} me={me} consultants={consultants} />
}
export default BookingConsultantPage
