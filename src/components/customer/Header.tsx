import React, { memo } from 'react'
import { Card, CardHeader, Button } from '@nextui-org/react'
import NextLink from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

const Header = memo(function Header() {
  return (
    <Card className='bg-gray-200 mb-8 md:p-6 w-full'>
      <CardHeader className='flex gap-4 p-6'>
        <Button isIconOnly as={NextLink} href='/'>
          <FaArrowLeft />
        </Button>
        <h2 className='font-bold text-2xl md:text-4xl'>Tài khoản của tôi</h2>
      </CardHeader>
    </Card>
  )
})

export default Header
