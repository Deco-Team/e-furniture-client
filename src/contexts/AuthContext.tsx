'use client'

import { getMe } from '@actions/customers/customer.actions'
import { ICustomer } from '@src/interface/customer.interface'
import { ReactNode, createContext, useEffect, useState } from 'react'

const initialContext: ICustomer = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: [],
  dateOfBirth: new Date(),
  gender: '',
  avatar: '',
  lastLoginDate: new Date(),
  googleUserId: ''
}

export const AuthContext = createContext<ICustomer>(initialContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [me, setMe] = useState<ICustomer>(initialContext)

  const getData = async () => {
    const me = (await getMe()) || initialContext
    setMe(me)
  }

  useEffect(() => {
    getData()
    return () => {}
  }, [])

  return <AuthContext.Provider value={me}>{children}</AuthContext.Provider>
}

export default AuthProvider
