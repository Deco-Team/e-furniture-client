'use client'

import { Button, Divider, Image, Input, Link, Textarea } from '@nextui-org/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const activePathname = usePathname()

  return (
    activePathname !== '/order' && (
      <footer className='flex max-sm:pb-24 flex-col items-center border-t-1'>
        <div className='max-w-screen-lg p-4 pt-12 w-full grid grid-cols-1 sm:grid-cols-4 gap-8'>
          <div className='flex flex-col gap-4'>
            <NextLink href='/'>
              <Image removeWrapper radius='none' src='/logo.svg' alt='logo' className='!h-10' />
            </NextLink>
            <p>Lô E2a-7, Đường D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000</p>
          </div>
          <div className='flex flex-col gap-8 max-sm:hidden'>
            <div className='flex flex-col gap-4'>
              <p className='font-semibold uppercase'>Mục lục</p>
              <div className='flex flex-col gap-2'>
                <Link underline='hover' as={NextLink} className='text-black' href={'/'}>
                  Trang chủ
                </Link>
                <Link as={NextLink} underline='hover' className='text-black' href={'/products'}>
                  Sản phẩm
                </Link>
                <Link as={NextLink} underline='hover' className='text-black' href={'/contact'}>
                  Liên hệ
                </Link>
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <p className='font-semibold uppercase'>Dịch vụ</p>
              <div className='flex flex-col gap-2'>
                <Link as={NextLink} underline='hover' className='text-black' href={'/booking/visit'}>
                  Đặt lịch tham quan
                </Link>
                <Link as={NextLink} underline='hover' className='text-black' href={'/booking/consultant'}>
                  Tư vấn thiết kế
                </Link>
                <Link as={NextLink} underline='hover' className='text-black' href={'/ai'}>
                  Furnique AI
                </Link>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4 max-sm:hidden'>
            <p className='font-semibold uppercase'>Thanh toán</p>
            <div className='flex gap-4 max-sm:flex-col'>
              <div className='w-4/5 sm:w-1/2 h-10 shadow-small'>
                <Image
                  removeWrapper
                  radius='none'
                  src='/momo.png'
                  alt='momo logo'
                  className='w-full h-full object-contain'
                />
              </div>
              <div className='w-4/5 sm:w-1/2 h-10 shadow-small'>
                <Image
                  removeWrapper
                  radius='none'
                  src='/payos.png'
                  alt='payos logo'
                  className='w-full h-full object-contain p-2'
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4 max-sm:hidden'>
            <p className='font-semibold uppercase'>Theo dõi chúng mình trên</p>
            <div className='flex items-center'>
              <FaFacebook className='w-5 h-5 mr-2' />
              <Link as={NextLink} underline='hover' className='text-black' href={'https://s.net.vn/cg9f'}>
                Facebook
              </Link>
            </div>
            <div className='flex items-center'>
              <FaInstagram className='w-5 h-5 mr-2' />
              <Link
                as={NextLink}
                underline='hover'
                className='text-black'
                href={'https://www.instagram.com/furnique.connect/'}
              >
                Instagram
              </Link>
            </div>
          </div>
          <Divider className='max-sm:hidden sm:col-span-4' />
          <p className='sm:col-span-4'>&copy; 2024 Furnique. Tất cả các quyền được bảo lưu.</p>
        </div>
      </footer>
    )
  )
}

export default Footer
