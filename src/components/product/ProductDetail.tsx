'use client'

import { Button, Card, CardBody, Image, Input, Tab, Tabs, Tooltip, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { FaArrowLeft, FaCartPlus, FaMinus, FaPlus } from 'react-icons/fa'
import { MdViewInAr } from 'react-icons/md'
import { PiCube } from 'react-icons/pi'
import { IProduct, IVariant } from '@global/interface'
import ProductSlide from './ProductSlide'
import { useRouter } from 'next/navigation'
import { addCartItem, getCart } from '@actions/cart/cart.actions'
import { notifyError, notifySuccess } from '@utils/toastify'
import { ICart } from '@app/(customer)/cart/cart.interface'
import ARModal from './ARModal'

interface ProductDetailProps {
  product: IProduct
  isLogin: boolean
}

const ProductDetail = ({ product, isLogin }: ProductDetailProps) => {
  const router = useRouter()

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
  const priceDefault =
    min === max
      ? Intl.NumberFormat('en-DE').format(min) + ' ₫'
      : `${Intl.NumberFormat('en-DE').format(min)} ₫ - ${Intl.NumberFormat('en-DE').format(max)} ₫`

  // State
  const [price, setPrice] = React.useState(priceDefault)
  const [hasKeyvalue] = React.useState(product.variants.find((variant) => variant.keyValue) ? true : false)
  const [activeVariant, setActiveVariant] = React.useState<IVariant>(
    hasKeyvalue
      ? {
          sku: '',
          price: 0,
          quantity: 0,
          dimensions: { length: 0, width: 0, height: 0 },
          keyValue: {}
        }
      : product.variants[0]
  )

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [selectedImage, setSelectedImage] = React.useState(product.images[0])
  const [selectedQuantity, setSelectedQuantity] = React.useState('1')
  const [variantError, setVariantError] = React.useState(false)
  const [quantityEror, setQuantityError] = React.useState(false)
  const [cart, setCart] = React.useState<ICart | null>(null)

  const getData = async () => {
    const cart = await getCart()
    setCart(cart)
  }

  React.useEffect(() => {
    getData()
    return () => {}
  }, [])

  // Handlers selected variant
  const handleActiveVariant = (variant: IVariant) => {
    if (variant === activeVariant) {
      setSelectedQuantity('1')
      setPrice(priceDefault)
      setActiveVariant({
        sku: '',
        price: 0,
        quantity: 0,
        dimensions: { length: 0, width: 0, height: 0 },
        keyValue: {}
      })
      return
    }
    setSelectedQuantity('1')
    setPrice(Intl.NumberFormat('en-DE').format(variant.price) + ' ₫')
    setActiveVariant(variant)
    setVariantError(false)
    setQuantityError(false)
  }

  // Handlers selected quantity
  const handleQuantity = (value: string) => {
    const quantity = Number(value)
    const cartQuantity = cart?.items.find((item) => item.sku === activeVariant.sku)?.quantity ?? 0
    if (activeVariant.sku) {
      if (quantity < 1) {
        setSelectedQuantity('1')
      } else if (quantity > activeVariant.quantity - cartQuantity) {
        setSelectedQuantity((activeVariant.quantity - cartQuantity).toString())
        setQuantityError(true)
      } else if (quantity > activeVariant.quantity) {
        setSelectedQuantity(activeVariant.quantity.toString())
        setQuantityError(true)
      } else {
        setSelectedQuantity(quantity.toString())
        setQuantityError(false)
      }
      return
    }
    setSelectedQuantity('1')
  }

  const handleInputQuantity = (value: string) => {
    const quantityPattern = /^([1-9][0-9]*)?$/
    const cartQuantity = cart?.items.find((item) => item.productId === product._id)?.quantity ?? 0
    if (quantityPattern.test(value)) {
      if (activeVariant.sku) {
        if (Number(value) > activeVariant.quantity - cartQuantity) {
          setSelectedQuantity((activeVariant.quantity - cartQuantity).toString())

          setQuantityError(true)
        } else if (Number(value) > activeVariant.quantity) {
          setSelectedQuantity(activeVariant.quantity.toString())
          setQuantityError(true)
        } else {
          setSelectedQuantity(value)
          setQuantityError(false)
        }
      }
    }
  }

  const handleAddToCart = async () => {
    if (!activeVariant.sku) {
      setVariantError(true)
      return
    }
    if (!isLogin) {
      notifyError('Đăng nhập để thêm vào giỏ hàng')
      router.push('/login-register')
      return
    }
    const result = await addCartItem({
      productId: product._id as string,
      sku: activeVariant.sku,
      quantity: Number(selectedQuantity)
    })
    console.log(result)
    if (result) {
      notifySuccess('Thêm vào giỏ hàng thành công')
      setSelectedQuantity('1')
      setVariantError(false)
      setQuantityError(false)
    } else {
      notifyError('Thêm vào giỏ hàng thất bại')
    }
  }

  return (
    <div className='max-w-screen-lg p-4 w-full'>
      <div className='flex flex-col sm:grid sm:grid-cols-5 gap-4'>
        <div className='sm:col-span-2'>
          <div className='relative'>
            <Button
              isIconOnly
              className='absolute z-20 top-6 left-6 bg-black/30 backdrop-blur-sm text-white h-12 w-12 text-lg'
              onClick={() => router.back()}
            >
              <FaArrowLeft />
            </Button>
            <Image
              isBlurred
              removeWrapper
              shadow='sm'
              width='100%'
              alt={product.name}
              className='w-full object-cover aspect-square col-span-2 mb-2'
              src={selectedImage}
            />
            {product.modelUrl && (
              <>
                <Button
                  startContent={<MdViewInAr className='text-2xl' />}
                  className='absolute z-20 bottom-6 right-6 bg-black/0 backdrop-blur-md text-white h-10 w-36 text-lg max-sm:hidden'
                  onClick={onOpen}
                >
                  Xem 3D
                </Button>
                <ARModal
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  src={product.modelUrl}
                  arPlacement={product.arPlacement}
                  productName={product.name}
                  categoryName={product.categories.map((category) => category.name).join(', ')}
                  dimensions={`${product.variants[0].dimensions.length} x ${product.variants[0].dimensions.width} x ${product.variants[0].dimensions.height}`}
                  price={priceDefault}
                />
              </>
            )}
          </div>
          <ProductSlide images={product.images} setSelectedImage={setSelectedImage} />
        </div>
        <div className='sm:col-span-3 flex flex-col gap-4'>
          <div className='sm:pt-4 '>
            <p className='text-base font-semibold text-gray-400'>
              {product.categories.map((category) => category.name).join(', ')}
            </p>
            <div className='flex justify-between flex-wrap'>
              <h3 className='font-bold text-2xl'>{product.name}</h3>
              <h3 className='font-bold text-2xl text-nowrap whitespace-nowrap'>{price}</h3>
            </div>
            {/* <Rating ratingInPercent={product.rate * 20} iconSize='l' showOutOf={true} enableUserInteraction={false} /> */}
          </div>

          {product.modelUrl && (
            <div className='flex flex-row justify-evenly items-center gap-8 sm:hidden'>
              <Button
                radius='sm'
                className='w-1/2 font-semibold h-12 text-base bg-gray-200'
                startContent={<MdViewInAr className='text-2xl mr-1' />}
                onClick={onOpen}
              >
                Xem 3D
              </Button>
              <Button
                radius='sm'
                className='w-1/2 font-semibold h-12 text-base bg-gray-200'
                startContent={<PiCube className='text-2xl mr-1' />}
                onClick={() => console.log('open')}
              >
                Chế độ AR
              </Button>
            </div>
          )}

          {hasKeyvalue && (
            <div>
              <h3 className='font-medium text-base text-nowrap whitespace-nowrap pb-2'>Phân loại</h3>
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
          )}

          <div>
            <h3 className='font-medium text-base text-nowrap whitespace-nowrap pb-2'>Số lượng</h3>
            <div className='flex justify-between flex-wrap flex-col xs:flex-row gap-y-4 gap-x-2'>
              <div className='flex items-center gap-2'>
                <Button
                  isIconOnly
                  isDisabled={
                    (activeVariant.sku ? false : true) || Number(selectedQuantity) <= 1 || selectedQuantity === ''
                  }
                  radius='sm'
                  variant='solid'
                  onClick={() => handleQuantity((Number(selectedQuantity) - 1).toString())}
                  className='bg-gray-200'
                >
                  <FaMinus />
                </Button>
                <Input
                  size='sm'
                  isDisabled={activeVariant.sku ? false : true}
                  isReadOnly={activeVariant.sku ? false : true}
                  value={selectedQuantity}
                  onValueChange={handleInputQuantity}
                  onBlur={() => {
                    if (selectedQuantity === '') {
                      setSelectedQuantity('1')
                    }
                  }}
                  type='text'
                  variant='bordered'
                  defaultValue='1'
                  className='max-w-14 min-w-14'
                  classNames={{
                    input: 'text-center',
                    inputWrapper: 'max-h-11 overflow-hidden'
                  }}
                />
                <Button
                  isIconOnly
                  isDisabled={
                    (activeVariant.sku ? false : true) ||
                    selectedQuantity === activeVariant.quantity.toString() ||
                    selectedQuantity === ''
                  }
                  radius='sm'
                  variant='solid'
                  onClick={() => handleQuantity((Number(selectedQuantity) + 1).toString())}
                  className='bg-gray-200'
                >
                  <FaPlus />
                </Button>
                {activeVariant.sku && (
                  <p className='text-nowrap whitespace-nowrap'>{activeVariant.quantity} mặt hàng có sẵn</p>
                )}
                {variantError && <p className='text-nowrap whitespace-nowrap'>Vui lòng chọn Phân loại hàng</p>}
              </div>
              <Button
                startContent={<FaCartPlus size={20} />}
                className='bg-[var(--light-orange-color)] font-medium text-base text-[var(--primary-orange-text-color)] h-12'
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
            {quantityEror && <p className='mt-2'>Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này</p>}
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
