'use server'

import { callApi } from '../actions'

const ROOT_ENDPOINT = '/carts'

export const getCart = async () => {
  try {
    const response = await callApi('get', ROOT_ENDPOINT)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
