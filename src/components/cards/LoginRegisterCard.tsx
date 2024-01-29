'use client'

import React from 'react'
import LoginCard from './LoginCard'
import RegisterCard from './RegisterCard'
import './style.css'

const LoginRegisterCard = () => {
  const [loginCard, setLoginCard] = React.useState(true)
  const toggleCard = () => setLoginCard(!loginCard)

  return (
    <div className={`relative w-[min(100%,30rem)] h-[35rem] flipper ${loginCard ? '' : 'flip'}`}>
      <LoginCard toggleCard={toggleCard} />
      <RegisterCard toggleCard={toggleCard} />
    </div>
  )
}

export default LoginRegisterCard
