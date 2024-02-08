import { IProduct } from '@global/interface'
import dynamic from 'next/dynamic'

const ProductCard = dynamic(() => import('@components/cards/ProductCard'), { ssr: true })

interface ProductListProps {
  products: IProduct[]
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-4'>
      {products.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  )
}
