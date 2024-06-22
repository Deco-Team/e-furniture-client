import { getProductList } from '@actions/products/products.actions'
import { MetadataRoute } from 'next/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { docs: products } = (await getProductList(1, 99, undefined, 'rate.desc_createdAt.desc')) ?? { docs: [] }
  return products.map((product) => ({
    url: `https://furnique.tech/products/${product.slug}`
  }))
}
