import CategoryList from '~/components/categoryList/CategoryList'
import { getCategories } from './home.action'
import { Link } from '@nextui-org/react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import ProductList from '~/components/productList/ProductList'
import { IProduct } from '~/global/interface'

async function getData() {
  const res = await getCategories(1, 10, '')
  return res.docs
}

export default async function Home() {
  const categories = await getData()

  const dummyData: IProduct[] = [
    {
      name: 'Sofa',
      images: ['https://m.media-amazon.com/images/I/61KtSpR0SfL._AC_UL480_FMwebp_QL65_.jpg'],
      rate: 0,
      variants: [
        {
          sku: 'EF20241011',
          price: 100,
          quantity: 10,
          dimensions: {
            height: 36,
            width: 72,
            length: 38
          },
          keyValue: {
            color: 'yellow',
            material: 'cotton'
          }
        },
        {
          sku: 'EF20241012',
          price: 200,
          quantity: 0,
          dimensions: {
            height: 36,
            width: 72,
            length: 38
          },
          keyValue: {
            color: 'yellow',
            material: 'cotton'
          }
        }
      ],
      categories: [
        {
          name: 'Ghế',
          image: 'https://demo.sirv.com/chair.jpg'
        }
      ]
    },
    {
      name: 'Sofa Luxury',
      images: ['https://m.media-amazon.com/images/I/61KtSpR0SfL._AC_UL480_FMwebp_QL65_.jpg'],
      rate: 0,
      variants: [
        {
          sku: 'EF20241010',
          price: 10,
          quantity: 20,
          dimensions: {
            height: 36,
            width: 72,
            length: 38
          },
          keyValue: {
            color: 'yellow',
            material: 'cotton'
          }
        }
      ],
      categories: [
        {
          name: 'Chair',
          image: 'https://www.ikea.com/us/en/images/products/nordviken-chair-antique-stain__0832454_pe777681_s5.jpg?f=s'
        }
      ]
    }
  ]

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

        <ProductList products={dummyData} />
      </div>
    </main>
  )
}
