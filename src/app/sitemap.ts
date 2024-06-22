import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.furnique.tech'
    },
    {
      url: 'https://www.furnique.tech/products'
    },
    {
      url: 'https://www.furnique.tech/contact'
    },
    {
      url: 'https://www.furnique.tech/booking/visit'
    },
    {
      url: 'https://www.furnique.tech/pricing'
    },
    {
      url: 'https://www.furnique.tech/booking/consultant'
    },
    {
      url: 'https://www.furnique.tech/ai'
    }
  ]
}
