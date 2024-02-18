'use client'
import { Button, Card, CardBody, CardHeader, Input, Skeleton } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import CartItemCard from '@components/cards/CartItemCard'
import { ICart } from './cart.interface'
import { getCart } from '@actions/cart/cart.actions'
import Link from 'next/link'

const CartPage = () => {
  const [cart, setCart] = useState<ICart | null>(null)
  const [loading, setLoading] = useState(true)
  const getData = async () => {
    const cart = await getCart()
    setCart(cart)
    setLoading(false)
  }

  useEffect(() => {
    getData()
    return () => {}
  }, [])

  return (
    <main className='min-h-screen py-24 flex flex-col items-center'>
      <div className='max-w-screen-lg p-4 w-full'>
        <Card className='bg-gray-200 mb-8 md:p-6'>
          <CardHeader className='flex gap-4 p-6'>
            <Button isIconOnly as={Link} href='/'>
              <FaArrowLeft />
            </Button>
            <h2 className='font-bold text-2xl md:text-4xl'>Giỏ hàng</h2>
          </CardHeader>
        </Card>
        <div className='flex flex-col md:grid md:grid-cols-3'>
          <div className='flex-grow justify-center items-center md:col-span-2'>
            {!cart?.items ? (
              <>
                <Skeleton className='rounded-xl flex gap-3 m-4 shadow-none flex-row h-28' isLoaded={Boolean(cart)} />
                <Skeleton className='rounded-xl flex gap-3 m-4 shadow-none flex-row h-28' isLoaded={Boolean(cart)} />
                <Skeleton className='rounded-xl flex gap-3 m-4 shadow-none flex-row h-28' isLoaded={Boolean(cart)} />
              </>
            ) : null}
            {cart?.items.length !== 0 ? (
              cart?.items.map((value) => {
                return (
                  <CartItemCard
                    onUpdate={() => getData()}
                    key={value.productId}
                    productId={value.productId}
                    imageURL={value.product.images[0]}
                    name={value.product.name}
                    sku={value.sku}
                    price={value.product.variants.find((variant) => value.sku === variant.sku)?.price ?? 0}
                    quantity={value.quantity.toString()}
                    availableQuantity={
                      value.product.variants.find((variant) => value.sku === variant.sku)?.quantity ?? 0
                    }
                    description={value.sku}
                  />
                )
              })
            ) : (
              <div className='flex justify-center items-center flex-col h-full mb-4'>
                <h2 className='font-bold text-xl md:text-2xl text-center mb-2'>Giỏ hàng trống</h2>
                <p className='font-medium text-base text-center text-gray-500 mb-4'>
                  Giỏ hàng của bạn vẫn chưa có gì này, shopping tiếp nhé! 😊
                </p>
                <Button size='lg' startContent={<FaArrowLeft />} as={Link} href='/'>
                  Quay lại trang chủ
                </Button>
              </div>
            )}
          </div>
          <Card className='shadow-none p-4'>
            <CardHeader className='p-0'>
              <h2 className='font-bold text-2xl mb-4'>Tổng kết</h2>
            </CardHeader>
            <CardBody className='p-0'>
              <div className='mb-4 flex justify-between'>
                <p className='text-gray-500 text-base'>Sản phẩm</p>
                <p className='text-gray-500 text-base'>${cart?.totalAmount ?? 0}</p>
              </div>
              <div className='mb-4 flex justify-between'>
                <p className='text-gray-500 text-base'>Phí giao hàng</p>
                <p className='text-gray-500 text-base'>$2</p>
              </div>
              <div className='mb-4 flex justify-between'>
                <p className='text-base font-semibold'>Tổng cộng</p>
                <p className='text-xl font-semibold'> ${(cart?.totalAmount && Number(cart?.totalAmount) + 2) ?? 2}</p>
              </div>
              <div className='flex flex-row gap-2 mb-4'>
                <Input size='sm' variant='bordered' placeholder='Coupon' type='text' />
                <Button radius='sm' className='bg-black text-white' size='lg'>
                  Áp dụng
                </Button>
              </div>
              <Button
                as={Link}
                radius='sm'
                href='/order'
                isDisabled={loading || cart?.items.length === 0}
                className='bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)] font-bold'
                size='lg'
              >
                Thanh toán
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default CartPage
