'use server'

import { Login } from '~/global/interface'
import { callApi } from '../actions'
import { cookies } from 'next/headers'

const rootEndpoint = '/auth/customer'

export const login = async (data: Login) => {
  const endpoint = `${rootEndpoint}/login`
  try {
    const response = await callApi('post', endpoint, {}, {}, data)
    cookies().set('accessToken', response.data.accessToken, { httpOnly: true })

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const loginWithGoogle = async (credential: string) => {
  const endpoint = `${rootEndpoint}/google`
  try {
    const response = await callApi('post', endpoint, {}, {}, { token: credential })
    cookies().set('accessToken', response.data.accessToken, { httpOnly: true })

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
