/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { getConsultantBookingList } from '@actions/booking/bookingConsultant.action'
import { IPagination } from '@global/interface'
import { Button, Card, CardBody, CardHeader, Chip, Divider, Image, Pagination } from '@nextui-org/react'
import moment from 'moment'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { BookingStatus, BookingStatusColor } from './consultant-booking.enum'
import { IConsultantBookingResponse } from './consultant-booking.interface'

const ConsultantBookingListPage = () => {
  const [consultantBookingList, setConsultantBookingList] = useState<IPagination<IConsultantBookingResponse>>()
  const [currentPage, setCurrentPage] = useState(1)
  const getData = async () => {
    const data = await getConsultantBookingList(currentPage, 10)
    if (data) {
      const translatedStatus = data.docs.map((value) => {
        switch (value.bookingStatus) {
          case BookingStatus.PENDING:
            return {
              ...value,
              bookingStatusColor: BookingStatusColor.PRIMARY,
              bookingStatus: 'ĐANG XỬ LÝ'
            }
          case BookingStatus.CANCELED:
            return {
              ...value,
              bookingStatusColor: BookingStatusColor.DANGER,
              bookingStatus: 'ĐÃ HỦY'
            }
          case BookingStatus.COMPLETED:
            return {
              ...value,
              bookingStatusColor: BookingStatusColor.SUCCESS,
              bookingStatus: 'ĐÃ HOÀN THÀNH'
            }
          case BookingStatus.CONFIRMED:
            return {
              ...value,
              bookingStatusColor: BookingStatusColor.SUCCESS,
              bookingStatus: 'ĐÃ XÁC NHẬN'
            }
          case BookingStatus.DELETED:
            return {
              ...value,
              bookingStatusColor: BookingStatusColor.DANGER,
              bookingStatus: 'ĐÃ XÓA'
            }
          default:
            return value
        }
      })
      setConsultantBookingList({
        ...data,
        docs: translatedStatus
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
        {consultantBookingList && (
          <div className='w-full flex flex-col items-center justify-center'>
            <Card className='bg-gray-200 mb-8 md:p-6 w-full'>
              <CardHeader className='flex gap-4 p-6'>
                <Button isIconOnly as={Link} href='/'>
                  <FaArrowLeft />
                </Button>
                <h2 className='font-bold text-2xl md:text-4xl'>Lịch sử tư vấn thiết kế</h2>
              </CardHeader>
            </Card>
            <div className='w-full flex flex-col self-start'>
              {consultantBookingList.docs.map((value, i) => (
                <Card key={i} className='p-4 md:p-6 mb-4 cursor-pointer' as={Link} href='#'>
                  <CardHeader className='flex flex-row justify-between items-start p-0'>
                    <div className='flex flex-col w-full overflow-hidden'>
                      <p>
                        Ngày đặt:{' '}
                        <span className='font-semibold text-base'>
                          {moment(value.bookingDate).format('hh:mm DD-MM-yyyy')}
                        </span>
                      </p>
                    </div>
                    <Chip variant='flat' color={value.bookingStatusColor ?? 'default'} className='ml-4 w-36'>
                      {value.bookingStatus}
                    </Chip>
                  </CardHeader>
                  <Divider className='my-4' />
                  <CardBody className='p-0'>
                    <Card key={i} className='w-full shadow-none'>
                      <CardBody className='p-0'>
                        <div className='flex flex-row gap-4 md:gap-2'>
                          <Image
                            removeWrapper
                            width='100%'
                            className='w-full max-w-[100px] object-cover aspect-square'
                            src={value.consultant.avatar}
                            alt='img'
                          />
                          <div className='w-full flex flex-col justify-between'>
                            <div>
                              <p className='text-xl font-semibold'>{`${value.consultant.lastName} ${value.consultant.firstName}`}</p>
                              <p className='text-gray-500'>Mã nhân viên: {value.consultant.staffCode}</p>
                            </div>
                            <div className='flex flex-row justify-between'>
                              {/* <p className='text-gray-500'>Số lượng: {items.quantity}</p>
                                <p className='text-base font-semibold'>
                                  {Intl.NumberFormat('en-DE').format(
                                    items.product.variants.find((variant) => variant.sku === items.sku)?.price ?? 0
                                  )}{' '}
                                  &#8363;
                                </p> */}
                            </div>
                          </div>
                        </div>
                      </CardBody>
                      <Divider className='my-4' />
                    </Card>
                    {/* <p className='text-lg text-right font-normal py-3'>
                      Thành tiền:{' '}
                      <span className='font-semibold'>
                        {Intl.NumberFormat('en-DE').format(value.totalAmount)} &#8363;
                      </span>
                    </p> */}
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
              total={consultantBookingList.totalPages}
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

export default ConsultantBookingListPage
