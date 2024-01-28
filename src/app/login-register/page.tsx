import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import LoginRegisterCard from '~/components/cards/LoginRegisterCard'

const LoginRegisterPage = () => {
  const token = cookies().get('accessToken')
  if (token) redirect('/')

  return (
    <div className='bg-gray-200 flex items-center justify-center min-h-screen relative'>
      <LoginRegisterCard />
    </div>
  )
}

export default LoginRegisterPage
