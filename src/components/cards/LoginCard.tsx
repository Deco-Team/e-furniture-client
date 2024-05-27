import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Divider, Input, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import { GoogleLogin } from '@react-oauth/google'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa'
import './style.css'
import { login, loginWithGoogle } from '@actions/auth/auth.action'
import { IGoogleLoginActionPayload, ILoginActionPayload } from '@actions/auth/auth.interface'
import { useAuth } from '@src/hooks/useAuth'
import { CustomerAuthActionTypes } from '@src/contexts/AuthContext'
import { getCustomer } from '@actions/customers/customer.actions'
import { getCart } from '@actions/cart/cart.actions'
import { useCart } from '@src/hooks/useCart'

interface LoginCardProps {
  toggleCard: () => void
}

const LoginCard = ({ toggleCard }: LoginCardProps) => {
  const router = useRouter()
  const { customerDispatch } = useAuth()
  const { setCart } = useCart()

  const [isVisibleLogin, setIsVisibleLogin] = useState(false)
  const toggleVisibilityLogin = () => setIsVisibleLogin(!isVisibleLogin)

  const initialLoginValues = {
    email: '',
    password: ''
  }

  const validationLogin = yup.object({
    email: yup.string().trim().email('Email không hợp lệ').required('Email không được để trống'),
    password: yup.string().trim().required('Mật khẩu không được để trống').min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
  })

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitted }
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { ...initialLoginValues },
    resolver: yupResolver(validationLogin),
    criteriaMode: 'all'
  })

  if (!customerDispatch) return null

  const loginSubmit = async (data: ILoginActionPayload) => {
    const result = await login(data)
    if (result) {
      const [customer, cart] = await Promise.all([getCustomer(), getCart()])
      if (!customer) {
        console.log('Login failed')
        setError('password', { type: 'loginFailed', message: 'Lỗi không thể đăng nhập' })
      } else {
        customerDispatch({ type: CustomerAuthActionTypes.LOGIN, payload: customer })
        setCart(cart)
        router.push('/')
        console.log('Login success')
      }
    } else {
      console.log('Login failed')
      setError('password', { type: 'loginFailed', message: 'Email hoặc mật khẩu không đúng' })
    }
  }

  const loginGoogle = async (data: IGoogleLoginActionPayload) => {
    const result = await loginWithGoogle(data)
    if (result) {
      const [customer, cart] = await Promise.all([getCustomer(), getCart()])
      if (customer) {
        customerDispatch({ type: CustomerAuthActionTypes.GOOGLE_LOGIN, payload: customer })
        setCart(cart)
        router.push('/')
        console.log('Login success')
        return
      }
    }

    console.log('Login failed')
    setError('password', { type: 'loginFailed', message: 'Lỗi không thể đăng nhập' })
  }

  return (
    <Card className='py-5 px-5 xs:px-7 xs:py-7 max-w-[32rem] w-[min(100%,32rem)] h-[40rem] justify-center absolute front'>
      <div className='w-full h-full flex flex-col items-center justify-center'>
        <Card className='bg-gray-200 w-full justify-items-start' shadow='none'>
          <CardHeader className='flex gap-4 p-6'>
            <Button isIconOnly as={NextLink} href='/'>
              <FaArrowLeft />
            </Button>
            <h2 className='font-bold text-2xl'>Trang chủ</h2>
          </CardHeader>
        </Card>
        <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
          <h1 className='w-full text-4xl font-bold text-center py-6'>Đăng nhập</h1>
        </CardHeader>
        <CardBody className='overflow-hidden py-2 px-1 xs:p-2'>
          <form className='flex flex-col items-center' action='POST' onSubmit={handleSubmit(loginSubmit)}>
            <Input
              variant='bordered'
              label='Email'
              className='mb-5'
              {...register('email')}
              isInvalid={errors.email || errors.password?.type === 'loginFailed' ? true : false}
              color={isSubmitted ? (errors.email ? 'danger' : 'success') : 'default'}
              errorMessage={errors.email?.message}
              isRequired
            />
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
              {...register('password')}
              isInvalid={errors.password ? true : false}
              color={isSubmitted ? (errors.password ? 'danger' : 'success') : 'default'}
              errorMessage={errors.password?.message}
              isRequired
            />
            {/* <Link className='mb-6 text-black cursor-pointer' underline='always'>
            Quên mật khẩu?
          </Link> */}
            <Button
              type='submit'
              disabled={isSubmitted && (errors.email || errors.password) ? true : false}
              className='w-full bg-[var(--light-orange-color)] font-semibold text-lg text-[var(--primary-orange-text-color)] h-14 mb-5 disabled:opacity-50 disabled:hover:opacity-50'
            >
              Đăng nhập
            </Button>
          </form>
          <Divider className='mb-5' />
          <div className='flex justify-center items-center'>
            <GoogleLogin
              onSuccess={(response) => {
                loginGoogle({ credential: response.credential ?? '' })
              }}
              onError={() => console.log('error')}
              text='signin_with'
              // useOneTap={true}
            />
          </div>
        </CardBody>
      </div>
      <p className='text-center absolute bottom-5 xs:bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap'>
        Chưa có tài khoản?{' '}
        <Link
          className='text-black cursor-pointer'
          underline='always'
          onClick={() => {
            reset()
            toggleCard()
          }}
        >
          Đăng ký
        </Link>
      </p>
    </Card>
  )
}
export default LoginCard
