import { getProduct, getProductList } from '@actions/products/products.actions'
import ErrorPage from '@components/error/error'
import ProductDetail from '@components/product/ProductDetail'
import { cookies } from 'next/headers'

const getData = async (slug: string) => {
  const product = await getProduct(slug)

  return product
}

export const generateStaticParams = async () => {
  const response = await getProductList(1, 100, 'rate.desc_createdAt.desc')

  return response ? response.docs.map((product) => ({ slug: product.slug })) : []
}

const revalidate = 0

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getData(params.slug)
  const isLogin = cookies().get('accessToken') ? true : false

  return !product ? (
    <ErrorPage />
  ) : (
    <main className='flex pb-24 flex-col items-center'>
      <ProductDetail product={product} isLogin={isLogin} />
    </main>
  )
}
