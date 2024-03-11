import { BookingStatusColor } from './consultant-booking.enum'

export interface IConsultantBookingResponse {
  _id: string
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  bookingDate: string
  bookingStatusColor: BookingStatusColor
  bookingStatus: string
  interestedCategories: [
    {
      _id: string
      name: string
      description: string
      image: string
    }
  ]
  consultant: {
    _id: string
    firstName: string
    lastName: string
    email: string
    staffCode: string
    phone: string
    avatar: string
    role: string
    status: string
    providerId: string
    createdBy: string
  }
  notes: string
}
