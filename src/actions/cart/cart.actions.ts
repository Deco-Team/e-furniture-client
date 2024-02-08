'use server'

import { callAuthApi } from '@actions/actions'
import { ICart, IDeleteCartItem, IUpdateCartQuantity } from '@app/(customer)/cart/cart.interface'

const ROOT_ENDPOINT = '/carts'

export const getCart = async () => {
  try {
    const response = await callAuthApi<ICart>('get', ROOT_ENDPOINT)
    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateCartQuantity = async (data: IUpdateCartQuantity) => {
  try {
    return await callAuthApi<any>('patch', ROOT_ENDPOINT, {}, data)
  } catch (error) {
    console.log(error)
  }
}

export const deleteCartItem = async (data: IDeleteCartItem) => {
  try {
    return await callAuthApi<any>('delete', ROOT_ENDPOINT, {}, data)
  } catch (error) {
    console.log(error)
  }
}
