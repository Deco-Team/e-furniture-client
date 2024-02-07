import { IProduct } from '~/global/interface'

export interface ICart {
  data: {
    _id: string
    items: ICartItem[]
    totalAmount: number
  }
}

export interface ICartItem {
  productId: string
  sku: string
  quantity: number
  product: IProduct
}

export interface IUpdateCartQuantity {
  productId: string
  sku: string
  quantity: number
}

export interface IDeteleCartItem {
  productId: string
  sku: string
}
