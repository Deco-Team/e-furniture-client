import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  //TODO: Waiting for validate token function

  const token = cookies().get('accessToken')
  if (!token) redirect('/')

  return children
}

export default CustomerLayout
