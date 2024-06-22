'use client'

import { Button, Card, Image, Input, Link } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
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
  slug: string
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
  slug,
  onUpdate
}: ICartItemCard) => {
  const [fixQuantity, setFixQuantity] = useState(quantity)

  const handleUpdateCartQuantity = async (quantity: number) => {
    if (quantity === 0) {
      setFixQuantity('1')
      quantity = 1
    }
    try {
      await updateCartQuantity({
        productId,
        sku,
        quantity
      })
      onUpdate()
    } catch (error) {
      console.log(error)
    }
  }

  const handleQuantity = async (isPlus: boolean, quantity: string) => {
    let inputQuantity = Number(quantity)
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
    await handleUpdateCartQuantity(inputQuantity)
  }

  const handleInputQuantity = (quantity: string) => {
    const quantityPattern = /^([1-9][0-9]*)?$/
    if (quantityPattern.test(quantity)) {
      if (availableQuantity <= Number(quantity)) {
        setFixQuantity(availableQuantity.toString())
      } else {
        setFixQuantity(quantity)
      }
    }
  }

  const handleDeleteCartItem = async () => {
    try {
      await deleteCartItem({
        productId,
        sku
      })
      onUpdate()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card radius='none' className='flex gap-2 md:gap-6 m-4 shadow-none flex-row'>
      <Image
        removeWrapper
        width='100%'
        className='w-full max-w-[100px] md:max-w-[175px] object-cover aspect-square'
        src={imageURL}
        alt='img'
      />
      <div className='md:py-6 w-full flex flex-col justify-between max-h-full'>
        <div className='flex flex-row justify-between'>
          <div>
            <Link className='text-base font-semibold text-black' href={`/products/${slug}`}>
              {name}
            </Link>
            <p className='text-gray-500'>Sku: {description}</p>
          </div>
          <Button size='sm' isIconOnly onClick={handleDeleteCartItem}>
            <FaXmark />
          </Button>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row gap-1 items-center'>
            <Button
              size='sm'
              onClick={() => handleQuantity(false, fixQuantity)}
              radius='sm'
              variant='solid'
              isIconOnly
              isDisabled={fixQuantity === '1' || fixQuantity === ''}
            >
              <FaMinus />
            </Button>
            <Input
              variant='bordered'
              size='sm'
              className='max-w-14 min-w-14'
              classNames={{
                input: 'text-center',
                inputWrapper: 'max-h-11 overflow-hidden'
              }}
              type='text'
              value={String(fixQuantity)}
              onValueChange={handleInputQuantity}
              onBlur={(e) => {
                const inputElement = e.target as HTMLInputElement
                handleUpdateCartQuantity(Number(inputElement.value))
              }}
            />
            <Button
              size='sm'
              onClick={() => handleQuantity(true, fixQuantity)}
              radius='sm'
              variant='solid'
              isIconOnly
              isDisabled={availableQuantity === Number(fixQuantity) || fixQuantity === ''}
            >
              <FaPlus />
            </Button>
          </div>
          <p className='text-lg font-semibold'>{Intl.NumberFormat('en-DE').format(price)} &#8363;</p>
        </div>
      </div>
    </Card>
  )
}

export default CartItemCard
