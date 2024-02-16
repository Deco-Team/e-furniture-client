'use server'

import { callAuthApi } from '@actions/actions'
import { IOrder } from '@app/(customer)/order/order.interface'
import { notifyLoading } from '@utils/toastify'

const ROOT_ENDPOINT = '/orders'

export const createOrder = async (data: IOrder) => {
  const endpoint = `${ROOT_ENDPOINT}/customer`
  try {
    const response = await callAuthApi<{
      _id: true
    }>('post', endpoint, {}, data, {})
    notifyLoading()
    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
