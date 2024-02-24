'use server'

import { callAuthApi } from '@actions/actions'
import { IOrder, IOrderDetail } from '@app/(customer)/order/order.interface'
import { cookies } from 'next/headers'

const ROOT_ENDPOINT = '/orders'

export const createOrder = async (data: IOrder) => {
  const endpoint = `${ROOT_ENDPOINT}/customer`
  const cookieStore = cookies()
  try {
    const response = await callAuthApi<{
      _id: true
    }>({ method: 'post', endpoint, body: data }, cookieStore)
    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getOrder = async (id: string) => {
  const endpoint = `${ROOT_ENDPOINT}/customer/${id}`
  const cookieStore = cookies()
  try {
    const response = await callAuthApi<IOrderDetail>({ method: 'get', endpoint }, cookieStore)
    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
