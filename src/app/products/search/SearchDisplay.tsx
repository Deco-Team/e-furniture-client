/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { getProductsForPage } from '@actions/products/products.actions'
import ProductList from '@components/productList/ProductList'
import { IPagination, IProductResponse } from '@global/interface'
import { Button, Card, CardHeader, Pagination, Skeleton } from '@nextui-org/react'
import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const SearchDisplay = () => {
  const search = useSearchParams().get('search')
  const [products, setProducts] = useState<IPagination<IProductResponse>>()
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const getData = async () => {
    setIsLoading(true)
    const products = await getProductsForPage(currentPage, 15, undefined, undefined, undefined, search ? search : '')

    if (!(products instanceof Error)) setProducts(products)
    setIsLoading(false)
  }

  React.useEffect(() => {
    window.scrollTo(0, 0)
    getData()
    return () => {}
  }, [currentPage, search])

  return (
    <main className='flex pb-24 flex-col items-center min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-96px)]'>
      <div className='max-w-screen-lg p-4 w-full'>
        <Card className='bg-gray-200 mb-4 sm:mb-8 md:p-6 w-full'>
          <CardHeader className='flex gap-4 p-6'>
            <Button isIconOnly as={NextLink} href='/'>
              <FaArrowLeft />
            </Button>
            <h2 className='font-bold text-2xl md:text-4xl'>Tìm kiếm</h2>
          </CardHeader>
        </Card>
        <div className={`flex flex-col items-center w-full`}>
          {!isLoading && products ? (
            <ProductList
              products={products ? products.docs : []}
              className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-8'
            />
          ) : (
            <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-4 w-full'>
              {[...Array(8)].map((_, index) => (
                <Card key={index} shadow='sm' className='space-y-5 p-4' radius='lg'>
                  <Skeleton className='rounded-lg aspect-square'>
                    <div className='h-24 rounded-lg bg-default-300'></div>
                  </Skeleton>
                  <div className='space-y-3'>
                    <Skeleton className='w-3/5 rounded-lg'>
                      <div className='h-3 w-3/5 rounded-lg bg-default-200'></div>
                    </Skeleton>
                    <Skeleton className='w-4/5 rounded-lg'>
                      <div className='h-3 w-4/5 rounded-lg bg-default-200'></div>
                    </Skeleton>
                    <Skeleton className='w-2/5 rounded-lg'>
                      <div className='h-3 w-2/5 rounded-lg bg-default-300'></div>
                    </Skeleton>
                  </div>
                </Card>
              ))}
            </div>
          )}
          {products?.docs.length === 0 && (
            <div className='flex flex-col items-center w-full'>
              <h2 className='font-bold text-2xl sm:text-3xl md:text-4xl mb-8'>Không tìm thấy sản phẩm</h2>
            </div>
          )}
          {products && products.page > 1 && (
            <Pagination
              className='mx-auto mt-5'
              initialPage={1}
              onChange={setCurrentPage}
              page={1}
              showControls
              total={products.totalPages}
              classNames={{
                cursor: 'bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)]'
              }}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default SearchDisplay
