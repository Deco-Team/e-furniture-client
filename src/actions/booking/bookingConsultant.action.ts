'use server'

import { callAuthApi } from '@actions/actions'
import { IBookingConsultant, IConsultant } from '@app/(customer)/booking/consultant/bookingConsultant.interface'
import { cookies } from 'next/headers'
import { IPagination } from './../../global/interface'
import { IConsultantBookingResponse } from '@app/(customer)/customer/bookings/consultants/consultant-booking.interface'

const CONSULTANT_ENDPOINT = '/staff/consultant'
const ROOT_ENDPOINT = '/consultant-bookings/customer'

export const getConsultantList = async (page: number, limit: number, sort?: string) => {
  const cookieStore = cookies()
  const endpoint = `${CONSULTANT_ENDPOINT}?page=${page}&limit=${limit}${sort ? `&sort=${sort}` : ''}`

  try {
    const response = await callAuthApi<{ docs: IConsultant[] }>({ method: 'get', endpoint: endpoint }, cookieStore)
    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const bookingConsultant = async (data: IBookingConsultant) => {
  console.log(data)
  const cookieStore = cookies()
  try {
    return await callAuthApi<{ success: boolean }>({ method: 'post', endpoint: ROOT_ENDPOINT, body: data }, cookieStore)
  } catch (error) {
    console.log(error)
  }
}

export const getConsultantBookingList = async (page: number, limit: number, sort?: string) => {
  const cookieStore = cookies()
  const endpoint = `${ROOT_ENDPOINT}?page=${page}&limit=${limit}${sort ? `&sort=${sort}` : ''}`

  try {
    const response = await callAuthApi<IPagination<IConsultantBookingResponse>>(
      { method: 'get', endpoint: endpoint },
      cookieStore
    )
    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
