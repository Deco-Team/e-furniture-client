import React from 'react'
import { Button, Card, CardBody, CardHeader, Divider, Input, Link } from '@nextui-org/react'
import { GoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/navigation'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import './style.css'

interface RegisterCardProps {
  toggleCard: () => void
}

const RegisterCard = ({ toggleCard }: RegisterCardProps) => {
  const router = useRouter()

  const [isVisibleSignup, setIsVisibleSignup] = React.useState(false)
  const toggleVisibilitySignup = () => setIsVisibleSignup(!isVisibleSignup)

  return (
    <Card className='py-2 px-4 xs:px-7 xs:py-4 max-w-[30rem] max-h-[35rem] w-[min(100%,30rem)] h-[35rem] justify-center absolute back'>
      <div className='w-full flex flex-col items-center justify-center'>
        <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
          <h1 className='w-full text-4xl font-extrabold text-center pt-4 pb-8'>Đăng ký</h1>
        </CardHeader>
        <CardBody className='overflow-hidden py-2'>
          <form className='flex flex-col items-center'>
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
            <Button className='w-full bg-[var(--light-orange-color)] font-extrabold text-[var(--primary-orange-text-color)] h-14 mb-4'>
              Đăng ký
            </Button>
          </form>
          <Divider className='mb-4' />
          <div className='flex justify-center items-center mb-12'>
            <GoogleLogin
              onSuccess={(response) => {
                localStorage.setItem('accessToken', response.credential as string)
                router.push('/')
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
        <Link className='text-black cursor-pointer' underline='always' onClick={toggleCard}>
          Đăng nhập
        </Link>
      </p>
    </Card>
  )
}
export default RegisterCard
