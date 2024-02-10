import { getProduct, getProductList } from '@actions/products/products.actions'
import ErrorPage from '@components/error/error'
import ProductDetail from '@components/product/ProductDetail'

const getData = async (slug: string) => {
  const product = await getProduct(slug)

  return product
}

export const generateStaticParams = async () => {
  const response = await getProductList(1, 100, 'rate.desc_createdAt.desc')

  return response ? response.docs.map((product) => ({ slug: product.slug })) : []
}

export const revalidate = 0

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getData(params.slug)

  return !product ? (
    <ErrorPage />
  ) : (
    <main className='min-h-screen py-24 flex flex-col items-center'>
      <ProductDetail product={product} />
    </main>
  )
}
