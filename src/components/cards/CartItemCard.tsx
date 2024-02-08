'use client'

import { Button, Card, Image, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { FaMinus, FaXmark } from 'react-icons/fa6'
import { deleteCartItem, updateCartQuantity } from '@actions/cart/cart.actions'
export interface ICartItemCard {
  imageURL: string
  name: string
  price: number
  isDiscount?: boolean
  quantity: string
  description: string
  availableQuantity: number
  productId: string
  sku: string
  onUpdate: () => void
}

const CartItemCard = ({
  imageURL,
  name,
  price,
  description,
  availableQuantity,
  quantity,
  productId,
  sku,
  onUpdate
}: ICartItemCard) => {
  const [fixQuantity, setFixQuantity] = useState(quantity)

  const handleQuantity = async (isPlus: boolean, quantity: string) => {
    let inputQuantity: number = Number(quantity)
    if (isPlus) {
      if (availableQuantity === Number(quantity)) return
      setFixQuantity((quantity) => (Number(quantity) + 1).toString())
      inputQuantity++
    } else if (Number(quantity) === 1) {
      setFixQuantity('1')
      inputQuantity = 1
    } else {
      setFixQuantity((quantity) => (Number(quantity) - 1).toString())
      inputQuantity--
    }
    handleUpdateCartQuantity(inputQuantity)
  }

  const handleInputQuantity = (quantity: string) => {
    let inputQuantity: number
    if (availableQuantity <= Number(quantity)) {
      setFixQuantity(availableQuantity.toString())
      inputQuantity = availableQuantity
    } else {
      setFixQuantity(quantity)
      inputQuantity = Number(quantity)
    }
    handleUpdateCartQuantity(inputQuantity)
  }

  const handleUpdateCartQuantity = async (quantity: number) => {
    try {
      await updateCartQuantity({
        productId: productId,
        sku: sku,
        quantity: quantity
      })
      onUpdate()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteCartItem = async () => {
    try {
      await deleteCartItem({
        productId: productId,
        sku: sku
      })
      onUpdate()
    } catch (error) {
      console.log(error)
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
          <Button size='sm' isIconOnly onClick={handleDeleteCartItem}>
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
                inputWrapper: ['p-0 px-2 w-16', 'h-fit']
              }}
              type='number'
              value={String(fixQuantity)}
              onValueChange={handleInputQuantity}
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
