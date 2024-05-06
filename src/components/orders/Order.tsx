'use client'

import OrderItemCard from '@components/orders/OrderItemCard'
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardHeader,
  Image,
  Input,
  Radio,
  RadioGroup,
  Textarea
} from '@nextui-org/react'
import { cloneDeep } from 'lodash'
import jsonData from '@utils/dvhcvn.json'
import NextLink from 'next/link'
import React, { Key, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { ICart } from '@app/(customer)/cart/cart.interface'
import { IDistrict, IOrder, IWard } from '@app/(customer)/order/order.interface'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createOrder } from '@actions/order/order.actions'
import { notifyError, notifyLoading, notifySuccess } from '@utils/toastify'
import { useAuth } from '@src/hooks/useAuth'
import { CustomerDto } from '@data/customer/customer.dto'

interface OrderDisplayProps {
  cart: ICart
  customer: CustomerDto
}

const OrderDisplay = ({ cart, customer }: OrderDisplayProps) => {
  const router = useRouter()

  const loadData = cloneDeep(jsonData)

  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState('')

  const [districtList, setDistrictList] = useState<IDistrict[]>([])
  const [wardList, setWardList] = useState<IWard[]>([])

  const [address, setAddress] = useState('')

  const initialOrderValues = {
    customer: {
      firstName: customer.firstName ?? '',
      lastName: customer.lastName ?? '',
      email: customer.email ?? '',
      phone: customer.phone ?? '',
      address: address ?? '',
      province,
      district,
      ward
    },
    items: [],
    notes: ''
  }

  const phoneRegExp = /^(\+?[1-9]\d{0,3}[ \-]*)?(?:\([0-9]{2,}\)[ \-]*)?([0-9][ \-]*){10}$/

  const validationOrder = yup.object({
    customer: yup.object({
      firstName: yup.string().trim().required('Họ không được để trống'),
      lastName: yup.string().trim().required('Tên không được để trống'),
      email: yup
        .string()
        .trim()
        .email('Email không hợp lệ')
        .required('Email không được để trống')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Email không hợp lệ'),
      phone: yup
        .string()
        .required('Số điện thoại không được để trống')
        .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
      address: yup.string().trim().required('Địa chỉ không được để trống'),
      province: yup.string().trim().required('Tỉnh/Thành phố không được để trống'),
      district: yup.string().trim().required('Quận/Huyện không được để trống'),
      ward: yup.string().trim().required('Phường/Xã không được để trống')
    }),
    notes: yup.string().trim()
  })

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitted }
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { ...initialOrderValues },
    resolver: yupResolver(validationOrder),
    criteriaMode: 'all'
  })

  const handleChangeProvince = (provinceId: Key) => {
    isSubmitted && !provinceId
      ? (setError('customer.province', { type: 'required', message: 'Tỉnh/Thành phố không được để trống' }),
        setError('customer.district', { type: 'required', message: 'Quận/Huyện không được để trống' }),
        setError('customer.ward', { type: 'required', message: 'Phường/Xã không được để trống' }))
      : clearErrors('customer.province')
    const selectedProvince = loadData.data.find((value) => value.level1_id === provinceId)
    const list = selectedProvince?.level2s
    setDistrictList(list || [])
    setWardList([])
    setProvince(selectedProvince?.name ?? '')
    setDistrict('')
    setWard('')
  }

  const handleChangeDistrict = (districtId: Key) => {
    isSubmitted && !districtId
      ? (setError('customer.district', { type: 'required', message: 'Quận/Huyện không được để trống' }),
        setError('customer.ward', { type: 'required', message: 'Phường/Xã không được để trống' }))
      : clearErrors('customer.district')
    const selectedDistrict = districtList.find((value) => value.level2_id === districtId)
    const list = selectedDistrict?.level3s
    setWardList(list || [])
    setDistrict(selectedDistrict?.name ?? '')
    setWard('')
  }

  const handleChangeWard = (wardId: Key) => {
    isSubmitted && wardId === null
      ? setError('customer.ward', { type: 'required', message: 'Phường/Xã không được để trống' })
      : clearErrors('customer.ward')
    const selectedWard = wardList.find((value) => value.level3_id === wardId)
    setWard(selectedWard?.name ?? '')
  }

  const handleChangeAddress = (address: Key) => {
    isSubmitted && (address === null || address === '')
      ? setError('customer.address', { type: 'required', message: 'Địa chỉ không được để trống' })
      : clearErrors('customer.address')
    setAddress(address as string)
  }

  const handleCreateOrder = async (data: IOrder) => {
    const result = await createOrder(data)
    if (result) {
      notifySuccess('Đặt hàng thành công')
      router.replace(result.checkoutUrl)
    } else {
      notifyError('Đặt hàng thất bại')
    }
  }

  const onSubmit = async (data: any) => {
    const items: {
      productId: string
      sku: string
    }[] =
      cart?.items.map((value) => {
        return {
          productId: value.productId,
          sku: value.sku
        }
      }) || []

    const order: IOrder = {
      customer: {
        firstName: data.customer.firstName,
        lastName: data.customer.lastName,
        email: data.customer.email,
        phone: data.customer.phone,
        shippingAddress: `${data.customer.address}, ${ward}, ${district}, ${province}`
      },
      items,
      notes: data.notes
    }
    notifyLoading()
    await handleCreateOrder(order)
  }
  return (
    <main className='min-h-screen pb-24 flex flex-col items-center'>
      <div className='max-w-screen-lg p-4 w-full'>
        <Card className='bg-gray-200 mb-8 md:p-6'>
          <CardHeader className='flex gap-4 p-6'>
            <Button isIconOnly as={NextLink} href='/cart'>
              <FaArrowLeft />
            </Button>
            <h2 className='font-bold text-2xl md:text-4xl'>Thanh toán</h2>
          </CardHeader>
        </Card>
        <div>
          <form action='POST' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col-reverse md:grid md:grid-cols-3'>
              <div className='md:col-span-2 p-4 max-sm:px-0'>
                <h3 className='font-semibold text-xl md:text-2xl mb-4'>Thông tin giao hàng</h3>
                <div className='flex flex-row gap-4 mb-8 max-xs:flex-wrap'>
                  <Input
                    variant='underlined'
                    defaultValue={customer.lastName}
                    {...register('customer.lastName')}
                    isInvalid={errors.customer?.lastName ? true : false}
                    color={isSubmitted ? (errors.customer?.lastName ? 'danger' : 'success') : 'default'}
                    errorMessage={errors.customer?.lastName?.message}
                    className='max-xs:w-full w-1/2'
                    label='Họ'
                    type='text'
                    isRequired
                  />
                  <Input
                    variant='underlined'
                    defaultValue={customer.firstName}
                    {...register('customer.firstName')}
                    isInvalid={errors.customer?.firstName ? true : false}
                    color={isSubmitted ? (errors.customer?.firstName ? 'danger' : 'success') : 'default'}
                    errorMessage={errors.customer?.firstName?.message}
                    className='max-xs:w-full w-1/2'
                    label='Tên'
                    type='text'
                    isRequired
                  />
                </div>
                <div className='flex flex-row gap-4 my-8 max-xs:flex-wrap'>
                  <Input
                    variant='underlined'
                    defaultValue={customer.email}
                    {...register('customer.email')}
                    isReadOnly
                    disabled
                    isInvalid={errors.customer?.email ? true : false}
                    color={isSubmitted ? (errors.customer?.email ? 'danger' : 'success') : 'default'}
                    errorMessage={errors.customer?.email?.message}
                    className='max-xs:w-full w-2/3'
                    label='Email'
                    type='email'
                    isRequired
                  />
                  <Input
                    variant='underlined'
                    defaultValue={customer.phone}
                    // value={phone}
                    {...register('customer.phone')}
                    isInvalid={errors.customer?.phone ? true : false}
                    color={isSubmitted ? (errors.customer?.phone ? 'danger' : 'success') : 'default'}
                    errorMessage={errors.customer?.phone?.message}
                    className='max-xs:w-full w-1/3'
                    label='Số điện thoại'
                    type='tel'
                    isRequired
                  />
                </div>

                {customer.address ? (
                  <Autocomplete
                    allowsCustomValue
                    defaultItems={customer.address}
                    variant='underlined'
                    allowsEmptyCollection={false}
                    onSelectionChange={handleChangeAddress}
                    onInputChange={handleChangeAddress}
                    isInvalid={errors.customer?.address ? true : false}
                    color={isSubmitted ? (errors.customer?.address ? 'danger' : 'success') : 'default'}
                    errorMessage={errors.customer?.address?.message}
                    className='max-xs:w-full'
                    label='Địa chỉ'
                    type='text'
                    {...register('customer.address')}
                    isRequired
                  >
                    {customer.address.map((value) => (
                      <AutocompleteItem key={value} value={value}>
                        {value}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                ) : (
                  <Input
                    variant='underlined'
                    {...register('customer.address')}
                    isInvalid={errors.customer?.address ? true : false}
                    color={isSubmitted ? (errors.customer?.address ? 'danger' : 'success') : 'default'}
                    errorMessage={errors.customer?.address?.message}
                    className='max-xs:w-full'
                    label='Địa chỉ'
                    type='text'
                    isRequired
                  />
                )}

                {/* Đơn vị hành chính */}
                <div className='flex my-8 flex-row gap-4 max-xs:flex-wrap'>
                  <Autocomplete
                    variant='underlined'
                    className='w-1/3 max-xs:w-full'
                    label='Tỉnh/Thành phố'
                    allowsEmptyCollection={false}
                    onSelectionChange={handleChangeProvince}
                    {...register('customer.province')}
                    isInvalid={errors.customer?.province ? true : false}
                    color={isSubmitted ? (errors.customer?.province ? 'danger' : 'success') : 'default'}
                    errorMessage={errors.customer?.province?.message}
                    isRequired
                  >
                    {loadData.data.map((value) => (
                      <AutocompleteItem key={value.level1_id} value={value.name}>
                        {value.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Autocomplete
                    variant='underlined'
                    className='w-1/3 max-xs:w-full'
                    label='Quận/Huyện'
                    allowsEmptyCollection={false}
                    selectedKey={districtList.find((value) => value.name === district)?.level2_id ?? null}
                    onSelectionChange={handleChangeDistrict}
                    {...register('customer.district')}
                    isInvalid={errors.customer?.district ? true : false}
                    color={isSubmitted ? (errors.customer?.district ? 'danger' : 'success') : 'default'}
                    errorMessage={errors.customer?.district?.message}
                    isRequired
                  >
                    {districtList.map((value) => (
                      <AutocompleteItem key={value.level2_id} value={value.name}>
                        {value.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Autocomplete
                    variant='underlined'
                    className='w-1/3 max-xs:w-full'
                    label='Phường/Xã'
                    allowsEmptyCollection={false}
                    selectedKey={wardList.find((value) => value.name === ward)?.level3_id ?? null}
                    onSelectionChange={handleChangeWard}
                    {...register('customer.ward')}
                    isInvalid={errors.customer?.ward ? true : false}
                    color={isSubmitted ? (errors.customer?.ward ? 'danger' : 'success') : 'default'}
                    errorMessage={errors.customer?.ward?.message}
                    isRequired
                  >
                    {wardList.map((value) => (
                      <AutocompleteItem key={value.level3_id} value={value.name}>
                        {value.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>

                <Textarea
                  variant='underlined'
                  className='my-8'
                  label='Ghi chú'
                  minRows={3}
                  maxRows={4}
                  {...register('notes')}
                />
                <h3 className='font-semibold text-xl md:text-2xl mb-4'>Phương thức thanh toán</h3>
                <RadioGroup aria-label='Chọn phươn thức thanh toán' defaultValue='payos' orientation='horizontal'>
                  <Radio value='payos'>
                    <div className='flex items-center mr-4'>
                      <Image
                        removeWrapper
                        src='/payos.png'
                        alt='payos icon'
                        height={80}
                        width={90}
                        className='mr-3 rounded-none'
                      ></Image>
                    </div>
                  </Radio>
                  <Radio value='momo' isDisabled>
                    <div className='flex items-center'>
                      <Image removeWrapper src='/momo.png' alt='momo icon' height={60} width={60}></Image>
                      Momo
                    </div>
                  </Radio>
                </RadioGroup>

                <Button
                  type='submit'
                  className='bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)] font-bold w-full mt-8'
                  size='lg'
                  isDisabled={Object.keys(errors).length > 0}
                >
                  Thanh toán
                </Button>
              </div>

              {/* Cart information */}
              <div className='p-4 max-sm:px-0'>
                <h3 className='font-semibold text-xl md:text-2xl mb-5'>Đơn hàng của bạn</h3>
                {cart?.items.map((value) => (
                  <OrderItemCard
                    key={value.productId}
                    imageURL={value.product.images[0]}
                    name={value.product.name}
                    description={value.sku}
                    quantity={value.quantity}
                    price={value.product.variants.find((variant) => value.sku === variant.sku)?.price ?? 0}
                  />
                ))}
                <div>
                  <div className='mb-4 flex justify-between'>
                    <p className='text-gray-500 text-base'>Sản phẩm</p>
                    <p className='text-gray-500 text-base'>
                      {Intl.NumberFormat('en-DE').format(cart?.totalAmount ?? 0)} &#8363;
                    </p>
                  </div>
                  <div className='mb-4 flex justify-between'>
                    <p className='text-gray-500 text-base'>Phí giao hàng</p>
                    <p className='text-gray-500 text-base'>Miễn phí</p>
                  </div>
                  <div className='md:mb-4 flex justify-between'>
                    <p className='text-base font-semibold'>Tổng cộng</p>
                    <p className='text-xl font-semibold'>
                      {Intl.NumberFormat('en-DE').format(cart?.totalAmount ?? 0)} &#8363;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

interface OrderProps {
  cart: ICart | null
}

const Order = ({ cart }: OrderProps) => {
  const {
    state: { customer }
  } = useAuth()

  return cart && customer ? <OrderDisplay cart={cart} customer={customer} /> : null
}

export default Order
