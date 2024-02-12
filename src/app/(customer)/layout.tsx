import Toastify from '@components/common/Toastify'
import { AuthProvider } from '@src/contexts/AuthContext'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  //TODO: Waiting for validate token function

  const token = cookies().get('accessToken')
  if (!token) redirect('/')

  return (
    <Toastify>
      <AuthProvider>{children}</AuthProvider>
    </Toastify>
  )
}

export default CustomerLayout
