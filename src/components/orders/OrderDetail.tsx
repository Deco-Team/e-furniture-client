'use client'

import OrderItemCard from '@components/orders/OrderItemCard'
import { Input, Textarea } from '@nextui-org/react'
import React from 'react'

import { IOrderDetail } from '@app/(customer)/order/order.interface'

interface OrderProps {
  order: IOrderDetail
}

const OrderDetail = ({ order }: OrderProps) => {
  return (
    <main className='flex pb-24 flex-col items-center'>
      <div className='max-w-screen-lg p-4 w-full'>
        <div>
          <div className='flex flex-col'>
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
                  description={value.sku}
                  quantity={value.quantity}
                  price={value.product.variants.find((variant) => value.sku === variant.sku)?.price ?? 0}
                />
              ))}
              {order.notes && (
                <div className='mb-4 flex flex-nowrap'>
                  <p className='text-sm md:text-base w-1/3'>Notes</p>
                  <p className='text-sm md:text-base text-right w-2/3'>{order.notes}</p>
                </div>
              )}
              <div>
                <div className='mb-4 flex justify-between'>
                  <p className='text-gray-500 text-base'>Sản phẩm</p>
                  <p className='text-gray-500 text-base'>${order?.totalAmount ?? 0}</p>
                </div>
                <div className='mb-4 flex justify-between'>
                  <p className='text-gray-500 text-base'>Phí giao hàng</p>
                  <p className='text-gray-500 text-base'>Miễn phí</p>
                </div>
                <div className='md:mb-4 flex justify-between'>
                  <p className='text-base font-semibold'>Tổng cộng</p>
                  <p className='text-xl font-semibold'>${order?.totalAmount ?? 0}</p>
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
