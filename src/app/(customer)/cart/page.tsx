'use client'
import { Button, Card, CardBody, CardHeader, Input, Skeleton } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import CartItemCard from '@components/cards/CartItemCard'
import { ICart } from './cart.interface'
import { getCart } from '@actions/cart/cart.actions'
import Link from 'next/link'

const CartPage = () => {
  const [cart, setCart] = useState<ICart | null>()

  const getData = async () => {
    const cart = await getCart()
    setCart(cart)
  }

  useEffect(() => {
    getData()
    return () => {}
  }, [])

  return (
    <>
      <Card className='bg-gray-200 m-4 mb-10 md:p-3 md:mx-10'>
        <CardHeader className='flex gap-3'>
          <Link href='/'>
            <Button isIconOnly>
              <FaArrowLeft />
            </Button>
          </Link>
          <h2 className='font-bold text-2xl md:text-3xl'>Giỏ hàng</h2>
        </CardHeader>
      </Card>
      <div className='flex flex-col md:flex-row'>
        <div className='flex-grow m-4 justify-center items-center'>
          {!cart?.items ? (
            <>
              <Skeleton
                className='rounded-xl flex gap-3 m-4 md:mx-10 shadow-none flex-row h-28'
                isLoaded={Boolean(cart)}
              >
                <div className='flex gap-3 m-4 md:mx-10 shadow-none flex-row'></div>
              </Skeleton>
              <Skeleton
                className='rounded-xl flex gap-3 m-4 md:mx-10 shadow-none flex-row h-28'
                isLoaded={Boolean(cart)}
              >
                <div className='flex gap-3 m-4 md:mx-10 shadow-none flex-row'></div>
              </Skeleton>
              <Skeleton
                className='rounded-xl flex gap-3 m-4 md:mx-10 shadow-none flex-row h-28'
                isLoaded={Boolean(cart)}
              >
                <div className='flex gap-3 m-4 md:mx-10 shadow-none flex-row'></div>
              </Skeleton>
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
                  availableQuantity={value.product.variants.find((variant) => value.sku === variant.sku)?.quantity ?? 0}
                  description={value.sku}
                />
              )
            })
          ) : (
            <h2 className='font-bold text-2xl md:text-3xl mt-10 text-center'>Giỏ hàng trống</h2>
          )}
        </div>
        <Card className='shadow-none md:m-4 mb-10 md:mr-40'>
          <CardHeader className='flex gap-3'>
            <h2 className='font-bold text-2xl md:text-3xl'>Tổng kết</h2>
          </CardHeader>
          <CardBody>
            <ul className='ml-10'>
              <li className='my-2 text-gray-500 text-lg md:text-xl'>Sản phẩm: ${cart?.totalAmount ?? 0}</li>
              <li className='my-2 text-gray-500 text-lg md:text-xl'>Phí giao hàng: $2</li>
              <li className=' my-2 text-lg md:text-xl'>Tổng cộng: ${Number(cart?.totalAmount) + 2 ?? 2}</li>
            </ul>
            <div className='mt-5 ml-10 flex flex-row gap-2'>
              <Input size='sm' placeholder='Coupon' type='text' />
              <Button className='bg-black text-white' size='lg'>
                Áp dụng
              </Button>
            </div>
            <Button className='bg-orange-100 my-10 ml-10 text-orange-400 font-bold' size='lg'>
              Đi đến thanh toán
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default CartPage
