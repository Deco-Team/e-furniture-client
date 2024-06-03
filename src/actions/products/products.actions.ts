'use server'

import { callApi } from '@actions/actions'
import { IPagination, IProduct, IProductResponse } from '@global/interface'
import { Key } from 'react'

const ROOT_ENDPOINT_PRODUCT = '/products/public'
const ROOT_ENDPOINT_PRODUCT_DETAIL = '/products/public/slug'

export const getProductList = async (page: number, limit: number, categories?: Key[], sort?: string) => {
  const endpoint = `${ROOT_ENDPOINT_PRODUCT}?${categories?.length ? 'categories=' + Array.from(categories).join('&categories=') + '&' : ''}page=${page}&limit=${limit}${sort ? `&sort=${sort}` : ''}`
  try {
    const response = await callApi<{ docs: IProduct[] }>({ method: 'get', endpoint })

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getProductsForPage = async (
  page: number,
  limit: number,
  fromto?: any | number[],
  sort?: string,
  categories?: Key[],
  name?: string
) => {
  const endpoint = `${ROOT_ENDPOINT_PRODUCT}?${name ? 'name=' + name + '&' : ''}${categories?.length ? 'categories=' + Array.from(categories).join('&categories=') + '&' : ''}${fromto ? `fromPrice=${fromto[0]}&toPrice=${fromto[1]}&` : ''}page=${page}&limit=${limit}${sort ? `&sort=${sort}` : ''}`
  try {
    const response = await callApi<IPagination<IProductResponse>>({ method: 'get', endpoint })

    return response.data
  } catch (error) {
    console.log(error)
    return error as Error
  }
}

export const getProduct = async (slug: string) => {
  const endpoint = `${ROOT_ENDPOINT_PRODUCT_DETAIL}/${slug}`
  try {
    const response = await callApi<IProduct>({ method: 'get', endpoint })

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
