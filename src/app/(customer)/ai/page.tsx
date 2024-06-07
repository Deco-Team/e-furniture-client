import React from 'react'
import TextToImageForm from '@components/ai/TextToImageForm'
import { Button } from '@nextui-org/react'
import { FaArrowLeft } from 'react-icons/fa'
import NextLink from 'next/link'

export const maxDuration = 30

const AIPage = () => {
  return (
    <main className='min-h-screen bg-gray-100 py-10'>
      <div className='p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md'>
        <div className='relative py-4 mb-4'>
          <Button
            isIconOnly
            radius='full'
            className='absolute top-1/2 -translate-y-1/2 bg-white'
            as={NextLink}
            href='/'
          >
            <FaArrowLeft />
          </Button>
          <h1 className='text-3xl font-bold text-center'>Furnique AI</h1>
        </div>
        <TextToImageForm />
      </div>
    </main>
  )
}

export default AIPage
