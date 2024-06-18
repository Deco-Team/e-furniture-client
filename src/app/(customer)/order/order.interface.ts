import { IProduct } from '@global/interface'
import { OrderStatusColor, TransactionStatus } from './order.enum'
import { ICartItem } from '../cart/cart.interface'

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

export interface IAIOrder {
  plan: 'PERSONAL' | 'PREMIUM'
  paymentMethod: 'PAY_OS' | 'MOMO'
}

export interface IOrderResponse {
  _id: string
  orderId: string
  customer: ICustomer
  totalAmount: number
  items: ICartItem[]
  orderDate: string
  orderStatus: string
  orderStatusColor: OrderStatusColor
  transactionStatus: TransactionStatus
  payment: IPayment
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
  orderId: string
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
  orderDate: string
  orderStatus: string
  transactionStatus: TransactionStatus
  payment: IPayment
  notes: string
  totalAmount: number
  reason: string
}

export interface IOrderStatusHistory {
  orderStatus: string
  transactionStatus: string
  timestamp: Date
}

export interface IPayment {
  paymentMethod: string
  amount: number
}
