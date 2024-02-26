import { IOrderStatusHistory } from '@app/(customer)/order/order.interface'
import { Progress } from '@nextui-org/react'
import moment from 'moment'
import React from 'react'
import { FaMoneyBillWave, FaReceipt, FaRegTimesCircle, FaTruck } from 'react-icons/fa'
import { HiInboxArrowDown } from 'react-icons/hi2'

interface OrderTrackingProps {
  orderStatus: IOrderStatusHistory[]
}

const OrderTracking = ({ orderStatus }: OrderTrackingProps) => {
  const defaultStatus = [
    {
      orderStatus: 'PENDING',
      message: 'Đơn hàng đã đặt',
      activeMessage: 'Đơn hàng đã đặt',
      icon: <FaReceipt className='w-1/2 h-1/2 text-default' />,
      activeIcon: <FaReceipt className='w-1/2 h-1/2 text-green-600' />
    },
    {
      orderStatus: 'CONFIRMED',
      message: 'Xác nhận thông tin đơn hàng',
      activeMessage: 'Đã xác nhận thông tin đơn hàng',
      icon: <FaMoneyBillWave className='w-1/2 h-1/2 text-default' />,
      activeIcon: <FaMoneyBillWave className='w-1/2 h-1/2 text-green-600' />
    },
    {
      orderStatus: 'DELIVERING',
      message: 'Giao cho ĐVVC',
      activeMessage: 'Đã giao cho ĐVVC',
      icon: <FaTruck className='w-1/2 h-1/2 text-default' />,
      activeIcon: <FaTruck className='w-1/2 h-1/2 text-green-600' />
    },
    {
      orderStatus: 'COMPLETED',
      message: 'Nhận được hàng',
      activeMessage: 'Đã nhận được hàng',
      icon: <HiInboxArrowDown className='w-1/2 h-1/2 text-default' />,
      activeIcon: <HiInboxArrowDown className='w-1/2 h-1/2 text-green-600' />
    }
  ]

  const [progress] = React.useState(orderStatus.length)
  const [cancelIndex] = React.useState(orderStatus.findIndex((status) => status.orderStatus === 'CANCELED'))

  return (
    <div className='w-full relative flex justify-between flex-nowrap py-4 sm:px-4 sm:py-6'>
      <Progress
        size='sm'
        color='success'
        aria-label='Loading...'
        value={(progress - 1) * 33}
        className='!w-[calc(100%-112px)] absolute -z-10 mx-10 top-[56px] -translate-y-1/2 max-sm:hidden'
      />

      {defaultStatus.map((status, index) => {
        const statusObj = orderStatus.find((s) => s.orderStatus === status.orderStatus)
        if (statusObj) {
          return (
            <div
              key={status.orderStatus}
              className={`flex sm:flex-col items-center sm:max-w-40 ${index === progress - 1 ? '' : 'max-sm:hidden'}`}
            >
              <div className='min-w-16 sm:mx-10 mr-5 aspect-square flex items-center justify-center rounded-full bg-white border-4 border-green-500'>
                {status.activeIcon}
              </div>
              <div className='flex flex-col'>
                <p className='sm:mt-5 mb-1 sm:text-center'>{status.activeMessage}</p>
                <p className='text-xs sm:text-center text-gray-500'>
                  {moment(statusObj.timestamp).format('HH:mm:ss DD/MM/YYYY')}
                </p>
              </div>
            </div>
          )
        } else {
          if (orderStatus.some((s) => s.orderStatus === 'CANCELED')) {
            if (cancelIndex === index) {
              const cancelStatus = orderStatus.find((s) => s.orderStatus === 'CANCELED')
              return (
                <div
                  key={status.orderStatus}
                  className={`flex sm:flex-col items-center sm:max-w-40 ${index === progress - 1 ? '' : 'max-sm:hidden'}`}
                >
                  <div className='min-w-16 sm:mx-10 mr-5 aspect-square flex items-center justify-center rounded-full bg-white border-4 border-red-500'>
                    <FaRegTimesCircle className='w-1/2 h-1/2 text-red-600' />
                  </div>
                  <div className='flex flex-col'>
                    <p className='sm:mt-5 mb-1 sm:text-center'>Đơn hàng đã hủy</p>
                    <p className='text-xs sm:text-center text-gray-500'>
                      {moment(cancelStatus?.timestamp).format('HH:mm:ss DD/MM/YYYY')}
                    </p>
                  </div>
                </div>
              )
            }
          }
        }
        return (
          <div key={status.orderStatus} className='flex flex-col items-center max-w-40 max-sm:hidden'>
            <div className='w-16 mx-10 aspect-square flex items-center justify-center rounded-full bg-white border-4'>
              {status.icon}
            </div>
            <p className='mt-5 mb-1 text-center'>{status.message}</p>
          </div>
        )
      })}
    </div>
  )
}

export default OrderTracking
