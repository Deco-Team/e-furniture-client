'use client'

import { Autocomplete, AutocompleteItem, Button, Card, CardHeader, Input, Textarea } from '@nextui-org/react'
import Link from 'next/link'
import React, { Key, memo, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowLeft } from 'react-icons/fa'
import jsonData from '@utils/dvhcvn.json'
import { cloneDeep } from 'lodash'
import { IDistrict, IOrder, IWard } from './order.interface'
import { getCart } from '@actions/cart/cart.actions'
import { ICart } from '@app/(customer)/cart/cart.interface'
import OrderItemCard from '@components/orders/OrderItemCard'
import { AuthContext } from '@src/contexts/AuthContext'
import { ICustomer } from '@src/interface/customer.intefaces'
import { createOrder } from '@actions/order/order.actions'
import { notifyError, notifyLoading, notifySuccess } from '@utils/toastify'
import { useRouter } from 'next/navigation'
import Navigate from '@components/common/Navigate'

const OrderPage = () => {
  const { register, handleSubmit } = useForm<IOrder>()
  const loadData = cloneDeep(jsonData)
  const router = useRouter()

  const me: ICustomer = useContext(AuthContext)
  const [cart, setCart] = useState<ICart | null>()
  const [info, setInfo] = useState<ICustomer>(me)
  const [addressList, setAddressList] = useState<string[]>([])

  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState('')

  const [districtList, setDistrictList] = useState<IDistrict[]>([])
  const [wardList, setWardList] = useState<IWard[]>([])

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')

  const getData = async () => {
    const cart = await getCart()
    setCart(cart)
  }

  useEffect(() => {
    getData()
    setInfo(me)
    setAddressList(me.address || [])
    setFirstName(me.firstName || '')
    setLastName(me.lastName || '')
    setEmail(me.email || '')
    setPhone(me.phone || '')
    return () => {}
  }, [me])

  const handleChangeProvince = (provinceId: Key) => {
    const selectedProvince = loadData.data.find((value) => value.level1_id === provinceId)
    const list = selectedProvince?.level2s
    setDistrictList(list || [])
    setProvince(selectedProvince?.name || '')
  }

  const handleChangeDistrict = (districtId: Key) => {
    const selectedDistrict = districtList.find((value) => value.level2_id === districtId)
    const list = selectedDistrict?.level3s
    setWardList(list || [])
    setDistrict(selectedDistrict?.name || '')
  }

  const handleChangeWard = (wardId: Key) => {
    const selectedWard = wardList.find((value) => value.level3_id === wardId)
    setWard(selectedWard?.name || '')
  }

  const handleChangeInfo = (key: string, updatedInfo: string) => {
    setInfo((prevState) => {
      const value = {
        ...prevState,
        [key]: updatedInfo
      }
      return value
    })
  }

  const handleCreateOrder = async (data: IOrder) => {
    try {
      await createOrder(data)
      notifySuccess('Đặt hàng thành công')
    } catch (error) {
      notifyError('Có lỗi xảy ra')
    } finally {
      router.push('/')
    }
  }

  const onSubmit = async (data: IOrder) => {
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
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        shippingAddress: `${data.customer.shippingAddress}, ${ward}, ${district}, ${province}`
      },
      items: items,
      notes: data.notes
    }
    await handleCreateOrder(order)
  }

  return (
    <>
      {cart?.items.length === 0 ? (
        <Navigate to='/' />
      ) : (
        <main className='min-h-screen flex flex-col items-center'>
          <div className='max-w-screen-lg p-4 w-full'>
            <Card className='bg-gray-200 mb-8 md:p-6'>
              <CardHeader className='flex gap-4 p-6'>
                <Button isIconOnly as={Link} href='/cart'>
                  <FaArrowLeft />
                </Button>
                <h2 className='font-bold text-2xl md:text-4xl'>Thanh toán</h2>
              </CardHeader>
            </Card>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col-reverse md:grid md:grid-cols-3'>
                  <div className='md:col-span-2 p-4'>
                    <h3 className='font-semibold text-xl md:text-2xl mb-5'>Thông tin giao hàng</h3>
                    <div className='flex flex-row gap-4 my-8 max-xs:flex-wrap'>
                      <Input
                        variant='underlined'
                        value={firstName}
                        onValueChange={setFirstName}
                        className='max-xs:w-full w-1/2'
                        isRequired
                        label='Họ'
                        type='text'
                      />
                      <Input
                        variant='underlined'
                        defaultValue={info.lastName}
                        value={lastName}
                        onValueChange={setLastName}
                        className='max-xs:w-full w-1/2'
                        isRequired
                        label='Tên'
                        type='text'
                      />
                    </div>
                    <div className='flex flex-row gap-4 my-8 max-xs:flex-wrap'>
                      <Input
                        variant='underlined'
                        value={email}
                        onValueChange={setEmail}
                        className='max-xs:w-full w-2/3'
                        isRequired
                        label='Email'
                        type='email'
                      />
                      <Input
                        variant='underlined'
                        value={phone}
                        onValueChange={setPhone}
                        className='max-xs:w-full w-1/3'
                        isRequired
                        label='Số điện thoại'
                        type='tel'
                      />
                    </div>
                    <Autocomplete
                      allowsCustomValue
                      value={shippingAddress}
                      onValueChange={(value) => {
                        handleChangeInfo('shippingAddress', value)
                      }}
                      variant='underlined'
                      className='max-xs:w-full'
                      isRequired
                      label='Địa chỉ'
                      type='text'
                      {...register('customer.shippingAddress')}
                    >
                      {info.address ? (
                        addressList.map((value, i) => (
                          <AutocompleteItem key={i} value={value}>
                            {value}
                          </AutocompleteItem>
                        ))
                      ) : (
                        <AutocompleteItem className='text-gray-500' key='' isReadOnly value=''>
                          None
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <div className='flex my-8 flex-row gap-4 max-xs:flex-wrap'>
                      <Autocomplete
                        variant='underlined'
                        className='w-1/3 max-xs:w-full'
                        isRequired
                        label='Tỉnh/Thành phố'
                        onSelectionChange={handleChangeProvince}
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
                        isRequired
                        label='Quận/Huyện'
                        onSelectionChange={handleChangeDistrict}
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
                        isRequired
                        label='Phường/Xã'
                        onSelectionChange={handleChangeWard}
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
                      className='mt-8'
                      label='Ghi chú'
                      minRows={3}
                      maxRows={4}
                      {...register('notes')}
                    />
                    <Button
                      type='submit'
                      className='bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)] font-bold w-full mt-8'
                      size='lg'
                      onClick={() => notifyLoading()}
                    >
                      Thanh toán
                    </Button>
                  </div>
                  <div className='p-4'>
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
                        <p className='text-gray-500 text-base'>${cart?.totalAmount ?? 0}</p>
                      </div>
                      <div className='mb-4 flex justify-between'>
                        <p className='text-gray-500 text-base'>Phí giao hàng</p>
                        <p className='text-gray-500 text-base'>$2</p>
                      </div>
                      <div className='md:mb-4 flex justify-between'>
                        <p className='text-base font-semibold'>Tổng cộng</p>
                        <p className='text-xl font-semibold'>${Number(cart?.totalAmount) + 2 ?? 2}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      )}
    </>
  )
}

export default memo(OrderPage)
