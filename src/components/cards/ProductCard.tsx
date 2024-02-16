'use client'

import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { FaCartPlus } from 'react-icons/fa'
import { IProduct } from '@global/interface'
import Link from 'next/link'

interface ProductCardProps {
  product: IProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { min, max } = product.variants.reduce(
    (acc, curr) => {
      return {
        min: Math.min(acc.min, curr.price),
        max: Math.max(acc.max, curr.price)
      }
    },
    { min: Infinity, max: -Infinity }
  )

  return (
    <Card
      shadow='sm'
      isBlurred
      as={Link}
      href={`/products/${product.slug}`}
      // isPressable
      className='w-full bg-gray-100 cursor-pointer'
    >
      <CardBody className='overflow-hidden p-0 relative rounded-large'>
        <Image
          isBlurred
          isZoomed
          removeWrapper
          shadow='md'
          width='100%'
          alt={product.name}
          className='w-full max-w-[280px] object-cover aspect-square'
          src={product.images[0]}
        />
        <div className='absolute z-20 bottom-2 right-2 sm:hidden bg-white rounded-xl'>
          <Button
            isIconOnly
            className='bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)] h-12 w-12 text-lg'
            onClick={() => console.log('Add to cart')}
          >
            <FaCartPlus />
          </Button>
        </div>
      </CardBody>

      <CardFooter className='p-4 flex justify-between'>
        <div className='flex flex-col items-start max-w-full sm:max-w-[calc(100%-48px)]'>
          <p className='w-full text-xs font-semibold text-gray-400 text-ellipsis'>
            {product.categories.map((category) => category.name).join(', ')}
          </p>
          <h3 className='w-full font-normal text-base text-nowrap overflow-hidden text-ellipsis'>{product.name}</h3>
          <p className='w-full text-base font-semibold text-nowrap'>{min === max ? `$${min}` : `$${min} - $${max}`}</p>
        </div>
        <Button
          isIconOnly
          className='bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)] h-12 min-w-12 text-lg hidden sm:flex'
          onClick={() => console.log('Add to cart')}
        >
          <FaCartPlus />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
