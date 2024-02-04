'use server'

import { callApi } from './actions'

const ROOT_ENDPOINT_CATEGORIES = '/categories/customer'
const ROOT_ENDPOINT_PRODUCT = '/products/public'

export const getCategories = async (page: number, limit: number, sort: string) => {
  const endpoint = `${ROOT_ENDPOINT_CATEGORIES}?page=${page}&limit=${limit}&sort=${sort}`
  try {
    const response = await callApi('get', endpoint)

    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getProductList = async (page: number, limit: number, sort: string) => {
  const endpoint = `${ROOT_ENDPOINT_PRODUCT}?page=${page}&limit=${limit}&sort=${sort}`
  try {
    const response = await callApi('get', endpoint)

    return response.data
  } catch (error) {
    console.log(error)
  }
}
