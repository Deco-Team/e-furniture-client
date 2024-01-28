'use client'

import React from 'react'
import LoginRegisterCard from '~/components/cards/LoginRegisterCard'
import ProgressLoading from '~/components/loading/ProgressLoading'

const LoginRegisterPage = () => {
  const [loading, setLoading] = React.useState(false)
  return (
    <div className='bg-gray-200 flex items-center justify-center min-h-screen overflow-hidden relative'>
      {loading && <ProgressLoading />}
      <LoginRegisterCard setLoading={setLoading} />
    </div>
  )
}

export default LoginRegisterPage
