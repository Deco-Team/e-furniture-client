import React from 'react'
import { Button, Card, CardBody, CardHeader, Divider, Input, Link } from '@nextui-org/react'
import { GoogleLogin } from '@react-oauth/google'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ILogin } from '~/global/interface'
import { useRouter } from 'next/navigation'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import './style.css'
import { login, loginWithGoogle } from '~/app/login-register/loginRegister.actions'

interface LoginCardProps {
  toggleCard: () => void
}

const LoginCard = ({ toggleCard }: LoginCardProps) => {
  const router = useRouter()

  const [isVisibleLogin, setIsVisibleLogin] = React.useState(false)
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
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { ...initialLoginValues },
    resolver: yupResolver(validationLogin),
    criteriaMode: 'all'
  })

  const loginSubmit = async (data: ILogin) => {
    const result = await login(data)
    if (result) {
      router.push('/')
      console.log('Login success')
    } else {
      console.log('Login failed')
      setError('password', { type: 'loginFailed', message: 'Email hoặc mật khẩu không đúng' })
    }
  }

  const loginGoogle = async (data: any) => {
    const result = await loginWithGoogle(data.credential)
    if (result) {
      router.push('/')
      console.log('Login success')
    } else {
      console.log('Login failed')
    }
  }

  return (
    <Card className='py-2 px-4 xs:px-7 xs:py-4 max-w-[30rem] max-h-[35rem] w-[min(100%,30rem)] h-[35rem] justify-center absolute front'>
      <div className='w-full flex flex-col items-center justify-center'>
        <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
          <h1 className='w-full text-4xl font-bold text-center pt-4 pb-8'>Đăng nhập</h1>
        </CardHeader>
        <CardBody className='overflow-hidden py-2'>
          <form className='flex flex-col items-center' action='POST' onSubmit={handleSubmit(loginSubmit)}>
            <Input
              variant='bordered'
              label='Email'
              className='mb-5'
              {...register('email')}
              isInvalid={errors.email || errors.password?.type === 'loginFailed' ? true : false}
              color={isSubmitted ? (errors.email ? 'danger' : 'success') : 'default'}
              errorMessage={errors.email?.message}
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
          <div className='flex justify-center items-center mb-12'>
            <GoogleLogin
              onSuccess={(response) => {
                loginGoogle(response)
              }}
              onError={() => console.log('error')}
              text='signin_with'
              useOneTap={true}
            />
          </div>
        </CardBody>
      </div>
      <p className='mb-3 text-center absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap'>
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
