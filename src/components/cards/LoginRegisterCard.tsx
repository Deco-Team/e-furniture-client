'use client'

import * as React from 'react'
import { Button, Card, CardBody, CardHeader, Divider, Input, Link } from '@nextui-org/react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import GoogleButton from 'react-google-button'
import './style.css'

const LoginRegisterCard = () => {
  const [isVisibleLogin, setIsVisibleLogin] = React.useState(false)
  const toggleVisibilityLogin = () => setIsVisibleLogin(!isVisibleLogin)

  const [isVisibleSignup, setIsVisibleSignup] = React.useState(false)
  const toggleVisibilitySignup = () => setIsVisibleSignup(!isVisibleSignup)

  const [loginCard, setLoginCard] = React.useState(true)
  const toggleCard = () => setLoginCard(!loginCard)

  return (
    <div className={`relative w-[min(100%,30rem)] h-[40rem] flipper ${loginCard ? '' : 'flip'}`}>
      {/* login card */}
      <Card className='py-2 px-4 xs:px-7 xs:py-4 max-w-[30rem] max-h-[40rem] w-[min(100%,30rem)] relative h-[40rem] justify-center absolute front'>
        <div className='w-full flex flex-col items-center justify-center'>
          <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
            <h1 className='w-full text-4xl font-extrabold text-center py-8'>Đăng nhập</h1>
          </CardHeader>
          <CardBody className='overflow-hidden py-2'>
            <Input type='email' variant='bordered' label='Email' className='mb-5' />
            <Input
              label='Mật khẩu'
              variant='bordered'
              endContent={
                <button className='focus:outline-none my-auto' type='button' onClick={toggleVisibilityLogin}>
                  {isVisibleLogin ? (
                    <FaEye className='text-2xl text-default-400 pointer-events-none' />
                  ) : (
                    <FaEyeSlash className='text-2xl text-default-400 pointer-events-none' />
                  )}
                </button>
              }
              type={isVisibleLogin ? 'text' : 'password'}
              className='mb-5'
            />
            <Link className='mb-10 mx-auto text-black' underline='always'>
              Quên mật khẩu?
            </Link>
            <Button className='bg-[var(--light-orange-color)] font-extrabold text-md text-[var(--primary-orange-text-color)] h-14 mb-5'>
              Đăng nhập
            </Button>
            <Divider className='mb-5' />
            <GoogleButton type='light' label='Đăng nhập với Google' className='mx-auto mb-5 overflow-hidden' />
          </CardBody>
        </div>
        <p className='mb-3 text-center absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap'>
          Chưa có tài khoản?{' '}
          <Link className='text-black cursor-pointer' underline='always' onClick={toggleCard}>
            Đăng ký
          </Link>
        </p>
      </Card>

      {/* Register card */}
      <Card className='py-2 px-4 xs:px-7 xs:py-4 max-w-[30rem] max-h-[40rem] w-[min(100%,30rem)] h-[40rem] justify-center absolute back'>
        <div className='w-full flex flex-col items-center justify-center'>
          <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
            <h1 className='w-full text-4xl font-extrabold text-center py-8'>Đăng ký</h1>
          </CardHeader>
          <CardBody className='overflow-hidden py-2'>
            <div className='grid grid-cols-2 gap-5 mb-5'>
              <Input type='text' variant='bordered' label='Họ' />
              <Input type='text' variant='bordered' label='Tên' />
            </div>
            <Input type='email' variant='bordered' label='Email' className='mb-5' />
            <Input
              label='Mật khẩu'
              variant='bordered'
              endContent={
                <button className='focus:outline-none my-auto' type='button' onClick={toggleVisibilitySignup}>
                  {isVisibleSignup ? (
                    <FaEye className='text-2xl text-default-400 pointer-events-none' />
                  ) : (
                    <FaEyeSlash className='text-2xl text-default-400 pointer-events-none' />
                  )}
                </button>
              }
              type={isVisibleSignup ? 'text' : 'password'}
              className='mb-4'
            />
            <Button className='bg-[var(--light-orange-color)] font-extrabold text-md text-[var(--primary-orange-text-color)] h-14 mb-4'>
              Đăng ký
            </Button>
            <Divider className='mb-4' />
            <GoogleButton type='light' label='Đăng ký với Google' className='mx-auto mb-5 overflow-hidden' />
          </CardBody>
        </div>
        <p className='mb-3 text-center absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap'>
          Đã có tài khoản?{' '}
          <Link className='text-black cursor-pointer' underline='always' onClick={toggleCard}>
            Đăng nhập
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default LoginRegisterCard
