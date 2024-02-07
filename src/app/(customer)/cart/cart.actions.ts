'use server'

import { callAuthApi } from '../../actions'
import { ICart, IDeteleCartItem, IUpdateCartQuantity } from './cart.interface'

const ROOT_ENDPOINT = '/carts'

export const getCart = async () => {
  try {
    return await callAuthApi<ICart>('get', ROOT_ENDPOINT)
  } catch (error) {
    console.log(error)
  }
}

export const updateCartQuantity = async (data: IUpdateCartQuantity) => {
  try {
    return await callAuthApi<any>('patch', ROOT_ENDPOINT, {}, data)
  } catch (error) {
    console.log(error)
  }
}

export const deteleCartItem = async (data: IDeteleCartItem) => {
  try {
    return await callAuthApi<any>('delete', ROOT_ENDPOINT, {}, data)
  } catch (error) {
    console.log(error)
  }
}
