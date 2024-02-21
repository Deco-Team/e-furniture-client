import { IProduct } from '@global/interface'

export interface ICart {
  _id: string
  items: ICartItem[]
  totalAmount: number
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

export interface IDeleteCartItem {
  productId: string
  sku: string
}

export interface IAddCartItem {
  productId: string
  sku: string
  quantity: number
}
