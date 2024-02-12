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
import { Slide, ToastContainer } from 'react-toastify'

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
    setFirstName(me.firstName)
    setLastName(me.lastName)
    setEmail(me.email)
    setPhone(me.phone)
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
        <>
          <Card className='bg-gray-200 m-4 mb-10 md:p-3 md:mx-10'>
            <CardHeader className='flex gap-3'>
              <Link href='/cart'>
                <Button isIconOnly>
                  <FaArrowLeft />
                </Button>
              </Link>
              <h2 className='font-bold text-2xl md:text-3xl'>Thanh toán</h2>
            </CardHeader>
          </Card>
          <div className='m-4 mb-10 md:p-3 md:mx-10'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-row flex-wrap gap-10'>
                <div className='max-xs:w-full w-3/5'>
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
                    className='my-8 max-xs:w-full'
                    isRequired
                    label='Địa chỉ'
                    type='text'
                    {...register('customer.shippingAddress')}
                  >
                    {info.address &&
                      addressList.map((value, i) => (
                        <AutocompleteItem key={i} value={value}>
                          {value}
                        </AutocompleteItem>
                      ))}
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
                </div>
                <div className='max-xs:w-full w-2/6'>
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

                  <div className='ml-10'>
                    <div className='flex flex-row justify-between'>
                      <p className='my-2 text-gray-500 text-lg md:text-xl'>Sản phẩm:</p>
                      <p className='my-2 text-gray-500 text-lg md:text-xl'>${cart?.totalAmount ?? 0}</p>
                    </div>
                    <div className='flex flex-row justify-between'>
                      <p className='my-2 text-gray-500 text-lg md:text-xl'>Phí giao hàng:</p>
                      <p className='my-2 text-gray-500 text-lg md:text-xl'>$2</p>
                    </div>
                    <div className='flex flex-row justify-between'>
                      <p className='my-2 text-lg md:text-xl'>Tổng cộng:</p>
                      <p className='my-2 text-lg md:text-xl'>${Number(cart?.totalAmount) + 2 ?? 2}</p>
                    </div>
                  </div>

                  <Button
                    type='submit'
                    className='bg-orange-100 my-10 ml-10 text-orange-400 font-bold w-full'
                    size='lg'
                    onClick={() => notifyLoading()}
                  >
                    Thanh toán
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  )
}

export default memo(OrderPage)
