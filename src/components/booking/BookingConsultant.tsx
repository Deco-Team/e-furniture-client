'use client'

import { bookingConsultant } from '@actions/booking/bookingConsultant.action'
import { IBookingConsultant, IConsultant } from '@app/(customer)/booking/consultant/bookingConsultant.interface'
import { ICategory } from '@global/interface'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Textarea
} from '@nextui-org/react'
import NextLink from 'next/link'
import { useAuth } from '@src/hooks/useAuth'
import { notifyError, notifySuccess } from '@utils/toastify'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { Key } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowLeft } from 'react-icons/fa'
import * as yup from 'yup'

interface BookingConsultantProps {
  categories: ICategory[]
  consultants: IConsultant[]
}

const BookingConsultant = ({ categories, consultants }: BookingConsultantProps) => {
  const [date, setDate] = React.useState(moment().format('YYYY-MM-DD'))
  const [time, setTime] = React.useState(0)
  const [interestedCategories, setInterestedCategories] = React.useState([])
  const [consultantId, setConsultantId] = React.useState('')
  const router = useRouter()
  const {
    state: { customer }
  } = useAuth()

  const initialValues = {
    customer: {
      firstName: customer?.firstName ?? '',
      lastName: customer?.lastName ?? '',
      email: customer?.email ?? '',
      phone: customer?.phone ?? ''
    },
    time: time,
    notes: ''
  }

  const phoneRegExp = /^(\+?[1-9]\d{0,3}[ \-]*)?(?:\([0-9]{2,}\)[ \-]*)?([0-9][ \-]*){10}$/

  const validationObject = yup.object({
    customer: yup.object({
      firstName: yup.string().required('Vui lòng nhập tên của bạn'),
      lastName: yup.string().required('Vui lòng nhập họ của bạn'),
      email: yup
        .string()
        .email('Vui lòng nhập email hợp lệ')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Vui lòng nhập email hợp lệ')
        .required('Vui lòng nhập email của bạn'),
      phone: yup
        .string()
        .required('Vui lòng nhập số điện thoại của bạn')
        .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    }),
    time: yup.number().required('Vui lòng chọn thời gian bạn muốn đặt'),
    category: yup.string().required('Vui lòng chọn danh mục bạn quan tâm'),
    consultantId: yup.string().required('Vui lòng chọn tư vấn viên'),
    notes: yup.string()
  })

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { ...initialValues },
    resolver: yupResolver(validationObject),
    criteriaMode: 'all'
  })

  const onSubmit = async (data: any) => {
    if (time === 0) {
      setError('time', { message: 'Vui lòng chọn thời gian bạn muốn đặt' })
      return
    }
    const bookingDate = `${date} ${time}:00:00`
    const booking: IBookingConsultant = {
      customer: {
        firstName: data.customer.firstName,
        lastName: data.customer.lastName,
        email: data.customer.email,
        phone: data.customer.phone
      },
      bookingDate: new Date(moment(bookingDate, 'YYYY-MM-DD HH:mm:ss').utc().toISOString()),
      interestedCategories: Array.from(interestedCategories),
      consultantId: consultantId,
      notes: data.notes
    }
    await handleBooking(booking)
  }

  const handleBooking = async (data: IBookingConsultant) => {
    const result = await bookingConsultant(data)
    if (result) {
      notifySuccess('Đặt lịch thành công')
      setDate(moment().format('YYYY-MM-DD'))
      setTime(0)
      setInterestedCategories([])
      setConsultantId('')
      clearErrors()
      reset()
      router.push('/')
    } else {
      notifyError('Đặt lịch thất bại')
    }
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(0)
    if (e.target.value) {
      if (moment(e.target.value, 'YYYY-MM-DD').isBefore(moment(), 'day')) {
        setDate(moment().format('YYYY-MM-DD'))
        return
      } else if (moment(e.target.value, 'YYYY-MM-DD').isAfter(moment().add(4, 'weeks'), 'day')) {
        setDate(moment().add(4, 'weeks').format('YYYY-MM-DD'))
        return
      }
      setDate(e.target.value)
    }
  }

  const handleCategoriesChange = (key: any) => {
    setInterestedCategories(key)
  }

  const handleTimePicker = (value: number) => {
    if (value > 0) clearErrors('time')
    if (time === value) {
      setTime(0)
      return
    }
    setTime(value)
  }

  const handleChangeConsultant = (key: Key) => {
    setConsultantId(key as string)
  }

  return (
    <main className='flex pb-24 flex-col items-center'>
      <div className='max-w-screen-lg p-4 w-full'>
        <Card className='bg-gray-200 mb-8 md:p-6'>
          <CardHeader className='flex gap-4 p-6'>
            <Button isIconOnly as={NextLink} href='/'>
              <FaArrowLeft />
            </Button>
            <h2 className='font-bold text-2xl md:text-4xl'>Tư vấn thiết kế</h2>
          </CardHeader>
        </Card>
        <h3 className='md:text-lg text-center mb-8'>
          Để lại thông tin thời gian bạn rảnh, chúng tôi sẽ liên hệ với bạn để xác nhận lịch hẹn.
        </h3>

        <div className='max-w-screen-md mx-auto'>
          <form action='POST' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col-reverse '>
              <div className='md:col-span-2 max-sm:px-0'>
                <h3 className='font-semibold text-xl md:text-2xl mb-4'>Thông tin cá nhân</h3>
                <div className='flex flex-row gap-4 mb-8 max-xs:mb-4 max-xs:flex-wrap'>
                  <Input
                    {...register('customer.lastName')}
                    defaultValue={customer?.lastName}
                    isInvalid={errors.customer?.lastName ? true : false}
                    color={isSubmitting ? (errors.customer?.lastName ? 'danger' : 'success') : 'default'}
                    errorMessage={errors.customer?.lastName?.message}
                    variant='bordered'
                    className='max-xs:w-full w-1/2'
                    label='Họ'
                    type='text'
                    isRequired
                  />
                  <Input
                    defaultValue={customer?.firstName}
                    {...register('customer.firstName')}
                    isInvalid={errors.customer?.firstName ? true : false}
                    color={isSubmitting ? (errors.customer?.firstName ? 'danger' : 'success') : 'default'}
                    errorMessage={errors.customer?.firstName?.message}
                    variant='bordered'
                    className='max-xs:w-full w-1/2'
                    label='Tên'
                    type='text'
                    isRequired
                  />
                </div>
                <div className='flex flex-row gap-4 mb-8 max-xs:flex-wrap'>
                  <Input
                    defaultValue={customer?.email}
                    {...register('customer.email')}
                    isInvalid={errors.customer?.email ? true : false}
                    color={isSubmitting ? (errors.customer?.email ? 'danger' : 'success') : 'default'}
                    errorMessage={errors.customer?.email?.message}
                    variant='bordered'
                    className='max-xs:w-full w-2/3'
                    label='Email'
                    type='email'
                    isRequired
                  />
                  <Input
                    defaultValue={customer?.phone}
                    // value={phone}
                    {...register('customer.phone')}
                    isInvalid={errors.customer?.phone ? true : false}
                    color={isSubmitting ? (errors.customer?.phone ? 'danger' : 'success') : 'default'}
                    errorMessage={errors.customer?.phone?.message}
                    variant='bordered'
                    className='max-xs:w-full w-1/3'
                    label='Số điện thoại'
                    type='tel'
                    isRequired
                  />
                </div>
              </div>
            </div>
            <h3 className='font-semibold text-xl md:text-2xl mb-4'>Tư vấn viên</h3>
            <Autocomplete
              variant='bordered'
              className='mb-8'
              label='Tư vấn viên'
              selectedKey={consultantId}
              onSelectionChange={handleChangeConsultant}
              {...register('consultantId')}
              isInvalid={errors.consultantId ? true : false}
              color={isSubmitting ? (errors.consultantId ? 'danger' : 'success') : 'default'}
              errorMessage={errors.consultantId?.message}
              isRequired
            >
              {consultants.map((consultant) => (
                <AutocompleteItem key={consultant._id} textValue={consultant.lastName + ' ' + consultant.firstName}>
                  <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                      <Avatar
                        alt={consultant.firstName + ' ' + consultant.lastName}
                        className='flex-shrink-0'
                        size='sm'
                        src={consultant.avatar}
                      />
                      <div className='flex flex-col'>
                        <span className='text-small'>{consultant.lastName + ' ' + consultant.firstName}</span>
                      </div>
                    </div>
                    <Button
                      className='border-small mr-0.5 font-medium shadow-small'
                      radius='full'
                      size='sm'
                      variant='bordered'
                    >
                      Add
                    </Button>
                  </div>
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <h3 className='font-semibold text-xl md:text-2xl mb-4'>Thời gian</h3>
            <Input
              variant='bordered'
              label='Ngày'
              type='date'
              className='mb-4'
              defaultValue={moment().format('YYYY-MM-DD')}
              value={date}
              onChange={handleDateChange}
              min={moment().format('YYYY-MM-DD')}
              max={moment().add(4, 'weeks').format('YYYY-MM-DD')}
              isRequired
            />
            <div className='overflow-x-auto max-[500px]:pb-3 mb-8'>
              <div className='flex gap-7 flex-wrap p-2 min-w-[450px]'>
                {Array.from({ length: 13 }).map((_, index) => (
                  <Button
                    as={Checkbox}
                    key={index}
                    className='w-[clamp(100px,10vw,110px)]'
                    variant='bordered'
                    isDisabled={
                      moment(date, 'YYYY-MM-DD').isSame(moment(), 'day')
                        ? index + 8 <= moment().get('hour')
                        : moment(date, 'YYYY-MM-DD').isBefore(moment(), 'day')
                    }
                    value={index + 8}
                    isSelected={time === index + 8}
                    onClick={() => handleTimePicker(index + 8)}
                  >
                    {index + 8}:00
                  </Button>
                ))}
              </div>
              {errors.time && <p className='text-red-500 text-sm'>{errors.time.message}</p>}
            </div>
            <h3 className='font-semibold text-xl md:text-2xl mb-4'>Danh mục bạn quan tâm</h3>
            <Select
              label='Danh mục'
              selectionMode='multiple'
              className='mb-8'
              variant='bordered'
              {...register('category')}
              selectedKeys={interestedCategories}
              onSelectionChange={handleCategoriesChange}
              isInvalid={errors.category ? true : false}
              errorMessage={errors.category?.message}
              color={isSubmitting ? (errors.category ? 'danger' : 'success') : 'default'}
              isRequired
            >
              {categories.map((category) => (
                <SelectItem key={category._id || ''} textValue={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </Select>
            <Textarea
              variant='bordered'
              className='mb-8'
              label='Ghi chú'
              minRows={3}
              maxRows={4}
              {...register('notes')}
            />
            <Button
              type='submit'
              className='bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)] font-bold w-full'
              size='lg'
              isDisabled={Object.keys(errors).length > 0}
            >
              Đặt lịch
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default BookingConsultant
