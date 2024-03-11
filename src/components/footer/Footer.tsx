'use client'

import { Button, Divider, Image, Input, Link, Textarea } from '@nextui-org/react'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const activePathname = usePathname()

  return (
    activePathname !== '/order' && (
      <footer className='flex max-sm:pb-24 flex-col items-center border-t-1'>
        <div className='max-w-screen-lg p-4 w-full grid grid-cols-1 sm:grid-cols-3 gap-8'>
          <div className='flex flex-col gap-8'>
            <Link href='/'>
              <Image removeWrapper radius='none' src='/logo.svg' alt='logo' className='!h-10' />
            </Link>
            <p>Lô E2a-7, Đường D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000</p>
          </div>
          <div className='grid grid-cols-2'>
            <div className='flex flex-col gap-8'>
              <p className='font-semibold'>Mục lục</p>
              <Link underline='hover' className='text-black' href={'/'}>
                Trang chủ
              </Link>
              <Link underline='hover' className='text-black' href={'/products'}>
                Sản phẩm
              </Link>
              <Link underline='hover' className='text-black' href={'/contact'}>
                Liên hệ
              </Link>
            </div>
            <div className='flex flex-col gap-8'>
              <p className='font-semibold'>Dịch vụ</p>
              <Link underline='hover' className='text-black' href={'/booking/visit'}>
                Đặt lịch tham quan
              </Link>
              <Link underline='hover' className='text-black' href={'/booking/consultant'}>
                Tư vấn thiết kế
              </Link>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <p className='font-semibold'>Tin nhắn</p>
            <div className='flex'>
              <div className='flex flex-col w-full'>
                <Input variant='flat' label='Tên' type='text' className='mb-4' />
                <Input variant='flat' label='Email' type='text' className='mb-4' />
                <Input variant='flat' label='Tiêu đề' type='text' className='mb-4' />
                <Textarea
                  variant='flat'
                  label='Nội dung'
                  type='text'
                  className='mb-4'
                  classNames={{
                    input: 'resize-y min-h-[50px]'
                  }}
                />
              </div>
              <Button variant='light' className='mt-3'>
                Gửi
              </Button>
            </div>
          </div>
          <Divider className='sm:col-span-3' />
          <p className='sm:col-span-3'>2024 Furnique. All rights reserved</p>
        </div>
      </footer>
    )
  )
}

export default Footer
