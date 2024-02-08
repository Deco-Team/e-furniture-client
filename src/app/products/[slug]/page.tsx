import { getProduct, getProductList } from '@actions/products/products.actions'
import ErrorPage from '@components/error/error'
import ProductDetail from '@components/product/ProductDetail'
import { IProduct } from '@global/interface'

export async function generateStaticParams() {
  const products = await getProductList(1, 100)

  return (products as { docs: IProduct[] }).docs.map((product: IProduct) => {
    return {
      slug: product.slug
    }
  })
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const validSlugs = await generateStaticParams()
  const validSlug = validSlugs.find((validSlug) => validSlug.slug === params.slug)

  if (!validSlug) {
    // If the requested slug is not found in the list, render a 404 page
    return <ErrorPage />
  }

  const product = await getProduct(params.slug)

  return (
    <main className='min-h-screen py-24 flex flex-col items-center'>
      <ProductDetail product={product as IProduct} />
    </main>
  )
}
