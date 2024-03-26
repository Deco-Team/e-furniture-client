'use server'

import { callAuthApi } from '@actions/actions'
import { CustomerDto } from '@data/customer/customer.dto'
import { cookies } from 'next/headers'

const ROOT_ENDPOINT = '/customers'

export const getCustomer = async () => {
  const endpoint = `${ROOT_ENDPOINT}/me`
  const cookieStore = cookies()
  try {
    const response = await callAuthApi<CustomerDto>({ method: 'get', endpoint }, cookieStore)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
