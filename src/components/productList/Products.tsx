'use client'

import { IProduct } from '@global/interface'
import ProductList from './ProductList'
import { Button, Card, CardHeader, Divider, Pagination, Select, SelectItem } from '@nextui-org/react'
import NextLink from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'
import { ceil } from 'lodash'

interface ProductsProps {
  products: IProduct[]
}

const Products = ({ products }: ProductsProps) => {
  const sorting = [
    { label: 'Mới nhất', value: 'newest' },
    { label: 'Giá thấp đến cao', value: 'low-to-high' },
    { label: 'Giá cao đến thấp', value: 'high-to-low' },
    { label: 'Tên A-Z', value: 'a-z' },
    { label: 'Tên Z-A', value: 'z-a' }
  ]
  return (
    <main className='flex pb-24 flex-col items-center'>
      <div className='max-w-screen-lg p-4 w-full'>
        <Card className='bg-gray-200 mb-4 md:p-6'>
          <CardHeader className='flex gap-4 p-6'>
            <Button isIconOnly as={NextLink} href='/'>
              <FaArrowLeft />
            </Button>
            <h2 className='font-bold text-2xl md:text-4xl'>Sản phẩm</h2>
          </CardHeader>
        </Card>
        <div className='flex justify-between mb-8'>
          <div className='flex items-center'>
            <Button variant='light' startContent={<HiOutlineAdjustmentsHorizontal className='min-w-5 min-h-5' />}>
              Bộ lọc
            </Button>
            <Divider orientation='vertical' className='max-sm:hidden' />
            <p className='text-sm px-4 max-sm:hidden'>
              Hiển thị <span className='font-semibold'>8 - 15</span> trên 32 sản phẩm
            </p>
          </div>
          <div className='flex items-center '>
            <Select label='Sắp xếp' className='w-[180px]' size='sm'>
              {sorting.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <ProductList products={products} className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 gap-8' />
        <Pagination
          className='mx-auto mt-5'
          initialPage={1}
          //   onChange={setCurrentPage}
          page={1}
          showControls
          total={ceil(products.length / 15)}
          classNames={{
            cursor: 'bg-[var(--light-orange-color)] text-[var(--primary-orange-text-color)]'
          }}
        />
      </div>
    </main>
  )
}

export default Products
