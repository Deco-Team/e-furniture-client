'use server'

import { get, patch, post, put, remove } from '@utils/apiCaller'
import { cache } from 'react'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { AxiosError } from 'axios'

export interface IApiOptions {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  endpoint: string
  headers?: object
  params?: object
  body?: object
}

export const callApi = cache(
  async <T>({ method, endpoint, headers = {}, params = {}, body = {} }: IApiOptions): Promise<{ data: T }> => {
    try {
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
    } catch (err) {
      const error = err as AxiosError
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message)
      }
      console.log(error.config)
      throw error
    }
  }
)

export const callAuthApi = <T>(options: IApiOptions, cookies: ReadonlyRequestCookies): Promise<{ data: T }> => {
  const accessToken = cookies.get('accessToken')?.value

  if (!accessToken) {
    throw new Error('Unauthorized')
  }

  return callApi<T>({
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`
    }
  })
}
