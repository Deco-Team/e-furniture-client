/**
 * THÊM I- KHI KHAI BÁO INTERFACE:
 * Ex: Cart -> ICart
 */

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
  modelUrl?: string
  arPlacement?: 'floor' | 'wall'
}

export interface IProductResponse {
  _id: string
  name: string
  description: string
  images: string[]
  rate: number
  brand: string
  variants: IVariant[]
  categories: ICategory[]
  slug: string
}

export type IPagination<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number
  nextPage: number
}
