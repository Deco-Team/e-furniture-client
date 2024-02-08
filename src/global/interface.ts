/**
 * THÊM I- KHI KHAI BÁO INTERFACE:
 * Ex: Cart -> ICart
 */

export interface ILogin {
  email: string
  password: string
}

export interface IRegister {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface ICategory {
  _id?: string
  name: string
  description?: string
  image: string
}
export interface IVariant {
  sku: string
  price: number
  quantity: number
  dimensions: IDimension
  keyValue: { [key: string]: string }
}

export interface IDimension {
  height: number
  width: number
  length: number
}

export interface IProduct {
  _id?: string
  name: string
  description?: string
  images: string[]
  rate: number
  brand?: string
  variants: IVariant[]
  categories: ICategory[]
  slug: string
}
