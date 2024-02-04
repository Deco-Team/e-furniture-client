import CategoryList from '~/components/category list/CategoryList'
import { getCategories, getProductList } from './homeAction'
import { Link } from '@nextui-org/react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import ProductList from '~/components/productList/ProductList'
import { Category, Product } from '~/global/interface'

interface Data {
  categories: Category[]
  products: Product[]
}

async function getData(): Promise<Data> {
  const categories = await getCategories(1, 18, '')
  const products = await getProductList(1, 8, '')
  return { categories: categories.docs, products: products.docs }
}

export default async function Home() {
  const { categories, products } = await getData()

  return (
    <main className='min-h-screen py-24 flex flex-col items-center'>
      <h2>This is Home page</h2>

      {/* Category part */}
      <CategoryList categories={categories} />

      {/* Products part: 8 products */}
      <div className='max-w-screen-lg p-4 w-full'>
        <div className='mb-5 flex items-center gap-5 justify-between xs:justify-start'>
          <h2 className='font-bold text-xl xs:text-2xl text-black'>Sản phẩm</h2>
          <Link size='sm' className='text-[var(--primary-orange-text-color)] cursor-pointer gap-1' underline='hover'>
            Xem thêm
            <FaLongArrowAltRight />
          </Link>
        </div>

        <ProductList products={products} />
      </div>
    </main>
  )
}
