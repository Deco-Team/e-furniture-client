import { IProduct } from '@global/interface'
import { OrderStatus, OrderStatusColor, TransactionStatus } from './order.enum'
import { ICart, ICartItem } from '../cart/cart.interface'

export interface IDistrict {
  level2_id: string
  name: string
  type: string
  level3s: IWard[]
}

export interface IWard {
  level3_id: string
  name: string
  type: string
}

export interface IOrder {
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
    shippingAddress: string
  }
  items: {
    productId: string
    sku: string
  }[]

  notes: string
}

export interface IOrderResponse {
  _id: string
  customer: ICustomer
  totalAmount: number
  items: ICartItem[]
  orderDate: string
  orderStatus: string
  orderStatusColor: OrderStatusColor
  transactionStatus: TransactionStatus
  notes: string
  createdAt: string
  updatedAt: string
  reason: string
}

export interface ICustomer {
  firstName: string
  lastName: string
  email: string
  phone: string
  shippingAddress: string
  _id: string
}

export interface IOrderDetail {
  _id: string
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
    shippingAddress: string
  }
  items: {
    productId: string
    sku: string
    quantity: number
    product: IProduct
  }[]
  notes: string
  totalAmount: number
}

export interface IOrderStatusHistory {
  orderStatus: string
  transactionStatus: string
  timestamp: Date
}
