'use client'

import { login, loginWithGoogle, logout } from '@actions/auth/auth.action'
import { IGoogleLoginActionPayload, ILoginActionPayload } from '@actions/auth/auth.interface'
import { getCart } from '@actions/cart/cart.actions'
import { getCustomer } from '@actions/customers/customer.actions'
import { CustomerDto } from '@data/customer/customer.dto'
import { useCart } from '@src/hooks/useCart'
import { PropsWithChildren, createContext, useEffect, useState, useReducer, Dispatch } from 'react'

export enum CustomerAuthActionTypes {
  'LOGIN',
  'GOOGLE_LOGIN',
  'LOGOUT'
}

type LoginAction = {
  type: CustomerAuthActionTypes.LOGIN | CustomerAuthActionTypes.GOOGLE_LOGIN
  payload: CustomerDto
}

type LogoutAction = {
  type: CustomerAuthActionTypes.LOGOUT
}

type CustomerAuthAction = LoginAction | LogoutAction

type CustomerAuthState = CustomerDto | null

const customerAuthReducer = (prevState: CustomerAuthState, action: CustomerAuthAction): CustomerAuthState => {
  switch (action.type) {
    case CustomerAuthActionTypes.LOGIN: {
      const { payload } = action as LoginAction
      return { ...payload }
    }
    case CustomerAuthActionTypes.GOOGLE_LOGIN: {
      const { payload } = action as LoginAction
      return { ...payload }
    }
    case CustomerAuthActionTypes.LOGOUT:
      return null
    default:
      return { ...prevState }
  }
}

export const AuthContext = createContext<{
  state: { customer: CustomerAuthState | null }
  customerDispatch: Dispatch<CustomerAuthAction> | null
}>({
  state: { customer: null },
  customerDispatch: null
})

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true)
  const [customerState, customerDispatch] = useReducer(customerAuthReducer, null)
  const { clearCart, setCart } = useCart()

  useEffect(() => {
    ;(async () => {
      const [customer, cart] = await Promise.all([getCustomer(), getCart()])
      if (!customer) {
        customerDispatch({ type: CustomerAuthActionTypes.LOGOUT })
        clearCart()
      } else {
        customerDispatch({ type: CustomerAuthActionTypes.LOGIN, payload: customer })
        setCart(cart)
      }
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={{ state: { customer: customerState }, customerDispatch }}>
      {!loading ? children : null}
    </AuthContext.Provider>
  )
}

export default AuthProvider
