import CategoryList from '@components/categoryList/CategoryList'
import { Link } from '@nextui-org/react'
import NextLink from 'next/link'
import { FaLongArrowAltRight } from 'react-icons/fa'
import ProductList from '@components/productList/ProductList'
import { getCategories } from '@actions/categories/categories.actions'
import { getProductList } from '@actions/products/products.actions'

const getData = async () => {
  const [categories, products] = await Promise.all([getCategories(1, 18), getProductList(1, 8)])

  return {
    categories: categories ? categories.docs : [],
    products: products ? products.docs : []
  }
}

export const revalidate = 0

export default async function Home() {
  const { categories, products } = await getData()

  return (
    <main className='flex pb-24 flex-col items-center'>
      {/* Category part */}
      <CategoryList categories={categories} />

      {/* Products part: 8 products */}
      <div className='max-w-screen-lg p-4 w-full'>
        <div className='mb-5 flex items-center gap-5 justify-between xs:justify-start'>
          <h2 className='font-bold text-xl sm:text-2xl text-black'>Sản phẩm</h2>
          <Link
            as={NextLink}
            size='sm'
            href='/products'
            className='text-[var(--primary-orange-text-color)] cursor-pointer gap-1'
            underline='hover'
          >
            Xem thêm
            <FaLongArrowAltRight />
          </Link>
        </div>

        <ProductList products={products} className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-4' />
      </div>
    </main>
  )
}
