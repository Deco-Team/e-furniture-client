import CategoryList from '@components/categoryList/CategoryList'
import { Link } from '@nextui-org/react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import ProductList from '@components/productList/ProductList'
import { ICategory, IProduct } from '@global/interface'
import { getCategories } from '@actions/categories/categories.actions'
import { getProductList } from '@actions/products/products.actions'

interface Data {
  categories: Category[]
  products: Product[]
}

async function getData(): Promise<Data> {
  const [categories, products] = await Promise.all([getCategories(1, 18), getProductList(1, 8)])

  return {
    categories: (categories as { docs: ICategory[] }).docs,
    products: (products as { docs: IProduct[] }).docs
  }
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
