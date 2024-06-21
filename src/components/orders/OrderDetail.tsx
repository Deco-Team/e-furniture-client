'use client'

import OrderItemCard from '@components/orders/OrderItemCard'
import React, { useState } from 'react'

import { IOrderDetail, IOrderStatusHistory } from '@app/(customer)/order/order.interface'
import OrderTracking from './OrderTracking'
import { Button, Card, CardHeader, Divider, Image, useDisclosure } from '@nextui-org/react'
import { FaArrowLeft } from 'react-icons/fa'
import NextLink from 'next/link'
import OrderReviewModal from './OrderReviewModal'
import Rating from '@components/starRating/StartRating'
import moment from 'moment'
import { getOrder, getStatusHistory } from '@actions/order/order.actions'

interface OrderProps {
  order: IOrderDetail
  orderStatus: IOrderStatusHistory[] | null
}

const OrderDetail = ({ order: initialOrder, orderStatus: initialOrderStatus }: OrderProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const [order, setOrder] = useState<IOrderDetail>(initialOrder)
  const [orderStatus, setOrderStatus] = useState<IOrderStatusHistory[] | null>(initialOrderStatus)

  const getData = async (orderId: string) => {
    const [updatedOrder, updatedOrderStatus] = await Promise.all([getOrder(orderId), getStatusHistory(orderId)])
    updatedOrder && setOrder(updatedOrder)
    setOrderStatus(updatedOrderStatus)
  }

  return (
    <main className='flex pb-24 flex-col items-center'>
      <div className='max-w-screen-lg p-4 w-full'>
        <Card className='bg-gray-200 mb-4 md:mb-8 md:p-6'>
          <CardHeader className='flex gap-4 p-6'>
            <Button isIconOnly as={NextLink} href='/customer/orders'>
              <FaArrowLeft />
            </Button>
            <h2 className='font-bold text-2xl md:text-4xl'>Thông tin đơn hàng</h2>
          </CardHeader>
        </Card>
        <div>
          <div className='sm:px-4 gap-2 flex flex-wrap w-full justify-between'>
            <p className='text-sm md:text-base whitespace-nowrap'>
              Mã đơn hàng: <span className='font-semibold'>{order.orderId}</span>
            </p>
            {order.reason && <p className='text-sm md:text-base whitespace-nowrap'>Lý do hủy: {order.reason}</p>}
          </div>
          <div className='flex flex-col'>
            {orderStatus && (
              <OrderTracking orderStatus={orderStatus} isReviewed={order.items.some((item) => item.review)} />
            )}

            {/* Modal review */}
            {orderStatus?.some((status) => status.orderStatus === 'COMPLETED') && (
              <div className='flex flex-col p-4 max-sm:px-0'>
                {order.items.some((item) => item.review) ? (
                  <div className='flex flex-col gap-2'>
                    <h3 className='font-semibold text-xl md:text-2xl mb-2'>Đánh giá của bạn</h3>
                    {order.items.map((item, index) => (
                      <React.Fragment key={item.product._id}>
                        <div className='flex gap-2 w-full h-full max-sm:flex-wrap'>
                          <div className='flex gap-4 w-[500px]'>
                            <Image
                              removeWrapper
                              src={item.product.images[0]}
                              width='100%'
                              className='w-full max-w-[75px] object-cover aspect-square'
                              alt={item.product.name}
                            />
                            <div className='flex flex-col gap-1 w-full'>
                              <h4 className='font-semibold'>{item.product.name}</h4>
                              <p className='text-gray-500 text-sm'>SKU: {item.sku}</p>
                            </div>
                          </div>
                          <Divider orientation='vertical' className='max-sm:hidden h-16' />
                          <div className='flex flex-col gap-1 w-full'>
                            <div className='flex justify-between flex-wrap items-center'>
                              <h4 className='font-semibold'>
                                {order.customer.lastName + ' ' + order.customer.firstName}
                              </h4>
                              <p className='text-gray-500 text-sm'>
                                {moment(item.review?.createdAt).format('HH:mm:ss DD/MM/YYYY')}
                              </p>
                            </div>

                            <Rating
                              ratingInPercent={item.review?.rate ? item.review?.rate * 20 : 0}
                              iconSize='m'
                              showOutOf={true}
                              enableUserInteraction={false}
                            />
                            <p className='text-gray-500 text-sm'>{item.review?.comment}</p>
                          </div>
                        </div>
                        {index < order.items.length - 1 && <Divider className='my-2' />}
                      </React.Fragment>
                    ))}
                  </div>
                ) : moment(new Date()).diff(
                    orderStatus?.find((status) => status.orderStatus === 'COMPLETED')?.timestamp,
                    'days'
                  ) > 7 ? (
                  <p>Cảm ơn bạn đã mua sắm ở Furnique!</p>
                ) : (
                  <div className='flex gap-4 justify-between items-center max-sm:flex-col'>
                    <p className='text-sm'>
                      Mỗi đánh giá của bạn là động lực để chúng mình phát triển. Nên đừng ngần ngại để lại một chiếc
                      đánh giá nhỏ nhỏ nhé!
                    </p>
                    <Button
                      onClick={onOpen}
                      className='bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)] max-sm:w-full min-w-60 h-12 font-semibold disabled:opacity-50 disabled:hover:opacity-50'
                    >
                      Đánh giá
                    </Button>
                    <OrderReviewModal
                      isOpen={isOpen}
                      onOpenChange={onOpenChange}
                      onClose={onClose}
                      orderItems={order.items}
                      orderId={order._id}
                      onUpdate={getData}
                    />
                  </div>
                )}
              </div>
            )}

            <div className='md:col-span-2 p-4 max-sm:px-0'>
              <h3 className='font-semibold text-xl md:text-2xl mb-4'>Địa chỉ nhận hàng</h3>
              <h3 className='font-medium text-sm md:text-base mb-2'>
                {order.customer.lastName + ' ' + order.customer.firstName}
              </h3>
              <p className='text-gray-500 text-sm md:text-base mb-2'>{order.customer.phone}</p>
              <p className='text-gray-500 text-sm md:text-base mb-2'>{order.customer.email}</p>
              <p className='text-gray-500 text-sm md:text-base mb-2'>{order.customer.shippingAddress}</p>
            </div>

            {/* Cart information */}
            <div className='p-4 max-sm:px-0'>
              <h3 className='font-semibold text-xl md:text-2xl mb-4'>Đơn hàng của bạn</h3>
              {order.items.map((value) => (
                <OrderItemCard
                  key={value.productId}
                  imageURL={value.product.images[0]}
                  name={value.product.name}
                  slug={value.product.slug}
                  description={value.sku}
                  quantity={value.quantity}
                  price={value.product.variants.find((variant) => value.sku === variant.sku)?.price ?? 0}
                />
              ))}
              {order.notes && (
                <div className='mb-4 flex flex-nowrap'>
                  <p className='text-sm md:text-base w-1/3'>Ghi chú</p>
                  <p className='text-sm md:text-base text-right w-2/3'>{order.notes}</p>
                </div>
              )}
              <div>
                <div className='mb-4 flex justify-between'>
                  <p className='text-gray-500 text-base'>Sản phẩm</p>
                  <p className='text-gray-500 text-base'>
                    {Intl.NumberFormat('en-DE').format(order?.totalAmount ?? 0)} &#8363;
                  </p>
                </div>
                <div className='mb-4 flex justify-between'>
                  <p className='text-gray-500 text-base'>Phí giao hàng</p>
                  <p className='text-gray-500 text-base'>Miễn phí</p>
                </div>
                <div className='md:mb-4 flex justify-between'>
                  <p className='text-base font-semibold'>Tổng cộng</p>
                  <p className='text-xl font-semibold'>
                    {Intl.NumberFormat('en-DE').format(order?.totalAmount ?? 0)} &#8363;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default OrderDetail
