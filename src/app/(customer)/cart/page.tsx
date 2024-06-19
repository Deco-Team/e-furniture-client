'use client'
import { Button, Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import CartItemCard from '@components/cards/CartItemCard'
import { ICart } from './cart.interface'
import { getCart } from '@actions/cart/cart.actions'
import NextLink from 'next/link'
import { useCart } from '@src/hooks/useCart'

const CartPage = () => {
  const { setCart } = useCart()
  const [cartItems, setCartItems] = useState<ICart | null>(null)
  const [loading, setLoading] = useState(true)
  const getData = async () => {
    const cart = await getCart()
    setCartItems(cart)
    setCart(cart)
    setLoading(false)
  }

  useEffect(() => {
    getData()
    return () => {}
  }, [])

  return (
    <main className='flex pb-24 flex-col items-center min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-96px)]'>
      <div className='max-w-screen-lg p-4 w-full'>
        <Card className='bg-gray-200 mb-8 md:p-6'>
          <CardHeader className='flex gap-4 p-6'>
            <Button isIconOnly as={NextLink} href='/'>
              <FaArrowLeft />
            </Button>
            <h2 className='font-bold text-2xl md:text-4xl'>Giỏ hàng</h2>
          </CardHeader>
        </Card>
        <div className='flex flex-col md:grid md:grid-cols-3'>
          <div className='flex-grow justify-center items-center md:col-span-2'>
            {!cartItems?.items ? (
              <>
                {[...Array(3)].map((_, index) => (
                  <div key={index} className='px-4 my-4 w-full flex items-center gap-3'>
                    <div>
                      <Skeleton className='flex rounded-lg w-[100px] md:w-[175px] aspect-square' />
                    </div>
                    <div className='h-full w-full flex flex-col gap-2 md:gap-4 '>
                      <Skeleton className='flex rounded-lg w-3/5 h-5' />
                      <Skeleton className='flex rounded-lg w-2/5 h-5 md:mb-10' />
                      <div className='w-full flex justify-between'>
                        <Skeleton className='flex rounded-lg w-1/5 h-8' />
                        <Skeleton className='flex rounded-lg w-1/5 h-8' />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : null}
            {cartItems?.items.length !== 0 ? (
              cartItems?.items.map((value) => {
                return (
                  <CartItemCard
                    onUpdate={() => getData()}
                    key={value.sku}
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
                <Button size='lg' startContent={<FaArrowLeft />} as={NextLink} href='/'>
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
                <p className='text-gray-500 text-base'>
                  {Intl.NumberFormat('en-DE').format(cartItems?.totalAmount ?? 0)} &#8363;
                </p>
              </div>
              <div className='mb-4 flex justify-between'>
                <p className='text-gray-500 text-base'>Phí giao hàng</p>
                <p className='text-gray-500 text-base'>Miễn phí</p>
              </div>
              <div className='mb-4 flex justify-between'>
                <p className='text-base font-semibold'>Tổng cộng</p>
                <p className='text-xl font-semibold'>
                  {' '}
                  {Intl.NumberFormat('en-DE').format(
                    (cartItems?.totalAmount && Number(cartItems?.totalAmount)) ?? 0
                  )}{' '}
                  &#8363;
                </p>
              </div>
              <Button
                as={NextLink}
                radius='sm'
                href='/order'
                isDisabled={loading || cartItems?.items.length === 0}
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
