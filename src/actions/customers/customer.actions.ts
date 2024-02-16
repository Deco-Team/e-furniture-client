'use server'

import { callAuthApi } from '@actions/actions'
import { ICustomer } from '@src/interface/customer.intefaces'

const ROOT_ENDPOINT = '/customers'

export const getMe = async () => {
  const endpoint = `${ROOT_ENDPOINT}/me`

  try {
    const response = await callAuthApi<ICustomer>('get', endpoint)
    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
