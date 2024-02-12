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
      <Card className='w-full shadow-none'>
        <CardBody>
          <div className='flex flex-row'>
            <Image alt='img' src={imageURL} width={150} />
            <div className='m-3 w-full'>
              <p className='text-xl font-semibold'>{name}</p>
              <p className='text-gray-500 mb-5'>Art: {description}</p>
              <div className='flex flex-row justify-between'>
                <p className='text-gray-500'>Số lượng: {quantity}</p>
                <p className='text-xl font-semibold'>${price}</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default OrderItemCard
