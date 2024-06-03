/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { getCategories } from '@actions/categories/categories.actions'
import { getProductsForPage } from '@actions/products/products.actions'
import { ICategory, IPagination, IProductResponse } from '@global/interface'
import React from 'react'
import {
  Button,
  Card,
  CardHeader,
  Divider,
  Pagination,
  Select,
  SelectItem,
  Selection,
  Skeleton,
  Slider,
  SliderValue
} from '@nextui-org/react'
import NextLink from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'
import ProductList from '@components/productList/ProductList'
import { useSearchParams } from 'next/navigation'

export const revalidate = 5

const ProductsPage = () => {
  const searchParams = useSearchParams()

  const category = searchParams.get('category')

  const [products, setProducts] = React.useState<IPagination<IProductResponse>>()
  const [categories, setCategories] = React.useState<ICategory[]>([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [filterOpen, setFilterOpen] = React.useState(!!category)
  const [filterPrice, setFilterPrice] = React.useState<SliderValue>([0, 5000000])
  const [sort, setSort] = React.useState<Selection>(new Set(['createdAt.desc']))
  const [selectedCategories, setSelectedCategories] = React.useState<Selection>(new Set(category ? [category] : []))
  const [isLoading, setIsLoading] = React.useState(false)
  const [onChangeFilterPrice, setOnChangeFilterPrice] = React.useState<SliderValue>([0, 5000000])

  const getData = async () => {
    setIsLoading(true)
    const [categories, products] = await Promise.all([
      getCategories(1, 99),
      getProductsForPage(currentPage, 15, filterPrice, Array.from(sort).join(','), Array.from(selectedCategories))
    ])

    if (!(products instanceof Error)) setProducts({ ...products, docs: products.docs })
    setCategories(categories ? categories?.docs : [])
    setIsLoading(false)
  }

  React.useEffect(() => {
    window.scrollTo(0, 0)
    getData()
    return () => {}
  }, [currentPage, filterPrice, sort, selectedCategories])

  const sorting = [
    { label: 'Mới nhất', value: 'createdAt.desc' },
    { label: 'Cũ nhất', value: 'createdAt.asc' },
    { label: 'Tên A-Z', value: 'name.asc' },
    { label: 'Tên Z-A', value: 'name.desc' }
  ]

  const handleReset = () => {
    if (Object.values(onChangeFilterPrice).toString() !== '0,5000000') setOnChangeFilterPrice([0, 5000000])
    if (Object.values(filterPrice).toString() !== '0,5000000') setFilterPrice([0, 5000000])
    if (Array.from(selectedCategories).length > 0) setSelectedCategories(new Set([]))
  }

  return (
    <main className='flex pb-24 flex-col items-center'>
      <div className='max-w-screen-lg p-4 w-full'>
        <Card className='bg-gray-200 mb-4 sm:mb-8 md:p-6 w-full'>
          <CardHeader className='flex gap-4 p-6'>
            <Button isIconOnly as={NextLink} href='/'>
              <FaArrowLeft />
            </Button>
            <h2 className='font-bold text-2xl md:text-4xl'>Sản phẩm</h2>
          </CardHeader>
        </Card>
        <div className='flex justify-between items-center z-50 mb-4 sm:mb-8 w-full h-16 bg-white sm:sticky sm:top-24'>
          <div className='flex items-center'>
            <Button
              variant='light'
              onClick={() => setFilterOpen((filterOpen) => !filterOpen)}
              startContent={<HiOutlineAdjustmentsHorizontal className='min-w-5 min-h-5' />}
            >
              Bộ lọc
            </Button>
            <Divider orientation='vertical' className='max-sm:hidden h-8' />
            {!isLoading && products ? (
              <p className='text-sm px-4 max-sm:hidden'>
                Hiển thị{' '}
                <span className='font-semibold'>
                  {products.docs.length > 0 ? (currentPage - 1) * 15 + 1 : 0} -{' '}
                  {15 * (currentPage - 1) + products.docs.length}
                </span>{' '}
                trên {products.totalDocs} sản phẩm
              </p>
            ) : (
              <Skeleton className='mx-4 w-60 h-5 rounded-md max-sm:hidden' />
            )}
          </div>
          <Select label='Sắp xếp' className='w-[180px]' selectedKeys={sort} size='sm' onSelectionChange={setSort}>
            {sorting.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div
          className={`flex max-sm:flex-col w-full transition-all relative justify-between ${filterOpen ? 'md:gap-8 sm:gap-4' : ''}`}
        >
          <div
            className={`sm:h-[50vh] overflow-hidden sm:sticky sm:top-48 transition-all ${filterOpen ? 'sm:max-w-[220px] w-full max-sm:max-h-[500px] max-sm:mb-4' : 'sm:max-w-0 sm:w-0 max-sm:max-h-0'}`}
          >
            <Slider
              label='Giá'
              step={500000}
              size='sm'
              color='foreground'
              showTooltip
              minValue={0}
              maxValue={5000000}
              defaultValue={[0, 5000000]}
              value={onChangeFilterPrice}
              onChange={setOnChangeFilterPrice}
              onChangeEnd={setFilterPrice}
              formatOptions={{ style: 'currency', currency: 'vnd' }}
              className='min-w-[220px]'
            />
            <Divider className='my-4' />
            <div className='flex justify-between items-center mb-4'>
              <p className='text-sm'>Phân loại</p>

              <Select
                label='Danh mục'
                className='w-[150px]'
                selectionMode='multiple'
                size='sm'
                selectedKeys={selectedCategories}
                onSelectionChange={setSelectedCategories}
              >
                {categories.map((category) => (
                  <SelectItem key={category._id || ''} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Button color='default' variant='bordered' className='w-full' onClick={handleReset}>
              Đặt lại
            </Button>
          </div>

          <div className={`flex flex-col items-center w-full`}>
            <h2 className='font-bold text-2xl sm:text-3xl md:text-4xl mb-8'>Tất cả sản phẩm</h2>
            {!isLoading ? (
              products?.docs.length ? (
                <ProductList
                  products={products.docs}
                  className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 gap-3 xs:gap-4 sm:gap-8 max-w-[900px]'
                />
              ) : (
                <div>Không có sản phẩm phù hợp</div>
              )
            ) : (
              <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 gap-3 xs:gap-4 sm:gap-8 max-w-[900px] w-full'>
                {[...Array(9)].map((_, index) => (
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
            {products && (
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
      </div>
    </main>
  )
}

export default ProductsPage
