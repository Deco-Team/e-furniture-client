import { Button, Image } from '@nextui-org/react'
import NextLink from 'next/link'
import React from 'react'

const OrderSuccessPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <Image width={500} height={400} src='/orderSuccess.svg' alt='success' />
      <h1 className='font-semibold text-3xl pb-4 text-center'>Đặt hàng thành công!</h1>
      <h1 className='font-medium text-xl pb-4 text-center'>
        Đơn hàng của bạn đang được xử lí. Hãy tiếp tục mua sắm nhé!
      </h1>
      <Button as={NextLink} href='/' className='bg-[var(--primary-orange-color)] text-white px-10 py-3 rounded-full'>
        Quay lại trang chủ
      </Button>
    </div>
  )
}

export default OrderSuccessPage
