import { Card, CardBody, Image, Link } from '@nextui-org/react'
import React from 'react'

export interface IOrderItemCard {
  imageURL: string
  name: string
  description: string
  quantity: number
  price: number
  slug: string
}

const OrderItemCard = ({ imageURL, name, description, quantity, price, slug }: IOrderItemCard) => {
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
                <Link className='text-xl font-semibold text-black' href={`/products/${slug}`}>
                  {name}
                </Link>
                <p className='text-gray-500'>SKU: {description}</p>
              </div>
              <div className='flex flex-row justify-between'>
                <p className='text-gray-500'>Số lượng: {quantity}</p>
                <p className='text-base font-semibold'>{Intl.NumberFormat('en-DE').format(price)} &#8363;</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default OrderItemCard
