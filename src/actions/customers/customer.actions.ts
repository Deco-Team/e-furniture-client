'use server'

import { callAuthApi } from '@actions/actions'
import { ICustomer } from '@src/interface/customer.interface'
import { cookies } from 'next/headers'

const ROOT_ENDPOINT = '/customers'

export const getMe = async () => {
  const endpoint = `${ROOT_ENDPOINT}/me`
  const cookieStore = cookies()
  try {
    const response = await callAuthApi<ICustomer>({ method: 'get', endpoint }, cookieStore)
    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
