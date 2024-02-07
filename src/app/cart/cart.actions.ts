'use server'

import { callApi } from '~/action/actions'

const ROOT_ENDPOINT = '/carts'

export const getCart = async () => {
  try {
    const response = await callApi('get', ROOT_ENDPOINT)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
