import { callApi } from '@actions/actions'
import { IBookingVisit } from '@app/booking/visit/bookingVisit.interface'

const ROOT_ENDPOINT = '/visit-showroom-bookings/customer'

const bookingVisit = async (bookingData: IBookingVisit) => {
  const endpoint = `${ROOT_ENDPOINT}`
  try {
    await callApi({ method: 'post', endpoint, body: bookingData })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
export default bookingVisit
