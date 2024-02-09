'use server'

import { callApi } from '@actions/actions'
import { IProduct } from '@global/interface'

const ROOT_ENDPOINT_PRODUCT = '/products/public'
const ROOT_ENDPOINT_PRODUCT_DETAIL = '/products/public/slug'

export const getProductList = async (page: number, limit: number, sort?: string) => {
  const endpoint = `${ROOT_ENDPOINT_PRODUCT}?page=${page}&limit=${limit}${sort && `&sort=${sort}`}`
  try {
    const response = await callApi<{ docs: IProduct[] }>('get', endpoint)

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getProduct = async (slug: string) => {
  const endpoint = `${ROOT_ENDPOINT_PRODUCT_DETAIL}/${slug}`
  try {
    const response = await callApi<IProduct>('get', endpoint)

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
