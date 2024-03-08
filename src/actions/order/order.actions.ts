'use server'

import { callAuthApi } from '@actions/actions'
import { IOrder, IOrderDetail, IOrderResponse, IOrderStatusHistory } from '@app/(customer)/order/order.interface'
import { cookies } from 'next/headers'
import { IPagination } from '@global/interface'

const ROOT_ENDPOINT = '/orders'

export const createOrder = async (data: IOrder) => {
  const endpoint = `${ROOT_ENDPOINT}/customer`
  const cookieStore = cookies()
  try {
    const response = await callAuthApi<{
      partnerCode: string
      requestId: string
      orderId: string
      amount: number
      responseTime: number
      message: string
      resultCode: number
      payUrl: string
      shortLink: string
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

export const getStatusHistory = async (id: string) => {
  const endpoint = `${ROOT_ENDPOINT}/customer/${id}/status-history`
  const cookieStore = cookies()
  try {
    const response = await callAuthApi<IOrderStatusHistory[]>({ method: 'get', endpoint }, cookieStore)
    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
