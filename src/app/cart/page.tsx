import { Button, Card, CardHeader } from '@nextui-org/react'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { getCart } from '@actions/cart/cart.actions'
import CartItemCard from '@components/cards/CartItemCard'

const CartPage = () => {
  getCart()
  return (
    <>
      <Card className='bg-gray-200 m-4 mb-10 md:p-3 md:mx-10'>
        <CardHeader className='flex gap-3'>
          <Button isIconOnly>
            <FaArrowLeft />
          </Button>
          <h2 className='font-bold text-2xl md:text-3xl'>Giỏ hàng</h2>
        </CardHeader>
      </Card>
      <CartItemCard
        imageURL='https://picsum.photos/400'
        isDiscount={false}
        name='Sofa'
        price={99}
        quantity={1}
        description='293823'
      />
    </>
  )
}

export default CartPage
