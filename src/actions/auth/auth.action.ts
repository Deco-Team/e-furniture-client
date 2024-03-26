'use server'
import { callApi } from '@actions/actions'
import { cookies } from 'next/headers'
import { JwtPayload, decode } from 'jsonwebtoken'
import {
  IGoogleLoginActionPayload,
  ILoginActionData,
  ILoginActionPayload,
  IRegisterActionPayload
} from './auth.interface'

const ROOT_ENDPOINT = '/auth/customer'

const setToken = (token: string) => {
  const decodedToken = decode(token) as JwtPayload

  cookies().set('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: decodedToken.exp ? decodedToken.exp * 1000 : 60 * 60 * 24 * 7
  })
}

export const login = async (payload: ILoginActionPayload) => {
  const endpoint = `${ROOT_ENDPOINT}/login`
  try {
    const { data } = await callApi<ILoginActionData>({ method: 'post', endpoint, body: payload })
    setToken(data.accessToken)

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const loginWithGoogle = async (payload: IGoogleLoginActionPayload) => {
  const endpoint = `${ROOT_ENDPOINT}/google`
  try {
    const { data } = await callApi<ILoginActionData>({ method: 'post', endpoint, body: { token: payload.credential } })
    setToken(data.accessToken)

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const registerCustomer = async (payload: IRegisterActionPayload) => {
  const endpoint = `${ROOT_ENDPOINT}/register`
  try {
    await callApi({ method: 'post', endpoint, body: payload })

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const logout = () => {
  cookies().delete('accessToken')
}
