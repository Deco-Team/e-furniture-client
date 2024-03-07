import { getCategories } from '@actions/categories/categories.actions'
import { getMe } from '@actions/customers/customer.actions'
import BookingVisit from '@components/booking/BookingVisit'

const getData = async () => {
  const [categories, me] = await Promise.all([getCategories(1, 100, ''), getMe()])
  return { categories: categories ? categories.docs : [], me }
}

const BookingVistPage = async () => {
  const { categories, me } = await getData()

  return <BookingVisit categories={categories} me={me} />
}
export default BookingVistPage
