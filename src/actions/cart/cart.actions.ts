'use server'

import { callAuthApi } from '@actions/actions'
import { IAddCartItem, ICart, IDeleteCartItem, IUpdateCartQuantity } from '@app/(customer)/cart/cart.interface'
import { cookies } from 'next/headers'

const ROOT_ENDPOINT = '/carts'

export const getCart = async () => {
  const cookieStore = cookies()
  try {
    const response = await callAuthApi<ICart>({ method: 'get', endpoint: ROOT_ENDPOINT }, cookieStore)
    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateCartQuantity = async (data: IUpdateCartQuantity) => {
  const cookieStore = cookies()
  try {
    return await callAuthApi<{ success: boolean }>(
      { method: 'patch', endpoint: ROOT_ENDPOINT, body: data },
      cookieStore
    )
  } catch (error) {
    console.log(error)
  }
}

export const deleteCartItem = async (data: IDeleteCartItem) => {
  const cookieStore = cookies()
  try {
    return await callAuthApi<{ success: boolean }>(
      { method: 'delete', endpoint: ROOT_ENDPOINT, body: data },
      cookieStore
    )
  } catch (error) {
    console.log(error)
  }
}

export const addCartItem = async (data: IAddCartItem) => {
  const cookieStore = cookies()
  try {
    return await callAuthApi<{ success: boolean }>({ method: 'post', endpoint: ROOT_ENDPOINT, body: data }, cookieStore)
  } catch (error) {
    console.log(error)
  }
}
