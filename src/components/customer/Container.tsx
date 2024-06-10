import React, { PropsWithChildren } from 'react'

const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className='max-w-screen-lg p-4 w-full'>
      <div className='w-full flex flex-col items-center justify-center'>{children}</div>
    </div>
  )
}

export default Container
