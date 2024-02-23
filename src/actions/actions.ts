'use server'

import { get, patch, post, put, remove } from '@utils/apiCaller'
import { cache } from 'react'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

export interface IApiOptions {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  endpoint: string
  headers?: object
  params?: object
  body?: object
}

export const callApi = cache(
  async <T>({ method, endpoint, headers = {}, params = {}, body = {} }: IApiOptions): Promise<{ data: T }> => {
    let response
    switch (method) {
      case 'post': {
        response = await post(endpoint, body, params, headers)
        break
      }
      case 'put': {
        response = await put(endpoint, body, params, headers)
        break
      }
      case 'delete': {
        response = await remove(endpoint, body, params, headers)
        break
      }
      case 'patch': {
        response = await patch(endpoint, body, params, headers)
        break
      }
      default: {
        response = await get(endpoint, params, headers)
      }
    }
    return response.data
  }
)

export const callAuthApi = <T>(options: IApiOptions, cookies: ReadonlyRequestCookies): Promise<{ data: T }> => {
  const accessToken = cookies.get('accessToken')?.value ?? ''
  return callApi<T>({
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`
    }
  })
}
