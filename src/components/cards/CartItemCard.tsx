'use client'

import { Button, Card, Image, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { FaMinus, FaXmark } from 'react-icons/fa6'
export interface ICartItemCard {
  imageURL: string
  name: string
  price: number
  isDiscount: boolean
  quantity: number
  description: string
}

const CartItemCard = ({ imageURL, name, price, isDiscount, description, quantity }: ICartItemCard) => {
  const [fixQuantity, setFixQuantity] = useState(quantity)

  const handleQuantity = (isPlus: boolean, quantity: number) => {
    if (isPlus) {
      setFixQuantity((quantity) => quantity + 1)
    } else {
      quantity === 0 ? setFixQuantity(0) : setFixQuantity((quantity) => quantity - 1)
    }
  }

  return (
    <Card className='flex gap-3 m-4 md:mx-10 shadow-none flex-row'>
      <Image loading='eager' width={200} className='md:w-28' src={imageURL} alt='img' />
      <div className='m-3 ml-0 w-full flex flex-col justify-between max-h-full'>
        <div className='flex flex-row justify-between'>
          <div>
            <p className='text-xl font-semibold'>{name}</p>
            <p className='text-gray-500'>Art: {description}</p>
          </div>
          <Button size='sm' isIconOnly>
            <FaXmark />
          </Button>
        </div>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row gap-1'>
            <Button onClick={() => handleQuantity(false, fixQuantity)} size='sm' isIconOnly>
              <FaMinus />
            </Button>
            <Input
              variant='bordered'
              size='sm'
              classNames={{
                inputWrapper: ['p-0 px-2 w-10', 'h-fit']
              }}
              type='number'
              value={String(fixQuantity)}
            />
            <Button onClick={() => handleQuantity(true, fixQuantity)} size='sm' isIconOnly>
              <FaPlus />
            </Button>
          </div>
          <p className='text-xl font-semibold'>${price}</p>
        </div>
      </div>
    </Card>
  )
}

export default CartItemCard
