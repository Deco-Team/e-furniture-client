export interface IBookingConsultant {
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  bookingDate: Date
  interestedCategories: string[]
  consultantId: string
  notes: string
}

export interface IConsultant {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string
}
