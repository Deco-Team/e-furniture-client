/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { getOrderList } from '@actions/order/order.actions'
import { OrderStatus, OrderStatusColor } from '@app/(customer)/order/order.enum'
import { IOrderResponse } from '@app/(customer)/order/order.interface'
import { IPagination } from '@global/interface'
import { Button, Card, CardBody, CardHeader, Chip, Divider, Image, Pagination } from '@nextui-org/react'
import moment from 'moment'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const OrderListPage = () => {
  const [orderList, setOrderList] = useState<IPagination<IOrderResponse>>()
  const [currentPage, setCurrentPage] = useState(1)
  const getData = async () => {
    const data = await getOrderList(currentPage, 10)
    if (data) {
      const tranlatedStatus = data.docs.map((value) => {
        switch (value.orderStatus) {
          case OrderStatus.PENDING:
            return {
              ...value,
              orderStatusColor: OrderStatusColor.PRIMARY,
              orderStatus: 'ĐANG XỬ LÝ'
            }
          case OrderStatus.CANCELED:
            return {
              ...value,
              orderStatusColor: OrderStatusColor.DANGER,
              orderStatus: 'ĐÃ HỦY'
            }
          case OrderStatus.COMPLETED:
            return {
              ...value,
              orderStatusColor: OrderStatusColor.SUCCESS,
              orderStatus: 'ĐÃ HOÀN THÀNH'
            }
          case OrderStatus.CONFIRMED:
            return {
              ...value,
              orderStatusColor: OrderStatusColor.SUCCESS,
              orderStatus: 'ĐÃ XÁC NHẬN'
            }
          case OrderStatus.DELETED:
            return {
              ...value,
              orderStatusColor: OrderStatusColor.DANGER,
              orderStatus: 'ĐÃ XÓA'
            }
          case OrderStatus.DELIVERING:
            return {
              ...value,
              orderStatusColor: OrderStatusColor.PRIMARY,
              orderStatus: 'ĐANG GIAO HÀNG'
            }
          default:
            return value
        }
      })
      setOrderList({
        ...data,
        docs: tranlatedStatus
      })
    }
  }

  useEffect(() => {
    getData()
    return () => {}
  }, [currentPage])

  return (
    <main className='flex pb-24 flex-col items-center'>
      <div className='max-w-screen-lg p-4 w-full'>
        {orderList && (
          <div className='w-full flex flex-col items-center justify-center'>
            <Card className='bg-gray-200 mb-8 md:p-6 w-full'>
              <CardHeader className='flex gap-4 p-6'>
                <Button isIconOnly as={Link} href='/'>
                  <FaArrowLeft />
                </Button>
                <h2 className='font-bold text-2xl md:text-4xl'>Lịch sử đơn hàng</h2>
              </CardHeader>
            </Card>
            <div className='w-full flex flex-col self-start'>
              {orderList.docs.map((value, i) => (
                <Card
                  key={i}
                  className='p-4 md:p-6 mb-4 cursor-pointer'
                  as={Link}
                  href={`/customer/orders/${value._id}`}
                >
                  <CardHeader className='flex flex-row justify-between items-start p-0'>
                    <div className='flex flex-col w-full overflow-hidden'>
                      {/* <p className='font-bold text-lg text-nowrap text-ellipsis overflow-hidden'>
                        Đơn hàng {value._id}
                      </p> */}
                      <p>
                        Ngày tạo:{' '}
                        <span className='font-semibold text-base'>
                          {moment(value.createdAt).format('hh:mm:ss DD-MM-yyyy')}
                        </span>
                      </p>
                    </div>
                    <Chip variant='flat' color={value.orderStatusColor ?? 'default'} className='ml-4 w-36'>
                      {value.orderStatus}
                    </Chip>
                  </CardHeader>
                  <Divider className='my-4' />
                  <CardBody className='p-0'>
                    {value.items.map((items, i) => (
                      <Card key={i} className='w-full shadow-none'>
                        <CardBody className='p-0'>
                          <div className='flex flex-row gap-4 md:gap-2'>
                            <Image
                              removeWrapper
                              width='100%'
                              className='w-full max-w-[100px] object-cover aspect-square'
                              src={items.product.images[0]}
                              alt='img'
                            />
                            <div className='w-full flex flex-col justify-between'>
                              <div>
                                <p className='text-xl font-semibold'>{items.product.name}</p>
                                <p className='text-gray-500'>Sku: {items.sku}</p>
                              </div>
                              <div className='flex flex-row justify-between'>
                                <p className='text-gray-500'>Số lượng: {items.quantity}</p>
                                <p className='text-base font-semibold'>
                                  {Intl.NumberFormat('en-DE').format(
                                    items.product.variants.find((variant) => variant.sku === items.sku)?.price ?? 0
                                  )}{' '}
                                  &#8363;
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                        <Divider className='my-4' />
                      </Card>
                    ))}
                    <p className='text-lg text-right font-normal py-3'>
                      Thành tiền:{' '}
                      <span className='font-semibold'>
                        {Intl.NumberFormat('en-DE').format(value.totalAmount)} &#8363;
                      </span>
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
            <Pagination
              className='mx-auto mt-5'
              initialPage={1}
              onChange={setCurrentPage}
              page={currentPage}
              showControls
              total={orderList.totalPages}
              classNames={{
                cursor: 'bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)]'
              }}
            />
          </div>
        )}
      </div>
    </main>
  )
}

export default OrderListPage
