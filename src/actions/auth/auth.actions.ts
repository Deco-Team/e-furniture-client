'use server'

import { ILogin, IRegister } from '@global/interface'
import { callApi } from '@actions/actions'
import { cookies } from 'next/headers'
import { JwtPayload, decode } from 'jsonwebtoken'

const ROOT_ENDPOINT = '/auth/customer'

interface LoginResponseData {
  accessToken: string
  refreshToken: string
}

const setToken = (token: string) => {
  const decodedToken = decode(token) as JwtPayload

  cookies().set('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: decodedToken.exp ? decodedToken.exp * 1000 : 60 * 60 * 24 * 7
  })
}

export const login = async (loginData: ILogin) => {
  const endpoint = `${ROOT_ENDPOINT}/login`
  try {
    const { data } = await callApi({ method: 'post', endpoint, body: loginData })
    setToken((data as LoginResponseData).accessToken)

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const loginWithGoogle = async (credential: string) => {
  const endpoint = `${ROOT_ENDPOINT}/google`
  try {
    const { data } = await callApi({ method: 'post', endpoint, body: { token: credential } })
    setToken((data as LoginResponseData).accessToken)

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const registerCustomer = async (data: IRegister) => {
  const endpoint = `${ROOT_ENDPOINT}/register`
  try {
    await callApi({ method: 'post', endpoint, body: data })

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const logout = () => {
  cookies().delete('accessToken')
}
