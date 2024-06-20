import type { Metadata, ResolvingMetadata } from 'next'

import { getProduct, getProductList } from '@actions/products/products.actions'
import ErrorPage from '@components/error/error'
import ProductDetail from '@components/product/ProductDetail'
import { cookies } from 'next/headers'

const getData = async (slug: string) => {
  const product = await getProduct(slug)

  return product
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getData(params.slug)

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const productImages = product ? product.images : []

  return {
    title: product ? `Furnique | Chi Tiết Sản Phẩm: ${product.name}` : 'Không Tìm Thấy',
    description: product
      ? `Nhận thông tin chi tiết về ${product.description} của chúng tôi. Từ kích thước đến chất liệu, khám phá mọi chi tiết. Furnique đảm bảo tay nghề xuất sắc và sự thoải mái.`
      : 'Không tìm thấy sản phẩm',
    openGraph: {
      images: [...productImages, ...previousImages]
    }
  }
}

export const generateStaticParams = async () => {
  const response = await getProductList(1, 99, undefined, 'rate.desc_createdAt.desc')

  return response ? response.docs.map((product) => ({ slug: product.slug })) : []
}

export const revalidate = 5

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
