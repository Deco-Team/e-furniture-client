import React from 'react'
import TextToImageForm from '@components/ai/TextToImageForm'

const AIPage = () => {
  return (
    <main className='my-10'>
      <div className='p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold text-center mb-5'>Furnique AI</h1>
        <TextToImageForm />
      </div>
    </main>
  )
}

export default AIPage
