'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardHeader, Input, Textarea } from '@nextui-org/react'
import { notifySuccess } from '@utils/toastify'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { FaArrowLeft, FaClock, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import * as yup from 'yup'

const ContactPage = () => {
  const initialValues = {
    name: '',
    email: '',
    subject: '',
    content: ''
  }

  const validationObject = yup.object({
    name: yup.string().required('Vui lòng nhập tên của bạn'),
    email: yup
      .string()
      .email('Vui lòng nhập email hợp lệ')
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Vui lòng nhập email hợp lệ')
      .required('Vui lòng nhập email của bạn'),
    subject: yup.string().required('Vui lòng nhập tiêu đề'),
    content: yup.string().required('Vui lòng nhập nội dung')
  })

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { ...initialValues },
    resolver: yupResolver(validationObject),
    criteriaMode: 'all'
  })

  const handleSubmitForm = async (data: typeof initialValues) => {
    console.log(data)
    await setTimeout(() => {
      reset()
      clearErrors()
      notifySuccess('Gửi thành công')
    }, 2000)
  }

  return (
    <main className='flex pb-24 flex-col items-center'>
      <div className='max-w-screen-lg p-4 w-full'>
        <Card className='bg-gray-200 mb-8 md:p-6'>
          <CardHeader className='flex gap-4 p-6'>
            <Button isIconOnly as={NextLink} href='/'>
              <FaArrowLeft />
            </Button>
            <h2 className='font-bold text-2xl md:text-4xl'>Liên hệ</h2>
          </CardHeader>
        </Card>
        <div className='mb-8'>
          <h2 className='md:text-2xl text-xl font-bold text-center mb-2'>Thông tin liên hệ</h2>
          <h3 className='md:text-lg text-center'>
            Để biết thêm thông tin về nội thất hãy vui lòng gửi email cho chúng tôi theo mẫu dưới đây.
            <br />
            Chúng tôi luôn lắng nghe và sẵn lòng hỗ trợ bạn.
          </h3>
        </div>
        <div className='sm:grid sm:grid-cols-5 gap-4'>
          <div className='flex flex-col gap-8 mb-8 col-span-2'>
            <div className='flex flex-row max-w-unit-8xl gap-4 items-center'>
              <FaMapMarkerAlt className='md:min-w-14 md:min-h-14 min-h-12 min-w-12 md:p-4 p-3 rounded-full text-white bg-[var(--primary-orange-color)]' />
              <div>
                <h4 className='md:text-lg font-semibold'>Địa chỉ</h4>
                <h5 className='max-md:text-sm'>
                  Lô E2a-7, Đường D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000
                </h5>
              </div>
            </div>
            <div className='flex flex-row max-w-unit-8xl gap-4 items-center'>
              <FaPhoneAlt className='md:min-w-14 md:min-h-14 min-h-12 min-w-12 md:p-4 p-3 rounded-full text-white bg-[var(--primary-orange-color)]' />
              <div className='max-w-full overflow-hidden'>
                <h4 className='md:text-lg font-semibold'>Liên hệ</h4>
                <h5 className='max-md:text-sm text-nowrap overflow-hidden text-ellipsis whitespace-nowrap'>
                  contact@furnique.tech
                  <br />
                  +(84) 987-654-321
                </h5>
              </div>
            </div>
            <div className='flex flex-row max-w-unit-8xl gap-4 items-center'>
              <FaClock className='md:min-w-14 md:min-h-14 min-h-12 min-w-12 md:p-4 p-3 rounded-full text-white bg-[var(--primary-orange-color)]' />
              <div>
                <h4 className='md:text-lg font-semibold'>Giờ làm việc</h4>
                <h5 className='max-md:text-sm'>
                  T2-T6: 7:00 - 21:00
                  <br />
                  T7-CN: 7:00 - 20:00
                </h5>
              </div>
            </div>
          </div>
          <div className='col-span-3'>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <div className='flex flex-col items-center'>
                <div className='md:col-span-2 max-sm:px-0 w-full'>
                  <h3 className='font-semibold md:text-lg mb-4'>Tên của bạn</h3>
                  <Input
                    variant='bordered'
                    label='Tên'
                    type='text'
                    className='mb-4'
                    isRequired
                    {...register('name')}
                    isInvalid={errors.name ? true : false}
                    errorMessage={errors.name?.message}
                    color={errors.name ? 'danger' : 'default'}
                  />
                  <h3 className='font-semibold md:text-lg mb-4'>Email</h3>
                  <Input
                    variant='bordered'
                    label='Email'
                    type='email'
                    className='mb-4'
                    isRequired
                    {...register('email')}
                    isInvalid={errors.email ? true : false}
                    errorMessage={errors.email?.message}
                    color={errors.email ? 'danger' : 'default'}
                  />
                  <h3 className='font-semibold md:text-lg mb-4'>Tiêu đề</h3>
                  <Input
                    variant='bordered'
                    label='Tiêu đề'
                    type='text'
                    className='mb-4'
                    isRequired
                    {...register('subject')}
                    isInvalid={errors.subject ? true : false}
                    errorMessage={errors.subject?.message}
                    color={errors.subject ? 'danger' : 'default'}
                  />
                  <h3 className='font-semibold md:text-lg mb-4'>Điều bạn thắc mắc</h3>
                  <Textarea
                    variant='bordered'
                    className='mb-4'
                    label='Nội dung'
                    disableAutosize
                    classNames={{
                      input: 'resize-y min-h-[150px]'
                    }}
                    isRequired
                    {...register('content')}
                    isInvalid={errors.content ? true : false}
                    errorMessage={errors.content?.message}
                    color={errors.content ? 'danger' : 'default'}
                  />
                </div>
                <Button
                  type='submit'
                  className='w-1/4 bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)] font-bold disabled:opacity-50 disabled:hover:opacity-50 disabled:cursor-not-allowed'
                  size='lg'
                  isDisabled={Object.keys(errors).length > 0}
                >
                  Gửi
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
export default ContactPage
