'use server'

import { callApi } from './actions'

const ROOT_ENDPOINT = '/categories/customer'

export const getCategories = async (page: number, limit: number, sort: string) => {
  const endpoint = `${ROOT_ENDPOINT}?page=${page}&limit=${limit}&sort=${sort}`
  try {
    const response = await callApi('get', endpoint)

    return response.data
  } catch (error) {
    console.log(error)
  }
}
