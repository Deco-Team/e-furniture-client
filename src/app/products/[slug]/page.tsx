import { getProduct } from '@actions/products/products.actions'
import ErrorPage from '@components/error/error'
import ProductDetail from '@components/product/ProductDetail'

const getData = async (slug: string) => {
  const product = await getProduct(slug)

  return product
}

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
