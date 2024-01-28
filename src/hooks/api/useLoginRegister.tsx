import React from 'react'
import useApi from '../useApi'
import { Login, Register } from '~/global/interface'

const useLoginRegisterApi = () => {
  const callApi = useApi()
  const rootEndpoint = 'auth/customer'

  const login = React.useCallback(
    async (data: Login) => {
      const endpoint = `${rootEndpoint}/login`
      try {
        const response = await callApi('post', endpoint, {}, {}, data)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const register = React.useCallback(
    async (data: Register) => {
      const endpoint = `${rootEndpoint}/register`
      try {
        const response = await callApi('post', endpoint, {}, {}, data)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  return { login, register }
}

export default useLoginRegisterApi
