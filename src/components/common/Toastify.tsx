import React, { ReactNode } from 'react'
import { Slide, ToastContainer } from 'react-toastify'

const Toastify = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer transition={Slide} />
    </>
  )
}

export default Toastify
