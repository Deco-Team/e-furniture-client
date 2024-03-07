export interface IBookingVisit {
  customer: {
    _id?: string
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  bookingDate: Date
  interestedCategories: string[]
  notes: string
}
