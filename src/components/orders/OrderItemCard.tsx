import { Card, CardBody, Image } from '@nextui-org/react'
import React from 'react'

export interface IOrderItemCard {
  imageURL: string
  name: string
  description: string
  quantity: number
  price: number
}

const OrderItemCard = ({ imageURL, name, description, quantity, price }: IOrderItemCard) => {
  return (
    <>
      <Card className='w-full shadow-none mb-4'>
        <CardBody className='p-0'>
          <div className='flex flex-row gap-4 md:gap-2'>
            <Image
              removeWrapper
              width='100%'
              className='w-full max-w-[100px] object-cover aspect-square'
              src={imageURL}
              alt='img'
            />
            <div className='w-full flex flex-col justify-between'>
              <div>
                <p className='text-xl font-semibold'>{name}</p>
                <p className='text-gray-500'>Art: {description}</p>
              </div>
              <div className='flex flex-row justify-between'>
                <p className='text-gray-500'>Số lượng: {quantity}</p>
                <p className='text-base font-semibold'>${price}</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default OrderItemCard
