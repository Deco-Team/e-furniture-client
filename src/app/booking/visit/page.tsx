import { getCategories } from '@actions/categories/categories.actions'
import BookingVisit from '@components/booking/BookingVisit'

const getData = async () => {
  const categories = await getCategories(1, 100, '')
  return { categories: categories ? categories.docs : [] }
}

const BookingVisitPage = async () => {
  const { categories } = await getData()

  return <BookingVisit categories={categories} />
}
export default BookingVisitPage
