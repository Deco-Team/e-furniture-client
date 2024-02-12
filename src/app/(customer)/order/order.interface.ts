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
