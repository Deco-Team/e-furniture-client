export interface Login {
  email: string
  password: string
}

export interface Register {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface Category {
  name: string
  description?: string
  image: string
}
export interface Variant {
  sku: string
  price: number
  quantity: number
  dimensions: Dimension
  keyValue: { [key: string]: string }
}

export interface Dimension {
  height: number
  width: number
  length: number
}

export interface Product {
  name: string
  description?: string
  images: string[]
  rate: number
  brand?: string
  variants: Variant[]
  categories: Category[]
}
