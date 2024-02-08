import { IProduct } from '@global/interface'

export interface ICart {
  _id: string
  items: IProduct[]
  totalAmount: number
}
