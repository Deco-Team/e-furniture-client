import React from 'react'
import { Button, Card, CardBody, CardHeader, Divider, Input, Link } from '@nextui-org/react'
import { GoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/navigation'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import * as yup from 'yup'
import './style.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { login, loginWithGoogle, registerCustomer } from '~/app/login-register/loginRegisterActions'
import { Login } from '~/global/interface'

interface RegisterCardProps {
  toggleCard: () => void
}

const RegisterCard = ({ toggleCard }: RegisterCardProps) => {
  const router = useRouter()

  const [isVisibleSignup, setIsVisibleSignup] = React.useState(false)
  const toggleVisibilitySignup = () => setIsVisibleSignup(!isVisibleSignup)

  const initialRegisterValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  const validationRegister = yup.object({
    firstName: yup.string().trim().required('Tên không được để trống'),
    lastName: yup.string().trim().required('Họ không được để trống'),
    email: yup
      .string()
      .trim()
      .email('Email không hợp lệ')
      .required('Email không được để trống')
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Email không hợp lệ'),
    password: yup
      .string()
      .trim()
      .required('Mật khẩu không được để trống')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/g,
        'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt'
      )
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
    defaultValues: { ...initialRegisterValues },
    resolver: yupResolver(validationRegister),
    criteriaMode: 'all'
  })

  const registerSubmit = async (data: any) => {
    const result = await registerCustomer(data)
    if (result) {
      console.log('Register success')
      const dataLogin: Login = {
        email: data.email,
        password: data.password
      }

      const loginResult = await login(dataLogin)
      if (loginResult) {
        router.push('/')
        console.log('Login success')
      } else {
        console.log('Login failed')
        setError('password', { type: 'loginFailed', message: 'Lỗi không thể đăng nhập' })
      }
      reset()
    } else {
      console.log('Register failed')
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
    <Card className='py-2 px-4 xs:px-7 xs:py-4 max-w-[30rem] max-h-[35rem] w-[min(100%,30rem)] h-[35rem] justify-center absolute back'>
      <div className='w-full flex flex-col items-center justify-center'>
        <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
          <h1 className='w-full text-4xl font-extrabold text-center pt-4 pb-8'>Đăng ký</h1>
        </CardHeader>
        <CardBody className='overflow-hidden py-2'>
          <form className='flex flex-col items-center' action='POST' onSubmit={handleSubmit(registerSubmit)}>
            <div className={`grid grid-cols-2 gap-5 ${!(errors.firstName || errors.lastName) && 'mb-5'}`}>
              <Input
                variant='bordered'
                label='Họ'
                {...register('lastName')}
                isInvalid={errors.lastName ? true : false}
                color={isSubmitted ? (errors.lastName ? 'danger' : 'success') : 'default'}
                errorMessage={errors.lastName?.message}
              />

              <Input
                variant='bordered'
                label='Tên'
                {...register('firstName')}
                isInvalid={errors.firstName ? true : false}
                color={isSubmitted ? (errors.firstName ? 'danger' : 'success') : 'default'}
                errorMessage={errors.firstName?.message}
              />
            </div>
            <Input
              variant='bordered'
              label='Email'
              className={`${!errors.email && 'mb-5'}`}
              {...register('email')}
              isInvalid={errors.email ? true : false}
              color={isSubmitted ? (errors.email ? 'danger' : 'success') : 'default'}
              errorMessage={errors.email?.message}
            />
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
              className={`${errors.password ? 'mb-1' : 'mb-4'}`}
              {...register('password')}
              isInvalid={errors.password ? true : false}
              color={isSubmitted ? (errors.password ? 'danger' : 'success') : 'default'}
              errorMessage={errors.password?.message}
            />
            <Button
              type='submit'
              disabled={
                isSubmitted && (errors.firstName || errors.lastName || errors.email || errors.password) ? true : false
              }
              className='w-full bg-[var(--light-orange-color)] font-extrabold text-[var(--primary-orange-text-color)] h-14 mb-4 disabled:opacity-50 disabled:hover:opacity-50'
            >
              Đăng ký
            </Button>
          </form>
          <Divider className='mb-4' />
          <div className='flex justify-center items-center mb-12'>
            <GoogleLogin
              onSuccess={(response) => {
                loginGoogle(response)
              }}
              onError={() => console.log('error')}
              text='signup_with'
              useOneTap={true}
            />
          </div>
        </CardBody>
      </div>
      <p className='mb-3 text-center absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap'>
        Đã có tài khoản?{' '}
        <Link
          className='text-black cursor-pointer'
          underline='always'
          onClick={() => {
            reset()
            toggleCard()
          }}
        >
          Đăng nhập
        </Link>
      </p>
    </Card>
  )
}
export default RegisterCard
