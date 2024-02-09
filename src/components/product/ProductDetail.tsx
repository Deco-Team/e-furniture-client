'use client'

import { Button, Card, CardBody, Image, Input, Tab, Tabs, Tooltip } from '@nextui-org/react'
import React from 'react'
import { FaCartPlus, FaMinus, FaPlus } from 'react-icons/fa'
import { IProduct, IVariant } from '@global/interface'
import ProductSlide from './ProductSlide'

interface ProductDetailProps {
  product: IProduct
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  // Show max-min price if there are multiple variants
  const { min, max } = product.variants.reduce(
    (acc, curr) => {
      return {
        min: Math.min(acc.min, curr.price),
        max: Math.max(acc.max, curr.price)
      }
    },
    { min: Infinity, max: -Infinity }
  )
  const priceDefaut = min === max ? `$${min}` : `$${min} - $${max}`

  // State
  const [price, setPrice] = React.useState(priceDefaut)
  const [activeVariant, setActiveVariant] = React.useState<IVariant>({
    sku: '',
    price: 0,
    quantity: 0,
    dimensions: { length: 0, width: 0, height: 0 },
    keyValue: {}
  })
  const [selectedImage, setSelectedImage] = React.useState(product.images[0])
  const [selectedQuantity, setSelectedQuantity] = React.useState(1)

  // Handlers selected variant
  const handleActiveVariant = (variant: IVariant) => {
    if (variant === activeVariant) {
      setSelectedQuantity(1)
      setPrice(priceDefaut)
      setActiveVariant({
        sku: '',
        price: 0,
        quantity: 0,
        dimensions: { length: 0, width: 0, height: 0 },
        keyValue: {}
      })
      return
    }
    setSelectedQuantity(1)
    setPrice(`$${variant.price}`)
    setActiveVariant(variant)
  }

  // Handlers selected quantity
  const handleSelectedQuantity = (value: string) => {
    if (value === '') {
      setSelectedQuantity(1)
      return
    }
    const quantity = parseInt(value)
    if (activeVariant.sku) {
      if (quantity < 1) {
        setSelectedQuantity(1)
      } else if (quantity > activeVariant.quantity) {
        setSelectedQuantity(activeVariant.quantity)
      } else {
        setSelectedQuantity(quantity)
      }
      return
    }
    setSelectedQuantity(1)
  }

  return (
    <div className='max-w-screen-lg p-4 w-full'>
      <div className='flex flex-col sm:grid sm:grid-cols-5 gap-4'>
        <div className='sm:col-span-2'>
          <Image
            isBlurred
            removeWrapper
            shadow='sm'
            width='100%'
            alt={product.name}
            className='w-full object-cover aspect-square col-span-2 mb-2'
            src={selectedImage}
          />
          <ProductSlide images={product.images} setSelectedImage={setSelectedImage} />
        </div>
        <div className='sm:col-span-3 flex flex-col gap-4'>
          <div className='sm:pt-4 '>
            <p className='text-base font-semibold text-gray-400'>{product.categories[0].name}</p>
            <div className='flex justify-between'>
              <h3 className='font-bold text-2xl text-nowrap'>{product.name}</h3>
              <h3 className='font-bold text-2xl text-nowrap'>{price}</h3>
            </div>
            {/* <Rating ratingInPercent={product.rate * 20} iconSize='l' showOutOf={true} enableUserInteraction={false} /> */}
          </div>

          <div>
            <h3 className='font-medium text-base text-nowrap pb-2'>Phân loại</h3>
            <div className='flex gap-4 flex-wrap'>
              {product.variants.map((variant) => (
                <Tooltip key={variant.sku} showArrow content={Object.keys(variant.keyValue).join(' - ')}>
                  <Button
                    radius='sm'
                    disabled={variant.quantity === 0}
                    variant={activeVariant === variant ? 'solid' : 'bordered'}
                    className={`max-w-96 block overflow-hidden text-ellipsis font-semibold text-[var(--primary-orange-text-color)] border-solid border-1 border-[var(--primary-orange-color)] disabled:opacity-50 disabled:hover:opacity-50 disabled:cursor-not-allowed ${activeVariant === variant ? 'bg-[var(--light-orange-color)] px-[16px]' : 'bg-[var(--light-gray-color)]'}`}
                    onClick={() => handleActiveVariant(variant)} // Fix: Pass a function reference instead of invoking the function directly
                  >
                    {Object.values(variant.keyValue).join(' - ')}
                  </Button>
                </Tooltip>
              ))}
            </div>
          </div>

          <div>
            <h3 className='font-medium text-base text-nowrap pb-2'>Số lượng</h3>
            <div className='flex justify-between flex-wrap flex-col xs:flex-row'>
              <div className='flex items-center gap-2 mb-4 sm:pb-0'>
                <Button
                  isIconOnly
                  isDisabled={activeVariant.sku ? false : true}
                  radius='sm'
                  variant='solid'
                  onClick={() => handleSelectedQuantity(String(selectedQuantity - 1))}
                >
                  <FaMinus />
                </Button>
                <Input
                  size='sm'
                  isDisabled={activeVariant.sku ? false : true}
                  isReadOnly={activeVariant.sku ? false : true}
                  value={`${selectedQuantity}`}
                  onValueChange={(value: string) => handleSelectedQuantity(value)}
                  variant='bordered'
                  defaultValue='1'
                  className='max-w-12 min-w-12'
                  classNames={{
                    input: 'text-center',
                    inputWrapper: 'max-h-11 overflow-hidden'
                  }}
                />
                <Button
                  isIconOnly
                  isDisabled={activeVariant.sku ? false : true}
                  radius='sm'
                  variant='solid'
                  onClick={() => handleSelectedQuantity(String(selectedQuantity + 1))}
                >
                  <FaPlus />
                </Button>
                {activeVariant.sku && <p className='text-nowrap'>{activeVariant.quantity} mặt hàng có sẵn</p>}
              </div>
              <Button
                startContent={<FaCartPlus size={20} />}
                className='bg-[var(--light-orange-color)] font-medium text-base text-[var(--primary-orange-text-color)] h-12'
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>

          <div className='flex w-full flex-col'>
            <Tabs
              variant='light'
              radius='full'
              classNames={{
                cursor: 'w-full bg-[var(--light-orange-color)]',
                tab: 'h-10 font-medium text-base px-6',
                tabContent:
                  'group-data-[selected=true]:text-[var(--primary-orange-text-color)] group-data-[hover=true]:text-[var(--primary-orange-text-color)]'
              }}
            >
              <Tab title={'Mô tả'}>
                <Card shadow='sm'>
                  <CardBody className='p-4 sm:p-6'>
                    <p>{product.description}</p>
                  </CardBody>
                </Card>
              </Tab>
              <Tab title={'Thông số'}>
                <Card shadow='sm'>
                  <CardBody className='p-4 sm:p-6'>
                    {activeVariant.sku ? (
                      <>
                        <p>
                          <span className='font-semibold'>Chiều dài: </span>
                          {activeVariant.dimensions.length}
                        </p>
                        <p>
                          <span className='font-semibold'>Chiều rộng: </span>
                          {activeVariant.dimensions.width}
                        </p>
                        <p>
                          <span className='font-semibold'>Chiều cao: </span>
                          {activeVariant.dimensions.height}
                        </p>
                      </>
                    ) : (
                      <p>Hãy chọn 1 phân loại</p>
                    )}
                  </CardBody>
                </Card>
              </Tab>
              {/* <Tab title={'Reviews'}>
                <Card>
                  <CardBody className='p-4 sm:p-6'>
                    <p>Review</p>
                  </CardBody>
                </Card>
              </Tab> */}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
