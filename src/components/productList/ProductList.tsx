import { IProduct } from '@global/interface'
import ProductCard from '@components/cards/ProductCard'

interface ProductListProps {
  products: IProduct[]
  className: string
}

export default function ProductList({ products, className }: ProductListProps) {
  return (
    <div className={className}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}
