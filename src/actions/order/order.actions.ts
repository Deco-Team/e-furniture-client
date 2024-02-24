'use server'

import { callAuthApi } from '@actions/actions'
import { cookies } from 'next/headers'
import { IOrder, IOrderDetail, IOrderResponse } from '@app/(customer)/order/order.interface'
import { IPagination } from '@global/interface'

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

export const getOrderList = async (page: number, limit: number, sort?: string) => {
  const endpoint = `${ROOT_ENDPOINT}/customer?page=${page}&limit=${limit}${sort ? `&sort=${sort}` : ''}`
  const cookieStore = cookies()
  try {
    const response = await callAuthApi<IPagination<IOrderResponse>>(
      {
        method: 'get',
        endpoint: endpoint
      },
      cookieStore
    )
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
